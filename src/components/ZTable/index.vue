<template>
  <div :class="{ 'local-table': !query.url, 'request-table': query.url }">
    <el-table
      ref="ZTable"
      :row-key="idKey"
      v-bind="$attrs"
      v-on="$listeners"
      :border="false"
      :data="tableData"
      resizable
      @selection-change="handleSelectionChange"
    >
      <!-- :height="inner_height" -->
      <el-table-column v-if="isSelection" type="selection" width="55" align="center"> </el-table-column>
      <el-table-column
        v-if="isIndex"
        show-overflow-tooltip
        align="center"
        type="index"
        :index="typeIndex"
        :fixed="isIndexFixed"
      >
        <template slot="header">
          <span>序号</span>
        </template>
      </el-table-column>
      <template v-for="(item, index) in inner_cols">
        <el-table-column
          :key="item.prop + item.label"
          v-bind="item"
          show-overflow-tooltip
          v-if="!item.__children"
          :sortable="sortFun(item.prop) ? 'custom' : false"
        >
          <template v-if="item.__slotName" v-slot="scope">
            <slot :name="item.__slotName" :data="scope"></slot>
          </template>
        </el-table-column>
        <my-table-column :item="item" v-else :key="item.prop + index"></my-table-column>
      </template>
    </el-table>
    <el-pagination
      v-if="isPagination"
      class="pagination"
      background
      :total="pagination.totalRow"
      :current-page="pagination.pageIndex"
      :page-size="pagination.pageSize"
      :page-sizes="pageSizes"
      :layout="layout"
      @size-change="sizeChange"
      @current-change="currentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import MyTableColumn from './tableColumn.vue'
import request from '@/utils/request'

export default {
  name: 'ZTable',
  components: { MyTableColumn },
  props: {
    /** * 必传 列参数  */
    columns: { type: Array, require: true, default: () => [] },
    /** * 表格高度 默认 446px  取消  */
    // height: { type: [String, Number] },
    /** * 是否需要分页 */
    isPagination: { type: Boolean, default: true },
    /** * 是否需要跨页勾选 */
    isCheckMemory: { type: Boolean, default: false },
    /** * 表格行数据的唯一键 */
    idKey: { type: String, default: 'id' },
    /** * 是否显示CheckBox */
    isSelection: { type: Boolean, default: true },
    /** * 是否显示索引并累加 */
    isIndex: { type: Boolean, default: true },
    /** * index 是否是固定列 */
    isIndexFixed: { type: Boolean, default: true },
    /**  排序 */
    sortArr: { type: Array, default: () => [] },
    /** * 查询参数 */
    query: { type: Object, default: () => ({}) },
    /** * 分页需要传入后台的字段 */
    pageParam: { type: Object, default: () => ({ pageOffset: 'current', pageSize: 'size' }) },
    order: { type: Object, default: () => ({}) },
    localData: { type: Array, default: () => [] },
  },
  data() {
    return {
      layout: 'total, sizes, prev, pager, next, jumper',
      pageSizes: [10, 20, 30, 40, 50, 100],
      pagination: { totalRow: 0, pageIndex: 1, pageSize: 10 },
      tableData: [],
    }
  },
  computed: {
    // 用于表头label6到8个字fixed固定导致布局错乱,也可用doLayout
    inner_cols() {
      return this.columns
        .filter((i) => (typeof i.isShow === 'function' ? i.isShow() : i))
        .reduce((all, curr) => {
          curr.__children = curr.__children?.map((i) => ({ minWidth: '117px', align: 'center', ...i }))
          all.push({ minWidth: '117px', align: 'center', ...curr })
          return all
        }, [])
    },
    // // 处理表格高度 不传的话默认高度446px 传auto的话,自动高度
    // inner_height() {
    //   // if (this.height === 'auto') {
    //   //   return undefined
    //   // } else if (typeof this.height === 'undefined') {
    //   //   return '446px'
    //   // } else {
    //   //   return this.height
    //   // }
    //   return this.height
    // }
  },
  watch: {
    query: {
      deep: true,
      // immediate: true,
      handler(newVal) {
        this.queryData()
      },
    },
    localData: {
      deep: true,
      immediate: true,
      handler(newVal) {
        this.queryData()
      },
    },
  },
  methods: {
    /** * 切换分页数量 * @param { Number } pageSize 页数 */
    sizeChange(pageSize) {
      this.pagination.pageIndex = 1
      this.pagination.pageSize = pageSize
      this.queryData(true)
      this.$emit('sizeChange', pageSize)
    },
    /** * 切换页码 * @param { Number } pageIndex   */
    currentChange(pageIndex) {
      this.pagination.pageIndex = pageIndex
      this.queryData(true)
      this.$emit('currentChange', pageIndex)
    },
    /** * 查询表格 * @param { isReset } 是否重置到第一页  */
    async queryData(isReset, pageInfo) {
      if (this.query && this.query.url) {
        this.loading = true
        this.pagination.pageIndex = isReset ? this.pagination.pageIndex : 1
        const params = Object.assign({}, this.query.queryParam, {
          [this.pageParam.pageOffset]: this.pagination.pageIndex,
          [this.pageParam.pageSize]: this.pagination.pageSize,
        })
        if (this.order.sortName && this.order.sortOrder) {
          params.sortName = this.order.sortName
          params.sortOrder = this.order.sortOrder
        }

        const { url, method = 'get' } = this.query
        request({ url, method, [method === 'get' ? 'params' : 'data']: params }).then((result) => {
          this.loading = false
          const data = result
          if ((data && data.total) || (data && data.total === 0)) {
            this.pagination.totalRow = data.total
            this.tableData = data.records
          } else {
            this.$message.warning(data && data.message ? data.message : '列表数据查询失败!')
            this.tableData = []
            this.pagination.pageIndex = 1
            this.pagination.totalRow = 0
          }
          this.$emit('fetchTableData', this.tableData)
        })
      } else {
        this.tableData = this.localData
      }
    },
    typeIndex(index) {
      const tabIndex = index + (this.pagination.pageIndex - 1) * this.pagination.pageSize + 1
      return tabIndex
    },
    sortFun(prop) {
      if (this.sortArr && this.sortArr.length > 0) {
        return this.sortArr.indexOf(prop) > -1
      } else {
        return false
      }
    },
    // 监听事件 sort-change
    listeners: function () {
      var vm = this
      return Object.assign({}, this.$listeners, {
        'sort-change': function (column) {
          vm.order.sortName = column.prop
          const { order } = column
          vm.order.sortOrder = order === 'ascending' ? 'asc' : order === 'descending' ? 'desc' : ''
          vm.$emit('sortChange', vm.order)
        },
      })
    },
    // 列表多选
    handleSelectionChange(val) {
      this.$emit('selectionChange', val)
    },
    toggleSelection(isSelect) {
      if (isSelect) {
        this.tableData.forEach((row) => {
          this.$refs.ZTable.toggleRowSelection(row)
        })
        this.$emit('selectionChange', this.tableData)
      } else {
        this.$refs.ZTable.clearSelection()
      }
    },
  },
}
</script>

<style lang="scss" scoped>
::v-deep .el-pagination {
  margin-top: 10px;
}
::v-deep .el-table__fixed,
::v-deep .el-table__fixed-right {
  height: 100% !important;
}
.request-table ::v-deep .el-table__body-wrapper {
  min-height: 360px;
}
</style>
