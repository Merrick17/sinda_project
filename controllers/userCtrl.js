const Users = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { google } = require('googleapis')
const { OAuth2 } = google.auth
const { CLIENT_URL } = process.env
const fetch = require('node-fetch')
const sendMail = require('./sendMail')
const { restart } = require('nodemon')

const client = new OAuth2(process.env.MAILING_SERVICE_CLIENT_ID)


const userCtrl = {
    register: async (req, res) => {
        try {
            const { name, email, password } = req.body

            if (!name || !email || !password)
                return res.status(400).json({ msg: "Please fill in all fields." })

            if (!validateEmail(email))
                return res.status(400).json({ msg: "Invalid emails." })

            const user = await Users.findOne({ email })
            if (user) return res.status(400).json({ msg: "This email already exists." })

            if (password.length < 6)
                return res.status(400).json({ msg: "Password must be at least 6 characters." })

            const passwordHash = await bcrypt.hash(password, 12)

            const newUser = {
                name, email, password: passwordHash
            }
            let usr = new Users(
                newUser);
           let result= await usr.save();
            const activation_token = createActivationToken(result.toJSON())

            const url = `${CLIENT_URL}/activate/${activation_token}`
            sendMail(email, url, "Verify your email address")


            res.json({ msg: "Register Success! Please activate your email to start." })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    addNewUser: async (req, res) => {
        try {
            let { name, email, password, role } = req.body;
            let hash = await bcrypt.hash(password, 12)
            let newUser = new Users({
                name, email, password: hash, role
            });
            let result = await newUser.save();
            const activation_token = createActivationToken(result.toJSON())

            const url = `${CLIENT_URL}/activate/${activation_token}`
            sendMail(email, url, "Verify your email address")
            res.json({ result: 'New User Added', success: true });
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    activateEmail: async (req, res) => {    
        try {
            const token = req.header("Authorization")
            jwt.verify(token, process.env.ACTIVATION_TOKEN_SECRET,async (err,user)=>{
               console.log('err',err); 
                if(err) return res.status(400).json({msg: "Invalid Token."}); 
                let result = await Users.findByIdAndUpdate(user._id,{isActive:true}); 
                res.json({ msg: "Account has been activated!" })
            })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body
            const user = await Users.findOne({ email }).populate('cart').populate('subscribedCourses');
            if (!user) return res.status(400).json({ msg: "This email does not exist.",success:true })

            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) return res.status(400).json({ msg: "Password is incorrect." ,success:true})
             if(!user.isActive) res.status({success:false,message:"votre compte n'est activer"}); 
            const refresh_token = createAccessToken({ id: user._id })
            let token = createAccessToken({ id: user._id })
            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            })

            res.json({ msg: "Login success!", token: token, user: user,success:true })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getAccessToken: (req, res) => {
        try {
            const rf_token = req.cookies.refreshtoken
            if (!rf_token) return res.status(400).json({ msg: "Please login now!" })

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if (err) return res.status(400).json({ msg: "Please login now!" })

                const access_token = createAccessToken({ id: user.id })
                res.json({ access_token })
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    forgotPassword: async (req, res) => {
        try {
            const { email } = req.body
            const user = await Users.findOne({ email })
            if (!user) return res.status(400).json({ msg: "This email does not exist." })

            const access_token = createAccessToken({ id: user._id })
            const url = `${CLIENT_URL}/reset/${access_token}`

            sendMail(email, url, "Reset your password")
            res.json({ msg: "Re-send the password, please check your email." })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    resetPassword: async (req, res) => {
        try {
            const { password } = req.body
            console.log(password)
            const passwordHash = await bcrypt.hash(password, 12)

            await Users.findOneAndUpdate({ _id: req.user.id }, {
                password: passwordHash
            })

            res.json({ msg: "Password successfully changed!",success:true })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
    ,
    getUserInfor: async (req, res) => {
        try {
            const user = await Users.findById(req.user.id).select('-password')

            res.json(user)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getUsersAllInfor: async (req, res) => {
        try {
            const users = await Users.find().select('-password')

            res.json(users)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    logout: async (req, res) => {
        try {
            res.clearCookie('refreshtoken', { path: '/user/refresh_token' })
            return res.json({ msg: "Logged out." })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }, updateUser: async (req, res) => {
        try {
            let { id } = req.params;
            const { name, email, role } = req.body
           let result=   await Users.findByIdAndUpdate(id, { name, email, role });
            res.json({ msg: "Update Success!",result:result })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateUsersRole: async (req, res) => {
        try {
            const { role } = req.body

            await Users.findOneAndUpdate({ _id: req.params.id }, {
                role
            })

            res.json({ msg: "Update Success!" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    deleteUser: async (req, res) => {
        try {
            await Users.findByIdAndDelete(req.params.id)

            res.json({ msg: "Deleted Success!" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    googleLogin: async (req, res) => {
        try {
            const { tokenId } = req.body

            const verify = await client.verifyIdToken({ idToken: tokenId, audience: process.env.MAILING_SERVICE_CLIENT_ID })

            const { email_verified, email, name, picture } = verify.payload

            const password = email + process.env.GOOGLE_SECRET

            const passwordHash = await bcrypt.hash(password, 12)

            if (!email_verified) return res.status(400).json({ msg: "Email verification failed." })

            const user = await Users.findOne({ email })

            if (user) {
                const isMatch = await bcrypt.compare(password, user.password)
                if (!isMatch) return res.status(400).json({ msg: "Password is incorrect." })

                const refresh_token = createRefreshToken({ id: user._id })
                res.cookie('refreshtoken', refresh_token, {
                    httpOnly: true,
                    path: '/user/refresh_token',
                    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
                })

                res.json({ msg: "Login success!" })
            } else {
                const newUser = new Users({
                    name, email, password: passwordHash, avatar: picture
                })

                await newUser.save()

                const refresh_token = createRefreshToken({ id: newUser._id })
                res.cookie('refreshtoken', refresh_token, {
                    httpOnly: true,
                    path: '/user/refresh_token',
                    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
                })

                res.json({ msg: "Login success!" })
            }


        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    facebookLogin: async (req, res) => {
        try {
            const { accessToken, userID } = req.body

            const URL = `https://graph.facebook.com/v2.9/${userID}/?fields=id,name,email,picture&access_token=${accessToken}`

            const data = await fetch(URL).then(res => res.json()).then(res => { return res })

            const { email, name, picture } = data

            const password = email + process.env.FACEBOOK_SECRET

            const passwordHash = await bcrypt.hash(password, 12)

            const user = await Users.findOne({ email })

            if (user) {
                const isMatch = await bcrypt.compare(password, user.password)
                if (!isMatch) return res.status(400).json({ msg: "Password is incorrect." })

                const refresh_token = createRefreshToken({ id: user._id })
                res.cookie('refreshtoken', refresh_token, {
                    httpOnly: true,
                    path: '/user/refresh_token',
                    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
                })

                res.json({ msg: "Login success!" })
            } else {
                const newUser = new Users({
                    name, email, password: passwordHash, avatar: picture.data.url
                })

                await newUser.save()

                const refresh_token = createRefreshToken({ id: newUser._id })
                res.cookie('refreshtoken', refresh_token, {
                    httpOnly: true,
                    path: '/user/refresh_token',
                    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
                })

                res.json({ msg: "Login success!" })
            }


        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    getUserList: async (req, res) => {

        try {
            let result = await Users.find({});
            res.json({ result: result, success: true })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },

    addToCart: async (req, res) => {
        try {
            let { id } = req.params;
            let { course } = req.body;
            let user = await Users.findById(id);
            if (user.cart) {
                let cart = [...user.cart, course];
                let result = await Users.findByIdAndUpdate(id, { cart: cart });
                res.json({ result: result, success: true })
            } else {
                let cart = [course];
                let result = await Users.findByIdAndUpdate(id, { cart: cart });
                res.json({ result: result, success: true })
            }

        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    getUserCart: async (req, res) => {
        try {
            let { id } = req.params;
            let user = await Users.findById(id).populate('cart').populate('subscribedCourses')
            res.json({ result: user, success: true })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    deletItemFromCart: async (req, res) => {
        try {
            let { id, courseId } = req.params;
            let user = await Users.findById(id);
            let newCart = user.cart.filter((elm) => elm != courseId);
            let result = await Users.findByIdAndUpdate(id, { cart: newCart });
            res.json({ result: result, success: true })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    confirmSubscription: async (req, res) => {

        try {
            let { id } = req.params;
            let user = await Users.findById(id);
            if (user.subscribedCourses) {
                let allCourses = user.subscribedCourses.concat(user.cart);
                let result = await Users.findByIdAndUpdate(id, { cart: [], subscribedCourses: allCourses });
                res.json({ result: result, success: true })

            } else {
                let result = await Users.findByIdAndUpdate(id, { cart: [], subscribedCourses: user.cart });
                res.json({ result: result, success: true })
            }
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },


    updatePassword: async (req, res) => {
        try {
            let { id } = req.params;
            console.log("ID", id);
            let { password } = req.body;
            const passwordHash = await bcrypt.hash(password, 12);
            let result = await Users.findByIdAndUpdate(id, {
                password: passwordHash
            });
            res.json({ result: result, success: true })
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }

    },
    updateName: async (req, res) => {
        try {
            let { id } = req.params;
            let { name } = req.body;

            let result = await Users.findByIdAndUpdate(id, {
                name: name
            });
            res.json({ result: result, success: true })
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    }


}























function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
const createActivationToken = (payload) => {
    return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, { expiresIn: '5m' })
}
const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' })
}

const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' })
}

module.exports = userCtrl

