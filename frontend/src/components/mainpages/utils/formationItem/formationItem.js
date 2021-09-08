import React from 'react'

import BtnRender from './BtnRender'

function formationItem({formation,isAdmin, deleteFormation}) {
    return (
        <div className="formation_card">

 <img src={formation.images.url} alt="" />
        
        <div className="formation_box">
        <p>{formation.category}</p>

        <h6 title={formation.title}>{formation.title}</h6>

      
        </div>
        <BtnRender formation={formation} deleteFormation={deleteFormation} />
    </div>
    
    )
}

export default formationItem
