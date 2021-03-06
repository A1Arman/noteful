import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Note from '../Note/Note'
import CircleButton from '../CircleButton/CircleButton'
import NoteError from '../NoteError'
import PropTypes from 'prop-types'
import './NoteListMain.css'
import { faFolder } from '@fortawesome/free-solid-svg-icons';

export default class NoteListMain extends Component {
  componentDidMount() {
    console.log(this.props.notes)
  }
  
  render() {
    return (
      <section className='NoteListMain'>
        <NoteError>
          <ul>
            {this.props.notes.map(note =>
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
    id: PropTypes.number.required,
    name: PropTypes.string.required,
    modified: PropTypes.string
  }))
}