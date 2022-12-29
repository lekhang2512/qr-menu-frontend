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
import Country from '../components/country';

export interface RegisterPageProps {
}

export default function RegisterPage (props: RegisterPageProps) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMousePassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <AuthLayout>
      <Card className="dd-card" sx={{ maxWidth: 528 }}>
        <CardHeader className="dd-card__header" title="Sign up"></CardHeader>
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
            <span>Sign up in with Google</span>
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

            <Stack
              direction="row"
              spacing={1.5}
            >
              <Country />
              <TextField
                className="dd-text-field"
                placeholder="Phone number"
                id="phone"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Image
                        src="/call.svg"
                        alt="Call"
                        width={24}
                        height={24}
                      />
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>

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
                label={
                  <span>
                    <span>I’m agree with the </span>
                    <a className="dd-text-primary">terms & conditions.</a>
                  </span>
                }
              />
            </Stack>
          </Stack>
        </CardContent>
        <Button fullWidth className="dd-btn dd-btn--primary">Sign up</Button>

        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2.5}
        >
          <span>Already have an account</span>
          <Link href="/login" className="dd-btn--link">Log in</Link>
        </Stack>

      </Card>
    </AuthLayout>
  );
}
