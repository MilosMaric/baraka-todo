import { useTodoStore } from '../model/store.ts'
import { TodoItem } from '../model/types.ts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCancel, faCheck, faTrash } from '@fortawesome/free-solid-svg-icons'
import cn from 'classnames'

export const TodoItemView = ({ todo }: { todo: TodoItem }) => {
  const { removeTodo, toggleCompleted } = useTodoStore()

  return (
    <div
      className={cn(
        'flex gap-3 items-center rounded-lg border-2 outline-0 p-4 select-none w-full justify-between max-w-xl',
        todo.completed ? 'border-emerald-500 text-emerald-500' : 'border-amber-500 text-amber-500'
      )}>
      <p className="text-2xl">{todo.title}</p>
      <div className="flex gap-3">
        <FontAwesomeIcon
          size="lg"
          className={cn(
            'cursor-pointer size-6',
            !todo.completed ? 'text-emerald-500' : 'text-amber-500'
          )}
          onClick={() => toggleCompleted(todo.id)}
          icon={todo.completed ? faCancel : faCheck}
          title={todo.completed ? 'Mark as Incomplete' : 'Mark as Completed'}
        />
        <FontAwesomeIcon
          size="lg"
          icon={faTrash}
          title={'Delete'}
          className="cursor-pointer size-6 text-rose-400"
          onClick={() => removeTodo(todo.id)}
        />
      </div>
    </div>
  )
}
