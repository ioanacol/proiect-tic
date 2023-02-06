<template>
  <main>
    <p v-if="error !== nul">{{ error }}</p>
    <h1>ARTICLES</h1>
    <div class="addpost">
      <router-link to="/add-post">
        <div v-if="isAdmin">
          <button class="btnAddPost">Write new article</button>
        </div>
      </router-link>
    </div>
    <div class="wrapper">
      <ol role="list">
        <li v-for="post in sortedArray" :key="post.id">
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
    sortedArray() {
      let allPosts = this.$store.getters.getPosts;
      allPosts = allPosts.sort((a, b) => {
        let fa = a.title,
          fb = b.title;
        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      });

      return allPosts;
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
  max-width: 70rem;
  margin: 0 auto;
}

h1 {
  color: #dcafa1;
  font-weight: bold;
  font-size: 6rem;
  margin: 2rem;
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
  box-shadow: 0.25rem 0.25rem 0.75rem rgb(0 0 0 / 0.1);
  justify-content: space-between;
}

li::before {
  counter-increment: list-item;
  content: counter(list-item);
  font-size: 5rem;
  font-weight: 700;
  width: 10rem;
  height: 10rem;
  background: #f8f7f7;
  flex: 0 0 auto;
  border-radius: 50%;
  color: #dcafa1;
  display: flex;
  justify-content: center;
  align-items: center;
}

li:nth-child(even) {
  flex-direction: row-reverse;
  background: #b8bcbb;
  margin-right: -4rem;
  margin-left: 4rem;
}

.text {
  font-family: "Sofia Sans";
  font-size: 3rem;
  font-weight: bold;
  text-decoration: none;
  color: white;
}
button {
  font-size: 1.4rem;
  position: relative;
  margin: auto;
  color: #dcafa1;
  padding: 2rem 3rem;
  background: #f8f7f7;
  box-shadow: 0 2rem 5rem rgba(0, 0, 0, 0.1);
  margin-top: 2rem;
  margin-bottom: 2rem;
  font-weight: bold;
  border-radius: 2.5rem;
  cursor: pointer;
  border: 0.2rem solid #f8f7f7;
}

.btnAddPost {
  font-size: 1.8rem;
  position: relative;
  margin: auto;
  color: #dcafa1;
  padding: 2rem 3rem;
  background: #f8f7f7;
  box-shadow: 0 2rem 5rem rgba(0, 0, 0, 0.1);
  margin-top: 2rem;
  margin-bottom: 2rem;
  font-weight: bold;
  border-radius: 2.5rem;
  cursor: pointer;
  border: 0.2rem solid #f8f7f7;
}
</style>
