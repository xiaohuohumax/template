import type { User } from '../schemas'
import request from '@/util/request'

export function getUserList() {
  return request.get<User[]>('/user/list')
}
