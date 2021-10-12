<template>
  <div class="content-wrapper">
    <loading
      :active.sync="isLoading"
      :is-full-page="true"
      color="#007BFF"
    ></loading>
    <titulo-header>Bandeja de Citas Virtuales</titulo-header>
    <section class="content">
      <el-row :gutter="10">
        <div class="card menu">
          <el-row :gutter="10">
            <el-col :md="3">
                <label class="col-form-label">Unidad Orgánica: </label>  
            </el-col>
            <el-col :md="7">
              <el-select v-model="idArea" filterable>
                <el-option v-for="area of listaAreas" :key="'area '+area.idArea" :value="area.idArea" :label="area.descripcion"></el-option>
              </el-select>
            </el-col>
            <el-col :md="3">
              <label class="col-form-label">Estado</label>
            </el-col>
            <el-col :md="5">
              <el-select v-model="estadoAtencion">
                <el-option :value="1" label="Registrado"></el-option>
                <el-option :value="2" label="Agendado"></el-option>
                <el-option :value="3" label="En Atencion"></el-option>
                <el-option :value="4" label="Atendido"></el-option>
                <el-option :value="5" label="Desestimado"></el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :md="3">
              <label class="col-form-label" style=" !important">Fecha: </label>
            </el-col>
            <el-col :md="7" class="mt-0 pt-0">
              <el-row >
                <el-col :md="20" >
                  <datepicker :bootstrap-styling="false" :language="es" :open-date="date" input-class="datepicker text-center btn-block"  
                    name="calendarioCitas" :format="customFormatCal" v-model="fechaDatePicker" 
                    @opened="datepickerAbierto"
                    @selected="fechaSeleccionada"
                    @closed="datepickerCerrado"
                    @cleared="valorRemovido">
                  </datepicker>                                                    
                </el-col>
                <el-col :md="4">
                  <el-button class="btn btn-outline-secondary"  @click="valorRemovido()" >
                    <img src="../../images/icon_eraser.png" alt="" srcset="" width="25" height="25" style="padding-top: .3rem; padding-bottom: .3rem;"> 
                  </el-button>
                </el-col>
              </el-row>                    
            </el-col>
            <el-col :md="3">
              <label for="dnibuscar" class="col-form-label">Documento: </label>
            </el-col>
            <el-col :md="5">
              <el-input type="text" id="dnibuscar" placeholder="Ingrese Documento" clearable v-model="dniEscribir" @keypress.native="soloNumeros"></el-input> 
            </el-col>
            <el-col :md="4">
              <el-button type="primary" class="btn-block" @click="buscarCitasVirtual()" >Buscar</el-button>
            </el-col>
            <el-col :md="1">
              <el-button type="primary" @click="botonRefrescar()" icon="el-icon-refresh" circle></el-button>
            </el-col>
          </el-row>
        </div>
        <div class="card menu">
          <table id="example2" class="table table-hover table-sm mb-2">
            <thead class="">
              <tr>
                <th width="7%">Código</th>
                <th width="13%">Fecha - Hora</th>
                <!-- <th width="4%"></th> -->
                <th width="23%">Documento - Nombre</th>
                <!-- <th width="15%">Nombre</th> -->
                <th width="23%">Token - Funcionario</th>
                <th width="8%">Estado</th>
                <th width="8%">Usuario</th>
                <th class="text-center"></th>  
                <th class="text-center"></th> 
                <!--<th width="4%">Reprogramar</th>-->
              </tr>
            </thead>
            <tbody>
              <tr v-for="citas of citasJson" :key="citas.idCita">
                <td>{{ citas.codigoCita }}</td>
                <td>{{citas.fecha}} - {{citas.hora}}</td> 
                <!-- <td></td> -->
                <td>{{citas.dni}} - {{citas.nombres}} {{citas.apePaterno}} {{citas.apeMaterno}}</td>
                <!-- <td></td> -->
                <td v-if="citas.token.idToken != null">
                  {{ citas.token.idToken }} - {{ citas.token.usuario }}
                </td>
                <td v-else-if="citas.token.idToken == null">
                  {{ citas.token.usuario }}
                </td>
                <td v-if="citas.indEstado == 1">Registrado</td>
                <td v-else-if="citas.indEstado == 2">Agendado</td>
                <td v-else-if="citas.indEstado == 3">En Atencion</td>
                <td v-else-if="citas.indEstado == 4">Atendido</td>
                <td v-else-if="citas.indEstado == 5">Desestimado</td>
                <td class="text-capitalize" v-if="citas.indEstado == 2">
                  {{ funcionario(citas.usu_agenda) }}
                </td>
                <td class="text-capitalize" v-else-if="citas.indEstado != 2">
                  {{ funcionario(citas.usu_atencion) }}
                </td>
                <td v-if="citas.indEstado == 1">
                  <el-button
                    v-on:click="
                      AbrirModal(
                        citas.idCita,
                        citas.codigoCita,
                        citas.fecha,
                        citas.hora,
                        citas.motivo,
                        citas.codigoTipoDocumento,
                        citas.dni,
                        citas.nombres,
                        citas.apePaterno,
                        citas.apeMaterno,
                        citas.telefono,
                        citas.correo,
                        citas.responsable,
                        1
                      );
                      showModal = true;
                    "
                    class="font-weight-bold" type="text"
                  >
                    <u>Agendar</u>
                  </el-button>
                </td>
                <td
                  v-else-if="
                    citas.indEstado == 2 && citas.usu_agenda == usuSesion
                  "
                >
                  <el-button
                    v-on:click="
                      AbrirModal(
                        citas.idCita,
                        citas.codigoCita,
                        citas.fecha,
                        citas.hora,
                        citas.motivo,
                        citas.codigoTipoDocumento,
                        citas.dni,
                        citas.nombres,
                        citas.apePaterno,
                        citas.apeMaterno,
                        citas.telefono,
                        citas.correo,
                        citas.responsable,
                        3
                      );
                      showModal = true;
                    "
                    class="font-weight-bold" type="text"
                  >
                    <u>Atender</u>
                  </el-button>
                </td>
                <td v-else-if="citas.indEstado == 3">
                  <el-button
                    v-on:click="
                      AbrirModal(
                        citas.idCita,
                        citas.codigoCita,
                        citas.fecha,
                        citas.hora,
                        citas.motivo,
                        citas.codigoTipoDocumento,
                        citas.dni,
                        citas.nombres,
                        citas.apePaterno,
                        citas.apeMaterno,
                        citas.telefono,
                        citas.correo,
                        citas.responsable,
                        5
                      );
                      showModal = true;
                    "
                    class="font-weight-bold" type="text"
                  >
                    <u>Atender</u>
                  </el-button>
                </td>
                <td v-if="citas.indEstado == 1">
                  <el-button
                    v-on:click="
                      AbrirModal(
                        citas.idCita,
                        citas.codigoCita,
                        citas.fecha,
                        citas.hora,
                        citas.motivo,
                        citas.codigoTipoDocumento,
                        citas.dni,
                        citas.nombres,
                        citas.apePaterno,
                        citas.apeMaterno,
                        citas.telefono,
                        citas.correo,
                        citas.responsable,
                        2
                      );
                      showModal = true;
                    "
                    class="font-weight-bold text-nowrap" type="text"
                  >
                    Desestimar
                  </el-button>
                </td>
                <td
                  v-else-if="
                    citas.indEstado == 2 && citas.usu_agenda == usuSesion
                  "
                >
                  <el-button
                    v-on:click="
                      AbrirModal(
                        citas.idCita,
                        citas.codigoCita,
                        citas.fecha,
                        citas.hora,
                        citas.motivo,
                        citas.codigoTipoDocumento,
                        citas.dni,
                        citas.nombres,
                        citas.apePaterno,
                        citas.apeMaterno,
                        citas.telefono,
                        citas.correo,
                        citas.responsable,
                        4
                      );
                      showModal = true;
                    "
                    class="" type="text"
                  >
                    Desestimar
                  </el-button>
                </td>
                <td
                  v-else-if="
                    citas.indEstado == 3 && citas.usu_atencion == usuSesion
                  "
                >
                  <el-button
                    v-on:click="
                      AbrirModal(
                        citas.idCita,
                        citas.codigoCita,
                        citas.fecha,
                        citas.hora,
                        citas.motivo,
                        citas.codigoTipoDocumento,
                        citas.dni,
                        citas.nombres,
                        citas.apePaterno,
                        citas.apeMaterno,
                        citas.telefono,
                        citas.correo,
                        citas.responsable,
                        6
                      );
                      showModal = true;
                    "
                    class="" type="text"
                  >
                    Desestimar
                  </el-button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </el-row>
    </section>
    
    <section>
      <template v-if="showModal">
        <el-dialog class="" :title=tituloModal :visible.sync="showModal" :before-close="botonCancelarModal">
          <template>
            <el-row :gutter="10">
              <div class="row col-12">
                <label for="exampleInputPassword1" class="col-sm-2 col-form-label text-left" style="padding-right: 0px; !important">Fecha: </label>
                <div class="col-sm-4" style="padding-left: 0px; !important">   
                  <label for="exampleInputPassword1" id="fecText" disabled = true class="form-control" style="padding-right: 0px; !important">{{customFormatter(date)}}</label>                                                     
                </div> 
                <label for="exampleInputPassword1" class="col-sm-3 col-form-label text-right">Codigo: </label>
                <div class="col-sm-3" style="padding-left: 0px; !important">   
                  <label for="exampleInputPassword1" id="fecText" disabled = true class="form-control" style="padding-right: 0px; !important">{{codigoCitaModal}}</label>                                                     
                </div> 
              </div> 
              <div class="row col-12">
                <label class="col-sm-2 col-form-label text-left" style="padding-right: 0px; !important">Nombre: </label>                    
                <div class="col-sm-5" style="padding-left: 0px; !important">
                  <input for="exampleInputPassword1" id="nomText" disabled = true class="form-control" style="padding-right: 0px; !important" v-model="nombreModal">
                </div>
                <label class="col-sm-2 col-form-label text-right">{{codigoTipoDocumentoModal}}: </label>                    
                <div class="col-sm-3" style="padding-left: 0px; !important">                                        
                  <label for="exampleInputPassword1" id="docText" disabled = true class="form-control" style="padding-right: 0px; !important" >
                  {{dniModal}}</label>
                </div>
              </div> 
              <div class="row col-12">
                <label class="col-sm-2 col-form-label text-left" style="padding-right: 0px; !important">Correo: </label>                    
                <div class="col-sm-5" style="padding-left: 0px; !important">
                  <input for="exampleInputPassword1" id="correoText" disabled = true class="form-control" style="padding-right: 0px; !important" v-model="correoModal">
                </div>
                <label class="col-sm-2 col-form-label text-right" >Telefono: </label>                    
                <div class="col-sm-3" style="padding-left: 0px; !important">                                        
                  <label for="exampleInputPassword1" id="docText" disabled = true class="form-control" style="padding-right: 0px; !important">{{telefonoModal}}</label>
                </div>
              </div>
              <div class="row col-12">
                <label class="col-sm-2 col-form-label text-left" style="padding-right: 0px; !important">Motivo: </label>                    
                <div class="col-sm-10" style="padding-left: 0px; !important" >                                        
                  <textarea class="form-control" disabled  id="moTextD" rows="3" v-model="motivoModal"></textarea>
                </div>
              </div> 
              <div class="row col-12" v-if="this.estadoAtencionModal!=1">
                <div class="col-sm-2 text-left">
                  <label class="col-form-label text-nowrap" style="padding-right: 0px; !important">Descripción de</label> 
                  <label class="text-nowrap">atención</label>:                   
                </div>                 
                <div class="col-sm-10" style="padding-left: 0px; margin-top:.5rem; !important">                                        
                  <textarea class="form-control" allowBlank="false" v-model="descripcionModal" id="desText" rows="3"></textarea>
                </div>
              </div>
            </el-row>
          </template>
          <span slot="footer" class="dialog-footer">
            <el-button @click="botonCancelarModal">Cerrar</el-button>
            <el-button type="primary" @click="validarDescripcion(4);" >{{tituloBotonModal}}</el-button>
          </span>
        </el-dialog>
      </template>
      <template>
        <div id="ventanaModal" class="modalopaco" v-if="showInter"> 
          <div class="interbody">
            <div class="modalheader">
              <div class="izquierda"><h3>Confirmar operación</h3></div>
              <div class="clear"></div>
            </div> 
            <div class="clear"></div>                                             
            <div class="modal-footer">
              <button class="btn btn-danger" style="padding-left: 50px"  
                v-on:click="showInter=false; botonCancelarModal(); "
                >Cancelar</button> 
              <button class="btn btn-success" style="padding-left: 50px" 
                v-on:click="botonConfirmarOperacion(); buscarCitasVirtual();">Aceptar</button>
            </div> 
          </div>
        </div> 
      </template>
      <template v-if="mVisible">
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8" class="left">
            <!-- <modal-reprogramacion @reload="modalReprogramacion" v-on:modal-repro="mVisible=false" v-model="mVisible" :visible=mVisible ></modal-reprogramacion>  -->
            <modal-reprogramacion @reload="buscarCitasVirtual" @click="ModalReproClose" :jsonCita=sendCita :visible=mVisible></modal-reprogramacion> 
          </el-col>
      </template>
    </section>
  </div>
</template>
<script>
// import { mdiEraser } from '@mdi/js';

import { es } from "vuejs-datepicker/dist/locale";
import axios from "axios";
import Datepicker from "vuejs-datepicker";
import Constantes from "../../store/constantes.js";
import VModal from "vue-js-modal";
import moment from "moment";
import TituloHeader from "../comun/TituloHeader";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import ModalReprogramacion from "../citas/ModalReprogramacion";
export default {
  name: "BandejaCitas",
  data() {
    return {
      mVisible: false,
      sendCita: null,
      isLoading: false,
      // filtro de busqueda
      estadoAtencion: 2,
      dniEscribir: "",

      //VARIABLES DE MODAL
      tituloModal: "",
      tituloBotonModal: "",
      estadoAtencionModal: "",

      certificadosJson: null,
      citasJson: null,
      listaParametrosAux: null,
      listaEstado: null,
      listaTipoDocumento: null,
      listaResponsables: null,
      idTipodocumento: 0,
      idEstado: 0,
      numeroDocumentoModelo: "",
      numeroExpedienteModelo: "",
      anioExpedienteModelo: "",
      manzanaModelo: "",
      loteModelo: "",
      indice: 1,
      limite: 50,
      listaPaginas: null,
      cantidadPaginasBandeja: 0,
      date: new Date(),
      codigoCita: 0,
      showModal: false,
      showModalD: false,
      showInter: false,
      regBool: false,
      fechaSelEnvio: new Date(),
      fechaModal: null,
      idCitaModal: 0,
      codigoCita: "",
      horaModal: "",
      motivoModal: "",
      dniModal: "",
      nombreModal: "",
      correoModal: "",
      codigoTipoDocumentoModal: "",
      telefonoModal: "",
      responsableModalD: "",
      responsableModal: "",
      responsablesArea: "",
      descripcionModal: "",
      descripcionModalD: "",
      //VARIABLE PARA BOTON ATENDER
      estadoCitaAtender: "",
      codUnidadCitas: localStorage.getItem("codUnidadCitas")*1,
      areaSesion: localStorage.getItem("desUnidadLogueado"),
      usuSesion: localStorage.getItem("cuenta"),
      uniSesion: localStorage.getItem("codUnidadLogueado"),
      idArea: localStorage.getItem('codUnidadCitas')*1,
      listaAreas: null,
      //VARIABLES PARA CALENDARIO
      fechaDatePicker: new Date(),
      es: es,
    };
  },
  created() {

    this.getAreas();
    this.buscarCitasVirtual();
    this.FechaActual();
    this.getResponsables();
  },
  mounted() {
    if (localStorage.getItem("logueado") == "true") {
      console.log("está logueado");
      console.log(localStorage);
      // this.getParametros(7);
      // this.getParametros(460);
    } else {
      this.$router.push("/auth/login/");
    }
  },
  components: {
    TituloHeader,
    Loading,
    Datepicker,
    VModal,
    ModalReprogramacion,
  },
  methods: {
    async getAreas(){
      this.listaAreas = null
      var url = Constantes.rutacitas+'dbAreas/2'
      await axios.get(url).then(response=>{
        this.listaAreas=response.data.data;
        let listaAreasRelacionas = []
        let banderaArea = this.listaAreas.find(item => item.idArea === this.idArea)
        if(banderaArea!=undefined&&banderaArea.id004AreaRelacionada!=0){
          this.listaAreas.forEach(element => {
            if(element.id004AreaRelacionada === banderaArea.id004AreaRelacionada)listaAreasRelacionas.push(element);
          });
        }else if(banderaArea!=undefined&&banderaArea.id004AreaRelacionada==0){
          listaAreasRelacionas.push(banderaArea);
        }else{
          listaAreasRelacionas = this.listaAreas;
        }
        this.listaAreas = listaAreasRelacionas;
        if(banderaArea==undefined){
          this.idArea = this.listaAreas[0].idArea
        }
      }).catch(e=>this.Alerta('error','Error al cargar áreas','Comuniquese con GSTI'))
    },
    ModalReproClose(newValue) {
      this.mVisible = newValue;
    },
    modalReprogramacion(citas) {
      console.log(citas);
      this.sendCita = citas;
      this.mVisible = true;
    },
    modalConfirmacion() {
      this.$swal({
        title: "CONFIRMAR OPERACIÓN",
        text: "",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "No",
        confirmButtonText: "Si",
        customClass: {
          container: "my-swal",
        },
      }).then((result) => {
        // this.estiloDisplayAdministrado='';
        this.showModal = true;
        if (result.value) {
          this.botonConfirmarOperacion();
          this.buscarCitasVirtual();
        }
      });
    },
    funcionario(funcionario) {
      var cad = "";
      if (funcionario != null) {
        cad = funcionario.slice(0, funcionario.length - 18);
      }
      return cad;
    },
    botonConfirmarOperacion() {
      //
      this.showInter = false;
      this.showModal = false;
      this.validarDescripcion(6);
      switch (this.estadoAtencionModal) {
        case 1: //AGENDAR
          this.modificarCita(
            this.idCitaModal,
            this.fechaSelEnvio,
            "hora",
            2,
            "descripcion",
            this.usuSesion
          );
          this.enviaCorreo(
            this.fechaModal,
            this.horaModal,
            this.responsableModal,
            this.correoModal
          );
          this.descripcionModal = "";
          break;
        case 2: //DESESTIMAR
          this.modificarCita(
            this.idCitaModal,
            this.fechaSelEnvio,
            "hora",
            5,
            this.descripcionModal,
            this.usuSesion
          );
          this.descripcionModal = "";
          break;
        case 3: //ATENDER
          this.modificarCita(
            this.idCitaModal,
            this.fechaSelEnvio,
            "hora",
            4,
            this.descripcionModal,
            this.usuSesion
          );
          this.descripcionModal = "";
          break;
        case 4: //DESESTIMAR EN ATENCION
          this.modificarCita(
            this.idCitaModal,
            this.fechaSelEnvio,
            "hora",
            5,
            this.descripcionModal,
            this.usuSesion
          );
          this.descripcionModal = "";
          break;
        case 5: //EN PROCESO DE ATENCION
          this.modificarCita(
            this.idCitaModal,
            this.fechaSelEnvio,
            "hora",
            4,
            this.descripcionModal,
            this.usuSesion
          );
          this.descripcionModal = "";
          break;
        case 6: //DESESTIMAR EN ATENCION
          this.modificarCita(
            this.idCitaModal,
            this.fechaSelEnvio,
            "hora",
            5,
            this.descripcionModal,
            this.usuSesion
          );
          this.descripcionModal = "";
          break;
      }
      this.buscarCitasVirtual();
    },
    botonCancelarModal() {
      //a
      switch (this.estadoAtencionModal) {
        case 1: //AGENDAR
          this.modificarCita(
            this.idCitaModal,
            this.fechaSelEnvio,
            "hora",
            1,
            "descripcion",
            this.usuSesion
          );
          break;
        case 2: //DESESTIMAR
          this.modificarCita(
            this.idCitaModal,
            this.fechaSelEnvio,
            "hora",
            1,
            "descripcion",
            this.usuSesion
          );
          break;
        case 3: //ATENDER
          this.modificarCita(
            this.idCitaModal,
            this.fechaSelEnvio,
            "hora",
            2,
            "descripcion",
            this.usuSesion
          );
          break;
        case 4: //DESESTIMAR EN ATENCION
          this.modificarCita(
            this.idCitaModal,
            this.fechaSelEnvio,
            "hora",
            2,
            "descripcion",
            this.usuSesion
          );
          break;
        case 5: //EN PROCESO
          this.modificarCita(
            this.idCitaModal,
            this.fechaSelEnvio,
            "hora",
            2,
            "descripcion",
            this.usuSesion
          );
          break;
        case 6: //DESESTIMAR EN ATENCION
          this.modificarCita(
            this.idCitaModal,
            this.fechaSelEnvio,
            "hora",
            2,
            "descripcion",
            this.usuSesion
          );
          break;
      }
      this.descripcionModal = "";
      this.showModal = false;
      this.buscarCitasVirtual();
    },
    AbrirModal(
      idCita,
      codigoCita,
      fecha,
      hora,
      motivo,
      codigoTipoDocumento,
      dni,
      nombre,
      apePat,
      apeMat,
      telefono,
      correo,
      responsable,
      boton
    ) {
      this.idCitaModal = idCita;
      this.codigoCitaModal = codigoCita;
      this.fechaModal = fecha;
      this.horaModal = hora;
      this.dniModal = dni;
      this.motivoModal = motivo;
      this.codigoTipoDocumentoModal = codigoTipoDocumento;
      this.telefonoModal = telefono;
      this.correoModal = correo;
      this.showModal = true;
      this.responsableModal = responsable;
      this.nombreModal = nombre + " " + apePat + " " + apeMat;
      switch (boton) {
        case 1: //AGENDAR
          this.tituloModal = "Agendar Cita";
          this.tituloBotonModal = "Agendar";
          this.estadoAtencionModal = 1;
          this.modificarCita(
            this.idCitaModal,
            this.fechaSelEnvio,
            "hora",
            1,
            "descripcion",
            this.usuSesion
          );
          break;
        case 2: //DESESTIMAR
          this.tituloModal = "Desestimar Cita";
          this.tituloBotonModal = "Desestimar";
          this.estadoAtencionModal = 2;
          this.modificarCita(
            this.idCitaModal,
            this.fechaSelEnvio,
            "hora",
            1,
            "descripcion",
            this.usuSesion
          );
          break;
        case 3: //ATENDER
          this.tituloModal = "Atender Cita";
          this.tituloBotonModal = "Atender";
          this.estadoAtencionModal = 3;
          this.modificarCita(
            this.idCitaModal,
            this.fechaSelEnvio,
            "hora",
            3,
            "descripcion",
            this.usuSesion
          );
          break;
        case 4: //DESESTIMAR EN ATENCION
          this.tituloModal = "Desestimar Cita";
          this.tituloBotonModal = "Desestimar";
          this.estadoAtencionModal = 4;
          this.modificarCita(
            this.idCitaModal,
            this.fechaSelEnvio,
            "hora",
            3,
            "descripcion",
            this.usuSesion
          );
          break;
        case 5: //EN ATENCION
          this.tituloModal = "En Atencion Cita";
          this.tituloBotonModal = "Finalizar";
          this.estadoAtencionModal = 5;
          this.modificarCita(
            this.idCitaModal,
            this.fechaSelEnvio,
            "hora",
            3,
            "descripcion",
            this.usuSesion
          );
          break;
        case 6: //DESESTIMAR EN ATENCION
          this.tituloModal = "Desestimar Cita";
          this.tituloBotonModal = "Desestimar";
          this.estadoAtencionModal = 6;
          this.modificarCita(
            this.idCitaModal,
            this.fechaSelEnvio,
            "hora",
            3,
            "descripcion",
            this.usuSesion
          );
          break;
      }
      console.log(responsable);
    },
    FechaActual() {
      this.fechaSelEnvio = this.customFormatter(new Date());
      console.log("fecha: " + this.fechaSelEnvio);
    },
    FechaAtencion() {
      var Fec = new Date();
      this.minAten = Fec.getHours;
      console.log(this.minAten);
    },
    CambiarPagina(pagina) {
      if (pagina > 0) {
        this.indice = pagina;
        this.buscarCitasVirtual();
      }
    },
    reemplazaVacio(cadena, reemplazo) {
      return cadena == "" ? "-" : cadena;
    },
    reemplazaVacioEntero(cadena, reemplazo) {
      return cadena == "" ? "0" : cadena;
    },
    validarDescripcion(operacion) {
      if (operacion == 4) {
        if (this.estadoAtencionModal == 1) {
          this.showModal = false;
          this.modalConfirmacion();
        } else {
          if (this.descripcionModal == "") {
            console.log("desestimar");
            this.showInter = false;
            this.$swal({
              customClass: {
                container: "my-swal",
              },
              icon: "error",
              title: "Error",
              text: "Llenar campo de descripción.",
            });
          } else {
            this.showModal = false;
            this.modalConfirmacion();
          }
        }
      } else if (operacion == 6) {
        this.$swal({
          customClass: {
            container: "my-swal",
          },
          icon: "success",
          title: "Registro exitoso.",
        });
      }
    },
    botonRefrescar() {
      var fechaHoy = new Date();
      this.fechaDatePicker = fechaHoy;
      this.estadoAtencion = 1;
      this.dniEscribir = "";
      this.getCitasArea(0);
    },
    buscarCitasVirtual() {
      if (this.dniEscribir.length >= 1) {
        var dnibuscar = this.dniEscribir;
        this.getCitasArea(dnibuscar);
      } else {
        var dnibuscar = 0;
        this.getCitasArea(dnibuscar);
      }
    },
    getCitasArea(dnibuscar) {
      if (this.fechaDatePicker.length == 1) {
        var fecha = 0;
      } else {
        var fecha = moment(this.fechaDatePicker).format("YYYY-MM-DD");
      }
      var estado = this.estadoAtencion;
      if (this.estadoAtencion == 2) estado = "2,3";
      var url =
        Constantes.rutacitas +
        "citasBandejaxFecha/" +
        this.idArea +
        "/" +
        fecha +
        "/2/" +
        dnibuscar +
        "/" +
        estado;
      console.log(url);
      axios
        .get(url)
        .then((response) => {
          console.log(response);
          this.citasJson = response.data.data;
          var objeto = this.citasJson.data;
          console.log("cantidad de certificados" + this.citasJson.length);
          console.log("Pintando listaPaginas");
          console.log(this.citasJson);
        })
        .catch((e) => console.log(e));
    },
    getResponsables() {
      var url =
        Constantes.rutacitas + "responsables/" + this.codUnidadCitas + "/2";
      console.log("url DE RESPONSABLES");
      console.log(url);
      axios
        .get(url)
        .then((response) => {
          // console.log("LISTA DE RESPONSABLES");
          this.listaResponsables = response.data.data;
          // console.log(this.listaResponsables)
          this.stringResponsables();
        })
        .catch((e) => console.log(e));
    },
    stringResponsables() {
      for (var resp of this.listaResponsables) {
        this.responsablesArea = this.responsablesArea + resp.responsable + ", ";
      }
      this.responsableArea = this.responsableArea!=undefined? this.responsableArea: this.usuSesion+""
      // console.log(this.responsablesArea)
    },
    soloNumeros: function (event) {
      var key = window.event ? event.which : event.keyCode;
      if (key == 8) {
      } else if (key < 48 || key > 57) {
        event.preventDefault();
      }
    },
    modificarCita(idCita, fecha, hora, operacion, descripcion, usuario) {
      var horaA = moment().format("HH:mm:ss");
      descripcion = descripcion.split("/").join("-");
      var jsonSend = {};
      jsonSend.idCita = idCita;
      jsonSend.fecha = fecha;
      jsonSend.hora = horaA;
      jsonSend.operacion = operacion;
      jsonSend.descripcion = descripcion.toUpperCase();
      jsonSend.nombreFuncionario = usuario;
      jsonSend.idUsuarioAgenda = localStorage.getItem("idUsuarioLogueado");
      jsonSend.idUsuAtencion = localStorage.getItem("idUsuarioLogueado");
      var urlPost = Constantes.rutacitas + "modificarCita/estado";
      console.log(urlPost);
      // if(operacion==4)this.generarEncuesta(idCita);
      // console.log(this.valText);
      axios
        .post(urlPost, jsonSend)
        .then((response) => {
          console.log(response);
        })
        .catch((e) => console.log(e));
    },
    generarEncuesta(idEntidad) {
      var url = Constantes.rutaencuesta + "encuesta/nuevaEncuesta";
      console.log(url);
      var jsonSend = {};
      jsonSend.idEncuesta = 1;
      jsonSend.idEntidad = idEntidad;
      jsonSend.correoDestino = this.correoModal;
      axios
        .post(url, jsonSend)
        .then((response) => {
          var respuesta = response.data.ok;
          console.log(response);
          if (respuesta) this.isLoading = false;
          else
            this.Alerta(
              "error",
              "Error al registrar encuesta",
              "Por favor comuniquese con GSTI"
            );
        })
        .catch((e) =>
          this.Alerta(
            "error",
            "Error al registrar encuesta",
            "Por favor comuniquese con GSTI"
          )
        );
    },
    enviaCorreo(fechaModal, horaModal, responsableModal, correoModal) {
      var usuarioAten = null;
      var parts = localStorage.getItem("cuenta").split("@");
      usuarioAten = parts[0];
      console.log(usuarioAten);
      var url =
        Constantes.rutacitas +
        "correoCita/" +
        localStorage.getItem("nombreCompletoLogueado") +
        "/" +
        localStorage.getItem("desUnidadLogueado") +
        "/" +
        fechaModal +
        "/" +
        horaModal +
        "/" +
        usuarioAten +
        "/" +
        correoModal;
      console.log(url);
      axios
        .get(url,  {params:  {"conCopiaA": this.responsableArea}})
        .then((response) => {
          console.log(response);
        })
        .catch((e) => console.log(e));
    },
    Editar(idExpediente) {
      this.$router.push(
        "/components/licencias/editarcertificado/" + idExpediente
      );
    },
    PadLeft(value, length) {
      return value.toString().length < length
        ? PadLeft("0" + value, length)
        : value;
    },
    //para calendario
    datepickerAbierto: function () {
      console.log("El datepicker ha sido abierto");
    },
    fechaSeleccionada: function () {
      console.log("Una fecha ha sido seleccionada");
      console.log(this.fechaDatePicker);
      this.$nextTick(() => console.log(this.fechaDatePicker));
    },
    datepickerCerrado: function () {
      console.log("El datepicker ha sido cerrado");
      console.log(this.fechaDatePicker);
      console.log(moment(this.fechaDatePicker).format("D/MM/YYYY"));
      var fechaSel = moment(this.fechaDatePicker).format("D/MM/YYYY");
      console.log(fechaSel);
    },
    valorRemovido() {
      console.log("CLEAR");
      this.fechaDatePicker = " ";
    },
    customFormatter(date) {
      return moment(date).format("YYYY-MM-DD");
    },
    customFormatCal(date) {
      return moment(date).format("D MM YYYY");
    },
    fechaFormat(date) {
      return moment(date).format("YYY-MM-DD");
    },
  },
  filters: {
    pintaPuntos(pagina) {
      if (pagina == -1) {
        return "...";
      } else {
        return pagina;
      }
    },
  },
};
//ESTE COMANDO HACE BLOQUEAR LA FECHA DEL DIA
// :disabled-dates="{ to: new Date() }
</script>
<style lang="scss" scoped>
.el-dialog {
  label {
    font-size: 12px;
  }
  .form-control {
    font-size: 12px;
  }
}
.el-select {
  display: inline;
}
.el-col {
  margin-top: 15px;
}
</style>
<style lang="scss" scoped>
.modalopaco {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
  z-index: 9998;
}

.modalheader {
  background: #006699;
  margin: -10px;
}

.modalbody {
  padding: 10px;
  width: 800px;
  background: white;
  top: 20%;
  left: 30%;
  box-shadow: 0px 0px 10px black;
  position: absolute;
}

.interbody {
  padding: 10px;
  width: 300px;
  background: white;
  top: 50%;
  left: 45%;
  box-shadow: 0px 0px 10px black;
  position: absolute;
}

.intercontent {
  width: 280px;
  margin: -10px;
}

h3 {
  text-align: center;
  color: white;
}

.derecha {
  float: right;
}

.izquierda {
  float: left;
}

.clear {
  clear: both;
}

.close {
  background: red;
  color: white;
}

.my-swal {
  display: -webkit-box;
  display: flex;
  position: fixed;
  z-index: 300000;
}
</style>
<style>
.datepicker {
  margin-left: 0rem;
  margin-right: 0rem;

  padding: 0.55rem 0.3rem;
  font-size: 0.9rem;
  line-height: 1.5;
  color: #495057;
  background-color: #ffffff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
</style>



