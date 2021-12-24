<template>
  <div class="padding-15">
    <agel-form class="demo" v-model="form">
      <!-- slot 名称要与 item.porp 保持一致 -->
      <!-- <template slot="name">
        <el-tag>这是一段 template 类型自定义插槽</el-tag>
      </template> -->
    </agel-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        // inline: true,
        // descriptions: true,
        labelWidth: '100px',
        data: {},
        span: 8, // 全局span
        items: [
          // component 该属性不填写将默认为 el-input
          { prop: 'user', label: '审批人', style: 'width:120px' },
          {
            prop: 'region',
            component: 'el-select',
            label: '活动区域',
            options: ['区域一', '区域二']
          },
          {
            component: 'el-button',
            type: 'primary',
            icon: 'el-icon-search',
            slots: { default: '查询' }, // 按钮插槽
            on: {
              // click: () => {
              //   this.$message.info('查询')
              //   console.log({ ...this.form.data })
              // }
            }
          },
          {
            label: () => <el-tag>自定义label</el-tag>,
            labelWidth: '100px',
            on: {
              focus: () => {
                this.$message.info('查询')
                console.log({ ...this.form.data })
              }
            }
          }
          // ,
          // {
          //   prop: 'name',
          //   label: 'Template 插槽',
          //   slot: true
          // }
          // {
          //   component: 'el-upload',
          //   label: '照片',
          //   prop: 'upload',
          //   listType: 'picture-card',
          //   action: 'xx/xx/'
          // }
        ]
      }
    }
  }
}
</script>
