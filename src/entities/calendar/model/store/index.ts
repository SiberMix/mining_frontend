import addHours from 'date-fns/addHours'
import startOfHour from 'date-fns/startOfHour'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import type { tasksStoreInitialValue } from '../../types'

const endOfHour = (date: Date): Date => addHours(startOfHour(date), -12)

export const tasksCalendarStore = create<tasksStoreInitialValue>()(immer((set) => ({
  isLoading: true,
  tasks: [
    {
      id: 1,
      start: endOfHour(new Date()),
      end: addHours(endOfHour(new Date()), 2),
      description: 'сделать какую нибудь хуйню #2',
      equipment: 1,
      polygon: 1,
      work_type: 1,
      color: '#ccc'
    },
    {
      id: 2,
      start: addHours(endOfHour(new Date()), 5),
      end: addHours(endOfHour(new Date()), 5.1),
      description: 'сделать какую нибудь хуйню',
      equipment: 1,
      polygon: 1,
      work_type: 1,
      color: 'hotpink'
    }
  ],

  getTasks: (from: Date, to: Date) => {
    set({ isLoading: true })
    //todo запрос на таски по временному отрезку
  },
  addTask: () => {
  },
  editTask: () => {
  },
  deleteTask: () => {
  }
})))
