import request from '@/utils/request'

interface TestRes { }

export async function test() {
  return request<TestRes>({
    url: 'test',
    method: 'GET',
  })
}
