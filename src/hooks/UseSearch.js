import { useEffect, useRef, useState } from 'react'

export function UseSearch () {
  const [search, setSearch] = useState('')
  const [error, setError] = useState(null)

  const isFirst = useRef(true)

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = !search
      return
    }

    if (search === '') {
      setError('El nombre de la película no puede ser vacía')
      return
    }

    if (search.match(/^\d+$/)) {
      setError('No se puede buscar una película con un número')
      return
    }

    if (search.length < 3) {
      setError('La búsqueda debe tener al menos 3 caracteres')
      return
    }

    setError(null)
  }, [search])

  return { search, setSearch, error }
}
