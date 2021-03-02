import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { getTodos, deleteTodo } from '../../redux/todos/actions';
import EditTodo from '../EditTodo/EditTodo';

const ListTodos = ({ todos, getTodos, deleteTodo }) => {
	console.log(deleteTodo);
	useEffect(() => {
		getTodos();
		console.log(deleteTodo);
	}, []); /*const deleteTodo = async (id) => {
		try {
			/*const id = await fetch(`http://localhost:5000/todos/${id}`, {
				method: 'DELETE',
			});

			setTodos(todos.filter((todo) => todo.id !== id));
		} catch (error) {
			console.error(error.message, error);
		}
	};*/

	return (
		<Fragment>
			<table className='table mt-5 text-center'>
				<thead>
					<tr>
						<th>Description</th>
						<th>Edit</th>
						<th>Delete</th>
					</tr>
				</thead>
				<tbody>
					{todos.isGetTodosPending
						? null
						: todos.data.map((todo) => (
								<tr key={todo.id}>
									<td>{todo.description}</td>
									<td></td>
									<td>
										<button
											className='btn btn-danger'
											onClick={() => deleteTodo(todo.id, todos.data)}
										>
											Delete
										</button>
									</td>
								</tr>
						  ))}
				</tbody>
			</table>
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	todos: state.todos,
});

const mapDispatchToProps = (dispatch) => ({
	getTodos: () => dispatch(getTodos()),
	deleteTodo: (id, data) => dispatch(deleteTodo(id, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListTodos);

/*

					{todos.map((todo) => (
						<tr key={todo.id}>
							<td>{todo.description}</td>
							<td>
								<EditTodo todo={todo} todos={todos} setTodos={setTodos} />
							</td>
							<td>
								<button
									className='btn btn-danger'
									onClick={() => deleteTodo(todo.id)}
								>
									Delete
								</button>
							</td>
						</tr>
					))}
*/
