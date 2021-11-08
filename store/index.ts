
import { getModule } from 'vuex-module-decorators'
import { Store } from 'vuex'
import moviesModule from '~/store/movies'
import celebritiesModule from '~/store/people'

// Inicializamos el Store de Movies para poderlo exportar a componentes y paginas
function initializeStores (store: Store<any>): void {
  moviesStore = getModule(moviesModule, store)
}

// Inicializamos el Store de Celebrities para poderlo exportar a componentes y paginas
function initializeStores2 (store: Store<any>): void {
  celebritiesStore = getModule(celebritiesModule, store)
}
export let moviesStore: moviesModule
export let celebritiesStore: celebritiesModule
export const plugins = [initializeStores, initializeStores2]
 
