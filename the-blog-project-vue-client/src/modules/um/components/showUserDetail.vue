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

    <h5 class="bg-light py-2">
      الأدوار
      <button v-b-modal.addRoleModal class="btn btn-primary btn-sm float-left mx-1">إضافة</button>
    </h5>
    <table class="table table-sm table-inverse">
      <tbody>
        <tr v-for="role in user.roles" :key="role.id">
          <td>{{role.roleName}}</td>
          <td align="left">
            <button class="btn btn-danger btn-sm" @click="removeRole(role)">حذف</button>
          </td>
        </tr>
      </tbody>
    </table>

    <h5 class="bg-light py-2">الصلاحيات</h5>
    <table class="table table-sm table-inverse">
      <thead>
        <tr>
          <th>Role</th>
          <th>Module</th>
          <th>Permission</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="role in user.roles" :key="role.id">
          <td>{{role.roleName}}</td>
          <td>
            <div
              v-for="permission in role.permissions"
              :key="permission.id"
            >{{permission.module.moduleName}}</div>
          </td>
          <td>
            <div
              v-for="permission in role.permissions"
              :key="permission.id"
            >{{permission.action}}:{{permission.resource}}</div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal -->
    <b-modal id="addRoleModal" title="إضافة دور للمستخدم" @ok="addRole()">
      <form>
        <div class="form-group">
          <select class="form-control" v-model="selectedRole">
            <option v-for="role in availableRoles" :key="role.id" :value="role">{{role.roleName}}</option>
          </select>
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Role } from "../models/role.model";
import { cqClient } from "../../../lib/cqClient";
import { User } from "../models/user.model";

@Component({})
export default class extends Vue {
  user: User = {};
  roles: Role[] = [];
  selectedRole: Role = null;

  created() {
    this.loadRecord();
  }

  get availableRoles() {
    if (!this.user.roles) {
      return [];
    }
    return this.roles.filter(role => {
      return !this.user.roles.find(ur => ur.id === role.id);
    });
  }

  async loadRecord() {
    try {
      const userId = this.$route.query.userId;
      this.user = await cqClient.query(`user.findById?userId=${userId}`);
      this.roles = await cqClient.query(`role.findAll`);
    } catch (err) {
      console.log(err);
    }
  }
  async removeRole(role: Role) {
    try {
      const userId = this.$route.query.userId;
      const result = await cqClient.command(`user.removeRole`, {
        userId: userId,
        roleId: role.id
      });
      this.loadRecord();
    } catch (err) {
      alert("could not remove role");
      console.log(err);
    }
  }

  async addRole() {
    try {
      if (!this.selectedRole) {
        return;
      }
      const userId = this.$route.query.userId;
      const result: any = await cqClient.command(`user.addRole`, {
        userId: userId,
        roleId: this.selectedRole.id
      });
      this.loadRecord();
      if (!result.success) {
        alert("could not add role");
      }
    } catch (err) {
      alert("could not add role");
      console.log(err);
    }
  }
}
</script>