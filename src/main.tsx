import './index.scss';
import { BrowserRouter, Route, Routes } from 'react-router';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import App from './app/App';
import ModPage from './app/views/mods/ModPage';
import Mods from './app/views/mods/Mods';

const rootElement = document.getElementById('root');
if (rootElement) {
    createRoot(rootElement).render(
        <StrictMode>
            <BrowserRouter
                basename='/mc-json-gui'
            >
                <Routes>
                    <Route path='/' element={<App />}>
                        <Route path='/mods' element={<Mods />}>
                            <Route path='/mods/:namespace' element={<ModPage />} />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </StrictMode>
    );
}