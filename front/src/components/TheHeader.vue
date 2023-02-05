<template>
  <nav>
    <div class="name">
      <span class="nameSpan">IOANA COLCEAG</span>
    </div>
    <router-link class="btn-container" to="/"
      ><button>ARTICLES</button></router-link
    >
    <router-link class="btn-container" to="/comments"
      ><button v-if="isAdmin">ENGAGEMENT</button></router-link
    >
    <logout-button
      v-if="isAuthenticated"
      class="btn-container"
      @logout="logout"
    ></logout-button>

    <router-link class="btn-container" v-else to="/login"
      ><button>LOGIN</button></router-link
    >
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
    isAdmin() {
      return this.$store.getters.isAdmin;
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
  justify-content: center;
  background-color: #a6b1af;
  position: sticky;
  top: 0px;
  z-index: 100;
  height: 8rem;
  border-bottom: 0.2rem solid #2b470d;
}

.btn-container button {
  background-color: transparent;
  color: #fef9ff;
  border: none;
  cursor: pointer;
  font-size: 1.9rem;
  transition: all 0.2s;
  padding: 2rem;
  margin-top: 0.8rem;
}
.btn-container:hover {
  background-color: #2b470d;
}

.name {
  padding: 2rem;
  margin-top: 0.3rem;
  letter-spacing: 0.4rem;
  position: absolute;
  left: 4rem;
}

.nameSpan {
  background-color: transparent;
  color: #fef9ff;
  border: none;
  font-weight: bolder;
  font-size: 2.5rem;
  transition: all 0.2s;
  padding: 2rem;
  margin-top: 0.3rem;
  letter-spacing: 0.3rem;
}
</style>
