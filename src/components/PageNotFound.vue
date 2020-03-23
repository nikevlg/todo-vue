<template>
  <div class="not-found">
    <h1>404</h1>
    <div>Страница не найдена</div>
    <router-link :to="{ name: 'TaskList'}" title="На главную">
     На главную
    </router-link>
  </div>
</template>

<script>

export default {
  data () {
    return {
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import 'src/assets/style/global';
.not-found{
  h1{
    font-size: 36px;
  }
  width: 200px;
  margin: 30% auto;
  text-align: center;
}
</style>
