<template>
  <div class="app-container">
    <custom-table border :columns="columns" :data="list2" isIndex>
      <template slot="hobby" slot-scope="scope">
        <el-button
          slot="hobby"
          style="color: red"
          :dddd="scope.data.row.hobby"
          >{{ scope.data.row.hobby }}</el-button
        >
      </template>
    </custom-table>
  </div>
</template>

<script>
import { getList } from '@/api/table'

import CustomTable from '@/components/CustomTable'

export default {
  components: {
    CustomTable
  },
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

      // __slotName 用来指定作用域插槽
      // __children 用来指定多表头
      columns: [
        // { label: '序号', type: 'index', width: '55', align: 'center' ,fixed:true},
        { type: 'selection', width: '55', align: 'center', fixed: true },
        { label: '姓名', prop: 'name', align: 'center' },
        { label: '年龄', prop: 'age', align: 'center', width: 800 },
        { label: '爱好', prop: 'hobby', align: 'center', __slotName: 'hobby' },
        {
          label: '学历',
          prop: 'education',
          align: 'center',
          __children: [
            { label: '籍贯', prop: 'nativePlace', align: 'center' },
            { label: '备注', prop: 'remark', align: 'left', width: 200 }
          ]
        }
      ],
      list2: [
        {
          name: 'a1',
          age: 11,
          hobby: 'aa1',
          education: '大學1',
          nativePlace: '中國1',
          remark: 'remark1'
        },
        {
          name: 'a2',
          age: 22,
          hobby: 'bb2',
          education: '大學2大學2大學2大學2大學2大學2大學2大學2',
          nativePlace: '中國2',
          remark: 'remark2'
        },
        {
          name: 'a3',
          age: 33,
          hobby: 'cc3',
          education: '大學3',
          nativePlace: '中國3',
          remark: 'remark3'
        }
      ]
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
    }
  }
}
</script>
