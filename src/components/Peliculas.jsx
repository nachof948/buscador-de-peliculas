import './Hoja de estilos/peliculas.css'
const ListaDePeliculas = ({ movies }) =>{
  return(


    <ul className='peliculas'>
      {
        movies.map(pelicula =>(
          <li  className='pelicula' key={pelicula.id}>
            <h3>{pelicula.title}</h3>
            <p className='año'>{pelicula.year}</p>
            <p className={pelicula.type === 'movie' ? 'movie' : pelicula.type === 'game' ? 'game' : 'serie'}>{pelicula.type}</p>
            <img src={pelicula.poster} alt={pelicula.title} />
          </li>
        ))
      }
    </ul>
  )
}

const SinResultadoPeliculas = () =>{
  return (
    <p>No se encontraron peliculas para esta busqueda</p>
  )
}

export function Peliculas ({ movies }){
  const hasMovies = movies?.length > 0
  return(
    hasMovies 
    ? <ListaDePeliculas movies={movies} />
    : <SinResultadoPeliculas />
    )
}