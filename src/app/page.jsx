import Image from 'next/image';
import styles from './page.module.css';
import LinkButton from '@/components/link-button/LinkButton';

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.texts}>
        <p className={styles.title}>Innovate, Code, Envision - Welcome to the Future of Software!</p>

        <p className={styles.desc}>Our company builds modern and fast web applications, utilizing Next.js to ensure the best user experience and development efficiency.</p>
        
        <LinkButton href={'/about'} content={'About us'}/>
      </div>
      <div className={styles.imgContainer}>
        <Image className={styles.image} src={'/bluedev.png'} width={520} height={520} alt='dashimg' priority/>
      </div>
    </div>
  )
}
