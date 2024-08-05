import express from 'express'
import mysql from 'mysql'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())

// creer connexion avec la base de données
const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'etudiants',
})

//collecte les données venant de la base de données
app.get('/',(req,res) => {
    const sql = " SELECT * FROM etudiant"
    db.query(sql,(err,data)=> {
        if(err){
            return res.json({Error:"Error"})
        }
        else{
            return res.json(data)
        }
    })
})

//ajout de donnérs dans la   base de données
app.post('.creer',(res, req) =>{
    const sql='INSERT INTO etudiant (matricule,nom,moyenne) VALUES (?)';
    const values = [ 
        req.body.matricule,
        req.body.nom,
        req.body.moyenne
    ]
    db.query(sql,[values],(err,data) => {
        if(err) {
            return res.json({ Error: "Error"})
        }else{
            return res.json(data)
        }
    })
})


//modifier la valeur dans la base de données
app.put('/modifier/:matricule',(req,res) => {
    const sql='UPDATE etudiant SET nom= ?, moyenne=? WHERE matricule =?';
    const values =[
        req.body.nom,
        req.body.moyenne
    ]
    const matricule= req.params.matricule;

    db.query(sql,[...values,matricule],(err,data) =>{
        if(err){
            return res.json({Error:"Error"})
        }
        else{
            return res.json(data)
        }
    })
})
// supprimer un etudiant de la base de données 
app.delete('/supprimer/:matricule',(req,res) =>{
    const sql="DELETE FROM etiduant WHERE matricule=?";

    const matricule = req.params.matricule;

    db.query(sql,[matricule],(err,data)=>{
        if(err){
            return res.json({Error:"Error"})
        }else{
            returnres.json(data)
        }
    })
})

app.get('/getrecord/:matricule',(req,res) =>{
    const matricule= req.params.matricule;
    const sql="SELECT * FROM etudiant WHERE matricule=?";

    db.query(sql,[matricule],(err,data) => {
         if(err){
            return res.json({Error:"Error"})
         } else{
            return res.json(data)
         }
    })
})

app.listen(3030,() =>{
    console.log("Running");
})
