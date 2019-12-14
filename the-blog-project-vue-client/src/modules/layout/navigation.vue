<template>
  <b-navbar toggleable="md" type="dark" variant="info" class="navbar-main">
    <b-container>
      <b-nav-toggle target="nav_collapse"></b-nav-toggle>
      <b-navbar-brand to="/">برنامج المدونة</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav v-if="isAuthenticated">
          <b-nav-item to="/blog/">المدونة</b-nav-item>
          <b-nav-item to="/um/">إدارة المستخدمين</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav v-if="isAuthenticated" class="ml-auto">
          <b-nav-item class="bg-secondary">{{currentUser ? currentUser.displayName : ''}}</b-nav-item>
          <b-nav-item @click="logout()">تسجيل الخروج</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav v-else class="ml-auto">
          <b-nav-item to="/login">تسجيل الدخول</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-container>
  </b-navbar>
</template>


<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import store from "@/vuex/index";
import { User } from "../um/models/user.model";

@Component({})
export default class Navigation extends Vue {
  username: string = null;
  password: string = null;

  get isAuthenticated(): string {
    return this.$store.state.isAuthenticated;
  }

  get currentUser(): User {
    return this.$store.state.user;
  }

  async logout() {
    await this.$store.dispatch("logoutUser");
    window.alert("تم تسجيل الخروج بنجاح");
  }
}
</script>

<style scoped>
/******* Navigation Bar */
.navbar-main {
  background-color: #253f56;
  border-color: #ef8b36;
}
.navbar-main .navbar-brand {
  color: #f3f3f3;
}

.navbar-main .navbar-nav > li > a {
  color: #f3f3f3;
}
.navbar-main .navbar-nav > .active > a,
.navbar-main .navbar-nav > .active > a:hover,
.navbar-main .navbar-nav > .active > a:focus,
.navbar-main .navbar-nav a.router-link-active {
  color: #fff;
  background-color: #ef8b36;
}
</style>
