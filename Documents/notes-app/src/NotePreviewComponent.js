import React, { useState } from 'react';

const NotePreviewComponent = ({ noteId, title, content, updateNote }) => {
  const [editingTitle, setEditingTitle] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const handleTitleDoubleClick = () => {
    setEditingTitle(true);
  };

  const handleTitleBlur = () => {
    setEditingTitle(false);
    updateNote(noteId, newTitle, content);
  };

  return (
    <div className="note-preview">
      <div onDoubleClick={handleTitleDoubleClick} style={{ flexShrink: 0 }}>
        {editingTitle ? (
          <input 
            autoFocus 
            value={newTitle} 
            onChange={(e) => setNewTitle(e.target.value)} 
            onBlur={handleTitleBlur}
          />
        ) : (
          <h3>{title}</h3>
        )}
      </div>
      <div style={{ flexGrow: 1 }}>
        <p>{content}</p>
      </div>
    </div>
  );
};

export default NotePreviewComponent;
