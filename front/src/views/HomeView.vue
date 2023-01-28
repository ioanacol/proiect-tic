<template>
  <main>
    <p v-if="error !== nul">{{ error }}</p>
    <h1>POSTS</h1>
    <div class="addpost">
      <router-link to="/add-post">
        <button>Add post</button>
      </router-link>
    </div>
    <div class="wrapper">
      <ol role="list">
        <li v-for="post in posts" :key="post.id">
          <div>
            <router-link class="text" :to="'/posts/' + post.id">
              {{ post.title }} {{ posts.date }}
            </router-link>
          </div>
          <div v-if="isAdmin">
            <button @click="handleDelete(post.id)">Delete</button>
          </div>
        </li>
      </ol>
    </div>
  </main>
</template>

<script>
export default {
  name: "PostsView",
  created() {
    this.error = null;
    this.loadPosts();
  },
  data() {
    return {
      error: null,
    };
  },
  computed: {
    posts() {
      console.log(this.$store.getters.getPosts);
      return this.$store.getters.getPosts;
    },

    isAdmin() {
      return this.$store.getters.isAdmin;
    },
  },
  methods: {
    async loadPosts() {
      await this.$store.dispatch("loadPosts");
    },
    async handleDelete(postId) {
      this.error = null;
      try {
        await this.$store.dispatch("deletePost", postId);
      } catch (error) {
        this.error = error.message;
      }
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Sofia+Sans:wght@400;500;700&display=swap");
.wrapper {
  max-width: 600px;
  margin: 0 auto;
}

h1 {
  color: #dcafa1;
  font-weight: bold;
  font-size: 70px;
}

ol {
  list-style: none;
  padding: 0;
}

li + li {
  margin-top: 1rem;
}

li {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: #d9c3c6;
  padding: 1.5rem;
  border-radius: 1rem;
  width: calc(100% - 2rem);
  box-shadow: 0.25rem 0.25rem 0.75rem rgb(0 0 0 / 0.1);
}

li::before {
  counter-increment: list-item;
  content: counter(list-item);
  font-size: 3rem;
  font-weight: 700;
  width: 2em;
  height: 2em;
  background: #e0dcdb;
  flex: 0 0 auto;
  border-radius: 50%;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}

li:nth-child(even) {
  flex-direction: row-reverse;
  background: #bcb4a3;
  margin-right: -2rem;
  margin-left: 2rem;
}

.text {
  font-family: "Sofia Sans";
  font-size: 30px;
  font-weight: bold;
  text-decoration: none;
  color: white;
}
</style>
