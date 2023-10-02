import Link from 'next/link';
import styles from './page.module.css';
import React from 'react'
import Image from 'next/image';

export const metadata = {
    title: 'Iliyan contacts',
    description: 'How to reach Iliyan Nikolaev'
}

export default function Contacts() {
    return (
        <div className={styles.container}>
            <h1 className={styles.mainTitle}>Feel free to get in touch with me!</h1>
            <div className={styles.item}>
                <h2 className={styles.title}>
                    Email:
                </h2>
                <p className={styles.text}>ilichviva@gmail.com</p>
            </div>
            <div className={`${styles.item} ${styles.last}`}>
                <h2 className={styles.title}>
                    LinkedIn:
                </h2>
                <Link href={'https://www.linkedin.com/in/iliyan-nikolaev-75840b259/'} target='_blank'>
                    <Image className={styles.linkedin} src={'/linkedinicon.webp'} width={50} height={50} alt='linkedin'></Image>
                </Link>
            </div>
        </div>
    )
}
