<template>
  <div id="app">
    <Header v-if="!$route.meta.head"></Header>
    <router-view/>
    <Footer v-if="!$route.meta.head"></Footer>
  </div>
</template>

<script>
import Header from './components/header.vue'
import Footer from './components/footer.vue'
export default {
  name: 'App',
  components: {Header, Footer}
}
</script>

<style lang="less">
  @import "./assets/main.css";
#app {

}
</style>
