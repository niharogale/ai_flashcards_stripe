'use client'
import Image from 'next/image'
import getStripe from '@/utils/get-stripe'
import { SignedIn, SignedOut, UserButton, useUser } from '@clerk/nextjs'
import { MenuItem, Menu, AppBar, Box, Button, Container, Grid, Toolbar, Typography, IconButton } from '@mui/material'
import Head from 'next/head'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'

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

  const getStarted = async () => {
    if(!user || !user.id) {
      alert('User is not signed in or user Id is not available')
      return
    } else {
      router.push('/generate')
    }
  }

  const getFlashcards = async () => {
    if(!user || !user.id) {
      alert('User is not signed in or user Id is not available')
      return
    } else {
      router.push('/flashcards')
    }
  }

  return (
    <Container maxWidth="100vw" id="home-root">
      <Head>
        <title>Smart Cards</title>
        <meta name="description" content="Create flashcards from your text" />
      </Head>
      <AppBar color="primary" position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Smart Cards
          </Typography>

          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMenuOpen}
            sx={{ display: { xs: 'block', md: 'none' } }} // Show only on small screens
          >
            <MenuIcon />
          </IconButton>

          {/* Dropdown Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            sx={{ display: 'block' }} // Show only on small screens
          >
            <MenuItem>
              Home
            </MenuItem>
            <MenuItem onClick={getStarted}>
              Generate
            </MenuItem>
            <MenuItem onClick={getFlashcards}>
              Flashcards
            </MenuItem>
          </Menu>

          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          textAlign: 'center',
          my: 4,
        }}
      >
        <Typography variant="h2" gutterBottom>Welcome to Smart Cards!</Typography>
        <Typography variant="h5" gutterBottom>
          The easiest way to make flashcards from your text!
        </Typography>
        <Button onClick={getStarted} variant="contained" color="primary" sx={{ mt: 2 }}>
          Get Started
        </Button>
      </Box>
      <Box sx={{ my: 6 }}>
        <Typography textAlign="center" variant="h4" gutterBottom>Features</Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>Easy Text Input</Typography>
            <Typography>
              Simply input your text and let our software do the rest. Creating flashcards has never been easier.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>Smart Flashcards</Typography>
            <Typography>
              Our AI intelligently breaks down your text into concise flashcards, perfect for studying.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>Accessible Anywhere</Typography>
            <Typography>
              Access your flashcards from any device, at any time. Study on the go with ease.
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ my: 6, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>Pricing</Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box sx={{
              p: 3,
              border: '2px solid',
              borderColor: 'primary.main',
              borderRadius: 2,
            }}
            >
              <Typography variant="h5" gutterBottom>Basic</Typography>
              <Typography variant="h6" gutterBottom>$5 / month</Typography>
              <Typography>
                Access to basic flashcard features and limited storage.
              </Typography>
              <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleSubmitBasic}>Choose Basic</Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{
              p: 3,
              border: '2px solid',
              borderColor: 'primary.main',
              borderRadius: 2,
            }}
            >
              <Typography variant="h5" gutterBottom>Pro</Typography>
              <Typography variant="h6" gutterBottom>$10 / month</Typography>
              <Typography>
                Unlimited flashcards and storage, with priority support.
              </Typography>
              <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleSubmitPro}>Choose Pro</Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}
