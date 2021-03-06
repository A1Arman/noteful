import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NoteListNav from '../NoteListNav/NoteListNav'
import NotePageNav from '../NotePageNav/NotePageNav'
import NoteListMain from '../NoteListMain/NoteListMain'
import NotePageMain from '../NotePageMain/NotePageMain'
import AddFolder from '../AddFolder/AddFolder'
import AddNote from '../AddNote/AddNote'
import { getNotesForFolder, findNote, findFolder } from '../notes-helpers'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: [],
      folders: [],
    }
  }

  componentDidMount() {
    this.fetchNotes();
    // fake date loading from API call
    const url = 'http://localhost:8000/api/folders';
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
  };

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

  fetchNotes() {
    const notesUrl = 'http://localhost:8000/api/notes';
    const notesOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
  }


      fetch(notesUrl, notesOptions)
      .then(res => {
        if(res.ok) {
          return res.json();
        }
        else {
          throw new Error('Something went wrong');
        }
      })
      .then(data => {
        this.setState({notes: data});
      })
      .catch(err => {
        this.setState({
          error: err.message
        });
      });
  }


  renderNavRoutes() {
    return (
      <>
        {['/', '/folder/:folderId'].map(path =>
          <Route
            exact
            key={path}
            path={path}
            render={routeProps =>
              <NoteListNav
                folders={this.state.folders}
                notes={this.state.notes}
                {...routeProps}
              />
            }
          />
        )}
        <Route
          path='/note/:noteId'
          render={routeProps => {
            const { noteId } = routeProps.match.params
            const note = findNote(this.state.notes, noteId) || {}
            const folder = findFolder(this.state.folders, note.folderId)
            return (
              <NotePageNav
                {...routeProps}
                folder={folder}
              />
            )
          }}
        />
        <Route
          path='/add-folder'
          component={NotePageNav}
        />
        <Route
          path='/add-note'
          component={NotePageNav}
          update={() => this.renderUpdate}
        />
      </>
    )
  }
  

  renderMainRoutes() {  
    const { notes, folders } = this.state
    return (
      <>
        {['/', '/folder/:folderId'].map(path =>
          <Route
            exact
            key={path}
            path={path}
            render={routeProps => {
              const folder_id  = window.location.pathname.slice(-1)
              const notesForFolder = (!folder_id ? notes.filter(note => note.folder_id === folder_id) : notes)
              return (
                <NoteListMain
                  {...routeProps}
                  notes={notesForFolder}
                />
              )
            }}
          />
        )}
        <Route
          path='/note/:noteId'
          render={routeProps => {
            const  noteId  = window.location.pathname.slice(-1)
            const note = findNote(notes, noteId)
            return (
              <NotePageMain
                {...routeProps}
                note={note}
              />
            )
          }}
        />
        <Route
          path='/add-folder'
          component={AddFolder}
        />
        <Route
          path='/add-note'
          render={routeProps => {
            return (
              <AddNote
                {...routeProps}
                folders={folders}
                update={this.renderUpdate}
              />
            )
          }}
        />
      </>
    )
  }


  render() {

    return (
      <div className='App'>
        <nav className='App__nav'>
          {this.renderNavRoutes()}
        </nav>
        <header className='App__header'>
          <h1>
            <Link to='/'>Noteful</Link>
            {' '}
            <FontAwesomeIcon icon='check-double' />
          </h1>
        </header>
        <main className='App__main'>
          {this.renderMainRoutes()}
        </main>
      </div>
    )
  }
}

export default App
