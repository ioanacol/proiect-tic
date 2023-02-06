<template>
  <div>
    <h1>WRITE NEW ARTICLE</h1>
    <form @submit.prevent="submitForm" class="form">
      <div class="title">
        <label for="title">Title</label>
        <input type="text" id="title" v-model.trim="title" />
        <p v-if="errors.title" class="error">{{ errors.title }}</p>
      </div>
      <div class="content">
        <label for="content">Content</label>
        <textarea type="text" id="content" v-model.trim="content" />
        <p v-if="errors.content" class="error">{{ errors.content }}</p>
      </div>
      <div>
        <button type="submit">Post</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "AddPostView",
  data() {
    return {
      title: "",
      content: "",
      errors: {
        title: "",
        content: "",
      },
    };
  },
  methods: {
    async submitForm() {
      this.resetErrors();
      const valid = this.validateForm();
      if (!valid) {
        return;
      }
      const post = {
        title: this.title,
        content: this.content,
      };
      await axios.post(`${process.env.VUE_APP_API_URL}/admin/posts`, post, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      this.$router.push(`/`);
    },
    resetErrors() {
      this.errors = {
        title: "",
        content: "",
      };
    },
    validateForm() {
      let valid = true;
      if (this.title.trim().length === 0) {
        this.errors.title = "Title is required!";
        valid = false;
      }
      if (this.content.trim().length === 0) {
        this.errors.content = "Content is required!";
        valid = false;
      }
      return valid;
    },
  },
};
</script>

<style scoped>
h1 {
  color: #dcafa1;
  font-weight: bold;
  font-size: 4rem;
  margin-top: 2rem;
}
.form {
  background-color: transparent;
  align-items: left;
  gap: 1rem;
  width: 50%;
  padding: 1.5rem;
  border-radius: 1rem;
  text-align: left;
  margin-top: 3rem;
  margin-left: auto;
  margin-right: auto;
  opacity: 0.9;
}

button {
  position: relative;
  display: flex;
  justify-content: flex-start;
  font-size: 1.3rem;
  margin: auto;
  color: #946158;
  padding: 1rem 4rem;
  background: #f8f7f7;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.189);
  font-weight: bold;
  border-radius: 2.5rem;
  border: 0.2rem solid #f8f7f7;
  align-items: right;
  cursor: pointer;
}

label {
  color: #737554;
  font-size: 3rem;
  position: relative;
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}

.title {
  font-size: 2rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 50%;
  margin-left: auto;
  margin-right: auto;
}

.title input {
  font-family: "Sofia Sans";
  border: none;
  border-radius: 1rem;
  padding: 0.5rem;
  margin-bottom: 1rem;
  background-color: #f8f7f7;
  box-shadow: 0rem 0rem 2rem rgba(153, 153, 153, 0.655);
  color: #946158;
}

.title input:focus {
  outline: 0.3rem solid #737554;
}

.content {
  font-size: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

textarea {
  margin-left: auto;
  margin-right: auto;
  height: 50rem;
  resize: none;
  border: none;
  border-radius: 1rem;
  padding: 1rem;
  font-family: inherit;
  margin-bottom: 1rem;
  background-color: #f8f7f7;
  box-shadow: 0rem 0rem 2rem rgba(153, 153, 153, 0.655);
  color: #946158;
  text-align: left;
}

textarea:focus {
  outline: 0.3rem solid #737554;
}
.error {
  display: flex;
  justify-content: center;
  font-size: 1.5rem;
  margin: 1.5rem;
  font-weight: bold;
  color: rgb(215, 70, 70);
}
</style>
