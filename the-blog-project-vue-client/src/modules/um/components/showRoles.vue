<template>
  <div>
    <b-breadcrumb class="d-print-none">
      <b-breadcrumb-item to="/" text="البداية" />
      <b-breadcrumb-item to="/um" text="إدارة المستخدمين" />
      <b-breadcrumb-item :active="true" text="قائمة الأدوار" />
    </b-breadcrumb>

    <h5 class="bg-light p-3">قائمة الأدوار</h5>
    <table class="table table-sm">
      <thead>
        <tr>
          <th>#</th>
          <th>الدور</th>
          <th>الصلاحيات</th>
          <th>المستخدمين</th>
          <th align="left">
            <button @click="addRole()" class="btn btn-primary float-left btn-sm">إضافة</button>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="role in roles" :key="role.id">
          <td scope="row">{{role.id}}</td>
          <td>{{role.roleName}}</td>
          <td>{{role.permissions.length}}</td>
          <td>{{role.users.length}}</td>
          <td align="left" nowrap>
            <router-link
              :to="`/um/showRoleDetail?roleId=${role.id}`"
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
import { cqClient } from "@/lib/cqClient";
import { Role } from "@/modules/um/models/role.model";

@Component({})
export default class extends Vue {
  roles: Role[] = [];
  async created() {
    this.loadData();
  }

  async loadData() {
    try {
      this.roles = await cqClient.query("role.findAll");
    } catch (err) {
      console.log(err);
    }
  }

  async addRole() {
    try {
      const roleName = window.prompt("roleName");
      await cqClient.command("role.addRole", { roleName });
      this.loadData();
    } catch (err) {}
  }

  async updateRole(role: Role) {
    try {
      const roleName = window.prompt("roleName");
      await cqClient.command("role.updateRole", { id: role.id, roleName });
      this.loadData();
    } catch (err) {}
  }

  async deleteRole(role: Role) {
    try {
      const roleName = window.prompt("roleName");
      await cqClient.command("role.deleteRole", { id: role.id });
      this.loadData();
    } catch (err) {}
  }
}
</script>
