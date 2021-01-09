import React, { Component } from 'react';

class Course extends Component {
	state = {
		courseTitle: ""
	}

	componentDidMount() {
		this.paseQueryParams();
	}

	componentDidUpdate() {
		this.paseQueryParams();
	}

	paseQueryParams() {
		console.log(this.props);
		const query = new URLSearchParams(this.props.location.search);
		console.log(query);
		for (let param of query) {
			console.log(param);
			if(this.state.courseTitle !== param[1]) {
				this.setState({courseTitle: param[1]});
			}
		}
	}

  render () {
    return (
        <div style={{width: "100%"}}>
            <h1>{this.state.courseTitle}</h1>
            <p>You selected the {this.state.courseTitle} Course with ID: {this.props.match.params.courseId}</p>
        </div>
    );
  }
}

export default Course;