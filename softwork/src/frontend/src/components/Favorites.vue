<template>
  <div v-if="!noAds" id="content">
    <Ad
      @remove="onRemove"
      v-for="ad in computedAds"
      :key="ad.url"
      :title="ad.title"
      :logoURL="ad.logoURL"
      :remote="ad.remote"
      :source="ad.source"
      :description="ad.description"
      :company="ad.company"
      :location="ad.location"
      :url="ad.url"
      :favorite="true"
    />
  </div>
  <div v-else id="error-container">
    <img src="/no-ads-logo.svg" alt="Softworks" id="error-logo">
  </div>
</template>

<script>
import axios from "axios";
import Ad from "./Ad.vue";
import { inject } from 'vue'
import { useRouter } from "vue-router";

/**
 * @author Karl Ekberg
 */
export default {
  components: {
    Ad,
  },
  data() {
    return {
      ads: [],
      noAds: false
    }
  },
  computed: {
    computedAds() {
      const ads = this.ads

      ads.forEach(ad => ad.remote = (ad.remote === 'true'))

      return ads
    }
  },
  methods: {
    onRemove(url) {
      this.ads = this.ads.filter((ad) => ad.url !== url);
    },
  },
  /**
   * Getting favourites from backend
   */
  async mounted() {
    const router = useRouter()
    const store = inject('store')

    try {
      this.ads = (
        await axios.get(
          `${process.env.VUE_APP_BACKEND_ADDRESS}/endpoint_viewfav`,
          {
            withCredentials: true,
          }
        )
      ).data

      // Print out error if no ads.
      if (this.ads.length <= 0) {
        this.noAds = true
      }

    } catch (error) {
      if (!store.state.userEmail) {
        router.push({
          path: "404"
        })
    } else {
        router.push({
          path: "500"
        })
      }
    }
  },
};
</script>

<style scoped>
#content {
  margin-top: 30px;
}

  #error-container {
  width: 750px;
  min-height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#error-logo {
  max-width: 90%;
}

  @media only screen and (max-width: 600px) {
    #error-container {
      display: block;
    }
    
    #error-logo {
      width: 750px;
      max-width: 90%;
      margin: 50px 0 50px 0;
    }
  }
</style>
