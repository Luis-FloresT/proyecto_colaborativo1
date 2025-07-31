import { useState, useEffect } from 'react';

function Proyecto() {
  const [proyectos, setProyectos] = useState([]);
  const [proyectoActualIndex, setProyectoActualIndex] = useState(null);
  const [formulario, setFormulario] = useState({
    nombre: "",
    integrantes: "",
    telefono: "",
    fechaInicio: "",
    fechaFin: "",
    descripcion: ""
  });
  const [modalAbierto, setModalAbierto] = useState(false);

  // Cargar datos del localStorage al iniciar
  useEffect(() => {
    const proyectosGuardados = localStorage.getItem('proyectos')
    if (proyectosGuardados) {
      try {
        setProyectos(JSON.parse(proyectosGuardados))
      } catch (error) {
        console.error('Error al cargar proyectos:', error)
        // Si hay error, usar datos por defecto
        const proyectosDefault = [
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
        ]
        setProyectos(proyectosDefault)
        localStorage.setItem('proyectos', JSON.stringify(proyectosDefault))
      }
    } else {
      // Datos por defecto si no hay nada guardado
      const proyectosDefault = [
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
      ]
      setProyectos(proyectosDefault)
      localStorage.setItem('proyectos', JSON.stringify(proyectosDefault))
    }
  }, [])

  // Guardar en localStorage cada vez que cambien los proyectos
  useEffect(() => {
    if (proyectos.length > 0) {
      localStorage.setItem('proyectos', JSON.stringify(proyectos))
    }
  }, [proyectos])

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

    if (nombre && integrantes && telefono && fechaInicio && fechaFin && descripcion) {
      if (proyectoActualIndex === null) {
        // Crear nuevo proyecto
        const nuevoId = proyectos.length > 0 ? Math.max(...proyectos.map(p => p.id)) + 1 : 1;
        const proyectoConId = { ...formulario, id: nuevoId };
        setProyectos([...proyectos, proyectoConId]);
      } else {
        // Editar proyecto existente
        const nuevosProyectos = [...proyectos];
        nuevosProyectos[proyectoActualIndex] = { ...proyectos[proyectoActualIndex], ...formulario };
        setProyectos(nuevosProyectos);
      }
      cerrarModal();
    } else {
      alert("Por favor completa todos los campos.");
    }
  };

  const eliminarProyecto = (index) => {
    if (confirm("¿Estás seguro de que quieres eliminar este proyecto?")) {
      const nuevosProyectos = proyectos.filter((_, i) => i !== index);
      setProyectos(nuevosProyectos);
      // Si no quedan proyectos, limpiar localStorage
      if (nuevosProyectos.length === 0) {
        localStorage.removeItem('proyectos');
      }
    }
  };

  return (
    <div>
      <h2>Proyectos</h2>
      <button onClick={() => abrirModal()} style={{ marginBottom: '20px' }}>
        Agregar Proyecto
      </button>

      <div id="project-list">
        {proyectos.map((proyecto, index) => (
          <div className="project-item" key={proyecto.id || index}>
            <h3>{proyecto.nombre}</h3>
            <p><strong>Integrantes:</strong> {proyecto.integrantes}</p>
            <p><strong>Teléfono:</strong> {proyecto.telefono}</p>
            <p><strong>Fecha inicio:</strong> {proyecto.fechaInicio}</p>
            <p><strong>Fecha fin:</strong> {proyecto.fechaFin}</p>
            <p><strong>Descripción:</strong> {proyecto.descripcion}</p>
            
            <div style={{ marginTop: '12px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button
                className="complete-btn"
                style={{ backgroundColor: "#f59e0b" }}
                onClick={() => abrirModal(index)}
              >
                Editar
              </button>
              <button
                className="complete-btn"
                style={{ backgroundColor: "#ef4444" }}
                onClick={() => eliminarProyecto(index)}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {modalAbierto && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={cerrarModal}>&times;</span>
            <h3>{proyectoActualIndex === null ? 'Nuevo Proyecto' : 'Editar Proyecto'}</h3>
            
            <input
              type="text"
              placeholder="Nombre del proyecto"
              value={formulario.nombre}
              onChange={(e) => setFormulario({ ...formulario, nombre: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Integrantes"
              value={formulario.integrantes}
              onChange={(e) => setFormulario({ ...formulario, integrantes: e.target.value })}
              required
            />
            <input
              type="tel"
              placeholder="Número de celular"
              value={formulario.telefono}
              onChange={(e) => setFormulario({ ...formulario, telefono: e.target.value })}
              required
            />
            <input
              type="date"
              placeholder="Fecha de inicio"
              value={formulario.fechaInicio}
              onChange={(e) => setFormulario({ ...formulario, fechaInicio: e.target.value })}
              required
            />
            <input
              type="date"
              placeholder="Fecha de finalización"
              value={formulario.fechaFin}
              onChange={(e) => setFormulario({ ...formulario, fechaFin: e.target.value })}
              required
            />
            <textarea
              placeholder="Descripción del Proyecto"
              value={formulario.descripcion}
              onChange={(e) => setFormulario({ ...formulario, descripcion: e.target.value })}
              required
            ></textarea>

            <button onClick={guardarProyecto}>
              {proyectoActualIndex === null ? 'Guardar Proyecto' : 'Guardar Cambios'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Proyecto;
