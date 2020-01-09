<template>
  <div>
    <h5 class="bg-light py-2">بيانات المستخدم</h5>

    <table class="table table-sm table-inverse">
      <tbody>
        <tr>
          <th>الاسم</th>
          <td>{{user.displayName}}</td>
        </tr>
        <tr>
          <th>رقم الموبايل</th>
          <td>{{user.mobileNumber}}</td>
        </tr>
        <tr>
          <th>تاريخ الإنشاء</th>
          <td>{{user.createdAt}}</td>
        </tr>
      </tbody>
    </table>

    <h5 class="bg-light py-2">الأدوار</h5>
    <table class="table table-sm table-inverse">
      <tbody>
        <tr v-for="role in roles" :key="role.id">
          <td>{{role.roleName}}</td>
        </tr>
      </tbody>
    </table>

    <h5 class="bg-light py-2">الصلاحيات</h5>
    <table class="table table-sm table-inverse">
      <thead>
        <tr>
          <th>Module</th>
          <th>Permission</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="permission in permissions" :key="permission.id">
          <td>{{permission.module.moduleName}}</td>
          <td>{{permission.action}}:{{permission.resource}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Role } from "@/modules/um/models/role.model";
import { cqClient } from "../../../lib/cqClient";
import { User } from "@/modules/um/models/user.model";

@Component({})
export default class extends Vue {
  get user(): User {
    return this.$store.state.user;
  }
  get roles(): User {
    return this.$store.state.roles;
  }
  get permissions(): User {
    return this.$store.state.permissions;
  }
}
</script>