import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


const Books = () => {
    const [books, setBooks]= useState([])
    useEffect(()=>{
        axios
        .get('http://localhost:3030')
        .then(res => setBooks(res.data))
        .catch(err => console.log(err))
    }, []);

    // const handleDelete= (id) => {
    //     axios.delete('http://localhost/:3030/delete/' + id)
    //     .then(res => window.location.reload())
    //     .catch(err => console.log(err))
    // }
    // const handleDelete = (id) => {
    //     axios.delete('http://localhost:3030/delete/' + id)
    //         .then(res => window.location.reload())
    //         .catch(err => console.log(err))
    // }
    
    const handleDelete = (id) => {
        const isConfirmed = window.confirm("Êtes-vous sûr de vouloir supprimer cet élément ?");
        if (isConfirmed) {
            axios.delete('http://localhost:3030/delete/' + id)
                .then(res => window.location.reload())
                .catch(err => console.log(err))
        }
    }
    

  

    // const handleDelete = (id) => {
    //     setShowConfirmation(true);
    //     setDeleteId(id);
    // }
    
    // const confirmDelete = () => {
    //     axios.delete('http://localhost:3030/delete/' + deleteId)
    //         .then(res => {
    //             window.location.reload();
    //             setShowConfirmation(false);
    //         })
    //         .catch(err => console.log(err))
    // }
    
    // return (
    //     <div>
    //         <Button variant="danger" onClick={() => handleDelete(book.id)}>Delete</Button>
    //         <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)}>
    //             <Modal.Header closeButton>
    //                 <Modal.Title>Confirmation de suppression</Modal.Title>
    //             </Modal.Header>
    //             <Modal.Body>Êtes-vous sûr de vouloir supprimer cet élément ?</Modal.Body>
    //             <Modal.Footer>
    //                 <Button variant="secondary" onClick={() => setShowConfirmation(false)}>
    //                     Annuler
    //                 </Button>
    //                 <Button variant="danger" onClick={confirmDelete}>
    //                     Supprimer
    //                 </Button>
    //             </Modal.Footer>
    //         </Modal>
    //     </div>
    // );
    





  return (
    <div className='container mt-5'>
        <Link to="/create" className='btn btn-success'> Create  Book</Link>
        {books.length !== 0 ?
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Publisher</th>
                    <th scope="col">Name</th>
                    <th scope="col">Date</th>
                    <th scope='col'>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    books.map(book =>
                        <tr key={book.id}>
                            <td>{book.id}</td>
                            <td>{book.publisher}</td>
                            <td>{book.name}</td>
                            <td>{book.date}</td>
                            <td>
                            <Link to={`/update/${book.id}`} className='btn btn-info btn-sm me-2'>Edit</Link>
                                {/* <Link to={'/update/${book.id}'} className='btn btn-info btn-sm me-2'>Edit</Link> */}
                                <button type ="button" onClick ={() => handleDelete(book.id)} className='btn btn-danger btn-sm'>delete</button>
                            </td>
                        </tr>
                        )
                }
            </tbody>
        </table>
        // : <h2>No records</h2>
        :<div className='justify-content-center'>
        <img src="hi.gif" width="20%" alt="" />
        <h2 className='mt-3'>No records!</h2>
    </div>
        }
    
    </div>
  )
}

export default Books