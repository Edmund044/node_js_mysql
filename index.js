const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');
app.use(bodyparser.json());
var mysqlConnection = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: '',
    database: 'EmployeeDB'
});
mysqlConnection.connect((err)=>{
    if(!err){
        console.log('DB connection succeded');
    }
    else{
        console.log('DB connection failed \n Error' + JSON.stringify(err,undefined,2));
    }

});
app.listen(3000,()=>{console.log('Express server is running at 3000')});
//get url
app.get('/employees',(req,res)=>{
    mysqlConnection.query('SELECT * FROM Employee',(err, rows, fields)=>{
        if(!err){
            res.send(rows);
        }
        else{
            console.log(err);
        }
    })
});
//get url by id
app.get('/employees/:id',(req,res)=>{
    mysqlConnection.query('SELECT * FROM employee WHERE EmpID = ?',[req.params.id],(err, rows, fields)=>{
        if(!err){
            res.send(rows);
        }
        else{
            console.log(err);
        }
    })
});
//delete url by id
app.delete('/employees/:id',(req,res)=>{
    mysqlConnection.query('DELETE FROM employee WHERE EmpID = ?',[req.params.id],(err, rows, fields)=>{
        if(!err){
            res.send('Deleted successfully');
        }
        else{
            console.log(err);
        }
    })
});
//update url by id
app.put('/employees/:id',(req,res)=>{
    let newName = 'faith';
    let sql = 'UPDATE `employee` SET `Name`= ${newName} WHERE = ?';
    mysqlConnection.query(sql,(err, rows, fields)=>{
        if(!err){
            res.send('Deleted successfully');
        }
        else{
            console.log(err);
        }
    })
});

//