import Image from 'next/image';
import styles from './Footer.module.css';
import Link from 'next/link';

export default function Footer() {
  return (
    <div className={styles.container}>
      <span className={styles.span}>&copy; iliyanNikolaev. All rights reserved</span>

      <span className={styles.social}>
      <Link href={'https://github.com/iliyanNikolaev'} target='_blank'>
        <Image src={'/icone-github-bleu.png'} height={32} width={32} alt='github' />
      </Link>
      <Link href={'https://www.linkedin.com/in/iliyan-nikolaev-75840b259/'} target='_blank'>
        <Image src={'/linkedinicon.webp'} height={48} width={48} alt='linkedin' />
      </Link>
      </span>
    </div>
  )
}
