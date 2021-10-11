<template>
  <v-app>
    <!-- Horizontal Nav Bar  -->
    <v-app-bar style="flex: 0" fixed color="primary" dark>
      <!-- Navigation Icon -->
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <!-- Title of Navigation Bar -->
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">
          Nav Share
        </router-link>
      </v-toolbar-title>

      <!-- User for Spacing -->
      <v-spacer></v-spacer>

      <!-- Search Bar -->
      <v-text-field
        flex
        label="Search Post"
        prepend-inner-icon="mdi-magnify"
        placeholder="Search Posts"
        color="accent"
        single-line
        hide-details
      ></v-text-field>

      <!-- User for Spacing -->
      <v-spacer></v-spacer>

      <!-- Nav Menu Items -->
      <v-toolbar-items>
        <v-btn
          text
          v-for="item in horizontalNavItems"
          :key="item.title"
          :to="item.link"
        >
          <v-icon left>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <!-- App Content -->
    <main>
      <v-container class="mt-16">
        <transition name="fade">
          <router-view />
        </transition>
      </v-container>
    </main>
  </v-app>
</template>

<script>
export default {
  name: "app",
  computed: {
    horizontalNavItems() {
      return [
        { icon: "mdi-message", title: "Posts", link: "/posts" },
        { icon: "mdi-lock-open", title: "Sign In", link: "/signin" },
        { icon: "mdi-grease-pencil", title: "Sign Up", link: "/signup" },
      ];
    },
  },
};
</script>