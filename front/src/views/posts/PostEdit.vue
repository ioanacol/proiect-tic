<template>
  <div>
    <p>Edit post</p>
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
        <button type="submit">Save</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "PostEdit",
  props: {
    id: {
      type: String,
      required: true,
    },
  },
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
  created() {
    this.getPost();
  },
  methods: {
    async getPost() {
      const post = await axios.get(
        `${process.env.VUE_APP_API_URL}/posts/${this.id}`
      );
      const { title, content } = post.data || {};
      this.title = title;
      this.content = content;
    },
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
      await axios.put(
        `${process.env.VUE_APP_API_URL}/admin/posts/${this.id}`,
        post,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      this.$router.push(`/posts/${this.id}`);
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

<style scoped>
.error {
  color: red;
}
</style>
