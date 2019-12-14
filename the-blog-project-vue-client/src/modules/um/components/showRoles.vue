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
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="role in roles" :key="role.id">
          <td scope="row">{{role.id}}</td>
          <td>{{role.roleName}}</td>
          <td></td>
          <td></td>
          <td nowrap>
            <button class="btn btn-primary btn-sm mx-2">تعديل</button>
            <button class="btn btn-danger btn-sm">حذف</button>
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
    try {
      this.roles = await cqClient.query("role.findAll");
    } catch (err) {
      console.log(err);
    }
  }
}
</script>
