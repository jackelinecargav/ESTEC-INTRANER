const BandejaCitas = resolve => { require.ensure(['../components/citas/bandejacitas.vue'], ()=>{ resolve(require('../components/citas/bandejacitas.vue')); }); };
const AgendaVirtual = resolve => { require.ensure(['../components/citas/agendavirtual.vue'], ()=>{ resolve(require('../components/citas/agendavirtual.vue')); }); };
const BandejaCitasAgendar = resolve => { require.ensure(['../components/citas/bandejacitasagendar.vue'], ()=>{ resolve(require('../components/citas/bandejacitasagendar.vue')); }); };
const BandejaToken = resolve => { require.ensure(['../components/citas/bandejatoken.vue'], ()=>{ resolve(require('../components/citas/bandejatoken.vue')); }); };
const NuevaCita = resolve => { require.ensure(['../components/citas/nuevacita.vue'], ()=>{ resolve(require('../components/citas/nuevacita.vue')); }); };
const BandejaConsulta = resolve => { require.ensure(['../components/citas/bandejaconsulta.vue'], ()=>{ resolve(require('../components/citas/bandejaconsulta.vue')); }); };
const ConsultaDetalle = resolve => { require.ensure(['../components/citas/consultadetalle.vue'], ()=>{ resolve(require('../components/citas/consultadetalle.vue')); }); };
const Question = resolve => { require.ensure(['../components/citas/question.vue'], ()=>{ resolve(require('../components/citas/question.vue')); }); };
const ReporteEstadistico = resolve => { require.ensure(['../components/citas/reporteestadistico.vue'], ()=>{ resolve(require('../components/citas/reporteestadistico.vue')); }); };
const EncuestaCitas = resolve => { 
    require.ensure(['../components/citas/encuestacitas.vue'], 
    ()=>{ resolve(require('../components/citas/encuestacitas.vue')); 
    }); 
};
const ConsultaEncuesta = resolve => { 
    require.ensure(['../components/citas/consultaencuesta.vue'], 
    ()=>{ resolve(require('../components/citas/consultaencuesta.vue')); 
    }); 
};
const MantenimientoCitas = resolve => { require.ensure(['../components/citas/mantenimientos/mantenimientocitas.vue'], 
        ()=>{ resolve(require('../components/citas/mantenimientos/mantenimientocitas.vue')); }); 
    };

// const Mantenimiento = resolve => { 
//     require.ensure(['../components/citas/mantenimientos/mantenimientocitas.vue'], 
//     ()=>{ resolve(require('../components/citas/mantenimientos/mantenimientocitas.vue')); 
//     }); 
// };

export const routesCitas = [

    { path : '/components/citas/bandejacitas', name: 'Citas Presenciales', component: BandejaCitas, props:true},
    { path : '/components/citas/agendavirtual', name: 'Agenda Virtuales', component: AgendaVirtual, props:true},
    { path : '/components/citas/bandejacitasagendar', name: 'Citas Virtuales', component: BandejaCitasAgendar, props:true},
    { path : '/components/citas/bandejatoken', name: 'Código de Atención', component: BandejaToken, props:true},
    { path : '/components/citas/nuevacita', name: 'Nueva Cita', component: NuevaCita, props:true},
    { path : '/components/citas/bandejaconsulta', name: 'Consulta Citas', component: BandejaConsulta },
    { path : '/components/citas/question/:id', name: 'Encuesta', component: Question },
    { path : '/components/citas/reporteestadistico', name: 'Estadistica Citas', component: ReporteEstadistico, props:true},
    { path : '/components/citas/consultadetalle/:idCitaConsulta', name: 'consultadetalle', component: ConsultaDetalle },
    { 
        path : '/components/citas/encuestacitas', 
        name: 'Encuestas Consulta', 
        component: EncuestaCitas, props: true
    },
    { 
        path : '/components/citas/consultaencuesta', 
        name: 'Encuestas', 
        component: ConsultaEncuesta, props:true
    },
    { 
        path : '/components/citas/mantenimientos/mantenimientocitas', 
        name: 'Horarios',
        component: MantenimientoCitas, props:true
    }
];