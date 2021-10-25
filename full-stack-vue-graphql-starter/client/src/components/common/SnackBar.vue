<template>
  <v-snackbar
    :color="color"
    v-model="snackbar"
    :timeout="timeout"
    bottom
    left
  >
    <div class="inline-flex-display">
      <v-icon v-if="icon" class="mr-3">{{icon}}</v-icon>
      <h3>{{message}}</h3>
    </div>
    <template v-slot:action="{ attrs }">
      <v-btn text dark v-bind="attrs" @click="$emit('snackbar-action')">
        {{actionName}}
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: "Snackbar",
  props: {
      snackbar: {
          type: Boolean,
          required: true,
          default: false
      },
      timeout: {
          type: Number,
          default: 2000,
      },
      message: {
          type: String,
          required: true,
          default: "",
      },
      icon: {
          type: String,
          default: "",
      },
      actionName: {
          type: String,
          default: "Close"
      },
      color: {
          type: String,
          default: "primary"
      }
  }
};
</script>