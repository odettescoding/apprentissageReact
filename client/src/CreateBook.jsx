import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const CreateBook = () => {
    const [values, setValues]=useState({
        publisher:"",
        name:"",
        date:''
    })
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3030/create',values)
        .then(res => navigate('/'))
        .catch(err => console.log(err))
    }
  return (
    <div className='d-flex align-items-center flex-column mt-3'>
                <h1>Add a book</h1>
            <form className='w-50' onSubmit={handleSubmit}>
                
                    <div className='mb-3'>
                        <label for="publisher" class="form-label">Publisher: </label>
                        <input type="text" class="form-control" id='publisher' name='publisher' placeholder='enter publishername' onChange={(e) => setValues({...values,publisher:e.target.value})}/>                   
                    </div>
                    <div className='mb-3'>
                        <label for="name" class="form-label">Book Name: </label>
                        <input type="text" class="form-control" id='name' name='name' placeholder='enter name' onChange={(e) => setValues({...values,name:e.target.value})}/>                   
                    </div>
                    <div className='mb-3'>
                    <label for="date" class="form-label">Date : </label>
                    <input type="date" class="form-control" id='date' name='date' onChange={(e) => setValues({...values,date:e.target.value})}/>               
                    </div>
                
            <button type="submit" class="btn btn-primary" >Enregistrer</button>
            </form>
        </div>
  )
}

export default CreateBook