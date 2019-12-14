<template>
  <div id="app">
    <navigation></navigation>
    <router-view name="subnav"></router-view>

    <div class="container mt-3">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <router-view v-if="isAuthenticated" />
          <Login v-else></Login>
        </div>
      </div>
    </div>

    <footer
      class="footer d-none d-print-block bg-info text-white"
      style="border-top: #D3D3D3 1px solid; padding: 10px"
    >
      <div class="container">
        <span class>مانجو ماس كلاود MangoMasCloud</span>
        <span class="pull-left" dir="ltr">
          <i class="fa fa-phone"></i> +249917622959
        </span>
      </div>
    </footer>
  </div>
</template>



<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Navigation from "@/modules/layout/navigation.vue";
import store from "@/vuex/index";
import Login from "@/modules/auth/components/Login.vue";

@Component({
  components: { Login, Navigation }
})
export default class App extends Vue {
  get isAuthenticated(): string {
    return this.$store.state.isAuthenticated;
  }

  mounted() {}

  created() {}

  logout() {
    this.$store.dispatch("");
  }
}
</script>


<style scoped>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

/******* Sub Navigation Bar */
.navbar-light {
  background-color: #757575;
  border-color: #990022;
  border-width: 0px 0px 0px 0px;
  margin-bottom: 15px;
}
.navbar-light .navbar-brand {
  color: #f3f3f3;
  padding: 5px 15px;
  font-size: 30px;
  line-height: 40px;
}
.navbar-light .navbar-nav > li > a {
  color: #f3f3f3;
}
.navbar-light .navbar-nav > .active > a,
.navbar-light .navbar-nav > .active > a:hover,
.navbar-light .navbar-nav > .active > a:focus,
.navbar-light .navbar-nav a.router-link-active {
  color: #fff;
  background-color: #ef8b36;
}
</style>