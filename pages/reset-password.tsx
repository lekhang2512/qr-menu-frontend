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
import { createPassword, resetStateCreatePassword } from '../features/user/user-slice';
import { useRouter } from 'next/router'
import LoadingButton from '@mui/lab/LoadingButton'
export interface ResetPasswordProps {
}

export default function ResetPassword (props: ResetPasswordProps) {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch()
  const isCreatePassword = useAppSelector((state) => state.user.isCreatePassword)
  const isLoading = useAppSelector((state) => state.user.isLoading)
  const router = useRouter()

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMousePassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const validationSchema = yup.object({
    password: yup.string().trim().required("Password is required"),
    confirm_password: yup.string().trim().required("Confirm password is required").oneOf([yup.ref('password'), null], 'Passwords must match'),
  });

  const formik = useFormik({
    initialValues: {
      password: "",
      confirm_password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values: any) => {
      values.token = router.query.token
      dispatch(createPassword(values))
    },
  });

  useEffect(() => {
    if (isCreatePassword) {
      dispatch(resetStateCreatePassword())
      router.push('/login')
    }
  }, [router, isCreatePassword])

  return (
    <AuthLayout>
      <form onSubmit={formik.handleSubmit}>
      <Card className="dd-card" sx={{ maxWidth: 528 }}>
        <CardHeader className="dd-card__header" title="Reset password"></CardHeader>
        <CardContent>
          <Stack
            className="dd-card__form"
            direction="column"
            alignItems="stretch"
          >
            <div className="dd-card__or">Create your new password</div>

            <TextField
              className="dd-text-field"
              placeholder="Enter your new password"
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
            <TextField
              className="dd-text-field"
              placeholder="Confirm your new password"
              id="confirm-password"
              type={showPassword ? 'text' : 'password'}
              name="confirm_password"
              value={formik.values.confirm_password}
              onChange={formik.handleChange}
              error={
                  formik.touched.confirm_password && Boolean(formik.errors.confirm_password)
              }
              helperText={formik.touched.confirm_password && formik.errors.confirm_password}
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
          </Stack>
        </CardContent>
        <LoadingButton loading={isLoading} type="submit" fullWidth className="dd-btn dd-btn--primary">Submit</LoadingButton>
      </Card>
      </form>
    </AuthLayout>
  );
}
