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

export interface ResetPasswordProps {
}

export default function ResetPassword (props: ResetPasswordProps) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMousePassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <AuthLayout>
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
        <Button fullWidth className="dd-btn dd-btn--primary">Submit</Button>
      </Card>
    </AuthLayout>
  );
}
