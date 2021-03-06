import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import {GlobalState} from '../../../../GlobalState'


function BtnRender({formation, deleteFormation}) {

    const state = useContext(GlobalState)
    const [isAdmin] = state.userAPI.isAdmin
    return (
        <div className="row_btn">
        {
            isAdmin ? 
            <>
                <Link id="btn_del" to="#!" 
                onClick={() =>deleteFormation(formation._id, formation.images.public_id)}>
                    Delete
                </Link>
                <Link id="btn_vieww" to={`/edit_formation/${formation._id}`}>
                    Edit
                </Link>
                
            </>
            : <>
               
                <Link id="btn_view" to={`/detail/${formation._id}`}>
                   start
                </Link>
            </>
        }
            
    </div>
    )
}

export default BtnRender
