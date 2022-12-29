import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Image from 'next/image'
import Link from 'next/link'

export interface AuthLayoutProps {
    children: React.ReactNode
}

export default function AuthLayout (props: AuthLayoutProps) {
  return (
    <div>
      <Container>
        <Box mt={3}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent={{ xs: 'center', sm: 'space-between'}}
          >
            <Image
              src="/logo.svg"
              alt="Logo"
              width={356}
              height={69}
              priority
              className="dd-logo"
            />
            <Stack
              direction="row"
              alignItems="center"
              justifyContent={{ xs: 'center'}}
              spacing={1}
              mt={{ xs:3, sm: 0}}
            >
              <Link href="/login" className="dd-btn dd-btn--primary">Log in</Link>
              <Link href="/sign-up" className="dd-btn dd-btn--outline">Sign up</Link>
            </Stack>
          </Stack>
        </Box>

        <Stack
          mt={{ xs: 5, sm: 5}}
          mb={{ xs: 5, sm: 5}}
          direction={{
            xs: "column",
            md: "row"
          }}
          justifyContent={{
            xs: "center",
            md: "space-between"
          }}
          alignItems={{
            xs: "center",
            md: "space-between"
          }}
        >
          {props.children}

          <div className={'dd-img-container dd-img-menu-food'}>
            <Image src="menu-food.svg" layout="fill" className={'dd-img'} alt="Menu food" />
          </div>
        </Stack>
      </Container>
    </div>
  );
}
