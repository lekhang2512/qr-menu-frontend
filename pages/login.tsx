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

export interface LoginPageProps {
}

export default function LoginPage (props: LoginPageProps) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMousePassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <AuthLayout>
      <Card className="dd-card" sx={{ maxWidth: 528 }}>
        <CardHeader className="dd-card__header" title="Log in"></CardHeader>
        <a>
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
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked
                    icon={
                      <Image
                        src="/tick-square.svg"
                        alt="Tick square"
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
                }
                label="Remember Me"
              />
              <Link href="/forgot-password" className="dd-btn--link">Forgot password?</Link>
            </Stack>
          </Stack>
        </CardContent>
        <Button fullWidth className="dd-btn dd-btn--primary">Log in</Button>

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
    </AuthLayout>
  );
}
