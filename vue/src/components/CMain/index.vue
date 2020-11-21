<template>
  <el-container class="CMain">
    <CDrawer/>
    <el-container>
      <el-header>
        <CNavbar />
      </el-header>
      <el-main>
        <transition name="fade" mode="out-in">
          <router-view />
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import CDrawer from '@/components/CMain/CDrawer'
import CNavbar from '@/components/CMain/CNavbar'
export default {
  name: 'CMain',
  components: {
    CDrawer,
    CNavbar
  }
}
</script>

<style lang="scss" scoped>
.CMain {
  height: 100%;
  .el-aside {
    background-color: #304156;
    display:inline-block;
    width:auto;
    height:auto;
  }

  .el-header {
    color: #333;
    line-height: 60px;
    outline: none;
    padding: 0;
  }
  .el-main {
    border-top: solid 1px #EEEEEE;
  }
}

// fade
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.28s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
