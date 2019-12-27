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
            <button @click="showNewModuleForm" class="btn btn-primary btn-sm mx-2 float-left">إضافة</button>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="module in modules" :key="module.id">
          <td scope="row">{{module.id}}</td>
          <td>{{module.moduleName}}</td>
          <td>
            <div
              v-for="permission in module.permissions"
              class="badge badge-info m-1"
              :key="permission.id"
            >{{permission.action}}:{{permission.resource}}</div>
          </td>
          <td align="left" nowrap>
            <router-link></router-link>
            <button @click="showEditModuleForm(module)" class="btn btn-primary btn-sm mx-2">تعديل</button>
            <button @click="removeModule(module)" class="btn btn-danger btn-sm">حذف</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Edit Module Modal -->
    <b-modal ref="editModuleModal" id="editModuleModal" title="تعديل موديول" @ok="saveModule()">
      <form v-if="currentModule">
        <div class="form-group">
          <label>Module</label>
          <input type="text" class="form-control" v-model="currentModule.moduleName" />
        </div>
      </form>
    </b-modal>

    <!-- Edit Permission Modal -->
    <b-modal
      ref="editPermissionModal"
      id="editRoleModal"
      title="تعديل الصلاحية"
      @ok="savePermission()"
    >
      <form v-if="currentPermission">
        <div class="form-group">
          <label>Action</label>
          <input type="text" class="form-control" v-model="permission.action" />
        </div>
        <div class="form-group">
          <label>Resource</label>
          <input type="text" class="form-control" v-model="permission.resource" />
        </div>
      </form>
    </b-modal>
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
  currentModule: Module = null;
  currentPermission: Permission = null;
  async created() {
    this.loadData();
  }
  async loadData() {
    try {
      this.modules = await cqClient.query("module.findAll");
    } catch (err) {
      console.log(err);
    }
  }
  // module crud
  showEditModuleForm(module: Module) {
    this.currentModule = module;
    this.$bvModal.show("editModuleModal");
  }
  showNewModuleForm() {
    this.currentModule = {
      id: 0,
      moduleName: ""
    };
    this.$bvModal.show("editModuleModal");
  }
  saveModule() {
    try {
      if (this.currentModule.id === 0) {
        cqClient.command("module.insertModule", this.currentModule);
      } else {
        cqClient.command("module.updateModule", this.currentModule);
      }
    } catch (err) {
      console.log(err);
    }
  }
  removeModule(module: Module) {
    try {
      cqClient.command("module.removeModule", { moduleId: module.id });
    } catch (err) {
      console.log(err);
    }
  }
  // permissions crud
  showNewPermissionForm() {
    this.currentPermission = {
      id: 0,
      action: "",
      resource: ""
    };
  }
  showEditPermissionform(permission: Permission) {
    this.currentPermission = permission;
  }
  savePermission() {
    try {
      if (this.currentModule.id === 0) {
        cqClient.command("permission.insertPermission", this.currentModule);
      } else {
        cqClient.command("permission.updatePermission", this.currentModule);
      }
    } catch (err) {
      console.log(err);
    }
  }
  removePermission() {
    try {
      cqClient.command("permission.removePermission", this.currentModule);
    } catch (err) {
      console.log(err);
    }
  }
}
</script>
