import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const response = await axios.get('http://localhost:8080/api/notes');
    setNotes(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await axios.put(`http://localhost:8080/api/notes/${editId}`, {
        title,
        content,
      });
    } else {
      await axios.post('http://localhost:8080/api/notes', { title, content });
    }
    setTitle('');
    setContent('');
    setEditing(false);
    setEditId(null);
    fetchNotes();
  };

  const handleEdit = (note) => {
    setEditing(true);
    setEditId(note.id);
    setTitle(note.title);
    setContent(note.content);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8080/api/notes/${id}`);
    fetchNotes();
  };

  return (
      <div className="container">
        <h1 className="mt-4">Notes</h1>
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="form-group">
            <label>Title</label>
            <input
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Content</label>
            <textarea
                className="form-control"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary mt-2">
            {editing ? 'Update Note' : 'Add Note'}
          </button>
        </form>
        <table className="table">
          <thead>
          <tr>
            <th>Title</th>
            <th>Content</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          {notes.map((note) => (
              <tr key={note.id}>
                <td>{note.title}</td>
                <td>{note.content}</td>
                <td className="action-buttons">
                  <button
                      className="btn btn-info"
                      onClick={() => handleEdit(note)}
                  >
                    Edit
                  </button>
                  <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(note.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
          ))}
          </tbody>
        </table>
      </div>
  );
};

export default App;
