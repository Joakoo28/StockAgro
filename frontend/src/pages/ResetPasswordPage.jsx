import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

function ResetPasswordPage({ volverLogin }) {
  const [password, setPassword] = useState('')
  const [confirmacion, setConfirmacion] = useState('')
  const [mensaje, setMensaje] = useState('')

  useEffect(() => {
    procesarRecovery()
  }, [])

  const procesarRecovery = async () => {
    const hash = window.location.hash

    if (!hash) return

    const params = new URLSearchParams(hash.substring(1))

    const access_token = params.get('access_token')
    const refresh_token = params.get('refresh_token')

    if (!access_token || !refresh_token) return

    const { error } = await supabase.auth.setSession({
      access_token,
      refresh_token,
    })

    if (error) {
      setMensaje(error.message)
    }
  }

  const cambiarPassword = async () => {
    setMensaje('')

    if (password !== confirmacion) {
      setMensaje('Las contraseñas no coinciden.')
      return
    }

    const { error } = await supabase.auth.updateUser({
      password: password,
    })

    if (error) {
      setMensaje(error.message)
      return
    }

    setMensaje('Contraseña actualizada correctamente.')
  }

  return (
    <div className="auth-container">
      <div className="card">
        <h1>🌱 StockAgro</h1>
        <h2>Nueva contraseña</h2>

        <input
          type="password"
          placeholder="Nueva contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Repetir contraseña"
          value={confirmacion}
          onChange={(e) => setConfirmacion(e.target.value)}
        />

        <button onClick={cambiarPassword}>
          Guardar contraseña
        </button>

        <p className="mensaje">{mensaje}</p>

        <p className="link" onClick={volverLogin}>
          Volver al login
        </p>
      </div>
    </div>
  )
}

export default ResetPasswordPage