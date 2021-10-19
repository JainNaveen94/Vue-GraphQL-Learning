<template>
  <v-container>
    <h1>Home</h1>
    <ApolloQuery :query="getPostQuerey">
      <template slot-scope="{result: {loading, error, data}}">
        <div v-if="loading">Loading ...</div>
        <div v-else-if="error">
          Error!! - {{error.message}}
        </div>
        <div v-else>
          <ui v-for="post in data.getPosts" :key="post._id">
            <ui>{{post.title}}</ui>
            <ui>{{post.imageUrl}}</ui>
            <ui>{{post.likes}}</ui>
          </ui>
        </div>
      </template>
    </ApolloQuery>
  </v-container>
</template>

<script>
import { gql } from "apollo-boost";

export default {
  name: "home",
  /** Apollo Query Defination and Execution */
  // apollo: {
  //   getPosts: {
  //     query: gql`
  //       query {
  //         getPosts {
  //           _id
  //           title
  //           imageUrl
  //           description
  //           likes
  //         }
  //       }
  //     `,
  //     // Result Feteching
  //     result({ loading, data }) {
  //       if (!loading) {
  //         this.post = data.getPosts;
  //       }
  //     },
  //     // result(args) {
  //     //   // TO Check all the Relevent Option Without Destructuring
  //     //   console.dir(args);
  //     // }
  //     // Error Handling
  //     error(err) {
  //       // TO Check all the Relevent Option Without Destructuring
  //       console.dir(err);
  //     },
  //   },
  // },
  data() {
    return {
      getPostQuerey: gql`
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
      post: {},
    };
  },
};
</script>
