export function confirm(msg, title = '提示', sureFn, cancelFn) {
  if (typeof title === 'function') {
    cancelFn = sureFn
    sureFn = title
    title = '提示'
  }
  this.$confirm(`${msg}`, title, {
    cancelButtonText: '取消',
    confirmButtonText: '确定',
    type: 'warning'
  })
    .then(() => {
      sureFn && sureFn()
    })
    .catch(() => {
      cancelFn && cancelFn()
      this.$message('已取消')
    })
}
