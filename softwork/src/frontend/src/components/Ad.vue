<template>
  <div id="add" class="ui items">
    <div class="item">
      <!-- Logo Image -->
      <div class="image">
        <img alt="Job Image" id="image" :src="imageURL || '/dev-logo.svg'" :onerror="loadError" />
      </div>

      <!-- Content Container -->
      <div id="content" class="content">
        <!-- Ad Title -->
        <h2 class="ui header">{{ title }}</h2>

        <!-- Top Meta -->
        <div class="meta" id="labels">
          <!-- Company Label -->
          <div class="ui label">
            {{ company }}
          </div>

          <!-- Location Label -->
          <div class="ui label" v-if="!remote">
            {{ location.municipality }}, {{ location.region }}
            <i id="flag" :class="computedFlag"></i>
          </div>
        </div>

        <!-- Description Container -->
        <div class="description" id="desc">
          <p>{{ computedDesc }}</p>
        </div>

        <!-- Bottom Meta -->
        <div id="meta" class="extra">
          <!-- Read More -->
          <div class="ui primary button" @click="redirectToAd">
            Read More
            <i class="right chevron icon"></i>
          </div>

          <!-- Favorite -->
          <div v-if="user" id="fav-btns">
            <div v-if="!isFavorite" class="ui green button" @click="toggleFavorite">Add Favorite</div>
            <div v-else class="ui red button" @click="toggleFavorite">Remove Favorite</div>
          </div>

          <!-- Additional Meta Tags -->
          <div class="ui label" v-if="remote">Remote Work</div>
          <div class="ui label" v-if="source">{{ source }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { inject } from "vue";
/**
 * @author Elias Frigård
 */
export default {
  name: "Ad",
  props: {
    title: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    location: {
      type: Object,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    remote: Boolean,
    type: String,
    logoURL: String,
    favorite: Boolean,
    source: String
  },

  data() {
    return {
      isFavorite: this.favorite,
      user: this.user,
      imageURL: ''
    }
  },

  computed: {
    // Cut description to size if it is too long.
    computedDesc() {
      const maxlength = 300;

      // Cut length if too long.
      if (this.description.length > maxlength) {
        return this.description.substring(0, maxlength - 1) + "...";
      }

      // Return original if length is ok.
      return this.description;
    },
    computedFlag() {
      // Sets the correct class identifier for Semantic UI flags.
      // return this.location.country + " flag"
      return 'se flag'
    },
  },

  mounted() {
    const store = inject("store");
    this.user = store.state.userEmail

    this.imageURL = this.logoURL
  },
  methods: {
    loadError() { 
      // Set image to default logo if it could not be loaded.
      this.imageURL = '/dev-logo.svg'
    },
    redirectToAd() {
      // Open ad URL in new tab.
      window.open(this.url, "_blank")
    },
    toggleFavorite() {
      // Build method for setting favorites here.
      if (this.isFavorite === true) {
        this.removeFavourite();
      } else {
        this.createFavourite();
      }

      this.isFavorite = !this.isFavorite;
    },

    /**
     * @author Karl Ekberg
     * Function that creates an ad to save, sends to backend ...
     * Should these be moves?
     */
    async createFavourite() {
      const ad = {
        title: this.title,
        company: this.company,
        location: this.location,
        description: this.description,
        url: this.url,
        remote: this.remote,
        source: this.source,
        logoURL: this.logoURL,
        user: this.user,
      };
      try {
        await axios.post(`${process.env.VUE_APP_BACKEND_ADDRESS}/endpoint_addfav`, {
          ad,
        },
        {
          withCredentials: true,
        })
      } catch (error) {
        console.log();
      }
    },
    /**
     * @author Karl Ekberg
     * Function that removes ad from favourites ...
     */
    async removeFavourite() {
      try {
        this.$emit('remove', this.url)

        await axios.post(`${process.env.VUE_APP_BACKEND_ADDRESS}/endpoint_removefav`, {
          user: this.user,
          url: this.url,
        },
        {
          withCredentials: true,
        })
      } catch (error) {
        console.log();
      }
    },
  },
};
</script>

<style scoped>
  .ourYellow {
    color: #F1843F !important;
  }
  .ui .label {
    background-color: #ffffff;
  }

  .ui.primary.button {
    background-color: #0D3B7A;
  }

  .ui.green.button {
    background-color: #226CCA;
  }
  
  .ui.red.button {
    background-color: #F1843F;
  }

#add {
  max-width: 750px;
  text-align: left;
  padding: 20px;
  border-radius: 7px;
  border: 1px solid #EDEDED;
  background-color: #ededed;

  -webkit-box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.1);
  box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.1);
}

#image {
  height: 100%;
  width: 100%;
  object-fit: contain;
  border-radius: 7px;
  margin-right: 100px;
}

#flag {
  margin-left: 5px;
}

#fav-btns {
  display: inline;
}

  @media only screen and (max-width: 767px) {
    #image {
      padding: 30px;
      margin: 0;
    }

    #meta {
      margin-top: 20px;
    }

    #add {
      padding-top: 0px;
      padding-bottom: 0px;
    }

    #labels {
      margin: 20px 0 20px 0;
    }
  }
</style>
