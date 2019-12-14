<template>
  <b-navbar toggleable="md" type="dark" class="navbar-light">
    <b-container>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item to="/um/showUsers">المستخدمين</b-nav-item>
          <li class="nav-seperator"></li>
          <b-nav-item to="/um/showRoles">الأدوار</b-nav-item>
          <b-nav-item to="/um/showPermissions">الصلاحيات</b-nav-item>
          <li class="nav-seperator"></li>
          <b-nav-item-dropdown right text="التقارير" seperate>
            <b-dropdown-item to="/um/showLoginReports">سجل الدخول</b-dropdown-item>
            <b-dropdown-item to="/um/showActivityLog">سجل العمليات</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-container>
  </b-navbar>
</template>