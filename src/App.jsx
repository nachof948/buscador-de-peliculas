import './App.css'
import { Peliculas } from './components/Peliculas'
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useSearch'

function App() {
  /* CUSTOM HOOK */
  const { error, setSearch, search } = useSearch()
  const { movies, getMovies } = useMovies({ search })

  /* useRef:
  Es un hook que te permite crear una referencia mutable que persiste durante todo el ciclo de vida de tu componente  y es muy util para guardar cualquier valor que quieras mutar como un identificador, un elemento del DOM, etc. Y que cada vez que cambia no vuelve a renderizar el componente
  */

  const manejarCambios = (event) =>{
    setSearch(event.target.value)
  }
  const manejarEnvio = (event) => {
    event.preventDefault()
    getMovies()
    /* const dataInput = Object.fromEntries(new window.FormData(event.target) */ /* Con esto podemos obtener la informacion de todos los inputs de una */
    /* const { query, nombre } = Object.fromEntries(new window.FormData(event.target)) */ 
/*     const { query } = Object.fromEntries(
      new window.FormData(event.target)
    ) */
    console.log({ search })
  }
  


  return (
    <div className='page'>
    <header>
      <h1>Buscador de peliculas</h1>
      <form className='form' onSubmit={manejarEnvio}>
        <input style={{border: '1px solid transparent', borderColor: error ? 'red' : 'transparent'}} value={search} onChange={manejarCambios} name="query" type="text" placeholder='Spiderman, Star Wars, Barbie...' />
        <button type='submit'>Buscar</button>
      </form>
      {error && <p style={{color: 'red', fontWeight:500, textAlign:'center'}}>{error}</p>}
    </header>
    <main>
      <Peliculas movies={ movies } />
    </main>
    </div>
  )
}

export default App
