const BandejaUsuariosPlataforma = resolve => { 
    require.ensure(['../components/mantenimiento/BandejaUsuariosPlataforma.vue'], ()=>{ 
        resolve(require('../components/mantenimiento/BandejaUsuariosPlataforma.vue')); 
    });
};
const UsuariosPlataformaDetalleAntiguo = resolve => { 
    require.ensure(['../components/mantenimiento/UsuariosPlataformaDetalleAntiguo.vue'], ()=>{ 
        resolve(require('../components/mantenimiento/UsuariosPlataformaDetalleAntiguo.vue')); 
    });
};
const UsuariosPlataformaDetalleNuevo = resolve => { 
    require.ensure(['../components/mantenimiento/UsuariosPlataformaDetalleNuevo.vue'], ()=>{ 
        resolve(require('../components/mantenimiento/UsuariosPlataformaDetalleNuevo.vue')); 
    });
};

export const routesMantenimiento = [
    { 
        path : '/components/mantenimiento/usuarios-plataforma', 
        name: 'Usuarios Plataforma', 
        component: BandejaUsuariosPlataforma
    },
    { 
        path : '/components/mantenimiento/usuarios-plataforma/antiguo/:documento/:usuario', 
        name: 'page-bandeja-usuarios-plataforma-antiguo', 
        component: UsuariosPlataformaDetalleAntiguo
    },
    { 
        path : '/components/mantenimiento/usuarios-plataforma/nuevo/:idPersona/:idRepresentante/:idUsuarioPlataforma', 
        name: 'page-bandeja-usuarios-plataforma-nuevo', 
        component: UsuariosPlataformaDetalleNuevo
    }
];