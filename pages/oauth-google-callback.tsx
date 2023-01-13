import React, { useEffect } from 'react';
import { useRouter } from 'next/router'
import AuthLayout from '../components/layouts/auth'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import { useAppDispatch, useAppSelector } from '../app/hook';
import { googleLoginCallback } from '../features/user/user-slice';

export interface OAuthGoogleCallbackProps {
}

export default function OAuthGoogleCallback (props: OAuthGoogleCallbackProps) {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated)
  const isLoading = useAppSelector((state) => state.user.isLoading)
  console.log(router.query);

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/')
    }
  }, [router, isAuthenticated])

  useEffect(() => {
    if (router.query.hasOwnProperty('code')) {
      dispatch(googleLoginCallback(router.query))
    }
  }, [dispatch, router.query])

  return (
    <AuthLayout>
      <Card className="dd-card" sx={{ maxWidth: 528 }}>
        <CardHeader className="dd-card__header" title="Google callback" />
        {isLoading ? 'Processing...' : ''}
      </Card>
    </AuthLayout>
  );
}
