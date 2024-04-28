const express = require('express');
const app = express();
const path = require('path');

const bodyParser=require('body-parser');
const schedule = require('node-schedule');

const nodemailer = require('nodemailer');

const mongoose = require('mongoose');
const Task = require('./models/task');

app.set('view engine','ejs');
app.set(path.join(__dirname,'views'));

app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:true}));

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'kanhaiyasingh12334356@gmail.com',
        pass: 'fvvu amnx ezfw acoc'
    }
});



mongoose.connect('mongodb://localhost:27017/todo_list')
    .then(()=>console.log(' DB connected successfully'))
    .catch((err)=>{console.log(err)});

    app.get('/',async (req,res)=>{
        const tasks = await Task.find({});
        console.log(tasks);
        res.render('tasks',{tasks})
    })


    app.get('/task/new',(req,res)=>{
        res.render('new')
    })
    
    app.post('/task/new',async(req,res)=>{
    console.log(req.body);
    const {name,deadline} = req.body;
    await Task.create({name,deadline});

    const mailOptions = {
        from: 'kanhaiyasingh12334356@gmail.com',
        to: 'kanhaiya.gla_cs22@gla.ac.in,kanhaiyasingh12334356@gmail.com,jatintiwari285828@gmail.com,rohansaraswat04@gmail.com',
        subject: 'New task created',
        text: `A new task "${name}" has been created with a deadline of ${deadline}.`
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    res.redirect('/');
    })


    app.get('/task/edit/:id',async (req,res)=>{
        const {id} = req.params;
        const task = await Task.findOne({_id:id});
        console.log(task);
        res.render('edit',{task});
    })
    app.post('/task/edit/:id',async (req,res)=>{
        const {id} = req.params;
        const {name,deadline} = req.body;
         
        await Task.updateOne({_id:id},{name,deadline});
        res.redirect('/')
    })
    
    app.post('/task/delete/:id', async (req,res)=>{
        const {id} = req.params;
        await Task.deleteOne({_id:id});
        res.redirect('/')
     })

// const taskRoutes = require('./routes/task');
// const newRoutes = require('./routes/new');

// app.use(taskRoutes);
// app.use(newRoutes);



const midnightJob = schedule.scheduleJob('0 0 * * *', async () => {

    const mailOptions = {
        from: 'kanhaiyasingh12334356@gmail.com',
        to: 'kanhaiya.gla_cs22@gla.ac.in,kanhaiyasingh12334356@gmail.com,jatintiwari285828@gmail.com,rohansaraswat04@gmail.com',
        subject: 'your task is expire',
        text: `A task "${name}" has been deleted with a deadline of ${deadline}.`
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    await Task.deleteMany({ deadline: { $lt: new Date() } }); 

});



const PORT = 3000;
app.listen(PORT,()=>{
    console.log('server run at port',PORT);
})









    