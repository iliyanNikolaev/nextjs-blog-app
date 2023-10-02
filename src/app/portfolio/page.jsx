import Link from 'next/link';
import styles from './page.module.css';

export const metadata = {
    title: 'Portfolio',
    description: 'innovateTech portfolio projects'
}

export default function Portfolio() {
    return (
        <div className={styles.container}>
            <h1 className={styles.mainTitle}>Our works</h1>

            <div className={styles.projects}>

                <Link className={styles.project} href={'https://github.com/iliyanNikolaev/movies-react-app'} target='_blank'>
                    <span className={styles.innerTitle}>movies-app</span>
                </Link>

                <Link className={styles.project} href={'https://github.com/iliyanNikolaev/rest-api-express-mongo'} target='_blank'>
                    <span className={styles.innerTitle}>rest-api-social-app</span>
                </Link>
            </div>
        </div>
    )
}
