import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

/** Import the Color Lib if you don't want to use hashcode instead use color name */
// import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        /** Custom Color Theme */
        primary: "#2B2D42",
        secondary: "#8D99AE",
        accent: "#EDF2F4",
        error: "#DB3A34",
        warning: "#FFC857",
        info: "#2191fb",
        success: "#4D8B31",
      },
      dark: {
        /** Custom Color Theme */
        primary: "#2B2D42",
        secondary: "#8D99AE",
        accent: "#EDF2F4",
        error: "#DB3A34",
        warning: "#FFC857",
        info: "#2191fb",
        success: "#4D8B31",
      },
    },
    /**  Default Color Theme */
    // primary: '#1976D2',
    // secondary: '#424242',
    // accent: '#82B1FF',
    // error: '#FF5252',
    // info: '#2196F3',
    // success: '#4CAF50',
    // warning: '#FFC107',
  },
});
