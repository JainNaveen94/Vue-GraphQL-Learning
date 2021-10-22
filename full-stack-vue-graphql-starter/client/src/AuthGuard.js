import {store} from "./store";

export default (to, from, next) => {
  if (!store.getters.CURRENT_USER) {
    next({
      path: "/sign_in",
    });
  } else {
    next();
  }
};