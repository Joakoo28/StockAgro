import { useState } from 'react'
import { supabase } from '../lib/supabase'

function ForgotPasswordPage({ volverLogin }) {
  const [email, setEmail] = useState('')
  const [mensaje, setMensaje] = useState('')

  const enviarRecuperacion = async () => {
    setMensaje('')

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'http://localhost:5173/reset-password',
    })

    if (error) {
      setMensaje(error.message)
      return
    }

    setMensaje('Te enviamos un correo para recuperar la contraseña.')
  }

  return (
    <div className="auth-container">
      <div className="card">
        <h1>🌱 StockAgro</h1>
        <h2>Recuperar contraseña</h2>

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button onClick={enviarRecuperacion}>Enviar correo</button>

        <p className="mensaje">{mensaje}</p>

        <p className="link" onClick={volverLogin}>
          Volver al login
        </p>
      </div>
    </div>
  )
}

export default ForgotPasswordPage