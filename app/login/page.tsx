'use client'

import {Authenticator, Theme, ThemeProvider, useTheme} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import {Amplify} from 'aws-amplify';
import config from '../../amplify_outputs.json';

Amplify.configure(config);

export default function Auth() {
  const { tokens } = useTheme();
  const theme: Theme = {
    name: 'my-theme',
    tokens: {
      colors: {
        primary: {
          // Primary
          10: tokens.colors.primary[10],
          20: tokens.colors.primary[20],
          40: tokens.colors.primary[40],
          60: tokens.colors.black,
          80: tokens.colors.black,
          90: tokens.colors.black,
          100: tokens.colors.primary[100],
        },
      },
    },
  };  
  return (
    <ThemeProvider theme={theme} >
    <Authenticator
    socialProviders={['amazon','apple','facebook']}>
      {({ signOut, user }) => (
        <div>
            <h1>Welcome {user?.username}</h1>
          <button onClick={signOut}>Sign out</button>
        </div>
      )}
    </Authenticator>
    </ThemeProvider>
  );
}