<template>
  <div class="content-wrapper">
    <loading
      :active.sync="isLoading"
      :is-full-page="true"
      color="#007BFF"
    ></loading>
    <titulo-header>Módulo de Trámites</titulo-header>
    <section class="content">
      <el-row :gutter="10">
        <div class="card menu">
          <el-row :gutter="10" class="d-flex">
            <el-col :xs="24" :md="8">
              <label class="col-form-label">Solicitud</label>
              <input
                type="text"
                class="form-control"
                :value="'ST-00' + idTramite"
                disabled
              />
            </el-col>
            <el-col :xs="24" :md="8" v-if="idExpedienteAnexo > 0">
              <label class="col-form-label text-right">Exp. Anexo</label>
              <input
                type="text"
                class="form-control"
                :value="
                  'Exp-00' + numeroExpedienteAnexo + '-' + anioExpedienteAnexo
                "
                disabled
              />
            </el-col>
            <el-col :xs="24" :md="8"
              v-if="numeroDocumentoExpediente != null"
            >
              <label class="col-form-label">Expediente</label>
              <el-row :gutter="10" class="py-0 my-0">
                <el-col :xs="20" :md="20">
                <input 
                  type="text"
                  class="form-control"
                  :value="numeroDocumentoExpediente"
                  disabled
                />
                </el-col>
                <el-col :xs="4" :md="4" class="px-auto text-center">
                  <a  v-bind:href="urlDocumentoPrincipal" target="_blank">
                    <img class=""
                      src="../../images/lupa.png"
                      alt=""
                      srcset=""
                      width="25"
                      height="25"
                    />
                  </a>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row :gutter="10" class="">
            <el-col :xs="24" :md="8">
              <label class="col-form-label text-right">Tipo Tramite</label>
              <input
                type="text"
                class="form-control"
                v-model="tipoTramite"
                disabled
              />
            </el-col>
            <el-col :xs="24" :md="8">
              <label class="col-form-label">Solicitante:</label>
              <input
                type="text"
                class="form-control"
                v-model="solicitante"
                disabled
              />
            </el-col>
            <el-col :xs="24" :md="8">
              <label class="col-form-label">Estado:</label>
              <input
                type="text"
                class="form-control"
                v-model="estado"
                disabled
              />
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :xs="24" :md="8">
              <label class="col-form-label"> Fecha Creación</label>
              <input
                type="text"
                class="form-control"
                :value="fechaEnRevision + ' ' + horaEnRevision"
                disabled
              />
            </el-col>
            <el-col :xs="24" :md="8">
              <template v-if="fechaPresentacion != null">
                <label class="col-form-label">Fecha Presentación:</label>
                <input
                  type="text"
                  class="form-control"
                  :value="fechaPresentacion"
                  disabled
                />
              </template>
              <template v-if="fechaObservacion != null">
                <label class="col-form-label">Fecha Observación:</label>
                <input
                  type="text"
                  class="form-control"
                  :value="fechaObservacion + ' ' + horaObservacion"
                  disabled
                />
              </template>
              <template v-if="fechaSubsanacion != null">
                <label class="col-form-label">Fecha Subsanación:</label>
                <input
                  type="text"
                  class="form-control"
                  :value="fechaSubsanacion + ' ' + horaSubsanacion"
                  disabled
                />
              </template>
              <template v-if="fechaAprobacion != null">
                <label class="col-form-label">Fecha Aprobación:</label>
                <input
                  type="text"
                  class="form-control"
                  :value="fechaAprobacion + ' ' + horaAprobacion"
                  disabled
                />
              </template>
            </el-col>
            <el-col :xs="24" :md="8"><!-- falta -->
              <label class="col-form-label">Unidad Orgánica Destino:</label>
              <template 
                v-if="
                  estiloDisplayUnidadOrganica == 'block' &&
                  estiloDisplayAprobar != 'none' &&
                  idUnidadTramite == idUnidadAdministracionDocumentaria
                ">
                <el-row class="my-0">
                  <el-col :xs="20" :sm="20">
                    <input
                      class="form-control"
                      :value="nombreUnidadDestino"
                      disabled
                    />
                  </el-col>
                  <a
                    href="javascript:;"
                    @click="estiloDisplayUnidadOrganica = 'none'"
                  >
                    <el-col :xs="4" :sm="4" class="d-flex align-items-center justify-content-center"
                      style="height: 35px">
                        <img
                          src="../../images/pencil-png.png"
                          width="15"
                          height="15" class="my-auto"
                        />
                    </el-col>
                  </a>
                </el-row>
              </template>
              <template 
                v-else-if="
                  (estiloDisplayUnidadOrganica == 'block' &&
                    estiloDisplayAprobar == 'none') ||
                  idUnidadAdministracionDocumentaria != idUnidadTramite
                "
              >
                <input
                  type="text"
                  class="form-control"
                  :value="nombreUnidadDestino"
                  disabled
                />
              </template>
              <template v-else>
                <model-select
                  :options="mapListaUnidadDestino"
                  v-model="idUnidadDestino"
                  placeholder="Seleccione una unidad orgánica"
                  @input="ObtenerNombreUnidadDestino()"
                  :disabled="true"
                >
                </model-select>
              </template>
              <div class="row mt-1" v-if="estiloDisplayUnidadOrganica == 'none'">
                <div class="col-sm-6">
                  <el-button
                    class="btn-block" type="primary"
                    @click="TransferirAprobar()"
                  >
                    Guardar
                  </el-button>
                </div>
                <div class="col-sm-6">
                  <el-button
                    class="btn-block"
                    @click="
                      idUnidadDestino = idUnidadDestinoOriginal;
                      ObtenerNombreUnidadDestino();
                      estiloDisplayUnidadOrganica = 'block';
                    "
                  >
                    Cancelar
                  </el-button>
                </div>
              </div>
            </el-col>
          </el-row>
          <div>
            <hr/>
              <el-row :gutter="10" class="d-flex justify-content-sm-between">
                <el-col :md="3" v-bind:style="{ display: estiloDisplayAprobar }">
                  <el-button
                    type="text"
                    class="btn-block btn__info" style=""
                    @click="MostrarVisor(0)"
                    >Visor</el-button
                  >
                </el-col>
                <el-col :md="3" v-bind:style="{ display: estiloDisplayAprobar }">
                  <el-button type="primary" class="btn-block" @click="Aprobar()" plain
                    >Aprobar</el-button
                  >
                </el-col>
                <el-col :md="3" v-bind:style="{ display: estiloDisplayObservar }">
                  <el-button type="warning" class="btn-block" @click="Observar2()" plain
                    >Observar</el-button
                  >
                </el-col>
                <el-col :md="3" v-bind:style="{ display: estiloDisplayAprobar }">
                  <el-button
                    type="primary" plain
                    class="btn-block "
                    @click="$bvModal.show('transferirModal')"
                    >Transferir</el-button
                  >
                </el-col>
                <el-col :md="3" v-bind:style="{ display: estiloDisplayAprobar }">
                  <el-button
                    type="danger" plain
                    class="btn-block"
                    @click="$bvModal.show('desestimarModal')"
                    >Desestimar</el-button
                  >
                </el-col>
                <el-col :md="3" v-bind:style="{ display: estiloDisplayVer }">
                  <a v-bind:href="urlDescargaConstancia" target="_blank">
                    <el-button type="primary" class="btn-block"
                      >Ver Constancia</el-button
                    >
                  </a>
                </el-col>
              </el-row>
            <hr/>
          </div>
          <div>
            <template v-if="idPagoSamd > 0">
              <div class="card-header">
                <h4 class="card-title">Recibo</h4>
              </div>
              <div class="tab-pane active">
                <div class="container" style="padding-top: 1%; !important">
                  <div class="d-flex justify-content-around py-2 px-5">
                    <el-col :md="3">
                      <label class="col-form-label">Número Recibo:</label>
                    </el-col>
                    <el-col :md="5">
                      <el-input :value="numeroRecibo" disabled />
                    </el-col>
                    <el-col :md="4">
                      <label class="col-form-label">Número Operación:</label>
                    </el-col>
                    <el-col :md="5">
                      <el-input :value="numeroPedido" disabled />
                    </el-col>
                    <el-col :md="4">
                      <a
                        v-bind:href="urlDescargaRecibo + idPagoSamd + '/0'"
                        target="_blank"
                      >
                        <el-button type="primary" class="btn-block"
                          >Ver Recibo</el-button
                        >
                      </a>
                    </el-col>
                  </div>
                </div>
              </div>
            </template>
          </div>
          <div>
            <h4 class="card-title">Requisitos</h4>
            <hr />
            <div class="tab-pane active">
              <div class="container" style="padding-top: 1%; !important">
                <div class="d-flex justify-content-center px-5">
                  <table class="table table-hover table-sm">
                    <thead class="">
                      <tr>
                        <th width="45%">Requisito</th>
                        <th width="30%">Valor</th>
                        <th width="10%">Actualización</th>
                        <th class="text-center" width="15%">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="requisito of listaRequisitoModelo"
                        :key="requisito.idRequisito"
                      >
                        <td scope="row" style="text-align: left">
                          {{ requisito.nombre }}
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
                          class="text-center"
                          v-bind:style="{ display: displayAcciones }"
                        >
                          <template>
                            <a
                              v-bind:href="requisito.urlDescarga"
                              target="_blank"
                              style="padding: 0"
                            >
                              <el-button type="text" class=""
                                ><u>Ver</u></el-button
                              >
                            </a>
                          </template>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 class="card-title">Adjuntos</h4>
            <hr />
            <div id="tabArchivo" class="tab-pane active">
              <div class="container" style="padding-top: 1%; !important">
                <div class="d-flex justify-content-center px-5">
                  <table class="table table-hover table-sm mb-2">
                    <thead>
                      <tr>
                        <th>Archivo</th>
                        <th>Actualización</th>
                        <th class="text-center">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="adjunto of listaAdjuntos"
                        :key="adjunto.idArchivoTramite"
                      >
                        <td style="color: #0078cf">
                          {{ adjunto.nombreArchivo }}
                        </td>
                        <td>{{ adjunto.observacion }}</td>
                        <td class="text-center">
                          <template v-if="adjunto.flagPrincipal == true">
                            <a
                              v-bind:href="
                                urlDescarga + adjunto.idArchivoTramite + '/0'
                              "
                              target="_blank"
                            >
                              <el-button type="text"><u>Ver</u></el-button>
                            </a>
                          </template>
                          <template v-else>
                            <a
                              style="padding-left: 15px; padding-right: 15px"
                              v-bind:href="
                                urlDescarga + adjunto.idArchivoTramite + '/0'
                              "
                              target="_blank"
                            >
                              <el-button type="text"><u>Ver</u></el-button>
                            </a>
                            <!-- <button
                                style="padding-left:15px;"
                                class="btn btn-danger"
                                @click="EliminarArchivo(adjunto.idArchivoTramite)"
                                v-bind:style="{display:estiloDisplayAprobar}"
                              >Eliminar</button> -->
                          </template>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h4 class="card-title">Observaciones</h4>
            <hr />
            <div
              id="tabObservaciones"
              class="tab-pane active"
              style="padding-top: 1%; !important"
            >
              <div class="container">
                <div
                  class="d-flex justify-content-around px-5 pb-2"
                  v-bind:style="{ display: estiloDisplayObservar }"
                >
                  <el-col :md="4">
                    <label class="col-form-label">Observación:</label>
                  </el-col>
                  <el-col :md="13">
                    <el-input
                      v-model="observacion"
                      @keyup.enter="AgregarObservacion"
                    />
                  </el-col>
                  <el-col :md="4">
                    <el-button
                      class="btn-block"
                      type="primary"
                      @click="AgregarObservacion()"
                      >Agregar</el-button
                    >
                  </el-col>
                </div>
                <div class="d-flex justify-content-center px-5">
                  <table class="table table-hover table-sm">
                    <thead class="">
                      <tr>
                        <th width="60%">Observación</th>
                        <th width="10%">Fecha</th>
                        <th width="10%">Hora</th>
                        <th
                          v-bind:style="{ display: estiloDisplayObservar }"
                          width="20%"
                          class="text-center"
                        >
                          Acción
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <template
                        v-if="
                          listaObservaciones != null &&
                          listaObservaciones != undefined
                        "
                      >
                        <tr
                          v-for="observacion of listaObservaciones
                            .slice()
                            .reverse()"
                          :key="observacion.idObservacion"
                        >
                          <td scope="row">{{ observacion.descripcion }}</td>
                          <td scope="row">{{ observacion.fechaCreacion }}</td>
                          <td scope="row">{{ observacion.horaObservacion }}</td>
                          <td class="text-center">
                            <template
                              v-if="
                                observacion.horaObservacion == null ||
                                observacion.horaObservacion == ''
                              "
                              v-bind:style="{ display: estiloDisplayObservar }"
                            >
                              <el-button
                                type="text"
                                @click="
                                  removeElement(observacion.idObservacion)
                                "
                              >
                                <u>Eliminar</u>
                              </el-button>
                            </template>
                            <template
                              v-else
                              v-bind:style="{ display: estiloDisplayObservar }"
                              >Histórico
                            </template>
                          </td>
                        </tr>
                      </template>
                      <template v-else>
                        <slot v-text="'Lista vacía'"></slot>
                      </template>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h4 class="card-title">Trazabilidad</h4>
            <hr />
            <div id="tabTrazabilidad" class="tab-pane active">
              <div class="container" style="padding-top: 1%; !important">
                <div class="d-flex justify-content-center px-5 py-2">
                  <table class="table table-hover table-sm mb-2">
                    <thead class="">
                      <tr>
                        <th width="10%">Acción</th>
                        <th width="20%">Usuario</th>
                        <th width="10%">Fecha</th>
                        <th width="30%">Unidad</th>
                        <th width="30%">Detalle</th>
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
          </div>
        </div>
      </el-row>

      <div>
        <b-modal id="desestimarModal" hide-footer title="Desestimar Trámite" t>
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
          <div class="d-flex justify-content-between">
            <el-button class="mt-3" @click="cerrarModalDesestimar()"
              ><u>Cancelar</u></el-button
            >
            <el-button class="mt-3" type="danger" @click="Desestimar()"
              ><u>Desestimar</u></el-button
            >
          </div>
        </b-modal>
        <b-modal id="aprobarModal" hide-footer>
          <div class="d-block text-center">
            <h3>Datos Sticker</h3>
          </div>
          <div><label for=""></label></div>

          <div>
            <label>Solicitante: {{ solicitante }}</label>
          </div>
          <div>
            <label>Asunto: {{ tipoTramite }}</label>
          </div>
          <div>
            <label>Registrado por: {{ registradoPor }}</label>
          </div>
          <div v-if="idExpedienteAnexo > 0">
            <label
              >Registrado por: Exp-00 {{ numeroExpedienteAnexo }} -
              {{ anioExpedienteAnexo }}</label
            >
          </div>
          <div>
            <label>U. Destino: {{ nombreUnidadDestino }} </label>
          </div>
          <div class="row">
            <div class="col-sm-6" id="divBtnGuardar">
              <!-- <button type="button" class="btn btn-block btn-primary" @click="showGuardar()">Guardar Modal</button> -->
              <el-button
                type="primary"
                class=""
                @click="
                  idUnidadDestino == idUnidadDestinoOriginal
                    ? Aprobar()
                    : Aprobar()
                "
              >
                <u>Aprobar</u>
              </el-button>
            </div>
            <div class="col-sm-6" id="divBtnGuardar">
              <!-- <button type="button" class="btn btn-block btn-primary" @click="showGuardar()">Guardar Modal</button> -->
              <el-button
                type=""
                class=""
                @click="$bvModal.hide('aprobarModal')"
              >
                <u>Cancelar</u>
              </el-button>
            </div>
          </div>
        </b-modal>
        <b-modal id="transferirModal" hide-footer title="Transferir Trámite">
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
          <div class="d-flex justify-content-between">
            <el-button class="mt-3" @click="this.$bvModal.hide('transferirModal');"
              ><u>Cancelar</u></el-button
            >
            <el-button
              class="mt-3"
              id="btnTransfer"
              ref="refTransfer"
              type="danger"
              @click.prevent="Transferir()"
              ><u>Transferir</u></el-button
            > 
          </div>
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
          <el-button class="mt-3" type="primary" @click="CerrarModal()">Cerrar</el-button>
        </b-modal>
        <b-modal id="visorModal" hide-footer size="huge">
          <div class="form-group col-sm-12">
            <el-row :gutter="10" class="d-flex">
              <label>Coordenas <span class="text-danger font-weight-bold">(x,y)</span></label>
              <div class="col-sm-2">
                <el-input @keypress.native="soloNumeros" v-model="x" />
              </div>
              <div class="col-sm-2">
                <el-input @keypress.native="soloNumeros" v-model="y" />
              </div>
              <label>Fuente</label>
              <div class="col-sm-1" style="padding-right: 0px; !important"> 
                      <div class="form-group">
                        <select id="ddlTamanoLetra" class="form-control" v-model="tamanoLetraVisor" @change="MostrarVisor(1)">
                          <option value="8">8</option>
                          <option value="10">10</option>
                          <option value="12">12</option>
                          <option value="14">14</option>
                          <option value="16">16</option>
                          <option value="18">18</option>
                          <option value="20">20</option>
                          <option value="22">22</option>
                          <option value="24">24</option>
                        </select>
                      </div>
                    </div>
		          <div class="col-sm-4">
                            <button class="btn btn-success" @click="MostrarVisor(1)" >Ubicar y Fijar</button>
              </div>

              
            </el-row>
          </div>
          <div>
            <vue-slider
              v-model="x"
              :min="xInferior"
              :max="xSuperior"
              :interval="1"
              @input="actualizarx"
            ></vue-slider>
          </div>
          <div class="contenedor-documento">
            <div class="row">
              <div>
                <vue-slider
                  v-model="y"
                  :min="yInferior"
                  :max="ySuperior"
                  direction="btt"
                  :style="sizeSlideY"
                ></vue-slider>
              </div>
              <div style="width: 95%">
                <!-- <img src="../../images/logomuniwhite.png" class="img-drawable" id="firma" alt=""> -->
                <iframe
                  :src="rutaArchivoSticker"
                  style="width: 100%; height: 1700px"
                  type="application/pdf"
                  frameborder="0"
                ></iframe>
              </div>
            </div>

            <!-- <iframe src="../../images/ejemplo.pdf" style="width:100%; height:375px;"  type="application/pdf" frameborder="0"></iframe> -->
          </div>
        </b-modal>
      </div>
    </section>
  </div>
</template>
<script>
import axios from "axios";
import interact from "interactjs";
import Desestimar from "./Desestimar.vue";
import Constantes from "../../store/constantes.js";
import { ModelSelect } from "vue-search-select";
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/antd.css";
import TituloHeader from "../comun/TituloHeader";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
export default {
  components: {
    Desestimar,
    ModelSelect,
    VueSlider,
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
      listaObservacionesPrev: null,
      listaObservacionesModelo: [],
      idTramite: 0,
      urlDescarga: `${Constantes.entidadArchivo}/2/`,
      urlDescargaRecibo: `${Constantes.entidadArchivo}/7/`,
      urlDocumentoPrincipal: `${Constantes.entidadArchivo}/8707/0/`,
      usuarioPost: {},
      usuarioCreador: {},
      esPrincipal: false,
      estiloDisplayAprobar: "block",
      estiloDisplayUnidadOrganica: "block",
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
      anioExpedienteAnexo: null,
      numeroExpedienteAnexo: null,
      listaAreas: null,
      mapListaAreas: [],
      areaSeleccionada: [],
      areaTransferir: "",
      cargandoModal: false,
      idareaSesion: localStorage.getItem("codUnidadLogueado"),
      usuarioSesion: localStorage.getItem("cuenta"),
      numeroDocumentoExpediente: "",
      idPagoSamd: 0,
      correoCoordinadorTransferir: "",
      vecesObservadas: 0,
      idEstado: 0,
      listaTrazabilidad: null,
      usuarioTramite: "",
      rutaArchivoSticker: "",
      x: 0,
      y: 0,
      xInferior: 0,
      yInferior: 0,
      xSuperior: 0,
      ySuperior: 0,
      sizeSlideY: "",
      xSlider: 1,
      xOriginal: 0,
      yOriginal: 0,
      rotacion: 0,
      flagFijado: false,
      interactPosition: {
        x: 0,
        y: 0,
      },
      isCurrent: {
        type: Boolean,
        required: true,
      },
      mapListaUnidadDestino: null,
      idUnidadDestino: 0,
      idUnidadDestinoOriginal: 0,
      unidadAdministracionDocumentariaArchivo:
        "Administración Documentaria y Archivo",
      idUnidadAdministracionDocumentaria: 811,
      nombreUnidadDestino: "",
      registradoPor: "",
      cambioUnidadSinVisor: false,
      idUnidadTramite: 0,
      tamanoLetraVisor:8
    };
  },
  computed: {
    transformString() {
      const { x, y } = this.interactPosition;
      return `translate3D(${x}px, ${y}px, 0)`;
    },
  },
  mounted() {
    if (localStorage.getItem("logueado") == "true") {
      this.CargarTramite();
      this.ObtenerListaAdjuntos();
      //this.ListarObservaciones();
      this.InicializarUsuario();
      this.obtenerAreas();
      this.moverSticker();
    } else {
      this.$router.push("/auth/login/");
    }
  },
  beforeDestroy() {
    interact(this.$refs.interactElement).unset();
  },
  methods: {
    soloNumeros: function(event){
      var key = window.event ? event.which : event.keyCode;
      if(key == 8){
      }else if (key < 48 || key > 57) {
        event.preventDefault();
      }
    },
    actualizarx() {
      this.x = this.xOriginal * this.xSlider;
    },
    MostrarVisor(procesar) {
      if (this.estiloDisplayUnidadOrganica == "none") {
        this.$swal({
          icon: "info",
          text: "Confirme o cancele la edición de la unidad destino",
        });
        return false;
      }
      this.$bvModal.show("visorModal");
      this.$swal({
        title: "Procesando",
        allowOutsideClick: false,
        onBeforeOpen: () => {
          this.$swal.showLoading();
        },
      });
      if (this.cambioUnidadSinVisor) {
        procesar = 1;
      }
      this.rutaArchivoSticker = "";
      var url =
        Constantes.rutaTramite + "tramite-sticker/"+this.idTramite+"/"+this.x+"/"+this.y+"/"+procesar+"/"+localStorage.getItem('cuenta')+"/"+this.tamanoLetraVisor
        "tramite-sticker/" +
        this.idTramite +
        "/" +
        this.x +
        "/" +
        this.y +
        "/" +
        procesar +
        "/" +
        localStorage.getItem("cuenta");
      axios
        .get(url)
        .then((response) => {
          console.log(response.data.data);
          if (response.data.success) {
            /* if(procesar!=0){
              this.flagFijado=true
            } */
            this.flagFijado = true;
            this.cambioUnidadSinVisor = false;
            this.sizeSlideY =
              "display: inline-block; margin: 30px 0; height: 1150px;";
            this.rutaArchivoSticker =
              Constantes.filesRecupera + "/12/" + this.idTramite + "/0";
            this.xOriginal = parseInt(response.data.data.xOriginal);
            this.yOriginal = parseInt(response.data.data.yOriginal);
this.x=parseInt(response.data.data.x)
            this.y=parseInt(response.data.data.y)
            this.tamanoLetraVisor=response.data.data.tamanioLetra
            this.y = parseInt(response.data.data.y);
            let xOriginal = 0;
            let yOriginal = 0;
            xOriginal = this.xOriginal;
            yOriginal = this.yOriginal;
            /* if(this.xOriginal>this.yOriginal){
               xOriginal=this.yOriginal
               yOriginal=this.xOriginal 
            }else{
              xOriginal=this.xOriginal
              yOriginal=this.yOriginal
            } */
            this.xSuperior = xOriginal;
            this.ySuperior = yOriginal;
            if (xOriginal < 600) {
              this.xSuperior += 158;
              this.xInferior = -125;
            } else if (xOriginal < 900) {
              this.xSuperior += 58;
              //this.xInferior=-125
            }
            if (yOriginal < 900) {
              this.sizeSlideY =
                "display: inline-block; margin: 30px 0; height: 810px;";
              this.ySuperior += 45;
            }
            if (this.xOriginal > 1400) {
              this.xSuperior += 50;
            }
            if (this.yOriginal >= 2000) {
              this.sizeSlideY =
                "display: inline-block; margin: 30px 0; height: 1610px;";
              this.ySuperior += 45;
            }
            //this.x=response.data.data.x
            //this.y=response.data.data.y
            this.rotacion = response.data.data.rotacion;
            this.$swal.close();
            console.log("pintando x===>" + this.x);
            if (this.x == 0) {
              this.x = xOriginal;
            }
            if (this.y == 0) {
              this.y = yOriginal;
            }
          } else {
            this.$swal({
              icon: "info",
              title: "Aviso",
              text: "Favor inténtelo en unos minutos.",
            });
          }
        })
        .catch((e) => console.log(e));
    },
    interactSetPosition(coordinates) {
      const { x = 0, y = 0 } = coordinates;
      this.interactPosition = { x, y };
      //console.log(this.interactPosition);
    },
    resetCardPosition() {
      this.interactSetPosition({ x: 0, y: 0 });
    },
    moverSticker() {
      /* interact('.img-drawable')
        .draggable({
            // enable inertial throwing
            inertia: true,
            // keep the element within the area of it's parent
            modifiers: [
            interact.modifiers.restrictRect({
                restriction: 'parent',
                endOnly: true
            })
            ],
            // enable autoScroll
            autoScroll: true,

            listeners: {
            // call this function on every dragmove event
            move: this.dragMoveListener(),

            // call this function on every dragend event
            end (event) {
                var textEl = event.target.querySelector('p')

                //console.log(event.pageX+"-"+event.pageY);

                textEl && (textEl.textContent =
                'moved a distance of ' +
                (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
                            Math.pow(event.pageY - event.y0, 2) | 0))
                    .toFixed(2) + 'px')
            }
            }
        }) */
      //const element = this.$refs.interactElement
      //interact(element).draggable({
      interact(".img-drawable").draggable({
        onmove: (event) => {
          const x = this.interactPosition.x + event.dx;
          const y = this.interactPosition.y + event.dy;
          console.log("pintando x: " + x + ", pintando y: " + y);
          this.interactSetPosition({ x, y });
          this.dragMoveListener(event);
        },
        /* ,
        onend: () => {
          //this.resetCardPosition()
        } */
      });
    },
    dragMoveListener(event) {
      console.log("entró a dragmovelistener");
      var target = event.target;
      // keep the dragged position in the data-x/data-y attributes
      var x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
      var y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

      console.log(Math.trunc(x) + 100 + "-" + (Math.trunc(y) + 100));

      // translate the element
      target.style.webkitTransform = target.style.transform =
        "translate(" + x + "px, " + y + "px)";

      // update the posiion attributes
      target.setAttribute("data-x", x);
      target.setAttribute("data-y", y);
    },
    ObtenerNombreUnidadDestino() {
      console.log("entró a obtener nombre unidad destino");
      this.mapListaUnidadDestino.forEach((element) => {
        if (this.idUnidadDestino == element.value) {
          this.nombreUnidadDestino = element.text;
        }
      });
      console.log(this.idUnidadDestino);
      console.log(this.idUnidadAdministracionDocumentaria);
      console.log(
        this.idUnidadDestino == this.idUnidadAdministracionDocumentaria
      );
      if (this.idUnidadDestino == this.idUnidadAdministracionDocumentaria) {
        this.registradoPor = localStorage
          .getItem("cuenta")
          .replace("@miraflores.gob.pe", "")
          .replace(".", " ")
          .toUpperCase();
      } else {
        this.registradoPor = this.unidadAdministracionDocumentariaArchivo.toUpperCase();
      }
    },
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
                ? this.solicitante.toUpperCase()
                : element.desLoginUser
                    .toLowerCase()
                    .replace("@miraflores.gob.pe", "")
                    .replace(".", " ")
                    .toUpperCase();
            traza.fecha = element.fechaCreacion + " " + element.horaCreacion;
            traza.observacion = element.observacion;
            traza.unidadTramite =
              element.accion == "Cambio de unidad orgánica destino"
                ? this.unidadAdministracionDocumentariaArchivo.toUpperCase()
                : unidadOrigen == ""
                ? element.unidadTramite
                : unidadOrigen;
            unidadOrigen =
              element.accion == "Transferencia" ||
              element.accion == "Cambio de unidad orgánica destino" ||
              unidadOrigen == ""
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
        ObservacionModelo.veces = this.vecesObservadas + 1;
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
          if (this.listaObservaciones != null) {
            this.listaObservaciones.forEach((element) => {
              if (element.veces > this.vecesObservadas) {
                this.vecesObservadas = element.veces;
              }
            });
          }

          if (this.idEstado == 42) {
            if (this.vecesObservadas >= 5) {
              this.estiloDisplayObservar = "none";
            } else {
              this.estiloDisplayObservar = "";
            }
          }
        })
        .catch((e) => console.log(e));
    },
    validarObservacion() {
      console.log("entró a validar ob");
      var nuevoRegistro = false;
      this.listaObservaciones.forEach((element) => {
        if (element.fechaCreacion == undefined) nuevoRegistro = true;
      });
      console.log(nuevoRegistro);
      return nuevoRegistro;
    },
    Observar2() {
      //if(this.listaObservaciones==null || this.listaObservaciones.length==0){
      var validacion = this.validarObservacion();
      console.log("pintando validacion" + validacion);
      if (validacion == false) {
        this.$swal({
          icon: "error",
          title: "Error",
          text: "Debe escribir alguna observación.",
        });
      } else {
        this.$swal({
          title: "Seguro de Observar?",
          text: "Luego no podrá editar",
          icon: "info",
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
    RegularizarObservacion() {
      console.log("entró a regularizar obser");
      this.listaObservaciones.forEach((element) => {
        element.fechaCreacion = null;
      });
      console.log("saliendo de regularizar");
      console.log(this.listaObservaciones);
    },
    Observar() {
      console.log("entró a observar final");
      this.RegularizarObservacion();
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
      if (this.estiloDisplayUnidadOrganica == "none") {
        this.$swal({
          icon: "info",
          text: "Confirme o cancele la edición de la unidad destino",
        });
        return false;
      }
      if (!this.flagFijado) {
        this.$swal({
          icon: "info",
          text: "Debe visualizar el sticker a generar",
        });
        return false;
      }
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
            this.$bvModal.hide("aprobarModal");
            this.$swal({
              icon: "success",
              //text: "El trámite fue aprobado con éxito"
              text: response.data.message,
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
          console.log(response.data.data);
          this.usuarioTramite = response.data.data[0].usuarioTramite.usuario;
          this.tipoTramite = response.data.data[0].tipoTramite.nombre;
          this.idTramite = response.data.data[0].idTramite;
          this.solicitante = response.data.data[0].nombresSolicitante;
          this.usuarioCreador = response.data.data[0].usuarioCreador;
          this.estado = response.data.data[0].id011Estado.nombre;
          this.idEstado = response.data.data[0].id011Estado.idParametro;
          this.idUnidadDestinoOriginal = parseInt(
            response.data.data[0].unidadDestino.uniorgcod
          );
          this.idUnidadDestino = parseInt(
            response.data.data[0].unidadDestino.uniorgcod
          );
          this.idUnidadTramite = parseInt(
            response.data.data[0].unidadTramite.uniorgcod
          );
          if (response.data.data[0].id011Estado.idParametro == 22) {
            console.log("22");
            this.estiloDisplayAprobar = "none";
            this.estiloDisplayDesestimar = "none";
            this.estiloDisplayVer = "none";
            this.estiloDisplayObservar = "none";
          }
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
          console.log(this.listaRequisitoModelo);
          this.ListarObservaciones();
          this.CargarTrazabilidad();
          this.ObtenerNombreUnidadDestino();
          console.log(tramiteResponse.idArchivoPrincipalOracle);
          this.urlDocumentoPrincipal =
            `${Constantes.entidadArchivo}/8707/0/` +
            tramiteResponse.idArchivoPrincipalOracle;
        })
        .catch((e) => console.log(e));
    },
    obtenerAreas() {
      var ruta = Constantes.rutaTramite + "tramite-area/1";
      axios
        .get(ruta)
        .then((response) => {
          this.listaAreas = response.data;
          var i = 0;
          this.mapListaUnidadDestino = [];
          while (i < this.listaAreas.length) {
            var area = {};
            area.id = this.listaAreas[i].idArea;
            area.nombreArea = this.listaAreas[i].nombreArea;
            area.correoArea = this.listaAreas[i].correoArea;
            area.telefonoArea = this.listaAreas[i].telefonoArea;
            area.responsableArea = this.listaAreas[i].responsableArea;
            area.jefeArea = this.listaAreas[i].jefeArea;
            this.mapListaAreas.push(area);
            var unidadO = {};
            unidadO.value = this.listaAreas[i].idArea;
            unidadO.text = this.listaAreas[i].nombreArea;
            this.mapListaUnidadDestino.push(unidadO);
            i++;
          }
          this.totalRows = this.listaAreas.length;
          console.log("lista de  areas --->" + this.mapListaAreas);
          this.ObtenerNombreUnidadDestino();
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
          this.correoCoordinadorTransferir = this.mapListaAreas[
            index
          ].responsableArea;
        }
      }
      this.areaTransferir = areaEnvio;
      console.log("unidad a enviar ----> " + this.areaTransferir);
    },
    TransferirAprobar() {
      this.$swal({
        title: "Guardando",
        allowOutsideClick: false,
        onBeforeOpen: () => {
          this.$swal.showLoading();
        },
      });
      var ruta = Constantes.rutaTramite + "tramite-transferencia";
      var dataPost = new FormData();
      dataPost.append("idTramite", this.idTramite);
      dataPost.append("idUOrigen", this.idUnidadDestinoOriginal);
      dataPost.append("idUDestino", this.idUnidadDestino);
      dataPost.append("motivo", "Cambio pre aprobación");
      dataPost.append("usuarioReg", this.usuarioSesion);
      dataPost.append("aplicaNotificacion", 0);
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
              icon: "success",
              text: "Se realizó el cambio de unidad destino exitosamente",
            });
            this.estiloDisplayUnidadOrganica = "block";
            this.flagFijado = false;
            this.cambioUnidadSinVisor = true;
          } else {
            this.$swal({
              icon: "error",
              text: "Ha ocurrido un error en el registro.",
            });
          }
        })
        .catch((e) => console.log(e));
    },
    Transferir() {
      this.areaDestino();
      if (
        this.correoCoordinadorTransferir != null &&
        this.correoCoordinadorTransferir != ""
      ) {
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
              dataPost.append("aplicaNotificacion", 1);
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
      } else {
        this.$swal({
          icon: "error",
          text: "No tiene configurado el correo del coordinador destino.",
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
<style lang="scss" scoped>
  .btn__info{
    background-color: #d0ecf0;
    color: #17a2b8;
    border: 1px  solid #17a2b8;
  }
  .btn__info:hover{
    background-color: #17a2b8;
    color: #ffffff;
  }
</style>
<style lang="scss">
#firma {
  position: absolute;
  user-select: none;
  left: 100px;
  top: 100px;
  -webkit-transform: translate(0px, 0px);
  transform: translate(0px, 0px);
}
.img-drawable {
  touch-action: none;
}
.modal .modal-huge {
  max-width: 1200px;
  width: 1200px;
  max-height: 1200px;
  height: 1200px;
}
.modal-header h5{
  color: #0078cf;
}
.modal-backdrop {
  opacity: 0.5;
}
.card {
  h4 {
    color: #0078cf;
    font-weight: bold;
  }
}
.menu {
  .el-row {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }
  .el-col {
    label.right {
      width: 100%;
      text-align: right;
    }
  }
}
</style>