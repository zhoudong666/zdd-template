<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    :close-on-press-escape="false"
    :width="width"
    v-bind="$attrs"
    :center="isTopCenter"
    :append-to-body="appendToBody"
    @close="$emit('close')"
    @closed="$emit('closed')"
  >
    <!-- :style="'marginTop:' + marginTop + 'vh !important;'" -->
    <slot></slot>
    <div slot="footer" class="dialog-footer" v-show="hasFoot" :style="`justify-content:${positionFooter}`">
      <slot name="footer">
        <el-button type="primary" @click="handleConfirm" v-show="!isOnlyCancel">
          {{ confirmBtnText }}
        </el-button>
        <slot name="footerButton"></slot>
        <el-button type="default" @click="handleCancel">
          {{ cancelBtnText }}
        </el-button>
      </slot>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 's-dialog',
  props: {
    title: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean,
      default: false
    },
    marginTop: {
      type: String,
      default: '0'
    },
    width: {
      type: String
    },
    appendToBody: {
      type: Boolean,
      default: true
    },
    hasFoot: {
      type: Boolean,
      default: true
    },
    confirmBtnText: {
      type: String,
      default: '确定'
    },
    cancelBtnText: {
      type: String,
      default: '取消'
    },
    isTopCenter: {
      type: Boolean,
      default: false
    },
    positionFooter: {
      type: String,
      default: 'left'
    },
    isOnlyCancel: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    dialogVisible: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      }
    }
  },
  methods: {
    handleCancel() {
      this.$emit('cancel')
    },
    handleConfirm() {
      this.$emit('confirm')
    }
  }
}
</script>
