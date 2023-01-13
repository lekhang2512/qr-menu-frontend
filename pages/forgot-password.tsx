import React, { useState } from 'react';
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
import { resetPassword } from '../features/user/user-slice';
import { useRouter } from 'next/router'
import LoadingButton from '@mui/lab/LoadingButton'

export interface ForgotPasswordPageProps {
}

export default function ForgotPassword (props: ForgotPasswordPageProps) {
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector((state) => state.user.isLoading)

  const validationSchema = yup.object({
    email: yup.string().trim().required("Email is required").email("Email invalid"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values: any) => {
      dispatch(resetPassword(values))
    },
  });

  return (
    <AuthLayout>
      <form onSubmit={formik.handleSubmit}>
        <Card className="dd-card" sx={{ maxWidth: 528 }}>
          <CardHeader className="dd-card__header" title="Forgot Password"></CardHeader>
          <CardContent>
            <Stack
              className="dd-card__form"
              direction="column"
              alignItems="stretch"
            >
              <div className="dd-card__or">Please enter your email to reset password</div>

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
            </Stack>
          </CardContent>
          <LoadingButton loading={isLoading} type="submit" fullWidth className="dd-btn dd-btn--primary">Submit</LoadingButton>
        </Card>
      </form>
    </AuthLayout>
  );
}
