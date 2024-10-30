import mockJS from 'mockjs'

const userList = mockJS.mock({
  'list|1-10': [
    {
      'id': '@id',
      'name': '@cname',
      'id|+1': 1,
      'ip': '@ip',
      'address': '@county(true)',
      'age|18-70': 20,
      'date': '@date("yyyy-MM-dd")',
      'avatar': '@image(\'200x200\')',
    },
  ],
})

export default [
  {
    url: '/api/user/list',
    method: 'get',
    response: () => userList.list,
  },
]
