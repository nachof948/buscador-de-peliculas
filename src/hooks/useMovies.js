import { useState, useRef, useMemo, useCallback} from 'react'
import { searchMovies } from '../services/movies'
/* Custom Hook useMovies()*/
//Se encarga de realizar todo el proceso de la busqueda de peliculas

export function useMovies({ search, titulo}) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  
  /* Utilizamos useRef() para guardar la busqueda anterior */
  const previousSearch = useRef(search)
  
  /* useMemo() lo que hace memorizar un valor para no tener que volverlo a calcular dependiendo de unas dependencias   */

  /* La razón principal para usar useCallback() es evitar que las funciones se creen nuevamente en cada renderizado, lo que puede ser especialmente importante en situaciones donde se pasan funciones como props a componentes hijos. */
  
  /* useCallBack() */
  const getMovies = useCallback(async ({ search }) =>{
    if (search === previousSearch.current) return
    try{
      setLoading(true)
      const newMovies = await searchMovies({search})
      setMovies(newMovies)
    } catch(err){
      throw new Error('Error en la busqueda')
    } finally{
      setLoading(false)
    }
  }, [])

  /* useMemo() */
/*   const getMovies = useMemo(() =>{
    return async ({ search }) =>{
    if(search === previousSearch.current) return
    try{
      setLoading(true) */
      /* Esto actualiza el valor del objeto useRef con la nueva búsqueda actual. */
/*       previousSearch.current = search
      const newMovies = await searchMovies({search})
      setMovies(newMovies)
    }catch(error){
      throw new Error('Error en la busqueda')
    }finally{ */
      //Esto se ejecuta tanto en Try como en el Catch
/*       setLoading(false)
    }
  }}, [search]) */

  const sortedTitle = useMemo(()  =>{
    return titulo
      ?[...movies].sort((a,b) => a.title.localeCompare(b.title)) 
      : movies
  }, [titulo, movies])
  
  return {movies: sortedTitle, getMovies, loading}
}
