import getStripe from '@/utils/get-stripe';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Container, AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import Head from 'next/head';

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Head>
        <title>Flashcard SaaS</title>
        <meta name="description" content="Create flashcards from your text" />
      </Head>

      <AppBar position="static">
        <Toolbar sx={{ position: 'relative', minHeight: '64px' }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Flashcard SaaS
          </Typography>
          <Box sx={{
            position: 'absolute',
            right: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            alignItems: 'center',
            gap: 2
          }}>
            <SignedOut>
              <Button sx={{ color: 'white', border: '1px solid white' }}>Log in</Button>
              <Button sx={{ color: 'white', border: '1px solid white' }}>Sign Up</Button>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </Box>
        </Toolbar>
      </AppBar>

      <Box sx={{
        textAlign: 'center',
        my: 4,
      }}>
        <Typography variant="h2">Welcome to Flashcards SaaS</Typography>
        <Typography variant="h5">
          The easiest way to make flashcards from your text
        </Typography>
        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
          Get Started
        </Button>
      </Box>
    </Container>
  );
}


