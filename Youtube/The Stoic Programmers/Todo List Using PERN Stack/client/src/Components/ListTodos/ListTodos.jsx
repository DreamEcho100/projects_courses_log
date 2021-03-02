import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { getTodos, deleteTodo } from '../../redux/todos/actions';
import EditTodo from '../EditTodo/EditTodo';

const ListTodos = ({ todos, getTodos, deleteTodo }) => {
	useEffect(() => {
		getTodos();
	}, []);

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
						: todos.items.map((item) => (
								<tr key={item.id}>
									<td>{item.description}</td>
									<td>
										<EditTodo item={item} items={todos.items} />
									</td>
									<td>
										<button
											className='btn btn-danger'
											onClick={() => deleteTodo(todos.items, item.id)}
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
	deleteTodo: (items, id) => dispatch(deleteTodo(items, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListTodos);
