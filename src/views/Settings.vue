<template>
  <v-card class="mx-16 pa-6 mt-3">
    <p class="text-h3">设定</p>
    <v-row class="d-flex align-center justify-center mt-3">
      <div style="width: 60%">
        <v-text-field label="API地址" v-model="baseUrl" :rules="[validateBaseUrl]"></v-text-field>
        <v-btn block :disabled="!inputValid" @click="applySettings">更新</v-btn>
      </div>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import * as vuex from 'vuex'

export default Vue.extend({
  name: "Settings",
  data() {
    return {
      inputValid: false,
      baseUrl: this.$store.state.baseUrl
    }
  },
  methods: {
    applySettings() {
      this.$store.commit('setBaseUrl', this.baseUrl)
      this.$swal.success('设定已更新').then(() => {
        window.location.reload()
      })
    },
    validateBaseUrl() {
      if (!this.baseUrl.trim().length) {
        this.inputValid = false
        return '地址不可为空'
      }
      if (!this.isValidHttpUrl(this.baseUrl)) {
        this.inputValid = false
        return 'URL不合法'
      }
      if (!this.baseUrl.endsWith('/')) {
        this.inputValid = false
        return '地址需要以「/」结尾'
      }
      this.inputValid = true
      return true
    },
    isValidHttpUrl(string: string) {
      let url
      try {
        url = new URL(string)
      } catch (_) {
        return false
      }
      return url.protocol === "http:" || url.protocol === "https:"
    }
  }
})
</script>

<style scoped>

</style>
