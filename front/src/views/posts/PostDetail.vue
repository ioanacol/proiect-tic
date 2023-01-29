<template>
  <div>
    <div class="page">
      <div class="divButton">
        <div>
          <button class="btnEditPost" @click="handleEdit">Edit post</button>
        </div>
      </div>
      <p class="postDate">Posted on {{ date }}</p>
      <h2>{{ title }}</h2>
      <p class="postAuthor">{{ author }}</p>
      <p class="post">{{ content }}</p>
      <p class="postComments">Comments:</p>
      <span class="addComment">
        <div class="addComment">
          <button class="btnAddComment">Add Comment</button>
        </div>
      </span>
      <div class="commentSection">
        <ul>
          <li v-for="comment in comments" :key="comment">
            <div class="divButtonComment">
              <div v-if="isMe(comment.author)">
                <button
                  v-if="!getIsEditing(comment.id)"
                  @click="handleEditComment(comment.id)"
                >
                  Edit comment
                </button>
                <button v-else @click="saveComment(comment.id)">
                  Save comment
                </button>
              </div>
            </div>
            <p class="commentAuthor">Posted by {{ comment.author }}</p>
            <p class="commentDate">on {{ comment.date }}</p>
            <p v-if="!getIsEditing(comment.id)" class="comment">
              {{ comment.content }}
            </p>
            <input
              v-else
              type="text"
              :value="comment.content"
              ref="inputComment"
            />
          </li>
        </ul>
      </div>
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
  box-shadow: 0.25rem 0.25rem 0.75rem rgb(0 0 0 / 0.1);
  text-align: left;
  margin-top: 3rem;
  margin-left: 3rem;
  margin-right: 3rem;
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
  margin: 1rem;
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
  margin: 1rem;
}
.postComments {
  font-family: "Sofia Sans";
  font-size: 25px;
  font-weight: bold;
  text-decoration: none;
  color: #b67a70;
  text-align: left;
  margin: 1rem;
}

li {
  border: 2px solid #b67a70;
  border-radius: 15px;
  margin: 1rem;
  padding: 1rem;
}

.comment {
  font-family: "Sofia Sans";
  font-size: 20px;
  font-weight: bold;
  text-decoration: none;
  color: #946158;
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

.btnEditPost {
  position: relative;
  display: flex;
  justify-content: flex-end;
  font-size: 12px;
  margin: auto;
  color: #dcafa1;
  padding: 1em 2.5em 1em 2.5em;
  background: #e0dcdb;
  box-shadow: 0 0.4em 1em rgba(0, 0, 0, 0.1);
  font-weight: bold;
  border-radius: 25px;
  border: 2px solid #e0dcdb;
  align-items: right;
  margin: 0.5rem;
}
.btnAddComment {
  font-size: 12px;
  margin: auto;
  color: #dcafa1;
  padding: 1em 2.5em 1em 2.5em;
  background: #e0dcdb;
  box-shadow: 0 0.4em 1em rgba(0, 0, 0, 0.1);
  font-weight: bold;
  border-radius: 25px;
  border: 2px solid #e0dcdb;
  align-items: right;
}
button {
  position: relative;
  display: flex;
  justify-content: flex-start;
  font-size: 9px;
  margin: auto;
  color: #dcafa1;
  padding: 1em 2.5em 1em 2.5em;
  background: #e0dcdb;
  box-shadow: 0 0.4em 1em rgba(0, 0, 0, 0.1);
  font-weight: bold;
  border-radius: 25px;
  border: 2px solid #e0dcdb;
  align-items: right;
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
</style>
