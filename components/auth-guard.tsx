import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router'
import { useEffect } from 'react';

export default function AuthGuard({ children }) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (!session) {
      router.push('/api/auth/signin')
    }
  }, [session])

  if (status === "loading") {
    return <p>Loading...</p>
  }

  if (status === "unauthenticated") {
    return <p>Not authenticated!</p>
  }

  return children;
}
