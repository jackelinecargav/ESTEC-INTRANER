//rutas Estec 
const Proveedores = resolve => { require.ensure(['../components/Administracion/Proveedores.vue'], ()=>{ resolve(require('../components/Administracion/Proveedores.vue')); }); };
const Facturas = resolve => { require.ensure(['../components/Comprobantes/Facturas.vue'], ()=>{ resolve(require('../components/Comprobantes/Facturas.vue')); }); };
const FacturasFisicas = resolve => { require.ensure(['../components/Comprobantes/facturasFisicas.vue'], ()=>{ resolve(require('../components/Comprobantes/facturasFisicas.vue')); }); };
const DetalleFactura = resolve => { require.ensure(['../components/Comprobantes/DetalleFactura.vue'], ()=>{ resolve(require('../components/Comprobantes/DetalleFactura.vue')); }); };
//rutas muni 
const Dashboard = resolve => { require.ensure(['../views/Dashboard.vue'], ()=>{ resolve(require('../views/Dashboard.vue')); }); };
const Bienvenido = resolve => { require.ensure(['../components/principal/bienvenido.vue'], ()=>{ resolve(require('../components/principal/bienvenido.vue')); }); };
const RegistrarRequisito = resolve => { require.ensure(['../components/requisitos/registrarrequisito.vue'], ()=>{ resolve(require('../components/requisitos/registrarrequisito.vue')); }); };
const BandejaRequisitos = resolve => { require.ensure(['../components/requisitos/bandejarequisitos.vue'], ()=>{ resolve(require('../components/requisitos/bandejarequisitos.vue')); }); };
const EditarRequisito = resolve => { require.ensure(['../components/requisitos/editarrequisito.vue'], ()=>{ resolve(require('../components/requisitos/editarrequisito.vue')); }); };
const perfilUsuario = resolve => { require.ensure(['../components/usuario/edicionperfil.vue'], ()=>{ resolve(require('../components/usuario/edicionperfil.vue')); }); };
const Buttons = resolve => { require.ensure(['../components/Buttons.vue'], ()=>{ resolve(require('../components/Buttons.vue')); }); };
const Badges = resolve => { require.ensure(['../components/Badges.vue'], ()=>{ resolve(require('../components/Badges.vue')); }); }; 
const Alerts = resolve => { require.ensure(['../components/Alerts.vue'], ()=>{ resolve(require('../components/Alerts.vue')); }); };
const ProgressBars = resolve => { require.ensure(['../components/ProgressBars.vue'], ()=>{ resolve(require('../components/ProgressBars.vue')); }); };
const Usuarios = resolve => { require.ensure(['../components/accesos/usuarios.vue'], ()=>{ resolve(require('../components/accesos/usuarios.vue')); }); };//usuarios
const Permisos = resolve => { require.ensure(['../components/accesos/permisos.vue'], ()=>{ resolve(require('../components/accesos/permisos.vue')); }); };//usuarios
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
const ChartJS = resolve => { require.ensure(['../components/charts/ChartJS.vue'], ()=>{ resolve(require('../components/charts/ChartJS.vue')); }); };
const GoogleMapsPage = resolve => { require.ensure(['../components/maps/google-maps/GoogleMapsPage.vue'], ()=>{ resolve(require('../components/maps/google-maps/GoogleMapsPage.vue')); }); };
const LeafletMapsPage = resolve => { require.ensure(['../components/maps/leaflet-maps/LeafletMapsPage.vue'], ()=>{ resolve(require('../components/maps/leaflet-maps/LeafletMapsPage.vue')); }); };
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

    { path : '/components/Administracion/Proveedores', name: 'Proveedores', component: Proveedores, props:true },
    { path : '/components/Comprobantes/Facturas', name: 'Pendientes', component: Facturas, props:true },
    { path : '/components/Comprobantes/facturasFisicas', name: 'Facturas Físicas', component: FacturasFisicas, props:true },
    { path : '/components/Comprobantes/DetalleFactura/:idComprobante', name: 'DetalleFactura', component: DetalleFactura, props:true },

    // // UI Components
    { path : '/components/principal/bienvenido', name: 'bienvenido', component: Bienvenido, props:true },
//CONSULTA DETALLE
   { path : '/components/requisitos/bandejarequisitos', name: 'Requisitos', component: BandejaRequisitos, props:true},
    { path : '/components/requisitos/registrarrequisito/:idArea/:idProcedimiento', name: 'registrarrequisito', component: RegistrarRequisito },
    { path : '/components/requisitos/editarrequisito/:idRequisito/:idArea', name: 'editarrequisito', component: EditarRequisito },
    { path : '/components/usuarios/permisos', name: 'permisos', component: Permisos },    
    { path : '/components/accesos/permisos', name: 'Permisos', component: Permisos, props:true},
    { path : '/components/accesos/usuarios', name: 'Usuarios', component: Usuarios, props:true},
    { path : '/components/accesos/bandejarol', name: 'Bandeja Rol', component: BandejaRol, props:true},
    { path : '/components/usuario/edicionperfil', name: 'edicionperfil', component: perfilUsuario },
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
