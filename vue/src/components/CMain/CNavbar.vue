<template>
  <section class="CNavbar">
    <el-menu mode="horizontal">
      <el-menu-item>
        <CHamburger :p-toggle-drawer="fToggleDrawer"
                    :p-drawer-collapse="!gDrawerCollapse" />
      </el-menu-item>
      <el-menu-item>
        <CBreadcrumb />
      </el-menu-item>
    </el-menu>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import CBreadcrumb from '@/components/CMain/CBreadcrumb'
import CHamburger from '@/components/CMain/CHamburger'

export default {
  name: 'CNavbar',
  components: {
    CBreadcrumb,
    CHamburger
  },
  computed: {
    ...mapGetters([
      'gDrawerCollapse'
    ])
  },
  methods: {
    fToggleDrawer () {
      this.$store.dispatch('aToggleDrawer')
    }
  }
}
</script>

<style lang="scss" scoped>
.CNavbar {
  height: 50px;
  .CHamburger {
    float: left;
  }
}
</style>
