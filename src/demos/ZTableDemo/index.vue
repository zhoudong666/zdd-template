<template>
  <MyCard>
    <ZTable :columns="columns" :localData="list2">
      <template slot="height" slot-scope="{ data: { row } }">
        <el-input style="color: red" v-model="row.height"> </el-input>
      </template>
    </ZTable>
  </MyCard>
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
        { label: '姓名', prop: 'name', align: 'left' },
        { label: '年龄', prop: 'age', align: 'center', width: 60 },
        { label: '状态', prop: 'status', align: 'right' },
        { label: '日期', prop: 'date', width: 140 },
        { label: '身高', __slotName: 'height' },
        {
          label: '其他',
          prop: 'other',
          // 二级表头
          __children: [
            { label: '籍贯', prop: 'city' },
            { label: '备注', prop: 'remark', width: 200 },
          ],
        },
        { label: '操作', fixed: 'right' },
      ],
      query: {
        url: '/vue-admin-template/table/list',
        method: 'get',
        queryParam: {},
      },
      list2: [
        { name: 'a1', age: 11, status: '开', date: '2022-12-01', height: '168', city: '北京市', remark: 'remark1' },
        { name: 'a2', age: 22, status: '关', date: '2022-12-02', height: '172', city: '南京市', remark: 'remark2' },
        { name: 'a3', age: 33, status: '开', date: '2022-12-03', height: '183', city: '上海市', remark: 'remark3' },
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
