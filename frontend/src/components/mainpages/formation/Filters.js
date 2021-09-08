import React, {useContext} from 'react'
import {GlobalState} from '../../../GlobalState'
import { FcSearch } from "react-icons/fc";

function Filters() {
    const state = useContext(GlobalState)
    const [categories] = state.CategoriesAPI.categories

    const [category, setCategory] = state.FormationsAPI.category

    
    const [sort, setSort] = state.FormationsAPI.sort
    const [search, setSearch] = state.FormationsAPI.search


    const handleCategory = e => {
        setCategory(e.target.value)
        setSearch('')
    }

    return (
        <>
        <div className="filter_menu">
            <div className="row">
            <span>Filtrer : </span>
                <select name="category" value={category} onChange={handleCategory} >

                <option value=''>Categories</option>
                    {
                        categories.map(category => (
                            <option value={"category=" + category._id} key={category._id}>
                                {category.name}
                            </option>
                        ))
                    }
                </select>
              
                </div>
                <input className="search" type="text" value={search} placeholder="Recherche un MOOC!"
            onChange={e => setSearch(e.target.value.toLowerCase())} />
         



       
                    
         
                </div>


                
              
                </>
    )
}

export default Filters
