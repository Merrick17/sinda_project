import React, {useContext, useState} from 'react'
import {GlobalState} from  '../../../GlobalState'
import {Link} from 'react-router-dom'
import axios from 'axios'

function Formateurdash() {
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isFormateur] = state.userAPI.isFormateur

    const logoutUser = async () =>{
        await axios.get('/user/logout')
        
        localStorage.removeItem('firstLogin')
        
        window.location.href = "/";
    }

    const formateurRouter = () =>{
        return(
            <>
                <li><Link to="/create_product">Create Product</Link></li>
                <li><Link to="/category">Categories</Link></li>
            </>
        )
    }
    const loggedRouter = () =>{
        return(
            <>
                <li><Link to="/history">History</Link></li>
                <li><Link to="/" onClick={logoutUser}>Logout</Link></li>
            </>
        )
    }


    return (
        <div>
                         {isFormateur && formateurRouter()}

{
    isLogged ? loggedRouter() : <li><Link to="/login">Login ✥ Register</Link></li>
}
        </div>
    )
}

export default Formateurdash
