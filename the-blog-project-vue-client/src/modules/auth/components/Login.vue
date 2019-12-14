<template>
  <div class="row justify-content-center">
    <div class="col">
      <h4 align="center">تسجيل الدخول</h4>
      <hr />
      <form @submit.prevent="login">
        <div class="form-group">
          <label>رقم الموبايل</label>
          <input type="text" name="username" class="form-control" placeholder v-model="username" />
        </div>
        <div class="form-group">
          <label>الرقم السري</label>
          <input
            type="password"
            name="password"
            class="form-control"
            placeholder
            v-model="password"
          />
        </div>
        <button type="submit" class="btn btn-primary btn-block">تسجيل الدخول</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { cqClient } from "@/lib/cqClient";
import { User } from "@/modules/um/models/user.model";

export default class Login extends Vue {
  username: string = null;
  password: string = null;

  async login(event: Event) {
    let success = await this.$store.dispatch("loginUser", {
      username: this.username,
      password: this.password
    });
    if (!success) {
      window.alert("Login Error ...!");
    }
  }
}
</script>