import React, {useContext} from 'react';
import { NotesContext } from './NotesContext';
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
    const { selectNote } = useContext(NotesContext);

    const handleClick = () => {
        selectNote(note);
    };

    return (
        <div className="list-item" onClick={handleClick}>
            {note.title}
        </div>
    );
}

export default ListItem;
