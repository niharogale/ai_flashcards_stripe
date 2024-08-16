import getStripe from '@/utils/get-stripe';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Container, AppBar, Toolbar, Typography, Button, Box, Grid } from '@mui/material';
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
              <Button sx={{ color: 'white', border: '1px solid white' }} href='/sign-in'>Log in</Button>
              <Button sx={{ color: 'white', border: '1px solid white' }} href='/sign-up'>Sign Up</Button>
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
      <Box sx = {{my: 6}}>
        <Typography variant="h4">Features</Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6">Easy Text Input</Typography>
            <Typography>
              {' '}
              Simply Put your text and let our software do the rest. Creating 
              Flashcards has never been easier</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6">Smart Flashcards</Typography>
            <Typography>
              {' '}
              Our Ai intelligently breaks down your text into flashcards for studying</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6">Accessible Anywhere</Typography>
            <Typography>
              {' '}
              Study on the go anywhere!</Typography>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{my: 6, textAlign: 'center',}}>
        <Typography variant="h4" gutterBottom={2}>Pricing</Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}> 
            <Box sx={{
              p: 3,
              border: '1px solid',
              borderColor: 'grey.300',
              borderRadius: 2,
            }}>
            <Typography variant="h5">Basic</Typography>
            <Typography variant="h6">$5 / Month</Typography>
            <Typography>
              {' '}
              Access to our basic model and flashcard Generator</Typography>
            </Box>  
          </Grid>
          <Grid item xs={12} md={6}>
          <Box sx={{
              p: 3,
              border: '1px solid',
              borderColor: 'grey.300',
              borderRadius: 2,
            }}>
            <Typography variant="h5">Pro</Typography>
            <Typography variant="h6">$10 / Month</Typography>
            <Typography>
              {' '}
              Access to our premium features and services</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}


