
const express = require ( 'express')
const bodyparser = require ( 'body-parser')
const mongoose = require ( 'mongoose')
const dotenv = require ( 'dotenv')
const path = require ('path')

const app = express()
dotenv.config()
const port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost/signup');

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});
const user = mongoose.model ('user', userSchema)

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname, 'public', 'signup.html'));
})

app.post( '/signup', async ( req , res ) => {
    const { username , email , password } = req.body;
    try {
        const newuser = new user ({ username , email , password});
        await newuser.save();
        res.json({ message: 'user signed up successfully!'});

    }
    catch(error){
        res.json({ message: 'Error '})
    }
});

app.listen ( port , () => {
    console.log ( `server is running on port ${port}`)
} )
