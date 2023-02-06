<template>
  <the-header
    ><nav>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/login">Login</router-link>
      <router-link to="/comments">Engagement</router-link>
    </nav></the-header
  >
  <router-view />
</template>

<script>
export default {};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Sofia+Sans:wght@400;500;700&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-size: 62.5%;
  font-family: "Sofia Sans", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

nav a {
  color: #fef9ff;
  text-decoration: none;
}

nav a.router-link-exact-active {
  color: #2b470d;
  text-decoration: underline;
}

/* Tablet */
@media only screen and (max-width: 1200px) {
  html {
    font-size: 62.5%;
  }
  .form {
    width: 90%;
  }
  .page {
    width: 90%;
  }
  textarea {
    width: 90%;
  }
  .name {
    display: none;
  }
  .nameSpan {
    display: none;
  }
  li {
    width: calc(100% - 2rem);
  }
}

/* Mobile */
@media only screen and (max-width: 600px) {
  html {
    font-size: 50%;
  }
  .form {
    width: 90%;
  }
  .page {
    width: 90%;
  }
  textarea {
    width: 90%;
  }
  .name {
    display: none;
  }
  .nameSpan {
    display: none;
  }
  li {
    width: calc(100% - 2rem);
  }
}

/* Desktop */
@media (min-width: 1200px) {
  html {
    font-size: 75%;
  }
  .form {
    width: 50%;
  }
  .page {
    width: 50%;
  }
  textarea {
    width: 80%;
  }
  li {
    width: calc(100% - 2rem);
  }
}
</style>
