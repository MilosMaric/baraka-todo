interface Props {
  type?: string
  value: string
  autoFocus?: boolean
  onEnter?: () => void
  onChange: (newValue: string) => void
}

export const Input = ({ type = 'text', value, onEnter, onChange, autoFocus }: Props) => (
  <input
    type={type}
    value={value}
    autoFocus={autoFocus}
    onChange={e => onChange(e.target.value)}
    className="border-2 border-indigo-300 outline-0 rounded-md p-2 min-w-lg"
    onKeyDown={e => e.key === 'Enter' && onEnter?.()}
  />
)
