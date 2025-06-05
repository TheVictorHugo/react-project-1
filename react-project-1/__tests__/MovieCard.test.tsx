import React from 'react'
import { render, screen } from '@testing-library/react'
import MovieCard from '../src/component/MovieCard'

describe('MovieCard', () => {
  const movie = {
    title: 'Filme Teste',
    cover: 'https://via.placeholder.com/200x300?text=Filme+Teste',
    rating: 4
  }

  test('renderiza o título do filme', () => {
    render(<MovieCard movie={movie} />)
    expect(screen.queryByText('Filme Teste')).not.toBeNull()
  })

  test('renderiza a imagem do filme', () => {
    render(<MovieCard movie={movie} />)
    const img = screen.queryByAltText('Filme Teste') as HTMLImageElement
    expect(img).not.toBeNull()
    expect(img.src).toBe(movie.cover)
  })

  test('renderiza as estrelas de rating corretamente', () => {
    render(<MovieCard movie={movie} />)
    // 4 estrelas cheias, 1 vazia
    expect(screen.queryByText('★★★★☆')).not.toBeNull()
  })
})
