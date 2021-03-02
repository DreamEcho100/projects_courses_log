import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { updateTodo } from '../../redux/todos/actions';

const EditTodo = ({ item, items, updateTodo }) => {
	const [hideModule, setHideModule] = useState(true);
	const [editedDescription, setEditedDescription] = useState(
		item.description.slice()
	);

	const updateDescription = async (e) => {
		e.preventDefault();
		if (editedDescription === '') {
			return;
		}
		updateTodo(items, item.id, editedDescription);
		setHideModule(true);
	};

	return (
		<Fragment>
			<button
				className='btn btn-warning'
				data-toggle='modal'
				data-target={`#id${item.id}`}
				onClick={() => setHideModule(false)}
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
									onClick={() => setHideModule(true)}
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
									onClick={() => setHideModule(true)}
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
const mapDispatchToProps = (dispatch) => ({
	updateTodo: (items, id, description) =>
		dispatch(updateTodo(items, id, description)),
});

export default connect(null, mapDispatchToProps)(EditTodo);
