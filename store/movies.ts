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

const key:string | undefined = process.env.NUXT_ENV_API_KEY
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

          if(this.movies.length === 0){
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
            console.log(formatedMovies)
            this.movies = formatedMovies // Seteamos el estado movies creado al principio con el nuevo array formateado

          }
        }
        
        // <------------ Search Results de Movies ---------------------------------->
        
        searchResults:movie[] = []

        //El estado  de movies favoritas necesita estar declarado antes que la mutacion setSearchedResults para poder añadir la condicion de favorito a las movies buscadas
        favMovies: movie[] = []
        
        get searchedArray () {
          return this.searchResults
        }

        @Action({commit: 'setSearchedResults'})
         async loadSearch(searchValue:string){

          
            // Obtener la informacion de las Movies haciendo una llamada a la API con el valor del input de busqueda interpolado en la URL 
            const search = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.NUXT_ENV_API_KEY}&language=en-US&query=${searchValue}&page=1&include_adult=false`)
            
            const searchResults = search.data.results
            // Realizar commit(Mutacion) con la informacion que devuelve el return
            return {searchResults,searchValue}
          }
        
        @Mutation
        setSearchedResults(object:any){

          // Variable donde storeamos temporalmente cada movie formateada con la estructura que nos interesa
          const formatedSearch: movie[] = [] 
          
          //Filtramos el estado de favoritos para almacenar en la variable las movies favoritas que coincidan con el input de busqueda
          const favoriteSearch = this.favMovies.filter((movie)=> movie.title.toLocaleLowerCase().includes(object.searchValue))
          
          // Mapeamos el array devuelto por la API y por cada movie extraemos solo la informacion necesaria,luego pusheamos a la variable anteriormente creada 
          object.searchResults.map((movie:any)=>{
            
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


          //Pusheamos las Movies favoritas que coinciden con el input de busqueda al Array principal
          favoriteSearch.map((movie)=> formatedSearch.push(movie))

          //FormatedSearch contiene movies duplicadas, creamos una variable que storea todos los ids de las movies de formatedSearch 
          const ids = formatedSearch.map(object=> object.id)

          //filteredSearch recibira un array filtrado sin movies duplicadas y con las movies favoritas marcadas como tal
          const filteredSearch = formatedSearch.filter(({id}, index) => !ids.includes(id, index + 1))
 
          // Seteamos el estado searchResults creado al principio con el nuevo array filtrado
          return this.searchResults = filteredSearch
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

        // <------------------------Manipulacion de favoritos ----------------------->


          get favoritesArray(){
            return this.favMovies
          }

          // Accion que llama a la Mutacion add Favorites
          @Action({commit: 'addFavorites',rawError: true })
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
              const selectedMovie:any =  this.movies.filter( (movie)=>movie.id === movieId)[0]
              
              // Condicional que permite diferenciar si la movie se ha añadido desde la page Movies o Search
              if(this.movies[this.movies.indexOf(selectedMovie)] !== undefined){

                // Si  es desde Movies, Buscamos el index al que equivale la Movie selecionada y cambiamos su propiedad favortie a true
                this.movies[this.movies.indexOf(selectedMovie)].favorite = true

                // Pusheamos la Movie selecionado al estado de favoritos
                return this.favMovies.push(selectedMovie)
              }else{

                // Si es desde Search, filtramos el  array de Search obteniendo la movie seleccionada
                const selectedMovie:any =  this.searchResults.filter( (movie)=>movie.id === movieId)[0]

                //Buscamos el index al que equivale la Movie selecionada y cambiamos su propiedad favortie a true
                this.searchResults[this.searchResults.indexOf(selectedMovie)].favorite = true

                //Creamos una Movie formateada con los datos que nos interesa
                const searchMovie ={

                  id: selectedMovie.id,
                  title: selectedMovie.title,
                  image: selectedMovie.image,
                  date: selectedMovie.date,
                  description: selectedMovie.description.slice(0,100) + '...',
                  average: selectedMovie.average,
                  favorite: true
                }
                // Pusheamos la Movie formateada al estado de favoritos
                return this.favMovies.push(searchMovie)
              }
            
            }

          @Mutation
            deleteFavorites(movieId:number){
          
               // Buscamos en nuestro estado Movies el objeto movie añadido a favoritos mediante el Id
               const selectedMovie:any =  this.movies.filter( (movie)=>movie.id === movieId)[0]
              
               // Condicional que permite diferenciar si la movie se ha añadido desde la page Movies o Search
               if(this.movies[this.movies.indexOf(selectedMovie)] !== undefined){
 
                 // Si  es desde Movies, Buscamos el index al que equivale la Movie selecionada y cambiamos su propiedad favortie a false
                 this.movies[this.movies.indexOf(selectedMovie)].favorite = false
                
                 // Filtramos el estado favoritos y devolvemos un nuevo array con todas las movies que su propiedad ID no coincide con la movie selecionada para borrar
                 const filteredFavorites = this.favMovies.filter((movie)=>movie.id !== movieId)
              
                 return this.favMovies = filteredFavorites

               }else{
                // Si es desde Search, filtramos el  array de Search obteniendo la movie seleccionada
                const selectedMovie:any =  this.searchResults.filter( (movie)=>movie.id === movieId)[0]

                //Buscamos el index al que equivale la Movie selecionada y cambiamos su propiedad favortie a false
                this.searchResults[this.searchResults.indexOf(selectedMovie)].favorite = false

                // Filtramos el estado favoritos y devolvemos un nuevo array con todas las movies que su propiedad ID no coincide con la movie selecionada para borrar
                const filteredFavorites = this.favMovies.filter((movie)=>movie.id !== movieId)

                return this.favMovies = filteredFavorites
               }
            }


          // <-----------------------Paginacion de Movies ----------------------->

          @Action({commit:'setMovies'})
            async loadPage(page:number){
              // Obtener la informacion de las Movies haciendo una llamada a la API con el valor de la variable page interpolado en la URL 
              const moviePage = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.NUXT_ENV_API_KEY}&language=en-US&page=${page}`)
              
              // Realizar commit(Mutacion) con la informacion que devuelve el return
              return moviePage.data.results
            }
          
}


