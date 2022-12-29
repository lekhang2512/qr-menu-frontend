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

export interface ForgotPasswordPageProps {
}

export default function ForgotPassword (props: ForgotPasswordPageProps) {
  return (
    <AuthLayout>
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
        <Button fullWidth className="dd-btn dd-btn--primary">Submit</Button>
      </Card>
    </AuthLayout>
  );
}
