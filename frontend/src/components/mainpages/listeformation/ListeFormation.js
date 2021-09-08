import React, {useContext, useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {GlobalState} from '../../../GlobalState'
import axios from 'axios'
import { BsPlus } from "react-icons/bs";
import { BsTrash } from "react-icons/bs";
import { BsPencil } from "react-icons/bs";





function ListeFormation() {

    const state = useContext(GlobalState)
    const [formations] = state.FormationsAPI.formations
    const [token] = state.token
    const [callback, setCallback] = state.FormationsAPI.callback
    
    
    const deleteFormation =async id  => {
      try { 
          const res = axios.delete(`/api/formation/${id}`, {
              headers: {Authorization: token}
          })
          alert("formation deletetd")
          setCallback(!callback)
          
      } catch (err) {
          alert(err.response.data.msg)
      }
  }

    return (
       
<>

        
<div div className="list-page">

      <section className="wrapper">
          
      <a className="btn btn-success btn-xs" href="/create_formation"><BsPlus/> Add new Formation</a>

     
        <h3><i className="fa fa-angle-right"></i> Liste des formation </h3>
        <div className="row">
         
       
        
          <div className="col-md-12">
            <div className="content-panel">
              <table className="table table-striped table-advance table-hover">
               
                <thead>
                  <tr>
                  
                    <th> titre</th>
                    <th>description </th>
                    <th>category </th>
                    <th> Nom du Formateur</th>
                    
                    <th> image</th>
                    <th> Action</th>
                   
                  </tr>
                </thead>
                <tbody>
                
                  {
                        formations.map(formation =>(
                        <tr key={formation._id}>
                          
                            <td>{formation.title}</td>
                      
                            <td> {formation.description}</td>
                            <td> {formation.category}</td>
                            <td> {formation.nomFormateur}</td>
                            <td><img src={formation.images.url} alt="" /></td>

                         

                            <td>
                   
                      <Link className="btn btn-primary btn-xs" to={`/edit_formation/${formation._id}`}><BsPencil/></Link>
                      <button className="btn btn-danger btn-xs" onClick={() => deleteFormation(formation._id)} ><BsTrash/></button>
                      
                    </td> 

 
                        </tr>
                        ))
                    }
                   
               
               
               
                   
                
                </tbody>
              </table>
            </div>
       
          </div>
        
        </div>

      </section>


                
            </div>
            





</>
















    )
}

export default ListeFormation
