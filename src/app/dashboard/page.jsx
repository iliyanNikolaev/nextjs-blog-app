"use client"
import styles from './page.module.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import apiHostURL from '@/utils/apiHostURL';
import Error from '@/components/error/Error';
import uploadImg from '@/utils/uploadImg';
import Link from 'next/link';

export default function Dashboard() {

    const session = useSession();
    const router = useRouter();
    const [userPosts, setUserPosts] = useState(null);
    const [img, setImg] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const getUserPosts = async () => {
            const res = await fetch(apiHostURL + '/api/posts?username=' + session?.data?.user?.username);
            if (!res.ok) {
                return setError('problem')
            }
            const posts = await res.json();
            setUserPosts(state => posts);
        }
        getUserPosts();
    }, [session]);

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const title = e.target[0].value;
            let image;
            if (img) {
                try {
                    const imgUrl = await uploadImg(img);

                    image = imgUrl;
                } catch (err) {
                    setLoading(false);
                    throw new Error(err.message);
                }
            } else {
                setLoading(false);
                throw new Error('Image are required')
            }
            const desc = e.target[2].value;
            const text = e.target[3].value;

            if (!title || !desc || !text) {
                setLoading(false);
                throw new Error('All fields are required!');
            }

            const res = await fetch(apiHostURL + '/api/posts', {
                method: 'post',
                body: JSON.stringify({
                    title: title.trim(),
                    image: image.trim(),
                    desc: desc.trim(),
                    owner: session.data.user.username,
                    text: text.trim()
                })
            });

            const created = await res.json();

            setUserPosts(state => [...state, created]);

            e.target.reset();
            setLoading(false);
        } catch (err) {
            setLoading(false);
            setError(err.message);
        }
    }

    const deleteHandler = async (id) => {
        const choice = confirm('Are you sure you want to delete this post?');

        if(choice){
            try {
                await fetch(apiHostURL+'/api/posts/'+id, {
                    method: 'delete'
                });

                setUserPosts(state => state.filter(x => x._id != id));
            } catch (err) {
                setError(err.message);
            }
        }
    }

    if (session.status == 'unauthenticated') {
        return router.push('/login');
    }

    if (session.status == 'loading') {
        return <p>Loading</p>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.userPosts}>
                {userPosts ? <>

                    {userPosts.length == 0 && <p className={styles.noPosts}>You dont have posts yet</p>}

                    <div className={styles.posts}>
                        {userPosts.map(x => <div className={styles.post} key={x._id}>
                            <Image className={styles.postImage} src={x.image} width={100} height={200} alt='postimg' />
                            <div className={styles.postContent}>
                                <h1 className={styles.postTitle}>{x.title}</h1>

                                <div className={styles.buttons}>
                                    <Link href={`/edit/${x._id}`}><i className="far fa-edit"></i></Link>
                                    <i className="fas fa-trash-alt" onClick={() => deleteHandler(x._id)}></i>
                                </div>
                            </div>
                        </div>)}
                    </div></>

                    : <p>Loading</p>}
            </div>
            <form className={styles.createPost} onSubmit={submitHandler}>
                <h1 className={styles.title}>Add new post</h1>
                <input type="text" placeholder="Title" className={styles.input} />
                <div className={styles.imageInputs}>
                    <div
                        type="text"
                        className={`${styles.input} ${styles.imgURLinput}`}
                        disabled={img ? true : false}><p>{img ? "Image selected" : "Select only one image from your PC"}</p>
                        <label htmlFor="file" className={styles.addFile}>
                            <span><i className="fas fa-image"></i>Add photo</span>
                            <input type="file" id='file' className={styles.file} onChange={(e) => setImg(e.target.files[0])} />
                        </label>
                    </div>
                </div>
                <input type="text" placeholder="Short description" className={styles.input} />
                <textarea placeholder="Text content" className={`${styles.input} ${styles.textarea}`} />

                {error && <Error message={error} setError={setError} />}

                <button className={styles.button} disabled={loading ? true : false}>{loading ? 'Loading' : 'Add'}</button>
            </form>

        </div>
    )
}
