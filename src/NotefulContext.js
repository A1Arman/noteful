import React from "react";

const NotefulContext = React.createContext({
  folders: [],
  notes: [],
  deleteNoteRequest: () => {},
  addFolder: () => {},
  addNote: () => {},
});
export default NotefulContext;