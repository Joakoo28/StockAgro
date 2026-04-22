import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'

function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [usuario, setUsuario] = useState(null)
  const [perfil, setPerfil] = useState(null)

  useEffect(() => {
    verificarSesion()
  }, [])

  const verificarSesion = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (user) {
      setUsuario(user)
      await cargarPerfil(user.id)
    }
  }

  const cargarPerfil = async (userId) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) {
      setMensaje(error.message)
      return
    }

    setPerfil(data)
  }

  const login = async () => {
    setMensaje('')

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setMensaje(error.message)
      return
    }

    setUsuario(data.user)
    await cargarPerfil(data.user.id)
  }

  const logout = async () => {
    await supabase.auth.signOut()
    setUsuario(null)
    setPerfil(null)
    setEmail('')
    setPassword('')
    setMensaje('')
  }

  if (usuario) {
    return (
      <div style={{ padding: 40, fontFamily: 'Arial' }}>
        <h1>🌱 StockAgro</h1>
        <h2>Panel principal</h2>

        <p><strong>Email:</strong> {usuario.email}</p>
        <p><strong>Nombre:</strong> {profiles?.nombre_completo || 'Sin nombre'}</p>
        <p><strong>Rol:</strong> {profiles?.rol || 'Sin rol'}</p>

        <button onClick={logout}>Cerrar sesión</button>
      </div>
    )
  }

  return (
    <div style={{ padding: 40, fontFamily: 'Arial' }}>
      <h1>StockAgro</h1>

      <input
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={login}>Ingresar</button>

      <p>{mensaje}</p>
    </div>
  )
}

export default App