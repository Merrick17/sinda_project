import React, {useContext, useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import {GlobalState} from '../../../GlobalState'
import FormationItem from '../utils/formationItem/formationItem'
import Btn from './btn'
import { FcBusinessman } from "react-icons/fc";
import PaypalButton from '../cart/PaypalButton';
import axios from 'axios';










function DetailFormation() {
    const params = useParams()
    const state = useContext(GlobalState)
    const [formations] = state.FormationsAPI.formations
 
    const [token] = state.token
    const [detailFormation, setDetailFormation] = useState([])

    useEffect(() =>{
        if(params){

            formations.forEach(formation => {
                if(formation._id === params.id) setDetailFormation(formation)
            })
        }
    },[params, formations])
    console.log (detailFormation)
    if(detailFormation.length === 0) return null;


  


    const tranSuccess = async(payment) => {
        const {paymentID, address} = payment;

        await axios.post('/api/payment', { paymentID, address}, {
         
        })

  
    }



    return (
        <>
        <div className="detail">
                <img src={detailFormation.images.url} alt="" />  
                <div className="box-detail">
                    <div className="row">
                       
                        <h2>  {detailFormation.title}</h2>
                      

                    </div>
                   
                    <p>{detailFormation.description}</p>
                     <span>Prix : $ {detailFormation.price}</span>
                     <h6><FcBusinessman/>  Enseignant(e) :{detailFormation.nomFormateur}</h6> 
                     <Btn />
                     <PaypalButton 
        total={detailFormation.price}
        tranSuccess={tranSuccess} /> 
                     </div>
        </div>
 <div>
                <h4>Plus de formations...</h4>
                <div className="formations">
                    {
                        formations.map(formation => {
                            return formation.category === detailFormation.category 
                                ?<FormationItem  key={formation._id} formation={formation}/> :null
                        })
                    }
                </div>
            </div>

   </>

    )
}

export default DetailFormation
