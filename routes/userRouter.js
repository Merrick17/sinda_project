const router = require('express').Router()
const userCtrl = require('../controllers/userCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')


router.post('/register', userCtrl.register)
router.get('/activation', userCtrl.activateEmail)

router.post('/login', userCtrl.login);
router.get('/list', auth, userCtrl.getUserList);
router.get('/refresh_token', userCtrl.getAccessToken)
router.post('/forgot', userCtrl.forgotPassword)
router.post('/reset', auth, userCtrl.resetPassword)
router.get('/infor', auth, userCtrl.getUserInfor)
router.get('/all_infor', userCtrl.getUsersAllInfor)
router.get('/logout', userCtrl.logout)
router.put('/updatepwd/:id',userCtrl.updatePassword); 
router.put('/updatename/:id',userCtrl.updateName) ; 
router.post('/update/:id', auth, userCtrl.updateUser)
router.patch('/update_role/:id', auth, authAdmin, userCtrl.updateUsersRole)
router.delete('/delete/:id', auth, userCtrl.deleteUser)
router.post('/addnewuser', userCtrl.addNewUser);
router.put('/addtocart/:id', auth, userCtrl.addToCart);
router.get('/cart/:id',auth,userCtrl.getUserCart) ; 
router.get('/confirm/:id',auth,userCtrl.confirmSubscription) ; 
router.delete('/deletecart/:id/:courseId',auth,userCtrl.deletItemFromCart) ; 
// Social Login
router.post('/google_login', userCtrl.googleLogin)
router.post('/facebook_login', userCtrl.facebookLogin)




module.exports = router