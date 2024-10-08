'use client'
import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore"
import { db } from "@/firebase"
import MenuIcon from '@mui/icons-material/Menu'

import { useSearchParams } from "next/navigation"
import { AppBar, Toolbar, Menu, MenuItem, IconButton,Container, Box, Typography, Paper, TextField, Button, Grid, Card, CardActionArea, CardContent, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material"

export default function Flashcard() {
    const router = useRouter()
    const [anchorEl, setAnchorEl] = useState(null)
    const {isLoaded, isSignedIn, user} = useUser()
    const [flashcards, setFlashcards] = useState([])
    const [flipped, setFlipped] = useState([])

    const searchParams = useSearchParams()
    const search = searchParams.get('id')

    useEffect(()=> {
        async function getFlashcard() {
            if(!user || !search) return
            const colRef = collection(doc(collection(db, 'users'), user.id), search)
            const docs = await getDocs(colRef)
            const flashcards = []
            
            docs.forEach((doc) => {
                flashcards.push({id: doc.id, ...doc.data()})
            });
            setFlashcards(flashcards)
        }
        getFlashcard()
    }, [user, search])

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

    const handleCardClick = (id) =>{
        setFlipped((prev) => ({
            ...prev,
            [id]: !prev[id]
        }))
    }

    if (!isLoaded || !isSignedIn) {
        return <></>
    }

    return (
        <Container maxWidth="100vw">
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
            <Grid container spacing={3} sx={{mt: 4}}>
                {flashcards.map((flashcard, index) => (
                    <Grid item xs={12} md={4} sm={6} key={index}>
                        <Card>
                            <CardActionArea
                            onClick={() => {
                                handleCardClick(index)
                            }}>
                                <CardContent>
                                    <Box sx={{
                                        perspective: '1000px',
                                        '& > div': {
                                            transition: 'transform= 0.6s',
                                            transformStyle: 'preserve-3d',
                                            position: 'relative',
                                            width: '100%',
                                            height: '200px',
                                            boxShadow: '0 4px 8px 0 rgba(0,0,0, 0.2)',
                                            transform: flipped[index]
                                                ? 'rotateY(180deg)'
                                                : 'rotateY(0deg)',
                                        },
                                        '& > div > div': {
                                            position: 'absolute',
                                            width: '100%',
                                            height: '100%',
                                            backfaceVisibility: 'hidden',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            padding: 2,
                                            boxSizing: 'border-box',
                                        },
                                        '& > div > div:nth-of-type(2)': {
                                            transform: 'rotateY(180deg)'
                                        },
                                    }}>
                                        <div>
                                            <div>
                                                <Typography variant="h5" component="div">
                                                    {flashcard.front}
                                                </Typography>
                                            </div>
                                            <div>
                                                <Typography variant="h5" component="div">
                                                    {flashcard.back}
                                                </Typography>
                                            </div>
                                        </div>
                                    </Box>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}