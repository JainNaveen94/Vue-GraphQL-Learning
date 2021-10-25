<template>
  <v-container text-as-center text-xs-center mt-5 pt-5>
    <!-- Sign In User Title-->
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <h1>Get Started Here !!</h1>
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
            <v-form
              v-model="isValid"
              lazy-validation
              ref="signUp"
              @submit.prevent="handlerUserSignUp"
            >
              <!-- Username Input Field -->
              <v-layout>
                <v-flex xs12>
                  <v-text-field
                    v-model="username"
                    :rules="validationRules.username"
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
                    :rules="validationRules.password"
                    prepend-icon="mdi-security"
                    label="Password"
                    type="password"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <!-- Confirm Password Input Field -->
              <v-layout>
                <v-flex xs12>
                  <v-text-field
                    v-model="confirmPassword"
                    :rules="validationRules.confirmPassword"
                    prepend-icon="mdi-security"
                    label="Confirm Password"
                    type="password"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <!-- Email Input Field -->
              <v-layout>
                <v-flex xs12>
                  <v-text-field
                    v-model="email"
                    :rules="validationRules.email"
                    prepend-icon="mdi-email"
                    label="Email"
                    type="email"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <!-- Submit Button -->
              <v-layout>
                <v-flex xs12>
                  <v-btn
                    :loading="LOADING"
                    :disabled="LOADING || !isValid"
                    color="primary"
                    type="submit"
                    >Sign Up</v-btn
                  >
                  <h3>
                    Already have an account ?
                    <router-link to="/sign_in"> Sign In</router-link>
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
import { mapGetters } from "vuex";

export default {
  name: "SignUp",
  data() {
    return {
      // Sign-Up Form Fields
      username: "",
      password: "",
      confirmPassword: "",
      email: "",
      // Sign-Up Form Validation
      isValid: true,
      validationRules: {
        username: [
          (v) => !!v || "Username is required for SignUp",
          (v) =>
            (v && v.length < 15) ||
            "Username Should be equal to or less then 15 Character",
        ],
        password: [
          (v) => !!v || "Please Enter Unique Password",
          (v) =>
            (v && v.length > 7) ||
            "Password Length should be Greater then 7 Character",
        ],
        confirmPassword: [
          (v) => !!v || "Please Enter Confirm Password",
          (v) =>
            (v && v.length > 7) ||
            "Password Length should be Greater then 7 Character",
          (v) =>
            (v && v === this.password) ||
            "Password and Confirm Password Should be Same",
        ],
        email: [
          (v) => !!v || "Please Enter Email Address For Sign Up",
          (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
        ],
      },
    };
  },
  computed: {
    ...mapGetters(["ERROR", "LOADING", "CURRENT_USER"]),
  },
  watch: {
    CURRENT_USER(value) {
      if(value) {
        this.$router.push("/");
      }
    }
  },
  methods: {
    handlerUserSignUp() {
      /** Action to Handle the Signup User */
      if (this.$refs.signUp.validate()) {
        this.$store.dispatch("signUpUser", {
          username: this.username,
          password: this.password,
          email: this.email
        });
      }
    },
  },
};
</script>
