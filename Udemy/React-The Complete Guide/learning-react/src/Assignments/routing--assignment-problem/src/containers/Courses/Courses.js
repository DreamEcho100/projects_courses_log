import React, { Component, Fragment/* ,Suspense*/ } from 'react';
import { Link, Route } from "react-router-dom";

import './Courses.css';
import Course from "../Course/Course";



/*const Course = React.lazy(() =>  import("../Course/Course"));
const AsyncCourse = (() =>
  <Suspense fallback={<div style={{ textAlign: "center", fontSize: "3rem" }}>Loading...</div>}>
    <Course />
  </Suspense>
);*/

class Courses extends Component {
    state = {
        courses: [
            { id: 1, title: 'Angular - The Complete Guide' },
            { id: 2, title: 'Vue - The Complete Guide' },
            { id: 3, title: 'PWA - The Complete Guide' }
        ]
    }

    render () {
        return (
            <Fragment>
                <div className="Courses">
                    <h1 style={{width: "100%"}}>Amazing Udemy Courses</h1>
                    <br />
                    <section className="Courses">
                        {
                            this.state.courses.map( course => {
                                return (
                                    <Link key={course.id} to={{
                                        pathname: `${this.props.match.url}/${course.id}`,
                                        search: `?courstitle=${course.title}`,
                                        // pathname: this.props.match.url + '/' + course.id,
                                        // search: '?title=' + course.title,
                                    }}>
                                        <article className="Course">{course.title}</article>
                                    </Link>
                                );
                            } )
                        }
                    </section>
                </div>
                {/* <Route path={this.props.match.url + '/:courseId'} component={Course} /> */}
                <Route path={ `${this.props.match.url}/:courseId` } exact component={Course} />
            </Fragment>
        );
    }
}

export default Courses;