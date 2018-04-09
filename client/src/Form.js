import React, { Component } from 'react'

 

export default class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputs: {
                title: '',
                description: ''
            }
        }
    }
    handleChange = (e) => {
        let { name, value } = e.target;
        this.setState(prevState => {
            return {
                inputs: {
                    ...prevState.inputs,
                    [name]: value
                }
            }
        });
    }
    clearInputs = () => {
        this.setState({
            inputs: {
                title: '',
                description: ''
            }
        })
    }

    handleSubmit = (e) => {
        let {add, id} = this.props;
        e.preventDefault();
        this.clearInputs();
        if (add) {
            this.props.submit(this.state.inputs);            
        }
        else {
            this.props.submit(this.state.inputs, id);
            this.props.options.toggleDisplay();
        }
    }

    render() {
        let {title, description} = this.state.inputs;
        return (
            <div>
               <form className='form-wrapper'>
                   <input onChange={this.handleChange} className='title-input' type="text" placeholder='Title' value={title} name='title'/>
                   <input onChange={this.handleChange} className='description-input'type="text" placeholder='Description' value={description} name='description' />
                   <button className='submit' type='submit' onClick={this.handleSubmit}>Submit</button>
                </form> 
            </div>
        )
    }
}

