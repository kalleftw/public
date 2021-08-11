<template>
  <div class="home">
    <div>
      <div class="ui container" id="splash">
        <img src="/softworks-logo.svg" alt="Softworks" id="page-logo" />
        <img src="/softworks-mobile.svg" alt="Softworks" id="mobile-logo" />
      </div>

      <Search @search="onSearch" id="search" />

      <div class="ui hidden divider"></div>
    </div>

    <AdContainer :ads="ads" />
    <div class="ui hidden divider" id="search-divider"></div>

    <div id="information">
      <div v-if="loading" class="ui active centered inline loader"></div>
      <h3>{{ message }}</h3>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import AdContainer from "@/components/AdContainer.vue";
import Search from "@/components/Search.vue";
import router from '../router/index.js'

export default {
  name: "Home",
  components: {
    AdContainer,
    Search,
  },
  data() {
    return {
      ads: [],
      params: undefined,
      message: "",
      loading: false,
      currentOffset: 0,
      endOfSearch: false,
    };
  },
  methods: {
    async onSearch(params) {
      // If any number of ads were returned.
      this.endOfSearch = false;
      this.message = "";
      this.currentOffset = 0;
      this.params = params;
      this.ads = [];

      // Get ads.
      await this.fetchAds();
    },
    async handleScroll() {
      // If no more results, do nothing.
      if (this.endOfSearch) return;

      // Element to check for to trigger load.
      const divider = document.querySelector("#search-divider");

      // If window is at that element and not currently loading ads.
      if (
        divider.getBoundingClientRect().bottom <= window.innerHeight &&
        this.loading === false
      ) {
        await this.fetchAds();
      }
    },
    async fetchAds() {
      this.router = router

      try {
        if (this.params === undefined) {
          this.message = "You must specify at least one search parameter!";
          return;
        }

      // Indicate that is currently loading to prevent multiple calls.
      this.loading = true;

      // Could not use 'this' in axios request.
      const params = this.params;

      // Increase offset to get a new page of ads.
      params.offset = this.currentOffset++;

      // Request ads.
      
        const ads = (
          await axios.get(
            `${process.env.VUE_APP_BACKEND_ADDRESS}/endpoint_search`,
            {
              params
            }
          )
        ).data;

        if (ads.length > 0) {
          this.ads.push(...ads);
        } else {
          this.message = "No more ads to show.";
          this.endOfSearch = true;
        }

        // Free up state to allow further scrolling.
        this.loading = false;
      } catch (error) {
        this.$router.push('500')
      }
    }
  },
  mounted() {
    // Add handler / listener for pagination.
    window.addEventListener("scroll", this.handleScroll);
  },
  unmounted() {
    // Remove handler / listener for pagination.
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  letter-spacing: 1px;
}

#page-logo {
  width: 750px;
  max-width: 90%;
  height: 47vh;
  margin: 0px 0 50px 0;
}

#mobile-logo {
  display: none;
  width: 750px;
  max-width: 90%;
  margin: 50px 0 50px 0;
}

#information {
  margin: 30px 0 50px 0;
}

#splash {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

@media only screen and (max-width: 600px) {
  #mobile-logo {
    display: block;
  }

  #page-logo {
    display: none;
  }
}
</style>
