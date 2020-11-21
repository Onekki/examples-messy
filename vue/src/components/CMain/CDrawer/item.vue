<template>
  <section class="CMenuItem">
      <template v-for="item in pRoutes">
        <template v-if="item.children">
          <router-link v-if="item.children.length === 1 && !item.children[0].children"
                       :to="item.path + '/' + item.children[0].path"
                       :key="item.children[0].path">
            <el-menu-item class="CLonelyMenu"
                          :index="item.path + item.children[0].path">
              <i :class=item.children[0].icon></i>
              <span slot="title">{{item.children[0].name}}</span>
            </el-menu-item>
          </router-link>

          <template v-else>
            <el-submenu :index="item.path"
                        :key="item.path">
              <template  slot="title">
                <i :class=item.icon></i>
                <span id="span" slot="title">{{item.name}}</span>
              </template >
              <template v-for="child in item.children">
                <CMenuItem class="CMenuItemNest"
                           v-if="child.children"
                           :routes="[child]"
                           :key="child.path"></CMenuItem>
                <router-link v-else
                             :to="item.path + '/' + child.path"
                             :key="child.path">
                  <el-menu-item class="CLonelyMenu" :index="item.path + child.path" :key="child.path">
                    <i :class=child.icon></i>
                    <span slot="title">{{child.name}}</span>
                  </el-menu-item>
                </router-link>
              </template>
            </el-submenu>
          </template>
        </template>
      </template>
  </section>
</template>

<script>
export default {
  name: 'CMenuItem',
  props: {
    pRoutes: Array
  }
}
</script>

<style lang="scss" scoped>
.CMenuItem {
  a {
    text-decoration: none;
  }
  /deep/ .active {
    color: #409EFF!important;
  }
  .el-submenu {
    .el-menu-item {
      background-color: #1f2d3d !important;
      &:hover {
        background-color: #001528 !important;
      }
    }
    .router-link-active {
      color: #409EFF!important;
    }
  }
}
</style>
