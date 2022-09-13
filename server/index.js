const express = require('express')
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'root',
    host:'localhost',
    password: '12345',
    database: 'contact_details'
})

app.post('/create',(req,res)=>{
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const phoneNumber = req.body.phoneNumber;

    db.query('INSERT INTO details (firstName,lastName,phoneNumber) VALUES(?,?,?)',
    [firstName,lastName,phoneNumber],
    (err, result)=>{
        if(err){
            console.log(err)
        }else{
            res.send("values are inserted")
        }
    });
});

app.get('/contacts',(req,res)=>{

    db.query('SELECT * FROM details',(err, result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    });
});

app.put('/update',(req,res)=>{
    const id = req.body.id;
    const phoneNumber = req.body.phoneNumber;
db.query('UPDATE details SET phoneNumber = ? WHERE id=?',[phoneNumber, id],(err, result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});

app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM details WHERE id = ?", id, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });

app.listen(3001, ()=>{
    console.log("its running on 3001!!")
})