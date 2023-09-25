import { useCallback, useState } from 'react'
import './App.css'
import { Peliculas } from './components/Peliculas'
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useSearch'
import debounce from 'just-debounce-it'

function App() {

  /* Ordenar las peliculas por año */
  const [titulo, setTitulo] = useState(false)
  /* CUSTOM HOOK */
  const { error, setSearch, search } = useSearch()
  const { movies, loading, getMovies } = useMovies({ search, titulo })
  
  /* DEBOUNCE */
  const debouncedGetMovies = useCallback( debounce(search =>{
    getMovies ({ search })
  },500)
  , [getMovies]
  )


  /* useRef:
  Es un hook que te permite crear una referencia mutable que persiste durante todo el ciclo de vida de tu componente  y es muy util para guardar cualquier valor que quieras mutar como un identificador, un elemento del DOM, etc. Y que cada vez que cambia no vuelve a renderizar el componente
  */

  const manejarCambios = (event) =>{
    const newSearch = event.target.value
    setSearch(event.target.value)
    debouncedGetMovies(newSearch)
  }
  const manejarEnvio = (event) => {
    event.preventDefault()
    getMovies({ search })
    /* const dataInput = Object.fromEntries(new window.FormData(event.target) */ /* Con esto podemos obtener la informacion de todos los inputs de una */
    /* const { query, nombre } = Object.fromEntries(new window.FormData(event.target)) */ 
/*     const { query } = Object.fromEntries(
      new window.FormData(event.target)
    ) */
  }
  
  const handleTitulo = () =>{
    setTitulo(!titulo)//Esto es para activarlo o desactivarlo
  }


  return (
    <div className='page'>
    <header>
      <h1>Buscador de peliculas</h1>
      <form className='form' onSubmit={manejarEnvio}>
        <input style={{border: '1px solid transparent', borderColor: error ? 'red' : 'transparent'}} value={search} onChange={manejarCambios} name="query" type="text" placeholder='Spiderman, Star Wars, Barbie...' />
        <input type="checkbox" onChange={handleTitulo} checked={titulo} />
        <button type='submit'>Buscar</button>
      </form>
      {error && <p style={{color: 'red', fontWeight:500, textAlign:'center'}}>{error}</p>}
    </header>
    <main>
      {
        loading ? 
        <div className="loader">
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
        </div>
        : <Peliculas movies={ movies } />
      }
    </main>
    </div>
  )
}

export default App