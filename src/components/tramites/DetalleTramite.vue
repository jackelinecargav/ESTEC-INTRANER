<template>
  <div class="content-wrapper">
    <loading
      :active.sync="isLoading"
      :is-full-page="true"
      color="#007BFF"
    ></loading>
    <titulo-header>Detalle de Trámites</titulo-header>
    <!-- Main content -->
    <section class="content">
      <el-row :gutter="10" class="d-flex justify-content-center">
        <el-col :md="24" class="card menu px-4">
          <el-row :gutter="10">
            <el-row :gutter="10">
              <el-col :xs="24" :md="8">
                <label
                  class="col-form-label"
                  style="text-align: right; padding-right: 0px; !important"
                >
                  Solicitud
                </label>
                <input
                  type="text"
                  class="form-control"
                  :value="'ST-00' + idTramite"
                  disabled
                />
              </el-col>
              <el-col :xs="24" :md="8">
                <template v-if="idExpedienteAnexo > 0">
                  <label class="col-form-label"> Exp. Anexo </label>
                  <input
                    type="text"
                    class="form-control"
                    :value="
                      'Exp-00' +
                      numeroExpedienteAnexo +
                      '-' +
                      anioExpedienteAnexo
                    "
                    disabled
                  />
                </template>
              </el-col>
              <el-col :xs="24" :md="8">
                <label class="col-form-label">Tipo Tramite</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="tipoTramite"
                  disabled
                />
              </el-col>
              <template v-if="idExpedienteAnexo == null">
                <el-col :xs="24" :md="8">
                  <label class="col-form-label">Unidad Orgánica</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="unidadDestino"
                    disabled
                  />
                </el-col>
              </template>
            </el-row>
            <el-row :gutter="10">
              <template v-if="idExpedienteAnexo >0">
                <el-col :xs="24" :md="8">
                  <label class="col-form-label">Unidad Orgánica</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="unidadDestino"
                    disabled
                  />
                </el-col>
              </template>
              <el-col :xs="24" :md="8">
                <label class="col-form-label"> Administrado: </label>
                <input
                  type="text"
                  class="form-control"
                  :value="solicitante"
                  disabled
                />
              </el-col>
              <el-col :xs="24" :md="8">
                <label class="col-form-label"> Documento: </label>
                <input
                  type="text"
                  class="form-control"
                  :value="documentoSolicitante"
                  disabled
                />
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :xs="24" :md="8">
                <label class="col-form-label">Fecha Creación </label>
                <input
                  type="text"
                  class="form-control"
                  :value="fechaEnRevision + ' ' + horaEnRevision"
                  disabled
                />
              </el-col>
              <el-col :xs="24" :md="8" v-if="fechaPresentacion != null">
                <label class="col-form-label"
                  >Fecha Presentación:
                </label>
                <input
                  type="text"
                  class="form-control"
                  :value="fechaPresentacion"
                  disabled
                />
              </el-col>
              <el-col :xs="24" :md="8">
                <label class="col-form-label"> Estado: </label>
                <input
                  type="text"
                  class="form-control"
                  v-model="estado"
                  disabled
                />
              </el-col>
            </el-row>
          </el-row>
          <el-row :gutter="10">
            <el-col :md="24" v-if="fechaAprobacion != null">
              <div class="py-3">
                <h4 class="card-title">Datos Aprobación</h4>
                <hr />
              </div>
              <div id="tabRequisito" class="tab-pane active">
                <div class="container" style="padding-top: 1%; !important">
                  <div class="form-group col-sm-11">
                    <div class="row">
                      <label
                        class="col-sm-2 col-form-label"
                        style="padding-right: 0px; !important"
                      >
                        <b>Documento:</b>
                      </label>
                      <div class="col-sm-3">
                        <input
                          type="text"
                          class="form-control"
                          :value="numeroDocumentoExpediente"
                          disabled
                        />
                      </div>
                      <label
                        class="col-sm-2 col-form-label"
                        style="padding-right: 0px; !important"
                        ><b>Fecha Aprobación:</b></label
                      >
                      <div class="col-sm-3">
                        <input
                          type="text"
                          class="form-control"
                          :value="fechaAprobacion"
                          disabled
                        />
                      </div>
                      <a v-bind:href="urlDescargaConstancia" target="_blank">
                        <button type="button" class="btn btn-block btn-primary">
                          Ver Constancia
                        </button>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :md="24" v-if="idPagoSamd > 0">
              <div class="py-3">
                <h4 class="card-title">Recibo</h4>
                <hr />
              </div>
              <div id="tabRequisito" class="tab-pane active">
                <div class="container" style="padding-top: 1%; !important">
                  <div class="form-group col-sm-11">
                    <div class="row">
                      <label
                        for="exampleInputPassword1"
                        class="col-sm-2 col-form-label"
                        style="padding-right: 0px; !important"
                      >
                        <b>Número Recibo:</b>
                      </label>
                      <div class="col-sm-3">
                        <input
                          type="text"
                          class="form-control"
                          :value="numeroRecibo"
                          disabled
                        />
                      </div>
                      <label
                        for="exampleInputPassword1"
                        class="col-sm-2 col-form-label"
                        style="padding-right: 0px; !important"
                      >
                        <b>Número Operación:</b>
                      </label>
                      <div class="col-sm-3">
                        <input
                          type="text"
                          class="form-control"
                          :value="numeroPedido"
                          disabled
                        />
                      </div>
                      <a
                        v-bind:href="urlDescargaRecibo + idPagoSamd + '/0'"
                        target="_blank"
                      >
                        <button class="btn btn-primary">Ver Recibo</button>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :md="24">
              <div class="py-3">
                <h4 class="card-title">Requisitos</h4>
                <hr />
              </div>
              <div id="tabRequisito" class="tab-pane active">
                <div class="container d-flex justify-content-center">
                  <div class="form-group col-sm-11">
                    <div class="">
                      <table
                        class="table table-responsive table-hover table-sm"
                      >
                        <thead class="">
                          <tr>
                            <th width="45%">Requisito</th>
                            <th width="30%">Valor</th>
                            <th width="10%">Actualización</th>
                            <th width="15%">Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="requisito of listaRequisitoModelo"
                            :key="requisito.idRequisito"
                          >
                            <td scope="row" style="text-align: left">
                              {{ requisito.nombre }}
                              <!-- <a href="javascript: void(0)" @click="AbrirModal(requisito.nombre,requisito.ayuda)"><b-icon-box-arrow-in-up-right></b-icon-box-arrow-in-up-right></a>  -->
                              <a
                                href="javascript: void(0)"
                                @click="
                                  AbrirModal(requisito.nombre, requisito.ayuda)
                                "
                              >
                                <img
                                  src="../../images/ayuda.png"
                                  alt=""
                                  srcset=""
                                  width="15"
                                  height="15"
                                />
                              </a>
                            </td>
                            <td>{{ requisito.nombreArchivo }}</td>
                            <td>{{ requisito.observacion }}</td>
                            <td
                              class="d-flex justify-content-center"
                              v-bind:style="{ display: displayAcciones }"
                            >
                              <a
                                v-bind:href="requisito.urlDescarga"
                                target="_blank"
                                style="padding: 0"
                              >
                                <el-button type="text" class="">Ver</el-button>
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :md="24">
              <div class="py-3">
                <h4 class="card-title">Adjuntos</h4>
                <hr />
              </div>
              <div id="tabArchivo" class="tab-pane active">
                <div class="container d-flex justify-content-center">
                  <div class="form-group col-sm-11">
                    <table class="table table-responsive table-hover table-sm">
                      <thead class="">
                        <tr>
                          <th width="40%">Archivo</th>
                          <th width="30%">Actualización</th>
                          <th width="30%">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="adjunto of listaAdjuntos"
                          :key="adjunto.idArchivoTramite"
                        >
                          <th scope="row">{{ adjunto.nombreArchivo }}</th>
                          <td>{{ adjunto.observacion }}</td>
                          <td class="d-flex justify-content-center">
                            <template v-if="adjunto.flagPrincipal == true">
                              <a
                                v-bind:href="
                                  urlDescarga + adjunto.idArchivoTramite + '/0'
                                "
                                target="_blank"
                              >
                                <el-button type="text" class="">Ver</el-button>
                              </a>
                            </template>
                            <template v-else>
                              <div class="row" style="pading-left: 55px">
                                <a
                                  style="
                                    padding-left: 15px;
                                    padding-right: 15px;
                                  "
                                  v-bind:href="
                                    urlDescarga +
                                    adjunto.idArchivoTramite +
                                    '/0'
                                  "
                                  target="_blank"
                                >
                                  <el-button type="text" class=""
                                    >Ver</el-button
                                  >
                                </a>
                                <!-- <button
                                  style="padding-left:15px;"
                                  class="btn btn-danger"
                                  @click="EliminarArchivo(adjunto.idArchivoTramite)"
                                  v-bind:style="{display:estiloDisplayAprobar}"
                                >Eliminar</button> -->
                              </div>
                            </template>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :md="24">
              <div class="py-3">
                <h4 class="card-title">Observaciones</h4>
                <hr />
              </div>
              <div
                v-if="fechaObservacion != null"
                id="tabObservaciones"
                class="tab-pane active"
                style="padding-top: 1%; !important"
              >
                <div class="container">
                  <div class="form-group col-sm-11">
                    <div class="form-group col-sm-11">
                      <div class="row">
                        <label
                          class="col-sm-2 col-form-label"
                          style="padding-right: 0px; !important"
                          ><b>Observación:</b></label
                        >
                        <div class="col-sm-3">
                          <input
                            type="text"
                            class="form-control"
                            :value="fechaObservacion + ' ' + horaObservacion"
                            disabled
                          />
                        </div>
                        <div
                          v-if="fechaSubsanacion != null"
                          class="form-group col-sm-4"
                        >
                          <div class="row">
                            <label
                              class="col-sm-4 col-form-label"
                              style="padding-right: 0px; !important"
                            >
                              <b>Subsanación:</b>
                            </label>
                            <div class="col-sm-8">
                              <input
                                type="text"
                                class="form-control"
                                :value="
                                  fechaSubsanacion + ' ' + horaSubsanacion
                                "
                                disabled
                              />
                            </div>
                          </div>
                        </div>
                        <div class="col-sm-3">
                          <a
                            v-bind:href="urlDescargaEsquela"
                            target="_blank"
                            style="padding: 0"
                          >
                            <button class="btn btn-success">Ver Esquela</button>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="form-group col-sm-11">
                    <div class="table-responsive">
                      <table class="table table-hover table-sm">
                        <thead class="">
                          <tr>
                            <th width="80%">Observación</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="observacion of listaObservaciones"
                            :key="observacion.idObservacion"
                          >
                            <td scope="row">{{ observacion.descripcion }}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :md="24">
              <div class="py-3">
                <h4 class="card-title">Trazabilidad</h4>
                <hr />
              </div>
              <div id="tabTrazabilidad" class="tab-pane active">
                <div class="container d-flex justify-content-center">
                  <div class="form-group col-sm-11">
                    <table class="table table-hover table-responsive table-sm">
                      <thead class="">
                        <tr>
                          <th width="10%">Acción</th>
                          <th width="20%">Usuario</th>
                          <th width="10%">Fecha</th>
                          <th width="30%">Unidad</th>
                          <th width="30%">Observación</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="traza of listaTrazabilidad" :key="traza.id">
                          <td width="10%">{{ traza.accion }}</td>
                          <td width="20%">{{ traza.usuario }}</td>
                          <td width="10%">{{ traza.fecha }}</td>
                          <td width="30%">{{ traza.unidadTramite }}</td>
                          <td width="30%">{{ traza.observacion }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <div>
        <b-modal id="desestimarModal" hide-footer>
          <div class="d-block text-center">
            <h3>Motivo</h3>
          </div>
          <div>
            <input
              type="text"
              class="form-control"
              v-model="mensajeDesestimacion"
            />
          </div>
          <b-button class="mt-3" block @click="Desestimar()"
            >Desestimar</b-button
          >
        </b-modal>
        <b-modal id="transferirModal" hide-footer>
          <div class="row" style="padding-left: 3%">
            <label style="font-size: 15px">Unidad destino:</label>
          </div>
          <div>
            <select class="form-control" v-model="areaSeleccionada">
              <option
                v-for="area in mapListaAreas"
                :key="area.id"
                v-bind:value="area.nombreArea"
              >
                {{ area.nombreArea }}
              </option>
            </select>
          </div>
          <div class="row" style="padding-left: 3%">
            <label style="font-size: 15px">Motivo:</label>
          </div>
          <div>
            <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="2"
              v-model="mensajeTransferencia"
            ></textarea>
          </div>
          <b-button
            class="btn btn-danger mt-3"
            id="btnTransfer"
            ref="refTransfer"
            block
            @click.prevent="Transferir()"
            >Transferir</b-button
          >
          <div v-if="cargandoModal">
            <b-button variant="dark" block disabled>
              <b-spinner variant="danger" small></b-spinner>
              Cargando...
            </b-button>
          </div>
        </b-modal>
        <b-modal id="ayudaModal" hide-footer>
          <div class="d-block text-center">
            <h3>{{ nombreRequisitoModal }}</h3>
          </div>
          <div>
            <label for="">{{ ayudaRequisito }}</label>
          </div>
          <b-button class="mt-3" block @click="CerrarModal()">Cerrar</b-button>
        </b-modal>
      </div>
    </section>
    <!-- /.content -->
  </div>
</template>
<style lang="scss" scoped>
.modal-backdrop {
  opacity: 0.5;
}
.menu {
  h4 {
    font-size: 17px;
    color: #0078cf;
    font-weight: 600;
  }
}
</style>
<script>
import axios from "axios";
import Desestimar from "./Desestimar.vue";
import Constantes from "../../store/constantes.js";
import TituloHeader from "../comun/TituloHeader";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
export default {
  components: {
    Desestimar,
    TituloHeader,
    Loading,
  },
  data() {
    return {
      isLoading: false,
      showModal: false,
      observacion: "",
      labelArchivoSec: "Seleccione Archivo",
      tipoTramite: "",
      solicitante: "",
      estado: "",
      listaAdjuntos: null,
      listaObservaciones: null,
      listaObservacionesModelo: [],
      idTramite: 0,
      urlDescarga: `${Constantes.entidadArchivo}/2/`,
      urlDescargaRecibo: `${Constantes.entidadArchivo}/7/`,
      usuarioPost: {},
      usuarioCreador: {},
      esPrincipal: false,
      estiloDisplayAprobar: "block",
      estiloDisplayDesestimar: "block",
      estiloDisplayVer: "none",
      estiloDisplayObservar: "",
      urlDescargaConstancia: "",
      idObservacion: 0,
      mensajeDesestimacion: "",
      mensajeTransferencia: "",
      listaRequisitoModelo: null,
      ayudaRequisito: "",
      nombreRequisitoModal: "",
      fechaCreacion: null,
      horaCreacion: null,
      fechaEnRevision: null,
      horaEnRevision: null,
      fechaObservacion: null,
      horaObservacion: null,
      fechaSubsanacion: null,
      horaSubsanacion: null,
      fechaAprobacion: null,
      horaAprobacion: null,
      fechaPresentacion: null,
      idExpedienteAnexo: null,
      idPagoSamd: null,
      anioExpedienteAnexo: null,
      numeroExpedienteAnexo: null,
      listaAreas: null,
      mapListaAreas: [],
      areaSeleccionada: [],
      areaTransferir: "",
      cargandoModal: false,
      idareaSesion: localStorage.getItem("codUnidadLogueado"),
      usuarioSesion: localStorage.getItem("cuenta"),
      documentoSolicitante: "",
      unidadDestino: "",
      listaTrazabilidad: null,
      usuarioTramite: "",
    };
  },
  mounted() {
    if (localStorage.getItem("logueado") == "true") {
      this.CargarTramite();
      this.ObtenerListaAdjuntos();
      this.ListarObservaciones();
      this.InicializarUsuario();
      this.obtenerAreas();
    } else {
      this.$router.push("/auth/login/");
    }
  },
  methods: {
    CargarTrazabilidad() {
      var url =
        Constantes.rutaTramite +
        "trazabilidad-tramite/" +
        this.$route.params.idTramite;
      axios
        .get(url)
        .then((response) => {
          console.log(response.data.data);
          this.listaTrazabilidad = [];
          let unidadOrigen = "";
          response.data.data.forEach((element) => {
            let traza = {};
            traza.accion = element.accion;
            traza.usuario =
              element.accion == "Revisión" ||
              element.accion == "Creación" ||
              element.accion == "Subsanación"
                ? this.usuarioTramite.toLowerCase()
                : element.desLoginUser.toLowerCase();
            traza.fecha = element.fechaCreacion + " " + element.horaCreacion;
            traza.observacion = element.observacion;
            traza.unidadTramite =
              unidadOrigen == "" ? element.unidadTramite : unidadOrigen;
            unidadOrigen =
              element.accion == "Transferencia" || unidadOrigen == ""
                ? element.unidadTramite
                : unidadOrigen;
            this.listaTrazabilidad.push(traza);
          });
        })
        .catch((e) => console.log(e));
    },
    AbrirModal(nombreRequisito, ayuda) {
      this.ayudaRequisito = ayuda;
      this.nombreRequisitoModal = nombreRequisito;
      this.$bvModal.show("ayudaModal");
    },
    CerrarModal() {
      this.$bvModal.hide("ayudaModal");
    },
    cerrarModalDesestimar() {
      this.$bvModal.hide("desestimarModal");
    },
    removeElement: function (index) {
      console.log("index eliminar observacion:" + index);
      this.listaObservaciones.splice(index, 1);
      this.ReorganizarIndicesObservaciones();
    },
    Desestimar() {
      if (this.mensajeDesestimacion == "") {
        this.$swal({
          icon: "error",
          title: "Error",
          text: "Debe ingresar un motivo.",
        });
      } else {
        this.$swal({
          title: "Guardando",
          allowOutsideClick: false,
          onBeforeOpen: () => {
            this.$swal.showLoading();
          },
        });
        var tramitePost = {};
        tramitePost.idTramite = this.idTramite;
        tramitePost.usuarioModificador = this.usuarioPost;
        tramitePost.mensajeDesestimacion = this.mensajeDesestimacion;
        console.log(tramitePost);
        var dataPost = new FormData();
        dataPost.append("tramite", JSON.stringify(tramitePost));
        axios
          .post(Constantes.rutaTramite + "desestimar/", dataPost)
          .then((response) => {
            console.log(response.data);
            this.adjuntoModeloSec = null;
            if (response.data.success) {
              this.$bvModal.hide("desestimarModal");
              this.$swal({
                icon: "success",
                text: "Trámite desestimado con éxito",
              });
              this.CargarTramite();
              this.ListarObservaciones();
            }
          })
          .catch((e) => console.log(e));
      }
    },
    AgregarObservacion() {
      if (!this.observacion == "") {
        var ObservacionModelo = {};
        var tramite = {};
        tramite.idTramite = this.idTramite;
        ObservacionModelo.tramite = tramite;
        ObservacionModelo.usuarioCreador = this.usuarioPost;
        ObservacionModelo.descripcion = this.observacion;
        ObservacionModelo.idObservacion = this.idObservacion;
        this.listaObservaciones.push(ObservacionModelo);
        console.log(this.listaObservaciones);
        this.idObservacion = this.idObservacion + 1;
        this.observacion = "";
      }
    },
    ReorganizarIndicesObservaciones() {
      this.idObservacion = 0;
      while (this.idObservacion < this.listaObservaciones.length) {
        this.listaObservaciones[
          this.idObservacion
        ].idObservacion = this.idObservacion;
        this.idObservacion = this.idObservacion + 1;
      }
    },
    ListarObservaciones() {
      var url =
        Constantes.rutaTramite +
        "observaciones/" +
        this.$route.params.idTramite;
      console.log("ruta lista  observaciones: " + url);
      axios
        .get(url)
        .then((response) => {
          console.log(response.data.data);
          this.listaObservaciones = response.data.data;
        })
        .catch((e) => console.log(e));
    },
    Observar2() {
      if (
        this.listaObservaciones == null ||
        this.listaObservaciones.length == 0
      ) {
        this.$swal({
          icon: "error",
          title: "Error",
          text: "Debe escribir alguna observación.",
        });
      } else {
        this.$swal({
          title: "Seguro de Observar?",
          text: "Luego no podrá editar!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          cancelButtonText: "No",
          confirmButtonText: "Sí",
        }).then((result) => {
          if (result.value) {
            this.Observar();
          }
        });
      }
    },
    Observar() {
      this.showModal = true;
      this.$swal({
        title: "Guardando",
        allowOutsideClick: false,
        onBeforeOpen: () => {
          this.$swal.showLoading();
        },
      });
      axios
        .get(
          Constantes.rutaTramite +
            "acceso/valida-firma/" +
            localStorage.getItem("idUsuarioLogueado")
        )
        .then((response) => {
          console.log(response.data);
          this.adjuntoModeloSec = null;
          if (response.data.success) {
            if (response.data.data.length > 0) {
              console.log(response.data.data.length);
              var observacionPost = {};
              var tramitePost = {};
              tramitePost.idTramite = this.idTramite;
              tramitePost.usuarioCreador = this.usuarioPost;
              tramitePost.usuarioModificador = this.usuarioPost;
              tramitePost.usuarioObservador = this.usuarioPost;
              tramitePost.listaObservacion = this.listaObservaciones;
              console.log(tramitePost);
              var dataPost = new FormData();
              dataPost.append("tramite", JSON.stringify(tramitePost));
              axios
                .post(Constantes.rutaTramite + "observar/", dataPost)
                .then((response) => {
                  console.log(response.data);
                  this.adjuntoModeloSec = null;
                  if (response.data.success) {
                    console.log("entró a success");
                    this.$swal.close();
                    console.log("debió cerrar");
                    this.$swal({
                      icon: "success",
                      text: "La solicitud fue observada correctamente",
                    });
                    console.log("debió cerrar");
                    this.CargarTramite();
                    this.ListarObservaciones();
                  }
                })
                .catch((e) => console.log(e));
            } else {
              this.$swal.close();
              this.$swal({
                icon: "error",
                title: "Error",
                text: "Debe configurar su firma.",
              });
            }
          }
        })
        .catch((e) => console.log(e));

      //this.$swal.stopLoading();
    },
    Aprobar() {
      this.$swal({
        title: "Guardando",
        allowOutsideClick: false,
        onBeforeOpen: () => {
          this.$swal.showLoading();
        },
      });
      var tramitePost = {};
      tramitePost.idTramite = this.idTramite;
      tramitePost.usuarioCreador = this.usuarioPost;
      tramitePost.usuarioModificador = this.usuarioPost;
      var dataPost = new FormData();
      dataPost.append("tramite", JSON.stringify(tramitePost));
      axios
        .post(Constantes.rutaTramite + "aprobar/", dataPost)
        .then((response) => {
          console.log(response.data);
          this.adjuntoModeloSec = null;
          if (response.data.success) {
            this.$swal({
              icon: "success",
              text: "El trámite fue aprobado con éxito",
            });
            this.estiloDisplayAprobar = "none";
            this.estiloDisplayVer = "block";
            this.CargarTramite();
          } else {
            this.$swal.close();
            this.$swal({
              icon: "error",
              title: "Error",
              text: "Sucedió un error.",
            });
          }
        })
        .catch((e) => console.log(e));
    },
    InicializarUsuario() {
      var dataUsuarioPost = {};
      dataUsuarioPost.desLoginUser = localStorage.getItem("cuenta");
      dataUsuarioPost.ideEstado = 1;
      dataUsuarioPost.idePersona = localStorage.getItem("idPersonaLogueado");
      dataUsuarioPost.ideUsuario = localStorage.getItem("idUsuarioLogueado");
      dataUsuarioPost.inCredencialExpirada = "1";
      dataUsuarioPost.inCuentaBloqueada = "1";
      dataUsuarioPost.inCuentaExpirada = "1";
      dataUsuarioPost.inHabilitado = "1";
      var dataPersonaPost = {};
      dataPersonaPost.nomApellidoMaterno = localStorage.getItem(
        "maternoUsuarioLogueado"
      );
      dataPersonaPost.nomApellidopaterno = localStorage.getItem(
        "paternoUsuarioLogueado"
      );
      dataPersonaPost.nomNombres = localStorage.getItem(
        "nombreUsuarioLogueado"
      );
      dataPersonaPost.numNumeroDocuento = localStorage.getItem(
        "numeroDocumentoLogueado"
      );
      dataPersonaPost.perSoc = localStorage.getItem("nombreCompleto");
      dataPersonaPost.idePersona = localStorage.getItem("idPersonaLogueado");
      dataUsuarioPost.persona = dataPersonaPost;
      this.usuarioPost = dataUsuarioPost;
    },
    EliminarArchivo(idArchivoTramite) {
      var adjuntoPost = {};
      adjuntoPost.idArchivoTramite = idArchivoTramite;
      adjuntoPost.usuarioCreador = this.usuarioPost;
      adjuntoPost.usuarioModificador = this.usuarioPost;
      var dataPost = new FormData();
      dataPost.append("archivoString", JSON.stringify(adjuntoPost));
      axios
        .post(Constantes.rutaTramite + "anular-adjunto", dataPost)
        .then((response) => {
          console.log(response.data);
          this.ObtenerListaAdjuntos();
        })
        .catch((e) => console.log(e));
    },
    GuardarAdjunto() {
      if (this.adjuntoModeloSec == null) {
        this.$swal({
          icon: "error",
          title: "Error",
          text: "Debe seleccionar un archivo.",
        });
      } else {
        this.$swal({
          title: "Guardando",
          onOpen: () => {
            this.$swal.showLoading();
          },
        });
        var adjuntoPost = {};
        var tramitePost = {};
        tramitePost.idTramite = this.idTramite;
        adjuntoPost.tramite = tramitePost;
        adjuntoPost.usuarioCreador = this.usuarioPost;
        adjuntoPost.usuarioModificador = this.usuarioPost;
        adjuntoPost.flagPrincipal = this.esPrincipal;
        var dataPost = new FormData();
        dataPost.append("adjunto", JSON.stringify(adjuntoPost));
        dataPost.append("imgCroquis", this.adjuntoModeloSec);
        axios
          .post(Constantes.rutaTramite + "adjunto/", dataPost)
          .then((response) => {
            console.log(response.data);
            this.adjuntoModeloSec = null;
            this.labelArchivoSec = "Seleccione Archivo";
            this.ObtenerListaAdjuntos();
            this.$swal({
              icon: "success",
              text: "El adjunto fue registrado con éxito",
            });
          })
          .catch((e) => console.log(e));
      }
    },
    ObtenerListaAdjuntos() {
      var url =
        Constantes.rutaTramite + "adjuntos/" + this.$route.params.idTramite;
      axios
        .get(url)
        .then((response) => {
          console.log(response.data.data);
          this.listaAdjuntos = response.data.data;
        })
        .catch((e) => console.log(e));
    },
    CargarTramite() {
      var url =
        Constantes.rutaTramite +
        "tramites/" +
        this.$route.params.idTramite +
        "/0/0/-";
      console.log("url cargar tramite:" + url);
      axios
        .get(url)
        .then((response) => {
          this.urlDescargaConstancia = `${Constantes.entidadArchivo}/1/${this.$route.params.idTramite}/0`;
          this.urlDescargaEsquela = `${Constantes.entidadArchivo}/3/${this.$route.params.idTramite}/0`;
          this.unidadDestino = response.data.data[0].unidadDestino.uniorgnom;
          console.log(response.data.data);
          this.tipoTramite = response.data.data[0].tipoTramite.nombre;
          this.idTramite = response.data.data[0].idTramite;
          this.solicitante = response.data.data[0].nombresSolicitante;
          this.documentoSolicitante =
            response.data.data[0].numeroDocumentoSolicitante;
          this.usuarioCreador = response.data.data[0].usuarioCreador;
          this.estado = response.data.data[0].id011Estado.nombre;
          this.usuarioTramite = response.data.data[0].usuarioTramite.usuario;
          if (response.data.data[0].id011Estado.idParametro == 23) {
            console.log("23");
            this.estiloDisplayAprobar = "block";
            this.estiloDisplayDesestimar = "block";
            this.estiloDisplayVer = "none";
            this.estiloDisplayObservar = "";
          }
          if (response.data.data[0].id011Estado.idParametro == 24) {
            console.log("24");
            this.estiloDisplayAprobar = "none";
            this.estiloDisplayDesestimar = "none";
            this.estiloDisplayVer = "block";
            this.estiloDisplayObservar = "none";
          }
          if (response.data.data[0].id011Estado.idParametro == 27) {
            console.log("27");
            this.estiloDisplayAprobar = "none";
            this.estiloDisplayDesestimar = "block";
            this.estiloDisplayVer = "none";
            this.estiloDisplayObservar = "none";
          }
          if (response.data.data[0].id011Estado.idParametro == 28) {
            console.log("28");
            this.estiloDisplayAprobar = "none";
            this.estiloDisplayDesestimar = "none";
            this.estiloDisplayVer = "none";
            this.estiloDisplayObservar = "none";
          }
          if (response.data.data[0].id011Estado.idParametro == 42) {
            console.log("42");
            this.estiloDisplayAprobar = "block";
            this.estiloDisplayDesestimar = "block";
            this.estiloDisplayVer = "none";
            this.estiloDisplayObservar = "none";
          }
          this.fechaCreacion = response.data.data[0].fechaCreacion;
          this.horaCreacion = response.data.data[0].horaCreacion;
          this.fechaEnRevision = response.data.data[0].fechaRevision;
          this.horaEnRevision = response.data.data[0].horaRevision;
          this.fechaObservacion = response.data.data[0].fechaObservacion;
          this.horaObservacion = response.data.data[0].horaObservacion;
          this.fechaSubsanacion = response.data.data[0].fechaSubsanacion;
          this.horaSubsanacion = response.data.data[0].horaSubsanacion;
          this.fechaAprobacion = response.data.data[0].fechaAprobacion;
          this.horaAprobacion = response.data.data[0].horaAprobacion;
          this.fechaPresentacion = response.data.data[0].fechaPresentacion;
          this.idPagoSamd = response.data.data[0].idPagoSamd;
          this.numeroPedido = response.data.data[0].numeroPedido;
          this.numeroRecibo = response.data.data[0].numeroReciboSamd;
          this.numeroDocumentoExpediente =
            response.data.data[0].numeroDocumentoExpedienteOracle;
          if (response.data.data[0].idExpedienteAnexo > 0) {
            this.idExpedienteAnexo = response.data.data[0].idExpedienteAnexo;
            this.anioExpedienteAnexo =
              response.data.data[0].anioExpedienteAnexo;
            this.numeroExpedienteAnexo =
              response.data.data[0].numeroExpedienteAnexo;
          }

          var i = 0;
          this.listaRequisitoModelo = [];
          var tramiteResponse = response.data.data[0];
          console.log(tramiteResponse.listaRequisito);
          while (i < tramiteResponse.listaRequisito.length) {
            this.displayAcciones = "";

            var RequisitoModelo = {};
            RequisitoModelo.indice = i;
            RequisitoModelo.idRequisito =
              tramiteResponse.listaRequisito[i].requisito.idRequisito;
            RequisitoModelo.nombre =
              "" +
              (i + 1) +
              ". " +
              tramiteResponse.listaRequisito[i].requisito.nombre;
            RequisitoModelo.nombreArchivo =
              tramiteResponse.listaRequisito[i].valor;
            RequisitoModelo.archivo = null;
            RequisitoModelo.flagArchivo =
              tramiteResponse.listaRequisito[i].requisito.flagArchivo;
            RequisitoModelo.flagObligatorio =
              tramiteResponse.listaRequisito[i].requisito.flagObligatorio;
            RequisitoModelo.visible =
              tramiteResponse.listaRequisito[i].requisito.visible;
            RequisitoModelo.ayuda = "";
            RequisitoModelo.nombreFuncion =
              "onFileRequisitoSelected" + RequisitoModelo.indice;
            if (
              tramiteResponse.listaRequisito[i].ayuda == null ||
              tramiteResponse.listaRequisito[i].ayuda == ""
            ) {
              RequisitoModelo.ayuda = tramiteResponse.listaRequisito[i].ayuda;
            } else {
              RequisitoModelo.ayuda = tramiteResponse.listaRequisito[i].ayuda;
            }
            RequisitoModelo.urlDescarga = `${Constantes.entidadArchivo}/4/${tramiteResponse.listaRequisito[i].idTramiteRequisito}/0`;
            RequisitoModelo.observacion =
              tramiteResponse.listaRequisito[i].observacion;
            this.listaRequisitoModelo.push(RequisitoModelo);

            i++;
          }
          console.log("antes de mandar a trazabilidad");
          this.CargarTrazabilidad();
          console.log(this.listaRequisitoModelo);
        })
        .catch((e) => console.log(e));
    },
    obtenerAreas() {
      var ruta = Constantes.rutaTramite + "/1";
      axios
        .get(ruta)
        .then((response) => {
          this.listaAreas = response.data;
          var i = 0;
          while (i < this.listaAreas.length) {
            var area = {};
            area.id = this.listaAreas[i].idArea;
            area.nombreArea = this.listaAreas[i].nombreArea;
            area.correoArea = this.listaAreas[i].correoArea;
            area.telefonoArea = this.listaAreas[i].telefonoArea;
            area.responsableArea = this.listaAreas[i].responsableArea;
            area.jefeArea = this.listaAreas[i].jefeArea;
            this.mapListaAreas.push(area);
            i++;
          }
          this.totalRows = this.listaAreas.length;
          console.log("lista de  areas --->" + this.mapListaAreas);
        })
        .catch((e) => console.log(e));
    },
    areaDestino() {
      let mapListaAreas = this.areaSeleccionada;
      console.log(mapListaAreas);
      let areaEnvio = "";
      for (let index = 0; index < this.mapListaAreas.length; index++) {
        if (this.areaSeleccionada == this.mapListaAreas[index].nombreArea) {
          areaEnvio = this.mapListaAreas[index].id;
        }
      }
      this.areaTransferir = areaEnvio;
      console.log("unidad a enviar ----> " + this.areaTransferir);
    },
    Transferir() {
      this.areaDestino();
      console.log("paso");
      if (this.areaTransferir != "" && this.mensajeTransferencia != "") {
        this.$swal({
          title: "Confirmación de actualización",
          type: "warning",
          showCancelButton: true,
          confirmButtonText: "Aceptar",
          cancelButtonText: "Cancelar",
          showCloseButton: true,
          showLoaderOnConfirm: true,
        }).then((result) => {
          if (result.value) {
            this.$swal({
              title: "Guardando",
              allowOutsideClick: false,
              onBeforeOpen: () => {
                this.$swal.showLoading();
              },
            });
            this.cargandoModal = true;
            document.getElementById("btnTransfer").disabled = true;
            var rutaTemporal =
              "http://localhost:8090/api/tramites/tramite-transferencia";
            var ruta = Constantes.rutaTramite + "tramite-transferencia";
            var dataPost = new FormData();
            dataPost.append("idTramite", this.idTramite);
            dataPost.append("idUOrigen", this.idareaSesion);
            dataPost.append("idUDestino", this.areaTransferir);
            dataPost.append("motivo", this.mensajeTransferencia);
            dataPost.append("usuarioReg", this.usuarioSesion);
            console.log(
              "data envío ------->" +
                this.idTramite +
                " " +
                this.idareaSesion +
                " " +
                this.areaTransferir +
                " " +
                this.mensajeTransferencia +
                " " +
                this.usuarioSesion
            );
            axios
              .post(ruta, dataPost)
              .then((response) => {
                console.log("respuesta... ");
                console.log(response);
                if (response.data.success == true) {
                  this.$swal({
                    title: "Registro exitoso",
                    icon: "success",
                    confirmButtonText: "OK",
                    showLoaderOnConfirm: true,
                    allowOutsideClick: false,
                  }).then((result) => {
                    if (result.value) {
                      this.cargandoModal = false;
                    }
                    this.$router.push("/components/tramites/bandejatramites");
                  });
                } else {
                  this.$swal({
                    icon: "error",
                    text: "Ha ocurrido un error en el registro.",
                  });
                }
              })
              .catch((e) => console.log(e));
          }
        });
      } else {
        this.$swal({
          icon: "error",
          text: "Los campos de Unidad Destino y Motivo deben ser llenados.",
        });
      }
    },
    onFileSelectedSec(event) {
      this.adjuntoModeloSec = event.target.files[0];
      console.log(event.target.files[0]);
      this.labelArchivoSec = event.target.files[0].name;
    },
    PadLeft(value, length) {
      return value.toString().length < length
        ? this.PadLeft("0" + value, length)
        : value;
    },
  },
};
</script>