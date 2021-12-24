export default {
  name: 'agel-text',
  functional: true,
  props: {
    value: {
      default: ''
    },
    valueFormat: Function
  },
  render(h, context) {
    const { valueFormat, value } = context.props
    return h('span', { class: 'agel-text' }, valueFormat ? valueFormat(value) : value)
  }
}
