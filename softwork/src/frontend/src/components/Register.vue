<template>
  <div id="register" class="ui container">
    <div class="ui container">
      <img src="/softworks-register.svg" class="image" />
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
            type="text"
            name="email"
            placeholder="E-mail address"
          />
        </div>
      </div>

      <!-- Password -->
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

      <!-- Confirm Password -->
      <div class="field">
        <div class="ui left icon input">
          <i class="lock icon"></i>
          <input
            v-model="confirm"
            type="password"
            name="password"
            placeholder="Confirm Password"
            autocomplete="off"
          />
        </div>
      </div>

      <div v-if="access !== undefined">
        <div
          v-if="access[0] == 'success' && access[0].length !== 0"
          class="ui green message"
        >
          Account created successfully
        </div>
        <div
          v-if="access[0] !== 'success' && access[0] !== undefined"
          class="ui red message"
        >
          {{ access[0] }}
        </div>
      </div>
      <button
        @click.prevent
        @click="handleSubmit"
        class="ui fluid large blue submit button"
      >
        Register
      </button>

      <div class="ui error message"></div>
    </form>

    <div class="ui message">
      Already have an account? <router-link to="/Login">Login</router-link>
    </div>
  </div>
</template>

<script>
/**
 * @author Karl Ekberg
 */
import { ref, onMounted } from "vue";
import userData from "../composables/userData";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const username = ref(username);
    const password = ref(password);
    const confirm = ref(confirm);
    const access = ref("");

    const { redirect } = userData();
    redirect();

    const handleSubmit = async () => {
      if (password.value === confirm.value) {
        try {
          const { signup } = userData(username.value, password.value);
          access.value = await signup();

          if (access.value === undefined) {
            router.push("500");
          }

          if (access.value[0] === "success") {
            router.push({ path: "/Login" });
          }
        } catch {
          console.log();
        }
      } else {
        access.value = ["Passwords do not match"];
      }
    };

    username.value = "";
    password.value = "";
    confirm.value = "";

    return { password, username, confirm, handleSubmit, access, onMounted };
  },
};
</script>

<style scoped>
.ui.blue.button {
  background-color: #0d3b7a;
}

.ui.blue.button:hover {
  background-color: #1761c9;
}

#register {
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
  #register {
    display: block;
  }

  .image {
    width: 750px;
    max-width: 90%;
    margin: 50px 0 50px 0;
  }
}
</style>
