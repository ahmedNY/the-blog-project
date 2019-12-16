<template>
  <div>
    <b-breadcrumb class="d-print-none">
      <b-breadcrumb-item to="/" text="البداية" />
      <b-breadcrumb-item to="/um" text="إدارة المستخدمين" />
      <b-breadcrumb-item :active="true" text="قائمة المستخدمين" />
    </b-breadcrumb>

    <h5 class="bg-light p-3">قائمة المستخدمين</h5>
    <table class="table table-sm">
      <thead>
        <tr>
          <th>#</th>
          <th>المستخدم</th>
          <th>
            <router-link
              :to="`/um/editUser?userId=0`"
              class="btn btn-primary btn-sm float-left"
            >جديد</router-link>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in users" :key="row.id">
          <td scope="row">#{{row.id}}</td>
          <td>
            {{row.displayName}}
            <br />
            {{row.mobileNumber}}
          </td>
          <td align="left">
            <router-link
              :to="`/um/showUserDetail?userId=${row.id}`"
              class="btn btn-primary btn-sm"
            >عرض</router-link>
          </td>
        </tr>
      </tbody>
    </table>
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