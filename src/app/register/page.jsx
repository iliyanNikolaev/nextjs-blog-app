"use client";
import styles from './page.module.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Error from '@/components/error/Error';

export default function Register() {
  const router = useRouter();
  const session = useSession();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();

    const username = e.target[0].value;
    const password = e.target[1].value;

    if (!username || !password) {
      return setError('All fields are required!');
    }

    try {
      setLoading(true);
      const res = await fetch(apiHostURL+'/api/register', {
        method: 'post',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ username: username.trim(), password: password.trim() })
      });

      if (!res.ok) {
        const error = await res.json();
        setLoading(false);
        return setError(error.message);
      }

      router.push('/');
    } catch (err) {
      setLoading(false);
      setError('Error in DB, pls try again later!');
    }
  };

  if(session.status == 'loading') {
    return <p>Loading...</p>
  }

  if(session.status == 'authenticated') {
    return router.push('/dashboard');
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={submitHandler}>
        <h1 className={styles.title}>Register</h1>
        <input
          className={styles.input}
          type="text"
          placeholder='Enter an username...'
        />
        <input
          className={styles.input}
          type="password"
          placeholder='Enter a password...'
        />
        {error && <Error message={error} setError={setError} />}
        <button className={styles.button} disabled={loading ? true : false}>{loading ? 'Loading...' : 'Register'}</button>
      </form>
    </div>
  )
}