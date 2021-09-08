import {useState, useEffect} from 'react'
import axios from 'axios'


function UserAPI(token) {
    const [isLogged, setIsLogged] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [isEtudiant,setisEtudiant]=useState(false)
    const [isFormateur,setisFormateur]=useState(false)
    const [user,setuser]=useState([])
    

    useEffect(() =>{
        if(token){
            const getUser = async () =>{
                try {
                    const res = await axios.get('/user/infor', {
                        headers: {Authorization: token}
                    })

                  setIsLogged(true)

                   
                 
                  
                
                  console.log(res)
             

                } catch (err) {
                    alert(err.response.data.msg)
                }
            }

            getUser()
        }
    },[token])


 



    return{
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin],
        isEtudiant: [isEtudiant,setisEtudiant],
        isFormateur: [isFormateur,setisFormateur],
        user:[user,setuser]

    }
}

export default UserAPI
