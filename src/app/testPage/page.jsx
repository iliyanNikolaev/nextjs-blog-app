import { authOptions } from '@/utils/authOptions'
import { getServerSession } from 'next-auth'


export default async function TestPage() {
    const session = await getServerSession(authOptions);

  return (
    <div>
        <p>{ session ? `${session.user.name.username}` : 'not-auth'}</p>
        <p>This is a test server rendered page</p>
    </div>
  )
}
