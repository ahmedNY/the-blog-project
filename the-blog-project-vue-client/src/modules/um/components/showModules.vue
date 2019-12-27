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
            <button
              @click="showNewModuleForm()"
              class="btn btn-primary btn-sm mx-2 float-left"
            >إضافة</button>
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
              @click="showEditPermissionForm(permission)"
            >{{permission.action}}:{{permission.resource}}</div>
          </td>
          <td align="left" nowrap>
            <button
              @click="showNewPermissionForm(module)"
              class="btn btn-primary btn-sm mx-2"
            >إضافة صلاحية</button>
            <button @click="showEditModuleForm(module)" class="btn btn-primary btn-sm mx-2">تعديل</button>
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
      <template v-slot:modal-footer="{ ok, cancel, hide }">
        <!-- Emulate built in modal footer ok and cancel button actions -->
        <b-button size="sm" variant="primary" @click="ok()">حفظ</b-button>
        <b-button size="sm" variant="warning" @click="cancel()">إلغاء</b-button>
        <!-- Button with custom close trigger value -->
        <b-button
          v-if="currentModule.id !== 0"
          size="sm"
          variant="danger"
          @click="removeModule(currentModule)"
        >حذف</b-button>
      </template>
    </b-modal>

    <!-- Edit Permission Modal -->
    <b-modal
      ref="editPermissionModal"
      id="editPermissionModal"
      title="إضافة / تعديل صلاحية"
      @ok="savePermission()"
    >
      <form v-if="currentPermission">
        <div class="form-group">
          <label>Action</label>
          <input type="text" class="form-control" v-model="currentPermission.action" />
        </div>
        <div class="form-group">
          <label>Resource</label>
          <input type="text" class="form-control" v-model="currentPermission.resource" />
        </div>
      </form>
      <template v-slot:modal-footer="{ ok, cancel, hide }">
        <!-- Emulate built in modal footer ok and cancel button actions -->
        <b-button size="sm" variant="primary" @click="ok()">حفظ</b-button>
        <b-button size="sm" variant="warning" @click="cancel()">إلغاء</b-button>
        <!-- Button with custom close trigger value -->
        <b-button
          v-if="currentPermission.id !== 0"
          size="sm"
          variant="danger"
          @click="removePermission(currentPermission)"
        >حذف</b-button>
      </template>
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
  showNewPermissionForm(module: Module) {
    this.currentModule = module;
    this.currentPermission = {
      id: 0,
      action: "",
      resource: ""
    };
    this.$bvModal.show("editPermissionModal");
  }
  showEditPermissionForm(permission: Permission) {
    this.currentPermission = permission;
    this.$bvModal.show("editPermissionModal");
  }
  async savePermission() {
    try {
      if (this.currentPermission.id === 0) {
        await cqClient.command(
          "permission.insertPermission",
          this.currentPermission
        );
      } else {
        await cqClient.command(
          "permission.updatePermission",
          this.currentPermission
        );
      }
      this.loadData();
    } catch (err) {
      console.log(err);
    }
  }
  removePermission() {
    try {
      cqClient.command("permission.removePermission", this.currentPermission);
    } catch (err) {
      console.log(err);
    }
  }
}
</script>
