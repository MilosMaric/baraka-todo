import { TodoItemList } from './components/TodoItemList.tsx'

export const App = () => (
  <main className="flex flex-col gap-10 bg-zinc-800 h-[100vh] w-[100vw] text-zinc-200 p-15">
    <div className="text-center text-4xl">Welcome to Baraka - Todo App</div>
    <TodoItemList />
  </main>
)
