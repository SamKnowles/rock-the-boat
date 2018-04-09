import React, { Component } from 'react';
import Comments from './Comments';
import Form from './Form';


class Issue extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            count: 0
        }

    }
    toggleDisplay = () => {
        this.setState((prevState) => {
            return {
                isEditing: !this.state.isEditing,
            }
        })
    }
    addOne = (issue, id) => {
        this.props.issueEdit(issue, id)
        this.setState((prevState) => {
            return {
                count: this.state.count + 1
            }
        })
        console.log(this.state.count);

    }
    minusOne = (issue, id) => {
        this.props.issueEdit(issue, id)
        this.setState((prevState) => {
            return {
                count: this.state.count - 1
            }
        })
    }

    render() {
        let { issueDelete, issueEdit, issue } = this.props;
        let { title, _id, description, count } = issue;
        return (
            <div>
                <div>
                    <p>Title: {title}</p>
                    <p>Description: {description}</p>
                    <p>Comment section</p>
                    <div>
                        <button type='button' onClick={() => { issueEdit({count: count + 1 }, _id) }}>↑</button>
                        <h1>{count}</h1>
                        <button type='button' onClick={() => { issueEdit({count: count - 1 }, _id) }}>↓</button>
                        <button type='button' className='issue-delete-button' onClick={() => { issueDelete(_id) }}>DELETE</button>
                        <button type='button' className='issue-edit-button' onClick={() => { this.toggleDisplay() }}>Edit</button>
                        <div style={{ display: this.state.isEditing ? 'initial' : 'none' }}>
                            <Form submit={issueEdit} id={_id} options={{ toggleDisplay: this.toggleDisplay }}></Form>
                        </div>
                        <Comments issueEdit={issueEdit}currentIssue={issue}></Comments>
                    </div>
                </div>
            </div>
        )
    }
}


export default Issue;