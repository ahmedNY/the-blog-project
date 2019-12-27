<template>
  <div v-if="role">
    <b-breadcrumb class="d-print-none">
      <b-breadcrumb-item to="/" text="البداية" />
      <b-breadcrumb-item to="/um" text="إدارة المستخدمين" />
      <b-breadcrumb-item to="/um/showRoles" text="قائمة الأدوار" />
      <b-breadcrumb-item :active="true" text="معلومات الدور" />
    </b-breadcrumb>

    <h5>معلومات الدور:</h5>

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
              <button v-b-modal.editRoleModal class="btn btn-primary btn-sm mx-2">تعديل</button>
              <button @click="removeRole()" class="btn btn-danger btn-sm">حذف</button>
            </span>
          </td>
        </tr>
      </tbody>
    </table>

    <h5 class="bg-light py-2">الصلاحيات</h5>
    <table class="table table-sm table-inverse">
      <thead class="thead-inverse">
        <tr>
          <th class="bg-light">ID</th>
          <th class="bg-light">الموديول</th>
          <th class="bg-light">الصلاحية</th>
          <th class="bg-light">
            <button v-b-modal.addPermissionModal class="btn btn-primary btn-sm float-left">إضافة</button>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="permission in role.permissions" :key="permission.id">
          <td>{{permission.id}}</td>
          <td>{{permission.module.moduleName}}</td>
          <td>{{permission.action}}:{{permission.resource}}</td>
          <td align="left">
            <button @click="removePermission(permission)" class="btn btn-danger btn-sm">حذف</button>
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

    <!-- Edit Role Modal -->
    <b-modal ref="editRoleModal" id="editRoleModal" title="تعديل دور" @ok="saveRole()">
      <form>
        <div class="form-group">
          <label>الإسم</label>
          <input type="text" class="form-control" v-model="role.roleName" />
        </div>
      </form>
    </b-modal>

    <!-- Edit Role Modal -->
    <b-modal
      ref="addPermissionModal"
      id="addPermissionModal"
      title="إضافة صلاحيات"
      @ok="addPermission()"
    >
      <form>
        <div class="form-group">
          <label for>اختر الصلاحية</label>
          <select class="form-control" v-model="selectedPermission">
            <option
              v-for="permission in availablePermissions"
              :key="permission.id"
              :value="permission"
            >{{permission.module.moduleName}}/{{permission.action}}:{{permission.resource}}</option>
          </select>
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Role } from "../models/role.model";
import { cqClient } from "../../../lib/cqClient";
import { Permission } from "../models/permission.model";

@Component({})
export default class extends Vue {
  role: Role = null;
  permissions: Permission[] = [];
  selectedPermission: Permission = null;
  get availablePermissions() {
    if (!this.role || !this.permissions) {
      return [];
    }
    return this.permissions.filter(permission => {
      return !this.role.permissions.find(rp => {
        return String(rp.id) === String(permission.id);
      });
    });
  }

  created() {
    this.loadData();
  }

  /** role related */
  async loadData() {
    try {
      const roleId = Number(this.$route.query.roleId);
      this.role = await cqClient.query(`role.findById?roleId=${roleId}`);
      this.permissions = await cqClient.query(`permission.findAll`);
    } catch (err) {}
  }
  async saveRole() {
    try {
      const roleId = Number(this.$route.query.roleId);
      const roleName = this.role.roleName;
      await cqClient.command("role.updateRole", { roleId, roleName });
      this.loadData();
    } catch (err) {}
  }
  async removeRole() {
    try {
      const ok = confirm("هل أنت متأكد من أنك تريد حذف الدور?");
      if (!ok) {
        return;
      }
      const roleId = Number(this.$route.query.roleId);
      await cqClient.command("role.removeRole", { roleId });
      this.$router.push("/um/showRoles");
    } catch (err) {}
  }
  /** user related */
  addUser() {}
  removeUser() {}
  /** permission related */
  async addPermission(permission: Permission) {
    try {
      await cqClient.command("role.addPermission", {
        roleId: this.role.id,
        permissionId: this.selectedPermission.id
      });
      this.loadData();
    } catch (err) {
      console.log(err);
      window.alert("could not add permission");
    }
  }
  async removePermission(permission: Permission) {
    try {
      await cqClient.command("role.removePermission", {
        roleId: this.role.id,
        permissionId: permission.id
      });
      this.loadData();
    } catch (err) {
      console.log(err);
      window.alert("could not remove permission");
    }
  }
}
</script>