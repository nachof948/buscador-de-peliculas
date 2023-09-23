import withoutResults from '../mocks/no-results.json'
import { useState } from 'react'

/* Custom Hook useMovies()*/
//Se encarga de realizar todo el proceso de la busqueda de peliculas

export function useMovies({ search }) {
  const [responseMovies, setResponseMovies] = useState([])
  
  const movies = responseMovies.Search
    
  const mapMovies = movies?.map(movie => ({
    id: movie.imdbID,
    title: movie.Title,
    year: movie.Year,
    type: movie.Type,
    poster: movie.Poster
  }))
  const buscarPeliculas = async(search) =>{
    const response = await fetch(`https://www.omdbapi.com/?apikey=f8f94e06&s=${search}`)
    const data = await response.json()
    return data
  }
  const getMovies = async () =>{
    if (search){
      try{
        const data = await buscarPeliculas(search)
        setResponseMovies(data)
      } 
      catch (error){
          console.log('Error', error)
      }
    } else{
      setResponseMovies(withoutResults)
    }
  }


  return {movies: mapMovies, getMovies}
}
