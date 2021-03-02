import React, { Fragment, useState } from 'react';

const EditTodo = ({ todo, todos, setTodos }) => {
	const [hideModule, setHideModule] = useState(true);
	const [editedDescription, setEditedDescription] = useState(
		todo.description.slice()
	);
	const updateDescription = async (e) => {
		e.preventDefault();
		try {
			const id = todo.id;
			const description = editedDescription;
			console.log(id, description, todo);
			/*const response = */ await fetch(`http://localhost:5000/todos/${id}`, {
				method: 'PUT',
				headers: { 'Content-type': 'application/json' },
				body: JSON.stringify({ description }),
			});

			setTodos(
				todos.map((todo) => {
					if (todo.id === id) {
						todo.description = description;
					}
					return todo;
				})
			);
			console.log(todos);
			// window.location = '/';
		} catch (error) {
			console.error(error.message, error);
		}
	};

	return (
		<Fragment>
			<button
				className='btn btn-warning'
				data-toggle='modal'
				data-target={`#id${todo.id}`}
				onClick={() => setHideModule(!hideModule)}
			>
				Edit
			</button>

			{hideModule ? null : (
				<div
					className='modal'
					style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.9)' }}
				>
					{/*onClick={(event) => {
						if (!event) event = window.event;

						//IE9 & Other Browsers
						if (event.stopPropagation) {
							event.stopPropagation();
						}
						//IE8 and Lower
						else {
							event.cancelBubble = true;
						}
						setHideModule(!hideModule);
					}}
					id={`id${todo.id}`}*/}
					<div className='modal-dialog'>
						<div className='modal-content'>
							<div className='modal-header'>
								<h4 className='modal-title'>Edit Todo</h4>
								<button
									type='button'
									className='close'
									data-dismiss='modal'
									onClick={() => setHideModule(!hideModule)}
								>
									&times;
								</button>
							</div>

							<div className='modal-body'>
								<input
									type='text'
									className='form-control'
									value={editedDescription}
									onChange={(e) => setEditedDescription(e.target.value)}
								/>
							</div>

							<div className='modal-footer'>
								<button
									type='button'
									className='btn btn-warning'
									data-dismiss='modal'
									onClick={(e) => updateDescription(e)}
								>
									Edit
								</button>
								<button
									type='button'
									className='btn btn-danger'
									data-dismiss='modal'
									onClick={() => setHideModule(!hideModule)}
								>
									Close
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</Fragment>
	);
};

export default EditTodo;
