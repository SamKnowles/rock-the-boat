import React, { Component } from 'react'
import axios from 'axios';
import Issue from './Issue';
import Form from './Form';


export default class Issues extends Component {
    constructor(props) {
        super(props);
        this.state = {
            issues: [],
            loading: true
        };
    }
    componentDidMount() {
        axios.get('/issue/')
            .then((response) => {
                this.setState({
                    issues: (response.data),
                    loading: false
                })
            })
    }
    formSubmit = (newIssue) => {
        axios.post('/issue/', newIssue)
            .then((response) => {
                console.log(response);
                this.setState(prevState => {
                    let { issues } = prevState;
                    return {
                        issues: [...issues, response.data],
                    };
                })
            });
    }
    issueDelete = (id) => {
        let { issues } = this.state;
        axios.delete('/issue/' + id)
            .then(response => {
                this.setState({
                    issues: issues.filter((issue, index) => {
                        console.log(issue);
                        return issue._id !== id
                    }),
                    loading: false
                });
            })
            .catch((err) => {
                console.error(err);
            });
    }
    issueEdit = (updatedIssue, id) => {
        let { issues } = this.state;
        axios.put('/issue/' + id, updatedIssue)
            .then(response => {
                this.setState({
                    issues: issues.map((issue) => {
                        if (issue._id === id) {
                            return response.data;
                        }
                        else {
                            return issue;
                        }
                    }),
                    loading: false
                })
            })
    }



    render() {

        let { issues } = this.state;
        console.log(issues);
        return (
            <div>
                <Form add submit={this.formSubmit}></Form>
                {issues.sort((a, b) => {
                    console.log(a);
                    console.log(b);
                    if (a.count > b.count) {
                        return -1;
                    }
                    else if (a.count < b.count) {
                        return 1;
                    }
                    else {
                        return 0;
                    }
                })
                    .map((issue, index) => {
                        return <Issue issue={issue} key={index} issueDelete={this.issueDelete} issueEdit={this.issueEdit} ></Issue>
                    })}
            </div>
        )
    }
}
