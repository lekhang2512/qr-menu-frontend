import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Image from 'next/image'
import Link from 'next/link'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import AuthLayout from '../components/layouts/auth'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useAppDispatch, useAppSelector } from '../app/hook';
import { signIn, googleLogin } from '../features/user/user-slice';
import { useRouter } from 'next/router'

export interface LoginPageProps {
}

export default function LoginPage (props: LoginPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch()
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated)
  const router = useRouter()

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMousePassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const validationSchema = yup.object({
    email: yup.string().trim().required("Email is required").email("Email invalid"),
    password: yup.string().trim().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values: any) => {
      dispatch(signIn(values))
    },
  });

  const handleGoogleLogin = async () => {
    let response = await googleLogin()
    window.open(response.authenticate_url, '_blank')
    console.log('response', response)
  }

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/')
    }
  }, [router, isAuthenticated])

  return (
    <AuthLayout>
      <form onSubmit={formik.handleSubmit}>
        <Card className="dd-card" sx={{ maxWidth: 528 }}>
          <CardHeader className="dd-card__header" title="Log in"></CardHeader>
          <a onClick={handleGoogleLogin}>
            <Stack
              className="dd-btn--social-login"
              direction="row"
              alignItems="center"
            >
              <Image
                src="/google.svg"
                alt="Google"
                width={18}
                height={18}
              />
              <span>Log in in with Google</span>
            </Stack>
          </a>
          <CardContent>
            <Stack
              className="dd-card__form"
              direction="column"
              alignItems="stretch"
            >
              <div className="dd-card__or">or</div>

              <TextField
                className="dd-text-field"
                placeholder="Email address"
                id="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={
                    formik.touched.email && Boolean(formik.errors.email)
                }
                helperText={formik.touched.email && formik.errors.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Image
                        src="/sms.svg"
                        alt="Sms"
                        width={24}
                        height={24}
                      />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                className="dd-text-field"
                placeholder="Password"
                id="password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                    formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Image
                        src="/lock.svg"
                        alt="Lock"
                        width={24}
                        height={24}
                      />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMousePassword}
                        onMouseUp={handleMousePassword}
                        edge="end"
                      >
                        {showPassword ?
                          <Image
                            src="/eye-slash.svg"
                            alt="Eye slash"
                            width={24}
                            height={24}
                          /> :
                          <Image
                            src="/eye.svg"
                            alt="Eye"
                            width={24}
                            height={24}
                          />
                        }
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Stack
                pl={1}
                pr={1}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Stack direction="row" alignItems="center">
                  <Checkbox
                    icon={
                      <Image
                        src="/square.svg"
                        alt="Square"
                        width={24}
                        height={24}
                      />
                    }
                    checkedIcon={
                      <Image
                        src="/tick-square-checked.svg"
                        alt="Tick square checked"
                        width={24}
                        height={24}
                      />
                    }
                  />
                  Remember Me
                </Stack>
                <Link href="/forgot-password" className="dd-btn--link">Forgot password?</Link>
              </Stack>
            </Stack>
          </CardContent>
          <Button type="submit" fullWidth className="dd-btn dd-btn--primary">Log in</Button>

          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2.5}
          >
            <span>{`Don't have an account?`}</span>
            <Link href="/sign-up" className="dd-btn--link">Sign up</Link>
          </Stack>

        </Card>
      </form>
    </AuthLayout>
  );
}
