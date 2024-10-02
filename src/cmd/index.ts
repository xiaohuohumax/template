import { CMD_KEYS } from '@/constants'
import { HelloWorldCmd } from './impl/HelloWorldCmd'

export default [
  new HelloWorldCmd({ key: CMD_KEYS.helloWorld }),
]
