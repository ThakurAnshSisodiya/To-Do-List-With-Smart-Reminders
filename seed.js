const mongoose = require('mongoose');
const Task = require('./models/task');

mongoose.connect('mongodb://localhost:27017/todo_list')
    .then(()=>console.log('DB conected successfully'))
    .catch((err)=>{console.log(err)});

    const dummy_data = [
        {
            name:'i am going to agra',
            deadline:4/4/2024
        },
        {
            name:'mumbai',
            deadline:23/4/2024
        }
    ]


    Task.create(dummy_data)
    .then(()=>{console.log('document created successfully')})