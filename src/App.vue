<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script lang="js">
export default {
  name: 'App',
};
</script>

<style lang="scss">
  html, body {
    width: 100%;
    height: 100%;
    font-size: 12px;
    font-family: -apple-system,
    PingFang SC,Hiragino Sans GB,Arial,Microsoft YaHei,Helvetica Neue,sans-serif;
    text-rendering: optimizeLegibility;
    color: #333;
    background-color: #f4f5f5;
    #app {
      width: 100%;
      height: 100%;
    }
  }
</style>
