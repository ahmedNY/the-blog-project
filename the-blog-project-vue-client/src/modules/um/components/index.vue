<template>
  <div>
    <b-breadcrumb class="d-print-none">
      <b-breadcrumb-item to="/" text="البداية" />
      <b-breadcrumb-item :active="true" text="إدارة المستخدمين" />
    </b-breadcrumb>

    <h5>إدارة المستخدمين</h5>
    <div class="list-group p-0">
      <router-link
        to="/um/showUsers"
        class="list-group-item list-group-item-action"
      >قائمة المستخدمين</router-link>
      <router-link to="/um/showRoles" class="list-group-item list-group-item-action">قائمة الأدوار</router-link>
      <router-link
        to="/um/showModules"
        class="list-group-item list-group-item-action"
      >قائمة الموديلات</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { cqClient } from "../../../lib/cqClient";
import { User } from "../models/user.model";

@Component({})
export default class extends Vue {
  users: User[] = [];

  created() {
    this.searchData();
  }
  async searchData() {
    try {
      this.users = await cqClient.query(`user.findAll`);
    } catch (error) {
      console.log(error);
    }
  }
}
</script>