### Pro-Form 属性

| 参数       | 说明                 | 类型    | 默认值 |
| ---------- | -------------------- | ------- | ------ |
| fields     | 见上方               | Array   | []     |
| hasControl | 控制表单按钮显示隐藏 | Boolean | true   |
| submitText | 提交按钮显示文本     | String  | '提交' |
| resetText  | 重置按钮显示文本     | String  | '重置' |

### fields 的属性

| 参数         | 说明                                        | 类型                      | 默认值    | 备注               |
| ------------ | ------------------------------------------- | ------------------------- | --------- | ------------------ |
| type         | 表单类型                                    | input、select、radio...   | 'Input'   |
| label        | 表单名称                                    | String                    | ''        |
| key          | 表单字段                                    | String                    | ''        |
| defaultValue | 表单元素的默认值                            | String ｜ Number ｜ Array |           |
| isRequired   | 是否必填                                    | Boolean                   | false     |
| isShow       | 是否显示                                    | Boolean ｜ Function       | true      | Fn(form)=> Boolean |
| rule         | 校验规则                                    | Object ｜ Array<Object>   | undefined |                    |
| span         | 所占份数                                    | Number                    | 24        |
| options      | 当表单元素为 select、raido、checkbox 时使用 | []{ label: '', value:''}  | []        |
| props        | 用来接受 element 原始表单所有属性           | Object                    |           |

### input 简单案例

```js
 // 1 默认输入类型为input
        {
          // type:'input',// 默认类型
          label: '用户名用户名',
          key: 'name',
          // isRequired: true,
          isShow: function (form) {
            console.log(form)
            return true
          },
          rule: [
            {
              validator: (rule, value, callback) => {
                if (value === '') callback(new Error('请输入XXX'))
              },
              trigger: 'blur'
            },
            {
              validator: (rule, value, callback) => {
                if (value === '111222') callback(new Error('值不可为111222'))
              },
              trigger: 'change'
            }
          ],
          span: 12,
          defaultValue: 'defaultValue',
          props: { placeholder: '8888' /* disabled: true */ }
        }
```
