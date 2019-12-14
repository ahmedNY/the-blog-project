<template>
  <div>
    <b-breadcrumb class="d-print-none">
      <b-breadcrumb-item to="/" text="البداية" />
      <b-breadcrumb-item to="/blog" text="المدونة" />
      <b-breadcrumb-item to="/blog" text="قائمة المقالات" />
      <b-breadcrumb-item :active="true" text="إضافة او تعديل مقال" />
    </b-breadcrumb>

    <div class="container">
      <form @submit.prevent="saveRecord()">
        <div class="form-group row">
          <label for="inputName" class="col-sm-3 col-form-label">العنوان</label>
          <div class="col-sm-9">
            <input
              v-model="post.title"
              type="text"
              class="form-control"
              name="inputName"
              id="inputName"
              placeholder
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="body" class="col-sm-3 col-form-label">النص</label>
          <div class="col-sm-9">
            <textarea v-model="post.body" class="form-control" name="body" id="body" rows="6"></textarea>
          </div>
        </div>
        <div class="form-group row">
          <div class="offset-sm-3 col-sm-9">
            <button type="submit" class="btn btn-primary">حفظ</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { cqClient } from "@/lib/cqClient";
import { Post } from "../models/post.model";
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class PostEditComponent extends Vue {
  post: Post = {};

  created() {
    console.log("created");
    const postId = Number(this.$route.query.postId);
    if (postId == 0) {
      this.newRecord();
    } else {
      this.loadRecord(postId);
    }
  }

  async newRecord() {
    this.post = {
      title: "",
      body: ""
    };
  }

  async loadRecord(postId: number) {
    try {
      this.post = await cqClient.query(`post.findById?postId=${postId}`);
    } catch (err) {
      alert("could not load record");
    }
  }

  async saveRecord() {
    try {
      let response: any;
      if (this.post.id > 0) {
        response = await cqClient.command("post.updatePost", this.post);
      } else {
        response = await cqClient.command("post.insertPost", this.post);
      }
      this.$router.push(`/blog/showPostDetail?postId=${response.id}`);
    } catch (err) {
      console.log(err);
      window.alert("Could not save record");
    }
  }
}
</script>