const ADD_TODO = 'ADD_TODO'
const addTodo = text => ({ type: ADD_TODO, text, })

module.exports = {
  ADD_TODO,

  addTodo,
}
