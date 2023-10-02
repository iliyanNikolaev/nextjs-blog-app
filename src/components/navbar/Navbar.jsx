"use client"
import Image from 'next/image';
import styles from './Navbar.module.css';
import Link from 'next/link'
import Toggle from '../theme-toggle/Toggle';
import LogoutButton from '../logout-button/LogoutButton';
import { useSession } from 'next-auth/react';

export default function Navbar() {
    const session = useSession();

    return (
        <div className={styles.container}>
            <div>
                <Link href='/' className={styles.logo}>
                    <Image className={styles.img} src={'/next-icon.webp'} width={52} height={52} alt='next.js' />
                    <span>InnovateTech</span>
                </Link>
            </div>

            <div className={styles.links}>
                {session.status == 'loading' ? <p>Loading...</p> : <>
                    <Toggle />
                    <Link href='/blog'>Blog</Link>
                    <Link href='/about'>About</Link>
                    <Link href='/contacts'>Contacts</Link>
                    <Link href='/portfolio'>Portfolio</Link>
                    {session.status == 'unauthenticated' && <>
                        <Link href='/login'>Login</Link>
                        <Link href='/register'>Register</Link></>}
                    {session.status == 'authenticated' && <>
                        <Link href='/dashboard'>Dashboard</Link>
                        <LogoutButton /></>}
                </>}
            </div>
        </div>
    )
}
