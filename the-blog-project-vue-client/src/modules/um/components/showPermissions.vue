<template>
  <div>
    <b-breadcrumb class="d-print-none">
      <b-breadcrumb-item to="/" text="البداية" />
      <b-breadcrumb-item to="/um" text="إدارة المستخدمين" />
      <b-breadcrumb-item :active="true" text="قائمة الصلاحيات" />
    </b-breadcrumb>

    <h5 class="bg-light p-3">قائمة الصلاحيات</h5>
    <table class="table table-sm">
      <thead>
        <tr>
          <th>#</th>
          <th>الصلاحيات</th>
          <th>الأدوار</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="permission in permissions" :key="permission.id">
          <td scope="row">{{permission.id}}</td>
          <td>{{permission.action}}:{{permission.resource}}</td>
          <td></td>
          <td align="left" nowrap>
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
import { Permission } from "@/modules/um/models/permission.model";

@Component({})
export default class extends Vue {
  permissions: Permission[] = [];
  async created() {
    try {
      this.permissions = await cqClient.query("permission.findAll");
    } catch (err) {
      console.log(err);
    }
  }
}
</script>
