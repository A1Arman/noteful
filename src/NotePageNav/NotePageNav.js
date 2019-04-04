import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import PropTypes from 'prop-types'
import NoteError from '../NoteError'
import './NotePageNav.css'

export default function NotePageNav(props) {
  return (
    <div className='NotePageNav'>
    <NoteError>
      <CircleButton
        tag='button'
        role='link'
        onClick={() => props.history.goBack()}
        className='NotePageNav__back-button'
      >
        <FontAwesomeIcon icon='chevron-left' />
        <br />
        Back
      </CircleButton>
      {props.folder && (
        <h3 className='NotePageNav__folder-name'>
          {props.folder.name}
        </h3>
      )}          
    </NoteError>
    </div>
  )
}

NotePageNav.defaultProps = {
  history: {
    goBack: () => {}
  }
}

NotePageNav.propType = {
  folder: PropTypes.object
}
