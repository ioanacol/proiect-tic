<template>
  <button @click="logout" class="logout-button">LOGOUT</button>
</template>

<script>
export default {
  name: "LogoutButton",
  emits: ["logout"],

  methods: {
    logout() {
      this.$emit("logout");
    },
  },
};
</script>

<style scoped>
.logout-button {
  background-color: transparent;
  color: #fef9ff;
  border: none;
  cursor: pointer;
  font-size: 1.9rem;
  transition: all 0.2s;
  padding: 1rem;
}
</style>
