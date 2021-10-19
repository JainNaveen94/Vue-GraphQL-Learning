<template>
  <!-- Vertical Nav Drawer -->
  <v-navigation-drawer app temporary fixed v-model="isVisible">
    <!-- Toolbar for Main Icon and Title -->
    <v-toolbar color="error" dark flat>
      <!-- Navigation Icon -->
      <v-app-bar-nav-icon
        @click="$emit('toggleNavDrawer')"
      ></v-app-bar-nav-icon>

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
        v-for="item in navigationList"
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
</template>

<script>
export default {
  name: "VerticalNavBar",
  props: {
    isVisible: {
      type: Boolean,
      required: true,
      default: false,
    },
    navigationList: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
};
</script>