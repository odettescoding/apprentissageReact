import express from 'express'
import mysql from 'mysql'
import cors from 'cors'

const app= express()
app.use(express.json())
app.use(cors())

 const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"crud",
    dateStrings:'date'
})

// affiche les données venant de la base de données
app.get('/', (req,res)=>{
    const sql = "SELECT*FROM book";
    db.query(sql, (err, data)=> {
        if(err){
            return res.json({Error:"Error"})
        }
        return res.json(data)
    })
})


 //enregistrer les entrées dans la base de données

app.post('/create', (req,res)=>{
    const sql = "INSERT INTO book (publisher,name,date) VALUES(?)";
    const values=[
        req.body.publisher,
        req.body.name,
        req.body.date
    ]
    db.query(sql,[values] ,(err, data)=> {
        if(err){
            return res.json({Error:"Error"})
        }
        return res.json(data)
    })
})


//modifier les données de la base de données

app.put('/update/:id',(req,res)=>{
    const sql = "UPDATE book SET  publisher = ?, name = ? , date = ?  WHERE id = ?";
    const values=[
        req.body.publisher,
        req.body.name,
        req.body.date
    ]
    const id= req.params.id;

    db.query(sql,[...values,id] , (err,data)=>{
        if(err){
            return res.json({Error:"Error"})
        }
        return res.json(data)
    })
})


//supprimer les données de la base de données

app.delete('/delete/:id',(req,res)=>{
    const sql = "DELETE FROM book WHERE id =?"; 
    const id= req.params.id;

    db.query(sql,[id] , (err,data) => {
        if(err){
            return res.json({Error:"Error"})
        }
        return res.json(data)
    })
})
app.get('/getrecord/:id',(req, res)  =>{
    const id=  req.params.id;
    const sql =" SELECT*FROM book WHERE id= ?"
    db.query(sql,[id] , (err,data) => {
        if(err){
            return res.json({Error:"Error"})
        }
        return res.json(data)
    })
})
app.listen(3030, ()=> {
    console.log('Running')
})
