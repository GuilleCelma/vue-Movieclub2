<template>
  <div class="w-72 ml-6 mb-6 border-1 bg-black text-white relative " @mouseover="hover = true" @mouseout="hover = false">
    <a :href="urlPerson + props.id" target="_blank"><img class='w-full h-96' loading="lazy" :src="urlImg + props.image" alt=""></a>
    <div v-if="hover" class="cardDetails absolute bottom-0 left-0 bg-black bg-opacity-80 p-6 ">
      <h1 class="text-sm font-bold mb-5">
        {{ props.name }}
      </h1>
      <h1 class="text-xs  mb-5">
        Job:
        <span class="font-bold">
          {{ props.job }} </span>
      </h1>
      
      <h1 class="text-xs">
        Rating:
        <span class="font-bold">
          {{ props.rating }} </span>
      </h1>
    </div>
  </div>
</template>

<script lang="ts">

export default {

  props: ['props'],
  data () {
    return {
      urlImg: 'https://image.tmdb.org/t/p/original',
      urlPerson: 'https://www.themoviedb.org/person/',
      data: this.props,
      hover: false
    }
  },
}
</script>

<style scoped>




</style>
