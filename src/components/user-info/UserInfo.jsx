"use client"
import styles from './UserInfo.module.css';
import getSession from '@/utils/getSession';
export default function UserInfo() {

  const session = getSession();
  console.log(session)
  return (
    <div className={styles.container}>
      <p>{session.status == 'authenticated' ? `${session.username} ${session._id}` : 'not auth'}</p>
      {/* todo.... */}
    </div>
  )
}
