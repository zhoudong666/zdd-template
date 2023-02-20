const tokens = {
  admin: {
    token: 'admin-token',
  },
  editor: {
    token: 'editor-token',
  },
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin',
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor',
  },
}

module.exports = [
  // 1  user login
  {
    url: '/login',
    type: 'post',
    response: (config) => {
      // config.body = {
      //   principal: 'admin', // 账号
      //   credentials: '123456', // 密码
      //   sessionUUID: 'dba48f0c-4140-d4f6-344d-08cc3cfea0f3',
      //   validCode: 'znue',
      // }
      const { principal } = config.body
      const token = tokens[principal]

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.',
        }
      }

      return {
        // code: 20000,
        // data: token,
        ccess_token: '74c8499c-2d59-4cb5-8aa9-0ab679a82af7',
        authorities: [],
        expires_in: 43199,
        refresh_token: '8d002439-7472-4bf7-b749-8ce25650cd55',
        token_type: 'bearer',
        userId: 'f5622d52c8164fcd8348dccfd840f624',
        userStatus: '0',
      }
    },
  },

  // get user info
  {
    url: '/corp/user/info.*',
    type: 'get',
    response: (config) => {
      // const { token } = config.query
      // const info = users[token]

      // // mock error
      // if (!info) {
      //   return {
      //     code: 50008,
      //     message: 'Login failed, unable to get user details.',
      //   }
      // }

      return {
        // code: 20000,
        // data: info,

        code: 0,
        message: 'SUCCESS',
        data: {
          loginUser: 'admin',
          userName: '海之云',
          userMobile: '18051110000',
          userMail: 'admin@hzy.com',
          userPic: 'https://weboss.qmprint.cn/2023/01/fe263f8dd79b42388becaedf464c4b65.jpg',
          userMemo: '海之云管理员',
          status: 0,
          corpName: '南京XXXXX有限责任公司',
          userType: 1,
          userRegtime: '2022-12-29 11:19:08',
          userLasttime: '2023-02-06 22:23:27',
          userLastip: '',
          authMenu: null,
          authWh: null,
        },
      }
    },
  },

  // user navMenu
  {
    url: '/corp/user/navMenu',
    type: 'get',
    response: (_) => {
      return {
        code: 0,
        message: 'SUCCESS',
        data: [
          { menuCode: 'm10000', menuName: '库存管理', menuLevel: '1' },
          { menuCode: 'm11000', menuName: '入库管理', menuLevel: '2' },
          { menuCode: 'm12000', menuName: '出库管理', menuLevel: '2' },
          { menuCode: 'm12100', menuName: '发起出库', menuLevel: '3' },
          { menuCode: 'm12200', menuName: '出库审核', menuLevel: '3' },
          { menuCode: 'm13000', menuName: '调拨管理', menuLevel: '2' },
          { menuCode: 'm13100', menuName: '发起调拨', menuLevel: '3' },
          { menuCode: 'm13200', menuName: '审核调拨', menuLevel: '3' },
          { menuCode: 'm14000', menuName: '盘点管理', menuLevel: '2' },
          { menuCode: 'm14100', menuName: '发起盘点', menuLevel: '3' },
          { menuCode: 'm14200', menuName: '盘点审核', menuLevel: '3' },
          { menuCode: 'm20000', menuName: '报表统计', menuLevel: '1' },
          { menuCode: 'm21000', menuName: '库存统计', menuLevel: '2' },
          { menuCode: 'm21100', menuName: '当前库存', menuLevel: '3' },
          { menuCode: 'm21200', menuName: '库存统计', menuLevel: '3' },
          { menuCode: 'm26000', menuName: '物流人员统计', menuLevel: '2' },
          { menuCode: 'm22000', menuName: '入库纪录', menuLevel: '2' },
          { menuCode: 'm23000', menuName: '出库纪录', menuLevel: '2' },
          { menuCode: 'm24000', menuName: '调拨纪录', menuLevel: '2' },
          { menuCode: 'm25000', menuName: '盘点纪录', menuLevel: '2' },
          { menuCode: 'm27000', menuName: '台账管理', menuLevel: '2' },
          { menuCode: 'm28000', menuName: '危险废物管理计划', menuLevel: '2' },
          { menuCode: 'm30000', menuName: '系统设置', menuLevel: '1' },
          { menuCode: 'm31000', menuName: '仓库设置', menuLevel: '2' },
          { menuCode: 'm32000', menuName: '物流人员设置', menuLevel: '2' },
          { menuCode: 'm36000', menuName: '联单提报', menuLevel: '2' },
          { menuCode: 'm33000', menuName: '系统账号设置', menuLevel: '2' },
          { menuCode: 'm35000', menuName: '企业年审提报', menuLevel: '2' },
          { menuCode: 'm34000', menuName: '企业资料修改', menuLevel: '2' },
        ],
      }
    },
  },

  // user logout
  {
    url: '/corp/user/logout',
    type: 'get',
    response: (_) => {
      // return {
      //   code: 20000,
      //   data: 'success',
      // }
      return true
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
