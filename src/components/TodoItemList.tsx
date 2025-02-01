import { useTodoStore } from '../model/store.ts'
import { KeyboardEventHandler, useState } from 'react'
import { TodoItemView } from './TodoItemView.tsx'
import { Filters } from './Filters.tsx'

export const TodoItemList = () => {
  const [title, setTitle] = useState('')
  const { filteredTodos, addTodo } = useTodoStore()

  const onKeyDown: KeyboardEventHandler<HTMLInputElement> = e => {
    if (Boolean(title) && e.key === 'Enter') {
      setTitle('')
      addTodo(title)
    }
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-3 items-center">
        <p className="text-2xl">New todo (press Enter to add):</p>
        <input
          autoFocus
          type="text"
          value={title}
          onKeyDown={onKeyDown}
          placeholder="Enter Todo title"
          onChange={e => setTitle(e.target.value)}
          className="border-2 border-indigo-400 outline-0 rounded-md p-2 min-w-lg"
        />
      </div>
      <Filters />
      <div className="flex flex-col gap-5 items-center">
        {filteredTodos().map(todo => (
          <TodoItemView todo={todo} key={todo.id} />
        ))}
      </div>
    </div>
  )
}
