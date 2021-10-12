<template>
    <div class="content-wrapper">
        <loading :active.sync="isLoading" :is-full-page="true" color="#007BFF"></loading>
        <!--<titulo-header>Nueva Cita</titulo-header>-->
      <section class="content" style="padding-top: .5rem">
        <div class="row" style="padding-top: 0px">
          <div class="col-12" style="padding-top: 0px">           
            <div class="card-body" style="padding-top: 0px">
              <div class="col-md-10" style="margin: auto; margin-top: 5px; padding: 0px">
                <div class="card card-box-alt card-border-top border-first mb-5 pb-4">
                  <h3 class="font-size-lg font-weight-bold mt-3 mb-2 title-cita" v-if="guardarCita.tipoAtencion==1">REGISTRO DE ATENCION PRESENCIAL</h3>
                  <h3 class="font-size-lg font-weight-bold mt-3 mb-2 title-cita" v-else-if="guardarCita.tipoAtencion==2">REGISTRO DE ATENCION VIRTUAL</h3>
                  <div class="row col-md-11" style="padding-left:10px; margin: auto; margin-top:.5rem; padding-top: 9.5 rem;"> 
                  </div>
                </div>
              </div>
              <div class="card card-box mb-5 col-10" style="margin: auto; ">
                <div class="card-header bg-primary">
                  <div class="card-header--title font-weight-bold font-size-xl">Datos de Atención</div>
                </div>
                <div class="card-body">
                  <div class="tab-content p-3 pb-0 example-box">
                    <div class="row col-12">
                      <div class="row col-11" style="margin: auto">
                        <h2 class="col-4"><b>TIPO DE ATENCIÓN : </b></h2>
                        <div class="form-check col-4">
                          <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="1" @change="limpiarCampos()" v-model="guardarCita.tipoAtencion" checked>
                          <label class="form-check-label" style="margin: auto" for="exampleRadios1"><b>PRESENCIAL</b></label>
                        </div>
                        <div class="form-check col-4">
                          <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="2" @change="limpiarCampos()" v-model="guardarCita.tipoAtencion">
                          <label class="form-check-label" style="margin: auto" for="exampleRadios2"><b>VIRTUAL</b></label>
                        </div>
                      </div>
                      <div class="row col-11 mt-1" style="margin: auto;">
                        <label id="" class="col-sm-4 col-form-label"  >Área Orgánica: </label>
                        <div class="col-sm-8" style="padding-left: 3px; padding-right: 0px"> 
                          <div class="form-group" >
                            <el-select id="ddlArea" @change="getMotivos(guardarCita.areaBuscar)" v-model="guardarCita.areaBuscar">
                              <el-option v-for="area of listaAreas" :key="area.idArea" :value="area.idArea" :label="area.descripcion"></el-option>
                            </el-select>
                          </div>
                        </div>
                      </div>
                      <template v-if="listaMotivos != null">
                        <div class="row col-11 mt-1" style="margin: auto; ">
                          <label id="" class="col-sm-4 col-form-label" >Tipo de Tramite: </label>
                          <div class="col-sm-8" style="padding-left: 3px; padding-right: 0px"> 
                            <el-select id="ddlArea" @change="getHorasDisponibles()" v-model="guardarCita.idSubMotivo">
                              <el-option v-for="(item, motivo) of listaMotivos" :key="'motivo'+motivo" :value="item.idSubMotivo" :label="item.descripcion"></el-option>
                            </el-select>
                          </div>
                        </div>
                      </template>
                      <template v-if="(areaSeleccionada !=null && areaSeleccionada.id003Turnos==8) && (motivoSeleccionado != null && motivoSeleccionado.idSubMotivo == 3)">
                        <div class="row col-11 mt-1" style="margin: auto;">
                          <label id="" class="col-sm-4 col-form-label">Duración: </label>
                          <div class="col-sm-8" style="padding-left: 3px; padding-right: 0px"> 
                            <template>
                              <el-select v-model="guardarCita.nroTurnos" @change="getHorasDisponibles()" placeholder="Selecciones el número de turnos">
                                <el-option :label="'1 Turno'"  :value="1"></el-option>
                                <el-option :label="'2 Turnos'" :value="2"></el-option>
                                <el-option :label="'3 Turnos'" :value="3"></el-option>
                                <el-option :label="'4 Turnos'" :value="4"></el-option>
                              </el-select>
                            </template>
                          </div>
                        </div>
                      </template>
                      <div class="row col-11" style="margin: auto; margin-top: 1.0rem">
                        <!-- <calendar-customize/> -->
                      
                      <div class="calendar-customize">
                        <div class="calendar-customize-left">
                          <div class="form-group">
                            <label for="fechaAtencion">Fecha de atención</label>
                            <input type="text" class="form-control form-control-date" id="fechaAtencion" v-model="labelPicker" readonly>
                            <datepicker :inline="true"  :format="customFormatCal" :language="es" v-model="fechaDatePicker" :disabled-dates="fecha2"
                                        :disabledDates="listaDiasCalendario"
                                        @selected="fechaSeleccionada"></datepicker>
                                        <!--disabledDates="{to: new Date , days:[6,3,1,2],daysOfMonth: [25]}"-->
                          </div>
                        </div>
                        <div class="calendar-customize-right">
                          <div class="calendar-customize-right-content" v-if="listaHorarioAM != null">
                            <ul class="calendar-times" >
                              <li class="calendar-times-title">
                                <label><b>Turno mañana</b></label>
                              </li>
                              <li class="calendar-times-list">
                                <ul class="list-inline" >
                                  <li class="list-inline-item" v-for="item of listaHorarioAM" :key="item.hora">
                                    <div class="radio" v-if="item.estado" style="margin-right: 5px">
                                      <label><input type="radio" v-model="horaReserva" name="optradio" :value="item.hora">{{item.hora}}</label>
                                    </div>
                                  </li>
                                </ul>
                              </li>
                            </ul>
                            <ul class="calendar-times">
                              <li class="calendar-times-title">
                                <label><b>Turno tarde</b></label>
                              </li>
                              <li class="calendar-times-list">
                                <ul class="list-inline">
                                  <li class="list-inline-item" v-for="item of listaHorarioPM" :key=item.hora>
                                    <div class="radio" v-if="item.estado" style="margin-right: 5px">
                                      <label><input type="radio" v-model="horaReserva" name="optradio" :value="item.hora">{{item.hora}}</label>
                                    </div>
                                  </li>
                                </ul>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      </div>
                      <template>
                        <div class="row col-md-11" style="margin: auto;">
                          <label class="col-2" for="motivo" style=";">Motivo : </label>
                          <textarea class="col-10 form-control" style="max-width:100%; margin-bottom: .5rem" id="motivo" maxlength="300" rows="4" v-model="motivo" ></textarea>
                          <span class="text-right col-md-12" for="motivo" >TE QUEDA {{cuentaCaracteres(motivo)}} CARACTERES</span>
                        </div>
                      </template>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card card-box col-10" style="margin: auto; margin-top: 20px">
                <div class="card-header bg-primary">
                    <div class="card-header--title font-weight-bold font-size-xl">Identificacion de Usuario</div>
                </div>
                <div class="card-body">
                  <div class="tab-content p-3 pb-0 example-box">
                    <div class="row col-12">
                      <div class="row col-md-11" style="padding-left:10px; margin: auto; margin-top:.5rem;">
                        <div class="row col-12" style="margin: auto; padding: 0px">
                          <label class="col-md-2 text-nowrap" for="datos" style=";  margin:auto; margin-left: auto;">Administrado :</label>
                          <input class="form-control col-md-3" id="nombre" maxlength="40" style="margin: auto;" placeholder="NOMBRE" v-model="nombre" @keypress="soloLetras">
                          <input class="form-control col-md-3" id="apePaterno" maxlength="40" style="margin: auto;" placeholder="APELLIDO PATERNO" v-model="apellidoPat" @keypress="soloLetras">
                          <input class="form-control col-md-3" id="apeMaterno" maxlength="40" style="margin: auto; margin-right: 0px; padding-right: 0px" placeholder="APELLIDO MATERNO" v-model="apellidoMat" @keypress="soloLetras">
                        </div>
                        <div class="row col-12" style="margin: auto; margin-top: 1.0rem; padding: 0px">
                          <label for="exampleInputPassword1" class="col-sm-2 col-form-label" style="; margin: auto;">Tipo de Documento:</label>
                          <select id="ddlTipoDocumento" class="input-control col-sm-3" style=" margin:auto;" v-model="tipoDocumento">
                            <option value="DNI">DNI</option>
                            <option value="CE">CARNET DE EXTRANJERÍA</option>
                            <option value="PAS">PASAPORTE</option>
                          </select>
                          <label class="col-2" for="dni" style="padding-left:0px; margin:auto; text-align: right;">Nro de Documento:</label>
                          <input class="form-control col-4" id="dni" maxlength="15" style="margin: auto; margin-right: 0px;" placeholder="INGRESE DOCUMENTO" v-model="dni" @keydown="validarDni" @keypress="soloNumeros">
                        </div>
                        <div class="row col-12" style="margin: auto; margin-top: 1.0rem; padding: 0px">
                          <label class="col-2" for="telefono" style="margin:auto;">Télefono :</label>
                          <input class="form-control col-3" id="telefono" style="margin: auto;" placeholder="INGRESE TELEFONO" v-model="telefono" @keydown="validarTelefono" @keypress="soloNumeros">
                          <label class="col-sm-2 col-form-label" for="correo" style="text-align: right; margin:auto;">Correo :</label>
                          <input class="form-control col-4" id="correo" style="margin: auto; margin-right: 0px;" placeholder="INGRESE CORREO" v-model="correo">
                        </div>
                        <div class="row col-12" style="margin: auto; margin-top: 1.0rem; padding: 0px">
                          <label class="col-2 col-form-label" for="direccion" style="text-align: left; margin:auto;">Dirección :</label>
                          <input class="form-control col-10" id="direccion" style="margin: auto; margin-right: 0px; max-width: 80%" placeholder="INGRESE DIRECCION" v-model="direccion">                        
                        </div>
                        <div class="row col-12" style="margin: auto; margin-top: 1.0rem; padding: 0px">
                          <div class="col-8"/>
                          <el-button type="primary" class="" style="text-align: right; margin: auto; margin-right: 0px" v-on:click="comprobarCampos()">GUARDAR </el-button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="card-footer bg-secondary p-2">
                  <label style="color: white;">Av. Larco 400 - Miraflores - Lima  © 2016 - Municipalidad de Miraflores</label>
                </div>
              </div>
            </div>
          </div>   
              <!--</div>
            </div>-->
        </div>
      </section>
    </div>
</template>

<script>
import TituloHeader from '../comun/TituloHeader'
import Constantes from '../../store/constantes'
import axios from 'axios';
import Paginator from '../comun/Paginator'
import CalendarCustomize from '../citas/CalendarCustomize'
import Datepicker from 'vuejs-datepicker'
import {SweetModal} from 'sweet-modal-vue'
import { es } from 'vuejs-datepicker/dist/locale'

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import moment from "moment";
/* ESTILOS PERSONALIZADOS */ 
import styloCita from "../../assets/scss/style-nuevacita.scss";

export default {
  components:{
    TituloHeader,
    Paginator,
    SweetModal,
    Loading,
    Datepicker,
    CalendarCustomize
  },
  data(){
    return {
      //TODO?: ANIMACIONES DE FORMULARIO 
      horariosVisible: 'none',

      //TODO: TIPO DE CITA
      tipoDocumento: 'DNI',
      date: new Date,
      telefono: '',
      fechaDatePicker: new Date,
      labelPicker: moment(new Date).format('YYYY-MM-DD'),
      fechaSuma: (new Date).getDate() - 1,

      //TODO: LISTA DE HORARO
      listaHorarioAM: null,
      listaHorarioPM: null,
      listaDiasCalendario: null,
      listaFeriados: [],
      duracion: 1,

      //TODO!: DATOS DE CITA
      telefonoTmp: '',
      telefonoTmp2: '',
      nombre: '',
      apellidoPat: '',
      apellidoMat: '',
      nroDocumento: '',
      dni: '',
      correo: '',
      telefono: '',
      direccion:'',
      horaReserva: '',
      fecha: new Date,
      motivo: '',
      fechaDatePicker: new Date,
      fecha2: {
        to: new Date
      },
      options2: [{ text: 'Presencial', value2: 'PRESENCIAL' },{ text: 'Virtual', value2: 'VIRTUAL' }],
      query:{
        nombres:"",
        usuario:"",
        documento:""
      },
      listaAreas: null,
      reporteUsuarios: null,
      mostrarAsociados: false,
      contribuyentesAsociados: [],
      paginaActual: 1,
      totalPaginas:0,
      usuarioSeleccionado: {},
      isLoading: true,
      es: es,
      guardarCita: {
        areaBuscar: localStorage.getItem("codUnidadCitas") * 1,
        nroTurnos: 1,
        tipoAtencion: 1,
      },
      filtros: {
        idArea: null,
      },
      listaMotivos: null,
      motivoSeleccionado: null, 
      areaSeleccionada: null,
    }
  },
  created(){
    this.obtenerFeriados();
    this.dashabilitarDiasCalendario([1,2,3,4,5,6,0]);
    this.getAreas();
    this.getMotivos(this.guardarCita.areaBuscar);
    console.log("FECHA RESTADA:")
    console.log(this.fechaSuma)
    let storage = localStorage.getItem("Busqueda-usuarios-plataforma");
    if(storage!=null){
      let dataLocalStorage = JSON.parse(storage);
      this.query = dataLocalStorage;
    }
    this.date = moment(this.date).format('DD-MM-YYYY');
  },
  methods:{
    async getMotivos(value){
      if(this.listaAreas!=null)
        this.areaSeleccionada = this.listaAreas.find(element=>{return element.idArea == this.guardarCita.areaBuscar})
      
      this.horaReserva = ""
      const url = Constantes.rutacitas + 'get-motivo'
      console.log(url +"/"+ value)
      this.guardarCita.idSubMotivo=null;
      this.filtros.idArea= value
      this.filtros.tipoAtencion= this.guardarCita.tipoAtencion;
      let data = null
      await axios.get(url, {params: this.filtros}).then(response =>{
        data = response.data.data
      }).catch((e) => {
        console.log(e)
      });
      console.log("lista de Motivos")
      console.log(data)
      
      if(data.length>0){
        let array=[]
        data.forEach(item =>{
          item.listSubMotivo.forEach(element => {
            element.idMotivo = item.idMotivo
            element.frecuencia = item.frecuencia
            array.push(element)
          });
        })
        this.listaHorarioAM = null;
        this.dashabilitarDiasCalendario([1,2,3,4,5,6,0]);
        this.listaMotivos = array;
        this.areaSeleccionada = this.listaAreas.find(element=>{return element.idArea == this.guardarCita.areaBuscar})
      }else {
        this.listaMotivos = null;
      }
      if(this.listaMotivos==null)this.obtenerCalendario();
      console.log(this.listaMotivos)
    },
    dashabilitarDiasCalendario(array){
      
      var object = new Object()
      var fecha = new Date
      var fechafrom = new Date
      fecha.setDate(fecha.getDate() - 1)
      object.to = fecha
      object.days = array
      fechafrom.setDate(fechafrom.getDate() + 30)
      object.from = fechafrom
      // object.daysOfMonth = [25]
      object.dates = this.listaFeriados
      this.listaDiasCalendario = object
      console.log(this.listaDiasCalendario)
      console.log("LISTA DIAS DESAHIBILITADOS")
    },
    getHorasDisponibles(){
      if(this.listaMotivos!=null)this.motivoSeleccionado = this.listaMotivos.find(element=>{return element.idSubMotivo == this.guardarCita.idSubMotivo});
      this.obtenerCalendario();
    },
    nuevaCita(){
      if(this.listaAreas!=null)
        this.areaSeleccionada = this.listaAreas.find(element=>{return element.idArea == this.guardarCita.areaBuscar})
      var url = Constantes.rutacitas+"nuevaCita"
      var datosCita = {};
      datosCita.nombre = this.nombre.toUpperCase();
      datosCita.apePaterno = this.apellidoPat.toUpperCase();
      datosCita.apeMaterno = this.apellidoMat.toUpperCase();
      datosCita.dni = this.dni
      datosCita.tipoDocumento = this.tipoDocumento.toUpperCase();
      datosCita.correo = this.correo.toUpperCase();
      datosCita.telefono = this.telefono
      datosCita.direccon = this.direccion.toUpperCase();
      // datosCita.motivo = (this.listaMotivos==null)? this.motivo.toUpperCase(): this.motivoSeleccionado.descripcion;
      datosCita.motivo = this.motivo.toUpperCase();
      datosCita.dia = "DIADIA"//this.telefono
      datosCita.fecha =  moment(this.fechaDatePicker).format('YYYY-MM-DD')//this.telefono
      datosCita.hora = this.horaReserva//this.telefono
      datosCita.fechaRegistro = moment(this.fecha).format('YYYY-MM-DD HH:mm:ss')
      datosCita.indTipoAtencion = this.guardarCita.tipoAtencion 
      datosCita.idArea = this.guardarCita.areaBuscar
      datosCita.idUserReg = localStorage.getItem('idUsuarioLogueado')
      datosCita.nombreFuncionario = localStorage.getItem('nombreCompletoLogueado').toUpperCase();
      datosCita.idSubMotivo = (this.listaMotivos==null)? null:this.motivoSeleccionado.idSubMotivo,
      datosCita.frecuencia = (this.listaMotivos==null) ? this.guardarCita.frecuencia : this.motivoSeleccionado.frecuencia;
      datosCita.tiempoCita = ((this.guardarCita.nroTurnos-1) * datosCita.frecuencia)
      datosCita.abreviatura = this.areaSeleccionada.abreviatura;
      datosCita.plataforma = 2;
      datosCita.descripcionArea = this.areaSeleccionada.descripcion;
      datosCita.ubicacion = this.areaSeleccionada.ubicacion;
      console.log(datosCita)
      console.log("Objeto Cita")

      axios.post(url, datosCita).then((response) => {
        var respuesta = response.data.estado;
        var estado = response.data.estado;
        console.log("respuesta insert");
        console.log(respuesta);
        if(respuesta){
          this.Alerta('success','Registro exitoso.','');
          this.isLoading=false
          this.limpiarCampos()
          this.limpiarFormulario()
        }
        else this.Alerta('error','Error al registrar Cita', response.data.error);
      }).catch(e=>this.Alerta('error','Error al registrar Cita','Por favor comuniquese con GSTI'));
    },
    getAreas(){
      this.listaAreas = null
      var url = Constantes.rutacitas+'dbAreas/'+this.guardarCita.tipoAtencion
      axios.get(url).then(response=>{
        console.log('examinando listaTipoAtencion');
        this.listaAreas=response.data.data; 
        this.guardarCita.areaBuscar = (this.listaAreas.find(item => item.idArea === this.guardarCita.areaBuscar)!=undefined)? this.guardarCita.areaBuscar : this.listaAreas[0].idArea
        console.log(this.listaAreas);
        this.isLoading=false;
      }).catch(e=>this.Alerta('error','Error al cargar Areas','Comuniquese con GSTI'))
    },
    obtenerCalendario(){
      this.listaHorarioAM = null;
      var url = Constantes.rutacitas+'obtener-calendario'
      // const url = Constantes.rutacitas+'obtenerhorarios'
      let objetoMotivo = null;
      if(this.listaMotivos!=null)objetoMotivo = this.listaMotivos.find(element=>{return element.idSubMotivo == this.guardarCita.idSubMotivo});
      console.log("objeto calendario")
      console.log(objetoMotivo);
      let idArea = this.guardarCita.areaBuscar, tipoAtencion = this.guardarCita.tipoAtencion,
      idMotivo= (this.listaMotivos==null)? null:objetoMotivo.idMotivo;
      axios.get(url, {params: {idArea, tipoAtencion, idMotivo}}).then(response=>{
        var respuesta = response.data.respuesta;
        console.log(response)
        if(!respuesta)this.Alerta('error','Error al cargar calendario','Comuniquese con GSTI')
        var lista = response.data.lista;
        var array = [1,2,3,4,5,6,0]
        for(var list of lista){
          var dia =  list.dia
          switch(dia){
            case 'LUNES':
              var i = array.indexOf( 1 );
              if ( i !== -1 )array.splice( i, 1 )
              break;
            case 'MARTES':
              var i = array.indexOf( 2 );
              if ( i !== -1 )array.splice( i, 1 )
              break;
            case 'MIERCOLES':
              var i = array.indexOf( 3 );
              if ( i !== -1 )array.splice( i, 1 )
              break;
            case 'JUEVES':
              var i = array.indexOf( 4 );
              if ( i !== -1 )array.splice( i, 1 )
              break;
            case 'VIERNES':
              var i = array.indexOf( 5 );
              if ( i !== -1 )array.splice( i, 1 )
              break;
            case 'SABADO':
              var i = array.indexOf( 6 );
              if ( i !== -1 )array.splice( i, 1 )
              break;
            case 'DOMINGO':
              var i = array.indexOf( 0 );
              if ( i !== -1 )array.splice( i, 1 )
              break;
          }
        }
        this.dashabilitarDiasCalendario(array)
        console.log(array);
        console.log(lista);
        this.fechaSeleccionada();
      }).catch(e=>{
        this.Alerta('error','Error al cargar calendario','Comuniquese con GSTI');
        console.log(e);
        })
    },
    fechaSeleccionada: function() {
      this.$nextTick(() => {
        console.log("FN : "+this.fechaDatePicker)
        console.log('Una fecha ha sido seleccionada');
        this.horaReserva = "";
        this.labelPicker = moment(this.fechaDatePicker).format('YYYY-MM-DD')//YYYY-MM-DD
        console.log("LABEL "+this.labelPicker)
      console.log(Datepicker.value);
        this.obtenerHora()
        }
      )
    },
    async obtenerHora(){
      const url = Constantes.rutacitas+"obtener-horas";
      let objetoMotivo = null;
      if(this.listaMotivos!=null)objetoMotivo = this.listaMotivos.find(element=>{return element.idSubMotivo == this.guardarCita.idSubMotivo});
      console.log("objeto")
      console.log(objetoMotivo);
      let horarios = {
        idArea: this.guardarCita.areaBuscar,
        tipoAtencion: this.guardarCita.tipoAtencion,
        idSubMotivo:(this.listaMotivos==null)? null:objetoMotivo.idSubMotivo,//falta motivo
        tiempoCita: (this.listaMotivos==null)? 30:(objetoMotivo.frecuencia*this.guardarCita.nroTurnos),
        frecuencia:(this.listaMotivos==null)? 30:objetoMotivo.frecuencia,
        idMotivo: (this.listaMotivos==null)? null:objetoMotivo.idMotivo,
        descripcionMotivo: (this.listaMotivos==null)? this.descripcion:objetoMotivo.descripcion,
        fecha: this.labelPicker,
      }
      console.log(url)
      console.log(horarios)
      let endPoint = null;
      await axios.post(url, horarios).then(response=>{
        endPoint = response
        if(response.status!=200)this.Alerta('error','Error '+response.status+' al cargar Horarios','Comuniquese con GSTI')
      }).catch(e=>this.Alerta('error','Error al cargar Horarios','Comuniquese con GSTI'))
      console.log("respuesta endPoint")
      console.log(endPoint)
      let lista = endPoint.data.lista;
        var horaActual = moment(new Date).format('HH:mm:ss');
        var fechaConsulta = this.labelPicker
        var fechaActual = moment(new Date).format('YYYY-MM-DD')
        var atencion = lista.atencion
        console.log("LISTA DE HORAS")
        console.log(lista)
        
        this.guardarCita.frecuencia = lista[0].frecuencia
        var am = [], pm = [];
          lista[0].atencion.forEach(element => {
            var objeto = new Object()
            if('12:30:00' >= element.hora){
              if((horaActual >= element.hora)&&(fechaActual== fechaConsulta))objeto.estado =  0
              else objeto.estado =  element.estado
              objeto.hora =  element.hora
              // console.log("MANANA")
              am.push(objeto)
            }else{
              if((horaActual >= element.hora)&&(fechaActual== fechaConsulta))objeto.estado =  0
              else objeto.estado =  element.estado
              objeto.hora =  element.hora
              pm.push(objeto)
              // console.log("TARDE")
            }
          });
        this.listaHorarioAM = am
        this.listaHorarioPM = pm
    },
    obtenerFeriados(){
      var fecha = new Date
      
      var url = Constantes.rutacitas+'obtenerferiados/'+fecha.getFullYear()
      let mes = fecha.getMonth(), ano = fecha.getFullYear();
      axios.get(url, {params: {mes} }).then(response=>{
        console.log('examinando listaTipoAtencion');
        var estado=response.data.respuesta;
        
        var lista = response.data.lista;
        if(!estado)this.Alerta('error','Error al cargar Feriados','Comuniquese con GSTI');
        this.listaFeriados=[]
        lista.forEach(element => {
          this.listaFeriados.push(new Date(element.dgsano,(element.dgsmes-1),element.dgsdia ))
        });
        console.log("LISTA DE FERIADOS")
        console.log(this.listaFeriados)
        this.dashabilitarDiasCalendario([1,2,3,4,5,6,0]);
      }).catch(e=>this.Alerta('error','Error al cargar Feriados','Comuniquese con GSTI'))
    },
    duracionMinutos(duracion){
      switch (duracion) {
        case 2:
          duracion = 60;
          break;
        case 3:
          duracion = 90;
          break;
        default:
          duracion = 30;
          break;
      }
      return duracion;
    },
    Alerta(icon, title, text){
      this.isLoading=false;
      this.$swal({
        customClass: {
          container: 'my-swal'
        },
        icon: icon,
        title: title,
        text: text                
      });
    }, 
    async limpiarCampos(){
      await this.getAreas()
      console.log('LIMPIANDO CAMPOS');
      console.log(this.guardarCita.tipoAtencion);
      this.dashabilitarDiasCalendario([1,2,3,4,5,6,0]);
      this.guardarCita.areaBuscar = localStorage.getItem("codUnidadCitas")*1;
      this.horaReserva = ""
      this.listaHorarioAM = null;
      this.listaMotivos = null;
      this.motivoSeleccionado = null;
      await this.getMotivos(this.guardarCita.areaBuscar);
      if(this.listaMotivos==null)this.getHorasDisponibles();
    },
    limpiarFormulario(){
      this.nombre = ''
      this.apellidoPat=''
      this.apellidoMat=''
      this.dni=''
      this.tipoDocumento= 'DNI'
      this.dni= ''
      this.correo= ''
      this.telefono= ''
      this.direccion=''
      this.motivo=''
    },
    cuentaCaracteres(motivo) {
      var limite = 300;
      limite = limite - motivo.length 
			return limite;
    },
    soloLetras: function(event) {
      var key = window.event ? event.which : event.keyCode;
      if(key == 8 || key == 165 || key== 164|| key==32 || key==241 || key ==209){
      }else if(key > 90 && key < 97)event.preventDefault();
      else if (key < 65 || key > 122)event.preventDefault();
    },
    soloNumeros: function(event){
      // if(this.telefono.length>15)event.preventDefault();
      // else if(this.dni.length>15)event.preventDefault();
      var key = window.event ? event.which : event.keyCode;
      if(key == 8){
      }else if (key < 48 || key > 57) {
        event.preventDefault();
      }
    },
    validarDni: function(event){
      var key = window.event ? event.which : event.keyCode;
      if(key == 8|| key ==9 || (key >=37 && key<=40)){
      }else if(this.tipoDocumento=='DNI'){
        if(this.dni.length>=8)event.preventDefault()
      }else if(this.tipoDocumento=='CE'){
        if(this.dni.length>=9)event.preventDefault();
      }else if(this.tipoDocumento=='PAS'){
        if(this.dni.length>=13)event.preventDefault();
      }
    },
    validarTelefono: function(event){
      var key = window.event ? event.which : event.keyCode;
      if(key == 8){
      }else if(this.telefono.length>=9)event.preventDefault();
    },
    customFormatCal(date) {
      return moment(date).format('MMMM Do YYYY, h:mm:ss a');
    },
    valorRemovido(){
      console.log("Borrado de fecha")
      this.fechaDatePicker = ' '
    },
    comprobarCampos(){
      console.log("========================CONDICIONALES========================")
      console.log(this.horaReserva)
      if(this.nombre.length<2){
        return this.Alerta('info','Aviso','Ingrese nombre del administrado')
      }else if(this.horaReserva.length< 2){
        return this.Alerta('info','Aviso','Seleccione hora de reserva')
      }else if(this.apellidoPat.length< 2){
        return this.Alerta('info','Aviso','Ingrese apellido paterno')
      }else if(this.apellidoMat.length< 2){
        return this.Alerta('info','Aviso','Ingrese apellido materno')
      }else if(this.dni.length< 8 && this.tipoDocumento=='DNI'){
        return this.Alerta('info','Aviso','Ingrese numero de documento')
      }else if(this.dni.length< 9 && this.tipoDocumento=='CE'){
        return this.Alerta('info','Aviso','Ingrese numero de documento')
      }else if(this.dni.length< 13 && this.tipoDocumento=='PAS'){
        return this.Alerta('info','Aviso','Ingrese numero de documento')
      }else if(this.correo.length< 2){
        return this.Alerta('info','Aviso','Ingrese correo electronico')
      }else if (!(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(this.correo))) {
				return this.Alerta('info','Aviso','Corriga el campo de correo porfavor')
			}else if(this.telefono.length< 2){
        return this.Alerta('info','Aviso','Ingrese numero de telefono')
      }else if((this.listaMotivos!=null)&&(this.guardarCita.idSubMotivo==null)){
        return this.Alerta('info','Aviso','Seleccione el Tipo de Tramite')
      }else if((this.listaMotivos!=null)&&(this.motivo.length< 2)||(this.listaMotivos==null)&&(this.motivo.length< 2)){
        return this.Alerta('info','Aviso','Ingrese motivo de cita')
      }else{
        this.isLoading=true
        this.nuevaCita()
      }
    },
  }
}
</script>

