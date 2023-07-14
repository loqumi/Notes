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
    updateNote: (noteId: string, payload: Partial<Note>) => void;
    addNote: (note: Note) => void;
}

export const NotesContext = createContext<NotesContextType>({
    notes: [],
    selectedNote: null,
    selectNote: () => {},
    deleteNote: () => {},
    updateNote: () => {},
    addNote: () => {},
});

interface NotesProviderProps {
    children: ReactNode;
}

export const NotesProvider: React.FC<NotesProviderProps> = ({ children }) => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [selectedNote, setSelectedNote] = useState<Note | null>(null);

    const selectNote = (note: Note) => {
        setSelectedNote(note);
    };

    const deleteNote = (noteId: string) => {
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
        setSelectedNote(null);
    };

    const updateNote = (noteId: string, payload: Partial<Note>) => {
        setNotes((prevNotes) =>
            prevNotes.map((note) =>
                note.id === noteId ? { ...note, ...payload } : note
            )
        );
    };
    const addNote = (note: Note) => {
        setNotes((prevNotes) => [...prevNotes, note]);
    };

    return (
        <NotesContext.Provider
            value={{
                notes,
                selectedNote,
                selectNote,
                deleteNote,
                updateNote,
                addNote,
            }}
        >
            {children}
        </NotesContext.Provider>
    );
};
