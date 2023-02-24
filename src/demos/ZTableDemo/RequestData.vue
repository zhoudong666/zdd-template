<template>
  <MyCard>
    <div slot="header">请求数据</div>
    <ZTable :columns="columns" :query="query">
      <template slot="date" slot-scope="{ data: { row } }">
        <el-date-picker v-model="row.date"></el-date-picker>
      </template>
      <template slot="operate" slot-scope="{ data: { row } }">
        <el-button type="text" @click="() => $message.success(row.name)">操作按钮</el-button>
      </template>
    </ZTable>
  </MyCard>
</template>

<script>
import { getList } from '@/api/table'

export default {
  name: 'RequestData',
  data() {
    return {
      // __slotName 用来指定作用域插槽
      // __children 用来指定多表头
      columns: [
        { label: '姓名', prop: 'name', align: 'left' },
        { label: '年龄', prop: 'age', align: 'center', width: 60 },
        { label: '状态', prop: 'status', align: 'right' },
        { label: '日期', prop: 'date', minWidth: 150 },
        { label: '身高', prop: 'height' },
        {
          label: '其他',
          prop: 'other',
          // 二级表头
          __children: [
            { label: '籍贯', prop: 'city' },
            { label: '备注', prop: 'remark', minWidth: 180 },
          ],
        },
        { label: '操作', __slotName: 'operate', fixed: 'right' },
      ],
      query: getList(),
      // { url: '/table/list', method: 'get', queryParam: {}},
    }
  },
  created() {
    // setTimeout(() => {
    //   this.query.queryParam = { aa: '123' }
    // }, 1000)
  },
  methods: {},
}
</script>
