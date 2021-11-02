<template>
  <div class="app-container">
    <el-button @click="dialogVisible = true">1412312</el-button>
    <el-button @click="dialogVisible2 = true">1412312</el-button>
    <el-dialog
      v-dialogDrag
      title="提示"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      :modal="false"
    >
      <span>这是一段信息123444</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <el-dialog
      v-dialogDragWidth
      title="提示"
      :visible.sync="dialogVisible2"
      :before-close="handleClose"
      :modal="false"
      modal-append-to-body
      append-to-body
      :close-on-click-modal="true"
      width="200px"
    >
      <span>这是一段信息1234477777774</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible2 = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="Title">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="Author" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Pageviews" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column
        class-name="status-col"
        label="Status"
        width="110"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{
            scope.row.status
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="created_at"
        label="Display_time"
        width="200"
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList } from '@/api/table'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      dialogVisible: false,
      dialogVisible2: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then((response) => {
        this.list = response.data.items
        this.listLoading = false
      })
    },
    handleClose(done) {
      // done()
      // this.$confirm('确认关闭？')
      //   .then(_ => {
      //     done();
      //   })
      //   .catch(_ => {});
    }
  }
}
</script>

<style>
/*弹窗自定义 动画*/
/* .el-dialog__wrapper {
  transition-duration: 0.8s;
}
.dialog-fade-enter-active{
  animation: none !important;
} */
.dialog-fade-leave-active {
  transition-duration: 0s !important; /*定义 退出时的 动画 过渡时间*/
  animation: none !important;
}

/*设置 填充模式   此处的值为 当动画完成后，保持最后一个属性值（在最后一个关键帧中定义）*/
/* .dialog-fade-enter-active .el-dialog,
.dialog-fade-leave-active .el-dialog{
  animation-fill-mode: forwards;
} */

/* .dialog-fade-enter-active .el-dialog{
  animation-duration: 0.5s;
  animation-timing-function: cubic-bezier(0.6,0,0.4,1);
}

.dialog-fade-leave-active .el-dialog{
  animation-duration: 0.5s;
} */
</style>
