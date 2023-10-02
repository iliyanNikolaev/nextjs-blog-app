import Link from 'next/link';
import styles from './LinkButton.module.css';

export default function LinkButton({ href, content }) {
    return (
        <Link href={href}>
            <button className={styles.button}>{content}</button>
        </Link>
    )
}
