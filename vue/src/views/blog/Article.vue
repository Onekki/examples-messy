<template>
  <div class="VArticle">
    <CHeader :p-placeholder="'输入标题/作者'" :p-search-key="dQueryModel.skey"
             @fSearchClick="fSearchClick"
             :p-show-save-dialog="fShowSaveDialog"
             :p-remove-batch-click="fRemoveBatchClick"/>
    <el-table :data="dArticlePageView.records"
              v-loading="dArticlePageViewLoading" element-loading-text="拼命加载中" border fit>
      <el-table-column type="selection" width="50" align="center" />
      <el-table-column label="序号" align="center" width="50" type="index" />

      <el-table-column prop="user" label="作者" align="center" :formatter="fUserFormat" />
      <el-table-column prop="title" label="标题" align="center" width="200">
        <template slot-scope="scope">
          <el-popover
            ref="refPopoverSummary"
            placement="top-start"
            title="概要"
            width="200"
            trigger="hover"
            :content="scope.row.summary">
          </el-popover>
          <span v-popover:refPopoverSummary>{{scope.row.title}}</span>
        </template>
      </el-table-column>
      <el-table-column label="原文件" align="center">
        <template slot-scope="scope">
          <a :href="scope.row.mdUrl">前往</a>
        </template>
        <a href="">下载</a>
      </el-table-column>
      <el-table-column label="网页内容" align="center" width="120">
        <template slot-scope="scope">
          <a href="#" @click="fShowPreviewDialog(scope.row)">预览</a>
        </template>
      </el-table-column>
      <el-table-column prop="publishTime" label="发表时间" :formatter="fDateFormat"
                       align="center" width="120"/>
      <el-table-column prop="editTime" label="编辑时间" :formatter="fDateFormat"
                       align="center" width="120" />
      <el-table-column label="操作"  align="center" width="160" fixed="right">
        <template slot-scope="scope">
          <el-button type="warning" icon="edit" size="mini"
                     @click="fShowUpdateDialog(scope.row)">修改</el-button>
          <el-button type="danger" icon="delete" size="mini"
                     @click="fRemoveArticle(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="fSizeChange"
                   @current-change="fCurrentChange"
                   :total="dArticlePageView.total"
                   :current-page=dQueryModel.current
                   :page-size=dQueryModel.size
                   :page-sizes="[10, 20, 50, 100]"
                   layout="total, sizes, prev, pager, next, jumper" />
    <el-dialog center :fullscreen="true" :title="dArticleModel.title" :visible.sync="dDialogFullScreenVisible">
      <p style="width: 50%; margin: 0 auto;" v-html="dArticleModel.html"></p>
    </el-dialog>
    <el-dialog :title="dDialog.title[dDialog.current]"
               :visible.sync="dDialog.visible">
      <el-form :model="dArticleModel"
               label-position="left"
               label-width="80px">
        <el-form-item label="标题" required>
          <el-input type="text" v-model="dArticleModel.title" />
        </el-form-item>
        <el-form-item label="md地址" required>
          <el-input type="text" v-model="dArticleModel.mdUrl" />
        </el-form-item>
        <el-form-item label="html内容" required>
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 8}"
            placeholder="请输入内容"
            v-model="dArticleModel.html">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dDialog.visible = false">取消</el-button>
          <el-button v-if="!dDialog.current" type="success"
                     @click="fSaveArticle">创建</el-button>
          <el-button v-else type="primary"
                     @click="fUpdateArticle">修改</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import CHeader from '@/components/CHeader'
import api from '@/api'

export default {
  name: 'Article',
  components: {
    CHeader
  },
  data () {
    return {
      dArticlePageView: {
        total: 0,
        records: []
      },
      dQueryModel: {
        current: 1,
        size: 10,
        skey: ''
      },
      dArticleModel: {
        id: '',
        title: '',
        summary: '',
        mdUrl: '',
        html: '',
        publishTime: '',
        state: '',
        uid: ''
      },
      dArticlePageViewLoading: false,
      dDialog: {
        current: 0,
        visible: false,
        title: ['保存', '修改'],
        isPasswordVisible: false
      },
      dDialogFullScreenVisible: false
    }
  },
  created () {
    this.fArticlePageView()
  },
  methods: {
    fArticlePageView () {
      this.dArticlePageViewLoading = true
      api.blog.article.PAGE_VIEW(this.dQueryModel).then(data => {
        this.dArticlePageViewLoading = false
        this.dArticlePageView = data
      })
    },
    fSaveArticle () {
      api.blog.article.SAVE(this.dArticleModel).then(() => {
        this.dDialog.visible = false
        this.fArticlePageView()
      })
    },
    fUpdateArticle () {
      api.blog.article.UPDATE(this.dArticleModel).then(() => {
        this.dDialog.visible = false
        this.fArticlePageView()
      })
    },
    fRemoveArticle (row) {
      api.blog.article.REMOVE(row.id).then(() => {
        this.fArticlePageView()
      })
    },
    fSizeChange (val) {
      this.dQueryModel.size = val
      this.fArticlePageView()
    },
    fCurrentChange (val) {
      this.dQueryModel.current = val
      this.fArticlePageView()
    },
    fShowSaveDialog () {
      this.dArticleModel = {
        id: '',
        title: '',
        summary: '',
        mdUrl: '',
        html: '',
        publishTime: '',
        state: '',
        uid: this.$store.getters.gUserInfo.id
      }
      this.dDialog.current = 0
      this.dDialog.visible = true
    },
    fShowUpdateDialog (row) {
      this.dArticleModel = {
        id: row.id,
        title: row.title,
        summary: row.title,
        mdUrl: row.mdUrl,
        html: row.html,
        publishTime: row.publishTime,
        state: row.state,
        uid: row.user.id
      }
      this.dDialog.current = 1
      this.dDialog.visible = true
    },
    fShowPreviewDialog (row) {
      this.dDialogFullScreenVisible = true
      this.dArticleModel.title = row.title
      this.dArticleModel.html = row.html
    },
    fSearchClick (val) {
      this.dQueryModel.skey = val
      this.fArticlePageView()
    },
    fRemoveBatchClick () {

    },
    fUserFormat (row, column) {
      return row[column.property].nickname
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
  .VArticle {
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
