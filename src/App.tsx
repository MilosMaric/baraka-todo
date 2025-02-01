import { TodoItemList } from './components/TodoItemList.tsx'
import { useAppStore } from './model/store.ts'
import { LoginForm } from './components/LoginForm.tsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOut } from '@fortawesome/free-solid-svg-icons'

export const App = () => {
  const { loggedUser, logout } = useAppStore()

  return (
    <main className="flex flex-col gap-10 bg-zinc-800 h-[100vh] max-w-[100vw] text-indigo-300 p-15">
      {loggedUser && (
        <div className="flex justify-end">
          <button
            className="border-2 border-indigo-300 outline-0 rounded-md p-2 cursor-pointer w-3xs"
            onClick={logout}>
            <FontAwesomeIcon icon={faSignOut} className="mr-2" />
            Logout
          </button>
        </div>
      )}
      <div className="text-center text-4xl">Welcome to Baraka - Todo App</div>
      {!loggedUser && <LoginForm />}
      {loggedUser && <TodoItemList />}
    </main>
  )
}
