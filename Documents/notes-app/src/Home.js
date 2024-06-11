import React, { useState, useEffect } from 'react';
import NotePreviewComponent from './NotePreviewComponent';
import { db, auth, collection, getDocs, addDoc, updateDoc, doc, onAuthStateChanged, signOut } from './firebase';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [user, setUser] = useState(null);
  const [noteCount, setNoteCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (user) {
      const fetchNotes = async () => {
        const notesCollection = collection(db, 'notes');
        const notesSnapshot = await getDocs(notesCollection);
        const notesList = notesSnapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .filter(note => note.userId === user.uid);
        setNotes(notesList);
        setNoteCount(notesList.length);
      };

      fetchNotes();
    }
  }, [user]);

  const addNote = async () => {
    const newNote = {
      title: `My note ${noteCount + 1}`,
      content: `Note content ${noteCount + 1}`,
      userId: user.uid
    };
    const docRef = await addDoc(collection(db, 'notes'), newNote);
    setNotes([...notes, { id: docRef.id, ...newNote }]);
    setNoteCount(noteCount + 1); // Increment the note count
  };

  const updateNote = async (id, title, content) => {
    const noteRef = doc(db, 'notes', id);
    await updateDoc(noteRef, { title, content });
    setNotes(notes.map(note => note.id === id ? { ...note, title, content } : note));
  };

  const handleSignOut = async () => {
    await signOut(auth);
    navigate('/login');
  };

  return (
    <div className="Home">
      <header className="Home-header">
        <div className="header-text">Notes</div>
        <div className="buttons-container">
          <button className="add-note-btn" onClick={addNote} style={{ cursor: 'pointer' }}> 
            Add note ➕
          </button>
          <button className="sign-out-btn" onClick={handleSignOut} style={{ cursor: 'pointer' }}>
            Sign Out
          </button>
        </div>
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
};

export default Home;
