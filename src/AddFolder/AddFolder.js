import React, { Component } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import './AddFolder.css'

export default class AddFolder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: ''
    }
  }

  handleChange = (e) => {
    this.setState({name: e.target.value})
  }

  handleSubmition = (e) => {
    e.preventDefault();
    const folderName = (({id, name}) => ({id, name}))(this.state);
    const url = 'http://localhost:9090/folders';
    const options = {
      method: 'POST',
      body: JSON.stringify(folderName),
      headers: {
        'Content-Type': 'application/json'
      }
    }

    if(this.state.name) {
      fetch(url, options)
      .then(res => {
        if(res.ok) {
          return res.json();
        }
        else {
          throw new Error('Something went wrong');
        }
      })
      .then(data => {
        this.setState({id: '', name: ''});
      })
      .catch(err => {
        this.setState({
          error: err.message
        });
      });
    }
    
      
  }

  render() {
    return (
      <section className='AddFolder'>
        <h2>Create a folder</h2>
        <NotefulForm handler={this.handleSubmition}>
          <div className='field'>
            <label htmlFor='folder-name-input'>
              Name
            </label>
            <input type='text' value={this.state.name} onChange={this.handleChange} id='folder-name-input' />
          </div>
          <div className='buttons'>
            <button type='submit'>
              Add folder
            </button>
          </div>
        </NotefulForm>
      </section>
    )
  }
}
