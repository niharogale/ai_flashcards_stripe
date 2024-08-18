'use client'
import { useUser } from "@clerk/nextjs"
import { use, useEffect, useState } from "react"

import { collection, CollectionReference, doc, getDoc, setDoc } from "firebase/firestore"
import { db } from "@/firebase"
import { useRouter } from "next/navigation"
import { Box, Button, AppBar, Toolbar, Menu, MenuItem, IconButton, Card, CardActionArea, CardContent, Container, Grid, Typography } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu'

export default function Flashcards() {
    const [anchorEl, setAnchorEl] = useState(null)
    const {isLoaded, isSignedIn, user} = useUser()
    const [flashcards, setFlashcards] = useState([])
    const router = useRouter()
    
    useEffect(()=> {
        async function getFlashcards() {
            if(!user) return
            const docRef = doc(collection(db, 'users'), user.id)
            const docSnap = await getDoc(docRef)

            if(docSnap.exists()){
                const collections = docSnap.data().flashcards || []
                setFlashcards(collections)
            } else {
                await setDoc(docRef, {flashcards: []})
            }
        }
        getFlashcards()
    }, [user])

    if (!isLoaded || !isSignedIn) {
        return <></>
    }
    const handleCardClick = (id) => {
        router.push(`flashcard?id=${id}`)
    }

    const handleNavigation = async (route) => {
        if(!user || !user.id) {
          alert('User is not signed in or user Id is not available')
          return
        } else {
          router.push(route)
        }
      }

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget)
      }
    
      const handleMenuClose = () => {
        setAnchorEl(null)
      }

    return <Container maxWidth="100vw">
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
          <Typography>
            {user.fullName}
          </Typography>
        </Toolbar>
        </AppBar>
        <Grid container spacing={3} sx={{
            mt: 4,
        }}>
            {flashcards.map((flashcard, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card>
                        <CardActionArea onClick={()=>{
                            handleCardClick(flashcard.name)
                        }}>
                            <CardContent>
                                <Typography variant="h6">{flashcard.name}</Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            ))}
        </Grid>
    </Container>
}