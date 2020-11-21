<template>
    <div class="app-container">
        <div class="filter-container">
            <el-form>
                <el-menu-item>
                    <el-button
                            type="primary"
                            icon="plus" v-if="hasPerm('user:add')"
                            @click="showCreate">添加</el-button>
                </el-menu-item>
            </el-form>
        </div>
        <el-table :data="list"
                  v-loading.body="listLoading"
                  element-loading-text="拼命加载中"
                  border fit highlight-current-row>
            <el-table-column align="center"
                             label="序号"
                             width="80">
                <template slot-scope="scope">
                    <span v-text="getIndex(scope.$index)"></span>
                </template>
            </el-table-column>
            <el-table-column align="center"
                             label="用户名"
                             width="60"
                             prop="username"></el-table-column>
            <el-table-column align="center"
                             label="昵称"
                             width="60"
                             prop="nickname"></el-table-column>
            <el-table-column align="center"
                             label="创建时间"
                             width="170"
                             prop="createTime"></el-table-column>
            <el-table-column align="center"
                             label="管理"
                             width="220"
                             v-if="hasPerm('user:update') || hasPerm('user:remove')">
                <template slot-scope="scope">
                    <el-button type="primary"
                               icon="edit"
                               v-if="hasPerm('user:update')"
                               @click="showUpdate(scope.$index)">修改</el-button>
                    <el-button type="danger"
                               icon="delete"
                               v-if="hasPerm('user:remove') && scope.row.id !== id"
                               @click="showUpdate(scope.$index)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="queryModel.pageNum"
                       :page-size="queryModel.pageSize"
                       :total="totalCount"
                       :page-sizes="[10, 20, 50, 100]"
                       layout="total, sizes, prev, pager, next, jumper"></el-pagination>
        <el-dialog :title="textMap[dialogStatus]"
                   :visible.sync="dualogFormVisible">
            <el-form class="small-space"
                     :model="tempUser"
                     label-position="left"
                     label-width="80"
                     style="width: 300px;margin-left: 50px">
                <el-form-item label="用户名" required
                              v-if="dialogStatus=='create'">
                    <el-input type="text" v-model="tempUser.username" />
                </el-form-item>
                <el-form-item label="密码"
                              v-if="dialogStatus=='create'">
                    <el-input type="text" v-model="tempUser.password" />
                </el-form-item>
                <el-form-item label="新密码" v-else>
                    <el-input type="text" v-model="tempUser.password" placeholder="不填表示不修改" />
                </el-form-item>
                <el-form-item label="昵称" required
                              v-if="dialogStatus=='create'">
                    <el-input type="text" v-model="tempUser.nickname" />
                </el-form-item>
            </el-form>
            <div class="dialog-footer"
                 slot="footer">
                <el-button @click="dualogFormVisible = false">取消</el-button>
                <el-button v-if="dialogStatus==='create'"
                           type="success"
                           @click="createUser">创建</el-button>
                <el-button type="primary" v-else @click="createUser">修改</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import repo from '../../repository/user'
    export default {
        name: "user",
        data() {
            return {
                totalCount: 0,
                list: [],
                listLoading: false,
                queryModel: {
                    pageNum: 1,
                    pageSize: 20
                },
                dialogStatus: 'create',
                dualogFormVisible: false,
                textMap: {
                    update: '编辑',
                    create: '新建用户'
                },
                tempUser: {
                    id: '',
                    username: '',
                    password: '',
                    nickname: ''
                }
            }
        },
        created() {

        },
        computed() {

        },
        methods: {
            getList() {
                this.listLoading = true;
                repo(this.queryModel)
                    .then(data => {
                        this.listLoading = false;
                        this.list = data.obj.list
                        this.totalCount = data.obj.totalCount
                    })
            },
            handleSizeChange(val) {
                this.queryModel.pageSize = val

            },
            handleCurrentChange(val) {
                this.queryModel.pageNum = val
                this.getList()
            },
            handleFilter() {
                this.queryModel.pageNum = 1
                this.getList()
            },
            getIndex($index) {
                return (this.queryModel.pageNum - 1) * this.queryModel.pageSize + $index + 1
            },
            showCreate() {
                this.tempUser.id = ""
                this.tempUser.username = ""
                this.tempUser.password = ""
                this.tempUser.nickname = ""
                this.dialogStatus = "create"
                this.dualogFormVisible = true
            },
            showUpdate($index) {
                let user = this.list[$index]
                this.tempUser.id = user.id
                this.tempUser.username = user.username
                this.tempUser.password = user.password
                this.tempUser.nickname = user.nickname
                this.tempUser.deleteStatus = 1
                this.tempUser.password = ''
                this.dialogStatus = 'update'
                this.dualogFormVisible = true
            },
            createUser() {

            }
        }
    }
</script>

<style scoped>

</style>
