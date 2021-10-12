// Dynamic Loading Modules

// Views
const Dashboard = resolve => { require.ensure(['../views/Dashboard.vue'], ()=>{ resolve(require('../views/Dashboard.vue')); }); };

// UI Components
const Bienvenido = resolve => { require.ensure(['../components/principal/bienvenido.vue'], ()=>{ resolve(require('../components/principal/bienvenido.vue')); }); };
const CertificadoBandeja = resolve => { require.ensure(['../components/CertificadoBandeja.vue'], ()=>{ resolve(require('../components/CertificadoBandeja.vue')); }); };
const EditarCertificado = resolve => { require.ensure(['../components/licencias/editarcertificado.vue'], ()=>{ resolve(require('../components/licencias/editarcertificado.vue')); }); };
const BandejaCertificado = resolve => { require.ensure(['../components/licencias/bandejacertificado.vue'], ()=>{ resolve(require('../components/licencias/bandejacertificado.vue')); }); };
const BandejaTramites = resolve => { require.ensure(['../components/tramites/bandejatramites.vue'], ()=>{ resolve(require('../components/tramites/bandejatramites.vue')); }); };
const BandejaProcedimientos = resolve => { require.ensure(['../components/procedimientos/bandejaprocedimientos.vue'], ()=>{ resolve(require('../components/procedimientos/bandejaprocedimientos.vue')); }); };
const RegistrarProcedimiento = resolve => { require.ensure(['../components/procedimientos/registrarprocedimiento.vue'], ()=>{ resolve(require('../components/procedimientos/registrarprocedimiento.vue')); }); };
const EditarProcedimiento = resolve => { require.ensure(['../components/procedimientos/editarprocedimiento.vue'], ()=>{ resolve(require('../components/procedimientos/editarprocedimiento.vue')); }); };
const VerReqProcedimiento = resolve => { require.ensure(['../components/procedimientos/verreqprocedimiento.vue'], ()=>{ resolve(require('../components/procedimientos/verreqprocedimiento.vue')); }); };
const RegistrarRequisito = resolve => { require.ensure(['../components/requisitos/registrarrequisito.vue'], ()=>{ resolve(require('../components/requisitos/registrarrequisito.vue')); }); };
const VerDetalleRequisito = resolve => { require.ensure(['../components/procedimientos/verdetallerequisito.vue'], ()=>{ resolve(require('../components/procedimientos/verdetallerequisito.vue')); }); };
const BandejaRequisitos = resolve => { require.ensure(['../components/requisitos/bandejarequisitos.vue'], ()=>{ resolve(require('../components/requisitos/bandejarequisitos.vue')); }); };
const EditarRequisito = resolve => { require.ensure(['../components/requisitos/editarrequisito.vue'], ()=>{ resolve(require('../components/requisitos/editarrequisito.vue')); }); };
const Consulta = resolve => { require.ensure(['../components/procedimientos/consulta.vue'], ()=>{ resolve(require('../components/procedimientos/consulta.vue')); }); };
const EditarTramite = resolve => { require.ensure(['../components/tramites/editartramite.vue'], ()=>{ resolve(require('../components/tramites/editartramite.vue')); }); };
const EditarTramite2 = resolve => { require.ensure(['../components/tramites/editartramite2.vue'], ()=>{ resolve(require('../components/tramites/editartramite2.vue')); }); };
const ReporteIntegrado = resolve => { require.ensure(['../components/tramites/reporteintegrado.vue'], ()=>{ resolve(require('../components/tramites/reporteintegrado.vue')); }); };
const Certificado = resolve => { require.ensure(['../components/licencias/certificado.vue'], ()=>{ resolve(require('../components/licencias/certificado.vue')); }); };
const Reniec = resolve => { require.ensure(['../components/consultaspide/consultareniec.vue'], ()=>{ resolve(require('../components/consultaspide/consultareniec')); }); };
const Sunat = resolve => { require.ensure(['../components/consultaspide/consultasunat.vue'], ()=>{ resolve(require('../components/consultaspide/consultasunat')); }); };
const Sunarp = resolve => { require.ensure(['../components/consultaspide/consultasunarp.vue'], ()=>{ resolve(require('../components/consultaspide/consultasunarp')); }); };
const CarnetExtranjeria = resolve => { require.ensure(['../components/consultaspide/consultacarnetextranjeria.vue'], ()=>{ resolve(require('../components/consultaspide/consultacarnetextranjeria')); }); };
const AntecedentesPoliciales = resolve => { require.ensure(['../components/consultaspide/consultaantecedentes.vue'], ()=>{ resolve(require('../components/consultaspide/consultaantecedentes')); }); };
const TipoCambio = resolve => { require.ensure(['../components/consultaspide/consultatipocambio.vue'], ()=>{ resolve(require('../components/consultaspide/consultatipocambio')); }); };
const MantenimientoAreas = resolve => { require.ensure(['../components/mantenimiento/mantenimientoareas.vue'], ()=>{ resolve(require('../components/mantenimiento/mantenimientoareas.vue')); }); };
const perfilUsuario = resolve => { require.ensure(['../components/usuario/edicionperfil.vue'], ()=>{ resolve(require('../components/usuario/edicionperfil.vue')); }); };
const Buttons = resolve => { require.ensure(['../components/Buttons.vue'], ()=>{ resolve(require('../components/Buttons.vue')); }); };
const Badges = resolve => { require.ensure(['../components/Badges.vue'], ()=>{ resolve(require('../components/Badges.vue')); }); }; 
const Alerts = resolve => { require.ensure(['../components/Alerts.vue'], ()=>{ resolve(require('../components/Alerts.vue')); }); };
const ProgressBars = resolve => { require.ensure(['../components/ProgressBars.vue'], ()=>{ resolve(require('../components/ProgressBars.vue')); }); };
const Usuarios = resolve => { require.ensure(['../components/accesos/usuarios.vue'], ()=>{ resolve(require('../components/accesos/usuarios.vue')); }); };//usuarios
const Permisos = resolve => { require.ensure(['../components/accesos/permisos.vue'], ()=>{ resolve(require('../components/accesos/permisos.vue')); }); };//usuarios
const ConsultaTramite = resolve => { require.ensure(['../components/tramites/consulta.vue'], ()=>{ resolve(require('../components/tramites/consulta.vue')); }); };
const BandejaRol = resolve => { require.ensure(['../components/accesos/bandejarol.vue'], ()=>{ resolve(require('../components/accesos/bandejarol.vue')); }); };//usuarios
const BasicForms = resolve => { require.ensure(['../components/forms/BasicForms.vue'], ()=>{ resolve(require('../components/forms/BasicForms.vue')); }); };
const Grids = resolve => { require.ensure(['../components/Grids.vue'], ()=>{ resolve(require('../components/Grids.vue')); }); };
const Widgets = resolve => { require.ensure(['../components/Widgets.vue'], ()=>{ resolve(require('../components/Widgets.vue')); }); };
const Typography = resolve => { require.ensure(['../components/Typography.vue'], ()=>{ resolve(require('../components/Typography.vue')); }); };
const Icons = resolve => { require.ensure(['../components/icons/Icons.vue'], ()=>{ resolve(require('../components/icons/Icons.vue')); }); };
const SetsList = resolve => { require.ensure(['../components/icons/SetsList.vue'], ()=>{ resolve(require('../components/icons/SetsList.vue')); }); };
const Sets = resolve => { require.ensure(['../components/icons/Set.vue'], ()=>{ resolve(require('../components/icons/Set.vue')); }); };
const Tables = resolve => { require.ensure(['../components/tables/Tables.vue'], ()=>{ resolve(require('../components/tables/Tables.vue')); }); };
const Modal = resolve => { require.ensure(['../components/basix-modal/BasixModal.vue'], ()=>{ resolve(require('../components/basix-modal/BasixModal.vue')); }); };
const DetalleTramite = resolve => { require.ensure(['../components/tramites/detalletramite.vue'], ()=>{ resolve(require('../components/tramites/detalletramite.vue')); }); };  
const ReportesPlataforma = resolve => { require.ensure(['../components/reportes/tramites/plataforma.vue'], ()=>{ resolve(require('../components/reportes/tramites/plataforma.vue')); }); };     
const ReportesSTD = resolve => { require.ensure(['../components/reportes/tramites/std.vue'], ()=>{ resolve(require('../components/reportes/tramites/std.vue')); }); };     
const ReportesEstadistica = resolve => { require.ensure(['../components/reportes/tramites/estadistica.vue'], ()=>{ resolve(require('../components/reportes/tramites/estadistica.vue')); }); };     
const ReporteHojaCargo = resolve => { require.ensure(['../components/tramites/ReporteHojaCargo.vue'], ()=>{ resolve(require('../components/tramites/ReporteHojaCargo.vue')); }); };    

//Charts
const ChartJS = resolve => { require.ensure(['../components/charts/ChartJS.vue'], ()=>{ resolve(require('../components/charts/ChartJS.vue')); }); };
const ReporteEstadistico = resolve => { require.ensure(['../components/citas/reporteestadistico.vue'], ()=>{ resolve(require('../components/citas/reporteestadistico.vue')); }); };

//Maps
const GoogleMapsPage = resolve => { require.ensure(['../components/maps/google-maps/GoogleMapsPage.vue'], ()=>{ resolve(require('../components/maps/google-maps/GoogleMapsPage.vue')); }); };
const LeafletMapsPage = resolve => { require.ensure(['../components/maps/leaflet-maps/LeafletMapsPage.vue'], ()=>{ resolve(require('../components/maps/leaflet-maps/LeafletMapsPage.vue')); }); };


// // User Info
// const User = resolve => { require.ensure(['../layouts/User.vue'], ()=>{ resolve(require('../layouts/User.vue')); }); };

//Pages
const Login = resolve => { require.ensure(['../pages/login/Login.vue'], ()=>{ resolve(require('../pages/login/Login.vue')); }); };
const Inicio = resolve => { require.ensure(['../pages/inicio/Inicio.vue'], ()=>{ resolve(require('../pages/inicio/Inicio.vue')); }); };
const Register = resolve => { require.ensure(['../pages/register/Register.vue'], ()=>{ resolve(require('../pages/register/Register.vue')); }); };
const Page404 = resolve => { require.ensure(['../pages/Page404.vue'], ()=>{ resolve(require('../pages/Page404.vue')); }); };
const Page500 = resolve => { require.ensure(['../pages/Page500.vue'], ()=>{ resolve(require('../pages/Page500.vue')); }); };


export const routes = [
    {
        path : '/',
        name: 'Inicio',
        components:{
            default: Inicio
        }
    },
    {   path : '/dashboard',
        components:{
            default: Dashboard
        }
    },

    // // UI Components
    { path : '/components/principal/bienvenido', name: 'bienvenido', component: Bienvenido, props:true },
    { path : '/components/licencias/editarcertificado/:idExpediente', name: 'editarcertificado', component: EditarCertificado },
    { path : '/components/licencias/bandejacertificado', name: 'Certificados', component: BandejaCertificado },
//CONSULTA DETALLE
    { path : '/components/citas/reporteestadistico', name: 'reporteestadistico', component: ReporteEstadistico },
    { path : '/components/procedimientos/bandejaprocedimientos', name: 'Procedimiento', component: BandejaProcedimientos, props:true},
    { path : '/components/procedimientos/registrarprocedimiento/:idArea', name: 'registrarprocedimiento', component: RegistrarProcedimiento },
    { path : '/components/procedimientos/verreqprocedimiento/:idProcedimiento', name: 'verreqprocedimiento', component: VerReqProcedimiento },
    { path : '/components/procedimientos/verdetallerequisito/:idRequisito/:idTipoTramite', name: 'verdetallerequisito', component: VerDetalleRequisito },
    { path : '/components/procedimientos/editarprocedimiento/:idProcedimiento/:idArea', name: 'editarprocedimiento', component: EditarProcedimiento },
    { path : '/components/procedimientos/consulta', name: 'Consulta Procedimiento', component: Consulta, props:true},
    { path : '/components/requisitos/bandejarequisitos', name: 'Requisitos', component: BandejaRequisitos, props:true},
    { path : '/components/requisitos/registrarrequisito/:idArea/:idProcedimiento', name: 'registrarrequisito', component: RegistrarRequisito },
    { path : '/components/requisitos/editarrequisito/:idRequisito/:idArea', name: 'editarrequisito', component: EditarRequisito },
    { path : '/components/tramites/bandejatramites', name: 'Tramite', component: BandejaTramites , props:true},
    { path : '/components/tramites/consulta', name: 'Consulta Tramite', component: ConsultaTramite , props:true},
    { path : '/components/tramites/editartramite/:idTramite', name: 'editartramite', component: EditarTramite },
    { path : '/components/tramites/editartramite2/:idTramite', name: 'editartramite2', component: EditarTramite2 },
    { path : '/components/tramites/detalletramite/:idTramite', name: 'detalletramite', component: DetalleTramite },
    { path : '/components/tramites/reporteintegrado', name: 'Reporte Integrado', component: ReporteIntegrado , props:true},
    { path : '/components/licencias/certificado', name: 'certificado', component: Certificado },
    { path : '/components/usuarios/permisos', name: 'permisos', component: Permisos },    
    { path : '/components/accesos/permisos', name: 'Permisos', component: Permisos, props:true},
    { path : '/components/accesos/usuarios', name: 'Usuarios', component: Usuarios, props:true},
    { path : '/components/accesos/bandejarol', name: 'Bandeja Rol', component: BandejaRol, props:true},
     { path : '/components/consultaspide/consultareniec', name: 'RENIEC', component: Reniec, props:true },    
    { path : '/components/consultaspide/consultasunat', name: 'SUNAT', component: Sunat, props:true },  
    { path : '/components/consultaspide/consultasunarp', name: 'SUNARP', component: Sunarp, props:true },
    { path : '/components/consultaspide/consultacarnetextranjeria', name: 'Carnet Extranjería', component: CarnetExtranjeria, props:true },
    { path : '/components/consultaspide/consultaantecedentes', name: 'Antecedentes Policiales', component: AntecedentesPoliciales, props:true },
    { path : '/components/consultaspide/consultatipocambio', name: 'Tipo de Cambio', component: TipoCambio, props:true },
     { path : '/components/usuario/edicionperfil', name: 'edicionperfil', component: perfilUsuario },
    { path : '/components/mantenimiento/mantenimientoareas', name: 'Areas', component: MantenimientoAreas, props:true},
    { path : '/components/reportes/plataforma', name: 'Trámites Plataforma', component: ReportesPlataforma, props:true},
    { path : '/components/reportes/std', name: 'Trámites STD', component: ReportesSTD, props:true},
    { path : '/components/reportes/estadistica', name: 'Estadística Tramite', component: ReportesEstadistica, props:true},
    { path : '/components/buttons', name: 'buttons', component: Buttons },
    { path : '/components/badges', name: 'badges', component: Badges },
    { path : '/components/alerts', name: 'alerts', component: Alerts },
    { path : '/components/progressbars', name: 'progressbars', component: ProgressBars },
    { path : '/components/basic-form', name: 'basic-form', component: BasicForms },
    { path : '/components/grids', name: 'grids', component: Grids },
    { path : '/components/widgets', name: 'widgets', component: Widgets },
    { path : '/components/typography', name: 'typography', component: Typography },
    { path : '/components/basix-modal/BasixModal', name: 'BasixModal', component: Modal },
    { path : '/components/tables', name: 'tables', component: Tables },
    { path : '/components/tramites/reportehojacargo', name: 'Reporte de Envíos', component: ReporteHojaCargo , props:true},

    {
        path : '/components/icons',
        component: Icons,
        children:[
            {
                path: '',
                component: SetsList,
                name: 'Icons'
            },
            {
                path: ':name',
                component: Sets,
                props: true,

            }
        ]
    },
    {
        path : '/components/charts',
        name: 'Charts',
        component: { render (c) { return c('router-view') }},
        children:[

            {
                path: '/components/chartjs',
                component: ChartJS,
                name: 'chart-js'
            }
        ]
    },
    {
        path : '/components/maps',
        name: 'Maps',
        component: { render (c) { return c('router-view') }},
        children:[
            {
                path: '/components/maps/google-maps',
                component: GoogleMapsPage,
                name: 'google-maps-page'
            },
            {
                path: '/components/maps/leaflet-maps',
                component: LeafletMapsPage,
                name: 'leaflet-maps-page'
            }
        ]
    },
    {
        path : '/components/auth',
        name: 'auth',
        component: { render (c) { return c('router-view') }},
        children:[
            {
                path: '/auth/login',
                component: Login,
                name: 'Cerrar Sesión',
                meta: {
                    default: false,
                    title: 'Login'
                }
            },
            {
                path: '/auth/register',
                component: Register,
                name: 'Register'
            },
            {
                path: '/auth/Page404',
                component: Page404,
                name: 'Page404'
            },
            {
                path: '/auth/Page500',
                component: Page500,
                name: 'Page500'
            }

        ]
    },

    //Redirect to Home
    { path: '/redirect-me', redirect: { name: 'home' } },

    // 404 redirect to home
    { path: '*', redirect: { name: 'Page404', component: Page404 }  }
];
