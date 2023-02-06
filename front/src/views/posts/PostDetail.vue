<template>
  <div class="page">
    <div class="divButton">
      <div>
        <button v-if="isAdmin" class="btnEditPost" @click="handleEdit">
          EDIT
        </button>
      </div>
    </div>
    <p class="postDate">Posted on {{ date }}</p>
    <h2>{{ title }}</h2>
    <p class="postAuthor">IOANA COLCEAG</p>
    <p class="post">{{ content }}</p>
    <div class="comments-title-button">
      <span class="postComments">COMMENTS</span>
      <span class="addComment">
        <button v-if="isAuthenticated" @click="handleAddComment">
          Add Comment
        </button>
      </span>
    </div>
    <div class="separating-line"></div>
    <div class="commentSection">
      <ul>
        <li v-for="comment in comments" :key="comment">
          <div class="divButtonComment">
            <div v-if="isMe(comment.author)">
              <button
                class="insideComm"
                v-if="!getIsEditing(comment.id)"
                @click="handleEditComment(comment.id)"
              >
                Edit comment
              </button>
              <button
                class="insideComm"
                v-else
                @click="saveComment(comment.id)"
              >
                Save comment
              </button>
            </div>
            <div>
              <button
                class="insideComm"
                v-if="isMe(comment.author) || isAdmin"
                @click="handleDeleteComment(id, comment.id)"
              >
                Delete
              </button>
            </div>
          </div>
          <p class="commentAuthor">Posted by {{ comment.author }}</p>
          <p class="commentDate">on {{ comment.date }}</p>
          <p v-if="!getIsEditing(comment.id)" class="comment">
            {{ comment.content }}
          </p>
          <textarea
            v-else
            type="text"
            :value="comment.content"
            ref="inputComment"
          />
        </li>
      </ul>
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
      isEditing: "",
      inputComment: "",
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
    isAdmin() {
      return this.$store.getters.isAdmin;
    },
    isAuthenticated() {
      return this.isLoggedIn || this.$store.getters.token !== null;
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
    handleEditComment(id) {
      this.isEditing = id;
    },
    async saveComment(id) {
      const post = await axios.put(
        `${process.env.VUE_APP_API_URL}/admin/posts/${this.id}/comments/${id}`,
        { content: this.$refs.inputComment[0].value },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      this.post = post.data.data;
      this.isEditing = "";
    },
    getIsEditing(id) {
      return this.isEditing === id;
    },
    isMe(author) {
      return localStorage.getItem("username") === author;
    },
    async handleDeleteComment(postId, commentId) {
      this.error = null;
      try {
        await this.$store.dispatch("deleteComment", { postId, commentId });
        this.getPost();
      } catch (error) {
        this.error = error.message;
      }
    },
    handleAddComment() {
      this.$router.push("/add-comments/" + this.id);
    },
  },
};
</script>

<style scoped>
.page {
  background-color: #f8f7f760;
  align-items: left;
  gap: 1rem;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0.25rem 0.25rem 0.75rem rgb(0 0 0 / 0.1);
  text-align: left;
  margin-top: 3rem;
  margin-left: auto;
  margin-right: auto;
  opacity: 0.9;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

h2 {
  color: #737554;
  font-weight: bold;
  font-size: 3rem;
  text-align: left;
  overflow: hidden;
  margin-left: 1rem;
}

.comments-title-button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 3rem;
}

.postAuthor:after {
  content: "";
  display: block;
  width: 100%;
  height: 100%;
  margin-right: -100%;
  border-bottom: 0.1rem solid #737554;
  margin-top: 2rem;
}
.post {
  font-family: "Sofia Sans";
  font-size: 1.7rem;
  font-weight: bold;
  text-decoration: none;
  color: #2b470d;
  margin: 1rem;
  text-align: left;
  white-space: pre-wrap;
  overflow-wrap: break-word;
}

.postDate {
  font-family: "Sofia Sans";
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  color: #b67a70;
  text-align: right;
}
.postAuthor {
  font-family: "Sofia Sans";
  font-size: 2rem;
  font-weight: bold;
  text-decoration: none;
  color: #8f926d;
  text-align: left;
  margin: 1rem;
}
.postComments {
  font-family: "Sofia Sans";
  font-size: 2.5rem;
  font-weight: bold;
  text-decoration: none;
  color: #b67a70;
  text-align: left;
  margin: 1rem;
}

li {
  border-radius: 1rem;
  margin: 1rem;
  padding: 1rem;
  border-bottom: 0.1rem solid #946158;
}

.comment {
  font-family: "Sofia Sans";
  font-size: 1.7rem;
  font-weight: bold;
  text-decoration: none;
  color: #946158;
  text-align: left;
}

.commentDate {
  font-family: "Sofia Sans";
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  color: #b67a70;
  text-align: left;
}
.commentAuthor {
  font-family: "Sofia Sans";
  font-size: 2rem;
  font-weight: bold;
  text-decoration: none;
  color: #8f926d;
  text-align: left;
}

.commentSection {
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

.btnEditPost {
  position: relative;
  display: flex;
  justify-content: flex-end;
  font-size: 1.4rem;
  margin: auto;
  color: #946158;
  padding: 1em 2.5em 1em 2.5em;
  background: #f8f7f7;
  box-shadow: 0 0.4em 1em rgba(0, 0, 0, 0.1);
  font-weight: bold;
  border-radius: 2.5rem;
  border: 0.2rem solid #f8f7f7;
  align-items: right;
  margin: 0.5rem;
  background-color: transparent;
}
button {
  display: inline-block;
  justify-content: flex-end;
  font-size: 1.1rem;
  margin: auto;
  color: #946158;
  padding: 1em 2.5em 1em 2.5em;
  background-color: #f8f7f7;
  box-shadow: 0 0.4em 1em rgba(0, 0, 0, 0.1);
  font-weight: bold;
  border-radius: 2.5rem;
  border: 0.2rem solid #f8f7f7;
  align-items: left;
}

.separating-line {
  display: block;
  width: 100%;
  height: 0.1rem;
  background-color: #946158;
  margin-bottom: 2rem;
}

.insideComm {
  position: relative;
  display: flex;
  justify-content: flex-start;
  font-size: 0.9rem;
  margin: auto;
  color: #946158;
  padding: 1em 2.5em 1em 2.5em;
  background-color: #f8f7f7;
  box-shadow: 0 0.4em 1em rgba(0, 0, 0, 0.1);
  font-weight: bold;
  border-radius: 2.5rem;
  border: 0.2rem solid #f8f7f7;
  align-items: right;
  margin: 0.5rem;
}

.divButton {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.divButtonComment {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.addComment {
  display: flex;
  justify-content: flex-start;
  margin: 1rem;
}

textarea {
  margin-left: auto;
  margin-right: auto;
  font-size: 1.8rem;
  width: 100%;
  height: 10rem;
  resize: none;
  border: 0.2rem solid #b67a70;
  border-radius: 1rem;
  padding: 1rem;
  font-family: inherit;
  margin-bottom: 1rem;
  background-color: #f8f7f7;
  color: #946158;
  font-size: 1.4rem;
  text-align: left;
}

textarea:focus {
  outline: 0.1rem solid #737554;
}
</style>
