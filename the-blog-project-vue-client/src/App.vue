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
import Navigation from "@/modules/main/components/navigation.vue";
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
</style>