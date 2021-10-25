<template>
  <v-container text-as-center text-xs-center mt-5 pt-5>
    <!-- Sign In User Title-->
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <h1>Welcome Back</h1>
      </v-flex>
    </v-layout>

    <!-- Sign In Form Alert -->
    <v-layout v-if="ERROR" row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <form-alert :message="ERROR.message"></form-alert>
      </v-flex>
    </v-layout>

    <!-- Login Form -->
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <v-card color="secondary" dark>
          <v-container>
            <v-form @submit.prevent="handlerUserLogin">
              <!-- Username Input Field -->
              <v-layout>
                <v-flex xs12>
                  <v-text-field
                    v-model="username"
                    prepend-icon="mdi-emoticon"
                    label="Username"
                    type="text"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <!-- Password Input Field -->
              <v-layout>
                <v-flex xs12>
                  <v-text-field
                    v-model="password"
                    prepend-icon="mdi-security"
                    label="Password"
                    type="password"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <!-- Submit Button -->
              <v-layout>
                <v-flex xs12>
                  <v-btn
                    :loading="LOADING"
                    :disabled="LOADING"
                    color="primary"
                    type="submit"
                    >LogIn</v-btn
                  >
                  <h3>
                    Don't have an account ?
                    <router-link to="/sign_up"> SignUp</router-link>
                  </h3>
                </v-flex>
              </v-layout>
            </v-form>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
/** Library Imports */
import { mapGetters } from "vuex";
import FormAlert from "../common/FormAlert.vue";

export default {
  components: { FormAlert },
  name: "SignIn",
  data() {
    return {
      username: "",
      password: "",
      currentUser: null,
    };
  },
  computed: {
    ...mapGetters(["CURRENT_USER", "ERROR", "LOADING"]),
  },
  watch: {
    /** if User Exist then move to Home Page */
    CURRENT_USER(value) {
      if (value) {
        this.$router.push("/");
      }
    },
  },
  methods: {
    handlerUserLogin() {
      /** Action to handle the User Login */
      this.$store.dispatch("signInUser", {
        username: this.username,
        password: this.password,
      });
    },
  },
};
</script>

<style lang="css">
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
