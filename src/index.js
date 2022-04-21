import { createStore } from "redux";

const span = document.querySelector('span');
const add = document.getElementById('add');
const minus = document.getElementById('minus');

span.innerText = 0;

const counterReducer = (count = 0, action) => {
  switch (action.type) {
    case 'add':
      return count + 1;
    case 'minus':
      return count - 1;
    default:
      return count;
  }
}

const counterStore = createStore(counterReducer);

const onChange = () => {
  span.innerText = counterStore.getState();
}

counterStore.subscribe(onChange);

const handleAdd = () => {
  counterStore.dispatch({ type: 'add' });
}
const handleMinus = () => {
  counterStore.dispatch({ type: 'minus' });
}

add.addEventListener('click', handleAdd);
minus.addEventListener('click', handleMinus);