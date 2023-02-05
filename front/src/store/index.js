import axios from "axios";
import { createStore } from "vuex";

let timer;

export default createStore({
  state: {
    email: null,
    token: null,
    userId: null,
    posts: [],
  },
  getters: {
    email(state) {
      return state.email;
    },
    token(state) {
      return state.token;
    },
    userId(state) {
      return state.userId;
    },
    isAuthenticated(state) {
      return state.token !== null || localStorage.getItem("token") !== null;
    },
    getPosts(state) {
      return state.posts;
    },
    getComments(state) {
      return state.comments;
    },
    isAdmin(state) {
      return (
        state.email === "ioana@email.com" ||
        localStorage.getItem("email") === "ioana@email.com"
      );
    },
  },
  mutations: {
    setUser(state, payload) {
      state.email = payload.email;
      state.token = payload.token;
      state.userId = payload.userId;
    },
    setPosts(state, payload) {
      state.posts = payload;
    },
    setComments(state, payload) {
      state.comments = payload;
    },
  },
  actions: {
    login: ({ commit, dispatch }, responseData) => {
      const expiresIn = +responseData.expiresIn * 5000;

      localStorage.setItem("email", responseData.email);
      localStorage.setItem("token", responseData.idToken);
      localStorage.setItem("userId", responseData.localId);
      localStorage.setItem("username", responseData.username);

      timer = setTimeout(function () {
        dispatch("logout");
      }, expiresIn);

      commit("setUser", {
        email: responseData.email,
        token: responseData.idToken,
        userId: responseData.localId,
      });
    },
    logout({ commit }) {
      localStorage.removeItem("email");
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("username");

      clearTimeout(timer);

      commit("setUser", {
        email: null,
        token: null,
        userId: null,
      });
    },
    async loadPosts({ commit }) {
      const posts = await axios.get(`${process.env.VUE_APP_API_URL}/posts`);
      commit("setPosts", posts?.data || []);
    },
    async loadComments({ commit }) {
      const comments = await axios.get(
        `${process.env.VUE_APP_API_URL}/comments`
      );
      commit("setComments", comments?.data || []);
    },
    async loadPost(_, id) {
      const post = await axios.get(
        `${process.env.VUE_APP_API_URL}/posts/${id}`
      );
      return post?.data || [];
    },
    async deletePost({ commit }, id) {
      await axios.delete(`${process.env.VUE_APP_API_URL}/admin/posts/${id}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const posts = await axios.get(`${process.env.VUE_APP_API_URL}/posts`);
      commit("setPosts", posts?.data || []);
    },
    async deleteComment({ commit }, { postId: idPost, commentId: idComment }) {
      await axios.delete(
        `${process.env.VUE_APP_API_URL}/admin/posts/${idPost}/comments/${idComment}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const posts = await axios.get(
        `${process.env.VUE_APP_API_URL}/posts/${idPost}`
      );
      commit("setPosts", posts?.data || []);
    },
  },
  modules: {},
});
