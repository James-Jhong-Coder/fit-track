import dayjs from 'dayjs'

export function useDate() {
    const now = dayjs()

    const year = now.format('YYYY')
    const month = now.format('MM')
    const day = now.format('DD')

    return { year, month, day }
}
