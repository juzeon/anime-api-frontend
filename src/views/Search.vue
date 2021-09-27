<template>
  <focus-area class="mt-4">
    <v-card>
      <v-row>
        <v-col cols="12">
          <p class="text-h5 ml-3">搜寻「{{ realSearchText }}」的结果</p>
        </v-col>
        <v-col cols="10" offset="1" class="">
          <search-bar v-model="inputText" @search="applySearchText"></search-bar>
        </v-col>
      </v-row>
    </v-card>
  </focus-area>
</template>

<script lang="ts">
import Vue from "vue"
import {MetaInfo} from "vue-meta"
import SearchBar from "@/components/SearchBar.vue"
import FocusArea from "@/components/FocusArea.vue"

export default Vue.extend({
  name: "Search",
  components: {FocusArea, SearchBar},
  props: ['searchTextPassed'],
  metaInfo(): MetaInfo {
    return {
      title: this.realSearchText
    }
  },
  watch: {
    searchTextPassed: {
      handler() {
        this.inputText = this.searchTextPassed
        this.realSearchText = this.searchTextPassed
        this.startSearch()
      },
      immediate: true
    }
  },
  data() {
    return {
      inputText: this.searchTextPassed,
      realSearchText: ''
    }
  },
  methods: {
    applySearchText() {
      this.realSearchText = this.inputText
      this.startSearch()
    },
    startSearch() {
      console.log('start searching by ' + this.realSearchText)
    }
  }
})
</script>

<style scoped>

</style>
