'use client'
import Image from 'next/image'
import getStripe from '@/utils/get-stripe'
import { SignedIn, SignedOut, UserButton, useUser } from '@clerk/nextjs'
import { MenuItem, Menu, AppBar, Box, Button, Container, Grid, Toolbar, Typography, IconButton } from '@mui/material'
import Head from 'next/head'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import Link from 'next/link'

export default function Home() {
  const router = useRouter()
  const [anchorEl, setAnchorEl] = useState(null)
  const {isLoaded, isSignedIn, user} = useUser()

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleSubmitPro = async () => {
    const checkoutSession = await fetch('/api/checkout_session', {
      method: 'POST',
      headers: {
        origin: 'https://localhost:3000',
        plan: "pro",
      },
    })

    const checkoutSessionJson = await checkoutSession.json()

    if (checkoutSession.statusCode === 500) {
      console.error(checkoutSession.message)
      return
    }

    const stripe = await getStripe()
    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    })

    if (error) {
      console.warn(error.message)
    }
  }

  const handleSubmitBasic = async () => {
    const checkoutSession = await fetch('/api/checkout_session', {
      method: 'POST',
      headers: {
        origin: 'https://localhost:3000',
        plan: "basic",
      },
    })

    const checkoutSessionJson = await checkoutSession.json()

    if (checkoutSession.statusCode === 500) {
      console.error(checkoutSession.message)
      return
    }

    const stripe = await getStripe()
    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    })

    if (error) {
      console.warn(error.message)
    }
  }

  const handleNavigation = async (route) => {
    if(!user || !user.id) {
      alert('User is not signed in or user Id is not available')
      return
    } else {
      router.push(route)
    }
  }

  return (
    <Container maxWidth="100vw" id="home-root" sx={{ p: { xs: 2, md: 4 }, backgroundColor: '#f5f5f5' }}>
      <Head>
        <title>Smart Cards</title>
        <meta name="description" content="Create flashcards from your text" />
      </Head>

      <AppBar color="primary" position="static" sx={{ mb: 4 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Smart Cards
          </Typography>

          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMenuOpen}
            sx={{ display: { xs: 'block', md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            sx={{ display: { xs: 'block', md: 'none' } }}
          >
            <MenuItem onClick={() => handleNavigation('/')}>Home</MenuItem>
            <MenuItem onClick={() => handleNavigation('/generate')}>Generate</MenuItem>
            <MenuItem onClick={() => handleNavigation('/flashcards')}>Flashcards</MenuItem>
          </Menu>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            <Button color="inherit" onClick={() => handleNavigation('/')}>Home</Button>
            <Button color="inherit" onClick={() => handleNavigation('/generate')}>Generate</Button>
            <Button color="inherit" onClick={() => handleNavigation('/flashcards')}>Flashcards</Button>
          </Box>

          <SignedOut>
            <Button color='inherit'>
              <Link href="/sign-in" passHref>
                Login
              </Link>
            </Button>
            <Button color='inherit'>
              <Link href="/sign-up" passHref>
                Sign Up
              </Link>
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',  // Center vertically
          alignItems: 'center',       // Center horizontally
          textAlign: 'center',
          mb: 6,
          height: '40vh',
        }}
      >
        <Typography variant="h2" gutterBottom>Welcome to Smart Cards!</Typography>
        <Typography variant="h5" gutterBottom>
          The easiest way to make flashcards from your text!
        </Typography>
        <Button onClick={() => handleNavigation('/generate')} variant="contained" color="primary" sx={{ mt: 2, px: 4, py: 1.5, fontSize: '1rem' }}>
          Get Started
        </Button>
      </Box>
      
      <Box sx={{ mb: 8 }}>
        <Typography textAlign="center" variant="h4" gutterBottom>Features</Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ p: 3, backgroundColor: '#fff', borderRadius: 2, boxShadow: 3 }}>
              <Typography variant="h6" gutterBottom>Easy Text Input</Typography>
              <Typography>
                Simply input your text and let our software do the rest. Creating flashcards has never been easier.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ p: 3, backgroundColor: '#fff', borderRadius: 2, boxShadow: 3 }}>
              <Typography variant="h6" gutterBottom>Smart Flashcards</Typography>
              <Typography>
                Our AI intelligently breaks down your text into concise flashcards, perfect for studying.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ p: 3, backgroundColor: '#fff', borderRadius: 2, boxShadow: 3 }}>
              <Typography variant="h6" gutterBottom>Accessible Anywhere</Typography>
              <Typography>
                Access your flashcards from any device, at any time. Study on the go with ease.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
      
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>Pricing</Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box sx={{
              p: 4,
              border: '2px solid',
              borderColor: 'primary.main',
              borderRadius: 2,
              backgroundColor: '#fff',
              boxShadow: 3,
            }}>
              <Typography variant="h5" gutterBottom>Basic</Typography>
              <Typography variant="h6" color="text.secondary">$5 / month</Typography>
              <Typography sx={{ mt: 2 }}>
                Access to basic flashcard features and limited storage.
              </Typography>
              <Button variant="contained" color="primary" sx={{ mt: 4, px: 4, py: 1.5, fontSize: '1rem' }} onClick={handleSubmitBasic}>
                Choose Basic
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{
              p: 4,
              border: '2px solid',
              borderColor: 'primary.main',
              borderRadius: 2,
              backgroundColor: '#fff',
              boxShadow: 3,
            }}>
              <Typography variant="h5" gutterBottom>Pro</Typography>
              <Typography variant="h6" color="text.secondary">$10 / month</Typography>
              <Typography sx={{ mt: 2 }}>
                Unlimited flashcards and storage, with priority support.
              </Typography>
              <Button variant="contained" color="primary" sx={{ mt: 4, px: 4, py: 1.5, fontSize: '1rem' }} onClick={handleSubmitPro}>
                Choose Pro
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}
