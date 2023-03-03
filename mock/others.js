module.exports = [
  // user navMenu
  {
    url: '/corp/account/chooseMenuTree',
    type: 'get',
    response: (_) => {
      console.log(111, _)
      return {
        code: 0,
        message: 'SUCCESS',
        data: [
          {
            menuCode: 'm10000',
            menuName: '库存管理',
            menuType: 0,
            menuUrl: '',
            menuLevel: '1',
            orderNum: 1,
            authFlag: 0,
            list: [
              {
                menuCode: 'm11000',
                menuName: '入库管理',
                menuType: 1,
                menuUrl: '111',
                menuLevel: '2',
                orderNum: 1,
                authFlag: 0,
                list: null,
              },
              {
                menuCode: 'm12000',
                menuName: '出库管理',
                menuType: 0,
                menuUrl: '',
                menuLevel: '2',
                orderNum: 2,
                authFlag: 0,
                list: [
                  {
                    menuCode: 'm12100',
                    menuName: '发起出库',
                    menuType: 1,
                    menuUrl: '111',
                    menuLevel: '3',
                    orderNum: 1,
                    authFlag: 0,
                    list: null,
                  },
                  {
                    menuCode: 'm12200',
                    menuName: '出库审核',
                    menuType: 1,
                    menuUrl: '1111',
                    menuLevel: '3',
                    orderNum: 2,
                    authFlag: 0,
                    list: null,
                  },
                ],
              },
              {
                menuCode: 'm13000',
                menuName: '调拨管理',
                menuType: 0,
                menuUrl: '',
                menuLevel: '2',
                orderNum: 3,
                authFlag: 0,
                list: [
                  {
                    menuCode: 'm13100',
                    menuName: '发起调拨',
                    menuType: 1,
                    menuUrl: '111',
                    menuLevel: '3',
                    orderNum: 1,
                    authFlag: 0,
                    list: null,
                  },
                  {
                    menuCode: 'm13200',
                    menuName: '审核调拨',
                    menuType: 1,
                    menuUrl: '1111',
                    menuLevel: '3',
                    orderNum: 2,
                    authFlag: 0,
                    list: null,
                  },
                ],
              },
              {
                menuCode: 'm14000',
                menuName: '盘点管理',
                menuType: 0,
                menuUrl: '',
                menuLevel: '2',
                orderNum: 4,
                authFlag: 0,
                list: [
                  {
                    menuCode: 'm14100',
                    menuName: '发起盘点',
                    menuType: 1,
                    menuUrl: '11',
                    menuLevel: '3',
                    orderNum: 1,
                    authFlag: 0,
                    list: null,
                  },
                  {
                    menuCode: 'm14200',
                    menuName: '盘点审核',
                    menuType: 1,
                    menuUrl: '1111',
                    menuLevel: '3',
                    orderNum: 2,
                    authFlag: 0,
                    list: null,
                  },
                ],
              },
            ],
          },
          {
            menuCode: 'm20000',
            menuName: '报表统计',
            menuType: 0,
            menuUrl: '',
            menuLevel: '1',
            orderNum: 2,
            authFlag: 0,
            list: [
              {
                menuCode: 'm21000',
                menuName: '库存统计',
                menuType: 0,
                menuUrl: '',
                menuLevel: '2',
                orderNum: 1,
                authFlag: 0,
                list: [
                  {
                    menuCode: 'm21100',
                    menuName: '当前库存',
                    menuType: 1,
                    menuUrl: '111',
                    menuLevel: '3',
                    orderNum: 1,
                    authFlag: 0,
                    list: null,
                  },
                  {
                    menuCode: 'm21200',
                    menuName: '库存统计',
                    menuType: 1,
                    menuUrl: '111',
                    menuLevel: '3',
                    orderNum: 2,
                    authFlag: 0,
                    list: null,
                  },
                ],
              },
              {
                menuCode: 'm26000',
                menuName: '物流人员统计',
                menuType: 1,
                menuUrl: '111',
                menuLevel: '2',
                orderNum: 2,
                authFlag: 0,
                list: null,
              },
              {
                menuCode: 'm22000',
                menuName: '入库纪录',
                menuType: 1,
                menuUrl: '111',
                menuLevel: '2',
                orderNum: 3,
                authFlag: 0,
                list: null,
              },
              {
                menuCode: 'm23000',
                menuName: '出库纪录',
                menuType: 1,
                menuUrl: '111',
                menuLevel: '2',
                orderNum: 4,
                authFlag: 0,
                list: null,
              },
              {
                menuCode: 'm24000',
                menuName: '调拨纪录',
                menuType: 1,
                menuUrl: '11',
                menuLevel: '2',
                orderNum: 5,
                authFlag: 0,
                list: null,
              },
              {
                menuCode: 'm25000',
                menuName: '盘点纪录',
                menuType: 1,
                menuUrl: '111',
                menuLevel: '2',
                orderNum: 6,
                authFlag: 0,
                list: null,
              },
              {
                menuCode: 'm27000',
                menuName: '台账管理',
                menuType: 1,
                menuUrl: '1',
                menuLevel: '2',
                orderNum: 7,
                authFlag: 0,
                list: null,
              },
              {
                menuCode: 'm28000',
                menuName: '危险废物管理计划',
                menuType: 1,
                menuUrl: '1',
                menuLevel: '2',
                orderNum: 8,
                authFlag: 0,
                list: null,
              },
            ],
          },
          {
            menuCode: 'm30000',
            menuName: '系统设置',
            menuType: 0,
            menuUrl: '',
            menuLevel: '1',
            orderNum: 3,
            authFlag: 0,
            list: [
              {
                menuCode: 'm31000',
                menuName: '仓库设置',
                menuType: 1,
                menuUrl: '1',
                menuLevel: '2',
                orderNum: 1,
                authFlag: 0,
                list: null,
              },
              {
                menuCode: 'm32000',
                menuName: '物流人员设置',
                menuType: 1,
                menuUrl: '1',
                menuLevel: '2',
                orderNum: 2,
                authFlag: 0,
                list: null,
              },
              {
                menuCode: 'm36000',
                menuName: '联单提报',
                menuType: 1,
                menuUrl: '1',
                menuLevel: '2',
                orderNum: 3,
                authFlag: 0,
                list: null,
              },
              {
                menuCode: 'm33000',
                menuName: '系统账号设置',
                menuType: 1,
                menuUrl: '1',
                menuLevel: '2',
                orderNum: 4,
                authFlag: 0,
                list: null,
              },
              {
                menuCode: 'm35000',
                menuName: '企业年审提报',
                menuType: 1,
                menuUrl: '1',
                menuLevel: '2',
                orderNum: 5,
                authFlag: 0,
                list: null,
              },
              {
                menuCode: 'm34000',
                menuName: '企业资料修改',
                menuType: 1,
                menuUrl: '1',
                menuLevel: '2',
                orderNum: 6,
                authFlag: 0,
                list: null,
              },
            ],
          },
        ],
      }
    },
  },

  // user logout
  {
    url: '/admin/area/listByPid',
    type: 'get',
    response: (config) => {
      const { pid } = config.query
      console.log(1111, pid)

      // return {
      //   code: 20000,
      //   data: 'success',
      // }
      if (pid === '0') {
        return [
          {
            areaId: 110000000000,
            areaName: '北京市',
            parentId: 0,
            level: 1,
          },
        ]
      }
      if (pid === '110000000000') {
        return [
          {
            areaId: 110100000000,
            areaName: '市辖区',
            parentId: 110000000000,
            level: 2,
          },
        ]
      }
      if (pid === '110100000000') {
        return [
          {
            areaId: 110101000000,
            areaName: '东城区',
            parentId: 110100000000,
            level: 3,
          },
          {
            areaId: 110102000000,
            areaName: '西城区',
            parentId: 110100000000,
            level: 3,
          },
          {
            areaId: 110105000000,
            areaName: '朝阳区',
            parentId: 110100000000,
            level: 3,
          },
          {
            areaId: 110106000000,
            areaName: '丰台区',
            parentId: 110100000000,
            level: 3,
          },
          {
            areaId: 110107000000,
            areaName: '石景山区',
            parentId: 110100000000,
            level: 3,
          },
        ]
      }
    },
  },

  {
    url: '/anno/getRegCaptcha.*',
    type: 'get',
    response: () => {
      // eslint-disable-next-line quotes
      return `data:text/xml;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAAAyCAIAAACWMwO2AAACc0lEQVR42u3bP0sDMRjH8W4Khc7q4CAodOroIvgOHOwgSgcnO4kIOoiK6GvQzUEE6eLi4jsQF0EHX4IuDuJSiuDgycF53F2T9HpJ7pLvj2cxBv/1w5PnQq19E6IhNf4EBFgEWARYxLF0B/10OQXraa0Xlo4vvn80lS5Iicu1jhUJK4RaJil4qcAyZsvaUZgbmVQVsKTgmLHksDI3MGZZt1WrrqpwZXFrNSr0qNsSbDufWQhrLFiP891Kw4onjgxnuWGlheWg9texKmRrpEEKZGPCElPzF1YmMmAZnbGqYotHv0JgmXsqLC0slcsF7hrK1q7+YfUv7qOKPpf4ML7NW1gvSw9RjbTfq3YlgiVeMWYLWFVsV0NhJQwJFj2csdRteatKBEuFF7DKD8vWGxxqgmNOuggsARqfVQFLY9OyDsuiKqWnQpVFYJW5XVn57sDSchqWp13Z+gGApaVp2YVlXRWwtMBCFbC02LIIy+7ADiyNsGhXlYe1fXwbVFVgbXy+R+V8u3KhY4W8bCFL2FJsV5qQqfyLjun3Y7lxFJpHlg+WgY4FLKU0V2ZHnbHMCEtcaMVhXZ3WCylgabcVVIHD+8nhsrhy2/ommbAm1pthef5UKJUX4gNWIq12KyjVjiXW5ud1g/RCi45VmeE9fTgCq9SwBOl1Lkv+OzTmJoPitQQWARZxIoPns6iARbQjkzqbbu/lK2AROtaQXHcOghJs+GnshMXrDaziecWFQQ1YeXhJhQ2jBggHYX3UNy0Ko6W53LGKtaV+RDKfuX8UBrZKyMuB3O1+jVkuzFg6bBFpXm/eomJ4J9qR5QAHLKIFHLCIlmP0F2iDtsQq5eKHAAAAAElFTkSuQmCC`
    },
  },
]
