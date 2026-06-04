import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

function Insumo({ volverDashboard }) {
  const [insumos, setInsumos] = useState([])
  const [mensaje, setMensaje] = useState('')
  const [editando, setEditando] = useState(null)
  

  const [form, setForm] = useState({
    nombre: '',
    tipo: '',
    stock_actual: '',
    stock_minimo: '',
  })

  useEffect(() => {
    cargarInsumos()
  }, [])

  const cargarInsumos = async () => {
    const { data, error } = await supabase
      .from('insumo')
      .select('*')
      .order('id_insumo', { ascending: true })

    if (error) {
      setMensaje('Error al cargar insumos: ' + error.message)
      return
    }

    setInsumos(data)
  }

  const limpiarFormulario = () => {
    setForm({
      nombre: '',
      tipo: '',
      stock_actual: '',
      stock_minimo: '',
    })

    setEditando(null)
  }

  const guardarInsumo = async () => {
    setMensaje('')

    if (!form.nombre || !form.tipo || form.stock_actual === '' || form.stock_minimo === '') {
      setMensaje('Complete todos los campos.')
      return
    }

    if (Number(form.stock_actual) < 0 || Number(form.stock_minimo) < 0) {
      setMensaje('El stock no puede ser negativo.')
      return
    }

    const insumo = {
      nombre: form.nombre,
      tipo: form.tipo,
      stock_actual: Number(form.stock_actual),
      stock_minimo: Number(form.stock_minimo),
    }

    if (editando) {
      const { error } = await supabase
        .from('insumo')
        .update(insumo)
        .eq('id_insumo', editando)

      if (error) {
        setMensaje('Error al modificar insumo: ' + error.message)
        return
      }

      setMensaje('Insumo modificado correctamente.')
    } else {
      const { error } = await supabase
        .from('insumo')
        .insert([insumo])

      if (error) {
        setMensaje('Error al registrar insumo: ' + error.message)
        return
      }

      setMensaje('Insumo registrado correctamente.')
    }

    limpiarFormulario()
    cargarInsumos()
  }

  const editarInsumo = (insumo) => {
    setEditando(insumo.id_insumo)

    setForm({
      nombre: insumo.nombre,
      tipo: insumo.tipo,
      stock_actual: insumo.stock_actual,
      stock_minimo: insumo.stock_minimo,
    })
  }

  const eliminarInsumo = async (id) => {
    const confirmar = window.confirm('¿Desea eliminar este insumo?')

    if (!confirmar) return

    const { error } = await supabase
      .from('insumo')
      .delete()
      .eq('id_insumo', id)

    if (error) {
      setMensaje('Error al eliminar insumo: ' + error.message)
      return
    }

    setMensaje('Insumo eliminado correctamente.')
    cargarInsumos()
  }

  return (
  <div className="dashboard-layout">
    <aside className="sidebar">
      <h2>🌱 StockAgro</h2>

      <nav>
        <button className="menu-item" onClick={volverDashboard}>
          🏠 Panel principal
        </button>
        <button className="menu-item">🌾 Lotes</button>
        <button className="menu-item">🌱 Cultivos</button>
        <button className="menu-item active">📦 Insumos</button>
        <button className="menu-item">📋 Tareas</button>
        <button className="menu-item">🚜 Cosechas</button>
        <button className="menu-item">📈 Reportes</button>
      </nav>
    </aside>

    <main className="dashboard-main">
      <header className="dashboard-header">
        <div>
          <h1>Gestión de Insumos</h1>
          <p>Alta, baja, modificación y consulta de insumos agrícolas.</p>
        </div>
      </header>

      <div className="module-grid">
        <section className="panel">
          <h2>{editando ? 'Editar insumo' : 'Nuevo insumo'}</h2>

          <input
            type="text"
            placeholder="Nombre"
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          />

          <select
              value={form.tipo}
              onChange={(e) => setForm({ ...form, tipo: e.target.value })}
            >
              <option value="">Seleccione un tipo</option>
              <option value="Liquido">Líquido</option>
              <option value="Fertilizante">Fertilizante</option>
              <option value="Semilla">Semilla</option>
           </select>

          <input
            type="number"
            placeholder="Stock actual"
            value={form.stock_actual}
            onChange={(e) => setForm({ ...form, stock_actual: e.target.value })}
          />

          <input
            type="number"
            placeholder="Stock mínimo"
            value={form.stock_minimo}
            onChange={(e) => setForm({ ...form, stock_minimo: e.target.value })}
          />

          <button onClick={guardarInsumo}>
            {editando ? 'Guardar cambios' : 'Guardar insumo'}
          </button>

          {editando && (
            <button className="secondary-btn" onClick={limpiarFormulario}>
              Cancelar edición
            </button>
          )}

          <p className="mensaje">{mensaje}</p>
        </section>

        <section className="panel">
          <h2>Listado de insumos</h2>

          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Tipo</th>
                <th>Stock</th>
                <th>Mínimo</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {insumos.map((insumo) => (
                <tr key={insumo.id_insumo}>
                  <td>{insumo.nombre}</td>
                  <td>{insumo.tipo}</td>
                  <td>{insumo.stock_actual}</td>
                  <td>{insumo.stock_minimo}</td>
                  <td>
                    {Number(insumo.stock_actual) <= Number(insumo.stock_minimo) ? (
                      <span className="badge pending">Stock bajo</span>
                    ) : (
                      <span className="badge done">Disponible</span>
                    )}
                  </td>
                  <td className="acciones">
                   <button
                         className="table-btn"
                         onClick={() => editarInsumo(insumo)}
                        >
                         ✏️ Editar
                    </button>

                    <button
                      className="table-btn danger"
                      onClick={() => eliminarInsumo(insumo.id_insumo)}
                    >
                      🗑️ Eliminar
                    </button>
                  </td>
                </tr>
              ))}

              {insumos.length === 0 && (
                <tr>
                  <td colSpan="6">No hay insumos registrados.</td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </div>
    </main>
  </div>
)
}

export default Insumo