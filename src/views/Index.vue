<template>
  <hello-world />
</template>

<script lang="ts">
  import Vue from 'vue'
  import HelloWorld from '../components/HelloWorld.vue'

  export default Vue.extend({
    name: 'Index',

    components: {
      HelloWorld,
    },
  })
</script>
