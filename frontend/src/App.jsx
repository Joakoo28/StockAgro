import { useEffect, useState } from 'react'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import { supabase } from './lib/supabase'
import Insumo from './pages/Insumo'

function App() {
  const [vista, setVista] = useState('login')
  const [usuario, setUsuario] = useState(null)
  const [perfil, setPerfil] = useState(null)
  const [mensaje, setMensaje] = useState('')
  const [vistaSistema, setVistaSistema] = useState('dashboard')

  useEffect(() => {
    const ruta = window.location.pathname

    if (ruta === '/reset-password') {
      setVista('reset')
    } else {
      verificarSesion()
    }
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
      .select('id, email, nombre_completo, rol, activo')
      .eq('id', userId)
      .single()

    if (error) {
      setMensaje('Error perfil: ' + error.message)
      return
    }

    setPerfil(data)
    setMensaje('')
  }

  const login = async (email, password) => {
    setMensaje('')

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setMensaje(error.message)
      return false
    }

    setUsuario(data.user)
    await cargarPerfil(data.user.id)
    return true
  }

  const register = async (nombreCompleto, email, password) => {
    setMensaje('')

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
      setMensaje(error.message)
      return false
    }

    setMensaje('Usuario registrado correctamente.')
    setVista('login')
    return true
  }

  const logout = async () => {
    await supabase.auth.signOut()
    setUsuario(null)
    setPerfil(null)
    setMensaje('')
    setVista('login')
  }

  if (vista === 'reset') {
    return (
      <ResetPasswordPage
        volverLogin={() => setVista('login')}
      />
    )
  }

  if (usuario) {
  if (vistaSistema === 'insumos') {
    return (
      <Insumo
        volverDashboard={() => setVistaSistema('dashboard')}
      />
    )
  }

  return (
    <DashboardPage
      usuario={usuario}
      perfil={perfil}
      logout={logout}
      abrirInsumos={() => setVistaSistema('insumos')}
    />
  )
}

  if (vista === 'register') {
    return (
      <RegisterPage
        register={register}
        volverLogin={() => setVista('login')}
        mensaje={mensaje}
      />
    )
  }

  if (vista === 'forgot') {
    return (
      <ForgotPasswordPage
        volverLogin={() => setVista('login')}
      />
    )
  }

  return (
    <LoginPage
      login={login}
      irARegistro={() => setVista('register')}
      irARecuperar={() => setVista('forgot')}
      mensaje={mensaje}
    />
  )
}

export default App