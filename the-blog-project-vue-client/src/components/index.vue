<template>
  <div>
    <h3>مرحبا بك في برنامج المدونة</h3>
    <hr />
    <p>
      هذا المشروع به واجهات كاملة و ميزات مكتملة لإضافة وتعديل وحذف المقالات داخل المدونة
      <br />
      <br />بالإضافة لنظام مستخدمين متكامل بالصلاحيات والأدوار يمكن للمستخدم التحكم بها
      <br />
      <br />الغرض من المشروع أن يكون مثال مرجعي يمكن استخدامه في تصميم انظمة اخري
    </p>
    <h5 class="bg-light p-3">قائمة الأقسام</h5>
    <ul class="list-group p-0">
      <li class="list-group-item">
        <router-link :to="`/blog/`">المدونة</router-link>
      </li>
      <li class="list-group-item">
        <router-link :to="`/um/`">إدارة المستخدمين</router-link>
      </li>
    </ul>
  </div>
</template>