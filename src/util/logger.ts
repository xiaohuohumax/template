import { getLogger } from 'loglevel'

const logger = getLogger('app')
logger.setLevel(import.meta.env.VITE_LOG_LEVEL || 'INFO')

export default logger
