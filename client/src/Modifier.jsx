import React, {useEffect,useState} from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import {  useParams} from "react-router-dom"
import Swal from 'sweetalert2';
 const Modifier = () => {
  const Toast  =Swal.mixin({
    toast:true,
    position:'top-end',
    iconColor:'white',
    customClass:{
      popup:'colored-toast',
    },
    showConfirmButton:false,
    timer:3000,
    timerProdgrassBar:true
  })


  const {matricule}=useParams()
  const [values,setValues] = useState({
    matricule:"",
    nom:"",
    moyenne:""
  })
  
  const [errors,setErrors] = useState({});

   const navigate = useNavigate()
   const handleSubmit =(e) => {
    e.preventDefault()

    const errors = {};
    if(!values.nom){
      errors.nom= 'veulliez remplir le nom';
    }
    if(!values.moyenne){
      errors.moyenne= 'veulliez remplir la moyenne';
    }
    if(Object.keys(errors).length !==0){
      setErrors(errors)
      return;
    }

    axios.put("http://localhost:3030/modifier/" +matricule,values)
    .then(res  => {
      navigate('/');
      Toast.fire({
        icon:'success',
        title:'Modification reussi !',
      })
    })
    .catch(err =>console.log(err))
   }

   useEffect(()  => {
    axios.get('http://localhost:3030/getrecord/' + matricule)
    .then(res  => setValues(prevValues  => ({...prevValues,matricule:res.data[0].matricule, nom:res.data[0].nom,moyenne:res.data[0].moyenne})))
    .catch(err  => console.log(err))
  },[matricule])


  return(
    <div className='d-flex align-items-center flex-column mt-3'>
      <div className='d-flex justify-content-start w-50'>
        <Link to="/" className='m-2'>
          <i className='fas fa-arrow-left'></i>
        </Link>
        <h2 className='ml-2'>Modification</h2>
      </div>

      <form action="" className='w-50' onSubmit={handleSubmit}>
        <div className='mb-3 mt-3'>
          <label for="matricule" class='form-label'>Matricule:</label>
          <input type="text" class='form-control' id='matricule' placeholder='votre numero matricule SVP' name='matricule' value={values.matricule} onChange={(e)  => setValues({...values,matricule:e.target.value})} disabled/>
        </div>

        <div className='mb-3'>
          <label for="nom" class='form-label'>Nom:</label>
          <input type="text" class='form-control' id='nom' placeholder='votre nom SVP' name='nom' value={values.nom} onChange={(e)  => setValues({...values,nom:e.target.value})} />
          {errors.nom && (<div className='text-danger'>{errors.nom}</div>)}
        </div>

        <div className='mb-3'>
          <label for="moyenne" class='form-label'>Moyenne:</label>
          <input type="number" step="any" class='form-control' id='moyenne' placeholder='votre moyenne SVP' name='moyenne' value={values.moyenne} onChange={(e)  => setValues({...values,moyenne:e.target.value})} />
          {errors.moyenne && (<div className='text-danger'>{errors.moyenne}</div>)}
        </div>

        <button type="submit" class="bouton">enregistrer</button>
      </form>
    </div>
  )
}
export default Modifier