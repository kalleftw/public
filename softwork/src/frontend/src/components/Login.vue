<template>
  <div id="login" class="ui container">
    <div class="ui container">
      <img src="/softworks-login.svg" class="image" />
    </div>

    <div class="ui hidden divider"></div>
    <div class="ui hidden divider"></div>
    <form class="ui form">
      <!-- Email -->
      <div class="field">
        <div class="ui left icon input">
          <i class="user icon"></i>
          <input
            v-model="username"
            type="email"
            name="email"
            placeholder="E-mail address"
            autofocus
          />
        </div>
      </div>
      <!-- Password  -->
      <div class="field">
        <div class="ui left icon input">
          <i class="lock icon"></i>
          <input
            v-model="password"
            type="password"
            name="password"
            placeholder="Password"
            autocomplete="off"
          />
        </div>
      </div>

            <div v-if="access !== undefined">

    
        <div v-if="access[0] == 'success'" class="ui green message">
          Successfully logged in
        </div>

    

         <div v-if="access[0] == 'Wrong credentials'" class="ui red message">
        {{ access[0] }}
      </div>
            </div>
     
      <button
        @click.prevent
        @click="handleSubmit"
        class="ui fluid large blue submit button"
      >
        Login
      </button>
      <div class="ui error message"></div>
    </form>
    <div class="ui message">
      New to us? <router-link to="/Register">Register</router-link>
    </div>
  </div>
</template>

<script>
/**
 * @author Karl Ekberg
 */
import { ref, inject } from "vue";
import userData from "../composables/userData";
import { useRouter } from "vue-router";

export default {
  setup() {
    const store = inject("store");

    const username = ref(username);
    const password = ref(password);
    const access = ref("");
    const router = useRouter();

    /**
     * Method which listens to submit,
     * Creates a reference to login-function in userData, sending username och password,
     * Creates an entry to localstorage
     * Redirects to home
     */

    const { redirect } = userData();
    redirect();

    const handleSubmit = async () => {
      const { login } = userData(username.value, password.value);
      access.value = await login();
      try {
        if (access.value === undefined) {
          router.push("500");
        }
        if (access.value[0] === "success") {
          store.methods.createEntry(access.value[1].user);
          router.push("/");
        } 
      } catch {
        console.log();
      }
    };

    username.value = "";
    password.value = "";

    return {
      password,
      username,
      handleSubmit,
      access,
      store,
      router,
    };
  },
};
</script>

<style>
.ui.blue.button {
  background-color: #0d3b7a;
}

#login {
  width: 750px;
  min-height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.image {
  max-width: 90%;
}

@media only screen and (max-width: 600px) {
  #login {
    display: block;
  }

  .image {
    width: 750px;
    max-width: 90%;
    margin: 50px 0 50px 0;
  }
}
</style>
