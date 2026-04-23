import { useState } from 'react'

function RegisterPage({ register, volverLogin, mensaje }) {
  const [nombreCompleto, setNombreCompleto] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const manejarRegistro = async () => {
    await register(nombreCompleto, email, password)
  }

  return (
    <div className="auth-container">
      <div className="card">
        <h1>🌱 StockAgro</h1>
        <h2>Registro</h2>

        <input
          type="text"
          placeholder="Nombre completo"
          value={nombreCompleto}
          onChange={(e) => setNombreCompleto(e.target.value)}
        />

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={manejarRegistro}>Registrarse</button>

        <p className="mensaje">{mensaje}</p>

        <p className="link" onClick={volverLogin}>
          Volver al login
        </p>
      </div>
    </div>
  )
}

export default RegisterPage