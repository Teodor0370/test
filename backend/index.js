import express from "express"
import mysql from "mysql"

const app = express()

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"123walter123",
    database:"test"
})

// IF THERE IS A AUTH PROBLEM
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123walter123';

app.get("/", (req,res)=>{
    res.json("hello this is the backend")
})

app.get("/books", (req, res)=>{
    const q = "SELECT * FROM books"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/books", (req, res)=>{
    const q = "INSERT INTO books (`title`, `desc`, `cover`) VALUES (?)"
    const values = ["title from backend", "desc from backend", "cover pic from backend"]

    db.query(q,[values], (err,data)=>{
        if(err) return res.json(err)
        return res.json("Book has been created successfully.")
    })
})

app.listen(8800, ()=>{
    console.log("Connected to backend!")
})