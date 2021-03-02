import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../../redux/todos/actions';

const InputTodo = ({ todos, addTodo }) => {
	const [description, setDescription] = useState('');

	const onSubmitForm = async (event) => {
		event.preventDefault();
		if (description === '') {
			return;
		}
		try {
			addTodo(todos.items, description);
			setDescription('');
		} catch (error) {
			console.error(error.message, error);
		}
		/*if (description === '') {
			return;
		}
		try {
			const body = { description };
			const response = await fetch('http://localhost:5000/todos', {
				method: 'POST',
				headers: { 'Content-type': 'application/json' },
				body: JSON.stringify(body),
			});
			const data = await response.json();
			setTodos([...todos, data]);
			setDescription('');
			// window.location = '/';
		} catch (error) {
			console.error(error.message, error);
		}*/
	};

	return (
		<Fragment>
			<h1 className='text-center mt-5'>Pern Todo List</h1>
			<form className='d-flex mt-5' onSubmit={onSubmitForm}>
				<input
					type='text'
					className='form-control'
					value={description}
					onChange={(event) => setDescription(event.target.value)}
				/>
				<button className='btn btn-success'>Add</button>
			</form>
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	todos: state.todos,
});

const mapDispatchToProps = (dispatch) => ({
	addTodo: (items, description) => dispatch(addTodo(items, description)),
});

export default connect(mapStateToProps, mapDispatchToProps)(InputTodo);
