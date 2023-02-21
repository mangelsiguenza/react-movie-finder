import './App.css'
import { useCallback, useMemo, useRef, useState } from 'react'
import { Movies } from './components/Movies.jsx'
import { UseMovies } from './hooks/UseMovies.js'
import { UseSearch } from './hooks/UseSearch.js'
import debounce from 'just-debounce-it'

function App () {
  const [sort, setSort] = useState(false)
  const { search, setSearch, error } = UseSearch()
  const { movies, loading, getMovies } = UseMovies({ search, sort })
  const inputRef = useRef()

  const debousedMovies = useCallback(debounce(search => {
    getMovies({ search })
  }, 500)
  , [])
  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({ search })
  }
  const handleChange = (event) => {
    const value = inputRef.current.value
    // const value = event.target.value
    setSearch(value)
    // getMovies({ search })
    debousedMovies(value)
  }

  const handleSort = () => {
    setSort(!sort)
  }

  return (
    <div className='page'>
      <header>
        <h1>Buscador de películas</h1>
        <form className='form' onSubmit={handleSubmit}>

          <input
            style={{
              border: '1px solid transparent',
              borderColor: error ? 'red' : 'transparent'
            }}
            onChange={handleChange} value={search} name='query'
            ref={inputRef} placeholder='The Simpson, Avengers'
          />
          <input type='checkbox' disabled={!search} onChange={handleSort} checked={sort} />
          <button disabled={!search} type='submit'>Buscar</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>
      <main>
        {
          loading ? 'Procesando...' : <Movies movies={movies} />
        }

      </main>
    </div>
  )
}

export default App
