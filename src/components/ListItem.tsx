import React, {useContext} from 'react';
import { NotesContext } from './NotesContext';
import styles from "../styles/ListItem.module.css"
interface Note {
    id: string;
    title: string;
    content: string;
}

interface ListItemProps {
    note: Note;
    onSelect: (note: Note) => void;
}

function ListItem({ note }: ListItemProps) {
    const { selectNote, selectedNote } = useContext(NotesContext);
    const isActive = selectedNote?.id === note.id

    const handleClick = () => {
        selectNote(note);
    };

    return (
        <div className={`${styles.list_item} ${isActive ? styles.active : ""}`} onClick={handleClick}>
            {note.title}
        </div>
    );
}

export default ListItem;
