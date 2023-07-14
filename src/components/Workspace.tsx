import React, {useContext, useEffect, useRef, useState} from 'react';
import {NotesContext} from './NotesContext';
import {useDebounce} from "../hooks/useDebounce";
import styles from "../styles/Workspace.module.css"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function Workspace() {
    const ref = useRef<ReactQuill | null>(null)
    const {selectedNote, updateNote} = useContext(NotesContext);
    const [value, setValue] = useState('');
    const debouncedValue = useDebounce<string>(value, 500)

    const handleContentChange = (value: string) => {
        setValue(value);
        const title = (ref.current?.editingArea as any).querySelector('.ql-editor > *:first-child').textContent || 'empty title'
        if (selectedNote?.id) updateNote(selectedNote?.id, {title})
    };

    useEffect(() => {
        if (selectedNote) {
            updateNote(selectedNote.id, {content: debouncedValue});
        }
    }, [debouncedValue, selectedNote])

    useEffect(() => {
        if (selectedNote) {
            setValue(selectedNote.content)
        }
        const elem = ref.current?.editingArea
        ref.current?.editor?.focus();
    }, [selectedNote])

    return (
        <section>
            {selectedNote ? (
                <ReactQuill
                    ref={ref}
                    className={styles.textarea}
                    value={value}
                    onChange={handleContentChange}
                />
            ) : null
            }
        </section>
    );
}

export default Workspace;
