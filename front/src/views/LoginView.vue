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
  color: #2b470d;
  margin-bottom: 8rem;
  font-size: 2.2rem;
}
.group {
  position: relative;
  align-items: center;
  justify-content: center;
}

.input {
  font-size: 1.6rem;
  padding: 1rem 1rem 1rem 0.5rem;
  display: flex;
  width: 20rem;
  border: none;
  margin-left: auto;
  margin-right: auto;
  border-bottom: 0.1rem solid #fef9ff;
  background: transparent;
  color: #2b470d;
}

.input:focus {
  outline: none;
}

label {
  color: #fef9ff;
  font-size: 1.8rem;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 7rem;
  top: 1rem;
  transition: 0.2s ease all;
  -moz-transition: 0.2s ease all;
  -webkit-transition: 0.2s ease all;
}

.input:focus-within ~ label,
.input:valid label {
  top: -2rem;
  font-size: 1.6rem;
  color: #2b470d;
}

.input:-webkit-autofill,
.input:-webkit-autofill:hover,
.input:-webkit-autofill:focus {
  -webkit-text-fill-color: #2b470d;
  -webkit-box-shadow: 0 0 0rem 100rem #dbd8d7 inset;
}

.input:not(:focus-within) ~ label {
  top: -2rem;
  font-size: 1.6rem;
  color: #2b470d;
}

.bar {
  position: relative;
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 20rem;
  margin-bottom: 4rem;
  background-color: #fef9ff;
}

.bar:before,
.bar:after {
  content: "";
  height: 0.2rem;
  width: 0;
  bottom: 0.1rem;
  position: absolute;
  background: #2b470d;
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
  position: relative;
  height: 60%;
  width: 20rem;
  top: 25%;
  pointer-events: none;
  opacity: 0.5;
}

.input:focus ~ .highlight {
  animation: inputHighlighter 0.3s ease;
}

@keyframes inputHighlighter {
  from {
    background: #2b470d;
  }

  to {
    width: 0;
    background: transparent;
  }
}

button {
  position: relative;
  margin: auto;
  padding: 1rem 3rem;
  border: none;
  border-radius: 20rem;
  background: #fef9ff;
  transition: all 0.1s linear;
  box-shadow: 0 0.4rem 1rem rgba(0, 0, 0, 0.1);
  margin-top: 5rem;
  font-weight: bolder;
  outline: 0px solid #fef9ff;
}

button:active {
  transform: scale(0.95);
}

button span {
  color: #2b470d;
  font-family: "Sofia Sans";
  font-size: 1.5rem;
}

/* button .border {
  position: absolute;
  border: 0.15em solid #fef9ff;
  transition: all 0.3s 0.08s linear;
  top: 50%;
  left: 50%;
  width: 7em;
  height: 3em;
  transform: translate(-50%, -50%);
} */

button:hover {
  outline: 2px solid #fef9ff;
  outline-offset: 3px;
}

.main {
  overflow: hidden;
  background: #dbd8d7;
  margin: auto;
  padding: 4rem 3rem 3rem 3rem;
  border-radius: 1rem;
  position: absolute;
  width: 40rem;
  height: 50rem;
  box-shadow: 0.5rem 1rem 1rem #999;
  transform: translateX(-50%);
  left: 50%;
  margin-top: 5rem;
  opacity: 0.6;
}
.error {
  position: absolute;
  right: 4.8rem;
  top: -1.21rem;
  font-size: 1.2rem;
  color: rgb(215, 70, 70);
}

.errorLogin {
  position: absolute;
  font-size: 1.2rem;

  color: rgb(215, 70, 70);
}
</style>

<style>
body {
  background-image: url("C:/Users/ioana/Downloads/William (2).png");
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
body::before {
  opacity: 0.5;
}
</style>
