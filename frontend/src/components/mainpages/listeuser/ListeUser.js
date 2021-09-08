import React, {useContext, useState, useEffect} from 'react'

import {GlobalState} from '../../../GlobalState'
import axios from 'axios'

import { FaUserTie } from "react-icons/fa";
import { BsDash } from "react-icons/bs";
import { FaUserMinus} from "react-icons/fa";

import { FaUserEdit } from "react-icons/fa";
import {Link} from 'react-router-dom'


function ListeUser() {
    const state = useContext(GlobalState)
    const [users] =state.usersAPI.users
    const [callback, setCallback] = state.FormationsAPI.callback
    const [token] = state.token


    const handleDelete =async id  => {
        try { 
            window.confirm("Are you sure you want to delete this account?")
            const res = axios.delete(`/user/delete/${id}`, {
                headers: {Authorization: token}
            })
          
            setCallback(!callback)
            
        } catch (err) {
            alert(err.response.data.msg)
        }
    }
    return (
        <>

        
        <div div className="list-page">
        
              <section className="wrapper">
     
                <h3><i className="fa fa-angle-right"></i> Liste des Utilisateurs </h3>
                <div className="row">
    
                
                  <div className="col-md-12">
                    <div className="content-panel">
                      <table className="table table-striped table-advance table-hover">
                       
                        <thead>
                          <tr>
                          
                          <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Formateur</th>
                                <th>Action</th>
                           
                          </tr>
                        </thead>
                        <tbody>
                        {
                                users.map(user => (
                                    <tr key={user._id}>
                                        <td>{user._id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            {
                                                user.role === 2
                                                ? <i  title="formateur"><FaUserTie/></i>
                                                : <i  title="Etudiant"><BsDash/></i>
                                            }
                                        </td>
                                    


                                        <td>
                                        <Link className="btn btn-outline-success" to=""><FaUserEdit/></Link>
                      <button className="btn btn-outline-danger"  onClick={() => handleDelete(user._id)} ><FaUserMinus/></button>
                                        </td>



                                    </tr>
                                ))
                            }  </tbody>
                                
                      </table>
                    </div>
               
                  </div>
                
                </div>
        
              </section>
        
        
                        
                    </div>
                    
        
        
        
        
        
        </>
    )
}

export default ListeUser
