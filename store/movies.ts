import { Module, VuexModule, Action, Mutation } from 'vuex-module-decorators'
import axios from 'axios'

// Definicion de las propiedades del objeto "movie" y sus tipos
interface movie{
    id:number,
    title: string,
    image:string,
    date: string,
    description:string,
    average:number
}

const key:string | undefined = process.env.API_KEY
const url:string = `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=1`

@Module({
  name: 'movies',
  stateFactory: true,
  namespaced: true
})

export default class movies extends VuexModule {

     // <------------ Carga Inicial de Movies ---------------------------------->
     
        movies: movie[] =[] // Estado Movies, almacenara el resultado de la primera llamada a la API

        get moviesArray () {
          return this.movies
        }

        @Action({ commit: 'setMovies' })
        async loadMovies () {
          // Obtener la informacion de las movies de la API
          const movies = await axios.get(url)

          // Realizar commit con la informacion
          return movies.data.results
        }

        @Mutation
        setMovies (movies: any[]) {
          const formatedMovies:movie[] = [] // Variable donde storeamos temporalmente cada movie formateada con la estructura que nos interesa

          movies.map((movie) => { /* Mapeamos el array de Movies devuelto por la API y por cada movie extraemos solo la informacion necesaria,luego pusheamos a la variable anteriormente creada */
            const formatedMovie = {
              id: movie.id,
              title: movie.title,
              image: movie.poster_path,
              date: movie.release_date,
              description: movie.overview,
              average: movie.vote_average
            }
            formatedMovies.push(formatedMovie)
          })

          this.movies = formatedMovies // Seteamos el estado movies creado al principio con el nuevo array formateado
        }
}
