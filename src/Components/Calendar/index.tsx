import { CaretLeft, CaretRight } from 'phosphor-react'
import { getWeekDays } from '../../utils/get-week-days'
import { useMemo, useState } from 'react'
import {
  CalendarActions,
  CalendarBody,
  CalendarContainer,
  CalendarDay,
  CalendarHeader,
  CalendarTitle,
} from './styles'
import dayjs from 'dayjs'

interface CalendarWeek {
  week: number;
  days: Array<{
    date: dayjs.Dayjs
    disabled: boolean
  }>
}

type CalendarWeeks = CalendarWeek[]

interface CalendarProps {
  selectedDate: Date | null
  onDateSelected: (date: Date) => void
}

export function Calendar({ selectedDate, onDateSelected }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs().set('date', 1)
  })

  function handlePreviousMonth() {
    const previousMonth = currentDate.subtract(1, 'month')

    setCurrentDate(previousMonth)
  }

  function handleNextMonth() {
    const nextMonth = currentDate.add(1, 'month')

    setCurrentDate(nextMonth)
  }

  const shortWeekDays = getWeekDays({ short: true })

  const currentMonth = currentDate.format('MMMM')
  const currentYear = currentDate.format('YYYY')

  const calendarWeeks = useMemo(() => {
    const daysInMonthArray = Array.from({
      length: currentDate.daysInMonth(),
    }).map((_, index) => {
      return currentDate.set('date', index + 1)
    })

    const firstWeekDay = currentDate.get('day')

    const previousMonthDays = Array.from({
      length: firstWeekDay,
    }).map((_, index) => {
      return currentDate.subtract(index + 1, 'day')
    }).reverse()

    const lastDayInCurrentMonth = currentDate
      .set('date', currentDate.daysInMonth())

    const lastWeekDays = lastDayInCurrentMonth.get('day')
    
    const nextMonthDays = Array.from({
      length: 7 - (lastWeekDays +1),
    }).map((_, index) => {
      return lastDayInCurrentMonth.add(index + 1, 'day')
    }).reverse()


    const calendarDays = [
      ...previousMonthDays.map((date) => {
        return { date , disabled: true }
      }),
      ...daysInMonthArray.map((date) => {
        return { date , disabled: date.endOf('day').isBefore(new Date()) }
      }),
      ...nextMonthDays.map((date) => {
        return { date , disabled: true }
      })
    ]

    const calendarWeeks = calendarDays.reduce<CalendarWeeks>(
      (weeks, _, i, original) => {
        const isNewWeek = i % 7 === 0

        if (isNewWeek){
          weeks.push({
            week: i / 7 + 1,
            days: original.slice(i, i + 7),
          })
        }

        return weeks

    }, [])
    
    return calendarWeeks
  }, [currentDate])

  return (
    <CalendarContainer>
      <CalendarHeader>
        <CalendarTitle>
          {currentMonth} <span>{currentYear}</span>
        </CalendarTitle>

        <CalendarActions>
          <button onClick={handlePreviousMonth} title="Previous month">
            <CaretLeft />
          </button>
          <button onClick={handleNextMonth} title="Previous month">
            <CaretRight />
          </button>
        </CalendarActions>
      </CalendarHeader>

      <CalendarBody>
        <thead>
          <tr>
            {shortWeekDays.map((weekDay) => (
              <th key={weekDay}>{weekDay}.</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {calendarWeeks.map((week) => (
            <tr key={week.week}>
              {week.days.map(({date, disabled}) => {
                return (
                  <td key={date.toString()}>
                    <CalendarDay 
                        onClick={() => onDateSelected(date.toDate())}
                        disabled={disabled} >
                      {date.get('date')}
                    </CalendarDay>
                  </td>)
                })}
            </tr>
          ))}
        </tbody>
      </CalendarBody>
    </CalendarContainer>
  )
}
