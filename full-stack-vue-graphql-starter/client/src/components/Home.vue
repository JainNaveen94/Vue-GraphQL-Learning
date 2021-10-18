<template>
  <v-container>
    <h1>Home</h1>
    <div v-if="$apollo.loading">Loading</div>
    <div v-else>
      <ul v-for="post in getPosts" :key="post._id">
        <li>{{ post.title }} {{ post.imageUrl }} {{ post.description }}</li>
        <li>{{ post.likes }}</li>
      </ul>
    </div>
  </v-container>
</template>

<script>
import { gql } from "apollo-boost";

export default {
  name: "home",
  apollo: {
    getPosts: {
      query: gql`
        query {
          getPosts {
            _id
            title
            imageUrl
            description
            likes
          }
        }
      `,
      // Result Feteching
      result({ loading, data }) {
        if (!loading) {
          this.post = data.getPosts;
        }
      },
      // result(args) {
      //   // TO Check all the Relevent Option Without Destructuring
      //   console.dir(args);
      // }
      // Error Handling
      error(err) {
        // TO Check all the Relevent Option Without Destructuring
        console.dir(err);
      },
    },
  },
  data() {
    return {
      post: {},
    };
  },
};
</script>
