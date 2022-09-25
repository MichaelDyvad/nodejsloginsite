import express from "express"
import path from "path"

const app = express();

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(path.resolve("./public/login.html"));
});

app.get("/signup", (req, res) => {
    res.sendFile(path.resolve("./public/signup.html"));
});

app.listen(8080, (error)=> {
    console.log("port running on:", 8080)
    console.log()
})


