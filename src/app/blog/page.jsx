import Link from 'next/link';
import styles from './page.module.css';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import apiHostURL from '@/utils/apiHostURL';

const getPosts = async () => {
  const res = await fetch(apiHostURL+'/api/posts', { cache: 'no-store' });
  if (!res.ok) {
    return notFound();
  }
  return res.json();
}

export function generateMetadata() {
  return {
    title: 'innovateTech Blog',
    description: 'Publications from innovateTech employees'
  }
}

export default async function Blog() {
  const posts = await getPosts();

  return (
    <div className={styles.container}>
      {posts.map(x => <Link className={styles.post} href={`/blog/${x._id}`} key={x._id}>
        <Image className={styles.postImage} src={x.image} width={200} height={400} alt='postimg' />
        <div className={styles.postContent}>
          <h1 className={styles.postTitle}>{x.title}</h1>

          <p className={styles.postDesc}>{x.desc}</p>
        </div>
      </Link>)}
    </div>
  )
}
