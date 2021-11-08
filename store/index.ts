
import { getModule } from 'vuex-module-decorators'
import { Store } from 'vuex'
import moviesModule from '~/store/movies'

// Inicializamos el Store de Movies para poderlo exportar a componentes y paginas
function initializeStores (store: Store<any>): void {
  moviesStore = getModule(moviesModule, store)
}

export let moviesStore: moviesModule
export const plugins = [initializeStores]
 
