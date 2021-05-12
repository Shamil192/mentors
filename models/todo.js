const { model, Schema } = require("mongoose");

const todoSchema = new Schema({
  title: String,
  body: String,
});


const Todo = model('Todo', todoSchema)

module.exports = Todo
