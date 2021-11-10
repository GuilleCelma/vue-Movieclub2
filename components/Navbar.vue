<template>
    <header >
      <nav class="relative flex flex-wrap items-center justify-between px-2 py-3 bg-black mb-3">
        <div class="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div class="w-full relative flex justify-between lg:w-auto  px-4 lg:static lg:block lg:justify-start">
            <a class="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white" >
              Movieclub
            </a>
            <button class="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none" type="button" v-on:click="toggleNavbar()">
              <font-awesome-icon :icon="['fas','bars']" />
            </button>
          </div>
          <div :class="{'hidden': !showMenu, 'flex w-full': showMenu}" class="flex justify-evenly w-9/12 items-center lg:flex lg:items-center ">

            <form class="sm: flex-col">
              <input id="searchBar" v-model="searchValue" class="border-2 border-gray-300 bg-gray-100 h-10 w-40 lg:w-80 mr-0  px-2  rounded-lg text-sm focus:outline-none" type="search" name="search" placeholder="Search.."/>
              <input v-if="searchOption" id="search-btn" @click.prevent="startSearch"   type="submit" value="🔍" class="cursor-pointer border-2 border-gray-300 bg-gray-100 h-10  px-3  rounded-lg text-sm focus:outline-none hover:bg-gray-300" >
              <input v-else id="search-btn" @click.prevent="startSearch"   type="submit" value="🔍" class="cursor-pointer border-2 border-gray-300 bg-gray-100 h-10  px-3  rounded-lg text-sm focus:outline-none hover:bg-gray-300" >
              <br>
              <input type="radio" id="mov" name="search" value="movies" v-model="searchOption" >
              <label for="mov" class="text-white">Movies</label>
              <input type="radio" id="per" name="search" value="persons"  v-model="searchOption" >
              <label for="per" class="text-white">Person</label><br>
            </form>

            <ul class="flex flex-col lg:flex-row list-none ml-auto">
              <li class="nav-item">
                <Nuxt-link class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75" to='/movies'>
                  <span class="ml-2">Movies</span>
                </Nuxt-link>
              </li>
              <li class="nav-item">
                <Nuxt-link class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75" to='/people'>
                  <span class="ml-2">People</span>
                </Nuxt-link>
              </li>
              <li>
                <Nuxt-link class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75" to='/favorites'>
                  <span class="ml-2">Favorites</span>
                </Nuxt-link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
</template>

<script >
import { celebritiesStore, moviesStore } from '../store/index'

export default {
  data () {
    return{
      searchValue:"",
      searchOption: "movies",
      showMenu: false,
    }
  },
  methods:{
      startSearch (searchValue){
          if(this.searchOption==='movies'){
              moviesStore.loadSearch(this.searchValue),
              this.$router.push('/search')
          }else{
              moviesStore.loadReset()
              celebritiesStore.loadSearch(this.searchValue)
              this.$router.push('/search')
          }
      },
      toggleNavbar: function(){
        this.showMenu = !this.showMenu;
      }
     
  }

}

</script>

<style scope>

 
</style>