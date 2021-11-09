import { Module, VuexModule, Action, Mutation } from 'vuex-module-decorators'
import axios from 'axios'

// Definicion de las propiedades del objeto "movie" y sus tipos
interface movie{
    id:number,
    title: string,
    image:string,
    date: string,
    description: string,
    average: number,
    favorite: boolean
}

const key:string | undefined = process.env.API_KEY
const url:string = `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=1`


@Module({
  name: 'movies',
  stateFactory: true,
  namespaced: true
})

export default class Movies extends VuexModule {

     // <------------ Carga Inicial de Movies ---------------------------------->
     
        movies: movie[] =[] // Estado Movies, almacenara el resultado de la primera llamada a la API

        get moviesArray () {
          return this.movies
        }

        @Action({ commit: 'setMovies' })
        async loadMovies () {
          // Obtener la informacion de las Movies haciendo una llamada a la API
          const movies = await axios.get(url)
          
          // Realizar commit(Mutacion) con la informacion que devuelve el return
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
              description: movie.overview.slice(0,100) + '...',
              average: movie.vote_average,
              favorite: false
            }
            formatedMovies.push(formatedMovie)
          })

          this.movies = formatedMovies // Seteamos el estado movies creado al principio con el nuevo array formateado
        }

        // <------------ Search Results de Movies ---------------------------------->

        searchResults:movie[] = []

        get searchedArray () {
          return this.searchResults
        }

        @Action({commit: 'setSearchedResults'})
         async loadSearch(searchValue:string){

          
            // Obtener la informacion de las Movies haciendo una llamada a la API con el valor del input de busqueda interpolado en la URL 
            const search = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=3c59a1bf1cbd14333e0179f3dd37c4db&language=en-US&query=${searchValue}&page=1&include_adult=false`)
            
            // Realizar commit(Mutacion) con la informacion que devuelve el return
            return search.data.results
          }
        
        @Mutation
        setSearchedResults(search:any[]){

          // Variable donde storeamos temporalmente cada movie formateada con la estructura que nos interesa
          const formatedSearch: movie[] = [] 

          // Mapeamos el array devuelto por la API y por cada movie extraemos solo la informacion necesaria,luego pusheamos a la variable anteriormente creada 
          search.map((movie)=>{
            const formatedMovie={
              id: movie.id,
              title: movie.title,
              image: movie.poster_path,
              date: movie.release_date,
              description: movie.overview.slice(0,100) + '...',
              average: movie.vote_average,
              favorite: false
            }
            
            formatedSearch.push(formatedMovie)
          })
          // Seteamos el estado searchResults creado al principio con el nuevo array formateado

          return this.searchResults = formatedSearch
        }



        // <------------Reseteando Search State -------------->

        @Action({commit: 'setReset'})

          loadReset(){
            return console.log("movies reseted")
          }
        
        @Mutation
          setReset(){
            return this.searchResults = []
          }

          // <------------Manipulacion de favoritos -------------->

          favMovies: movie[] = []

          get favoritesArray(){
            return this.favMovies
          }

          // Accion que llama a la Mutacion add Favorites
          @Action({commit: 'addFavorites'})
            loadFavorites(movieId: number){
              return movieId
          }

          // Accion que llama a la Mutacion delete Favorites
          @Action({commit: 'deleteFavorites'})
            removeFavorites(movieId: number){
              return movieId
          }


          @Mutation
            addFavorites(movieId:number){
          
              // Buscamos en nuestro estado Movies el objeto movie añadido a favoritos mediante el Id
              const selectedMovie:movie =  this.movies.filter( (movie)=>movie.id === movieId)[0]
          
              //Buscamos el index al que equivale la Movie selecionada y cambiamos su propiedad favortie a true
              this.movies[this.movies.indexOf(selectedMovie)].favorite = true
              console.log(this.favMovies)
              // Pusheamos la Movie selecionado al estado de favoritos
              return this.favMovies.push(selectedMovie)
            }

          @Mutation
            deleteFavorites(movieId:number){
          
              // Buscamos en nuestro estado Movies el objeto movie  mediante el Id
              const selectedMovie:movie =  this.movies.filter( (movie)=>movie.id === movieId)[0]
          
              //Buscamos el index al que equivale la Movie selecionada y cambiamos su propiedad favortie a false
              this.movies[this.movies.indexOf(selectedMovie)].favorite = false

              // Filtramos el estado favoritos y devolvemos un nuevo array con todas las movies que su propiedad ID no coincide con la movie selecionada para borrar
              const filteredFavorites = this.favMovies.filter((movie)=>movie.id !== movieId)
              
              return this.favMovies = filteredFavorites
          }

          
}
