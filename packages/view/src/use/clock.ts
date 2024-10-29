import { onUnmounted, ref } from 'vue'

function getFormatTime(): string {
  const now = new Date()
  const hours = now.getHours()
  const minutes = now.getMinutes()
  const seconds = now.getSeconds()
  return [
    hours,
    minutes,
    seconds,
  ].map(num => (`00${num}`).slice(-2)).join(':')
}

export function useClock() {
  const clock = ref(getFormatTime())
  const interval = setInterval(() => clock.value = getFormatTime(), 10)
  onUnmounted(() => clearInterval(interval))
  return clock
}
