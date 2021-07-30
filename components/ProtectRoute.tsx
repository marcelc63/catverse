import * as React from 'react'
import { useRouter } from 'next/router'
import type { AppProps } from 'next/app'
import { RootState, useAppSelector, useAppDispatch } from '~/store/store'
import { useEffect } from 'react'
import { get as getUser } from '~/store/user'

const PublicPaths: Array<string> = ['/login', '/register']

const ProtectRoute: React.FC<AppProps> = ({
  Component,
  pageProps,
}: AppProps) => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const authenticated = useAppSelector(
    (state: RootState) => state.auth.authenticated
  )

  const requiresAuth = () => {
    if (router.pathname === '/') return false
    return (
      !authenticated &&
      !PublicPaths.find((routes) => router.pathname.includes(routes))
    )
  }

  useEffect(() => {
    if (requiresAuth() && router) {
      // router.push(`/login?redirected_from=${location.pathname}`)
    }
    if (!authenticated) {
      dispatch(getUser())
    }
  }, [authenticated])

  if (requiresAuth()) {
    return <></>
  }

  return <Component {...pageProps} />
}

export default ProtectRoute
