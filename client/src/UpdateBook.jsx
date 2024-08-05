import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'

const UpdateBook = () => {
    const { id } = useParams()
    const [values, setValues] = useState({
        publisher: "",
        name: "",
        date: ''
    });

    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put('http://localhost:3030/update/'+id, values)
            .then((res) =>
                navigate("/"))
            .catch((err) => console.log(err));
    };
    useEffect(() => {
        axios
            .get("http://localhost:3030/getrecord/" + id)
            .then((res) =>
                setValues({
                    ...values,
                    publisher: res.data[0].publisher,
                    name: res.data[0].name,
                    date: res.data[0].date,
                })
            )

            .catch(err => console.log(err));
    }, [id]);
    return (
        <div className='d-flex align-items-center flex-column mt-3'>
            <h1>Update a book</h1>
            <form className='w-50' onSubmit={handleSubmit}>

                <div className='mb-3'>
                    <label for="publisher" class="form-label">Publisher: </label>
                    <input type="text" class="form-control" id='publisher' name='publisher' value={values.publisher} placeholder='enter publishername' onChange={(e) => setValues({ ...values, publisher: e.target.value })} />
                </div>
                <div className='mb-3'>
                    <label for="name" class="form-label">Book Name: </label>
                    <input type="text" class="form-control" id='name' name='name' placeholder='enter name' value={values.name} onChange={(e) => setValues({ ...values, name: e.target.value })} />
                </div>
                <div className='mb-3'>
                    <label for="date" class="form-label">Date : </label>
                    <input type="date" class="form-control"  name='date' value={values.date} onChange={(e) => setValues({ ...values, date: e.target.value })} />
                </div>

                <button type="submit" class="btn btn-primary" >Enregistrer</button>
            </form>
        </div>
    )
}

export default UpdateBook