function DashboardPage({ usuario, perfil, logout, abrirInsumos }) {
  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <h2>🌱 StockAgro</h2>

        <nav>
          <button className="menu-item active">🏠 Panel principal</button>
          <button className="menu-item">🌾 Lotes</button>
          <button className="menu-item">🌱 Cultivos</button>
          <button className="menu-item" onClick={abrirInsumos}>
            📦Insumos
          </button>
          <button className="menu-item">📋 Tareas</button>
          <button className="menu-item">🚜 Cosechas</button>
          <button className="menu-item">📈 Reportes</button>
        </nav>

        <button className="logout-btn" onClick={logout}>
          Cerrar sesión
        </button>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <h1>Panel principal</h1>
            <p>Bienvenido, {perfil?.nombre_completo || usuario.email}</p>
          </div>

          <div className="user-box">
            <strong>{perfil?.rol || 'usuario'}</strong>
            <span>{usuario.email}</span>
          </div>
        </header>

        <section className="cards-grid">
          <div className="stat-card">
            <h3>Lotes activos</h3>
            <p>0</p>
            <span>Superficie total registrada</span>
          </div>

          <div className="stat-card">
            <h3>Cultivos en campaña</h3>
            <p>0</p>
            <span>empty</span>
          </div>

          <div className="stat-card warning">
            <h3>Stock bajo</h3>
            <p>0</p>
            <span>Insumos requieren reposición</span>
          </div>

          <div className="stat-card">
            <h3>Tareas pendientes</h3>
            <p>0</p>
            <span>Actividades programadas</span>
          </div>
        </section>

        <section className="dashboard-content">
          <div className="panel">
            <h2>Accesos rápidos</h2>

            <div className="quick-actions">
              <button>Registrar lote</button>
              <button>Agregar insumo</button>
              <button>Registrar tarea</button>
              <button>Cargar cosecha</button>
            </div>
          </div>

          <div className="panel"> 
            <h2>Últimas tareas</h2>

            <table>
              <thead>
                <tr>
                  <th>Tarea</th>
                  <th>Lote</th>
                  <th>Estado</th>
                  <th>Fecha</th>
                </tr>
              </thead>

              <tbody>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  )
}

export default DashboardPage