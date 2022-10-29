//App imports modules
import express from "express"
//Password encryptions
import bcrypt from "bcrypt"
//Database
import mysql from "mysql"

import { renderPage } from "./util/templateEngine.js";
import { db } from "./dbServer.js";

//Initialized express library on cost app
const app = express();

app.use(express.static("public"));

//express.urlencoded is used to read the email and password input directly from the html with fx. req.body.email with the id from html
app.use(express.urlencoded({
    extended: true
}))

app.use(express.json());

//Dynamic port
const PORT = process.env.PORT || 8080;


//Serverside rendering
const frontPageRender = renderPage("/frontpage/frontpage.html",
{
    tabTitle: "MichaelPedia",
    cssLink: `<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">`
    + `<link rel="stylesheet" href="./pages/frontpage/frontpage.css">`
}
)

const loginPageRender = renderPage("/login_signup/login.html", {
    tabTitle: "Login",
    cssLink: `<link rel="stylesheet" href="./pages/login_signup/style.css">` 
    + `<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">`
})

const signupPageRender = renderPage("/login_signup/signup.html", {
    tabTitle: "Signup",
    cssLink: `<link rel="stylesheet" href="./pages/login_signup/style.css">` 
    + `<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">`
})

const javascriptPage = renderPage("/topics/javascript/javascript.html", {
    tabTitle: "Javascript",
    cssLink: `<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">`
    + `<link rel="stylesheet" href="./pages/frontpage/frontpage.css">`
})

const restApiPage = renderPage("/topics/rest_api/restapi.html", {
    tabTitle: "REST API",
    cssLink: `<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">`
})

const nodeJSPage = renderPage("/topics/nodejs/nodejs.html", {
    tabTitle: "NodeJS",
    cssLink: `<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">`
})

const adminPage = renderPage("/admin_panel/admin.html", {
    tabTitle: "AdminPanel",
    cssLink: `<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">`
})

app.get("/", (req, res) => {
    res.send(frontPageRender);
});

app.get("/login", (req, res) => {
    res.send(loginPageRender);
});

app.get("/signup", (req, res) => {
    res.send(signupPageRender);
});

app.get("/javascript", (req, res) => {
    res.send(javascriptPage);
})

app.get("/restapi", (req, res) => {
    res.send(restApiPage);
})

app.get("/nodejs", (req, res)=> {
    res.send(nodeJSPage);
})

app.get("/adminpanel", (req, res) => {
    res.send(adminPage);
})


//Post a new user
//It is possible with importing mysql to use direct sql commands and store them in variables
app.post("/signup", async (req, res) => {
    const user = req.body.email
    const hashedPassword = await bcrypt.hash(req.body.password,10);

    db.getConnection( async (err, connection) => {
        if (err) throw (err)
        const sqlSearch = "SELECT * FROM usertable WHERE user = ?"
        const search_query = mysql.format(sqlSearch,[user])
        const sqlInsert = "INSERT INTO usertable VALUES (0,?,?)"
        const insert_query = mysql.format(sqlInsert,[user, hashedPassword])

        await connection.query (search_query, async (err, result) => {
            if (result.length != 0) {
             connection.release()
             console.log("------> User already exists")
             res.redirect("/signup")
            } 
            else {
             await connection.query (insert_query, (err, result)=> {
             connection.release()
             if (err) throw (err)
             console.log ("--------> Created new User")
             console.log(result.insertId)
             res.redirect("/login")
            })
           }
        })
    })
})

//Login auth
app.post("/login", (req, res)=> {
    const user = req.body.email
    const password = req.body.password

    db.getConnection ( async (err, connection)=> {
        if (err) throw (err)
        const sqlSearch = "Select * from usertable where user = ?"
        const search_query = mysql.format(sqlSearch,[user])
        await connection.query (search_query, async (err, result) => {
        connection.release()
      
        if (err) throw (err)
        else {
            const hashedPassword = result[0].password
             //get the hashedPassword from result
            if (await bcrypt.compare(password, hashedPassword)) {
            res.redirect("/adminpanel")
            }
            else {
            res.send("Password or email incorrect!")
            }
        }
        })
    })
})


const server = app.listen(PORT, (error)=> {
    if(error){
        console.log(error)
    }
    console.log("Server is running on port", server.address().port)
})