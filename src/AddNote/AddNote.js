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
      validate: false,
      fieldErrors: '',
      folders: [],
      folderVal: ''
    }
  }

  componentDidMount() {
    const url = 'http://localhost:9090/folders';
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
  }

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
        this.setState({folders: data});
      })
      .catch(err => {
        this.setState({
          error: err.message
        });
      });
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
    this.validateFolder(this.state.folderId);
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


    if(!(this.state.name.length === 0) && !(this.state.folderId === '...') && !(this.state.folderId === '')) {
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
        this.setState({id: '', name: '', modified: '', folderId: '', content: '', validationMessages: {name: ''}, fieldErrors: '', folderVal: ''});
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
    fieldValue = fieldValue.trim();


    if(fieldValue.length === 0) {
      const error = 'Name is required';
      this.setState({
        fieldErrors: error
      });
    }
  }

  validateFolder(folderId) {
    if(folderId === '...' || folderId === '') {
      this.setState({folderVal: 'Please select a valid folder'})
    }
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
            <span>{this.state.fieldErrors}</span>
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
              {this.state.folders.map(folder =>
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              )}
            </select>
            <span>{this.state.folderVal}</span>
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