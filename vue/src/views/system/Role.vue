<template>
  <div class="VRole">
    <CHeader @fSearchClick="fSearchClick"
             :p-show-save-dialog="fShowSaveDialog" :p-remove-batch-click="fRemoveBatchClick"/>
    <el-table :data="dRoleListView"
              v-loading="dRoleListViewLoading && dPermListViewLoading" element-loading-text="拼命加载中" border fit>
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="序号" align="center" width="50" type="index" />

      <el-table-column prop="name" label="角色名" align="center" />
      <el-table-column label="权限列表" align="center" >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.name==='超级管理员'" type="success">全部</el-tag>
          <template v-else>
            <div  v-for="permView in dRoleListView[scope.$index].permViewSet" style="text-align: left"
                 :key=permView.title>
              <span>{{permView.title}}</span>
              <el-tooltip v-for="perm in permView.permSet"
                          :key="perm.id"
                          :content=perm.code>
                <el-tag>{{perm.name}}</el-tag>
              </el-tooltip>
            </div>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="操作"  align="center" width="160" fixed="right">
        <template slot-scope="scope">
          <el-button type="warning" icon="edit" size="mini"
                     @click="fShowUpdateDialog(scope.$index)">修改</el-button>
          <el-button type="danger" icon="delete" size="mini"
                     @click="fRemoveRole(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="dDialog.title[dDialog.current]"
               :visible.sync="dDialog.visible">
      <el-form :model="dRoleModel"
               label-position="left"
               label-width="80px">
        <el-form-item label="角色名" required>
          <el-input type="text" v-model="dRoleModel.name" />
        </el-form-item>
        <el-form-item label="权限" required>
          <div v-for="(permView, index) in dPermListView" :key="permView.title">
            <el-checkbox :indeterminate="dCheckBox.isIndeterminate[index]" border
                         v-model="dCheckBox.isAllChecked[index]"
                         @change="fCheckAllChange(index)">{{permView.title}}</el-checkbox>
            <el-checkbox-group v-model="dCheckBox.checkedPidSet[index]"
                               @change="fCheckGroupChange(index)">
              <el-checkbox v-for="(perm) in permView.permSet"
                           :label="perm.id"
                           :key="perm.id">{{perm.name}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dDialog.visible = false">取消</el-button>
          <el-button v-if="!dDialog.current" type="primary"
                     @click="fSaveRole">创建</el-button>
          <el-button v-else type="success"
                     @click="fUpdateRole">修改</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import CHeader from '@/components/CHeader'
import api from '@/api'

export default {
  name: 'Role',
  components: {
    CHeader
  },
  data () {
    return {
      dRoleListView: [],
      dPermListView: [],
      dRoleModel: {
        id: '',
        name: '',
        permViewSet: []
      },
      dRoleListViewLoading: false,
      dPermListViewLoading: false,
      dDialog: {
        visible: false,
        current: 0,
        title: ['创建', '修改']
      },
      dCheckBox: {
        isIndeterminate: [],
        isAllChecked: [],
        checkedPidSet: []
      }
    }
  },
  created () {
    this.fRoleListView()
    this.fPermListView()
  },
  methods: {
    fRoleListView () {
      this.dRoleListViewLoading = true
      api.system.role.LIST_VIEW().then(data => {
        this.dRoleListViewLoading = false
        this.dRoleListView = data
      })
    },
    fPermListView () {
      this.dPermListViewLoading = true
      api.system.perm.LIST_VIEW().then(data => {
        this.dPermListViewLoading = false
        this.dPermListView = data
        for (var i = 0; i < data.length; i++) {
          this.dCheckBox.isIndeterminate[i] = false
          this.dCheckBox.isAllChecked[i] = false
          this.dCheckBox.checkedPidSet[i] = []
        }
      })
    },
    fGenPidSet () {
      var pidSet = []
      for (const list of this.dCheckBox.checkedPidSet) {
        pidSet = pidSet.concat(list)
      }
      this.dRoleModel.pidSet = pidSet
    },
    fSaveRole () {
      this.fGenPidSet()
      api.system.role.SAVE(this.dRoleModel).then(() => {
        this.dDialog.visible = false
        this.fRoleListView()
      })
    },
    fUpdateRole () {
      this.fGenPidSet()
      api.system.role.UPDATE(this.dRoleModel).then(() => {
        this.dDialog.visible = false
        this.fRoleListView()
      })
    },
    fRemoveRole ($index) {
      const roleView = this.dRoleListView[$index]
      api.system.role.REMOVE(roleView.id).then(() => {
        this.fRoleListView()
      })
    },
    fShowSaveDialog () {
      this.dRoleModel = {
        id: '',
        name: '',
        pidSet: []
      }
      this.dDialog.current = 0
      this.dDialog.visible = true
    },
    fShowUpdateDialog ($index) {
      const roleView = this.dRoleListView[$index]
      this.dRoleModel.id = roleView.id
      this.dRoleModel.name = roleView.name
      for (var i = 0; i < this.dPermListView.length; i++) {
        this.dCheckBox.checkedPidSet[i] = []
        for (var j = 0; j < roleView.permViewSet.length; j++) {
          if (this.dPermListView[i].title === roleView.permViewSet[j].title) {
            for (const perm of roleView.permViewSet[j].permSet) {
              this.dCheckBox.checkedPidSet[i].push(perm.id)
            }
          }
        }
        this.fCheckGroupChange(i)
      }
      this.dDialog.current = 1
      this.dDialog.visible = true
    },
    fCheckAllChange (index) {
      this.dCheckBox.checkedPidSet[index] = []
      if (this.dCheckBox.isAllChecked[index]) {
        for (const perm of this.dPermListView[index].permSet) {
          this.dCheckBox.checkedPidSet[index].push(perm.id)
        }
      }
      this.$set(this.dCheckBox.isIndeterminate, index, false)
    },
    fCheckGroupChange (index) {
      const totalCount = this.dPermListView[index].permSet.length
      const checkedCount = this.dCheckBox.checkedPidSet[index].length
      this.$set(this.dCheckBox.isAllChecked, index, checkedCount === totalCount)
      this.$set(this.dCheckBox.isIndeterminate, index, checkedCount > 0 && checkedCount < totalCount)
    },
    fSearchClick () {

    },
    fRemoveBatchClick () {

    }
  }
}
</script>

<style lang="scss" scoped>
.VRole {
  .el-table {
    margin-top: 10px;
    /deep/ td {
      padding: 5px!important;
    }
    .el-tag {
      margin: 2px;
    }
  }
  .el-dialog {
  }
}
</style>
