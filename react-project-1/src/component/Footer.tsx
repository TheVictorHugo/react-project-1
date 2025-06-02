import React from 'react'

function Footer() {
  return (
    <footer style={{
      width: '100%',
      background: '#181818',
      color: '#aaa',
      textAlign: 'center',
      padding: '24px 0 16px 0',
      fontSize: 16,
      marginTop: 'auto'
    }}>
      © {new Date().getFullYear()} Catálogo de Filmes - Inspirado na Netflix
    </footer>
  )
}

export default Footer
