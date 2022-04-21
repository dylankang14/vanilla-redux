import { createStore } from "redux";

const form = document.querySelector('form');
const input = document.querySelector('input');
const ul = document.querySelector('ul');

const addTodo = (text) => {
  return {
    type: 'addTodo',
    text
  }
}
const delTodo = (id) => {
  return {
    type: 'delTodo',
    id
  }
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'addTodo':
      return [{ text: action.text, id: Date.now() }, ...state];
    case 'delTodo':
      return state.filter(todo => todo.id != action.id);
    default:
      return state;
  }
}

const store = createStore(reducer);

const dispatchAdd = (todo) => {
  store.dispatch(addTodo(todo));
}

const dispatchDel = (e) => {
  const id = e.target.parentNode.id;
  store.dispatch(delTodo(id));
}

const renderTodo = () => {
  ul.innerText = '';
  const todos = store.getState();
  todos.forEach(i => {
    const li = document.createElement('li');
    const button = document.createElement('button');
    button.addEventListener('click', dispatchDel);
    li.innerText = i.text;
    li.id = i.id;
    button.innerText = 'DEL';
    li.appendChild(button);
    ul.appendChild(li);
  });
}

store.subscribe(renderTodo);

const handleTodo = (e) => {
  e.preventDefault();
  const todo = input.value;
  input.value = '';
  if (todo != '') {
    dispatchAdd(todo);
  }
}

form.addEventListener('submit', handleTodo);