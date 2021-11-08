<template>
  <div class="infoCard ml-6 mb-6 border-1 bg-black text-white relative " @mouseover="hover = true" @mouseout="hover = false">
    <a :href="urlMovie + props.id" target="_blank"><img loading="lazy" :src="urlImg + props.image" alt=""></a>
    <div v-if="hover" class="cardDetails absolute bottom-0 left-0 bg-black bg-opacity-80 p-6 ">
      <h1 class="text-sm font-bold mb-5">
        {{ props.title }}
      </h1>
      <h1 class="text-xs font-bold mb-5">
        {{ props.date }}
      </h1>
      <p class="text-xs mb-5">
        {{ props.description }}
      </p>
      <h1 class="text-xs">
        Rating:
        <span class="font-bold">
          {{ props.average }} </span>
      </h1>
      <a class="text-xs absolute bottom-6 right-10" :href="urlMovie + props.id" target="_blank">Details</a>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: ['props'],
  data () {
    return {
      urlImg: 'https://image.tmdb.org/t/p/original',
      urlMovie: 'https://www.themoviedb.org/movie/',
      data: this.props,
      hover: false
    }
  }
}
</script>

<style scoped>
img{
  width: 100%;
  height:400px;
}

.infoCard{
    width: 300px;
}

</style>
