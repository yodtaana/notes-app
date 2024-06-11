import React, { useState, useEffect } from 'react';
import './App.css';
import NotePreviewComponent from './NotePreviewComponent';
import { db, collection, getDocs, addDoc, updateDoc, doc } from './firebase';

function App() {
  const [notes, setNotes] = useState([]);
  const [noteCount, setNoteCount] = useState(0);

  useEffect(() => {
    const fetchNotes = async () => {
      const notesCollection = collection(db, 'notes');
      const notesSnapshot = await getDocs(notesCollection);
      const notesList = notesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setNotes(notesList);
      setNoteCount(notesList.length); // Initialize the counter with the number of fetched notes
    };

    fetchNotes();
  }, []);

  const addNote = async () => {
    const newNote = {
      title: `My note ${noteCount + 1}`,
      content: `Note content ${noteCount + 1}`
    };
    const docRef = await addDoc(collection(db, 'notes'), newNote);
    setNotes([...notes, { id: docRef.id, ...newNote }]);
    setNoteCount(noteCount + 1); // Increment the counter
  };

  const updateNote = async (id, title, content) => {
    const noteRef = doc(db, 'notes', id);
    await updateDoc(noteRef, { title, content });
    setNotes(notes.map(note => note.id === id ? { ...note, title, content } : note));
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-text">Notes</div>
        <button className="add-note-btn" onClick={addNote} style={{ cursor: 'pointer' }}> 
          Add note ➕
        </button>
      </header>
      <div className="content-area">
        {notes.map((note) => (
          <NotePreviewComponent 
            key={note.id} 
            noteId={note.id} 
            title={note.title} 
            content={note.content} 
            updateNote={updateNote} 
          />
        ))}
      </div>
    </div>
  );
}

export default App;
