import { useState, useEffect, useRef } from 'react'
export function useSearch (){
  
  /* Uso de useRef para detectar cuando es la primera vez */
  const isFirstInput = useRef(true)
  const [error, setError] = useState(null)
    /* Este estado se utiliza para controlar el formulario */
    const [search, setSearch] = useState('')
    /* Validar el formulario de forma controlada */
    useEffect(()=>{
      
  /* Uso de useRef para detectar cuando es la primera vez */
      if(isFirstInput.current){
        isFirstInput.current = search === ''
        return
      }
      if(search === ''){
        setError('No se puede buscar una pelicula vacia')
        return
      }
      if(search.length < 3){
        setError('La busqueda debe tener al menos 3 caracteres')
        return
      }
      setError(null)
    }, [search])
  
  return {error, setSearch,search }
}
