<template>
  <main id="app">
    <router-view ></router-view>
  </main>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
    };
  },
  components: {
  },
  created() {
    
  },
  mounted() {
  },
  computed: {
    
  },
  methods: {
   
  },
  // beforeDestroy 废弃，使用 beforeUnmount
  beforeUnmount() {},
};
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
//   unicode-bidi: bidi-override; 
}
html {
  width: 100%;
  height: 100%;
  overflow: hidden;
  // direction:rtl;
}
</style>
