<template>
  <section class="CHeader">
    <el-row v-if="!pPlaceholder" type="flex" justify="end">
      <el-button type="primary" icon="plus" @click="pShowSaveDialog">新增</el-button>
      <el-button type="danger" icon="plus" @click="pRemoveBatchClick">批量删除</el-button>
    </el-row>
    <el-row v-else :gutter="20">
      <el-col :span="10">
        <el-input type="text" clearable label="搜索" v-model="skey" :placeholder="pPlaceholder"/>
      </el-col>
      <el-col :span="6">
        <el-button type="success" icon="plus" @click="fSearchClick">搜索</el-button>
      </el-col>
      <el-col :span="8">
        <el-row type="flex" justify="end">
          <el-button type="primary" icon="plus" @click="pShowSaveDialog">新增</el-button>
          <el-button type="danger" icon="plus" @click="pRemoveBatchClick">批量删除</el-button>
        </el-row>
      </el-col>
    </el-row>
  </section>
</template>

<script>
export default {
  name: 'CHeader',
  props: {
    pPlaceholder: String,
    pShowSaveDialog: Function,
    pRemoveBatchClick: Function
  },
  data () {
    return {
      skey: ''
    }
  },
  methods: {
    fSearchClick () {
      this.$emit('fSearchClick', this.skey)
    }
  }
}
</script>

<style scoped>

</style>
