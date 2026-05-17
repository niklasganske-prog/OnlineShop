import type { FormEvent } from 'react'
import type { UserForm } from '../types'

type RegisterFormProps = {
  form: UserForm
  onChange: (field: keyof UserForm, value: string) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  message: string
}

export default function RegisterForm({ form, onChange, onSubmit, message }: RegisterFormProps) {
  return (
    <section className="panel register-panel">
      <h2>Register</h2>
      <p>Create a simple account to start shopping.</p>
      <form onSubmit={onSubmit} className="form-grid">
        <label>
          Name
          <input
            name="name"
            value={form.name}
            onChange={(event) => onChange('name', event.target.value)}
            placeholder="Your name"
          />
        </label>
        <label>
          Email
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={(event) => onChange('email', event.target.value)}
            placeholder="you@example.com"
          />
        </label>
        <button type="submit">Register</button>
      </form>
      {message && <div className="notice">{message}</div>}
    </section>
  )
}
