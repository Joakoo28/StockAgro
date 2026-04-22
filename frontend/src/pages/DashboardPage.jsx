import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useNavigate } from 'react-router-dom'

export default function DashboardPage() {
  const [perfil, setPerfil] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const cargarPerfil = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        navigate('/')
        return
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (error) {
        alert(error.message)
        return
      }

      setPerfil(data)
    }

    cargarPerfil()
  }, [navigate])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

  return (
    <div className="container">
      <h1>Panel principal</h1>

      {perfil && (
        <>
          <p>Nombre: {perfil.nombre_completo}</p>
          <p>Email: {perfil.email}</p>
          <p>Rol: {perfil.rol}</p>
        </>
      )}

      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  )
}