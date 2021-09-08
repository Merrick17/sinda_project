import {useState, useEffect} from 'react'
import axios from 'axios'

function UsersAPI() {

    const [users, setusers] = useState([])
    const [callback, setCallback] = useState(false)

    const getusers = async () => {
        const res = await axios.get('/user/all_infor')
        setusers (res.data)
    }
    useEffect(() =>{
        getusers()
      
    },[callback])
    
  
    return {
          users :[users,setusers],
          callback: [callback, setCallback],
        }
    
}

export default UsersAPI
