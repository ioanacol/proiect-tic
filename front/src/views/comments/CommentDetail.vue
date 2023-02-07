<template>
  <p v-if="error !== nul">{{ error }}</p>
  <h1>ENGAGEMENT</h1>
  <select name="month" id="month" v-model="selected">
    <option v-for="listValue in availableMonths" :key="listValue">
      {{ listValue }}
    </option>
  </select>
  <div class="wrapper">
    <ol role="list">
      <p class="numberComments">{{ sortedArray.length }} comments</p>
      <li v-for="comment in sortedArray" :key="comment.id">
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
      availableMonths: [
        "PLEASE SELECT MONTH TO SEE ENGAGEMENT",
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
      selected: "PLEASE SELECT MONTH TO SEE ENGAGEMENT",
    };
  },
  computed: {
    comments() {
      return this.$store.getters.getComments;
    },
    isAdmin() {
      return this.$store.getters.isAdmin;
    },
    sortedArray() {
      let commentsArray = this.$store.getters.getComments;
      const monthSelected = this.selected;
      if (monthSelected === "PLEASE SELECT MONTH TO SEE ENGAGEMENT") {
        commentsArray = commentsArray.sort((a, b) => {
          let fa = a.date.split("-")[1],
            fb = b.date.split("-")[1];
          if (fa < fb) {
            return -1;
          }
          if (fa > fb) {
            return 1;
          }
          return 0;
        });
        return commentsArray;
      } else {
        const availableMonths = [
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
        ];

        let allComments = [];
        commentsArray.forEach((comment) => {
          if (
            availableMonths[parseInt(comment.date.split("-")[1], 10) - 1] ===
            monthSelected
          ) {
            allComments.push(comment);
          }
        });

        allComments = allComments.sort((a, b) => {
          let fa = a.date.split("-")[0],
            fb = b.date.split("-")[0];
          if (fa < fb) {
            return -1;
          }
          if (fa > fb) {
            return 1;
          }
          return 0;
        });

        return allComments;
      }
    },
  },
  methods: {
    async loadComments() {
      await this.$store.dispatch("loadComments");
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
.numberComments {
  color: #dcafa1;
  font-size: 2rem;
  margin: 1rem;
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
  width: 25%;
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
