<template>
  <!-- Horizontal Nav Bar  -->
  <v-app-bar style="flex: 0" fixed color="primary" dark>
    <!-- Navigation Icon -->
    <v-app-bar-nav-icon @click="$emit('toggleNavDrawer')"></v-app-bar-nav-icon>

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
      label="Search Posts"
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
        v-for="item in navigationList"
        :key="item.title"
        :to="item.link"
      >
        <v-icon left class="hidden-sm-only">{{ item.icon }}</v-icon>
        {{ item.title }}
      </v-btn>

      <!-- Profile Button -->
        <v-btn text to="/profile" v-if="currentUser">
          <v-icon class="hidden-sm-only" left>mdi-account-box</v-icon>
          <v-badge right color="blue darken-2">
            <span slot="badge">1</span>
            Profile
          </v-badge>
        </v-btn>

        <!-- Signout Button -->
        <v-btn text v-if="currentUser" @click="$emit('handleSignoutUser')">
          <v-icon class="hidden-sm-only" left>mdi-exit-to-app</v-icon>
          Signout
        </v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
export default {
  name: "HorizontalNavBar",
  props: {
    navigationList: {
      type: Array,
      default: () => {
        return [];
      },
    },
    currentUser: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
};
</script>