import React, { useContext } from 'react';
import { NotesContext } from './NotesContext';
import ListItem from './ListItem';

function Sidebar() {
    const { notes, selectNote } = useContext(NotesContext);

    return (
        <div className="sidebar">
            {notes.map((note) => (
                <ListItem key={note.id} note={note} onSelect={selectNote} />
            ))}
        </div>
    );
}

export default Sidebar;
