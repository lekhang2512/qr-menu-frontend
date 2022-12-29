import React from 'react';
import Link from 'next/link'

export interface HomePageProps {
}

export default function HomePage (props: HomePageProps) {
  return (
    <div>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/login">Login</Link>
        </li>
        <li>
          <Link href="/register">Register</Link>
        </li>
      </ul>
    </div>
  );
}
