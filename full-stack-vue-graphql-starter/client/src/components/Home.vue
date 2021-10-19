<template>
  <v-container text-xs-center>
    <!-- Spinner Component -->
    <spinner :loading="LOADING"></spinner>
    <!-- Image Slider -->
    <v-flex xs12>
      <v-carousel v-if="POSTS.length > 0" v-bind="{ cycle: true }" interval="3000">
        <v-carousel-item
          v-for="post in POSTS"
          :key="post._id"
          :src="post.imageUrl"
        >
          <h1 id="carousel__title">{{ post.title }}</h1>
        </v-carousel-item>
      </v-carousel>
    </v-flex>
  </v-container>
</template>

<script>
/** Common Component Imports */
import Spinner from "./common/Spinner.vue";
/** Library Imports */
import { mapGetters } from "vuex";

export default {
  name: "home",
  components: {
    Spinner
  },
  data() {
    return {
      post: {},
    };
  },
  created() {
    this.handleGetCarouselPosts();
  },
  computed: {
    /** Legacy Method to Get the Data From the Stores */
    // posts() {
    //   return this.$store.getters.POSTS;
    // },
    // loading() {
    //   return this.$store.getters.LOADING;
    // },
    /** Map Getter Will Get the Data For Us from the Vuex Store */
    ...mapGetters(['LOADING','POSTS'])
  },
  methods: {
    handleGetCarouselPosts() {
      // Reach to Vuex store & fire action to gets posts for carousel Slider
      this.$store.dispatch("getPosts");
    }
  }
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
