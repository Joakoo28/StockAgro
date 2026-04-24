function DashboardPage({ usuario, perfil, logout }) {
  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <h2>🌱 StockAgro</h2>

        <nav>
          <button className="menu-item active">Panel principal</button>
          <button className="menu-item">Lotes</button>
          <button className="menu-item">Cultivos</button>
          <button className="menu-item">Insumos</button>
          <button className="menu-item">Tareas</button>
          <button className="menu-item">Cosechas</button>
          <button className="menu-item">Reportes</button>
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
            <p>8</p>
            <span>Superficie total registrada</span>
          </div>

          <div className="stat-card">
            <h3>Cultivos en campaña</h3>
            <p>4</p>
            <span>Soja, maíz, trigo y pastura</span>
          </div>

          <div className="stat-card warning">
            <h3>Stock bajo</h3>
            <p>3</p>
            <span>Insumos requieren reposición</span>
          </div>

          <div className="stat-card">
            <h3>Tareas pendientes</h3>
            <p>6</p>
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
                <tr>
                  <td>Fumigación</td>
                  <td>Lote 1</td>
                  <td><span className="badge pending">Pendiente</span></td>
                  <td>22/04/2026</td>
                </tr>
                <tr>
                  <td>Siembra</td>
                  <td>Lote 3</td>
                  <td><span className="badge done">Realizada</span></td>
                  <td>20/04/2026</td>
                </tr>
                <tr>
                  <td>Fertilización</td>
                  <td>Lote 2</td>
                  <td><span className="badge pending">Pendiente</span></td>
                  <td>25/04/2026</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  )
}

export default DashboardPage