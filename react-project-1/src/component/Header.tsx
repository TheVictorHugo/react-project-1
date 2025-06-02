import React, { useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box'

type HeaderProps = {
  onMenuClick: () => void
  user?: string | null
  onLogout?: () => void
}

function stringAvatar(name: string) {
  return {
    children: name
      ? name
          .split(' ')
          .map(n => n[0])
          .join('')
          .toUpperCase()
      : '?',
  }
}

function Header({ onMenuClick, user, onLogout }: HeaderProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    handleClose()
    if (onLogout) onLogout()
  }

  return (
    <AppBar position="static" sx={{ background: '#222' }}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={onMenuClick}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center', fontWeight: 'bold', letterSpacing: 1 }}>
          Catálogo de Filmes
        </Typography>
        {user && (
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
            <IconButton onClick={handleAvatarClick} color="inherit" size="large">
              <Avatar {...stringAvatar(user)} sx={{ bgcolor: '#e50914', width: 36, height: 36, fontWeight: 'bold' }} />
            </IconButton>
            <Typography sx={{ ml: 1, fontWeight: 500 }}>{user}</Typography>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <MenuItem onClick={handleLogout}>Sair</MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Header
