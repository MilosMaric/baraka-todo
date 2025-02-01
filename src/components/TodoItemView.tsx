import { useTodoStore } from '../model/store.ts'
import { TodoItem } from '../model/types.ts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCancel, faCheck, faTrash } from '@fortawesome/free-solid-svg-icons'
import cn from 'classnames'
import { formatDistanceToNow } from 'date-fns'

const dueDateModifiers = [1, 2, 3, 5, 10, 15]

export const TodoItemView = ({ todo }: { todo: TodoItem }) => {
  const { removeTodo, toggleCompleted, extendDueDate } = useTodoStore()

  return (
    <div
      className={cn(
        'flex flex-col gap-2 items-center rounded-lg border-2 outline-0 p-4 select-none w-full justify-between',
        todo.completed ? 'border-emerald-500 text' : 'border-amber-500'
      )}>
      <div
        className={cn(
          'flex items-center rounded-lg justify-between w-full',
          todo.completed ? 'text-emerald-500' : 'text-amber-500'
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
      <div className="flex justify-between w-full items-center text-indigo-400 italic text-xs">
        <div className="flex gap-2 items-center">
          <p className="text-nowrap">{todo.dueDate ? 'Snooze for' : 'Due in'}:</p>
          {dueDateModifiers.map(days => (
            <div
              key={`${todo.id}_${days}`}
              onClick={() => extendDueDate(todo.id, days)}
              className="px-1 py-0.5 rounded-lg border-1 cursor-pointer select-none border-indigo-400">
              {`${days}d`}
            </div>
          ))}
        </div>
        {todo.dueDate && (
          <p className="text-end text-xs text-indigo-400 italic w-full">{`Due in ${formatDistanceToNow(todo.dueDate)}`}</p>
        )}
      </div>
    </div>
  )
}
