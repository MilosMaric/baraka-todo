import { useEffect, useState } from 'react'
import { Input } from './Input.tsx'
import { useAppStore } from '../model/store.ts'
import cn from 'classnames'

export const LoginForm = () => {
  const { login } = useAppStore()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setError(null)
  }, [username, password])

  const handleLogin = () => {
    if (!username.trim() || !password.trim()) return

    if (username.trim() !== password.trim()) {
      setError('Credentials are incorrect')
    } else {
      login(username.trim())
    }
  }

  return (
    <div
      className="flex flex-col gap-5 items-center text-center"
      onKeyDown={e => e.key === 'Enter' && handleLogin()}>
      <div className="flex flex-col gap-3 items-center">
        <p className="text-2xl">Username:</p>
        <Input value={username} onChange={setUsername} autoFocus />
      </div>
      <div className="flex flex-col gap-3 items-center">
        <p className="text-2xl">Password:</p>
        <Input value={password} onChange={setPassword} type="password" />
      </div>
      <button
        className="border-2 border-indigo-300 outline-0 rounded-md p-2 w-xs mt-4"
        onClick={handleLogin}>
        Login
      </button>
      <p className={cn('text-xs', error && 'text-rose-700')}>
        {error ?? 'Hint: Try matching username and password 😉'}
      </p>
    </div>
  )
}
