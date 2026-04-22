import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { Link } from 'react-router-dom'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')

  const handleReset = async (e) => {
    e.preventDefault()

    const { error } = await supabase.auth.resetPasswordForEmail(email)

    if (error) {
      alert(error.message)
      return
    }

    alert('Correo enviado.')
  }

  return (
    <div className="container">
      <h2>Recuperar contraseña</h2>

      <form onSubmit={handleReset}>
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit">Enviar</button>
      </form>

      <p><Link to="/">Volver</Link></p>
    </div>
  )
}