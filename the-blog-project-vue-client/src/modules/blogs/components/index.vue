<template>
  <div>
    <b-breadcrumb class="d-print-none">
      <b-breadcrumb-item to="/" text="البداية" />
      <b-breadcrumb-item to="/blog" text="المدونة" />
      <b-breadcrumb-item :active="true" text="قائمة المقالات" />
    </b-breadcrumb>

    <h3>قائمة المقالات</h3>
    <table class="table">
      <thead>
        <tr>
          <th>#</th>
          <th>المقال</th>
          <th align="left">
            <button @click="newRecord()" class="btn btn-success btn-sm float-left">إضافة</button>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="post in posts" :key="post.id">
          <td scope="row">{{post.id}}</td>
          <td>{{post.title}}</td>
          <td align="left" nowrap>
            <router-link
              :to="`/blog/showPostDetail?postId=${post.id}`"
              class="btn btn-primary btn-sm mx-2"
            >عرض</router-link>
            <button @click="editRecord(post.id)" class="btn btn-primary btn-sm">تعديل</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { cqClient } from "@/lib/cqClient";
import { Post } from "../models/post.model";

@Component({})
export default class Index extends Vue {
  posts: Post[] = [];

  created() {
    this.findData();
  }

  async findData() {
    try {
      this.posts = await cqClient.query("post.findAll");
    } catch (err) {
      console.log(err);
    }
  }

  newRecord() {
    this.$router.push(`/blog/editPost?postId=0`);
  }

  editRecord(id: number) {
    this.$router.push(`/blog/editPost?postId=${id}`);
  }

  async deleteRecord(id: number) {
    try {
      await cqClient.command(`post.deletePost`, { postId: id });
    } catch (err) {
      window.alert("لم يتم حذف السجل");
    }
  }
}
</script>