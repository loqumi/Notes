import React from 'react';
import Sidebar from './components/Sidebar';
import Workspace from './components/Workspace';
import { NotesProvider } from './components/NotesContext';

function App() {
    return (
        <NotesProvider>
            <div className="app">
                <Sidebar />
                <Workspace />
            </div>
        </NotesProvider>
    );
}

export default App;
