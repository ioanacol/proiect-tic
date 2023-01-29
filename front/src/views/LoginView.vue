<template>
  <div class="main">
    <h1>WELCOME!</h1>
    <form @submit.prevent="login">
      <div class="group">
        <span v-if="emailError" class="error">{{ emailError }}</span>
        <input type="email" id="email" class="input" v-model.trim="email" />
        <span class="highlight"></span>
        <span class="bar"></span>
        <label for="email">Email</label>
      </div>
      <br />
      <div class="group">
        <span v-if="passwordError" class="error">{{ passwordError }}</span>
        <input
          type="password"
          id="password"
          class="input"
          v-model.trim="password"
        />

        <span class="highlight"></span>
        <span class="bar"></span>
        <label for="password">Password</label>
      </div>

      <div>
        <span v-if="loginError" class="errorLogin">{{ loginError }}</span>
        <button type="submit" class="full-rounded">
          <span>Login</span>
          <div class="border full-rounded"></div>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      password: "",
      error: {
        email: "",
        password: "",
        login: "",
      },
    };
  },
  computed: {
    emailError() {
      return this.error.email;
    },
    passwordError() {
      return this.error.password;
    },
    loginError() {
      return this.error.login;
    },
  },
  methods: {
    async fetchData(user) {
      const response = await axios.post(
        `${process.env.VUE_APP_API_URL}/login`,
        user
      );
      return response?.data || {};
    },
    async login() {
      this.error = {
        email: "",
        password: "",
        login: "",
      };
      if (!this.email) {
        this.error.email = "Email is required!";
        return;
      }
      if (!this.password) {
        this.error.password = "Password is required!";
        return;
      }
      const user = {
        email: this.email,
        password: this.password,
      };
      try {
        const response = await this.fetchData(user);
        const { idToken, email, expiresIn, localId, username } = response;
        if (idToken) {
          this.$store.dispatch("login", {
            email,
            expiresIn,
            idToken,
            localId,
            username,
          });
          this.$router.replace("/");
        } else {
          this.error.login = "Invalid token!";
        }
      } catch (error) {
        this.error.login = "Invalid email or password!";
      }
    },
  },
};
</script>

<style scoped>
form {
  text-align: center;
  justify-content: center;
}

h1 {
  color: #2a6366;
  margin-bottom: 4rem;
}
.group {
  position: relative;
  align-items: center;
  justify-content: center;
}

.input {
  font-size: 16px;
  padding: 10px 10px 10px 5px;
  display: flex;
  width: 200px;
  border: none;
  margin-left: auto;
  margin-right: auto;
  border-bottom: 1px solid #fef9ff;
  background: transparent;
  color: #2a6366;
}

.input:focus {
  outline: none;
}

label {
  color: #fef9ff;
  font-size: 18px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 4.8rem;
  top: 10px;
  transition: 0.2s ease all;
  -moz-transition: 0.2s ease all;
  -webkit-transition: 0.2s ease all;
}

.input:focus-within ~ label,
.input:valid label {
  top: -20px;
  font-size: 16px;
  color: #2a6366;
}

.input:-webkit-autofill,
.input:-webkit-autofill:hover,
.input:-webkit-autofill:focus {
  -webkit-text-fill-color: #2a6366;
  -webkit-box-shadow: 0 0 0px 1000px #dcd8d5 inset;
}

.input:not(:focus-within) ~ label {
  top: -20px;
  font-size: 16px;
  color: #2a6366;
}

.bar {
  position: relative;
  display: block;
  margin-left: 4.4rem;
  width: 200px;
  margin-bottom: 20px;
  background-color: #fef9ff;
}

.bar:before,
.bar:after {
  content: "";
  height: 2px;
  width: 0;
  bottom: 1px;
  position: absolute;
  background: #2a6366;
  transition: width 1s ease all;
  -moz-transition: 0.2s ease all;
  -webkit-transition: 0.2s ease all;
}

.bar:before {
  left: 50%;
}

.bar:after {
  right: 50%;
}

.input:focus ~ .bar:before,
.input:focus ~ .bar:after {
  width: 50%;
}

.highlight {
  position: absolute;
  height: 60%;
  width: 200px;
  top: 25%;
  left: 4.8rem;
  pointer-events: none;
  opacity: 0.5;
}

.input:focus ~ .highlight {
  animation: inputHighlighter 0.3s ease;
}

@keyframes inputHighlighter {
  from {
    background: #2a6366;
  }

  to {
    width: 0;
    background: transparent;
  }
}

button {
  font-size: 18px;
  position: relative;
  margin: auto;
  padding: 1em 2.5em 1em 2.5em;
  border: none;
  background: #fef9ff;
  transition: all 0.1s linear;
  box-shadow: 0 0.4em 1em rgba(0, 0, 0, 0.1);
  margin-top: 5rem;
  font-weight: bolder;
}

button:active {
  transform: scale(0.95);
}

button span {
  color: #2a6366;
  font-family: "Sofia Sans";
}

button .border {
  position: absolute;
  border: 0.15em solid #fef9ff;
  transition: all 0.3s 0.08s linear;
  top: 50%;
  left: 50%;
  width: 7em;
  height: 3em;
  transform: translate(-50%, -50%);
}

button:hover .border {
  display: block;
  width: 8.1em;
  height: 3.7em;
}

.full-rounded {
  border-radius: 2em;
}

.main {
  overflow: hidden;
  background-color: #dcd8d5;
  margin: auto;
  padding: 40px 30px 30px 30px;
  border-radius: 10px;
  position: absolute;
  width: 400px;
  height: 500px;
  box-shadow: 5px 10px 10px #999;
  transform: translateX(-50%);
  left: 50%;
  margin-top: 5rem;
  opacity: 0.7;
}
.error {
  position: absolute;
  right: 4.8rem;
  top: -1.21rem;
  font-size: 12px;
  color: rgb(215, 70, 70);
}

.errorLogin {
  position: absolute;
  font-size: 12px;

  color: rgb(215, 70, 70);
}
</style>

<style>
body {
  background-image: url("C:/Users/ioana/Downloads/William.png");
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: #f2dfd7;
}
</style>
