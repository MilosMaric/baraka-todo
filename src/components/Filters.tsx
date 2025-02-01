import { Filter } from '../model/types.ts'
import { useAppStore } from '../model/store.ts'
import cn from 'classnames'

const filterOptions = [
  { label: 'All', value: Filter.All },
  { label: 'Active', value: Filter.Active },
  { label: 'Completed', value: Filter.Completed },
]

export const Filters = () => {
  const { filter, setFilter } = useAppStore()

  return (
    <div className="flex justify-center gap-3">
      {filterOptions.map(option => (
        <button
          key={option.value}
          onClick={() => setFilter(option.value)}
          className={cn(
            'text-xl px-3 py-1 rounded-lg border-1 cursor-pointer',
            option.value === filter ? ' border-indigo-300 text-indigo-300' : 'border-transparent'
          )}>
          {option.label}
        </button>
      ))}
    </div>
  )
}
