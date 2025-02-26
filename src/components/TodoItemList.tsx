import { useAppStore } from '../model/store.ts'
import { useMemo, useState } from 'react'
import { TodoItemView } from './TodoItemView.tsx'
import { Filters } from './Filters.tsx'
import { Sort } from '../model/types.ts'
import { faArrowDown, faArrowsUpDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Input } from './Input.tsx'

export const TodoItemList = () => {
  const [title, setTitle] = useState('')
  const { sortedTodos, addTodo, nextSort, setNextSort } = useAppStore()
  const sort = nextSort()

  const onEnter = () => {
    if (title) {
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
        <p className="text-2xl">New Todo item:</p>
        <div className="flex gap-1 flex-col items-center">
          <Input autoFocus value={title} onEnter={onEnter} onChange={setTitle} />
          <p className="text-indigo-300 italic text-sm">Press Enter to Add</p>
          <p className="text-indigo-300 italic text-sm">
            Finish with "+N" to add Due Date N days from now
          </p>
        </div>
      </div>
      <Filters />
      <div className="flex flex-col gap-2 w-xl">
        <div className="flex gap-2 items-center justify-end text-indigo-300">
          <p>Sort by Due date:</p>
          <FontAwesomeIcon
            size="lg"
            icon={nextSortIcon}
            onClick={setNextSort}
            className="cursor-pointer"
          />
        </div>
        <div className="flex flex-col gap-5 items-center overflow-y-auto h-[60vh] no-scrollbar">
          {sortedTodos().map(todo => (
            <TodoItemView todo={todo} key={todo.id} />
          ))}
        </div>
      </div>
    </div>
  )
}
