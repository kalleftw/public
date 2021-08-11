<template>
  <div id="app" class="ui container">
    <div class="ui secondary menu container" id="menu">
      <router-link to="/">
        <a class="ui item">Softwork</a>
      </router-link>
      <div v-if="store.state.userEmail">
      <router-link to="/Favorites">
        <a class="ui item">Favorites</a>
      </router-link>
      </div>
      <div v-if="!store.state.userEmail" class="right menu">
        <router-link to="/Login">
          <a class="ui item">Login</a>
        </router-link>
        <router-link to="/Register">
          <a class="ui item">Register</a>
        </router-link>
      </div>
      <div v-else class="right menu">
       <Logout class="ui item"/>
      </div>
    </div>
    <hr />
    <router-view />
  </div>
</template>

<script>
import store from "@/store";
import Logout from "@/components/Logout";
import { provide } from "vue";

export default {
  components: {
    Logout,
  },

  setup() {
    provide("store", store);

    return { store };
  },
  mounted() {
    store.methods.checkLocalStorage();
  },
}
</script>

<style>
* {
  font-family: "Poppins", sans-serif;
  font-size: 14px;
  letter-spacing: 0.8px;
}


#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin: auto;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  align-items: center;
}

#menu {
  height: 70px;
  padding: 30px 0 0 0;
}

a {
  font-size: 15px;
  letter-spacing: 1.5px;
  height: 40px;
  font-weight: bold;
}

hr {
  opacity: 0.2;
  width: 100%;
}
</style>
