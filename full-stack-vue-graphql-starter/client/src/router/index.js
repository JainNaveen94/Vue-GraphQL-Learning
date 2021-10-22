import Vue from 'vue'
import VueRouter from 'vue-router'

/** Home Component */
import Home from '../components/Home.vue'

/** Posts Components */
import Posts from "../components/posts/Posts.vue";
import AddPost from "../components/posts/AddPost.vue";

/** Auth Components */
import SignIn from "../components/auth/SignIn.vue";
import SignUp from "../components/auth/SignUp.vue";
import Profile from "../components/auth/Profile.vue";

/** Auth Gaurd */
import AuthGuard from "../AuthGuard";


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/posts',
    name: 'Posts',
    component: Posts
  },
  {
    path: '/add_post',
    name: 'AddPost',
    component: AddPost
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    beforeEnter: AuthGuard,
  },
  {
    path: '/sign_in',
    name: 'SignIn',
    component: SignIn
  },
  {
    path: '/sign_up',
    name: 'SignUp',
    component: SignUp
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
