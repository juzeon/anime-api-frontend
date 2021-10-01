<template>
  <div class="d-flex justify-center align-center" style="width: 98%;height: 98%;">
    <v-card width="800" height="400" elevation="3" class="d-flex align-center">
      <v-row>
        <v-col cols="12" class="d-flex justify-center">
          <v-img src="https://anime-api.readthedocs.io/zh_CN/latest/_static/logo.ico" max-width="100"></v-img>
        </v-col>
        <v-col cols="12" class="d-flex justify-center">
          <p class="text-h4">Anime</p>
        </v-col>
        <v-col cols="10" offset="1" class="mt-6">
          <search-bar v-model="searchText" @search="navigateToSearch"></search-bar>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import SearchBar from "@/components/SearchBar.vue"
import * as vuex from 'vuex'

export default Vue.extend({
  name: 'Index',
  components: {SearchBar},
  metaInfo: {
    title: '主页'
  },
  computed: {
    searchText: {
      set(value: string) {
        this.$store.commit('setSearchText', value)
      },
      get() {
        return this.$store.state.searchText
      }
    }
  },
  data() {
    return {}
  },
  methods: {
    navigateToSearch() {
      this.$router.push({name: 'Search', params: {searchTextPassed: this.searchText}})
    }
  }
})
</script>
