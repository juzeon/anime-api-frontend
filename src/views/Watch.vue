<template>
  <focus-area>
    <p class="text-h6">
      {{ (this.animeDetail) ? '第' + (parseInt(this.episode) + 1) + '集 - ' + this.animeDetail.title : '观看影片' }}
      &nbsp;
      {{ '（' + ((this.watchInfo) ? this.watchInfo.format : '加载中') + '）' }}
    </p>
    <div v-show="this.watchInfo">
      <v-row>
        <v-col cols="10" offset="1">
          <NPlayer :set="setPlayer" :options="playerDefaultOptions"></NPlayer>
        </v-col>
      </v-row>
      <v-card class="mt-5">
        <p class="text-h6 ml-3 mt-3">添加弹幕</p>
        <search-bar class="mx-3" v-model="danmakuSearchInput" @search="getDanmakuSourceList"></search-bar>
        <v-list-item v-for="(danmakuSource,index) in danmakuSourceList" :key="'danmakuSource-'+index" two-line>
          <v-list-item-content>
            <v-list-item-title>{{ danmakuSource.title }}</v-list-item-title>
            <v-list-item-subtitle>
              {{ $helper.translateDanmakuEngine(danmakuSource.module) }}（含{{ danmakuSource.num }}集）
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <danmaku-insert-btn :title="danmakuSource.title" :url="danmakuSource.url"
                                @insertDanmaku="insertDanmaku"></danmaku-insert-btn>
          </v-list-item-action>
        </v-list-item>
      </v-card>
    </div>
    <v-sheet class="py-16"></v-sheet>
  </focus-area>
</template>

<script lang="ts">
import Vue from "vue"
import FocusArea from "../components/FocusArea.vue"
import {IAnimeDetail, IDanmakuEpisode, IDanmakuSource, IWatchInfo} from "@/types"
import {MetaInfo} from "vue-meta"
import {Player, PlayerOptions} from "nplayer"
import Hls from "hls.js"
import Danmaku from '@nplayer/danmaku'
import {BulletOption} from "@nplayer/danmaku/dist/src/ts/danmaku/bullet"
import SearchBar from "@/components/SearchBar.vue"
import DanmakuInsertBtn from "@/components/DanmakuInsertBtn.vue"

export default Vue.extend({
  name: "Watch",
  components: {DanmakuInsertBtn, SearchBar, FocusArea},
  props: ['token', 'playlist', 'episode'],
  metaInfo(): MetaInfo {
    return {
      title: (this.animeDetail) ? '第' + (parseInt(this.episode) + 1) + '集 - ' + this.animeDetail.title : '观看影片'
    }
  },
  computed: {
    routerProps(): string {
      return this.token + '-' + this.playlist + '-' + this.episode
    }
  },
  data() {
    return {
      watchInfo: undefined as IWatchInfo | undefined,
      animeDetail: undefined as IAnimeDetail | undefined,
      player: undefined as Player | undefined,
      playerDefaultOptions: {
        controls: [
          ['play', 'volume', 'time', 'spacer', 'airplay', 'danmaku-settings', 'settings', 'web-fullscreen', 'fullscreen'],
          ['progress']
        ],
        plugins: [
          new Danmaku({
            autoInsert: false,
          })
        ]
      } as PlayerOptions,
      danmakuSourceList: [] as IDanmakuSource[],
      danmakuList: [] as BulletOption[],
      danmakuSearchInput: ''
    }
  },
  watch: {
    routerProps: {
      immediate: true,
      handler() {
        this.initWatch()
      }
    }
  },
  deactivated() {
    this.$destroy()
  },
  methods: {
    setPlayer(player: Player) {
      this.player = player
    },
    initWatch() {
      this.animeDetail = undefined
      this.watchInfo = undefined
      this.$axios.get("anime/" + this.token).then(res => {
        this.animeDetail = res.data
        this.danmakuSearchInput = this.animeDetail?.title
        this.getDanmakuSourceList()
      })
      this.$axios.get('anime/' + this.token + '/' + this.playlist + '/' + this.episode).then(res => {
        this.watchInfo = res.data
        console.log('video type: ' + this.watchInfo?.format)
        if (this.watchInfo?.format === 'hls') {
          let hls = new Hls()
          hls.attachMedia(this.player.video)
          hls.on(Hls.Events.MEDIA_ATTACHED, () => {
            hls.loadSource(this.watchInfo?.proxy_url)
          })
        } else {
          this.player?.updateOptions({src: this.watchInfo?.proxy_url})
        }
      })
    },
    getDanmakuSourceList() {
      this.$axios.get('danmaku/search/' + encodeURI(this.danmakuSearchInput)).then(res => {
        this.danmakuSourceList = res.data
      })
    },
    insertDanmaku(danmakuList: BulletOption[]) {
      let oldDanmakuList = this.player!.danmaku.getItems()
      let newDanmakuList = [...oldDanmakuList, ...danmakuList].sort((a, b) => a.time - b.time)
      this.player?.danmaku.resetItems(newDanmakuList)
    }
  }
})
</script>

<style scoped>

</style>
