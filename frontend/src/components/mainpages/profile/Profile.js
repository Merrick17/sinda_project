import React, {useState, useEffect,useContext} from 'react'
import {GlobalState} from  '../../../GlobalState'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {isLength, isMatch} from '../utils/validation/Validation'
import {showSuccessMsg, showErrMsg} from '../utils/notification/notification'


import { BsImage } from "react-icons/bs";
const initialState = {
    name: '',
    password: '',
    cf_password: '',
    err: '',
    success: ''
}
function Profile() {
    const state = useContext(GlobalState)
    const [user] =state.userAPI.user
    const [avatar, setAvatar] = useState(false)
    const [data, setData] = useState(initialState)
    const {name, password, cf_password, err, success} = data
    const [isAdmin] = state.userAPI.isAdmin
    const [isFormateur]=state.userAPI.isFormateur
    const [token] = state.token

    const handleChange = e => {
        const {name, value} = e.target
        setData({...data, [name]:value, err:'', success: ''})
    }


    const changeAvatar = async e =>{
        e.preventDefault()
        try {
           
            const file = e.target.files[0]
            
            if(!file) return alert("File not exist.")

            if(file.size > 1024 * 1024) // 1mb
                return alert("Size too large!")

            if(file.type !== 'image/jpeg' && file.type !== 'image/png') // 1mb
                return alert("File format is incorrect.")

            let formData = new FormData()
            formData.append('file', file)

          
            const res = await axios.post('/api/upload_avatar', formData, {
                headers: {'content-type': 'multipart/form-data', Authorization: token}
            })
          
            setAvatar(res.data.url)

        } catch (err) {
            alert(err.response.data.msg)
        }
    }


    const updateInfor = () => {
        try {
            axios.patch('/user/update', {
                name: name ? name : user.name,
                avatar: avatar ? avatar : user.avatar
            },{
                headers: {Authorization: token}
            })

            setData({...data, err: '' , success: "Updated Success!"})
        } catch (err) {
            setData({...data, err: err.response.data.msg , success: ''})
        }
    }


    const updatePassword = () => {
        if(isLength(password))
            return setData({...data, err: "Password must be at least 6 characters.", success: ''})

        if(!isMatch(password, cf_password))
            return setData({...data, err: "Password did not match.", success: ''})

        try {
            axios.post('/user/reset', {password},{
                headers: {Authorization: token}
            })

            setData({...data, err: '' , success: "Updated Success!"})
        } catch (err) {
            setData({...data, err: err.response.data.msg , success: ''})
        }
    }

    const handleUpdate = () => {
        if(name || avatar) updateInfor()
        if(password) updatePassword()
        if ({isAdmin})
        window.location.href ="/AdminDash" ;
        else if  ({isFormateur})
         window.location.href = "/formateurdash";

    }



    return (
        <>
        <div>
        {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}
        </div>
        <div className="profile_page">
            <div className="col-left">
                <h2>User Profile</h2>

 <div className="avatar">
                    <img src={avatar ? avatar : user.avatar} alt=""/>
                    <span>
                       <p><BsImage /> change</p>  
                       
                       <input type="file" name="file" id="file_up" onChange={changeAvatar} />
                    </span>
 </div>

                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" defaultValue={user.name}
                    placeholder="Your name"  onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" defaultValue={user.email} 
                    placeholder="Your email address"  />
                </div>
                

                <div className="form-group">
                    <label htmlFor="password">New Password</label>
                    <input type="password" name="password" id="password"
                    placeholder="Your password"  value={password} onChange={handleChange}/>
                </div>

                <div className="form-group">
                    <label htmlFor="cf_password">Confirm New Password</label>
                    <input type="password" name="cf_password" id="cf_password"
                    placeholder="Confirm password"  value={cf_password} onChange={handleChange} />
                </div>

                <div>
                    <em style={{color: "crimson"}}> 
                    * If you update your password here, you will not be able 
                        to login quickly using google and facebook.
                    </em>
                </div>

                <button   className="btn btn-success btn-xs" onClick={handleUpdate} >Update</button>
             
    
            </div>

            
           
              
           
        </div>
        </>
    )
}

export default Profile
