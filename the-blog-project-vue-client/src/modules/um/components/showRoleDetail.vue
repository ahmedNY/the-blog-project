<template>
  <div>
    <b-breadcrumb class="d-print-none">
      <b-breadcrumb-item to="/" text="البداية" />
      <b-breadcrumb-item to="/um" text="إدارة المستخدمين" />
      <b-breadcrumb-item to="/um/showRoles" text="قائمة الأدوار" />
      <b-breadcrumb-item :active="true" text="معلومات الدور" />
    </b-breadcrumb>

    <h5>معلومات الدور: {{role.roleName}}</h5>
    <hr />

    <table class="table table-sm table-inverse">
      <tbody>
        <tr>
          <th class="bg-light">ID</th>
          <td>{{role.id}}</td>
        </tr>
        <tr>
          <th class="bg-light">الإسم</th>
          <td>{{role.roleName}}</td>
        </tr>
        <tr>
          <th class="bg-light">عدد الصلاحيات</th>
          <td>{{role.permissions.length}}</td>
        </tr>
        <tr>
          <th class="bg-light">عدد المستخدمين</th>
          <td>{{role.users.length}}</td>
        </tr>
        <tr>
          <th>&nbsp;</th>
          <td>
            <span class="float-left">
              <button class="btn btn-primary btn-sm mx-2">تعديل</button>
              <button class="btn btn-danger btn-sm">حذف</button>
            </span>
          </td>
        </tr>
      </tbody>
    </table>

    <h5 class="bg-light py-2">الصلاحيات</h5>
    <table class="table table-sm table-inverse">
      <thead class="thead-inverse">
        <tr>
          <th class="bg-light">الموديول</th>
          <th class="bg-light">الصلاحية</th>
          <th class="bg-light">
            <button class="btn btn-primary btn-sm float-left">إضافة</button>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="permission in role.permissions" :key="permission.id">
          <td>{{permission.module.moduleName}}</td>
          <td>{{permission.action}}:{{permission.resource}}</td>
          <td align="left">
            <button type="button" class="btn btn-danger btn-sm">حذف</button>
          </td>
        </tr>
      </tbody>
    </table>

    <h5 class="bg-light py-2">المستخدمين</h5>
    <table class="table table-sm table-inverse">
      <thead class="thead-inverse">
        <tr>
          <th class="bg-light">ID</th>
          <th class="bg-light">اسم المستخدم</th>
          <th class="bg-light"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in role.users" :key="user.id">
          <td>{{user.id}}</td>
          <td>
            {{user.displayName}}
            <br />
            {{user.mobileNumber}}
          </td>
          <td align="left">
            <button @click="removeUser(user)" class="btn btn-danger btn-sm">حذف</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Role } from "../models/role.model";
import { cqClient } from "../../../lib/cqClient";

@Component({})
export default class extends Vue {
  role: Role = {};
  created() {
    this.loadData();
  }

  /** role related */
  async loadData() {
    try {
      const roleId = Number(this.$route.query.roleId);
      this.role = await cqClient.query(`role.findById?roleId=${roleId}`);
    } catch (err) {}
  }
  async updateRole() {
    try {
      const roleId = Number(this.$route.query.roleId);
      const roleName = window.prompt("roleName");
      await cqClient.command("role.updateRole", { id: roleId, roleName });
      this.loadData();
    } catch (err) {}
  }
  async deleteRole() {
    try {
      const roleId = Number(this.$route.query.roleId);
      const roleName = window.prompt("roleName");
      await cqClient.command("role.deleteRole", { id: roleId });
      this.loadData();
    } catch (err) {}
  }
  /** user related */
  addUser() {}
  removeUser() {}
  /** permission related */
  addPermission() {}
  removePermission() {}
}
</script>