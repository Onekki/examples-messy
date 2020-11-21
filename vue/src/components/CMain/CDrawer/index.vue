<template>
  <el-menu class="CDrawer"
           mode="vertical"
           unique-opened
           :default-active="$route.path"
           :collapse="!gDrawerCollapse"
           background-color="#304156"
           text-color="#fff"
           active-text-color="#409EFF">
    <CMenuItem :p-routes="gUserRoutes"></CMenuItem>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import CMenuItem from '@/components/CMain/CDrawer/item'

export default {
  name: 'CDrawer',
  components: {
    CMenuItem
  },
  computed: {
    ...mapGetters([
      'gUserRoutes',
      'gDrawerCollapse'
    ])
  }
}
</script>

<style lang="scss" scoped>
.CDrawer {
  border: none;
  width: 180px!important;
  min-width: 180px;
  transition: min-width;
  overflow: hidden;
}

.el-menu--collapse {
  min-width: 60px;
  width:60px!important;
  transition: min-width;
  background-color: #B3C0D1;
  color: #304156;
  /deep/ span {
    color: transparent;
  }
  /deep/ .el-submenu__icon-arrow {
    display: none;
  }
}
</style>
