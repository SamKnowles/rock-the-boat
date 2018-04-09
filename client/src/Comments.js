import React, { Component } from 'react'

export default class Comments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: ''
        }
    }
    handleChange = (e) => {
        let { value } = e.target;
        this.setState((prevState) => {
            return {
                comment: value
            }
        });
    }
    clearInput = () => {
        this.setState({
            comment: ''
        });
    }
    submitComment = (e) => {
        e.preventDefault();
        let { currentIssue } = this.props;
        let { comment } = this.state;
        currentIssue.comments.push(comment);
        this.props.issueEdit(currentIssue, currentIssue._id);
        this.clearInput();
    }
    deleteComment = (comment) => {
        let { currentIssue } = this.props;
        for (let i = 0; i < currentIssue.comments.length; i++) {
            if (currentIssue.comments[i] === comment) {
                currentIssue.comments.splice(i, 1);
                break;
            }
        }
        this.props.issueEdit(currentIssue, currentIssue._id);
    }
    render() {
        return (
            <div>
                <div>
                    {this.props.currentIssue.comments.map((comment, index) => {
                        return (
                            <div className='single-comment' key={index}>
                                <div className='comment-text'>{comment}</div>
                                <button className='delete-comment' onClick={() => { this.deleteComment(comment) }}>X</button>
                            </div>
                        );
                    })}
                </div>
                <form className='comment-form' onSubmit={this.submitComment}>
                    <textarea className='comment-box' onChange={this.handleChange} value={this.state.comment} name="comment" placeholder='Please leave a comment' ></textarea>
                    <button className='post-comment'>POST</button>
                </form>
            </div>
        )
    }
}
