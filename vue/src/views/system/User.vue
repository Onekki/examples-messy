<template>
  <div class="VUser">
    <CHeader :p-placeholder="'输入用户名/昵称'" :p-search-key="dQueryModel.skey"
             @fSearchClick="fSearchClick"
             :p-show-save-dialog="fShowSaveDialog"
             :p-remove-batch-click="fRemoveBatchClick"/>
    <el-table :data="dUserPageView.records"
              v-loading="dUserPageViewLoading && dRoleListLoading" element-loading-text="拼命加载中" border fit>
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="序号" align="center" width="50" type="index" />

      <el-table-column prop="role" label="角色" align="center" :formatter="fRoleFormat" />
      <el-table-column prop="username" label="用户名" align="center" />
      <el-table-column prop="password" label="密码" align="center" />
      <el-table-column prop="nickname" label="昵称" align="center" />
      <el-table-column prop="avatarUrl" label="头像" align="center" width="60">
        <template slot-scope="scope">
          <img :src="fServerFile(scope.row.avatarUrl)" />
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="手机号" align="center" width="120"/>
      <el-table-column prop="email" label="邮箱" align="center" width="160"/>
      <el-table-column prop="registerTime" label="注册时间" :formatter="fDateFormat"
                       align="center" width="100" />
      <el-table-column label="操作"  align="center" width="160" fixed="right">
        <template slot-scope="scope">
          <el-button type="warning" icon="edit" size="mini"
                     @click="fShowUpdateDialog(scope.$index)">修改</el-button>
          <el-button type="danger" icon="delete" size="mini"
                     @click="fRemoveUser(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="fSizeChange"
                   @current-change="fCurrentChange"
                   :total="dUserPageView.total"
                   :current-page=dQueryModel.current
                   :page-size=dQueryModel.size
                   :page-sizes="[10, 20, 50, 100]"
                   layout="total, sizes, prev, pager, next, jumper" />
    <el-dialog :title="dDialog.title[dDialog.current]"
               :visible.sync="dDialog.visible">
      <el-form :model="dUserModel"
               label-position="left"
               label-width="80px">
        <el-form-item label="用户名" v-if="dDialog.current === 0" required>
          <el-input type="text" v-model="dUserModel.username" />
        </el-form-item>
        <el-form-item label="角色" required>
          <el-select placeholder="请选择" v-model="dUserModel.rid">
            <el-option v-for="item in dRoleList"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="昵称" required>
          <el-input type="text" v-model="dUserModel.nickname" />
        </el-form-item>
        <el-form-item label="密码" required>
          <el-input v-if="dDialog.isPasswordVisible" type="text" v-model="dUserModel.password">
            <i class="el-icon-view el-input__icon"
               slot="suffix"
               @click="fClickPassword"></i>
          </el-input>
          <el-input v-else type="password" v-model="dUserModel.password">
            <i class="el-icon-view el-input__icon"
               slot="suffix"
               @click="fClickPassword"></i>
          </el-input>
        </el-form-item>
        <el-form-item label="手机号" required>
          <el-input type="text" v-model="dUserModel.phone" />
        </el-form-item>
        <el-form-item label="邮箱" required>
          <el-input type="text" v-model="dUserModel.email" />
        </el-form-item>
        <el-form-item label="头像" required>
          <el-upload v-model="dUserModel.avatarUrl"
                     action="http://localhost:8080/upload"
                     :show-file-list="false"
                     :on-success="fAvatarOnSuccess"
                     :before-upload="fAvatarBeforeUpload">
            <img v-if="dUserModel.avatarUrl" :src="fServerFile(dUserModel.avatarUrl)" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dDialog.visible = false">取消</el-button>
          <el-button v-if="!dDialog.current" type="success"
                     @click="fSaveUser">创建</el-button>
          <el-button v-else type="primary"
                     @click="fUpdateUser">修改</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import CHeader from '@/components/CHeader'
import vueConfig from '@/../vue.config'
import api from '@/api'

export default {
  name: 'User',
  components: {
    CHeader
  },
  data () {
    return {
      dUserPageView: {
        total: 0,
        records: []
      },
      dRoleList: [],
      dQueryModel: {
        current: 1,
        size: 10,
        skey: ''
      },
      dUserModel: {
        id: '',
        username: '',
        password: '',
        nickname: '',
        avatarUrl: '',
        phone: '',
        email: '',
        rid: ''
      },
      dUserPageViewLoading: false,
      dRoleListLoading: false,
      dDialog: {
        current: 0,
        visible: false,
        title: ['保存', '修改'],
        isPasswordVisible: false
      }
    }
  },
  created () {
    this.fUserPageView()
    this.fRoleList()
  },
  methods: {
    fUserPageView () {
      this.dUserPageViewLoading = true
      api.system.user.PAGE_VIEW(this.dQueryModel).then(data => {
        this.dUserPageViewLoading = false
        this.dUserPageView = data
      })
    },
    fRoleList () {
      this.dRoleListLoading = true
      api.system.role.LIST_VIEW().then(data => {
        this.dRoleListLoading = false
        this.dRoleList = data
      })
    },
    fSaveUser () {
      api.system.user.SAVE(this.dUserModel).then(() => {
        this.dDialog.visible = false
        this.fUserPageView()
      })
    },
    fUpdateUser () {
      api.system.user.UPDATE(this.dUserModel).then(() => {
        this.dDialog.visible = false
        this.fUserPageView()
      })
    },
    fRemoveUser ($index) {
      const userView = this.dUserPageView.records[$index]
      api.system.user.REMOVE(userView.id).then(() => {
        this.fUserPageView()
      })
    },
    fSizeChange (val) {
      this.dQueryModel.size = val
      this.fUserPageView()
    },
    fCurrentChange (val) {
      this.dQueryModel.current = val
      this.fUserPageView()
    },
    fShowSaveDialog () {
      this.dUserModel = {
        id: '',
        username: '',
        password: '',
        nickname: '',
        avatarUrl: '',
        phone: '',
        email: '',
        rid: ''
      }
      this.dDialog.current = 0
      this.dDialog.visible = true
    },
    fShowUpdateDialog ($index) {
      const userView = this.dUserPageView.records[$index]
      this.dUserModel = {
        id: userView.id,
        username: userView.username,
        password: userView.password,
        nickname: userView.nickname,
        avatarUrl: userView.avatarUrl,
        phone: userView.phone,
        email: userView.email,
        rid: userView.role.id
      }
      this.dDialog.current = 1
      this.dDialog.visible = true
    },
    fClickPassword () {
      this.dDialog.isPasswordVisible = !this.dDialog.isPasswordVisible
    },
    fSearchClick (val) {
      this.dQueryModel.skey = val
      this.fUserPageView()
    },
    fRemoveBatchClick () {

    },
    fAvatarOnSuccess (res, file) {
    },
    fAvatarBeforeUpload (file) {
      const isPNG = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isPNG) {
        this.$message.error('上传头像图片只能是 PNG 格式!')
        return false
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
        return false
      }
      let formData = new FormData()
      formData.append('file', file) // 'file' 可变 相当于 input 表单的name 属性
      api.system.UPLOAD(formData).then(data => {
        this.dUserModel.avatarUrl = data
      })
      return false
    },
    fServerFile (val) {
      return vueConfig.devServer.proxy['/api'].target + val
    },
    fRoleFormat (row, column) {
      return row[column.property].name
    },
    fDateFormat (row, column) {
      var t = new Date(row[column.property])
      return t.getFullYear() + '-' + (t.getMonth() + 1) + '-' + t.getDate()
      // + ' ' + t.getHours() + ':' + t.getMinutes() + ':' + t.getSeconds() + '.' + t.getMilliseconds()
    }
  }
}
</script>

<style lang="scss" scoped>
.VUser {
  .el-table {
    margin-top: 10px;
    /deep/ td {
      padding: 5px!important;
    }
    img {
      width: 40px;
      height: 40px;
    }
  }
  .el-pagination {
    margin-top: 10px;
  }
  .el-dialog {
    img {
      width: 80px;
      height: 80px;
    }
    .el-upload {
      .avatar-uploader-icon {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        font-size: 28px;
        color: #8c939d;
        width: 80px;
        height: 80px;
        line-height: 80px;
        text-align: center;
        &:hover {
          border-color: #409EFF;
        }
      }
    }
  }
}

</style>
