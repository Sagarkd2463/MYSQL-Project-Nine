const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');

const salt = 10;

const app = express();

app.use(express.json());
app.use(cors({
    origin:["http://localhost:3000"],
    methods:["POST", "GET"],
    credentials: true
}));

app.use(cookieParser());

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'r$$100200',
    database:'register',
});

db.connect((err) => {
    if(err){
        console.log(err.message);
    } else {
        console.log("DB Connected Successfully....");
    }
});

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if(!token){
        return res.json({Error: "You are not authenticated!"});
    } else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if(err) {
                return res.json({Error: "Token is not correct!"}); 
            } else {
                req.name = decoded.name;
                next();
            }
        });
    }
};

app.get('/', verifyUser, (req, res) => {
    return res.status(200).json({status: "success", name: req.name});
});

app.post('/register', (req, res) => {

    const sql = "INSERT INTO login (name, email, password) VALUES (?)";
    const hashedPassword = bcrypt.hash(req.body.password.toString(), salt);
    const values = [
        req.body.name,
        req.body.email,
        hashedPassword,
    ];

    db.query(sql, [values], (err, data) => {
        if(err) return res.status(422).json(err.message);

        return res.status(201).json({status: "success", message: data});
    });

});

app.post('/login', (req, res) => {

    const sql = "SELECT * FROM login WHERE email = ?";

    db.query(sql, [req.body.email], (err, data) => {
        if(err) return res.status(422).json(err.message);
        if(data.length > 0){
            bcrypt.compare(req.body.password.toString(), data[0].password, (err, result) => {
                if(err) return res.json({Error: "Password Compare Error"});
                if(result) {
                    const name  = data[0].name;
                    const token = jwt.sign({name}, "jwt-secret-key", { expiresIn: '1d'});

                    res.cookie('token', token);
                    return res.status(200).json({status: "success"});
                } else {
                    return res.status(422).json({Error: "Password does not matched"});
                }
            });
        } else {
            alert("No email existed...");
        }
    });
});

app.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({status: "success"});
});

const PORT = 8081;

app.listen(PORT, () => {
    console.log(`Server running on: http://localhost:${PORT}`);
});

