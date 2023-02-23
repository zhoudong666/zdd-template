<template>
  <div class="app-container">
    <ZTable :columns="columns" :localData="list2">
      <template slot="date" slot-scope="{ data: { row } }">
        <el-input style="color: red">{{ row.date }}</el-input>
      </template>
    </ZTable>
  </div>
</template>

<script>
import { getList } from '@/api/table'

export default {
  name: 'ZTableDemo',
  data() {
    return {
      list: null,
      listLoading: true,

      // __slotName 用来指定作用域插槽
      // __children 用来指定多表头
      columns: [
        { label: '姓名', prop: 'name', align: 'center' },
        { label: '年龄', prop: 'age', align: 'center', width: 100 },
        { label: '日期', prop: 'date', align: 'center', __slotName: 'date' },
        { label: '状态', prop: 'status', align: 'center' },
        {
          label: '其他',
          prop: 'education',
          align: 'center',
          __children: [
            { label: '籍贯', prop: 'city', align: 'center' },
            { label: '备注', prop: 'remark', align: 'left', width: 200 },
          ],
        },
        { label: '操作', align: 'center' },
      ],
      query: {
        url: '/vue-admin-template/table/list',
        method: 'get',
        queryParam: {},
      },
      list2: [
        { name: 'a1', age: 11, date: '2022-12-01', status: '开', city: '北京市', remark: 'remark1' },
        { name: 'a2', age: 22, date: '2022-12-02', status: '关', city: '南京市', remark: 'remark2' },
        { name: 'a3', age: 33, date: '2022-12-03', status: '开', city: '上海市', remark: 'remark3' },
      ],
    }
  },
  created() {
    // this.fetchData()
    setTimeout(() => {
      // this.query = {
      //   url: '/vue-admin-template/table/list',
      //   method: 'get'
      // }
      this.query.queryParam = { aa: '123' }
    }, 4000)
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then((response) => {
        this.list = response.data.items
        this.listLoading = false
      })
    },
  },
}
</script>
