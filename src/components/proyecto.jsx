import React, { useState, useEffect } from 'react';

// Hook personalizado para persistencia de datos en memoria
const usePersistedState = (key, defaultValue) => {
  const [state, setState] = useState(() => {
    // En un entorno real usarías localStorage aquí
    // Para Claude.ai, usamos memoria
    return defaultValue;
  });

  // Simular persistencia (en memoria durante la sesión)
  const setValue = (value) => {
    setState(value);
    // En un entorno real: localStorage.setItem(key, JSON.stringify(value));
  };

  return [state, setValue];
};

// Componente Login mejorado
const Login = ({ onLogin }) => {
  const [usuarios, setUsuarios] = usePersistedState('usuarios', []);
  const [modoRegistro, setModoRegistro] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [formData, setFormData] = useState({
    usuario: '',
    clave: '',
    nombre: '',
    correo: '',
    confirmarClave: ''
  });

  const limpiarCampos = () => {
    setFormData({
      usuario: '',
      clave: '',
      nombre: '',
      correo: '',
      confirmarClave: ''
    });
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRegistro = (e) => {
    e.preventDefault();
    const { usuario, clave, confirmarClave, nombre, correo } = formData;

    if (!usuario || !clave || !confirmarClave || !nombre || !correo) {
      setMensaje('Por favor completa todos los campos.');
      return;
    }

    if (clave !== confirmarClave) {
      setMensaje('Las contraseñas no coinciden ❌');
      return;
    }

    const yaExiste = usuarios.some(u => u.usuario === usuario);
    if (yaExiste) {
      setMensaje('El nombre de usuario ya está en uso ❌');
      return;
    }

    const nuevoUsuario = { usuario, clave, nombre, correo };
    setUsuarios([...usuarios, nuevoUsuario]);
    setMensaje('Cuenta creada con éxito ✅ Inicia sesión');
    setModoRegistro(false);
    limpiarCampos();
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const { usuario, clave } = formData;
    
    const encontrado = usuarios.find(u => u.usuario === usuario && u.clave === clave);
    if (encontrado) {
      setMensaje('Inicio de sesión exitoso ✅');
      onLogin(encontrado.nombre || usuario);
      limpiarCampos();
    } else {
      setMensaje('Usuario o contraseña incorrectos ❌');
    }
  };

  return (
    <div style={{ 
      maxWidth: '400px', 
      margin: '0 auto', 
      padding: '20px', 
      backgroundColor: '#fff', 
      borderRadius: '10px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ textAlign: 'center', color: '#1e3a8a', marginBottom: '20px' }}>
        {modoRegistro ? 'Crear cuenta' : 'Iniciar sesión'}
      </h2>

      <form onSubmit={modoRegistro ? handleRegistro : handleLogin}>
        {modoRegistro && (
          <>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Nombre completo:
              </label>
              <input
                type="text"
                value={formData.nombre}
                onChange={(e) => handleInputChange('nombre', e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                  boxSizing: 'border-box'
                }}
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Correo electrónico:
              </label>
              <input
                type="email"
                value={formData.correo}
                onChange={(e) => handleInputChange('correo', e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </>
        )}

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Usuario:
          </label>
          <input
            type="text"
            value={formData.usuario}
            onChange={(e) => handleInputChange('usuario', e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Contraseña:
          </label>
          <input
            type="password"
            value={formData.clave}
            onChange={(e) => handleInputChange('clave', e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              boxSizing: 'border-box'
            }}
          />
        </div>

        {modoRegistro && (
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Confirmar contraseña:
            </label>
            <input
              type="password"
              value={formData.confirmarClave}
              onChange={(e) => handleInputChange('confirmarClave', e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #ccc',
                boxSizing: 'border-box'
              }}
            />
          </div>
        )}

        <button 
          type="submit" 
          style={{ 
            width: '100%',
            padding: '12px',
            backgroundColor: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            marginTop: '10px'
          }}
        >
          {modoRegistro ? 'Crear cuenta' : 'Iniciar sesión'}
        </button>
      </form>

      {mensaje && (
        <p style={{ 
          marginTop: '15px', 
          textAlign: 'center',
          padding: '10px',
          borderRadius: '5px',
          backgroundColor: mensaje.includes('✅') ? '#d1fae5' : '#fee2e2',
          color: mensaje.includes('✅') ? '#065f46' : '#991b1b'
        }}>
          {mensaje}
        </p>
      )}

      <p style={{ marginTop: '20px', textAlign: 'center' }}>
        {modoRegistro ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}{' '}
        <button
          type="button"
          onClick={() => {
            setModoRegistro(!modoRegistro);
            setMensaje('');
            limpiarCampos();
          }}
          style={{
            background: 'none',
            color: '#2563eb',
            border: 'none',
            cursor: 'pointer',
            textDecoration: 'underline',
            padding: 0,
            fontWeight: 'bold',
          }}
        >
          {modoRegistro ? 'Iniciar sesión' : 'Crear una cuenta'}
        </button>
      </p>
    </div>
  );
};

// Componente TaskManager mejorado
const TaskManager = () => {
  const [tareas, setTareas] = usePersistedState('tareas', [
    {
      id: 1,
      nombre: "Diseñar interfaz",
      proyecto: "App Web CRM",
      fechaLimite: "2025-06-01",
      estado: "Pendiente"
    },
    {
      id: 2,
      nombre: "Revisión de código",
      proyecto: "Sistema Contable",
      fechaLimite: "2025-06-05",
      estado: "En progreso"
    },
    {
      id: 3,
      nombre: "Presentar informe",
      proyecto: "Auditoría interna",
      fechaLimite: "2025-06-10",
      estado: "Pendiente"
    }
  ]);

  const [tareaActualIndex, setTareaActualIndex] = useState(null);
  const [mostrarModalAdd, setMostrarModalAdd] = useState(false);
  const [mostrarModalEdit, setMostrarModalEdit] = useState(false);
  const [form, setForm] = useState({
    nombre: '',
    proyecto: '',
    fechaLimite: '',
    estado: 'Pendiente'
  });

  const abrirEditarTarea = (index) => {
    setTareaActualIndex(index);
    setForm(tareas[index]);
    setMostrarModalEdit(true);
  };

  const guardarEdicionTarea = () => {
    if (!form.nombre || !form.proyecto || !form.fechaLimite) {
      alert('Por favor completa todos los campos');
      return;
    }

    const nuevasTareas = [...tareas];
    nuevasTareas[tareaActualIndex] = { ...form, id: tareas[tareaActualIndex].id };
    setTareas(nuevasTareas);
    setMostrarModalEdit(false);
    setForm({ nombre: '', proyecto: '', fechaLimite: '', estado: 'Pendiente' });
  };

  const eliminarTarea = (index) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta tarea?")) {
      setTareas(tareas.filter((_, i) => i !== index));
    }
  };

  const marcarCompletada = (index) => {
    const nuevasTareas = [...tareas];
    nuevasTareas[index].estado = "Completada";
    setTareas(nuevasTareas);
  };

  const agregarTarea = () => {
    if (!form.nombre || !form.proyecto || !form.fechaLimite) {
      alert('Por favor completa todos los campos');
      return;
    }

    const nuevaId = Math.max(...tareas.map(t => t.id || 0), 0) + 1;
    const nuevaTarea = { ...form, id: nuevaId };
    setTareas([...tareas, nuevaTarea]);
    setForm({ nombre: '', proyecto: '', fechaLimite: '', estado: 'Pendiente' });
    setMostrarModalAdd(false);
  };

  const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.6)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999
      }}>
        <div style={{
          backgroundColor: '#fff',
          padding: '25px',
          borderRadius: '12px',
          width: '400px',
          maxWidth: '90%',
          position: 'relative'
        }}>
          <span 
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '8px',
              right: '15px',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#666',
              fontWeight: 'bold'
            }}
          >
            &times;
          </span>
          <h3 style={{ marginBottom: '20px', color: '#1e3a8a' }}>{title}</h3>
          {children}
        </div>
      </div>
    );
  };

  return (
    <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '12px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
      <h2 style={{ color: '#1e3a8a', textAlign: 'center', marginBottom: '20px' }}>Tareas Asignadas</h2>
      
      <button 
        onClick={() => setMostrarModalAdd(true)}
        style={{
          backgroundColor: '#2563eb',
          color: 'white',
          border: 'none',
          padding: '12px 20px',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: 'bold',
          marginBottom: '20px'
        }}
      >
        Añadir Tarea
      </button>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {tareas.map((tarea, index) => (
          <div 
            key={tarea.id || index}
            style={{
              backgroundColor: '#f1f5f9',
              padding: '20px',
              borderLeft: '6px solid #3b82f6',
              borderRadius: '12px',
              boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
            }}
          >
            <h3 style={{ color: '#1d4ed8', marginBottom: '8px' }}>{tarea.nombre}</h3>
            <p style={{ margin: '4px 0', color: '#374151' }}><strong>Proyecto:</strong> {tarea.proyecto}</p>
            <p style={{ margin: '4px 0', color: '#374151' }}><strong>Fecha límite:</strong> {tarea.fechaLimite}</p>
            <p style={{ margin: '4px 0', color: '#374151' }}><strong>Estado:</strong> {tarea.estado}</p>
            
            <div style={{ marginTop: '12px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button 
                onClick={() => marcarCompletada(index)}
                style={{
                  backgroundColor: '#10b981',
                  color: 'white',
                  border: 'none',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}
              >
                Completar
              </button>
              <button 
                onClick={() => abrirEditarTarea(index)}
                style={{
                  backgroundColor: '#f59e0b',
                  color: 'white',
                  border: 'none',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}
              >
                Editar
              </button>
              <button 
                onClick={() => eliminarTarea(index)}
                style={{
                  backgroundColor: '#ef4444',
                  color: 'white',
                  border: 'none',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal 
        isOpen={mostrarModalAdd} 
        onClose={() => setMostrarModalAdd(false)}
        title="Nueva Tarea"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input
            placeholder="Nombre de la tarea"
            value={form.nombre}
            onChange={e => setForm({ ...form, nombre: e.target.value })}
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }}
          />
          <input
            placeholder="Proyecto"
            value={form.proyecto}
            onChange={e => setForm({ ...form, proyecto: e.target.value })}
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }}
          />
          <input
            type="date"
            value={form.fechaLimite}
            onChange={e => setForm({ ...form, fechaLimite: e.target.value })}
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }}
          />
          <select
            value={form.estado}
            onChange={e => setForm({ ...form, estado: e.target.value })}
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }}
          >
            <option>Pendiente</option>
            <option>En progreso</option>
            <option>Completada</option>
          </select>
          <button 
            onClick={agregarTarea}
            style={{
              backgroundColor: '#2563eb',
              color: 'white',
              border: 'none',
              padding: '12px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Guardar Tarea
          </button>
        </div>
      </Modal>

      <Modal 
        isOpen={mostrarModalEdit} 
        onClose={() => setMostrarModalEdit(false)}
        title="Editar Tarea"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input
            placeholder="Nombre de la tarea"
            value={form.nombre}
            onChange={e => setForm({ ...form, nombre: e.target.value })}
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }}
          />
          <input
            placeholder="Proyecto"
            value={form.proyecto}
            onChange={e => setForm({ ...form, proyecto: e.target.value })}
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }}
          />
          <input
            type="date"
            value={form.fechaLimite}
            onChange={e => setForm({ ...form, fechaLimite: e.target.value })}
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }}
          />
          <select
            value={form.estado}
            onChange={e => setForm({ ...form, estado: e.target.value })}
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }}
          />
          <button 
            onClick={guardarEdicionTarea}
            style={{
              backgroundColor: '#2563eb',
              color: 'white',
              border: 'none',
              padding: '12px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Guardar Cambios
          </button>
        </div>
      </Modal>
    </div>
  );
};

// Componente Proyecto mejorado
const Proyecto = () => {
  const [proyectos, setProyectos] = usePersistedState('proyectos', [
    {
      id: 1,
      nombre: "Rediseño Web",
      integrantes: "Juan, María",
      telefono: "0999999999",
      fechaInicio: "2025-05-01",
      fechaFin: "2025-06-01",
      descripcion: "Actualización de la interfaz web."
    },
    {
      id: 2,
      nombre: "Implementación CRM",
      integrantes: "Pedro, Ana",
      telefono: "0988888888",
      fechaInicio: "2025-05-10",
      fechaFin: "2025-07-15",
      descripcion: "Integración de un CRM para ventas."
    }
  ]);

  const [proyectoActualIndex, setProyectoActualIndex] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [formulario, setFormulario] = useState({
    nombre: "",
    integrantes: "",
    telefono: "",
    fechaInicio: "",
    fechaFin: "",
    descripcion: ""
  });

  const abrirModal = (index = null) => {
    if (index !== null) {
      setFormulario(proyectos[index]);
      setProyectoActualIndex(index);
    } else {
      setFormulario({
        nombre: "",
        integrantes: "",
        telefono: "",
        fechaInicio: "",
        fechaFin: "",
        descripcion: ""
      });
      setProyectoActualIndex(null);
    }
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setFormulario({
      nombre: "",
      integrantes: "",
      telefono: "",
      fechaInicio: "",
      fechaFin: "",
      descripcion: ""
    });
    setProyectoActualIndex(null);
  };

  const guardarProyecto = () => {
    const { nombre, integrantes, telefono, fechaInicio, fechaFin, descripcion } = formulario;

    if (!nombre || !integrantes || !telefono || !fechaInicio || !fechaFin || !descripcion) {
      alert("Por favor completa todos los campos.");
      return;
    }

    if (proyectoActualIndex === null) {
      // Crear nuevo proyecto
      const nuevoId = Math.max(...proyectos.map(p => p.id || 0), 0) + 1;
      const proyectoConId = { ...formulario, id: nuevoId };
      setProyectos([...proyectos, proyectoConId]);
    } else {
      // Editar proyecto existente
      const nuevosProyectos = [...proyectos];
      nuevosProyectos[proyectoActualIndex] = { ...proyectos[proyectoActualIndex], ...formulario };
      setProyectos(nuevosProyectos);
    }
    cerrarModal();
  };

  const eliminarProyecto = (index) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este proyecto?")) {
      setProyectos(proyectos.filter((_, i) => i !== index));
    }
  };

  return (
    <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '12px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
      <h2 style={{ color: '#1e3a8a', textAlign: 'center', marginBottom: '20px' }}>Proyectos</h2>
      
      <button 
        onClick={() => abrirModal()}
        style={{
          backgroundColor: '#2563eb',
          color: 'white',
          border: 'none',
          padding: '12px 20px',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: 'bold',
          marginBottom: '20px'
        }}
      >
        Agregar Proyecto
      </button>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {proyectos.map((proyecto, index) => (
          <div 
            key={proyecto.id || index}
            style={{
              backgroundColor: '#f1f5f9',
              padding: '20px',
              borderLeft: '6px solid #3b82f6',
              borderRadius: '12px',
              boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
            }}
          >
            <h3 style={{ color: '#1d4ed8', marginBottom: '8px' }}>{proyecto.nombre}</h3>
            <p style={{ margin: '4px 0', color: '#374151' }}><strong>Integrantes:</strong> {proyecto.integrantes}</p>
            <p style={{ margin: '4px 0', color: '#374151' }}><strong>Teléfono:</strong> {proyecto.telefono}</p>
            <p style={{ margin: '4px 0', color: '#374151' }}><strong>Fecha inicio:</strong> {proyecto.fechaInicio}</p>
            <p style={{ margin: '4px 0', color: '#374151' }}><strong>Fecha fin:</strong> {proyecto.fechaFin}</p>
            <p style={{ margin: '4px 0', color: '#374151' }}><strong>Descripción:</strong> {proyecto.descripcion}</p>
            
            <div style={{ marginTop: '12px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button
                onClick={() => abrirModal(index)}
                style={{
                  backgroundColor: '#f59e0b',
                  color: 'white',
                  border: 'none',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}
              >
                Editar
              </button>
              <button
                onClick={() => eliminarProyecto(index)}
                style={{
                  backgroundColor: '#ef4444',
                  color: 'white',
                  border: 'none',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {modalAbierto && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.6)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 999
        }}>
          <div style={{
            backgroundColor: '#fff',
            padding: '25px',
            borderRadius: '12px',
            width: '400px',
            maxWidth: '90%',
            position: 'relative'
          }}>
            <span 
              onClick={cerrarModal}
              style={{
                position: 'absolute',
                top: '8px',
                right: '15px',
                fontSize: '24px',
                cursor: 'pointer',
                color: '#666',
                fontWeight: 'bold'
              }}
            >
              &times;
            </span>
            <h3 style={{ marginBottom: '20px', color: '#1e3a8a' }}>
              {proyectoActualIndex === null ? 'Nuevo Proyecto' : 'Editar Proyecto'}
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <input
                type="text"
                placeholder="Nombre del proyecto"
                value={formulario.nombre}
                onChange={(e) => setFormulario({ ...formulario, nombre: e.target.value })}
                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }}
              />
              <textarea
                placeholder="Descripción del Proyecto"
                value={formulario.descripcion}
                onChange={(e) => setFormulario({ ...formulario, descripcion: e.target.value })}
                style={{ 
                  width: '100%', 
                  padding: '10px', 
                  borderRadius: '6px', 
                  border: '1px solid #ccc', 
                  boxSizing: 'border-box',
                  minHeight: '80px',
                  resize: 'vertical'
                }}
              />

              <button 
                onClick={guardarProyecto}
                style={{
                  backgroundColor: '#2563eb',
                  color: 'white',
                  border: 'none',
                  padding: '12px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                {proyectoActualIndex === null ? 'Guardar Proyecto' : 'Guardar Cambios'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Componente principal de la aplicación
const App = () => {
  const [usuarioActual, setUsuarioActual] = useState(null);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #dbeafe, #f0fdf4)',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '30px',
        backgroundColor: '#fff',
        borderRadius: '20px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
      }}>
        <h1 style={{
          textAlign: 'center',
          color: '#1e3a8a',
          marginBottom: '30px',
          fontSize: '2.5rem'
        }}>
          Gestor de Proyectos Colaborativos
        </h1>

        {!usuarioActual ? (
          <Login onLogin={setUsuarioActual} />
        ) : (
          <>
            <div style={{
              textAlign: 'center',
              marginBottom: '30px',
              padding: '15px',
              backgroundColor: '#f0fdf4',
              borderRadius: '10px',
              border: '1px solid #bbf7d0'
            }}>
              <p style={{ 
                margin: 0, 
                color: '#065f46', 
                fontSize: '18px',
                fontWeight: 'bold'
              }}>
                Bienvenido, {usuarioActual} 👋
              </p>
              <button
                onClick={() => setUsuarioActual(null)}
                style={{
                  marginTop: '10px',
                  backgroundColor: '#ef4444',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                Cerrar Sesión
              </button>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
              gap: '30px',
              alignItems: 'start'
            }}>
              <TaskManager />
              <Proyecto />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default App; '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }}