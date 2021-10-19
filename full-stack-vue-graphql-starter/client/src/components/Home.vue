<template>
  <v-container text-xs-center v-if="getPosts">
    <!-- Image Slider -->
    <v-flex xs12>
      <v-carousel v-bind="{ cycle: true }" interval="3000">
        <v-carousel-item
          v-for="post in getPosts"
          :key="post._id"
          :src="post.imageUrl"
        >
          <h1 id="carousel__title">{{ post.title }}</h1>
        </v-carousel-item>
      </v-carousel>
    </v-flex>

    <!-- Apollo Query Component to perform Query -->
    <!-- <ApolloQuery :query="getPostQuerey">
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
    </ApolloQuery> -->

    <!-- Image Slider -->
  </v-container>
</template>

<script>
import { gql } from "apollo-boost";

export default {
  name: "home",
  /** Apollo Query Defination and Execution */
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
      // getPostQuerey: gql`
      //   query {
      //     getPosts {
      //       _id
      //       title
      //       imageUrl
      //       description
      //       likes
      //     }
      //   }
      // `,
      post: {},
    };
  },
};
</script>

<style>
#carousel__title {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border-radius: 5px 5px 0 0;
  padding: 0.5em;
  margin: 0 auto;
  bottom: 50px;
  left: 0;
  right: 0;
  text-align: center;
}
</style>
