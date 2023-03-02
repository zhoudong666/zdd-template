const Mock = require('mockjs')

const data = Mock.mock({
  'items|10': [
    {
      id: '@id',
      name: '@cname',
      'age|1-100': 100,
      'num1|1-100': 100,
      'num2|1-100': 100,
      'num3|1-100': 100,
      'height|160-185': 100,
      title: '@sentence(10, 20)',
      'status|1': ['正常', '未认证', '删除'],
      region: '@region', // 生成一个大区
      province: '@province', // 生成一个省份
      city: '@city', // 生成一个市
      county: '@county', // 一个县
      zip: '@zip', // 邮政编码
      date: '@datetime',
      remark: '@csentence(2,5)',
      address: '@city@county',
      adit: '@cword(2,8)',
      phone: '13520073575',
    },
  ],
})

module.exports = [
  {
    url: '/table/list',
    type: 'get',
    response: (config) => {
      const items = data.items
      return {
        code: 0,
        message: 'SUCCESS',
        data: {
          records: items,
          total: items.length,
        },
      }
    },
  },
]
