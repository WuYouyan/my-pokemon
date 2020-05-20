<template>
  <div>
      <h2 v-if="error.statusCode==404">404 page lost</h2>
      <h2 v-else>500 Server error </h2>
      <ul>
          <li><nuxt-link to="/">HOME</nuxt-link></li>
      </ul>
  </div>
</template>
 
<script>
export default {
  props:['error'],
}
</script>