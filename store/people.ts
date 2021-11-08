import{ Module, VuexModule, Action, Mutation } from 'vuex-module-decorators'
import axios from 'axios'

interface celeb {
  id: number,
  name: string,
  job: string,
  image: string,
  rating: number
}

const key:string | undefined = process.env.API_KEY
const url:string = `https://api.themoviedb.org/3/person/popular?api_key=3c59a1bf1cbd14333e0179f3dd37c4db&language=en-US&page=1`


@Module({
    name: 'people',
    stateFactory: true,
    namespaced: true
})
export default class People extends VuexModule{
  
    // <------------ Carga Inicial de People ---------------------------------->

    celebrities: celeb[] = []

    get actorsArray () {
        return this.celebrities
    }

    @Action({commit: 'setCelebrities'})
      async loadCeleb () {
          // Obtener informacion de las Celebrities haciendo una llamada a la API
          const celebs = await axios.get(url)

          /// Realizar commit(Mutacion) con la informacion que devuelve el return
          return  celebs.data.results
      }

    @Mutation
    setCelebrities(celebrities: any[]){

        // Variable donde Storeamos temporalmente cada Celebritie formateada con la estructura que nos interesa
        const formatedCelebrities:celeb[] = []
        
        /* Mapeamos el array de Celebrities devuelto por la API y por cada celeb extraemos solo la informacion necesaria,luego pusheamos a la variable anteriormente creada */
        celebrities.map((celebritie)=>{
            const formatedCelebritie ={
                id: celebritie.id,
                name: celebritie.name,
                job: celebritie.known_for_department,
                image: celebritie.profile_path,
                rating: celebritie.popularity
            }
            formatedCelebrities.push(formatedCelebritie)
        })
        // Seteamos el estado movies creado al principio con el nuevo array formateado
        this.celebrities = formatedCelebrities 
    }

     // <------------ Search Results de Movies ---------------------------------->

     searchResults: celeb[] = []

     get searchArray ( ){
         return this.searchResults
     }

     @Action({commit:'setSearchResults'})

       async loadSearch(searchValue: string){

           // Obtener la informacion de las Movies haciendo una llamada a la API con el valor del input de busqueda interpolado en la URL 
           const search = await axios.get(`https://api.themoviedb.org/3/search/person?api_key=3c59a1bf1cbd14333e0179f3dd37c4db&language=en-US&query=${searchValue}&page=1&include_adult=false`)

           console.log("entra en actions")
           // Realizar commit(Mutacion) con la informacion que devuelve el return
           return search.data.results
       }

    @Mutation
    setSearchResults (search: any[]){

      // Variable donde storeamos temporalmente cada movie formateada con la estructura que nos interesa
      const formatedSearch: celeb[] = []

      // Mapeamos el array devuelto por la API y por cada celebritie extraemos solo la informacion necesaria,luego pusheamos a la variable anteriormente creada
      search.map((celebritie)=>{

        const formatedCeleb={
          id: celebritie.id,
          name: celebritie.name,
          job: celebritie.known_for_department,
          image: celebritie.profile_path,
          rating: celebritie.popularity
        }
        formatedSearch.push(formatedCeleb)
      })
       // Seteamos el estado searchResults creado al principio con el nuevo array formateado
      return this.searchResults = formatedSearch 
    }
}

