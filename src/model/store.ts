import { Filter, Sort, TodoItem } from './types.ts'
import { create } from 'zustand/react'
import { v4 as uuid } from 'uuid'
import { persist } from 'zustand/middleware'
import { addDays, isAfter } from 'date-fns'

interface TodoStore {
  sort: Sort
  filter: Filter
  todos: TodoItem[]
  nextSort: () => Sort
  setNextSort: () => void
  sortedTodos: () => TodoItem[]
  filteredTodos: () => TodoItem[]
  addTodo: (title: string) => void
  removeTodo: (id: string) => void
  setFilter: (filter: Filter) => void
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

export const useTodoStore = create<TodoStore>()(
  persist(
    (set, get) => ({
      todos: [],
      sort: Sort.NoSort,
      filter: Filter.All,

      filteredTodos: () =>
        get().todos.filter(todo => {
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

      addTodo: (title: string) => {
        set(() => ({
          todos: [...get().todos, { ...parseTitle(title), id: uuid(), completed: false }],
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
    }),
    {
      name: 'todo-storage',
    }
  )
)
