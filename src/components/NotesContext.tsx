import React, { createContext, useState, ReactNode } from 'react';

interface Note {
    id: string;
    title: string;
    content: string;
}

interface NotesContextType {
    notes: Note[];
    selectedNote: Note | null;
    selectNote: (note: Note) => void;
    deleteNote: (noteId: string) => void;
    updateNote: (noteId: string, newContent: string) => void;
}

export const NotesContext = createContext<NotesContextType>({
    notes: [],
    selectedNote: null,
    selectNote: () => {},
    deleteNote: () => {},
    updateNote: () => {},
});

interface NotesProviderProps {
    children: ReactNode;
}

export const NotesProvider: React.FC<NotesProviderProps> = ({ children }) => {
    const [notes, setNotes] = useState<Note[]>([
        { id: '1', title: 'Note 1', content: 'This is the content of note 1.' },
        { id: '2', title: 'Note 2', content: 'This is the content of note 2.' },
        { id: '3', title: 'Note 3', content: 'This is the content of note 3.' },
    ]);
    const [selectedNote, setSelectedNote] = useState<Note | null>(null);

    const selectNote = (note: Note) => {
        setSelectedNote(note);
    };

    const deleteNote = (noteId: string) => {
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
        setSelectedNote(null);
    };

    const updateNote = (noteId: string, newContent: string) => {
        setNotes((prevNotes) =>
            prevNotes.map((note) =>
                note.id === noteId ? { ...note, content: newContent } : note
            )
        );
    };

    return (
        <NotesContext.Provider
            value={{
                notes,
                selectedNote,
                selectNote,
                deleteNote,
                updateNote,
            }}
        >
            {children}
        </NotesContext.Provider>
    );
};
