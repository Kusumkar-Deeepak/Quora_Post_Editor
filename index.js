const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const { v4 : uuidv4} = require('uuid')
var methodOverride = require('method-override')

app.use(express.urlencoded({ extended: true }))

// override with the X-HTTP-Method-Override header in the request
app.use(methodOverride('_method'))

app.set("view engine", 'ejs')
app.set("views", path.join(__dirname, "views"))
app.set("public", express.static(path.join(__dirname, "public")))

let posts = [
    {
        id: uuidv4(),
        Username: "Deepak Kusumkar",
        content: "Closures are a fundamental concept in JavaScript that allow functions to access variables from an enclosing scope, even after that scope has closed."
    },
    {
        id: uuidv4(),
        Username: "Abhi Joshi",
        content: "Node.js is a powerful tool for building server-side applications. It uses an event-driven, non-blocking I/O model, making it lightweight and efficient."
    },
    {
        id: uuidv4(),
        Username: "Rushi Karlekar",
        content: "CSS Grid Layout is a two-dimensional layout system for the web. It allows developers to create complex and responsive layouts with ease."
    },
    {
        id: uuidv4(),
        Username: "Omanand Swami",
        content: "React Hooks provide a new way to use state and other React features without writing a class. They simplify the code and make it more readable."
    },
    {
        id: uuidv4(),
        Username: "Vedant Patil",
        content: "MongoDB is a NoSQL database that stores data in JSON-like documents. It's known for its flexibility and scalability, making it a popular choice for modern applications."
    },
    {
        id: uuidv4(),
        Username: "Somesh Bharbade",
        content: "Express.js is a web application framework for Node.js, designed for building RESTful APIs. It provides a robust set of features for web and mobile applications."
    }
];



app.get("/posts", (req, res) => {
    res.render("index.ejs",{posts})
})

app.get("/posts/new" , (req,res) => {
    res.render("form.ejs")
})

app.post("/posts" , (req,res) => {
    const {Username , content} = req.body
    let id = uuidv4();
    posts.push({id, Username, content}) 
    // res.send("Post Request Is Working")
    res.redirect("/posts")
})

app.get("/posts/:id" , (req,res) => {
    let { id } = req.params
    let post = posts.find((p) => id === p.id)
    res.render("show.ejs" , {post})
})

app.patch("/posts/:id" , (req,res) => {
    let { id } = req.params
    let newContent = req.body.content
    let post = posts.find((p) => id === p.id)
    if (post) {
        post.content = newContent
        res.redirect(`/posts`)
    } else {
        res.status(404).send("Post not found")
    }
    // console.log(post)
    // res.send("working")
})

app.get("/posts/:id/edit",(req,res) => {
    let { id } = req.params
    let post = posts.find((p) => id === p.id)
    // console.log(id,post)
    res.render("editForm.ejs",{post})
})

app.delete("/posts/:id", (req, res) => {
    let { id } = req.params
    posts = posts.filter((p) => p.id !== id)
    res.redirect("/posts")
})

app.listen(port, () => {
    console.log(`The App Is Listening On Port : ${port}`)
})