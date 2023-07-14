import React from 'react';
import Sidebar from './components/Sidebar';
import Workspace from './components/Workspace';
import { NotesProvider } from './components/NotesContext';
import Navbar from "./components/Navbar";
import styles from "./styles/index.module.css";

function App() {
    return (
        <NotesProvider>
            <Navbar />
            <main className={styles.main}>
                <Sidebar />
                <Workspace />
            </main>
        </NotesProvider>
    );
}

export default App;
