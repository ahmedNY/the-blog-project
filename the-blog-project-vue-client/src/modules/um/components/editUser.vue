<template>
  <div>
    <b-breadcrumb class="d-print-none">
      <b-breadcrumb-item to="/" text="البداية" />
      <b-breadcrumb-item to="/um" text="إدارة المستخدمين" />
      <b-breadcrumb-item to="/um/showUsers" text="قائمة المستخدمين" />
      <b-breadcrumb-item to="/um/editUser" :active="true" v-if="isNew()" text="إضافة مستخدم" />
      <b-breadcrumb-item to="/um/editUser" :active="true" v-else text="تعديل مستخدم" />
    </b-breadcrumb>
    <h5 v-if="isNew()">إضافة مستخدم</h5>
    <h5 v-else>تعديل مستخدم</h5>
    <hr />
    <div class="container">
      <form @submit="saveRecord()">
        <div class="form-group row">
          <label for="mobileNumber" class="col-sm-3 col-form-label">الموبايل</label>
          <div class="col-sm-9">
            <input
              type="text"
              class="form-control"
              v-model="user.mobileNumber"
              id="mobileNumber"
              placeholder
              v-if="isNew()"
            />
            <input
              type="text"
              class="form-control"
              v-model="user.mobileNumber"
              id="mobileNumber"
              placeholder
              readonly
              v-else
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="الإسم" class="col-sm-3 col-form-label">الإسم</label>
          <div class="col-sm-9">
            <input
              type="text"
              class="form-control"
              v-model="user.displayName"
              id="الإسم"
              placeholder
            />
          </div>
        </div>
        <div class="form-group row" v-if="isNew()">
          <label for="password" class="col-sm-3 col-form-label">كلمة المرور</label>
          <div class="col-sm-9">
            <input
              type="password"
              class="form-control"
              v-model="user.password"
              id="password"
              placeholder
            />
          </div>
        </div>
        <div class="form-group row" v-if="isNew()">
          <label for="inputName" class="col-sm-3 col-form-label">تأكيد كلمة المرور</label>
          <div class="col-sm-9">
            <input
              type="password"
              class="form-control"
              v-model="user.password2"
              id="inputName"
              placeholder
            />
          </div>
        </div>
        <hr />
        <div class="form-group row">
          <div class="offset-sm-3 col-sm-9">
            <button type="submit" class="btn btn-primary btn-sm">حفظ</button>
            <router-link to="/um/showUsers" class="btn btn-warning btn-sm mx-2">إلغاء</router-link>
          </div>
        </div>
        <hr />
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { User } from "../models/user.model";
import { cqClient } from "../../../lib/cqClient";

@Component({})
export default class EdutUser extends Vue {
  user: User = {};
  isNew() {
    return Number(this.$route.query.userId) === 0;
  }
  created() {
    if (this.isNew()) {
      this.newRecord();
    } else {
      this.loadRecord();
    }
  }
  newRecord() {
    this.user = {
      mobileNumber: "",
      displayName: "",
      password: ""
    };
  }
  async loadRecord() {
    try {
      const userId = Number(this.$route.query.userId);
      this.user = await cqClient.query(`user.findById?userId=${userId}`);
    } catch (err) {
      window.alert("لم تكتمل عملية البحث عن المستخدم");
    }
  }
  async saveRecord() {
    try {
      if (this.isNew()) {
        await cqClient.command(`user.addUser`, this.user);
      } else {
        await cqClient.command(`user.updateUser`, this.user);
      }
      this.$router.push(`/um/showUsers`);
    } catch (err) {
      window.alert("لم تتم عملية إضافة المستخدم بنجاح");
    }
  }
}
</script>