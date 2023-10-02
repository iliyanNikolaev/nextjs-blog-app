"use client"
import styles from './Toggle.module.css';

import { useContext } from 'react';
import { ThemeContext } from '@/context/ThemeContext';

export default function Toggle() {

    const {mode, toggle} = useContext(ThemeContext);

    return (
        <div className={styles.container} onClick={toggle}>
            <div className={styles.icon}>🌙</div>
            <div className={styles.icon}>🔆</div>
            <div className={styles.ball} style={mode == 'dark' ? { left: '2px' } : { right: '2px' }}></div>
        </div>
    )
}
