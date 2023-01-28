<template>
  <div>
    <div class="page">
      <p class="postDate">Posted on {{ date }}</p>
      <h2>{{ title }}</h2>
      <p class="postAuthor">{{ author }}</p>
      <p class="post">{{ content }}</p>
      <p class="postComments">Comments:</p>
      <div class="commentSection">
        <ul>
          <li v-for="comment in comments" :key="comment">
            <p class="commentAuthor">Posted by {{ comment.author }}</p>
            <p class="commentDate">on {{ comment.date }}</p>
            <p class="comment">{{ comment.content }}</p>
          </li>
        </ul>
      </div>
    </div>
    <div>
      <button @click="handleEdit">Edit</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "PostDetail",
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      post: null,
    };
  },
  created() {
    this.getPost();
  },
  computed: {
    title() {
      return this?.post?.title || "";
    },
    date() {
      return this?.post?.date || "";
    },
    author() {
      return this?.post?.author || "";
    },
    content() {
      return this?.post?.content || "";
    },
    comments() {
      return this?.post?.comments || [];
    },
  },
  methods: {
    async getPost() {
      const post = await axios.get(
        `${process.env.VUE_APP_API_URL}/posts/${this.id}`
      );
      this.post = post?.data || {};
    },
    handleEdit() {
      this.$router.push("/posts/" + this.id + "/edit");
    },
  },
};
</script>

<style scoped>
.page {
  background-color: #d0c8c8;
  align-items: left;
  gap: 1rem;
  padding: 1.5rem;
  border-radius: 1rem;
  width: calc(100% - 3rem);
  box-shadow: 0.25rem 0.25rem 0.75rem rgb(0 0 0 / 0.1);
  text-align: left;
  margin-top: 3rem;
  opacity: 0.9;
}

h2 {
  color: #737554;
  font-weight: bold;
  font-size: 30px;
}
.post {
  font-family: "Sofia Sans";
  font-size: 20px;
  font-weight: bold;
  text-decoration: none;
  color: white;
}

.postDate {
  font-family: "Sofia Sans";
  font-size: 15px;
  font-weight: bold;
  text-decoration: none;
  color: #b67a70;
  text-align: right;
}
.postAuthor {
  font-family: "Sofia Sans";
  font-size: 20px;
  font-weight: bold;
  text-decoration: none;
  color: #8f926d;
  text-align: left;
}
.postComments {
  font-family: "Sofia Sans";
  font-size: 25px;
  font-weight: bold;
  text-decoration: none;
  color: #b67a70;
  text-align: left;
}

.comment {
  font-family: "Sofia Sans";
  font-size: 20px;
  font-weight: bold;
  text-decoration: none;
  color: white;
}

.commentDate {
  font-family: "Sofia Sans";
  font-size: 15px;
  font-weight: bold;
  text-decoration: none;
  color: #b67a70;
  text-align: left;
}
.commentAuthor {
  font-family: "Sofia Sans";
  font-size: 20px;
  font-weight: bold;
  text-decoration: none;
  color: #8f926d;
  text-align: left;
}

.commentSection {
  background-color: #dbd8d7;
  align-items: left;
  gap: 1rem;
  padding: 1.5rem;
  border-radius: 1rem;
  width: calc(100% - 3rem);
  box-shadow: 0.25rem 0.25rem 0.75rem rgb(0 0 0 / 0.1);
  text-align: left;
}

ul {
  list-style: none;
}
</style>
