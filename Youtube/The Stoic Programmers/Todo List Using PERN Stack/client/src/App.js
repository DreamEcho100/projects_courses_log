import React, { useState } from 'react';
import './App.css';

// Components
import InputTodo from './Components/InputTodo/InputTodo';
import ListTodos from './Components/ListTodos/ListTodos';

function App() {
	const [todos, setTodos] = useState([]);

	return (
		<div className='container'>
			<InputTodo todos={todos} setTodos={setTodos} />
			<ListTodos todos={todos} setTodos={setTodos} />
		</div>
	);
}

export default App;
