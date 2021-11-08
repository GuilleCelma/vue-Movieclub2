<template>
    <header >
        <nav class=" h-24 flex justify-between items-center shadow-lg w-full">
            <div class="logo flex items-center ml-13">
                <h2 class="text-5xl">Movieclub</h2>
            </div>
            <form action="">
            <input id="searchBar"  class="border-2 border-gray-300 bg-gray-100 h-10 mr-0  px-2  rounded-lg text-sm focus:outline-none" type="search" name="search" placeholder="Search.."/>
            <input id="search-btn" type="submit" value="🔍" class="cursor-pointer border-2 border-gray-300 bg-gray-100 h-10  px-3  rounded-lg text-sm focus:outline-none hover:bg-gray-300" >
            </form>
       
            <ul class="navigation flex mr-12 items-center" >
                <li><Nuxt-link class="no-underline font-bold mr-5 " to="/movies">Movies</Nuxt-link></li>
                <li><Nuxt-link class="no-underline font-bold mr-5" to="/people">People</Nuxt-link></li>
            </ul>
        </nav>
    </header>
</template>

<script setup lang="ts">

</script>

<style scope>
   
    #searchBar{
        width: 400px;
    }
    


</style>