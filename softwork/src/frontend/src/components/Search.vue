<template>
  <div id="search" class="ui container">
    <form class="ui form" @submit.prevent="submitSearch">
      <!-- Freetext Search Field -->
      <div class="field">
        <input type="text" name="search" placeholder="Search..." v-model="searchString" autofocus>
      </div>

      <!-- Location Parameters -->
      <div class="two fields">
        <!-- Region Dropdown -->
        <div class="field">
          <select class="ui fluid dropdown" v-model="region" @change="clearMuni">
            <option disabled value="">Select Region</option>
            <option v-for="option in regions" :value="option.value" :key="option.value">{{option.name}}</option>
          </select>
        </div>

        <!-- Municipality Dropdown -->
        <div class="field">
          <select class="ui fluid dropdown" id="municipality" v-model="municipality">
            <option value="">Select Municipality</option>
            <option v-for="option in municipalities" :value="option.value" :key="option.value">{{option.name}}</option>
          </select>
        </div>
      </div>

      <!-- Remote Dropdown -->
      <div class="field">
        <select class="ui fluid dropdown" v-model="remote">
          <option disabled value="">Include Remote Work?</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>

      <div class="ui segment" id="checkbox">
        <div class="inline field">
          <div class="ui toggle checkbox">
            <input type="checkbox" v-model="proximity">
            <label>Include nearby municipalities after selection?</label>
          </div>
        </div>
      </div>

      <!-- Submit Button -->
      <button class="ui fluid large blue button" type="submit">Search</button>
    </form>
  </div>
</template>

<script>
import regioncodes from '/regioncodes.json'

/**
 * @author Elias Frigård
 */
export default {
  name: 'Search',
  data() {
    return {
      searchString: '',
      municipality: '',
      region: '',
      remote: '',
      proximity: false
    }
  },
  computed: {
    regions() {
      // Return regions from regionscodes.json.
      return regioncodes.map(e => e = {
        name: e.name,
        value: e.code,
      })
    },
    municipalities() {
      // Find the right region based on current selection.
      const region = regioncodes.find(r => r.code === this.region)

      if (region) {
        // Return the municipalities of that region.
        return region.municipalities.map(m => m = {
          name: m.name,
          value: m.code
        })
      } else {
        return []
      }
    }
  },
  methods: {
    clearMuni() {
      this.municipality = ''
    },
    async submitSearch() {
      let params = {}

      // Check if search parameters are empty.
      const emptyParams = this.searchString === '' && this.region === '' && this.municipality === ''
      
      if (emptyParams && this.remote === '') {
        params = undefined
      } else if ((emptyParams && this.remote === false) || (emptyParams && this.remote)) {
        params = undefined
      } else {
        params = {
            search: this.searchString,
            region: this.region,
            municipality: this.municipality,
            remote: this.remote,
          }

          // Delete region if municipality is selected.
          if (this.municipality !== '' && !this.proximity) {
            delete params.region
          }

          // Delete empty params.
          for (let prop in params) {
            // Check against these illegal properties.
            if (params[prop] === null || params[prop] === undefined || params[prop] === '') {
              delete params[prop]
            }
          }
      }

      // Emit event with search data.
      this.$emit('search', params)

      // Clear only free text field.
      this.searchString = ''
    }
  }
}
</script>

<style scoped>
  .ui.blue.button {
    background-color: #0D3B7A;
  }

  .ui.blue.button:hover {
    background-color: #1761c9;
  }
  
  #search {
    width: 750px;
  }

  .button {
    height: 45px;
  }

  #checkbox {
    display: flex;
  }
</style>
