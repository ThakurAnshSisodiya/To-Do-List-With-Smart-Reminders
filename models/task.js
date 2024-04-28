

const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  deadline: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('Task', taskSchema);
