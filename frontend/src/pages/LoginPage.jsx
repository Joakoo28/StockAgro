import { useState } from 'react'

function LoginPage({ login, irARegistro, irARecuperar, mensaje }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const manejarLogin = async () => {
    await login(email, password)
  }

  return (
    <div className="auth-container">
      <div className="card">
        <h1>🌱 StockAgro</h1>
        <h2>Iniciar sesión</h2>

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

        <button onClick={manejarLogin}>Ingresar</button>

        <p className="mensaje">{mensaje}</p>

        <p className="link" onClick={irARecuperar}>
          ¿Olvidaste tu contraseña?
        </p>

        <p className="link" onClick={irARegistro}>
          ¿No tenés cuenta? Registrate
        </p>
      </div>
    </div>
  )
}

export default LoginPage