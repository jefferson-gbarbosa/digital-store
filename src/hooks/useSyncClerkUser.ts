import { useEffect } from 'react'
import { useUser } from '@clerk/clerk-react'
import { useAuthStore } from '../stores/useAuthStore'

export function useSyncClerkUser() {
  const { user, isSignedIn } = useUser()
  const { setUser, clearUser } = useAuthStore()

  useEffect(() => {
    if (isSignedIn && user) {
      setUser(user)
    } else {
      clearUser()
    }
  }, [isSignedIn, user, setUser, clearUser])
}
