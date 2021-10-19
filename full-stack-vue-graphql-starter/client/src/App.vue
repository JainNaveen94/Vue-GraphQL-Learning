<template>
  <v-app>
    <!-- Vertical Nav Drawer Component-->
    <veritical-nav-bar
      :isVisible="sideNav"
      :navigationList="verticalNavDrawerItem"
      @toggleNavDrawer="toggleNavDrawer"
    ></veritical-nav-bar>

    <!-- Horizontal Nav Bar  -->
    <horizontal-nav-bar
      :navigationList="horizontalNavItems"
      @toggleNavDrawer="toggleNavDrawer"
    ></horizontal-nav-bar>

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
import VeriticalNavBar from "./components/common/VerticalNavBar.vue";
import HorizontalNavBar from "./components/common/HorizontalNavBar.vue";
export default {
  name: "app",
  components: {
    VeriticalNavBar,
    HorizontalNavBar,
  },
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