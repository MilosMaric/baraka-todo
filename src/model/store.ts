import { Filter, TodoItem } from './types.ts'
import { create } from 'zustand/react'
import { v4 as uuid } from 'uuid'
import { persist } from 'zustand/middleware'

interface TodoStore {
  filter: Filter
  todos: TodoItem[]
  filteredTodos: () => TodoItem[]
  addTodo: (title: string) => void
  removeTodo: (id: string) => void
  setFilter: (filter: Filter) => void
  toggleCompleted: (id: string) => void
}

export const useTodoStore = create<TodoStore>()(
  persist(
    (set, get) => ({
      todos: [],
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

      addTodo: (title: string) => {
        set(() => ({
          todos: [...get().todos, { id: uuid(), title, completed: false }],
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

      setFilter: (filter: Filter) => {
        set(() => ({
          filter,
        }))
      },
    }),
    {
      name: 'todo-storage',
    }
  )
)
