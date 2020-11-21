<template>
  <section class="CBreadcrumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <transition-group  name="breadcrumb">
        <el-breadcrumb-item v-for="item in levelList"
                            :key="item.name">
          <span v-if="levelList.length === 1">{{item.name}}</span>
          <router-link v-else
                       :to="item.path">{{item.name}}</router-link>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
  </section>
</template>

<script>
export default {
  name: 'CBreadcrumb',
  data () {
    return {
      levelList: []
    }
  },
  created () {
    this.doGetLevelList()
  },
  watch: {
    $route () {
      this.doGetLevelList()
    }
  },
  methods: {
    doGetLevelList () {
      let list = this.$route.matched.filter(item => item.name)
      this.levelList = list
    }
  }
}
</script>

<style lang="scss" scoped>
.CBreadcrumb {
  .el-breadcrumb {
    display: inline-block;
    font-size: 15px;
    line-height: 50px;
  }
}

// breadcrumb
.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all .5s;
}

.breadcrumb-enter,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(20px);
}

.breadcrumb-move {
  transition: all .5s;
}

.breadcrumb-leave-active {
  position: absolute;
}
</style>
