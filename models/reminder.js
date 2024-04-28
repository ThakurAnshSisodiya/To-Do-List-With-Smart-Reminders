const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task'
  },
  reminderTime: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('Reminder', reminderSchema);