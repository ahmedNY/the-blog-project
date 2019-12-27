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
            <button @click="newRole()" class="btn btn-primary float-left btn-sm">إضافة</button>
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
              class="btn btn-primary btn-sm mx-1"
            >عرض</router-link>
            <button @click="editRole(role)" class="btn btn-primary btn-sm mx-1">تعديل</button>
            <button @click="removeRole(role)" class="btn btn-danger btn-sm mx-1">حذف</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal -->
    <b-modal ref="addRoleModal" id="addRoleModal" title="إضافة دور" @ok="saveRole()">
      <form>
        <div class="form-group">
          <label>الإسم</label>
          <input type="text" class="form-control" v-model="currentRole.roleName" />
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { cqClient } from "@/lib/cqClient";
import { Role } from "@/modules/um/models/role.model";

@Component({})
export default class extends Vue {
  roleName: string = "";
  currentRole: Role = {
    roleName: ""
  };
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

  newRole() {
    this.currentRole = {
      id: 0,
      roleName: ""
    };
    this.$bvModal.show("addRoleModal");
  }

  editRole(role: Role) {
    this.currentRole = role;
    this.$bvModal.show("addRoleModal");
  }

  async saveRole() {
    try {
      if (this.currentRole.id === 0) {
        await cqClient.command("role.addRole", {
          roleName: this.currentRole.roleName
        });
      } else {
        await cqClient.command("role.updateRole", {
          roleId: this.currentRole.id,
          roleName: this.currentRole.roleName
        });
      }
      this.loadData();
    } catch (err) {}
  }

  async removeRole(role: Role) {
    try {
      const ok = confirm("هل أنت متأكد من أنك تريد حذف الدور");
      if (!ok) {
        return;
      }
      await cqClient.command("role.removeRole", { id: role.id });
      this.loadData();
    } catch (err) {
      alert("could not delete role");
    }
  }
}
</script>
