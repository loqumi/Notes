import React, { createContext, useState, useEffect, ReactNode } from 'react';

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
    searchNotes: (query: string) => void;
}

export const NotesContext = createContext<NotesContextType>({
    notes: [],
    selectedNote: null,
    selectNote: () => {},
    deleteNote: () => {},
    updateNote: () => {},
    addNote: () => {},
    searchNotes: () => {},
});

interface NotesProviderProps {
    children: ReactNode;
}

export const NotesProvider: React.FC<NotesProviderProps> = ({ children }) => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [selectedNote, setSelectedNote] = useState<Note | null>(null);
    const [database, setDatabase] = useState<IDBDatabase | null>(null);

    useEffect(() => {
        const request = indexedDB.open('notes_db', 1);

        request.onupgradeneeded = () => {
            const db = request.result;
            if (!db.objectStoreNames.contains('notes')) {
                db.createObjectStore('notes', { keyPath: 'id' });
            }
        };

        request.onsuccess = () => {
            const db = request.result;
            setDatabase(db);
            const transaction = db.transaction('notes', 'readonly');
            const objectStore = transaction.objectStore('notes');
            const getAllRequest = objectStore.getAll();

            getAllRequest.onsuccess = () => {
                setNotes(getAllRequest.result);
            };
        };

        request.onerror = () => {
            console.error('IndexedDB error:', request.error);
        };
    }, []);

    const selectNote = (note: Note) => {
        setSelectedNote(note);
    };

    const deleteNote = (noteId: string) => {
        if (database) {
            const transaction = database.transaction('notes', 'readwrite');
            const objectStore = transaction.objectStore('notes');
            const deleteRequest = objectStore.delete(noteId);

            deleteRequest.onsuccess = () => {
                setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
                setSelectedNote(null);
            };

            deleteRequest.onerror = () => {
                console.error('IndexedDB delete error:', deleteRequest.error);
            };
        }
    };

    const updateNote = (noteId: string, payload: Partial<Note>) => {
        if (database) {
            const transaction = database.transaction('notes', 'readwrite');
            const objectStore = transaction.objectStore('notes');
            const getRequest = objectStore.get(noteId);

            getRequest.onsuccess = () => {
                const note = getRequest.result;
                if (note) {
                    const updatedNote = { ...note, ...payload };
                    const putRequest = objectStore.put(updatedNote);

                    putRequest.onsuccess = () => {
                        setNotes((prevNotes) =>
                            prevNotes.map((n) => (n.id === noteId ? updatedNote : n))
                        );
                    };

                    putRequest.onerror = () => {
                        console.error('IndexedDB put error:', putRequest.error);
                    };
                }
            };

            getRequest.onerror = () => {
                console.error('IndexedDB get error:', getRequest.error);
            };
        }
    };

    const addNote = (note: Note) => {
        if (database) {
            const transaction = database.transaction('notes', 'readwrite');
            const objectStore = transaction.objectStore('notes');
            const addRequest = objectStore.add(note);

            addRequest.onsuccess = () => {
                setNotes((prevNotes) => [...prevNotes, note]);
            };

            addRequest.onerror = () => {
                console.error('IndexedDB add error:', addRequest.error);
            };
        }
    };
    const searchNotes = (query: string) => {
        if (database) {
            const transaction = database.transaction('notes', 'readonly');
            const objectStore = transaction.objectStore('notes');
            const getAllRequest = objectStore.getAll();

            getAllRequest.onsuccess = () => {
                const allNotes = getAllRequest.result;
                const filteredNotes = allNotes.filter(
                    (note) =>
                        note.title.toLowerCase().includes(query.toLowerCase()) ||
                        note.content.toLowerCase().includes(query.toLowerCase())
                );
                setNotes(filteredNotes);
            };

            getAllRequest.onerror = () => {
                console.error('IndexedDB search error:', getAllRequest.error);
            };
        }
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
                searchNotes,
            }}
        >
            {children}
        </NotesContext.Provider>
    );
};
