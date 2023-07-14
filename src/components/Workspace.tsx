import React, {useContext, useEffect, useState} from 'react';
import { NotesContext } from './NotesContext';
import {useDebounce} from "../hooks/useDebounce";

function Workspace() {
    const { selectedNote, deleteNote, updateNote } = useContext(NotesContext);
    const [value, setValue] = useState('');
    const debouncedValue = useDebounce<string>(value, 500)

    const handleDelete = () => {
        if (selectedNote) {
            if (window.confirm('Are you sure you want to delete this note?')) {
                deleteNote(selectedNote.id);
            }
        }
    };

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value);
    };

    useEffect(()=> {
        if (selectedNote) {
            updateNote(selectedNote.id, debouncedValue);
        }
    },[debouncedValue, selectedNote])

    useEffect(()=> {
        if (selectedNote){
            setValue(selectedNote.content)
        }
    }, [selectedNote])

    return (
        <div className="workspace">
            <div className="toolbar">
                <button onClick={handleDelete} disabled={!selectedNote}>
                    Delete
                </button>
            </div>
            {selectedNote ? (
                <div className="note-content">
                    <textarea
                        value={value}
                        onChange={handleContentChange}
                    />
                </div>
            ) : (
                <div className="no-note-selected">No note selected.</div>
            )}
        </div>
    );
}

export default Workspace;
