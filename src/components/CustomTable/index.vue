<template>
  <div>
    <el-table :row-key="idKey" v-bind="$attrs" v-on="$listeners">
      <el-table-column
        v-if="isIndex"
        show-overflow-tooltip
        align="center"
        :index="typeIndex"
        type="index"
        :fixed="fixed"
      >
        <template slot="header">
          <span>序号</span>
        </template>
      </el-table-column>
      <template v-for="item in columns">
        <el-table-column
          :key="item.prop"
          v-bind="item"
          show-overflow-tooltip
          v-if="!item.__children"
        >
          <template v-if="item.__slotName" v-slot="scope">
            <slot :name="item.__slotName" :data="scope"></slot>
          </template>
        </el-table-column>
        <my-table-column :item="item" v-else :key="item.prop"></my-table-column>
      </template>
    </el-table>
    <el-pagination
      v-if="hasPagination"
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
export default {
  name: 'TTT',
  components: { MyTableColumn },
  props: {
    /**
     * 必传 列参数
     */
    columns: {
      type: Array,
      require: true,
      default: () => []
    },
    /**
     * 是否需要分页
     */
    hasPagination: {
      type: Boolean,
      default: true
    },
    /**
     * 是否需要跨页勾选
     */
    isCheckMemory: {
      type: Boolean,
      default: false
    },
    /**
     * 表格行数据的唯一键
     */
    idKey: {
      type: String,
      default: 'id'
    },
    /**
     * 是否显示索引并累加
     */
    isIndex: {
      type: Boolean,
      default: false
    },
    /**
     * index 是否是固定列
     */
    fixed: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      layout: 'total, sizes, prev, pager, next, jumper',
      pageSizes: [3, 10, 20, 30, 40, 50, 100],
      pagination: {
        totalRow: 7,
        pageIndex: 1,
        pageSize: 3
      }
    }
  },
  methods: {
    // methods
    /**
     * 切换分页数量
     * @param { Number } pageSize 页数
     */
    sizeChange(pageSize) {
      this.pagination.pageIndex = 1
      this.pagination.pageSize = pageSize
      this.queryData()
    },
    /**
     * 切换页码
     * @param { Number } pageIndex 页码
     */
    currentChange(pageIndex) {
      this.pagination.pageIndex = pageIndex
      this.queryData(true)
    },
    queryData(flag) {
      console.log(flag)
    },
    typeIndex(index) {
      const tabIndex =
        index + (this.pagination.pageIndex - 1) * this.pagination.pageSize + 1
      return tabIndex
    }
  }
}
</script>

<style lang="scss" scoped></style>
