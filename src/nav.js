export default {
  items: [
    {
      //name: 'Vecino ' + localStorage.getItem('paternoUsuarioLogueado') + ' '+ localStorage.getItem('maternoUsuarioLogueado'),
      name: 'Vecino ',
      url: '/dashboard',
      icon: 'fa fa-dashboard'
    },
    {
      name: 'Licencias',
      url: '/components/licencias',
      icon: 'fa fa-puzzle-piece',
      children: [
        {
          name: 'Certificados',
          url: '/components/licencias/bandejacertificado',
          icon: 'fa fa-puzzle-piece',
        }
      ]
    },
    {
      name: 'Tramites',
      url: '/components/tramites',
      icon: 'fa fa-puzzle-piece',
      children: [
        {
          name: 'Trámites',
          url: '/components/tramites/bandejatramites',
          icon: 'fa fa-puzzle-piece',
        },
        {
          name: 'Consulta',
          url: '/components/tramites/consulta',
          icon: 'fa fa-puzzle-piece',
        }
      ]
    },
    {
      name: 'Citas',
      url: '/components/citas',
      icon: 'fa fa-puzzle-piece',
      children: [
        {
          name: 'Citas Presenciales',
          url: '/components/citas/bandejacitas',
          icon: 'fa fa-puzzle-piece',
        },
        {
          name: 'Agenda Virtual',
          url: '/components/citas/agendavirtual',
          icon: 'fa fa-puzzle-piece',
        },
        {
          name: 'Citas Virtuales',
          url: '/components/citas/bandejacitasagendar',
          icon: 'fa fa-puzzle-piece',
        },
        {
          name: 'Token',
          url: '/components/citas/bandejatoken',
          icon: 'fa fa-puzzle-piece',
        },
        {
          name: 'Nueva Cita',
          url: '/components/citas/nuevacita',
          icon: 'fa fa-puzzle-piece',
        },
        {
          name: 'Consulta',
          url: '/components/citas/bandejaconsulta',
          icon: 'fa fa-puzzle-piece',
        }
      ]
    },
    {
      name: 'Mantenimiento',
      url: '/components/procedimientos',
      icon: 'fa fa-puzzle-piece',
      children: [
        {
          name: 'Procedimientos',
          url: '/components/procedimientos/bandejaprocedimientos',
          icon: 'fa fa-puzzle-piece',
        },
        {
          name: 'Requisitos',
          url: '/components/requisitos/bandejarequisitos',
          icon: 'fa fa-puzzle-piece',
        },
        {
          name: 'Consulta',
          url: '/components/procedimientos/consulta',
          icon: 'fa fa-puzzle-piece',
        },
        {
          name: 'Usuarios Plataforma',
          url: '/components/mantenimiento/usuarios-plataforma',
          icon: 'fa fa-puzzle-piece',
        },
        {
          name: 'Areas',
          url: '/components/mantenimiento/mantenimientoareas',
          icon: 'fa fa-puzzle-piece',
        }
      ]  
    },
    {
      name: 'Actividades',
      url: '/components/proyectos',
      icon: 'fa fa-puzzle-piece',
      children: [
        {
          name: 'Actividades',
          url: '/components/proyectos/bandejaactividades',
          icon: 'fa fa-puzzle-piece',
        },
        {
          name: 'Proyectos',
          url: '/components/proyectos/proyectos',
          icon: 'fa fa-puzzle-piece',
        },
        {
          name: 'Requerimientos',
          url: '/components/proyectos/requerimientos',
          icon: 'fa fa-puzzle-piece',
        }        
      ]  
    },
    {
      name: 'Accesos',
      url: '/components/accesos',
      icon: 'fa fa-puzzle-piece',
      children: [
        {
          name: 'Usuarios',
          url: '/components/accesos/usuarios',
          icon: 'fa fa-puzzle-piece',
        },
        {
          name: 'Permisos',
          url: '/components/accesos/permisos',
          icon: 'fa fa-puzzle-piece',
        },
        {
          name: 'Bandeja Rol',
          url: '/components/accesos/bandejarol',
          icon: 'fa fa-puzzle-piece',
        }         
      ]  
    },
    {
      name: 'Cerrar Sesión',
      url: '/auth/login',
      icon: 'fa fa-puzzle-piece'
    }
    

  ]
}
