<template>
  <el-select v-model="currValue" v-bind="$attrs" v-on="$listeners" class="my_mul_select" :style="cssProps">
    <!-- <el-option v-for="opt in options" :key="opt.value" :value="opt.value" :label="opt.label"> </el-option> -->
    <!-- valueKey 用于判断  作为 value 唯一标识的键名，绑定值为对象类型时必填 -->
    <el-option
      v-for="opt in options"
      :key="opt[valueText]"
      :value="cumVal(opt)"
      :label="opt[labelText]"
      :disabled="opt.disabled"
    >
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: 'BaseMulSelect',
  props: {
    options: {
      type: Array,
      default: () => []
    },
    value: {
      type: [String, Number, Boolean, Object, Array],
      default: null
    },
    valueText: {
      type: String,
      default: 'value'
    },
    labelText: {
      type: String,
      default: 'label'
    },
    /** 用于限制多选 tag 最大宽度 */
    tagMaxWidth: {
      type: String,
      default: '90px'
    }
  },
  computed: {
    currValue: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    },
    /** 计算 是否传来tag最大宽度 */
    cssProps() {
      return {
        '--tag-max-width': this.tagMaxWidth
      }
    }
  },
  methods: {
    cumVal(opt) {
      /** valueKey 用于判断  作为 value 唯一标识的键名，绑定值为对象类型时必填  */
      // 情况1 传了valueKey 且是label字段
      if (this.$attrs.valueKey && this.$attrs.valueKey === this.labelText) {
        return opt[this.labelText]
        // 情况2 传来valueKey 但不是label字段,需要返回选中的对象
      } else if (this.$attrs.valueKey && this.$attrs.valueKey !== this.labelText) {
        return opt
      } else {
        // 情况3 默认情况下 就是绑定value
        return opt[this.valueText]
      }
    }
  },
  mounted() {
    // document.getElementsByClassName('my_mul_select')[0].style.setProperty('--tag-max-width', '140px')
  }
}
</script>

<style lang="scss" scoped>
.my_mul_select {
  --tag-max-width: 90px;
}
/* ::v-deep .el-select__tags-text {
  display: inline-block;
  max-width: 70px;
  @media (max-width: 1400px) {
    max-width: 42px;
  }
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
::v-deep .el-select .el-tag__close.el-icon-close {
  top: -7px;
  right: -4px;
} */
::v-deep .el-select__tags .el-tag:nth-child(1) {
  /* max-width: 90px; */
  max-width: var(--tag-max-width, 90px);
  overflow: hidden;
}
</style>
