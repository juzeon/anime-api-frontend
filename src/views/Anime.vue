<template>
  <focus-area>

  </focus-area>
</template>

<script lang="ts">
import Vue from "vue"
import FocusArea from "@/components/FocusArea.vue"

export default Vue.extend({
  name: "Anime",
  components: {FocusArea},
  props: ['token']
})

</script>

<style scoped>

</style>
