import { useTodoStore } from '../model/store.ts'
import { KeyboardEventHandler, useMemo, useState } from 'react'
import { TodoItemView } from './TodoItemView.tsx'
import { Filters } from './Filters.tsx'
import { Sort } from '../model/types.ts'
import { faArrowDown, faArrowsUpDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const TodoItemList = () => {
  const [title, setTitle] = useState('')
  const { sortedTodos, addTodo, nextSort, setNextSort } = useTodoStore()
  const sort = nextSort()

  const onKeyDown: KeyboardEventHandler<HTMLInputElement> = e => {
    if (Boolean(title) && e.key === 'Enter') {
      setTitle('')
      addTodo(title)
    }
  }

  const nextSortIcon = useMemo(() => {
    switch (sort) {
      case Sort.Asc:
        return faArrowUp
      case Sort.Desc:
        return faArrowDown
      default:
        return faArrowsUpDown
    }
  }, [sort])

  return (
    <div className="flex flex-col gap-10 items-center select-none">
      <div className="flex flex-col gap-3 items-center">
        <p className="text-2xl">New todo (press Enter to add):</p>
        <div className="flex gap-1 flex-col items-center">
          <input
            autoFocus
            type="text"
            value={title}
            onKeyDown={onKeyDown}
            placeholder="Enter Todo title"
            onChange={e => setTitle(e.target.value)}
            className="border-2 border-indigo-400 outline-0 rounded-md p-2 min-w-lg"
          />
          <p className="text-indigo-400 italic text-sm">Press Enter to Add</p>
          <p className="text-indigo-400 italic text-sm">
            Finish with "+N" to add Due Date N days from now
          </p>
        </div>
      </div>
      <Filters />
      <div className="flex flex-col gap-2 w-xl">
        <div className="flex gap-2 items-center justify-end text-indigo-400">
          <p>Sort by Due date:</p>
          <FontAwesomeIcon
            size="lg"
            icon={nextSortIcon}
            onClick={setNextSort}
            className="cursor-pointer"
          />
        </div>
        <div className="flex flex-col gap-5 items-center">
          {sortedTodos().map(todo => (
            <TodoItemView todo={todo} key={todo.id} />
          ))}
        </div>
      </div>
    </div>
  )
}
