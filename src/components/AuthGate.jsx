import { useState } from 'react'

const ACCESS_PASSWORD = 'Citarella2026!'
const STORAGE_KEY = 'citarella-site-access'

export default function AuthGate({ children }) {
  const [isUnlocked, setIsUnlocked] = useState(() => sessionStorage.getItem(STORAGE_KEY) === 'granted')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    if (password === ACCESS_PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, 'granted')
      setIsUnlocked(true)
      setError('')
      return
    }

    setError('Password non corretta')
    setPassword('')
  }

  if (isUnlocked) {
    return children
  }

  return (
    <main className="access-gate">
      <form className="access-panel" onSubmit={handleSubmit}>
        <span className="access-eyebrow">Area riservata</span>
        <h1>Eco Asfalti</h1>
        <p>Inserisci la password per visualizzare questa proposta.</p>
        <label htmlFor="access-password">Password</label>
        <input
          id="access-password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="current-password"
          autoFocus
        />
        {error && <p className="access-error">{error}</p>}
        <button type="submit">Entra</button>
      </form>
    </main>
  )
}
