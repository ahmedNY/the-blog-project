<template>
  <div class="d-none d-print-block">
    <h3>{{basicInfo.company_name}}</h3>
    <small class="text-muted">
      <i class="fa fa-map-marker"></i> {{basicInfo.company_address}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <i class="fa fa-phone"></i> {{basicInfo.mobile_no}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <i class="fa fa-at"></i> {{basicInfo.email}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <i class="fa fa-globe"></i> {{basicInfo.website}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    </small>
    <hr>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import db from '@/models/db'

var basicInfo = {}
var loaded = false

export default {
  data: function () {
    return {
      basicInfo
    }
  },
  computed: mapState([
    'settingsBasicInfo'
  ]),
  created: async function () {
    if (!loaded) {
      loaded = true
      this.basicInfo = basicInfo = await db.fetchDocument('settings/basic_info')
      console.log('loaded basicInfo from backend')
    }
  }
}
</script>