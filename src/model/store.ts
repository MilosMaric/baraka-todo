import { Filter, Sort, TodoItem } from './types.ts'
import { create } from 'zustand/react'
import { v4 as uuid } from 'uuid'
import { persist } from 'zustand/middleware'
import { addDays, isAfter } from 'date-fns'
import { fetchQuote } from '../utils/fetchQuote.ts'

interface AppStore {
  sort: Sort
  filter: Filter
  loggedUser?: string

  todos: TodoItem[]
  sortedTodos: () => TodoItem[]
  filteredTodos: () => TodoItem[]
  loggedUsersTodos: () => TodoItem[]

  nextSort: () => Sort

  setNextSort: () => void
  setFilter: (filter: Filter) => void

  logout: () => void
  addTodo: (title: string) => void
  removeTodo: (id: string) => void
  login: (username: string) => void
  toggleCompleted: (id: string) => void
  extendDueDate: (id: string, days: number) => void
}

const getRelativeDate = ({ date = new Date(), days }: { date?: Date; days: number }) =>
  addDays(date, days)

const parseTitle = (title: string): Pick<TodoItem, 'title' | 'dueDate'> => {
  const match = title.match(/^(.*)\+(\d+)$/)
  if (match) {
    const days = parseInt(match[2])
    return {
      title: match[1].trim(),
      dueDate: getRelativeDate({ days }),
    }
  }
  return { title }
}

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      todos: [],
      sort: Sort.NoSort,
      filter: Filter.All,
      loggedUser: undefined,

      loggedUsersTodos: () => get().todos.filter(todo => todo.owner === get().loggedUser),

      filteredTodos: () =>
        get()
          .loggedUsersTodos()
          .filter(todo => {
            const filter = get().filter
            return (
              filter === Filter.All ||
              (filter === Filter.Completed && todo.completed) ||
              (filter === Filter.Active && !todo.completed)
            )
          }),

      sortedTodos: () => {
        const sort = get().sort
        const filteredTodos = get().filteredTodos()

        if (sort === Sort.NoSort) return filteredTodos

        const withDueDate = filteredTodos.filter(todo => todo.dueDate)
        const withoutDueDate = filteredTodos.filter(todo => !todo.dueDate)

        const sortedWithDueDate = withDueDate.sort((a, b) => {
          const aBeforeB = isAfter(b.dueDate!, a.dueDate!)
          if (sort === Sort.Asc) return aBeforeB ? -1 : 1
          if (sort === Sort.Desc) return aBeforeB ? 1 : -1
          return 0
        })
        return [...sortedWithDueDate, ...withoutDueDate]
      },

      nextSort: () => {
        if (get().sort === Sort.NoSort) return Sort.Asc
        if (get().sort === Sort.Asc) return Sort.Desc
        return Sort.NoSort
      },

      addTodo: async (title: string) => {
        const loggedUser = get().loggedUser
        if (!loggedUser) return

        const quote = await fetchQuote()
        set(() => ({
          todos: [
            ...get().todos,
            { ...parseTitle(title), id: uuid(), completed: false, quote, owner: loggedUser },
          ],
        }))
      },
      removeTodo: (id: string) => {
        set(() => ({
          todos: get().todos.filter(todo => todo.id !== id),
        }))
      },
      toggleCompleted: (id: string) => {
        set(() => ({
          todos: get().todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ),
        }))
      },
      extendDueDate: (id: string, days: number) => {
        set(() => ({
          todos: get().todos.map(todo =>
            todo.id === id
              ? { ...todo, dueDate: getRelativeDate({ days, date: todo.dueDate }) }
              : todo
          ),
        }))
      },

      setFilter: (filter: Filter) => {
        set(() => ({
          filter,
        }))
      },

      setNextSort: () => {
        set(() => ({
          sort: get().nextSort(),
        }))
      },

      login: (username: string) => {
        set(() => ({
          loggedUser: username,
        }))
      },
      logout: () => {
        set(() => ({
          loggedUser: undefined,
        }))
      },
    }),
    {
      name: 'todo-storage',
    }
  )
)
