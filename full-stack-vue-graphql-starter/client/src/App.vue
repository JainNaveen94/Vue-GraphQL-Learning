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

        <!-- Success Snackbar -->
        <snack-bar
          :snackbar="logInSnackbar"
          message="You are now sign_in !!"
          icon="mdi-check-circle"
          :timeout="timeout"
          color="success"
          actionName="Close"
          @snackbar-action="logInSnackbar = false"
        ></snack-bar>

        <!-- Error Snackbar -->
         <snack-bar
          :snackbar="errorSnackbar"
          :message="AUTH_ERROR ? AUTH_ERROR : ''"
          icon="mdi-cancel"
          :timeout="timeout"
          color="warning"
          actionName="SignIn"
          @snackbar-action="handlerUserSessionOut()"
        ></snack-bar>

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
import SnackBar from "./components/common/SnackBar.vue";

export default {
  name: "app",
  components: {
    VeriticalNavBar,
    HorizontalNavBar,
    SnackBar
  },
  data() {
    return {
      sideNav: false,
      logInSnackbar: false,
      errorSnackbar: false,
      timeout: 5000,
    };
  },
  computed: {
    ...mapGetters(["CURRENT_USER", "AUTH_ERROR"]),
    horizontalNavItems() {
      let items = [
        { icon: "mdi-message", title: "Posts", link: "/posts" },
        { icon: "mdi-lock-open", title: "Sign In", link: "/sign_in" },
        { icon: "mdi-grease-pencil", title: "Sign Up", link: "/sign_up" },
      ];
      if (this.CURRENT_USER) {
        items = [{ icon: "mdi-message", title: "Posts", link: "/posts" }];
      }
      return items;
    },
    verticalNavDrawerItem() {
      let items = [
        { icon: "mdi-message", title: "Posts", link: "/posts" },
        { icon: "mdi-lock-open", title: "Sign In", link: "/sign_in" },
        { icon: "mdi-grease-pencil", title: "Sign Up", link: "/sign_up" },
      ];
      if (this.CURRENT_USER) {
        items = [
          { icon: "mdi-message", title: "Posts", link: "/posts" },
          { icon: "mdi-star", title: "Add Post", link: "/post/add" },
          { icon: "mdi-account-box", title: "Profile", link: "/profile" },
        ];
      }
      return items;
    },
  },
  watch: {
    /** Manage the Login Snack bar for login success message */
    CURRENT_USER(newValue, oldValue) {
      if(oldValue !== newValue && oldValue === null) {
        this.logInSnackbar = true;
      }
    },
    /** Authentication Error action - Session timeout management */
    AUTH_ERROR(value) {
      if(value !== null) {
        this.errorSnackbar = true;
      }
    }
  },
  methods: {
    toggleNavDrawer() {
      /** Action to Toggle the Navigation Drawer */
      this.sideNav = !this.sideNav;
    },
    handleSignoutUser() {
      /** Action to Handle the Signout User */
      this.$store.dispatch("signOutUser");
    },
    handlerUserSessionOut() {
      /** Action to Handle the User Session Out */
      // Step 1 : Clear local Storage
      localStorage.setItem('token', '');
      // Step 2 : Navigate to Sign in or Log in Page
      this.$router.push('/sign_in')
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

.inline-flex-display {
  display: inline-flex;
}
</style>