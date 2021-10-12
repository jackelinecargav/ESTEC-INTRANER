<template>
  <div class="content-wrapper">
    <loading :active.sync="isLoading" :is-full-page="true" color="#007BFF"></loading>
    <titulo-header>Módulo de Certificados de Parámetros Urbanísticos y Edificatorios</titulo-header>

    <!-- Main content -->
    <section class="content">
      <div class="row">
        <div class="col-12">
          <div class="card menu">
              <div class="row">
                <div class="form-group col-sm-5">
                  <div class="row">
                    <input type="hidden" id="IdExpediente" :value="$route.params.idExpediente" />

                    <label
                      for="exampleInputPassword1"
                      class="col-sm-3 col-form-label"
                      style="text-align: right; padding-right: 0px; !important"
                    >
                      <b>Expediente</b>
                    </label>
                    <div class="col-sm-8 pl-1">
                      <input
                        type="text"
                        class="form-control "
                        disabled
                        :value="numeroExpedienteModelo"
                      />
                    </div>
                  </div>
                </div>
                <div class="form-group col-sm-5">
                  <div class="row">
                    <label
                      for="exampleInputPassword1"
                      class="col-sm-3 col-form-label"
                      style="padding-right: 0px; !important"
                    >
                      <b>Solicitante</b>
                    </label>
                    <div class="col-sm-8">
                      <input type="text" class="form-control" disabled :value="solicitanteModelo" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="form-group col-sm-5">
                  <div class="row">
                    <label
                      for="exampleInputPassword1"
                      class="col-sm-3 col-form-label"
                      style="text-align: right; padding-right: 0px; !important"
                    >
                      <b>CUC</b>
                    </label>
                    <div class="col-sm-2 pl-1 pr-1">
                      <input
                        type="text"
                        class="form-control"
                        style="padding-right: 0px; !important"
                        value="022"
                        disabled
                      />
                    </div>
                    <div class="col-sm-3">
                      <input type="number" class="form-control classCUC" v-model="manzanaModelo" />
                    </div>
                    <div class="col-sm-3">
                      <input
                        type="number"
                        class="form-control classCUC"
                        v-model="loteModelo"
                        @keyup.enter="generarCertificado"
                      />
                    </div>
                  </div>
                </div>
                <div class="form-group col-sm-5">
                  <div class="row">
                    <label
                      for="exampleInputPassword1"
                      class="col-sm-3 col-form-label"
                      style="padding-right: 0px; !important"
                    >
                      <b>Estado</b>
                    </label>
                    <div class="col-sm-8">
                      <input
                        type="text"
                        class="form-control"
                        id="txtEstado"
                        disabled
                        :value="estadoModelo"
                      />
                    </div>
                    <div class="col-sm-1">
                      <el-button
                        type="primary"
                        id="btnGenerar"
                        @click="generarCertificado();"
                        
                        v-bind:style="{display:estiloDisplayGenerar}"
                      >Generar</el-button>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="row divCertificado"
                id="divZonificacion"
                v-bind:style="{display: estiloDisplay}"
              >
                <div class="row" id="divZonificacion">
                  <div class="form-group col-sm-5">
                    <div class="row">
                      <label
                        for="exampleInputPassword1"
                        class="col-sm-3 col-form-label"
                        style="text-align: right;padding-right: 0px; !important"
                      >
                        <b>Zonificación</b>
                      </label>
                      <div class="col-sm-8">
                        <input
                          type="text"
                          class="form-control"
                          :value="zonificacionModelo"
                          id="txtZonificacion"
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    class="form-group col-sm-5"
                    v-bind:style="{display: estiloDisplayZonificacionCompatible}"
                  >
                    <div class="row">
                      <label
                        for="exampleInputPassword1"
                        class="col-sm-3 col-form-label"
                        style="text-align: right;padding-right: 0px; !important"
                      >
                        <b>Compatibilidad</b>
                      </label>
                      <div class="col-sm-6" style="width:100%">
                        <select class="form-control select2" v-model="idZonificacionCompatible">
                          <option
                            v-for="unidad of zonificacionCompatibleModelo"
                            :key="unidad.codigo"
                            :value="unidad.idZonificacionCompatible"
                          >{{unidad.zonificacionCompatible}}</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row" v-bind:style="{display: estiloDisplayZonificacion2}">
                  <div class="form-group col-sm-5">
                    <div class="row">
                      <label
                        for="exampleInputPassword1"
                        class="col-sm-3 col-form-label"
                        style="text-align: right;padding-right: 0px; !important"
                      >
                        <b>Zonificación</b>
                      </label>
                      <div class="col-sm-8">
                        <input
                          type="text"
                          class="form-control"
                          :value="zonificacion2"
                          id="txtZonificacion2"
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
      <div class="card divCertificado" v-bind:style="{display: estiloDisplay}">
        <div class="card-header">
          <div class="row">
            <div class="form-group col-sm-5">
              <div class="row">
                <div
                  class="col-sm-4"
                  id="divBtnGuardar"
                  style="right: -120%;"
                  v-bind:style="{display:estiloDisplayGenerar}"
                >
                  <button
                    type="button"
                    class="btn btn-block btn-primary"
                    @click="GuardarCertificado(10356)"
                  >Guardar</button>
                </div>
                <div
                  class="col-sm-4"
                  style="right:-150%;"
                  v-bind:style="{display:estiloDisplayVer}"
                >
                  <a v-bind:href="urlDescarga" target="_blank">
                    <button type="button" class="btn btn-block btn-primary">Ver</button>
                  </a>
                </div>
                <div
                  class="col-sm-4"
                  style="right:-85%;"
                  v-bind:style="{display:estiloDisplayEmitir}"
                >
                  <button
                    type="button"
                    id="btnCambioEstado"
                    class="btn btn-block btn-primary swalEmitirSuccess"
                    @click="GuardarCertificado(10358)"
                  >Emitir</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        id="divContainerEditables"
        class="container-fluid divCertificado"
        v-bind:style="{display: estiloDisplay}"
      >
        <div class="card card-default">
          <div class="card-header">
            <h4 class="card-title">
              <b>Certificado</b>
            </h4>
            <div class="card-tools"></div>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <div class="row">
                    <div class="form-group col-sm-5">
                      <div class="row">
                        <label
                          for="exampleInputPassword1"
                          class="col-sm-5 col-form-label"
                          style="text-align: right;"
                        >Nro Certificado</label>
                        <div class="col-sm-7">
                          <input
                            type="number"
                            class="form-control"
                            v-model="numeroCertificadoModelo"
                            id="txtNroCertificado"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="form-group col-sm-2">
                      <label
                        for="exampleInputPassword1"
                        class="col-sm-11 col-form-label"
                        style="text-align: right;"
                      >Croquis</label>
                    </div>
                    <div class="form-group col-sm-5">
                                  <!-- <div class="row">
                                    <div class="custom-file">
                                      <input type="file" class="custom-file-input" id="customFile" accept=".jpg,.png" @change="onFileSelected" >
                                      <label class="custom-file-label" for="customFile"></label>
                                    </div>
                                  </div> -->
                      <div class="row form-group">
                        <div class="col-12 col-md-13">
                          <input
                            type="file"
                            id="file-input"
                            name="file-input"
                            class="form-control-file"
                            @change="onFileSelected"
                          />
                        </div>
                      </div>
                    </div>
                    <!-- <div>
                                   <img src="data:image/png;base64,R0lGODlhDAAMAKIFAF5LAP/zxAAAANyuAP/gaP///wAAAAAAACH5BAEAAAUALAAAAAAMAAwAAAMlWLPcGjDKFYi9lxKBOaGcF35DhWHamZUW0K4mAbiwWtuf0uxFAgA7"> 
                                  <img v-bind:src="'data:image/png;base64,'+croquisB64">
                    </div>-->
                  </div>
                </div>
                <!-- /.form-group -->
              </div>
            </div>
          </div>
          <!-- /.col -->
        </div>
        <div class="card card-default">
          <div class="card-header">
            <h4 class="card-title">
              <b>Areas Mínimas</b>
            </h4>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-10">
                <div class="form-group">
                  <table class="table table-bordered">
                    <thead>
                      <tr>
                        <td>ZONIFICACION</td>
                        <td>DORMITORIOS</td>
                        <td>AREA MINIMA</td>
                        <td>ESTACIONAMIENTOS</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="area of areasMinimas" :key="area.id">
                        <td>{{area.zonificacion}}</td>
                        <td>{{area.cantidadDormitorios}}</td>
                        <td>
                          <input type="number" style="text-align: right;" v-model="area.areaMinima" /> m2.
                        </td>
                        <!-- <td><input type="number" style="text-align: right;" v-model="area.cantidadDormitorios"/> Est. x viv </td> -->
                        <td v-if="area.cantidadDormitorios==1">1 Est. x viv</td>
                        <td v-else>{{area.cantidadEstacionamientosTexto}}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!-- /.form-group -->
              </div>
            </div>
          </div>
          <!-- /.col -->
        </div>
        <div class="card card-default">
          <div class="card-header">
            <h4 class="card-title">
              <b>Carácter Vial, Alineamiento y Retiro Frontal</b>
            </h4>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-10">
                <div class="form-group">
                  <table class="table table-bordered">
                    <thead>
                      <tr>
                        <td>ZONIFICACION</td>
                        <td>CARÁCTER VIAL</td>
                        <td>NOMBRE DE LA VIA</td>
                        <td>ALINEAMIENTO DE FACHADA</td>
                        <td>JARDIN DE AISAMIENTO</td>
                        <td>RETIRO FRONTAL</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="retiro of retiroFrontalModelo" :key="retiro.id">
                        <td>{{retiro.zonificacion}}</td>
                        <td>{{retiro.caracterVial}}</td>
                        <td>{{retiro.nombreVia}}</td>
                        <td>
                          <input
                            type="number"
                            style="text-align: right;"
                            v-model="retiro.alineamientoFachada"
                          /> m.
                        </td>
                        <td>---</td>
                        <td>{{retiro.retiroFrontal}}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!-- /.form-group -->
              </div>
            </div>
          </div>
          <!-- /.col -->
        </div>
        <div class="card card-default">
          <div class="card-header">
            <h4 class="card-title">
              <b>Glosa Informe Técnico</b>
            </h4>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-12">
                <div class="row">
                  <div class="form-group col-sm-5">
                    <div class="row">
                      <label
                        for="exampleInputPassword1"
                        class="col-sm-4 col-form-label"
                        style="text-align: right;"
                      >Área</label>
                      <div class="col-sm-6" style="width:100%">
                        <select
                          class="form-control select2"
                          v-model="codigoUnidadOrganicaGlosaModelo"
                        >
                          <option selected="selected">- Seleccione -</option>
                          <option
                            v-for="unidad of unidadesOrganicasGlosaModelo"
                            :key="unidad.codigo"
                            :value="unidad.codigo"
                          >{{unidad.nombre}}</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="form-group col-sm-5">
                    <div class="row">
                      <label
                        for="exampleInputPassword1"
                        class="col-sm-4 col-form-label"
                        style="text-align: right;"
                      >Tipo Doc.</label>
                      <div class="col-sm-6">
                        <select class="form-control select2" v-model="idTipodocumentoGlosaModelo">
                          <option selected="selected">- Seleccione -</option>
                          <option
                            v-for="unidad of tipoDocumentosGlosaModelo"
                            :key="unidad.ide_elemento"
                            :value="unidad.ide_elemento"
                          >{{unidad.des_nombre}}</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="form-group col-sm-5">
                    <div class="row">
                      <label
                        for="exampleInputPassword1"
                        class="col-sm-4 col-form-label"
                        style="text-align: right;"
                      >Nro</label>
                      <div class="col-sm-6">
                        <input
                          type="number"
                          class="form-control"
                          v-model.number="numeroDocumentoGlosa"
                          id="txtNroInforme"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="form-group col-sm-5">
                    <div class="row">
                      <label
                        for="exampleInputPassword1"
                        class="col-sm-4 col-form-label"
                        style="text-align: right;"
                      >Año</label>
                      <div class="col-sm-6">
                        <input
                          type="number"
                          class="form-control"
                          v-model="anioInformeGlosa"
                          id="txtAnioInforme"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="form-group col-sm-5">
                    <div class="row">
                      <div class="col-sm-4">
                        <button
                          type="button"
                          id="btnValidar"
                          class="btn btn-block btn-success btnValidarInformeSuccess"
                          @click="ValidarGlosaInforme()"
                        >Validar</button>
                      </div>
                      <div class="col-sm-4">
                        <button
                          type="button"
                          id="btnValidar"
                          class="btn btn-block btn-primary btnLimpiarInformeSuccess"
                          @click="LimpiarGlosaInforme()"
                        >Limpiar</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="form-group col-sm-7">
                    <div class="row">
                      <label
                        for="exampleInputPassword1"
                        class="col-sm-6 col-form-label"
                        style="text-align: right;"
                      >{{mensajeValidacionDocumentoGlosa}}</label>
                    </div>
                    <input type="hidden" name="idExpedienteGlosa" v-model="idExpedienteGlosaModelo" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- /.col -->
        </div>
        <div class="card card-default">
          <div class="card-header">
            <h4 class="card-title">
              <b>Nota Expediente</b>
            </h4>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-12">
                <div class="row">
                  <div class="form-group col-sm-5">
                    <div class="row">
                      <label
                        for="exampleInputPassword1"
                        class="col-sm-4 col-form-label"
                        style="text-align: right;"
                      >Área</label>
                      <div class="col-sm-6" style="width:100%">
                        <select
                          class="form-control select2"
                          v-model="codigoUnidadOrganicaNotaModelo"
                        >
                          <!-- <option selected="selected">- Seleccione -</option>
                                    <option >Catastro</option>
                          <option>SubGerencia</option>-->
                          <option selected="selected">- Seleccione -</option>
                          <option
                            v-for="unidad of unidadesOrganicasNotaModelo"
                            :key="unidad.codigo"
                            :value="unidad.codigo"
                          >{{unidad.nombre}}</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="form-group col-sm-5">
                    <div class="row">
                      <label
                        for="exampleInputPassword1"
                        class="col-sm-4 col-form-label"
                        style="text-align: right;"
                      >Tipo Doc.</label>
                      <div class="col-sm-6">
                        <select class="form-control select2" v-model="idTipodocumentoNotaModelo">
                          <option selected="selected">- Seleccione -</option>
                          <option
                            v-for="unidad of tipoDocumentosNotaModelo"
                            :key="unidad.ide_elemento"
                            :value="unidad.ide_elemento"
                          >{{unidad.des_nombre}}</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="form-group col-sm-5">
                    <div class="row">
                      <label
                        for="exampleInputPassword1"
                        class="col-sm-4 col-form-label"
                        style="text-align: right;"
                      >Nro</label>
                      <div class="col-sm-6">
                        <input
                          type="number"
                          class="form-control"
                          v-model.number="numeroDocumentoNota"
                          id="txtNroDocumentoNota"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="form-group col-sm-5">
                    <div class="row">
                      <label
                        for="exampleInputPassword1"
                        class="col-sm-4 col-form-label"
                        style="text-align: right;"
                      >Año</label>
                      <div class="col-sm-6">
                        <input
                          type="number"
                          class="form-control"
                          v-model.number="anioInformeNota"
                          id="txtAnioNota"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="form-group col-sm-5">
                    <div class="row">
                      <div class="col-sm-4">
                        <button
                          type="button"
                          id="btnValidar"
                          class="btn btn-block btn-success btnValidarDocumentoSuccess"
                          @click="ValidarDocumentoNota()"
                        >Validar</button>
                      </div>
                      <div class="col-sm-4">
                        <button
                          type="button"
                          id="btnValidar"
                          class="btn btn-block btn-primary btnLimpiarDocumentoSuccess"
                          @click="LimpiarDocumentoNota()"
                        >Limpiar</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="form-group col-sm-7">
                    <div class="row">
                      <label
                        for="exampleInputPassword1"
                        class="col-sm-6 col-form-label"
                        style="text-align: right;"
                      >{{mensajeValidacionDocumentoNota}}</label>
                    </div>
                    <input type="hidden" name="idExpedienteNota" v-model="idExpedienteNotaModelo" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- /.col -->
        </div>
      </div>
      <!-- /.row -->
    </section>
    
    <!-- /.content -->
  </div>
</template>

<script>
import axios from "axios";
import Constantes from "../../store/constantes.js";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import TituloHeader from '../comun/TituloHeader';
export default {
  components: {
    TituloHeader, 
    Loading,
  },
  data() {
    return {
      isLoading: false,
      idCertificadoModelo: 0,
      numeroExpedienteModelo: "",
      solicitanteModelo: "",
      estadoModelo: "",
      manzanaModelo: "",
      loteModelo: "",
      estiloDisplay: "none",
      estiloDisplayGenerar: "block",
      estiloDisplayEmitir: "none",
      estiloDisplayVer: "none",
      estiloDisplayZonificacionCompatible: "none",
      estiloDisplayZonificacion2: "none",
      numeroCertificadoModelo: "",
      zonificacionModelo: "",
      tipoDocumentosGlosaModelo: null,
      idTipodocumentoGlosaModelo: 0,
      tipoDocumentosNotaModelo: null,
      idTipodocumentoNotaModelo: 0,
      idExpedienteGlosaModelo: 0,
      anioInformeGlosa: "",
      anioInformeNota: "",
      numeroDocumentoGlosa: "",
      numeroDocumentoNota: "",
      mensajeValidacionDocumentoGlosa: "Aun no valida documento",
      mensajeValidacionDocumentoNota: "Aun no valida documento",
      unidadesOrganicasGlosaModelo: null,
      codigoUnidadOrganicaGlosaModelo: "",
      unidadesOrganicasNotaModelo: null,
      codigoUnidadOrganicaNotaModelo: "",
      idExpedienteNotaModelo: 0,
      retiroFrontalModelo: null,
      CaracerVial: null,
      areasMinimas: null,
      imgCroquis: null,
      usuarios: null,
      croquisB64: null,
      idEstadoCertificado: 0,
      urlDescarga: "",
      zonificacionCompatibleModelo: null,
      idZonificacionCompatible: 0,
      zonificacion1: "",
      zonificacion2: "",
      esMixta: false
    };
  },
  mounted() {
    if (localStorage.getItem("logueado") == "true") {
      this.getCertificados();
      this.getUsuarios();
      this.cargarDocumentos(135, 8256);
      this.cargarDocumentosMemo(135, 1476);
    } else {
      this.$router.push("/auth/login/");
    }
  },
  methods: {
    showGuardar() {
      // Use sweetalert2
      this.$swal("Guardando!!!");
    },
    onFileSelected(event) {
      this.imgCroquis = event.target.files[0];
    },
    DescargarCertificado() {
      var urlValidacion =
        Constantes.ruta +
        "obtenerCertificadoArchivo/" +
        this.idCertificadoModelo;
      console.log(urlValidacion);
      axios
        .get(urlValidacion)
        .then(response => {
          console.log("todo ok");
        })
        .catch(e => console.log("error" + e));
    },
    GuardarCroquis(idCertificado) {
      var df = new FormData();
      df.append("imgCroquis", this.imgCroquis);
      df.append("idCertificado", idCertificado);
      console.log("ingreso a funcion guardar croquis");
      var urlValidacion = Constantes.ruta + "guardarCroquisCertificado/";
      axios
        .post(urlValidacion, df, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(response => {
          this.$swal("La imagen fue guardada correctamente");
          //alert('la imagen fue guardada correctamente');
        })
        .catch(e => console.log(e));
    },
    ValidarImagen() {
      if (this.imgCroquis == null) {
        this.$swal("imagen nula");
        //alert('imagen nula');
      } else {
        this.$swal("imagen no nula");
        //alert('imagen no nula');
      }
    },
    GuardarCertificado(estado) {
      this.$swal({
        title: "Guardando",
        onOpen: () => {
          this.$swal.showLoading();
        }
      });
      var dataCertificado = {};
      var ExpedienteGuardar = {};
      ExpedienteGuardar.idExpediente = this.$route.params.idExpediente;
      dataCertificado.Expediente = {};
      dataCertificado.Expediente = ExpedienteGuardar;
      dataCertificado.ideExpediente = this.$route.params.idExpediente;
      dataCertificado.cuc =
        "22 - " +
        this.PadLeft(this.manzanaModelo, 4) +
        " - " +
        this.PadLeft(this.loteModelo, 4);
      dataCertificado.manzana = this.manzanaModelo;
      dataCertificado.lote = this.loteModelo;
      dataCertificado.nroCertificado = this.numeroCertificadoModelo;
      dataCertificado.ideExpedienteGlosa = this.idExpedienteGlosaModelo;
      dataCertificado.ideExpedienteNota = this.idExpedienteNotaModelo;
      dataCertificado.zonificacion = this.zonificacionModelo;
      dataCertificado.listaRetiroFrontal = this.retiroFrontalModelo;
      dataCertificado.idCertificado = this.idCertificadoModelo;
      dataCertificado.listaCertificadoAreasMinimas = this.areasMinimas;
      dataCertificado.esMixto = this.esMixta;
      dataCertificado.zonificacion2 = this.zonificacion2;
      dataCertificado.usuarioLogin = localStorage.getItem("cuenta");
      dataCertificado.idUsuarioCreador = localStorage.getItem(
        "idUsuarioLogueado"
      );
      dataCertificado.idUsuarioModificado = localStorage.getItem(
        "idUsuarioLogueado"
      );
      dataCertificado.idUsuarioEmisor = localStorage.getItem(
        "idUsuarioLogueado"
      );
      dataCertificado.siglasUsuario =
        localStorage.getItem("nombreUsuarioLogueado").substr(0, 1) +
        localStorage.getItem("paternoUsuarioLogueado").substr(0, 1) +
        localStorage.getItem("maternoUsuarioLogueado").substr(0, 1);
      dataCertificado.zonificacionCompatible = {};
      var zonificacionCompatible = {};
      zonificacionCompatible.idZonificacionCompatible = this.idZonificacionCompatible;
      dataCertificado.zonificacionCompatible = zonificacionCompatible;

      var urlValidacion = Constantes.ruta + "guardarCertificado/";
      var dataPost = new FormData();
      dataPost.append("certificado", JSON.stringify(dataCertificado));

      if (estado == 10358) {
        urlValidacion = Constantes.ruta + "emitirCertificado/";
      } else {
        dataPost.append("imgCroquis", this.imgCroquis);
        if (this.imgCroquis == null) {
          urlValidacion = Constantes.ruta + "guardarCertificadoSinCroquis/";
        }
      }
      console.log("pintando objeto imgCroquis");
      console.log(this.imgCroquis);
      console.log(urlValidacion);
      console.log(dataCertificado);
      console.log(dataPost);
      if ((this.idCertificadoModelo == 0) & (this.imgCroquis == null)) {
        this.$swal("Debe elegir un croquis.");
        //alert('Debe elegir un croquis.');
        console.log(this.idCertificadoModelo);
        console.log(this.imgCroquis);
      } else {
        //alert('2.');
        console.log(this.idCertificadoModelo);
        console.log(this.imgCroquis);
        axios
          .post(urlValidacion, dataPost)
          .then(response => {
            if (response.data.ok) {
              this.$swal("Certificado Guardado Correctamente.");
              //alert('Certificado Guardado Correctamente');
              this.getCertificados();
            } else {
              this.$swal(
                "Sucedió un error al guardar Certificado. Comuníquese con el área de Sistemas."
              );
              //alert('Sucedió un error al guardar Certificado. Comuníquese con el área de Sistemas.');
            }
          })
          .catch(e => console.log(e));
      }
    },
    ValidarDocumentoNota() {
      var urlValidacion =
        Constantes.ruta +
        "documentoExpediente/" +
        this.idTipodocumentoNotaModelo +
        "/" +
        this.numeroDocumentoNota +
        "/" +
        this.anioInformeNota +
        "/" +
        this.codigoUnidadOrganicaNotaModelo;
      console.log(urlValidacion);
      axios
        .get(urlValidacion)
        .then(response => {
          var expedienteJson = response.data;
          console.log("tamaño JSON:" + expedienteJson.data.length);
          this.mensajeValidacionDocumentoNota =
            "El documento no fue encontrado";
          if (expedienteJson.data.length > 0) {
            console.log(expedienteJson.data);
            this.idExpedienteNotaModelo =
              expedienteJson.data[0].idDocumentoExpediente;
            this.mensajeValidacionDocumentoNota =
              "El documento fue validado con éxito";
            this.$swal({
              icon: "success",
              text: "El documento fue validado con éxito"
            });
          } else {
            this.$swal({
              icon: "error",
              title: "Error",
              text: "Documento no encontrado"
            });
          }
          console.log(expedienteJson);
        })
        .catch(e => console.log(e));
    },
    ValidarGlosaInforme() {
      var urlValidacion =
        Constantes.ruta +
        "documentoExpediente/" +
        this.idTipodocumentoGlosaModelo +
        "/" +
        this.numeroDocumentoGlosa +
        "/" +
        this.anioInformeGlosa +
        "/" +
        this.codigoUnidadOrganicaGlosaModelo;
      console.log(urlValidacion);
      axios
        .get(urlValidacion)
        .then(response => {
          var expedienteJson = response.data;
          console.log("tamaño JSON:" + expedienteJson.data.length);
          this.mensajeValidacionDocumentoGlosa =
            "El documento no fue encontrado";
          //this.$swal('El documento no fue encontrado');
          if (expedienteJson.data.length > 0) {
            console.log(expedienteJson.data);
            this.idExpedienteGlosaModelo =
              expedienteJson.data[0].idDocumentoExpediente;
            console.log("documento glosa:" + this.idExpedienteGlosaModelo);
            this.mensajeValidacionDocumentoGlosa =
              "El documento fue validado con éxito";
            this.$swal({
              icon: "success",
              text: "El documento fue validado con éxito"
            });
            //this.$swal('El documento fue validado con éxito');
          } else {
            this.$swal({
              icon: "error",
              title: "Error",
              text: "Documento no encontrado"
            });
          }
          console.log(expedienteJson);
        })
        .catch(e => console.log(e));
    },
    LimpiarGlosaInforme() {},
    cargarDocumentos(tipo, elemento) {
      axios
        .get(Constantes.ruta + "ctlmelecgo/" + tipo + "/" + elemento)
        .then(response => {
          var tipoDocumentoJson = response.data;
          this.tipoDocumentosGlosaModelo = tipoDocumentoJson.data;
        })
        .catch(e => console.log(e));
    },
    cargarDocumentosMemo(tipo, elemento) {
      axios
        .get(Constantes.ruta + "ctlmelecgo/" + tipo + "/" + elemento)
        .then(response => {
          var tipoDocumentoJson = response.data;
          this.tipoDocumentosNotaModelo = tipoDocumentoJson.data;
        })
        .catch(e => console.log(e));
    },
    generarCertificado() {
      //alert(this.manzanaModelo);
      if (this.manzanaModelo == null) {
        this.$swal({
          icon: "error",
          title: "Error",
          text: "Debe digitar la manzana."
        });
        return false;
      }
      if (this.loteModelo == null) {
        this.$swal({
          icon: "error",
          title: "Error",
          text: "Debe digitar el lote."
          /* onOpen: () => {
                    this.$swal.showLoading();
                  } */
        });
        return false;
      }
      this.estiloDisplay = "block";
      axios
        .get(
          Constantes.ruta + "zona/" + this.manzanaModelo + "&" + this.loteModelo
        )
        .then(response => {
          (this.estiloDisplayZonificacion2 = "none"), (this.esMixta = false);
          var zonificacionJson = response.data;
          var zonificacionJson2 = response.data.data2;
          var retiroFrontalJson = response.data.listaRetiroFrontal;
          var unidadesOrganicasJson = response.data.listaUnidadesOrganicas;
          this.zonificacionModelo =
            zonificacionJson.data.codigo +
            "(" +
            zonificacionJson.data.nombre +
            ")";
          this.zonificacion1 =
            zonificacionJson.data.codigo +
            "(" +
            zonificacionJson.data.nombre +
            ")";
          if (response.data.data2.codigo != null) {
            console.log(response.data.data2);
            this.zonificacion2 =
              zonificacionJson2.codigo + "(" + zonificacionJson2.nombre + ")";
            this.estiloDisplayZonificacion2 = "block";
            this.esMixta = true;
          }
          if (this.idCertificadoModelo == 0) {
            this.retiroFrontalModelo = retiroFrontalJson;
            this.areasMinimas = response.data.listaAreasMinimas;
          }
          console.log(this.retiroFrontalModelo);
          this.unidadesOrganicasGlosaModelo = unidadesOrganicasJson;
          this.unidadesOrganicasNotaModelo = unidadesOrganicasJson;
          this.zonificacionCompatibleModelo =
            response.data.listaZonificacionCompatibles;
          if (
            this.zonificacionCompatibleModelo != null &&
            this.idZonificacionCompatible == 0
          ) {
            this.idZonificacionCompatible = this.zonificacionCompatibleModelo[0].idZonificacionCompatible;
          }
          console.log(this.zonificacionCompatibleModelo);
          if (zonificacionJson.data.codigo == "CM") {
            this.estiloDisplayZonificacionCompatible = "block";
          } else {
            this.estiloDisplayZonificacionCompatible = "none";
          }
          if (this.idEstadoCertificado == 10356 && this.idCertificadoModelo > 0)
            this.estiloDisplayEmitir = "block";
          if (this.idCertificadoModelo > 0) this.estiloDisplayVer = "block";
        })
        .catch(e => console.log(e));
    },
    getCertificados() {
      axios
        .get(Constantes.ruta + "certificado/" + this.$route.params.idExpediente)
        .then(response => {
          var certificadoJson = response.data;
          var certificadoObjeto = certificadoJson.data;
          var expedienteObjeto = certificadoJson.data.idExpediente;
          var retiroFrontalJson = response.data.listaRetiroFrontal;
          var estadoObjeto = certificadoJson.data.idEstado;
          var documentoGlosaJson =
            certificadoJson.data.idDocumentoExpedienteGlosa;
          var documentoNotaJson =
            certificadoJson.data.idDocumentoExpedienteNota;
          this.numeroExpedienteModelo = expedienteObjeto.numeroExpediente;
          this.solicitanteModelo =
            expedienteObjeto.nombresSolicitante +
            " " +
            expedienteObjeto.paternoSolicitante +
            " " +
            expedienteObjeto.maternoSolicitante;
          this.estadoModelo = estadoObjeto.des_nombre;
          this.manzanaModelo = certificadoObjeto.manzana;
          this.loteModelo = certificadoObjeto.lote;
          this.idCertificadoModelo = certificadoObjeto.idCertificado;
          this.zonificacionModelo = certificadoObjeto.zonificacion;
          this.numeroCertificadoModelo = certificadoObjeto.nroCertificado;
          this.retiroFrontalModelo = certificadoJson.data.listaRetiroFrontal;
          this.areasMinimas = certificadoJson.data.listaCertificadoAreasMinimas;
          if (documentoGlosaJson.idDocumentoExpediente > 0) {
            this.idTipodocumentoGlosaModelo =
              documentoGlosaJson.tipoDocumento.ide_elemento;
            this.anioInformeGlosa = documentoGlosaJson.anioDocumento;
            this.codigoUnidadOrganicaGlosaModelo =
              documentoGlosaJson.expediente.unidadOrganica.codigo;
            this.numeroDocumentoGlosa =
              documentoGlosaJson.expediente.numeroExpediente;
            this.idExpedienteGlosaModelo =
              documentoGlosaJson.idDocumentoExpediente;
          }
          if (documentoNotaJson.idDocumentoExpediente > 0) {
            this.idTipodocumentoNotaModelo =
              documentoNotaJson.tipoDocumento.ide_elemento;
            this.anioInformeNota = documentoNotaJson.anioDocumento;
            this.codigoUnidadOrganicaNotaModelo =
              documentoNotaJson.expediente.unidadOrganica.codigo;
            this.numeroDocumentoNota =
              documentoNotaJson.expediente.numeroExpediente;
            this.idExpedienteNotaModelo =
              documentoNotaJson.idDocumentoExpediente;
          }
          if (this.idExpedienteGlosaModelo > 0)
            this.mensajeValidacionDocumentoGlosa =
              "El documento fue validado con éxito";
          if (this.idExpedienteNotaModelo > 0)
            this.mensajeValidacionDocumentoNota =
              "El documento fue validado con éxito";

          if (this.idCertificadoModelo > 0) this.estiloDisplay = "block";
          this.croquisB64 = certificadoObjeto.croquis;
          this.idEstadoCertificado = estadoObjeto.ide_elemento;
          if (
            this.idEstadoCertificado == 10358 ||
            this.idEstadoCertificado == 10359
          )
            this.estiloDisplayGenerar = "none";
          console.log(
            "pintando estado e idcertificado" +
              this.idCertificadoModelo +
              " " +
              this.idEstadoCertificado
          );
          if (this.idEstadoCertificado == 10356 && this.idCertificadoModelo > 0)
            this.estiloDisplayEmitir = "block";
          if (this.idCertificadoModelo > 0) this.estiloDisplayVer = "block";
          this.urlDescarga =
            Constantes.ruta +
            "obtenerCertificadoArchivo/" +
            this.idCertificadoModelo;
          console.log(
            "documento expediente glosa" + this.idExpedienteGlosaModelo
          );
          if (this.idCertificadoModelo > 0) {
            this.generarCertificado();
          }

          /* console.log('pintando certificadosJson');
                    console.log('0');
                    console.log(this.certificadosJson); */
        })
        .catch(e => console.log(e));
    },
    getUsuarios() {
      axios
        .get("https://jsonplaceholder.typicode.com/users")
        .then(response => {
          this.usuarios = response.data;
        })
        .catch(e => console.log(e));
    },
    PadLeft(value, length) {
      return value.toString().length < length
        ? this.PadLeft("0" + value, length)
        : value;
    }
  }
};
</script>