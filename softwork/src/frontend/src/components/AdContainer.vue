<template>
  <div id="ad" class="ui-container">
    <!-- Looping out all ads in prop array. -->
    <Ad v-for="ad in computedAds" 
      :key="ad.url" 
      :title="ad.title" 
      :logoURL="ad.logoURL" 
      :remote="ad.remote" 
      :source="ad.source" 
      :description="ad.description" 
      :company="ad.company"
      :location="ad.location"
      :url="ad.url"
      :favorite="false"
    />
  </div>
</template>

<script>
/**
 * @author Elias Frigård
 */
import Ad from './Ad.vue'

export default {
  name: 'AdContainer',
  props: {
    ads: Array
  },
  components: {
    Ad,
  },
  computed: {
    computedAds() {
      const ads = this.ads

      ads.forEach(ad => ad.remote = (ad.remote === 'true'))

      return ads
    }
  }
}
</script>

<style scoped>
  #ad {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
