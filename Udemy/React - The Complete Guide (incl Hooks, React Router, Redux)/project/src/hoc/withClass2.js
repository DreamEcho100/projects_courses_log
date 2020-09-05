import React from 'react';

const withClass2 = (WrapperComponent, className) => {
	return props => (
		<section className={className}>
			<WrapperComponent />
		</section>
	);
};

export default withClass2;