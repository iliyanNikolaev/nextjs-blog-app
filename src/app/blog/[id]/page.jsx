import Image from 'next/image';
import styles from './page.module.css';
import { notFound } from 'next/navigation';
import apiHostURL from '@/utils/apiHostURL';

const getPost = async (id) => {
    const res = await fetch(apiHostURL+'/api/posts/'+id, { cache: 'no-store' });
    if(!res.ok) {
        return notFound();
    }
    return res.json();
}

export async function generateMetadata({ params }) {
    const { id } = params;
    const post = await getPost(id);

    return {
      title: post.title,
      description: 'Publication from innovateTech blog'
    }
  }

export default async function Post({ params }) {
    const { id } = params;
    const post = await getPost(id);
    
    return (
        <div className={styles.container}>
            <div className={styles.upper}>
                <div className={styles.left}>
                    <h1 className={styles.title}>{post.title}</h1>
                    <p className={styles.desc}>{post.desc}</p>
                    <div className={styles.owner}>
                        <span className={styles.author}><span>Author:</span> <span>{post.owner}</span></span>
                    </div>
                </div>

                <Image className={styles.postImg} src={post.image} width={500} height={300} alt='postimage' />
            </div>

            <div className={styles.lower}>
                <p className={styles.text}>{post.text}</p>
            </div>
        </div>
    )
}
