import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Swal } from "sweetalert2";


export const Etudiants = () => {
    notification
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        iconColor: 'white',
        customClass: {
          popup: 'colored-toast',
        },
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
    })

    const [etudiants,setEtudiants]=useState([]);
    const [minMoyenne,setMinMoyenne]=useState(null);
    const [maxMoyenne,setMaxMoyenne]=useState(null);
    const [searchQuery,setSearchQuery]=useState('');
    const [selectedStatus,setSelectedStatus]=useState('Tous');
    
    useEffect(()=>{
        axios.get('http://localhost:3030')
        .then(res=>{setEtudiants(res.data);
        const moyennes = res.data.map(etudiant=>etudiant.moyenne);
        setMinMoyenne(Math.min(...moyennes));
        setMaxMoyenne(Math.max(...moyennes));
    })
        .catch(err=>console.log(err))
    },[]);

    // Supprimer un etudiant
    const handleDelete = (matricule) => {
        Swal.fire({
            title: "voulez vous supprimer cet etudiant ?",
            Text: " Attention cette action est dangereux !",
            icon: 'warning',
            showCancelButton:true,
            confirmButtonColor:'#d33',
            cancelButtonColor:'#3085d6',
            confirmButtonText:'oui',
            canceButtonText:'Annuler',
            customClass: {
                popup:'custom-popup-class',
            }
        }).then((result)=> {
            if(result.isConfirmed) {
                axios.delete('http://localhost:3030/supprimer/' + matricule)
                .then(res=> {
                    setEtudiants(etudiants.filter(etudiant=>etudiant.matricule !==matricule));
                    Toast.fire({
                        icon:'success',
                        title:'Suppresion avec succès',
                    })
                })
                .catch(err=>{
                    console.log(err);
                    Swal.fire('Erreur !','suppression impossible','error');
                });
            }
        });
    };

    const getObservation = (moyenne) => {
        if (moyenne >= 10) {
            return 'Admis';
        } else if (moyenne >= 5) {
            return 'Redoublant';
        } else {
            return 'Exclus';
        }
    };

    const filteredEtudiants = Array.isArray(etudiants) ? etudiants.filter(etudiant => {
        const matchStatus = selectedStatus === 'Tous' || getObservation(etudiant.moyenne) === selectedStatus;
        const matchQuery = etudiant.matricule.includes(searchQuery) ||
        etudiant.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
        etudiant.moyenne.String().includes(searchQuery);
        return matchStatus && matchQuery;
    }) :[];


  return (
    <div className='container mt-5'>
       <div className='outils'>
            <Link to='/creer' className='bouton'><i className='fas-fa-plus'></i>Add new student</Link>
            <div className='"search-container'>
                <input type="text" className='form-control' placeholder='search ...' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
                <select className='form-select' value={selectStatus} onChange={(e)=>setSelectedStatus(e.target.value)}>
                    <option value="Tous">Tous</option>
                    <option value="Admis">Admis</option>
                    <option value="Redoublant">Redoublant</option>
                    <option value="Exclus">Exclus</option>
                </select>
            </div>
       </div>

       {filteredEtudiants.length > 0 ? (
        <React.Fragment>
            <table>
                <thead>
                    <tr>
                    <th>Matricule</th>
                            <th>Nom</th>
                            <th>Moyenne</th>
                            <th>Observation</th>
                            <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredEtudiants.map(etudiant => (
                        <tr key={etudiant.matricule}>
                            <td>{etudiant.matricule}</td>
                            <td>{etudiant.nom}</td>
                            <td>{etudiant.moyenne}</td>
                            <td>{getObservation(etudiant.moyenne)}</td>
                            <td>
                                <Link to={'/modifier/$etudiant.matricule}'}><i className='fas-fa-edit text-green'></i></Link>
                                <button className='delete' onClick={() => handleDelete(etudiant.matricule)}><i className='fas-fa-trash text-danger'></i></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className ='info-container'>
                <p><span className='text-success'>Moyenne maximum</span>{maxMoyenne}</p>
                <p><span className='text-danger'>Moyenne minimum </span>{minMoyenne}</p>
            </div>
            </React.Fragment>
       ) :(
        <div className='d-flex'>
            <img src="hello.gif" width='10%' alt="" />
            <h2 className='mt-3'>Ooooh, aucun enregistrement!!</h2>
        </div>
       
       )}
       </div>
  );
}