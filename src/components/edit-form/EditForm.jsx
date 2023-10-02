"use client"
import styles from './EditForm.module.css';
import Error from '../error/Error';
import { useState } from 'react';
import uploadImg from '@/utils/uploadImg';
import { useRouter } from 'next/navigation';
import apiHostURL from '@/utils/apiHostURL';

export default function EditForm({
    post
}) {
    const [img, setImg] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const router = useRouter();

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
                image = post.image;
            }
            const desc = e.target[2].value;
            const text = e.target[3].value;

            const updated = {
                title: title.trim(),
                image,
                desc: desc.trim(),
                owner: post.owner,
                text: text.trim()
            }

            await fetch(apiHostURL + '/api/posts/'+ post._id, {
                method: 'put',
                body: JSON.stringify(updated)
            });

            setLoading(false);
            router.push('/dashboard');
        } catch (err) {
            setLoading(false);
            setError(err.message);
        }
    }

    return (
        <form className={styles.editPost} onSubmit={submitHandler}>
            <h1 className={styles.title}>Edit {post.title}</h1>
            <input type="text" placeholder="Title" className={styles.input} defaultValue={post.title} />
            <div className={styles.imageInputs}>
                <div
                    type="text"
                    className={`${styles.input} ${styles.imgURLinput}`}>
                    <p>{false ? "New image selected" : "Keep the old photo"}</p>
                    <label htmlFor="file" className={styles.addFile}>
                        <span><i className="fas fa-image"></i>New photo</span>
                        <input type="file" id='file' className={styles.file} onChange={(e) => setImg(e.target.files[0])} />
                    </label>
                </div>
            </div>
            <input type="text" placeholder="Short description" className={styles.input} defaultValue={post.desc} />
            <textarea placeholder="Text content" className={`${styles.input} ${styles.textarea}`} defaultValue={post.text} />

            {error && <Error message={error} setError={setError} />}

            <button className={styles.button} disabled={loading ? true : false}>{loading ? 'Loading' : 'Edit'}</button>
        </form>
    )
}
