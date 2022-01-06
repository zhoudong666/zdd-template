<template>
  <div class="app-container">
    value:{{value}}  node {{JSON.stringify(node)}}
    <hr>
    <el-select
      class="main-select-tree vvvv"
      ref="selectTree"
      v-model="value"
      filterable
      style="width: 560px;"
      :popper-append-to-body='false'
      :filter-method='filterMethod'
    >
      <el-option
        v-for="item in formatData(datas)"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        class="select-tree-opt"
      />
      <el-tree
        class="main-select-el-tree"
        ref="selecteltree"
        :data="datas"
        node-key="id"
        highlight-current
        :props="defaultProps"
        @node-click="handleNodeClick"
        :current-node-key="value"
        :expand-on-click-node="expandOnClickNode"
        default-expand-all
        :filter-node-method="filterNode"
      />
    </el-select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 6,
      node: {},
      expandOnClickNode: true,
      options: [],
      datas: [
        {
          id: 1,
          label: '云南',
          children: [
            {
              id: 2,
              label: '昆明',
              children: [
                {
                  id: 3,
                  label: '五华区',
                  children: [{ id: 8, label: '北辰小区' }]
                },
                { id: 4, label: '盘龙区' }
              ]
            }
          ]
        },
        {
          id: 5,
          label: '湖南',
          children: [
            { id: 6, label: '长沙' },
            { id: 7, label: '永州' }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    loop1(data, arr) {
      data.forEach((item, key) => {
        arr.push({ label: item.label, value: item.id })
        if (item.children) this.loop1(item.children, arr)
      })
      return arr
    },
    loop2(data, arr) {
      return data.reduce((total, cur) => {
        total.push({ label: cur.label, value: cur.id })
        return cur.children ? this.loop2(cur.children, arr) : total
      }, arr)
    },
    formatData(data) {
      // console.log('this.loop1', this.loop1(data, []))
      // console.log('this.loop2', this.loop2(data, []))
      return this.loop1(data, [])
    },
    handleNodeClick(node) {
      console.log(node)
      this.value = node.id
      this.node = { id: node.id, label: node.label }
      this.$refs.selectTree.blur()
    },
    filterMethod(val) {
      this.$refs.selecteltree.filter(val)
    },
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    }
  }
}
</script>
<style scoped>
.main-select-el-tree .el-tree-node .is-current > .el-tree-node__content {
  font-weight: bold;
  color: #409eff;
}
.main-select-el-tree .el-tree-node.is-current > .el-tree-node__content {
  font-weight: bold;
  color: #409eff;
}
 .el-select-dropdown__item.select-tree-opt{
  display: none!important;
}

::v-deep .vvvv .el-select-dropdown__list {
    padding: 6px 0!important;
}
</style>
