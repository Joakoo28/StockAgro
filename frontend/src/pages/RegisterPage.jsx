import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { Link } from 'react-router-dom'

export default function RegisterPage() {
  const [nombreCompleto, setNombreCompleto] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleRegister = async (e) => {
    e.preventDefault()

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nombre_completo: nombreCompleto,
        },
      },
    })

    if (error) {
      alert(error.message)
      return
    }

    alert('Usuario creado. Revisá tu correo.')
  }

  return (
    <div className="container">
      <h2>Registro</h2>

      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Nombre completo"
          value={nombreCompleto}
          onChange={(e) => setNombreCompleto(e.target.value)}
        />

        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Registrarse</button>
      </form>

      <p><Link to="/">Volver</Link></p>
    </div>
  )
}