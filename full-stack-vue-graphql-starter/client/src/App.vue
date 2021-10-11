<template>
  <v-app>
    <!-- Vertical Nav Drawer -->
    <v-navigation-drawer app temporary fixed v-model="sideNav">
      <!-- Toolbar for Main Icon and Title -->
      <v-toolbar color="error" dark flat>
        <!-- Navigation Icon -->
        <v-app-bar-nav-icon @click="toggleNavDrawer"></v-app-bar-nav-icon>

        <!-- Title of Side Drawer-->
        <router-link to="/" tag="span" style="cursor: pointer">
          <h1 class="title pl-4">NavShare</h1>
        </router-link>
      </v-toolbar>

      <!-- Use for Vertical Division with separation Line -->
      <v-divider></v-divider>

      <!-- List of Items on Left Navigation Drawer -->
      <v-list dense nav>
        <v-list-item
          ripple
          v-for="item in verticalNavDrawerItem"
          :key="item.title"
          :to="item.link"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Horizontal Nav Bar  -->
    <v-app-bar style="flex: 0" fixed color="primary" dark>
      <!-- Navigation Icon -->
      <v-app-bar-nav-icon @click="toggleNavDrawer"></v-app-bar-nav-icon>

      <!-- Title of Navigation Bar -->
      <v-toolbar-title class="hidden-xs-only">
        <router-link to="/" tag="span" style="cursor: pointer">
          NavShare
        </router-link>
      </v-toolbar-title>

      <!-- Use for Spacing -->
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

      <!-- Use for Spacing -->
      <v-spacer></v-spacer>

      <!-- Nav Menu Items -->
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          text
          v-for="item in horizontalNavItems"
          :key="item.title"
          :to="item.link"
        >
          <v-icon left class="hidden-sm-only">{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <!-- App Content -->
    <main>
      <v-container class="mt-16 ml-0">
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
  data() {
    return {
      sideNav: false,
    };
  },
  computed: {
    horizontalNavItems() {
      return [
        { icon: "mdi-message", title: "Posts", link: "/posts" },
        { icon: "mdi-lock-open", title: "Sign In", link: "/sign_in" },
        { icon: "mdi-grease-pencil", title: "Sign Up", link: "/sign_up" },
      ];
    },
    verticalNavDrawerItem() {
      return [
        { icon: "mdi-message", title: "Posts", link: "/posts" },
        { icon: "mdi-lock-open", title: "Sign In", link: "/sign_in" },
        { icon: "mdi-grease-pencil", title: "Sign Up", link: "/sign_up" },
      ];
    },
  },
  methods: {
    toggleNavDrawer() {
      /** Action to Toggle the Navigation Drawer */
      this.sideNav = !this.sideNav;
    },
  },
};
</script>

<style>

.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 0.25s;
}

.fade-enter-active {
  transition-delay: 0.25s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>