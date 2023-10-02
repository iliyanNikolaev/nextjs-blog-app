"use client"
import styles from './Error.module.css';
import { useEffect, useState } from 'react';

export default function Error({
    message,
    setError
}) {
    const [isHidden, setIsHidden] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsHidden(true);
            setError('');
        }, 2500)
    }, [])
    
    return (
        <p className={isHidden ? styles.hidden : styles.error}>{message}</p>
    )
}
