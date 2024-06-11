import React, { useState } from 'react';

const NotePreviewComponent = ({ noteId, title: initialTitle, content: initialContent, updateNote }) => {
  const [editingTitle, setEditingTitle] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const [editingContent, setEditingContent] = useState(false);
  const [content, setContent] = useState(initialContent);

  const handleTitleDoubleClick = () => {
    setEditingTitle(true);
  };

  const handleTitleInputChange = (event) => {
    setTitle(event.target.value);
  };

  const handleTitleInputBlur = () => {
    setEditingTitle(false);
    updateNote(noteId, title, content);
  };

  const handleContentDoubleClick = () => {
    setEditingContent(true);
  };

  const handleContentInputChange = (event) => {
    setContent(event.target.value);
  };

  const handleContentInputBlur = () => {
    setEditingContent(false);
    updateNote(noteId, title, content);
  };

  return (
    <div className="note-preview">
      {editingTitle ? (
        <input
          type="text"
          value={title}
          onChange={handleTitleInputChange}
          onBlur={handleTitleInputBlur}
          autoFocus
        />
      ) : (
        <h3 onDoubleClick={handleTitleDoubleClick}>{title}</h3>
      )}
      {editingContent ? (
        <textarea
          value={content}
          onChange={handleContentInputChange}
          onBlur={handleContentInputBlur}
          autoFocus
        />
      ) : (
        <p onDoubleClick={handleContentDoubleClick}>{content}</p>
      )}
    </div>
  );
};

export default NotePreviewComponent;
