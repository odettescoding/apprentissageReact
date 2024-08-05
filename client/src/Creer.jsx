import React,{ useState} from 'react'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';

const Creer = () => {
  const Toast = Swal.mixin({
    toast:true,
    position:'top-end',
    iconColor:'white',
    customClass: {
      popup: 'colored-toast',
    },
    showConfirmButton:false,
    timer: 3000,
    timerProgressBar:true,
  })
  const [values,setValues] = useState({
    matricule:'',
    nom:'',
    moyenne:''
  });
  const [errors,setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e)  =>{
    const { name,value } = e.target;
    setValues({...values,[name]:value});
  };

   const handleSubmit = (e)  => {
    e.preventDefault();
    const  validationErrors= validate(values);
    if(Object.keys(validationErrors).length >0)
    {
      setErrors(validationErrors);
      return;
    }
    axios
        .post('http://localhost:3030/creer',values)
        .then((res)  => {
          navigate('/');
          Toast.fire({
            icon:'success',
            title:'ajout reussit',
          })
        })

        .catch((err)  => console.log(err));
   };
   const validate = (values)  => {
    let errors= {};
    if(!values.matricule){
      errors.matricule = 'le champ matricule est obligatoire';
    }
    if(!values.nom){
      errors.nom = 'le nom est obligatoire, veuillew remplir le champ';
    }
    if(!values.moyenne){
      errors.moyenne= 'veuillez entrer la moyenne';
    }
    return errors;
   };
   return(
    <div className='d-flex align-items-center flx-column mt-3'>
      <div className='d-flex justify-content-start w-50'>
        <Link to='/' className='m-2'>
          <i className='fas-fa-arrow-left'></i>
        </Link>
        <h2 className='ml-2'>Ajouter</h2>
      </div>
      <form action="" className='w-50' onSubmit={handleSubmit}>
        <div className='mb-3 mt-3'>
          <label htmlFor="matricule" className='form-label'>
            Matricule :
          </label>
          <input type="text" className='form-control' id='matricule' placeholder='votre numero matricule SVP' name='matricule' value={values.matricule} onChange={handleChange}/>
          {errors.matricule && (
            <div className='text-danger'>{errors.matricule}</div>
          )}
        </div>

        <div className='mb-3 '>
          <label htmlFor="nom" className='form-label'>
            Nom :
          </label>
          <input type="text" className='form-control' id='nom' placeholder='votre nom  SVP' name='nom' value={values.nom} onChange={handleChange}/>
          {errors.nom && (
            <div className='text-danger'>{errors.nom}</div>
          )}
        </div>

        <div className='mb-3'>
          <label htmlFor="moyenne" className='form-label'>
            Moyenne :
          </label>
          <input type="number" step="any" className='form-control' id='moyenne' placeholder='votre moyenne SVP' name='moyenne' value={values.moyenne} onChange={handleChange}/>
          {errors.moyenne && (
            <div className='text-danger'>{errors.moyenne}</div>
          )}
        </div>
        <button type="submit" className='bouton'>
          Enregistrer
        </button>

      </form>
    </div>
   );
} ;


export default Creer