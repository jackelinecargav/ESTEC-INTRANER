<template>
<div class="content-wrapper">
    <div>
        <titulo-header>Lista de proveedores</titulo-header>
        <section class="content">
            <el-row :gutter="10">
                <div class="card menu">
                    <div class="desktop">
                        <el-row :gutter="10" class="d-flex justify-content-end">
                            <el-col :md="7">
                                <p>N° de RUC</p>
                            </el-col>
                            <el-col :md="10">
                                <p>Fecha</p>
                            </el-col>
                            <el-col :md="6">
                                <p>Estado</p>
                            </el-col>
                        </el-row>
                        <el-row :gutter="10" class="d-flex justify-content-end" style="margin-top: -20px !important;">
                            <el-col :md="7">
                                <el-input style="width: 250px" v-model="numeroRuc"></el-input>
                            </el-col>
                            <el-col :md="10">
                                <el-date-picker style="width: 380px !important;" v-model="fecha" type="daterange" range-separator="a" start-placeholder="Start date" end-placeholder="End date">
                                </el-date-picker>
                            </el-col>
                            <el-col :md="6">
                                <el-select v-model="estadoProveedor" placeholder="TODOS">
                                    <el-option v-for="item in tipoProveedorResultado" :key="item.idParametro" :label="item.nombre" :value="item.idParametro">
                                    </el-option>
                                </el-select>
                            </el-col>
                        </el-row><br>
                        <el-row :gutter="10" class="d-flex justify-content-end">
                            <el-col :md="6">
                                <el-button style="background-color: #51c1ff; width: 100%; color: #ffffff" icon="el-icon-search" @click="listarCuentas()">Buscar</el-button>
                            </el-col>
                        </el-row><br>
                    </div>
                    <div class="mobil">
                        <p>N° de RUC</p>
                        <el-input class="alinear" v-model="numeroRuc"></el-input>
                        <p>Fecha</p>
                        <el-date-picker class="alinear" v-model="fecha" type="daterange" range-separator="a" start-placeholder="Start date" end-placeholder="End date">
                        </el-date-picker>
                        <p>Estado</p>
                        <el-select class="alinear" v-model="estadoProveedor" placeholder="TODOS">
                            <el-option v-for="item in tipoProveedorResultado" :key="item.idParametro" :label="item.nombre" :value="item.idParametro">
                            </el-option>
                        </el-select><br>
                        <el-button style="background-color: #51c1ff; width: 100%; color: #ffffff" icon="el-icon-search" @click="listarCuentas()">Buscar</el-button><br>
                    </div>

                    <div class="contenedor-body ">
                        <table id="example2" class="table table-hover table-sm mb-2" width="100%" >
                            <thead>
                                <tr>
                                    <th><b>Razón Social</b></th>
                                    <th><b>RUC</b></th>
                                    <th class="mostrar"><b>Correo electrónico</b></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item of datosSolicitudes" :key="'solicitudes1 ' + item.idProveedor">
                                    <td>
                                        <template>{{ item.persona.nombreCompleto }}</template>
                                    </td>
                                    <td>
                                        <template>{{ item.persona.nroDocumento }}</template>
                                    </td>
                                    <td class="mostrar">
                                        <template>{{ item.usuario }}</template>
                                    </td>
                                    <td>
                                        <el-button type="primary" @click="mostrarDetalleSolicitud(item)">Detalle</el-button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <div v-if="detalleSolicitud">
                            <el-dialog title="Detalle de solicitud" :visible.sync="dialogVisible"  class="tamañoDialogo" >
                                <div class="card-solicitud mb-2 border-primary text-left bordes" style="border: 3px solid; margin-top:-20px">
                                    <div slot="header" class="cabecera text-info font-weight-bold">
                                        <span>Datos Ingresados</span>
                                    </div>
                                    <div>
                                        <b>RUC:</b> {{ detalleSolicitud.persona.nroDocumento }}
                                    </div>
                                    <div>
                                        <b>Razón Social:</b>{{ detalleSolicitud.persona.nombreCompleto }}
                                    </div>
                                    <div><b>Correo:</b> {{ detalleSolicitud.usuario }}</div>
                                    <div>
                                        <b>Teléfono:</b>{{ detalleSolicitud.persona.telefonoPrincipal }}
                                    </div>
                                </div>
                                <div class="card-solicitud mb-2 border-warning text-left bordes" style="border: 3px solid">
                                    <div slot="header" class="cabecera text-info font-weight-bold">
                                        <span>Datos SUNAT</span>
                                    </div>
                                    <template v-if="cargando">
                                        <div class="spinner-border" style="width: 3rem; height: 3rem; margin-left: 150px" role="status">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </template>
                                    <template v-else-if="validacionNombre">
                                        <div><b>RUC:</b> {{ validacionRUC }}</div>
                                        <div><b>Razón Social:</b> {{ validacionNombre }}</div>
                                        <div><b>Estado:</b> {{ validacionEstado }}</div>
                                        <div><b>Dirección:</b> {{ validacionDomicilio }}</div>
                                    </template>
                                    <template v-else>No se encontraron datos</template>
                                </div>
                                <div class="card-solicitud mb-2 border-success text-left bordes" style="border: 3px solid">
                                    <div slot="header" class="cabecera text-info font-weight-bold">
                                        <span>Datos ERP</span>
                                    </div>
                                    <template v-if="cargando">
                                        <div class="spinner-border" style="width: 3rem; height: 3rem; margin-left: 150px" role="status">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </template>
                                    <template v-else-if="datosErp">
                                        <div><b>RUC:</b> {{ datosErp.nroDocumento }}</div>
                                        <div><b>Razón Social:</b>{{ datosErp.nombreCompleto }}</div>
                                        <div><b>Dirección:</b> {{ datosErp.direccion }}</div>
                                        <div>
                                            <b>Teléfono</b>
                                            {{
                      datosErp.telefonoPrincipal == null
                        ? "-"
                        : datosErp.telefonoPrincipal
                    }}
                                        </div>
                                    </template>
                                    <template v-else>No se encontraron datos</template>
                                </div>
                                <span slot="footer" class="dialog-footer">
                                    <el-button type="danger" @click="innerVisible = true">Denegar</el-button>
                                    <el-button type="primary" @click="
                    (dialogVisible = false), activarCuenta(1)
                  ">Aprobar</el-button>
                                </span>
                                <el-dialog title="Motivo de rechazo:" width="30%" :visible.sync="innerVisible" append-to-body>
                                    <el-input type="textarea" :rows="2" placeholder="Ingrese motivo" v-model="observacion">
                                    </el-input>
                                    <div slot="footer" class="dialog-footer">
                                        <el-button type="primary" @click="validarCampoVacio()">Confirmar</el-button>
                                    </div>
                                </el-dialog>
                            </el-dialog>
                        </div>
                    </div>
                </div>
            </el-row>
        </section>
        <!--  -->
    </div>
</div>
</template>

<script>
import axios from "axios";
import TituloHeader from "../comun/TituloHeader.vue";
import constantes from "../../store/constantes";
const ESTADO_PENDIENTE = 9;
export default {
    components: {
        TituloHeader,
    },
    data() {
        return {
            fecha: null,
            estadoProveedor: 2,
            estadoUsuario: 'Pendiente',
            innerVisible: false,
            detalleSolicitud: null,
            observacion: null,
            //datos sunat
            validacionEstado: null,
            validacionNombre: null,
            validacionDomicilio: null,
            validacionRUC: null,
            datosSolicitudes: null,
            datosErp: null,

            dialogVisible: false,
            nombreRazonSocial: null,
            numeroRuc: null,
            cuenta: null,
            telefono: null,
            entidadDetraccion: "Banco de la Nacion",
            monedaDetraccion: "soles",

            cargando: null,
        };
    },
    created() {
      this.OntenerCatalogo();
      this.listarCuentas();
        
    },
    methods: {
        OntenerCatalogo() {
            let url = constantes.rutaAdmin + "/consultar-parametro";
            axios
                .get(url, {
                    params: {
                        idParametroTipo: 1,
                    },
                })
                .then((response) => {
                    this.tipoProveedorResultado = response.data.result;
                })
                .catch((e) => console.log(e));
        },
        limpiarCaracteres() {
            this.observacion = null;
        },
        validarCampoVacio() {
            if (!this.observacion) {
                // this.modal("info", "Debe ingresar un motivos", "")
                alert("Debe ingresar un motivo");
                return;
            } else if (this.observacion.length < 3) {
                alert("Debe ingresar un motivo");
                // this.modal("info", "Debe ingresar un motivos", "")
                return;
            } else {
                this.activarCuenta(this.ESTADO_RECHAZADO, this.observacion);
                this.innerVisible = false;
                this.dialogVisible = false;
            }
        },
        listarCuentas() {
            let url = constantes.rutaAdmin + "/listar-proveedores";
            axios
                .get(url, {
                    params: {
                        estado: this.estadoProveedor,
                    },
                })
                .then((response) => {
                    console.log(response.data.resultado);
                    this.datosSolicitudes = response.data.resultado;
                })
                .catch((e) => {
                    console.log(e);
                    // this.$swal({
                    //   icon: 'error',
                    //   title: 'Error',
                    //   text: "Intentelo más tarde"
                    // });
                });
        },
        modal(icono, titulo, texto) {
            this.$swal({
                icon: icono,
                title: titulo,
                text: texto,
            });
            if (this.cargando) this.cargando = false;
        },
        async activarCuenta(tipoAccion, obseracion) {
            this.cargando = true;
            let url = constantes.rutaAdmin + "/activar-proveedor";
            const params = {
                idProveedor: this.detalleSolicitud.idProveedor,
                estado: tipoAccion,
                persona: {
                    nombreCompleto: this.detalleSolicitud.persona.nombreCompleto,
                },
                usuario: this.detalleSolicitud.usuario,
                observacion: obseracion,
            };
            await axios
                .post(url, params)
                .then((response) => {
                    this.modal("success", "Se ha aprobado correctamente", "");
                    console.log("activacion exitosa");
                    console.log(response.data);
                })
                .catch(() => {
                    this.modal("info", "Ha ocurrido un error al procesar", "");
                });

            this.cargando = false;
            this.listarCuentas();
            this.limpiarCaracteres();
        },
        async mostrarDetalleSolicitud(rucSolicitud) {
            this.cargando = true;
            console.log(rucSolicitud);
            this.detalleSolicitud = rucSolicitud;
            this.dialogVisible = true;
            console.log(rucSolicitud.persona.nroDocumento);

            var url =
                "https://mz-services-test.miraflores.gob.pe:8090/api/persona/datos-sunat/" +
                rucSolicitud.persona.nroDocumento;
            const params = {
                correoUsuario: "p.gsti006@miraflores.gob.pe",
            };

            await axios
                .post(url, params)
                .then((response) => {
                    console.log(response.data);
                    this.validacionEstado = response.data.principal.sunat.estadoContrib;
                    this.validacionNombre = response.data.principal.sunat.nombresContrib;
                    this.validacionDomicilio = response.data.domicilio.sunat.domLegal;
                    this.validacionRUC = this.detalleSolicitud.persona.nroDocumento;
                })
                .catch((e) => console.log(e));
            let url2 = constantes.rutaAdmin + "/listar-proveedor-erp";
            axios
                .get(url2, {
                    params: {
                        nroDocumento: rucSolicitud.persona.nroDocumento,
                    },
                })
                .then((response) => {
                    console.log("Resonse erp");
                    console.log(response.data);
                    if (response.data.esCorrecto) {
                        this.datosErp = response.data.resultado.persona;
                    }
                })
                .catch((e) => console.log(e));
            this.cargando = null;
        },
        añadirCuenta() {
            this.$swal({
                title: "Verificar",
                text: "Datos Registrados:",
                type: "input",
                showCancelButton: true,
                closeOnConfirm: false,
                inputPlaceholder: "Write something",
            });
        },
    },
};
</script>

<style lang="scss">
.bordes {
    border-radius: 10px;
    padding: 10px;
}

.mobil {
    display: none;
}

.desktop {
    display: block;
}


@media (max-width: 500px) {
    .alinear {
        margin-top: -8px;
        margin-bottom: 10px;
        width: 100% !important;
    }
    .mostrar{
        display: none;
    }
    .mobil {
        display: block;
    }

    .desktop {
        display: none;
    }
}
</style>
