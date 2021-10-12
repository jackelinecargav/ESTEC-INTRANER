<template>
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-10">
            <div class="row">
              <a class="nav-link" data-widget="pushmenu" href="#"></a>
              <h4>
                <b>Módulo de Trámites</b>
              </h4>
            </div>
          </div>
        </div>
      </div>
      <!-- /.container-fluid -->
    </section>

    <!-- Main content -->
    <section class="content">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <div class="row">
                <div class="form-group col-sm-4">
                  <div class="row">
                    <label
                      for="exampleInputPassword1"
                      class="col-sm-3 col-form-label"
                      style="text-align: right; padding-right: 0px; !important"
                    >
                      <b>Solicitud</b>
                    </label>
                    <div class="col-sm-8">
                      <input type="text" class="form-control" :value="'ST-00'+idTramite" disabled />
                    </div>
                  </div>
                </div>
                <div v-if="idExpedienteAnexo>0" class="form-group col-sm-4">
                  <div class="row">
                    <label
                      for="exampleInputPassword1"
                      class="col-sm-3 col-form-label"
                      style="text-align: right; padding-right: 0px; !important"
                    >
                      <b>Exp. Anexo</b>
                    </label>
                    <div class="col-sm-8">
                      <input type="text" class="form-control" :value="'Exp-00'+numeroExpedienteAnexo + '-'  + anioExpedienteAnexo" disabled />
                    </div>
                  </div>
                </div>
                <div v-if="numeroDocumentoExpediente!=null" class="form-group col-sm-4">
                  <div class="row">
                    <label
                      for="exampleInputPassword1"
                      class="col-sm-3 col-form-label"
                      style="text-align: right; padding-right: 0px; !important"
                    >
                      <b>Expediente</b>
                    </label>
                    <div class="col-sm-8">
                      <input type="text" class="form-control" :value="numeroDocumentoExpediente" disabled />
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="form-group col-sm-4">
                  <div class="row">
                    <label
                      for="exampleInputPassword1"
                      class="col-sm-3 col-form-label"
                      style="text-align: right; padding-right: 0px; !important"
                    >
                      <b>Tipo Tramite</b>
                    </label>
                    <div class="col-sm-8">
                      <input type="text" class="form-control" v-model="tipoTramite" disabled />
                    </div>
                  </div>
                </div>
                <div class="form-group col-sm-4">
                  <div class="row">
                    <label
                      for="exampleInputPassword1"
                      class="col-sm-3 col-form-label"
                      style="padding-right: 0px; !important"
                    >
                      <b>Solicitante:</b>
                    </label>
                    <div class="col-sm-8">
                      <input type="text" class="form-control" v-model="solicitante" disabled />
                    </div>
                  </div>
                </div>
                <div class="form-group col-sm-4">
                  <div class="row">
                    <label
                      for="exampleInputPassword1"
                      class="col-sm-3 col-form-label"
                      style="padding-right: 0px; !important"
                    >
                      <b>Estado:</b>
                    </label>
                    <div class="col-sm-8">
                      <input type="text" class="form-control" v-model="estado" disabled />
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="form-group col-sm-4">
                  <div class="row">
                    <label
                      for="exampleInputPassword1"
                      class="col-sm-3 col-form-label"
                      style="text-align: right; padding-right: 0px; !important"
                    >
                      <b>Fecha Creación</b>
                    </label>
                    <div class="col-sm-8">
                      <input type="text" class="form-control" :value="fechaEnRevision + ' ' + horaEnRevision"  disabled />
                    </div>
                  </div>
                </div>
                <div v-if="fechaPresentacion!=null" class="form-group col-sm-4">
                  <div class="row">
                    <label
                      for="exampleInputPassword1"
                      class="col-sm-3 col-form-label"
                      style="padding-right: 0px; !important"
                    >
                      <b>Fecha Presentación:</b>
                    </label>
                    <div class="col-sm-8">
                      <input type="text" class="form-control" :value="fechaPresentacion" disabled />
                    </div>
                  </div>
                </div>
                <div v-if="fechaObservacion!=null" class="form-group col-sm-4">
                  <div class="row">
                    <label
                      for="exampleInputPassword1"
                      class="col-sm-3 col-form-label"
                      style="padding-right: 0px; !important"
                    >
                      <b>Fecha Observación:</b>
                    </label>
                    <div class="col-sm-8">
                      <input type="text" class="form-control" :value="fechaObservacion + ' ' + horaObservacion" disabled />
                    </div>
                  </div>
                </div>
                <div v-if="fechaSubsanacion!=null" class="form-group col-sm-4">
                  <div class="row">
                    <label
                      for="exampleInputPassword1"
                      class="col-sm-3 col-form-label"
                      style="padding-right: 0px; !important"
                    >
                      <b>Fecha Subsanación:</b>
                    </label>
                    <div class="col-sm-8">
                      <input type="text" class="form-control" :value="fechaSubsanacion + ' ' + horaSubsanacion" disabled />
                    </div>
                  </div>
                </div>
                <div v-if="fechaAprobacion!=null" class="form-group col-sm-4">
                  <div class="row">
                    <label
                      for="exampleInputPassword1"
                      class="col-sm-3 col-form-label"
                      style="padding-right: 0px; !important"
                    >
                      <b>Fecha Aprobación:</b>
                    </label>
                    <div class="col-sm-8">
                      <input type="text" class="form-control" :value="fechaAprobacion + ' ' + horaAprobacion" disabled />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- /.card-header -->
        </div>
        <!-- /.card -->
      </div>
      
      <div class="card">
        <div class="card-header">
          <div class="row">
            <div class="form-group col-md-12">
              <div class="row" style="padding-left:45%">
                <div
                  class="col-sm-2"
                  id="divBtnGuardar"
                >
                  <button type="button" class="btn btn-block btn-success" @click="LevantarComponenteFirma()">Firmar</button>
                </div>
                <div
                  class="col-sm-2"
                  id="divBtnGuardar"
                  v-bind:style="{display:estiloDisplayAprobar}"
                >
                  <!-- <button type="button" class="btn btn-block btn-primary" @click="showGuardar()">Guardar Modal</button> -->
                  <button type="button" class="btn btn-block btn-success" @click="Aprobar()">Aprobar</button>
                </div>
                <div
                  class="col-sm-2"
                  id="divBtnGuardar"
                  v-bind:style="{display:estiloDisplayObservar}"
                >
                  <!-- <button type="button" class="btn btn-block btn-primary" @click="showGuardar()">Guardar Modal</button> -->
                  <button
                    type="button"
                    class="btn btn-block btn-warning"
                    @click="Observar2()"
                  >Observar</button>
                </div>
                <div
                  class="col-sm-2"
                  id="divBtnGuardar"
                  v-bind:style="{display:estiloDisplayAprobar}"
                >
                  <button type="button"  class="btn btn-block btn-primary" @click="$bvModal.show('transferirModal')">Transferir</button>
                </div>
                <!-- <div
                  class="col-sm-2"
                  id="divBtnGuardar"
                  v-bind:style="{display:estiloDisplayDesestimar}"
                >
                   <a data-toggle="modal" data-target="#desestimar" ><button type="button"class="btn btn-block btn-danger">Desestimar</button></a> -->
                <div v-bind:style="{display:estiloDisplayAprobar}">
                  <b-button id="show-btn" class="btn btn-block btn-danger" @click="$bvModal.show('desestimarModal')">Desestimar</b-button>
                </div>                
                <div
                  class="col-sm-2"
                  v-bind:style="{display:estiloDisplayVer}"
                >
                  <a v-bind:href="urlDescargaConstancia" target="_blank">
                    <button type="button" class="btn btn-block btn-primary">Ver Constancia</button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="idPagoSamd>0" class="card">

        <div class="card-header">
          <h4 class="card-title">
            <b>Recibo</b> 
          </h4>
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
                      <input type="text" class="form-control" :value="numeroRecibo" disabled />
                    </div>
                    <label
                      for="exampleInputPassword1"
                      class="col-sm-2 col-form-label"
                      style="padding-right: 0px; !important"
                    >
                      <b>Número Operación:</b>
                    </label>
                    <div class="col-sm-3">
                      <input type="text" class="form-control" :value="numeroPedido" disabled />
                    </div>
                    <a v-bind:href="urlDescargaRecibo+idPagoSamd+'/0'" target="_blank">
                      <button class="btn btn-primary">Ver Recibo</button>
                    </a>
                    
                </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header">
          <h4 class="card-title">
            <b>Requisitos</b> 
          </h4>
        </div>
        <div id="tabRequisito" class="tab-pane active">
          <div class="container" style="padding-top: 1%; !important">
            <div class="form-group col-sm-11">
              <div class="table">
                <table class="table table-bordered table-hover table-sm">
                  <thead class="btn-primary">
                    <tr>
                      <th width="45%">Requisito</th>
                      <th width="30%">Valor</th>
                      <th width="10%">Actualización</th>
                      <th width="15%">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="requisito of listaRequisitoModelo" :key=requisito.idRequisito >
                                <td scope="row" style="text-align:left"  >{{requisito.nombre}} 
                                  <!-- <a href="javascript: void(0)" @click="AbrirModal(requisito.nombre,requisito.ayuda)"><b-icon-box-arrow-in-up-right></b-icon-box-arrow-in-up-right></a>  -->
                                  <a href="javascript: void(0)" @click="AbrirModal(requisito.nombre,requisito.ayuda)"> <img src="../../images/ayuda.png" alt="" srcset="" width="15" height="15"> </a> 
                                </td>
                                <td>{{requisito.nombreArchivo}}</td>
                                <td>{{requisito.observacion}}</td>
                                <td v-bind:style="{display: displayAcciones}">
                                  <a v-bind:href="requisito.urlDescarga" target="_blank" style="padding:0">
                                    <button class="btn btn-success">Ver</button>
                                  </a> 
                                </td>
                              </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="card">
        <div class="card-header">
          <h4 class="card-title">
            <b>Adjuntos</b>
          </h4>
        </div>
        <div id="tabArchivo" class="tab-pane active">
          <div class="container" style="padding-top: 1%; !important">
            <div class="form-group col-sm-11">
              <!-- <div class="row">
                <label
                  for="lblAdjuntoSecundario"
                  class="col-sm-2 col-form-label"
                  style="text-align:center"
                >
                  <b>Adjunto:</b>
                </label>
                <div class="col-sm-5">
                  <input
                    type="file"
                    class="custom-file-input"
                    id="validatedCustomFile"
                    required
                    @change="onFileSelectedSec"
                    lang="es"
                  />
                  <label class="custom-file-label" for="validatedCustomFile">{{labelArchivoSec}}</label>
                  <div class="invalid-feedback">Archivo inválido</div>
                </div>
                <div class="col-sm-2">
                  <div class="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      class="custom-control-input"
                      id="customCheck1"
                      v-model="esPrincipal"
                    />
                    <label class="custom-control-label col-form-label" for="customCheck1">
                      <b>Actualizar Principal</b>
                    </label>
                  </div>
                </div>
                <div class="col-sm-3">
                  <button
                    class="btn btn-success"
                    @click="GuardarAdjunto()"
                    v-bind:style="{display:estiloDisplayAprobar}"
                  >Guardar</button>
                </div>
              </div> -->
            </div>
            <div class="form-group col-sm-11">
              <div class="table">
                <table class="table table-bordered table-hover table-sm">
                  <thead class="btn-primary">
                    <tr>
                      <th width="45%">Archivo</th>
                      <th width="30%">Actualización</th>
                      <th width="30%">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="adjunto of listaAdjuntos" :key="adjunto.idArchivoTramite">
                      <th scope="row">{{adjunto.nombreArchivo}}</th>
                      <td>{{adjunto.observacion}}</td>
                      <td v-if="adjunto.flagPrincipal==true">
                        <a v-bind:href="urlDescarga+adjunto.idArchivoTramite+'/0'" target="_blank">
                          <button class="btn btn-success">Ver</button>
                        </a>
                      </td>
                      <td v-else>
                        <div class="row" style="pading-left:55px;">
                          <a
                            style="padding-left:15px; padding-right:15px;"
                            v-bind:href="urlDescarga+adjunto.idArchivoTramite+'/0' "
                            target="_blank"
                          >
                            <button class="btn btn-success">Ver</button>
                          </a>
                          <!-- <button
                            style="padding-left:15px;"
                            class="btn btn-danger"
                            @click="EliminarArchivo(adjunto.idArchivoTramite)"
                            v-bind:style="{display:estiloDisplayAprobar}"
                          >Eliminar</button> -->
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <!-- /.row -->
      </div>
      <div class="card">
        <div class="card-header">
          <h4 class="card-title">
            <b>Observaciones</b>
          </h4>
        </div>
        <div id="tabObservaciones" class="tab-pane active" style="padding-top: 1%; !important">
          <div class="container">
            <div class="form-group col-sm-11" v-bind:style="{display:estiloDisplayObservar}">
              <div class="row">
                <label
                  for="lblAdjuntoSecundario"
                  class="col-sm-2 col-form-label"
                  style="text-align:center"
                >
                  <b>Observación:</b>
                </label>
                <div class="col-sm-7">
                      <input type="text" class="form-control" v-model="observacion" @keyup.enter="AgregarObservacion" />
                </div>
                <div class="col-sm-3">
                  <button
                    class="btn btn-success"
                    @click="AgregarObservacion()"
                    
                  >Agregar</button>
                </div>
              </div>
            </div>
            <div class="form-group col-sm-11">
              <div class="table-responsive">
                <table class="table table-bordered table-hover table-sm">
                  <thead class="btn-primary">
                    <tr>
                      <th width="60%">Observación</th>
                      <th width="10%">Fecha</th>
                      <th width="10%">Hora</th>
                      <th v-bind:style="{display:estiloDisplayObservar}" width="20%">Acción</th>
                    </tr>
                  </thead>
                  <tbody v-if="listaObservaciones!=null">
                    <tr v-for="observacion of listaObservaciones.slice().reverse()" :key="observacion.idObservacion">
                      <td scope="row">{{observacion.descripcion}}</td>
                      <td scope="row">{{observacion.fechaCreacion}}</td>
                      <td scope="row">{{observacion.horaObservacion}}</td>
                      <td v-if="observacion.horaObservacion==null || observacion.horaObservacion ==''" v-bind:style="{display:estiloDisplayObservar}"><button  class="btn btn-danger" @click="removeElement(observacion.idObservacion)" >Eliminar</button></td>
                      <td v-else v-bind:style="{display:estiloDisplayObservar}">Histórico</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <b-modal id="desestimarModal" hide-footer>
          <div class="d-block text-center">
            <h3>Motivo</h3>
          </div>
          <div>
            <input type="text" class="form-control"  v-model="mensajeDesestimacion" >
          </div>
          <b-button class="mt-3" block @click="Desestimar()">Desestimar</b-button>
        </b-modal>
        <b-modal id="transferirModal" hide-footer>
          <div class="row" style="padding-left:3%">
            <label style="font-size:15px">Unidad destino:</label>
          </div>
          <div>
            <select class="form-control" v-model="areaSeleccionada">
                  <option v-for="area in mapListaAreas" :key="area.id" v-bind:value="area.nombreArea">{{area.nombreArea}}</option>
            </select> 
          </div>
          <div class="row" style="padding-left:3%">
            <label style="font-size:15px">Motivo:</label>
          </div>
          <div>
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="2" v-model="mensajeTransferencia"></textarea>
          </div>
          <b-button class="btn btn-danger mt-3" id="btnTransfer" ref="refTransfer" block @click.prevent="Transferir()">Transferir</b-button>
          <div v-if="cargandoModal">
            <b-button variant="dark" block disabled>
              <b-spinner variant="danger" small ></b-spinner>
              Cargando...
            </b-button>
          </div>
        </b-modal>
        <b-modal id="ayudaModal" hide-footer>
                  <div class="d-block text-center">
                    <h3>{{nombreRequisitoModal}}</h3>
                  </div>
                  <div>
                    <label for="">{{ayudaRequisito}}</label>
                  </div>
                  <b-button class="mt-3" block @click="CerrarModal()">Cerrar</b-button>
         </b-modal>
      </div>
      <!-- <input type="hidden" name="tipoFirma" id="tipoFirma" value = "I" />  -->
      <input type="hidden" name="tipoFirma" id="tipoFirma" :value = "datosParaFirma.tipoFirma" /> 
      <input type="hidden" name="rutaEntrada" id="rutaEntrada" :value = "datosParaFirma.rutaEntrada" /> 
      <input type="hidden" name="rutaSalida" id="rutaSalida" :value = "datosParaFirma.rutaSalida" /> 
      <input type="hidden" name="nombreArchivo" id="nombreArchivo" :value = "datosParaFirma.nombreArchivo" /> 
      <input type="hidden" name="sistema" id="sistema" value = "datosParaFirma.sistema" /> 
      <!-- <input type="hidden" name="servidorFirma" id="servidorFirma" value = "http://10.0.1.5:8443" />-->
      <!-- <input type="hidden" name="servidorFirma" id="servidorFirma" value = "http://mirachat.miraflores.gob.pe:8080" /> -->
      <input type="hidden" name="servidorFirma" id="servidorFirma" :value = "datosParaFirma.servidorFirma" />
      <!-- <input type="hidden" name="servidorFirma" id="servidorFirma" value = "https://mirachat.miraflores.gob.pe:8443" />  -->
      <input type="hidden" name="firmaHolografica" id="firmaHolografica" :value = "datosParaFirma.firmaHolografica" /> 
      <input type="hidden" name="obtenerImagenHolograficaDesdeServidor" id="obtenerImagenHolograficaDesdeServidor" :value = "datosParaFirma.obtenerImagenHolograficaDesdeServidor" /> 
      <input type="hidden" name="rutaImagenHolograficaServidor" id="rutaImagenHolograficaServidor"  :value = "datosParaFirma.rutaImagenHolograficaServidor" /> 
      <input type="hidden" name="motivo" id="motivo" :value = "datosParaFirma.motivo" /> 
      <input type="hidden" name="pagina" id="pagina" :value = "datosParaFirma.pagina" /> 
      <input type="hidden" name="posicionX" id="posicionX" :value = "datosParaFirma.posicionX" /> 
      <input type="hidden" name="posicionY" id="posicionY" :value = "datosParaFirma.posicionY" /> 
      <input type="hidden" name="adicionarQr" id="adicionarQr" :value = "datosParaFirma.adicionarQr" /> 
      <input type="hidden" name="respuesta" id="respuesta" :value = "datosParaFirma.respuesta" /> 
    </section>
    <!-- /.content -->
  </div>
</template>
<style>
.modal-backdrop {
    opacity: .5;
}
</style>
<script>
import axios from "axios";
import Desestimar from './Desestimar.vue'
import Constantes from "../../store/constantes.js";
import hola from "../../assets/js/mensaje.js"
import firmarDocumento from "../../assets/js/fastsign.js"

export default {
  data() {
    return {
      showModal: false,
      observacion:'',
      labelArchivoSec: "Seleccione Archivo",
      tipoTramite: "",
      solicitante: "",
      estado: "",
      listaAdjuntos: null,
      listaObservaciones:null,
      listaObservacionesPrev:null,
      listaObservacionesModelo:[],
      idTramite: 0,
      urlDescarga: `${Constantes.entidadArchivo}/2/`,
      urlDescargaRecibo:`${Constantes.entidadArchivo}/7/`,
      usuarioPost: {},
      usuarioCreador:{},
      esPrincipal: false,
      estiloDisplayAprobar: "block",
      estiloDisplayDesestimar: "block",
      estiloDisplayVer: "none",
      estiloDisplayObservar:"",
      urlDescargaConstancia: "",
      idObservacion:0,
      mensajeDesestimacion:"",
      mensajeTransferencia:"",
      listaRequisitoModelo:null,
      ayudaRequisito:"",
      nombreRequisitoModal:"",
      fechaCreacion:null,
      horaCreacion:null,
      fechaEnRevision:null,
      horaEnRevision:null,
      fechaObservacion:null,
      horaObservacion:null,
      fechaSubsanacion:null,
      horaSubsanacion:null,
      fechaAprobacion:null,
      horaAprobacion:null,
      fechaPresentacion:null,
      idExpedienteAnexo:null,
      anioExpedienteAnexo:null,
      numeroExpedienteAnexo:null,
      listaAreas:null,
      mapListaAreas:[],
      areaSeleccionada:[],
      areaTransferir:'',
      cargandoModal:false,
      idareaSesion:localStorage.getItem('codUnidadLogueado'),
      usuarioSesion:localStorage.getItem('cuenta'),
      numeroDocumentoExpediente:'',
      idPagoSamd:0,
      correoCoordinadorTransferir:'',
      vecesObservadas:0,
      idEstado:0,
      datosParaFirma:null
    };
  },
  components:{Desestimar},
  created() {
      this.InicializarDatosParaFirma();
  },
  mounted() {
    
    if (localStorage.getItem("logueado") == "true") {
      this.CargarTramite();
      this.ObtenerListaAdjuntos();
      //this.ListarObservaciones();
      this.InicializarUsuario();
      this.obtenerAreas();
    } else {
      this.$router.push("/auth/login/");
    }   
  },
  methods: {
      InicializarDatosParaFirma(){
          var datosTemp={}
          datosTemp.tipoFirma ="I"
          datosTemp.rutaEntrada ="var/documentos/firmas/pre-firma"
          datosTemp.rutaSalida ="var/documentos/firmas/post-firma"
          datosTemp.nombreArchivo ="Documento_Lizandro_Nro1._1.pdf"
          datosTemp.sistema ="NUEVA_INTRANET_MIRAFLORES_VUE"
          datosTemp.servidorFirma ="https://mirachat.miraflores.gob.pe:8443"
          datosTemp.firmaHolografica ="NO"
          datosTemp.obtenerImagenHolograficaDesdeServidor ="N"
          datosTemp.rutaImagenHolograficaServidor =""
          datosTemp.motivo ="Escenario de prueba"
          datosTemp.pagina="P"
          datosTemp.posicionX="100"
          datosTemp.posicionY="200"
          datosTemp.adicionarQr="NO"
          datosTemp.respuesta="PENDIENTE"
          this.datosParaFirma=datosTemp
      
      },
      LevantarComponenteFirma(){
           firmarDocumento('recibirRespuestaFirma'); 
      },
    MostrarMensaje(){
      hola(10,2)
    },
    AbrirModal(nombreRequisito,ayuda){
      this.ayudaRequisito=ayuda;
      this.nombreRequisitoModal=nombreRequisito;
      this.$bvModal.show('ayudaModal')
    },
    CerrarModal(){
      this.$bvModal.hide('ayudaModal');
    },
    cerrarModalDesestimar(){
      this.$bvModal.hide('desestimarModal');
    },
    removeElement: function (index) {
      
      this.listaObservaciones.splice(index, 1);
      this.ReorganizarIndicesObservaciones();
    },
    Desestimar(){
      if(this.mensajeDesestimacion==""){
        this.$swal({
          icon: "error",
          title: "Error",
          text: "Debe ingresar un motivo."
        });
      }else{
        this.$swal({
            title: "Guardando",
            allowOutsideClick: false,
            onBeforeOpen: () => {
              this.$swal.showLoading();
            }
        });
        var tramitePost = {};
        tramitePost.idTramite = this.idTramite;
        tramitePost.usuarioModificador = this.usuarioPost;
        tramitePost.mensajeDesestimacion=this.mensajeDesestimacion;
        
        var dataPost = new FormData();
        dataPost.append("tramite", JSON.stringify(tramitePost));
        axios
          .post(Constantes.rutaTramite + "desestimar/", dataPost)
          .then(response => {
            
            this.adjuntoModeloSec = null;
            if (response.data.success) {
              this.$bvModal.hide('desestimarModal');
              this.$swal({
                icon: "success",
                text: "Trámite desestimado con éxito"
              });
              this.CargarTramite();
              this.ListarObservaciones();
            }
          })
          .catch(e => console.log(e));
      }
      
      

    },    
    AgregarObservacion(){
      if(!this.observacion==''){
        var ObservacionModelo={};
        var tramite={};
        tramite.idTramite=this.idTramite;
        ObservacionModelo.tramite=tramite;
        ObservacionModelo.usuarioCreador=this.usuarioPost;
        ObservacionModelo.descripcion=this.observacion;
        ObservacionModelo.idObservacion=this.idObservacion;
        ObservacionModelo.veces=this.vecesObservadas+1;
        this.listaObservaciones.push(ObservacionModelo);
        
        this.idObservacion=this.idObservacion+1;
        this.observacion='';
      }
      
    },
    ReorganizarIndicesObservaciones(){
      this.idObservacion=0;
      while(this.idObservacion<this.listaObservaciones.length){
        this.listaObservaciones[this.idObservacion].idObservacion=this.idObservacion;
        this.idObservacion=this.idObservacion+1;
      }
    },
    ListarObservaciones(){
      var url =
        Constantes.rutaTramite + "observaciones/" + this.$route.params.idTramite;
        
      axios
        .get(url)
        .then(response => {
          
          this.listaObservaciones = response.data.data;
          this.listaObservaciones.forEach(element => {
            if(element.veces>this.vecesObservadas){
              this.vecesObservadas=element.veces
            }
          });
          if(this.idEstado==42){
            if(this.vecesObservadas>=5){
              this.estiloDisplayObservar="none";
            }else{
              this.estiloDisplayObservar="";
            }
            
          }
          
        })
        .catch(e => console.log(e));
    },
    validarObservacion(){
      
      var nuevoRegistro=false;
      this.listaObservaciones.forEach(element => {
        if(element.fechaCreacion==undefined)nuevoRegistro=true;
      });
      
      return nuevoRegistro;
    },
    Observar2(){
      //if(this.listaObservaciones==null || this.listaObservaciones.length==0){
        var validacion=this.validarObservacion();
        
      if(validacion==false){
        this.$swal({
          icon: "error",
          title: "Error",
          text: "Debe escribir alguna observación."
        });
      }else{
          this.$swal({
          title: 'Seguro de Observar?',
          text: "Luego no podrá editar!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          cancelButtonText: 'No',
          confirmButtonText: 'Sí'
        }).then((result) => {
          if (result.value) {
            this.Observar();
          }
        });
      }
     
    },
    RegularizarObservacion(){
      
      this.listaObservaciones.forEach(element => {
        element.fechaCreacion=null;
      });
      
    },
    Observar() {
      
      this.RegularizarObservacion();
      this.showModal = true;
      this.$swal({
        title: "Guardando",
        allowOutsideClick: false,
        onBeforeOpen: () => {
          this.$swal.showLoading();
        }
      });
      axios
        .get(Constantes.rutaTramite + "acceso/valida-firma/"+ localStorage.getItem("idUsuarioLogueado"))
        .then(response => {
          
          this.adjuntoModeloSec = null;
          if (response.data.success) {
           if(response.data.data.length>0){
             
              var observacionPost={};
              var tramitePost = {};
              tramitePost.idTramite = this.idTramite;
              tramitePost.usuarioCreador=this.usuarioPost;
              tramitePost.usuarioModificador=this.usuarioPost;
              tramitePost.usuarioObservador = this.usuarioPost;
              tramitePost.listaObservacion=this.listaObservaciones;
              
              var dataPost = new FormData();
              dataPost.append("tramite", JSON.stringify(tramitePost));
              axios
                .post(Constantes.rutaTramite + "observar/", dataPost)
                .then(response => {
                  
                  this.adjuntoModeloSec = null;
                  if (response.data.success) {
                    
                    this.$swal.close();
                    
                    this.$swal({
                      icon: "success",
                      text: "La solicitud fue observada correctamente"
                    });
                    
                    this.CargarTramite();
                    this.ListarObservaciones();
                  }
                })
                .catch(e => console.log(e));
           }else{
             this.$swal.close();
             this.$swal({
              icon: "error",
              title: "Error",
              text: "Debe configurar su firma."
            });
           }
          }
        })
        .catch(e => console.log(e));
      
      //this.$swal.stopLoading();
      

    },
    Aprobar() {
      this.$swal({
        title: "Guardando",
        allowOutsideClick: false,
        onBeforeOpen: () => {
          this.$swal.showLoading();
        }
      });
      var tramitePost = {};
      tramitePost.idTramite = this.idTramite;
      tramitePost.usuarioCreador = this.usuarioPost;
      tramitePost.usuarioModificador = this.usuarioPost;
      var dataPost = new FormData();
      dataPost.append("tramite", JSON.stringify(tramitePost));
      axios
        .post(Constantes.rutaTramite + "aprobar/", dataPost)
        .then(response => {
          
          this.adjuntoModeloSec = null;
          if (response.data.success) {
            this.$swal({
              icon: "success",
              text: "El trámite fue aprobado con éxito"
            });
            this.estiloDisplayAprobar = "none";
            this.estiloDisplayVer = "block";
            this.CargarTramite();
          }else{
            this.$swal.close();
            this.$swal({
            icon: "error",
            title: "Error",
            text: "Sucedió un error."
          });
          }
        })
        .catch(e => console.log(e));
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
        .then(response => {
          
          this.ObtenerListaAdjuntos();
        })
        .catch(e => console.log(e));
    },
    GuardarAdjunto() {
      if (this.adjuntoModeloSec == null) {
        this.$swal({
          icon: "error",
          title: "Error",
          text: "Debe seleccionar un archivo."
        });
      } else {
        this.$swal({
          title: "Guardando",
          onOpen: () => {
            this.$swal.showLoading();
          }
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
          .then(response => {
            
            this.adjuntoModeloSec = null;
            this.labelArchivoSec = "Seleccione Archivo";
            this.ObtenerListaAdjuntos();
            this.$swal({
              icon: "success",
              text: "El adjunto fue registrado con éxito"
            });
          })
          .catch(e => console.log(e));
      }
    },
    ObtenerListaAdjuntos() {
      var url =
        Constantes.rutaTramite + "adjuntos/" + this.$route.params.idTramite;
      axios
        .get(url)
        .then(response => {
          
          this.listaAdjuntos = response.data.data;
        })
        .catch(e => console.log(e));
    },
    CargarTramite() {
      var url =
        Constantes.rutaTramite +
        "tramites/" +
        this.$route.params.idTramite +
        "/0/0/-";
      
      axios
        .get(url)
        .then(response => {
          this.urlDescargaConstancia = `${Constantes.entidadArchivo}/1/${this.$route.params.idTramite}/0`;
          
          this.tipoTramite = response.data.data[0].tipoTramite.nombre;
          this.idTramite = response.data.data[0].idTramite;
          this.solicitante =
            response.data.data[0].nombresSolicitante;
          this.usuarioCreador=  response.data.data[0].usuarioCreador;
          this.estado = response.data.data[0].id011Estado.nombre;
          this.idEstado=response.data.data[0].id011Estado.idParametro;
          if (response.data.data[0].id011Estado.idParametro == 22) {
              
            this.estiloDisplayAprobar = "none";
            this.estiloDisplayDesestimar = "none";
            this.estiloDisplayVer = "none";
            this.estiloDisplayObservar="none";
          }
          if (response.data.data[0].id011Estado.idParametro == 23) {
              
            this.estiloDisplayAprobar = "block";
            this.estiloDisplayDesestimar = "block";
            this.estiloDisplayVer = "none";
            this.estiloDisplayObservar="";
          }
          if (response.data.data[0].id011Estado.idParametro == 24) {
              
            this.estiloDisplayAprobar = "none";
            this.estiloDisplayDesestimar = "none";
            this.estiloDisplayVer = "block";
            this.estiloDisplayObservar="none";
          }
          if (response.data.data[0].id011Estado.idParametro == 27) {
              
            this.estiloDisplayAprobar = "none";
            this.estiloDisplayDesestimar = "block";
            this.estiloDisplayVer = "none";
            this.estiloDisplayObservar="none";
          }
          if (response.data.data[0].id011Estado.idParametro == 28) {
              
            this.estiloDisplayAprobar = "none";
            this.estiloDisplayDesestimar = "none";
            this.estiloDisplayVer = "none";
            this.estiloDisplayObservar="none";
          }
          if (response.data.data[0].id011Estado.idParametro == 42) {
              
            this.estiloDisplayAprobar = "block";
            this.estiloDisplayDesestimar = "block";
            this.estiloDisplayVer = "none";
            this.estiloDisplayObservar="none";
          }
          this.fechaCreacion=response.data.data[0].fechaCreacion;
          this.horaCreacion=response.data.data[0].horaCreacion;
          this.fechaEnRevision=response.data.data[0].fechaRevision;
          this.horaEnRevision=response.data.data[0].horaRevision;
          this.fechaObservacion=response.data.data[0].fechaObservacion;
          this.horaObservacion=response.data.data[0].horaObservacion;
          this.fechaSubsanacion=response.data.data[0].fechaSubsanacion;
          this.horaSubsanacion=response.data.data[0].horaSubsanacion;
          this.fechaAprobacion=response.data.data[0].fechaAprobacion;
          this.horaAprobacion=response.data.data[0].horaAprobacion;
          this.fechaPresentacion=response.data.data[0].fechaPresentacion;
          this.idPagoSamd=response.data.data[0].idPagoSamd;
          this.numeroPedido=response.data.data[0].numeroPedido;
          this.numeroRecibo=response.data.data[0].numeroReciboSamd;
          this.numeroDocumentoExpediente=response.data.data[0].numeroDocumentoExpedienteOracle;
          if(response.data.data[0].idExpedienteAnexo>0){
            this.idExpedienteAnexo=response.data.data[0].idExpedienteAnexo;
            this.anioExpedienteAnexo=response.data.data[0].anioExpedienteAnexo;
            this.numeroExpedienteAnexo=response.data.data[0].numeroExpedienteAnexo;
          }
          
          var i=0;
          this.listaRequisitoModelo=[];
          var tramiteResponse=response.data.data[0];
          
          while(i<tramiteResponse.listaRequisito.length){
            this.displayAcciones='';
            
            var RequisitoModelo={};
            RequisitoModelo.indice=i;
            RequisitoModelo.idRequisito=tramiteResponse.listaRequisito[i].requisito.idRequisito;
            RequisitoModelo.nombre=""+(i+1)+". "+    tramiteResponse.listaRequisito[i].requisito.nombre;
            RequisitoModelo.nombreArchivo=tramiteResponse.listaRequisito[i].valor;
            RequisitoModelo.archivo=null;
            RequisitoModelo.flagArchivo=tramiteResponse.listaRequisito[i].requisito.flagArchivo;
            RequisitoModelo.flagObligatorio=tramiteResponse.listaRequisito[i].requisito.flagObligatorio;
            RequisitoModelo.visible=tramiteResponse.listaRequisito[i].requisito.visible;
            RequisitoModelo.ayuda='';
            RequisitoModelo.nombreFuncion='onFileRequisitoSelected'+RequisitoModelo.indice;
            if(tramiteResponse.listaRequisito[i].ayuda==null || tramiteResponse.listaRequisito[i].ayuda==''){
               RequisitoModelo.ayuda=tramiteResponse.listaRequisito[i].ayuda;
            }else{
               RequisitoModelo.ayuda=tramiteResponse.listaRequisito[i].ayuda;
            }
            RequisitoModelo.urlDescarga= `${Constantes.entidadArchivo}/4/${tramiteResponse.listaRequisito[i].idTramiteRequisito}/0`;
            RequisitoModelo.observacion=tramiteResponse.listaRequisito[i].observacion;
            this.listaRequisitoModelo.push(RequisitoModelo);

            i++;
          }
          
          this.ListarObservaciones();
        })
        .catch(e => console.log(e));
    },
    obtenerAreas(){
      var ruta = Constantes.rutaTramite+'tramite-area/1'
      axios.get(ruta)
                    .then(response=>{
                      this.listaAreas=response.data;
                      var i=0;
                      while(i<this.listaAreas.length){
                            var area={};
                            area.id=this.listaAreas[i].idArea;
                            area.nombreArea=this.listaAreas[i].nombreArea; 
                            area.correoArea=this.listaAreas[i].correoArea;
                            area.telefonoArea=this.listaAreas[i].telefonoArea;
                            area.responsableArea=this.listaAreas[i].responsableArea;
                            area.jefeArea=this.listaAreas[i].jefeArea;
                            this.mapListaAreas.push(area);
                            i++;
                            
                        }
                        this.totalRows =this.listaAreas.length;
                        
                  })
                  .catch(e=>console.log(e))
    },
    areaDestino(){
            let mapListaAreas = this.areaSeleccionada;
            
            let areaEnvio = '';
            for (let index = 0; index < this.mapListaAreas.length; index++) {
              if (this.areaSeleccionada == this.mapListaAreas[index].nombreArea){
                areaEnvio= this.mapListaAreas[index].id;
                this.correoCoordinadorTransferir=this.mapListaAreas[index].responsableArea;
              }              
            }
             this.areaTransferir = areaEnvio;
             
    },
    Transferir(){
      this.areaDestino();
        if(this.correoCoordinadorTransferir!=null && this.correoCoordinadorTransferir!=''){

        
        if(this.areaTransferir!='' && this.mensajeTransferencia!=''){
          this.$swal({
                  title: 'Confirmación de actualización',
                  type: 'warning',
                  showCancelButton: true,
                  confirmButtonText: 'Aceptar',
                  cancelButtonText: 'Cancelar',
                  showCloseButton: true,
                  showLoaderOnConfirm: true
                  }).then((result) => {
                  if(result.value) {
                        this.$swal({
                            title: "Guardando",
                            allowOutsideClick: false,
                            onBeforeOpen: () => {
                              this.$swal.showLoading();
                            }
                          });
                        this.cargandoModal=true;
                        document.getElementById('btnTransfer').disabled=true;
                        var rutaTemporal = 'http://localhost:8090/api/tramites/tramite-transferencia'
                        var ruta = Constantes.rutaTramite+'tramite-transferencia'
                        var dataPost=new FormData();
                              dataPost.append('idTramite',this.idTramite);
                              dataPost.append('idUOrigen',this.idareaSesion);
                              dataPost.append('idUDestino',this.areaTransferir);            
                              dataPost.append('motivo',this.mensajeTransferencia);
                              dataPost.append('usuarioReg',this.usuarioSesion);
                              
                              axios.post(ruta,dataPost)
                                  .then(response=>{
                                    
                                    if(response.data.success == true){this.$swal({
                                      title: 'Registro exitoso',
                                      icon: 'success',
                                      confirmButtonText: 'OK',   
                                      showLoaderOnConfirm: true,
                                      allowOutsideClick: false
                                      }).then((result) => {
                                      if(result.value) {  
                                          this.cargandoModal=false;        
                                      } 
                                      this.$router.push('/components/tramites/bandejatramites');
                                      })}else{
                                        this.$swal({
                                            icon: "error",
                                            text: "Ha ocurrido un error en el registro."
                                          });
                                      }
                                })
                                .catch(e=>console.log(e))  
                                } 
                  })                            
        }else{
           this.$swal({
                icon: "error",
                text: "Los campos de Unidad Destino y Motivo deben ser llenados."
              });
        }
      }else{
        this.$swal({
                icon: "error",
                text: "No tiene configurado el correo del coordinador destino."
              });
      }
    },
    onFileSelectedSec(event) {
      this.adjuntoModeloSec = event.target.files[0];
      
      this.labelArchivoSec = event.target.files[0].name;
    },
    PadLeft(value, length) {
      return value.toString().length < length
        ? this.PadLeft("0" + value, length)
        : value;
    }
  }
};
</script>