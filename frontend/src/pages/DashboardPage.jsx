function DashboardPage({ usuario, perfil, logout }) {
  return (
    <div className="dashboard-container">
      <div className="card">
        <h1>🌱 StockAgro</h1>
        <h2>Panel principal</h2>

        <p><strong>Email:</strong> {usuario.email}</p>
        <p><strong>Nombre:</strong> {perfil?.nombre_completo || 'Sin nombre'}</p>
        <p><strong>Rol:</strong> {perfil?.rol || 'Sin rol'}</p>

        <button onClick={logout}>Cerrar sesión</button>
      </div>
    </div>
  )
}

export default DashboardPage