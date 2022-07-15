<template>
  <div class="share-network-list">
    <div class="grid grid-rows-2 grid-cols-1 md:grid-rows-1 md:grid-cols-2 justify-between items-center mb-5">
      <div class="flex items-center">
        <img class="back-nav" @click="$router.go(-1)" :src="`${publicPath}src/assets/imgs/SVG/next.svg`" alt="edit">
        <h3 class="font-black text-2xl ml-3">Share</h3>
      </div>
    </div>
    <div class="flex gap-x-10">
      <ShareNetwork
          v-for="network in networks"
          :network="network.network"
          :key="network.network"
          :url="sharing.url"
          :title="sharing.title"
          :description="sharing.description"
          :hashtags="sharing.hashtags"
          :twitterUser="sharing.twitterUser"
      >
        <img :src="`${publicPath}src/assets/imgs/SVG/${network.icon}`"/>
      </ShareNetwork>
    </div>
  </div>
</template>

<script setup>
const  publicPath = import.meta.env.BASE_URL
const sharing = {
      url: 'https://news.vuejs.org/issues/180',
      title: 'Welcome To Woble',
      description: 'Woble: Th world is your Bubble!',
      hashtags: 'woble',
      twitterUser: 'youyuxi'
}
const networks =  [
  { network: 'facebook', name: 'Facebook', icon: 'facebook.svg' },
  { network: 'linkedin', name: 'LinkedIn', icon: 'linkedin.svg' },
  { network: 'twitter', name: 'Twitter', icon: 'twitter.svg' },
]
</script>
