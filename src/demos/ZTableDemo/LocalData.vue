<template>
  <MyCard>
    <div slot="header">本地数据 无分页</div>
    <el-button @click="btnClick" class="mb-10">控制列是否展示</el-button>
    <ZTable :columns="columns" :localData="localData" :isPagination="false">
      <template slot="height" slot-scope="{ data: { row } }">
        <el-input style="color: red" v-model="row.height"> </el-input>
      </template>
      <template slot="operate" slot-scope="{ data: { row } }">
        <el-button type="text" @click="() => $message.success(row.name)">操作按钮</el-button>
      </template>
    </ZTable>
  </MyCard>
</template>

<script>
export default {
  name: 'LocalData',
  data() {
    return {
      isShow: false,
      // __slotName 用来指定作用域插槽
      // __children 用来指定多表头
      columns: [
        { label: '姓名', prop: 'name', align: 'left' },
        { label: '年龄', prop: 'age', align: 'center', width: 60 },
        { label: '状态', prop: 'status', align: 'right', hide: true, isShow: () => this.isShow },
        { label: '日期', prop: 'date', minWidth: 140 },
        { label: '身高', __slotName: 'height' },
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
      localData: [
        { name: 'a1', age: 11, status: '开', date: '2022-12-01', height: '168', city: '北京市', remark: 'remark1' },
        { name: 'a2', age: 22, status: '关', date: '2022-12-02', height: '172', city: '南京市', remark: 'remark2' },
        { name: 'a3', age: 33, status: '开', date: '2022-12-03', height: '183', city: '上海市', remark: 'remark3' },
      ],
    }
  },
  created() {},
  methods: {
    btnClick() {
      this.isShow = !this.isShow
    },
  },
}
</script>
