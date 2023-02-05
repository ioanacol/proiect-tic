<template>
  <p v-if="error !== nul">{{ error }}</p>
  <h1>ENGAGEMENT</h1>
  <select
    name="month"
    id="month"
    @click="handleSelect(this.month)"
    v-model="selected"
  >
    <option
      v-for="listValue in availableMonths"
      :key="listValue"
      :value="listValue"
      :selected="listValue === modelValue"
    >
      {{ listValue }}
    </option>
  </select>
  <div class="wrapper">
    <ol role="list">
      <li v-for="comment in comments" :key="comment.id">
        <div class="text">
          <p>{{ comment.author }}</p>
          <p>{{ comment.date }}</p>
          <p>{{ comment.content }}</p>
        </div>
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  name: "CommentsView",
  created() {
    this.error = null;
    this.loadComments();
  },
  data() {
    return {
      error: null,
      selected: "IANUARIE",
      availableMonths: [
        "IANUARIE",
        "FEBRUARIE",
        "MARTIE",
        "APRILIE",
        "MAI",
        "IUNIE",
        "IULIE",
        "AUGUST",
        "SEPTEMBRIE",
        "OCTOMBRIE",
        "NOIEMBRIE",
        "DECEMBRIE",
      ],
      month: "",
    };
  },
  computed: {
    comments() {
      console.log(this.$store.getters.getComments);
      // const monthToSearch = this.availableMonths[this.month];
      // console.log(monthToSearch);
      return this.$store.getters.getComments;
    },
    // filteredComments() {
    //   // const monthToSearch = this.availableMonths[this.month];
    //   // console.log(monthToSearch);
    //   const allComments = this.$store.getters.getComments;
    //   // return allComments.filter(
    //   //   (comment) => toUpper(comment.date.getFullMonth()) === this.month
    //   // );
    // },

    isAdmin() {
      return this.$store.getters.isAdmin;
    },
  },
  methods: {
    async loadComments() {
      await this.$store.dispatch("loadComments");
    },
    handleSelect(month) {
      console.log(month);
    },
  },
};
</script>

<style scoped>
.wrapper {
  max-width: 60rem;
  margin: 0 auto;
}

h1 {
  color: #dcafa1;
  font-weight: bold;
  font-size: 5rem;
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
  justify-content: center;
  gap: 1rem;
  background: #a6b1b0;
  padding: 1.5rem;
  border-radius: 1rem;
  width: calc(100% - 2rem);
  box-shadow: 0.25rem 0.25rem 0.75rem rgb(0 0 0 / 0.1);
  opacity: 0.9;
}
.text {
  font-family: "Sofia Sans";
  font-size: 3rem;
  font-weight: bold;
  text-decoration: none;
  color: white;
  cursor: default;
}

select {
  appearance: none;
  background-color: transparent;
  border: 0.2rem solid #2b470d;
  border-radius: 1rem;
  padding: 1rem 1em;
  margin: 3rem;
  width: 20%;
  font-family: inherit;
  font-size: inherit;
  cursor: inherit;
  line-height: inherit;
  font-size: 1.3rem;
  font-weight: bold;
  color: #737554;

  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  background-position: calc(100% - 12px) center !important;
  background: url("data:image/svg+xml,<svg height='20px' width='15px' viewBox='0 0 16 16' fill='%23737554' xmlns='http://www.w3.org/2000/svg'><path d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/></svg>")
    no-repeat;
}

option {
  font-size: 1.5rem;
}
</style>
