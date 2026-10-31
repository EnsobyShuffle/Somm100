import React from 'react';
import { createRoot } from 'react-dom/client';
import LearningApp from '../app/LearningApp';
import '../app/globals.css';

createRoot(document.getElementById('root')!).render(<LearningApp />);
