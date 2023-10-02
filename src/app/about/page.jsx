import LinkButton from '@/components/link-button/LinkButton';
import styles from './page.module.css';

import React from 'react'
import Image from 'next/image';

export const metadata = {
    title: 'About us',
    description: 'Information about innovateTech'
}

export default async function About() {
    return (
        <div className={styles.container}>

            <div className={styles.imgContainer}>
                <Image className={styles.img} src={'/aboutimg.jpg'} fill={true} alt='webdev' />
                <div className={styles.imgText}>
                    <h1>InnovateTech</h1>
                    <p>Innovate, Code, Envision</p>
                </div>
            </div>
            <div className={styles.textContainer}>
                <div className={styles.item}>
                    <h2 className={styles.title}>Who we are?</h2>

                    <p className={styles.text}>Just a one developer actively searching for permanent employment. I would be delighted to apply my skills and acquire new ones in your company.</p>
                </div>

                <div className={styles.item}>
                    <h2 className={styles.title}>What we do?</h2>

                    <p className={styles.text}>I apply what i learned at the Software Academy - SoftUni and continue to acquire new skills through developing projects like this one.</p>

                    <LinkButton href={'/contacts'} content={'Contact us'} />
                </div>
            </div>
        </div>
    )
}
