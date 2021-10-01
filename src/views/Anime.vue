<template>
  <focus-area>
    <v-progress-linear indeterminate v-show="!animeDetail"></v-progress-linear>
    <div v-if="animeDetail">
      <anime-item :description="animeDetail.description" :category="animeDetail.category"
                  :cover="animeDetail.cover_url" :engine="animeDetail.module"
                  :title="animeDetail.title" :disable-hover="true"></anime-item>
      <v-divider></v-divider>
      <v-card class="mt-5" elevation="0" v-for="(playList,index) in animeDetail.play_lists" :key="'playlist-'+index">
        <p class="text-h6">{{ playList.name }}</p>
        <v-chip class="ml-2 mt-2" color="green" outlined v-for="(videoList,jndex) in playList.video_list"
                :key="'videolist-'+index+'-'+jndex" @click="navigateToWatch(videoList)">{{ videoList.name }}
        </v-chip>
      </v-card>
    </div>
  </focus-area>
</template>

<script lang="ts">
import Vue from "vue"
import FocusArea from "@/components/FocusArea.vue"
import {IAnimeDetail, IVideoListOfAnimeDetail} from "@/types"
import AnimeItem from "@/components/AnimeItem.vue"
import {MetaInfo} from "vue-meta"

export default Vue.extend({
  name: "Anime",
  components: {AnimeItem, FocusArea},
  props: ['token'],
  metaInfo(): MetaInfo {
    return {
      title: this.animeDetail?.title || '动画详情'
    }
  },
  data() {
    return {
      animeDetail: undefined as IAnimeDetail | undefined
    }
  },
  watch: {
    token: {
      immediate: true,
      handler() {
        this.getAnimeDetail()
      }
    }
  },
  methods: {
    navigateToWatch(videoList: IVideoListOfAnimeDetail) {
      let videoExploded = this.$helper.getVideoExplodedFromUrl(videoList.info)
      this.$router.push({
        name: 'Watch',
        params: {token: videoExploded.token, playlist: videoExploded.playlist + '', episode: videoExploded.episode + ''}
      })
    },
    getAnimeDetail() {
      this.animeDetail = undefined
      this.$axios.get("anime/" + this.token).then(res => {
        this.animeDetail = res.data
        this.animeDetail!.cover_url = this.animeDetail!.cover_url.replace('http:http', 'http')
      }).catch(err => {
        this.$router.go(-1)
      })
    }
  }
})

</script>

<style scoped>

</style>
