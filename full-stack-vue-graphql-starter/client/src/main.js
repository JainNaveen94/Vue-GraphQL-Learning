import "@babel/polyfill";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

/** Graph QL Related Imoports */
import ApolloClient from "apollo-boost";
import VueApollo from "vue-apollo";
Vue.use(VueApollo);

/** Setup ApolloClient */
const defaultClient = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

/** Define Providers for Vue Apollo */
const apolloProvider = new VueApollo({ defaultClient });

Vue.config.productionTip = false;

new Vue({
  apolloProvider: apolloProvider,
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
