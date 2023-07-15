import {searchIcon, TrashIcon, addIcon} from "../icons";
import React, {useCallback, useContext, useEffect, useState} from "react";
import { NotesContext } from "./NotesContext";
import styles from "../styles/Navbar.module.css"

function Navbar() {
    const { selectedNote, deleteNote, addNote, selectNote, searchNotes } = useContext(NotesContext);
    const [searchQuery, setSearchQuery] = useState("");

    const handleDelete = () => {
        if (selectedNote) {
            if (window.confirm('Are you sure you want to delete this note?')) {
                deleteNote(selectedNote.id);
            }
        }
    };

    const handleAddNote = useCallback(() => {
        const note = {
            id: Date.now().toString(),
            title: 'new note',
            content: '',
        };
        addNote(note);
        selectNote(note);
    }, [addNote, selectNote]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        setSearchQuery(query);
        searchNotes(query);
    };

    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key === '+') {
                handleAddNote();
            }
        };

        document.addEventListener('keypress', handleKeyPress);

        return () => {
            document.removeEventListener('keypress', handleKeyPress);
        };
    }, [handleAddNote]);

    return (
        <header className={styles.toolbar}>
            <div className={styles.group}>
                <button onClick={handleDelete} disabled={!selectedNote}>
                    <img src={TrashIcon} alt="delete" className={`${styles.icon} ${!selectedNote ? styles.disable : ""}`} />
                </button>
                <button onClick={handleAddNote}>
                    <img src={addIcon} alt="add" className={styles.icon} />
                </button>
            </div>
            <div className={styles.group}>
                <img src={searchIcon} alt="add" className={styles.icon} />
                <input
                    className={styles.search}
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search notes"
                />
            </div>
        </header>
    )
}

export default Navbar;
