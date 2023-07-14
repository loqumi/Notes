import { TrashIcon } from "../icons";
import { addIcon } from "../icons";
import React, { useContext } from "react";
import { NotesContext } from "./NotesContext";
import styles from "../styles/Navbar.module.css"

function Navbar() {
    const { selectedNote, deleteNote, addNote, selectNote } = useContext(NotesContext);

    const handleDelete = () => {
        if (selectedNote) {
            if (window.confirm('Are you sure you want to delete this note?')) {
                deleteNote(selectedNote.id);
            }
        }
    };

    const handleAddNote = () => {
        const note = {
            id: Date.now().toString(),
            title: 'new note',
            content: '',
        }
        addNote(note);
        selectNote(note);
    };

    return (
        <header className={styles.toolbar}>
            <button onClick={handleDelete} disabled={!selectedNote}>
                <img src={TrashIcon} alt="delete" className={styles.icon} />
            </button>
            <button onClick={handleAddNote}>
                <img src={addIcon} alt="add" className={styles.icon} />
            </button>
        </header>
    )
}

export default Navbar;
