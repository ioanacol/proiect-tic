<template>
  <div>
    <h1>Add Post</h1>
    <form @submit.prevent="submitForm">
      <div>
        <label for="title">Title</label>
        <input type="text" id="title" v-model.trim="title" />
        <p v-if="errors.title" class="error">{{ errors.title }}</p>
      </div>
      <div>
        <label for="content">Content</label>
        <textarea type="text" id="content" v-model.trim="content" />
        <p v-if="errors.content" class="error">{{ errors.content }}</p>
      </div>
      <div>
        <button type="submit">Add post</button>
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
        this.errors.title = "Title is required";
        valid = false;
      }
      if (this.content.trim().length === 0) {
        this.errors.content = "Content is required";
        valid = false;
      }
      return valid;
    },
  },
};
</script>

<style scoped></style>
