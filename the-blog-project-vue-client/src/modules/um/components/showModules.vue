<template>
  <div>
    <b-breadcrumb class="d-print-none">
      <b-breadcrumb-item to="/" text="البداية" />
      <b-breadcrumb-item to="/um" text="إدارة المستخدمين" />
      <b-breadcrumb-item :active="true" text="قائمة الموديلات" />
    </b-breadcrumb>

    <h5 class="bg-light p-3">قائمة الموديلات</h5>
    <table class="table table-sm">
      <thead>
        <tr>
          <th>#</th>
          <th>الموديول</th>
          <th>الصلاحيات</th>
          <th>
            <button class="btn btn-primary btn-sm mx-2 float-left">إضافة</button>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="module in modules" :key="module.id">
          <td scope="row">{{module.id}}</td>
          <td>{{module.moduleName}}</td>
          <td>
            <span
              v-for="permission in module.permissions"
              class="badge badge-info m-1"
              :key="permission.id"
            >{{permission.action}}:{{permission.resource}}</span>
          </td>
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
import { Module } from "../models/module.model";

@Component({})
export default class extends Vue {
  modules: Module[] = [];
  async created() {
    try {
      this.modules = await cqClient.query("module.findAll");
    } catch (err) {
      console.log(err);
    }
  }
}
</script>
