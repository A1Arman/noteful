import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Note from '../Note/Note'
import CircleButton from '../CircleButton/CircleButton'
import NoteError from '../NoteError'
import PropTypes from 'prop-types'
import './NoteListMain.css'

export default class NoteListMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: []
    }
  }

  componentDidMount() {
    const url = 'http://localhost:9090/notes';
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
        this.setState({notes: data});
      })
      .catch(err => {
        this.setState({
          error: err.message
        });
      });
}

  render() {
    return (
      <section className='NoteListMain'>
        <NoteError>
          <ul>
            {this.state.notes.map(note =>
              <li key={note.id}>
                <Note
                  id={note.id}
                  name={note.name}
                  modified={note.modified}
                />
              </li>
            )}
          </ul>
          <div className='NoteListMain__button-container'>
            <CircleButton
              tag={Link}
              to='/add-note'
              type='button'
              className='NoteListMain__add-note-button'
            >
              <FontAwesomeIcon icon='plus' />
              <br />
              Note
            </CircleButton>
          </div>
        </NoteError>
      </section>
    )
  }
}

NoteListMain.defaultProps = {
  notes: [],
}


NoteListMain.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.required,
    name: PropTypes.string.required,
    modified: PropTypes.string
  }))
}