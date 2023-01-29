<template>
  <nav>
    <button><router-link to="/">Posts</router-link></button> |
    <button v-if="isAuthenticated">
      <logout-button @logout="logout"></logout-button>
    </button>
    <button v-else>
      <router-link to="/login">Login</router-link>
    </button>
  </nav>
</template>

<script>
import LogoutButton from "./LogoutButton.vue";
export default {
  name: "TheHeader",
  data() {
    return {
      isLoggedIn: false,
    };
  },
  components: {
    LogoutButton,
  },
  computed: {
    isAuthenticated() {
      return this.isLoggedIn || this.$store.getters.token !== null;
    },
  },
  created() {
    this.isLoggedIn = this.$store.getters.isAuthenticated;
  },
  methods: {
    logout() {
      this.isLoggedIn = false;
      this.$store.dispatch("logout");
      this.$router.replace("/login");
    },
  },
};
</script>

<style scoped>
nav {
  display: flex;
  justify-content: right;
  gap: 1rem;
  padding: 1rem;
  background-color: #a6b1af;
  position: sticky;
  top: 0px;
  z-index: 100;
}

button {
  background-color: transparent;
  color: #fef9ff;
  border: none;
  font-size: larg;
  font-weight: bold;
  cursor: pointer;
}
</style>
