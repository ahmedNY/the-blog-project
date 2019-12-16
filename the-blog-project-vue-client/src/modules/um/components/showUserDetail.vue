<template>
  <div>
    <h5>بيانات المستخدم: {{user.displayName}}</h5>
    <br />

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
      <thead class="thead-inverse">
        <tr>
          <th></th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td scope="row"></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>

    <h5 class="bg-light py-2">الصلاحيات</h5>
    <table class="table table-sm table-inverse">
      <thead class="thead-inverse">
        <tr>
          <th></th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td scope="row"></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Role } from "../models/role.model";
import { cqClient } from "../../../lib/cqClient";
import { User } from "../models/user.model";

@Component({})
export default class extends Vue {
  user: User = {};

  created() {
    this.loadRecord();
  }

  async loadRecord() {
    try {
      const userId = this.$route.query.userId;
      this.user = await cqClient.query(`user.findById?userId=${userId}`);
    } catch (err) {
      console.log(err);
    }
  }
}
</script>