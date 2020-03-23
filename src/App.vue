<template>
  <div id="app">
    <main class="content">
      <router-view/>
    </main>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
  @import 'src/assets/style/global';
  @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
  #app {
    .content {
      width: 100%;
      max-width: 980px;
      height: 100vh;
      margin: auto;
      padding-top: 16px;
      overflow-y: auto;
    }
  }
</style>
