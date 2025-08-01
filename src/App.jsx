import { useState } from 'react'
import Login from './components/Login'
import TaskManager from './components/TaskManager'
import Proyecto from './components/proyecto'

import './components/proyecto.css'

function App() {
  const [usuarioActual, setUsuarioActual] = useState(null)

  return (
    <div>
      <h1>Gestor de Proyectos Colaborativos</h1>

      {!usuarioActual ? (
        <Login onLogin={setUsuarioActual} />
      ) : (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <p>Bienvenido, {usuarioActual} 👋</p>
            <button 
              onClick={() => setUsuarioActual(null)}
              style={{ 
                backgroundColor: '#ef4444', 
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Cerrar Sesión
            </button>
          </div>

          <div className="main-content">
            <div className="task-section">
              <TaskManager />
            </div>
            <div className="project-section">
              <Proyecto />
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default App