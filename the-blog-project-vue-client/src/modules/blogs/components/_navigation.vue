<template>
  <b-navbar toggleable="md" type="dark" class="navbar-light">
    <b-container>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item to="/blog/posts">المقالات</b-nav-item>
          <li class="nav-seperator"></li>
          <b-nav-item to="/blog/categories">التصنيفات</b-nav-item>
          <b-nav-item to="/blog/comments">التعليقات</b-nav-item>
          <li class="nav-seperator"></li>
          <b-nav-item-dropdown right text="التقارير" seperate>
            <b-dropdown-item to="/blog/posts">المقالات الغير منشورة</b-dropdown-item>
            <b-dropdown-item to="/blog/posts">المقالات المشورة</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-container>
  </b-navbar>
</template>