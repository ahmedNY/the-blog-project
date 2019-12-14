<template>
  <div>
    <b-breadcrumb class="d-print-none">
      <b-breadcrumb-item to="/" text="البداية" />
      <b-breadcrumb-item to="/blog" text="المدونة" />
      <b-breadcrumb-item to="/blog" text="قائمة المقالات" />
      <b-breadcrumb-item :active="true" text="تفاصيل المقال" />
    </b-breadcrumb>

    <h5>#{{post.id}} - {{post.title}}</h5>
    <hr />
    <p>{{post.body}}</p>
    <h5 class="bg-light py-2">الصور</h5>
    <h5 class="bg-light py-2">تفاصيل اخري</h5>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { cqClient } from "@/lib/cqClient";
import { Post } from "../models/post.model";

@Component({})
export default class ShowPostDetail extends Vue {
  post: Post = {};

  created() {
    this.findData();
  }

  async findData() {
    try {
      const postId = this.$route.query.postId;
      this.post = await cqClient.query(`post.findById?postId=${postId}`);
    } catch (err) {
      console.log(err);
    }
  }
}
</script>