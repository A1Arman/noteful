import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import { countNotesForFolder } from '../notes-helpers'
import PropTypes from 'prop-types'
import './NoteListNav.css'

export default class NoteListNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      folders: [],
      error: ''
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
        console.log(data);
        this.setState({folders: data});
      })
      .catch(err => {
        this.setState({
          error: err.message
        });
      });
}

  render() {
    return (
      <div className='NoteListNav'>
        <ul className='NoteListNav__list'>
          {this.state.folders.map(folder =>
            <li key={folder.id}>
              <NavLink
                className='NoteListNav__folder-link'
                to={`/folder/${folder.id}`}
              >
                <span className='NoteListNav__num-notes'>
                  {countNotesForFolder(this.props.notes, folder.id)}
                </span>
                {folder.name}
              </NavLink>
            </li>
          )}
        </ul>
        <div className='NoteListNav__button-wrapper'>
          <CircleButton
            tag={Link}
            to='/add-folder'
            type='button'
            className='NoteListNav__add-folder-button'
          >
            <FontAwesomeIcon icon='plus' />
            <br />
            Folder
          </CircleButton>
        </div>
      </div>
    )
  }  
}

NoteListNav.defaultProps = {
  folders: []
}


NoteListNav.propTypes = {
  folders: PropTypes.arrayOf(PropTypes.object)
}