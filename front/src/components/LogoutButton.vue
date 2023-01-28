<template>
  <button @click="logout">Logout</button>
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
button {
  font-weight: bold;
}
</style>
