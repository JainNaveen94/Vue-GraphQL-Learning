<template>
  <v-app>
    <!-- Vertical Nav Drawer Component-->
    <veritical-nav-bar
      :isVisible="sideNav"
      :navigationList="verticalNavDrawerItem"
      :currentUser="CURRENT_USER"
      @toggleNavDrawer="toggleNavDrawer"
      @handleSignoutUser="handleSignoutUser"
    ></veritical-nav-bar>

    <!-- Horizontal Nav Bar  -->
    <horizontal-nav-bar
      :navigationList="horizontalNavItems"
      :currentUser="CURRENT_USER"
      @toggleNavDrawer="toggleNavDrawer"
      @handleSignoutUser="handleSignoutUser"
    ></horizontal-nav-bar>

    <!-- App Content -->
    <main>
      <v-container class="mt-16 pt-16">
        <transition name="fade">
          <router-view />
        </transition>
      </v-container>
    </main>
  </v-app>
</template>

<script>
/** Library Import */
import { mapGetters } from "vuex";
/** Common Component Imports */
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
    ...mapGetters(['CURRENT_USER']),
    horizontalNavItems() {
      let items = [
        { icon: "mdi-message", title: "Posts", link: "/posts" },
        { icon: "mdi-lock-open", title: "Sign In", link: "/sign_in" },
        { icon: "mdi-grease-pencil", title: "Sign Up", link: "/sign_up" },
      ];
      if(this.CURRENT_USER) {
        items = [
        { icon: "mdi-message", title: "Posts", link: "/posts" },
      ]
      }
      return items;
    },
    verticalNavDrawerItem() {
      let items = [
        { icon: "mdi-message", title: "Posts", link: "/posts" },
        { icon: "mdi-lock-open", title: "Sign In", link: "/sign_in" },
        { icon: "mdi-grease-pencil", title: "Sign Up", link: "/sign_up" },
      ];
      if(this.CURRENT_USER) {
        items = [
        { icon: "mdi-message", title: "Posts", link: "/posts" },
        { icon: "mdi-star", title: "Add Post", link: "/post/add" },
        { icon: "mdi-account-box", title: "Profile", link: "/profile" },
      ];
      }
      return items;
    },
  },
  methods: {
    toggleNavDrawer() {
      /** Action to Toggle the Navigation Drawer */
      this.sideNav = !this.sideNav;
    },
    handleSignoutUser() {
      /** Action to Handle the Signout User */
      this.$store.dispatch('signOutUser');
    }
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

.text-as-center {
  text-align: center;
}
</style>