// Importing Modules
const express = require('express')
const path = require('path')
const mg = require('mongoose')
const parser = require('body-parser')

// Making main things for the app
const app = express()
mg.connect('mongodb://localhost/contactDance', {useNewUrlParser: true, useUnifiedTopology: true})

// Creating Shema for MongoDB
const contactD = new mg.Schema({
    name: String,
    email: String,
    phone: Number,
    address: String,
    desc: String
})
const Cschema = mg.model('Contact', contactD)

// Statics
app.use('/static', express.static('static'))
app.use(express.urlencoded())

// Setiing view as Pug
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

// Endpoints
app.get('/', (req, res)=>{
    res.status(200).render('index.pug')
})

app.get('/contact', (req, res)=>{
    res.status(200).render('contact.pug')
})
app.post('/contact', (req, res)=>{
    contactSc = req.body
    let contact = new Cschema({
        name: contactSc.name,
        email: contactSc.email,
        phone: contactSc.phone,
        address: contactSc.address,
        desc: contactSc.desc
    })
    contact.save().then(()=>{
        res.send("Your data has been saves").status(200)
    }).catch(()=>{
        res.send("Your data was not been saved to database").status(400)
    })
})

// Starting the app
app.listen(5500, ()=>{
    console.log("App started succesfully");
})