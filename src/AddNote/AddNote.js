import React, { Component } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import PropTypes from 'prop-types';
import './AddNote.css'

export default class AddNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      modified: '',
      folderId: '',
      content: '',
      validationMessages: {
        name: ''
      }
    }
  }

  nameValidationChange = (name) => {
    this.validateName(name)
  }

  nameChange = (name) => {
    this.setState({name})
  }

  contentChange = (content) => {
    this.setState({content})
  }

  folderIdChange = (folderId) => {
    this.setState({folderId})
  }

  handleSubmition = (e) => {
    this.nameValidationChange(this.state.name);
    e.preventDefault();
    const note = (({id, name, modified, folderId, content}) => ({id, name, modified, folderId, content}))(this.state);
    const url = 'http://localhost:9090/notes';
    const options = {
      method: 'POST',
      body: JSON.stringify(note),
      headers: {
        'Content-Type': 'application/json'
      }
    }


    if(this.state.validationMessages.name) {
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
        this.setState({id: '', name: '', modified: '', folderId: '', content: '', validationMessages: {name: ''}});
      })
      .catch(err => {
        this.setState({
          error: err.message
        });
      });
    }
      
  }

  static defaultProps = {
    folders: [],
  }

  validateName(fieldValue) {
    const fieldErrors = Object.assign({}, this.state.validationMessages);

    fieldValue = fieldValue.trim();

    if(fieldValue.length === 0) {
      fieldErrors.name = 'Name is required';
    }

    this.setState({
      validationMessages: fieldErrors,
    });
  }

  render() {
    const { folders } = this.props
    return (
      <section className='AddNote'>
        <h2>Create a note</h2>
        <NotefulForm onSubmit={e => this.handleSubmition(e)}>
          <div className='field'>
            <label htmlFor='note-name-input'>
              Name
            </label>
            <input 
              type='text' 
              id='note-name-input' 
              value={this.state.name}
              onChange={name => this.nameChange(name.target.value)}
              />
            <span>{this.state.validationMessages.name}</span>
          </div>
          <div className='field'>
            <label htmlFor='note-content-input'>
              Content
            </label>
            <textarea 
              id='note-content-input'
              value={this.state.content} 
              onChange={content => this.contentChange(content.target.value)}
            />
          </div>
          <div className='field'>
            <label htmlFor='note-folder-select'>
              Folder
            </label>
            <select id='note-folder-select' value={this.state.folderId} onChange={folder => this.folderIdChange(folder.target.value)}>
              <option value={null}>...</option>
              {folders.map(folder =>
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              )}
            </select>
          </div>
          <div className='buttons'>
            <button type='submit'>
              Add note
            </button>
          </div>
        </NotefulForm>
      </section>
    )
  }
}

AddNote.defaultProps = {
  folders: []
}

AddNote.propTypes = {
  folders: PropTypes.array
}