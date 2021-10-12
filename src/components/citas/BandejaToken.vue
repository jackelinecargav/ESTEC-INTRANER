<template>
  <div class="content-wrapper">
    <loading :active.sync="isLoading" :is-full-page="true" color="#007BFF"></loading>
    <titulo-header>Bandeja de Código de Atención</titulo-header>
    <section class="content" style=" margin: 0 .1rem;">
      <el-row :gutter="10">
        <div class="card menu">
            <el-row :gutter="10">
              <el-col :md="3">
                <label class="col-form-label">Unidad Orgánica:</label>
              </el-col>                 
              <el-col :md="7">
                <!-- <label disabled = true class="form-control" style="background-color: #e9ecef">{{areaSesion}}</label> -->
                  <el-select v-model="idArea" filterable>
                    <el-option v-for="area of listaAreas" :key="'area '+area.idArea" :value="area.idArea" :label="area.descripcion"></el-option>
                  </el-select>
              </el-col>
              <el-col :md="3">
              <label class="col-form-label font">Documento: </label>                    
              </el-col>
              <el-col :md="7">
                <el-input placeholder="Ingrese Documento" @keypress.native="soloNumeros" v-model="dniEscribir"/> 
              </el-col>
            </el-row>
            <el-row :gutter="10" class="my-2">
              <el-col :md="3">
                <label class="col-form-label font">Fecha: </label>
              </el-col>   
              <el-col :md="7" class="datePickCustomize">
                <datepicker :bootstrap-styling="false" :language="es" input-class="datepicker text-center btn-block" :open-date="date" 
                      name="calendarioCitas" :format="customFormatCal" v-model="appointment.appointmet_date" @opened="datepickerAbierto" 
                      @selected="fechaSeleccionada" @closed="datepickerCerrado">
                </datepicker>                                                     
              </el-col>
              <el-col :md="6"/>
              <el-col :md="4">
                  <el-button v-on:click="tokensJson=null; validarDniBuscar() " class="btn-block" type="primary">Buscar</el-button>
              </el-col>
              <el-col :md="4">
                  <el-button v-on:click="nuevoToken();showModal=true;" class="btn-block" type="primary">Nuevo</el-button>
              </el-col>
            </el-row>
        </div>           
        <div class="card menu d-none d-sm-block">
          <table id="example2" class="table  table-hover table-sm mb-0">
            <thead>
              <tr >
                <th class="font" width="8%">Cód. Atención</th>
                <th class="font" width="15%">Fecha</th>
                <th class="font" width="12%">Documento</th>
                <th class="font" width="35%">Motivo</th>
                <th class="font" width="23%">Funcionario</th>
                <th width="7%">Estado</th>           
              </tr>
            </thead>
            <tbody>
              <tr class="manito" v-for="token of tokensJson" :key=token.pkTablaToken v-on:click="
              AbrirModal(token.idToken,token.tipoDocumento, token.dni, token.nombres, token.apePaterno,
                token.apeMaterno, token.motivo, token.usuario, token.area, token.tipoAtencion, token)">
                <td class="font" >{{token.idToken}}</td>
                <td class="font" >{{token.fecha}}</td>
                <td class="font" >{{token.dni}}</td>
                <td class="font" >{{token.motivo}}</td>
                <td class="font" >{{token.usuario}}</td> 
                <td class="font" v-if="token.status == 0">Creado</td>
                <td class="font" v-else-if="token.status != 0">Usado</td>
              </tr>
            </tbody>
          </table>
        </div>
      </el-row>
      <template v-if="showModal">
        <el-dialog class="modalToken" :title=tituloModal :visible.sync="showModal" :before-close="cerrarModal">
          <template>
          <el-row :gutter="10">
            <el-row :gutter="10">
              <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6"><b>TIPO DE ATENCIÓN: </b></el-col>
              <el-col :xs="24" :sm="24" :md="24" :lg="18" :xl="18" class="d-flex align-content-center">
                <el-radio-group :disabled=isDisabledNega @change="limpiarCampos()" v-model="tipoAtencion">
                  <el-radio :label="1"><b>PRESENCIAL</b></el-radio>
                  <el-radio :label="2"><b>VIRTUAL</b></el-radio>
                </el-radio-group>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6"><label class="col-form-label font" >Unidad Orgánica: </label></el-col>
              <el-col :xs="24" :sm="24" :md="24" :lg="18" :xl="18"><template>
                <el-select :disabled=isDisabledNega @change="getMotivos(idArea)" v-model="idArea" placeholder="Seleccione Unidad Orgánica" filterable>
                  <el-option
                    v-for="item of listaAreas" :key="item.idArea"
                    :label="item.descripcion" :value="item.idArea">
                  </el-option>
                </el-select></template>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6"><template>
                <el-select :disabled=isDisabledNega class="tamaño" v-model="tipoDocumento" placeholder="Seleccione T. Documento">
                  <el-option
                    v-for="item of listDocumento" :key="item.value"
                    :label="item.label" :value="item.value">
                  </el-option>
                </el-select></template>
              </el-col>
              <el-col :xs="24" :sm="24" :md="24" :lg="18" :xl="18">
                <el-input :disabled=isDisabledNega placeholder="NRO. DOCUMENTO" @keydown.native="validarDni" @keypress.native="soloNumeros" v-model="dniModal" clearable></el-input>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6"><label class="col-form-label font" >Administrado: </label></el-col>
              <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
                <el-input placeholder="NOMBRES"    :disabled=isDisabledNega @keypress.native="soloLetras" v-model="nombre" clearable></el-input>
              </el-col>
              <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
                <el-input placeholder="A. PATERNO" :disabled=isDisabledNega @keypress.native="soloLetras" v-model="apePaterno" clearable></el-input>
              </el-col>
              <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
                <el-input placeholder="A. MATERNO" :disabled=isDisabledNega @keypress.native="soloLetras" v-model="apeMaterno" clearable></el-input>
              </el-col>
            </el-row>
            <el-row :gutter="10" v-if="listaMotivos != null">
              <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6"><label class="col-form-label font" >Tipo de Tramite: </label></el-col>
              <el-col  :xs="24" :sm="24" :md="24" :lg="18" :xl="18">
                <el-select v-model="token.idSubMotivo" :disabled=isDisabledNega placeholder="Seleccione" no-data-text="Sin Datos" @change="cambiarMotivo()">
                  <el-option v-for="motivos of listaMotivos" :key="motivos.idSubMotivo" :value="motivos.idSubMotivo" :label="motivos.descripcion"></el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6"><label class="col-form-label font" >Motivo: </label></el-col>
              <el-col  :xs="24" :sm="24" :md="24" :lg="18" :xl="18">
                <template>
                  <el-input :disabled=isDisabledNega type="textarea" :autosize="{minRows: 2, maxRows: 7}" placeholder="DESCRIBIR EL MOTIVO DE CITA" v-model="descripcionModal"></el-input>
                </template>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <!--<template v-if="areaSeleccionada!= null && motivoSeleccionado != null && areaSeleccionada.id003Turnos == 8 && motivoSeleccionado.id003Turnos == 8">-->
              <template v-if="(areaSeleccionada !=null && areaSeleccionada.id003Turnos==8) && (motivoSeleccionado != null && motivoSeleccionado.idSubMotivo == 3)">
                <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6"><label class="col-form-label font" >Duración de Cita: </label></el-col>
                <el-col  :xs="24" :sm="24" :md="24" :lg="18" :xl="18">
                  <template >
                    <el-input-number :disabled="isDisabledNega" v-model="token.nroTurnos" :min="1" :max="4"></el-input-number>
                    <label class="col-from-label" style="color: #aebbc7">Turno(s) de {{token.frecuencia}} Minutos</label>
                  </template>
                </el-col>
              </template>
            </el-row>
            <template v-if="showToken">
              <el-row :gutter="10">
                <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                  <label class="col-form-label font" >Código de Atención: </label> 
                </el-col>
                <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
                <h1  disabled  id="moTextD" rows="3">{{valorresult}}</h1>
                </el-col>
              </el-row>
            </template>
            <template v-if="isDisabledNega">
              <el-row :gutter="10">
                <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                  <label class="col-form-label font">Funcionario:</label> 
                </el-col>
                <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
                  <el-input :disabled=isDisabledNega placeholder="FUNCIONARIO" v-model="responsableModal" clearable></el-input>
                </el-col>
              </el-row>
            </template> 
          </el-row>
          </template>
          <span slot="footer" class="dialog-footer">
            <el-button @click="cerrarModal">Cerrar</el-button>
            <el-button type="primary" v-bind:style="{display: estiloDisplayAdministrado}" @click="validarDescripcion" >Confirmar</el-button>
          </span>
        </el-dialog>
      </template>
    </section>
  </div>
</template>

<script>
import TituloHeader from '../comun/TituloHeader'
import { es } from 'vuejs-datepicker/dist/locale'
import axios from 'axios';
import Datepicker from 'vuejs-datepicker';
import Constantes from '../../store/constantes.js';
import VModal from 'vue-js-modal'
import moment from "moment";

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  components:{
      TituloHeader, 
      Loading,
      Datepicker,
      VModal
  },
  data(){
    return{
      listDocumento: [{
          value: 'DNI',
          label: 'DNI'
        }, {
          value: 'CE',
          label: 'C. EXTRANJERÍA'
        }, {
          value: 'PAS',
          label: 'PASAPORTe'
        }],
      token : {
        nroTurnos: 1,
        frecuencia: 30,
      },
      tituloModal: 'Registrar Código de Atención',
      isDisabledNega: false,
      tipoAtencion:1,
      idArea: localStorage.getItem('codUnidadCitas')*1,
      idArea2: localStorage.getItem('codUnidadCitas')*1,
      listaAreas: null,
      tipoDocumento: 'DNI',
      isLoading: true,
      nombre:'',
      apePaterno: '',
      apeMaterno: '',
      tokensJson:null,
      indice:1,
      limite:50,
      listaPaginas:null,
      listaTokens:null,
      cantidadPaginasBandeja:0,
      date: new Date,
      showModal: false,
      showInter: false,
      showInterD: false,
      showToken: false,
      fechaSelEnvio: new Date,
      estiloDisplayAdministrado:'',
      dniEscribir:'',
      dniBuscar:'0',
      fechaAHORITA: new Date,
      fechaBuscar:'0',
      fechaModal:null,
      idCitaModal:0,
      horaModal:'',
      motivoModal:'',
      dniModal:'',
      valorresult:'',
      responsableModal:'',
      descripcionModal:'',
      areaSesion:localStorage.getItem('desUnidadLogueado'),
      nombreSesion:localStorage.getItem('nombreCompletoLogueado'),
      usuSesion:localStorage.getItem('cuenta'),
      idUsuarioLogueado:localStorage.getItem('idUsuarioLogueado'),
      codUnidadCitas:localStorage.getItem('codUnidadCitas')*1,
      uniSesion:localStorage.getItem('codUnidadLogueado'),
      appointment: {
            appointmet_date: new Date,
        },
      es: es,
      banderaArea: null,
      filtros: {},
      listaMotivos:null,
      listaHorarios: null,
      motivoSeleccionado: null,
      areaSeleccionada: null,
    }
  },
  created(){
    if(localStorage.getItem('logueado')=='true'){
      this.getAreas();
      this.Refrescar();
      this.FechaActual();
    }else{
      this.$router.push('/auth/login/');
    }
    
  },
  mounted(){
  },
  methods:{
    cambiarMotivo(){
      this.motivoSeleccionado = (this.listaMotivos!=null) ?this.listaMotivos.find(item=> {return item.idSubMotivo == this.token.idSubMotivo}): null;
      this.token.frecuencia = (this.listaMotivos==null) ? this.listaHorarios[0].frecuencia : this.motivoSeleccionado.frecuencia;;
    },
    async getMotivos(area){
      const url = Constantes.rutacitas + 'get-motivo'
      this.areaSeleccionada = this.listaAreas.find(element => {return element.idArea == area});
      console.log(url)
      this.filtros.idArea= area
      this.filtros.tipoAtencion = this.tipoAtencion
      let data = null
      await axios.get(url, {params: this.filtros}).then(response =>{
        data = response.data.data
      }).catch((e) => {
        console.log(e)
      });
      
      if(data.length>0){
        let array=[]
        data.forEach(item =>{
          item.listSubMotivo.forEach(element => {
            element.idMotivo = item.idMotivo
            element.frecuencia = item.frecuencia
            array.push(element)
          });
        })
        this.listaMotivos = array
      }else {
        this.listaMotivos = null;
        this.getHorarios(area)
      }
    },
    getHorarios(value){
      const url = Constantes.rutacitas + "obtener-calendario"
      console.log(url)
      let data = null 
      let idArea= value, tipoAtencion= this.tipoAtencion;
      axios.get(url, {params: {idArea, tipoAtencion}}).then(response => {
        data = response.data.lista
        console.log(data)
        this.listaHorarios = data
        this.token.frecuencia = this.listaHorarios[0].frecuencia
      }).catch(e=>{
        console.log(e)
      })
    },
    confirmarToken(){
      this.$swal({
          title: "Confirmar Código de Atención",
          text: "",
          icon: "info",
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          cancelButtonText: 'No',
          confirmButtonText: 'Si',
          customClass: {
            container: 'my-swal'
          },
        }).then((result) => {
          // this.estiloDisplayAdministrado='';
          if (result.value) {
            //TODO: AQUI SE PONE LO QUE SE VA EJECUTAR DENTRO DEL BOTON OK
            this.generarToken(this.makeid(6),this.idUsuarioLogueado,this.dniModal); this.showToken= true;
            this.Refrescar(); 
            this.showModal=true; 
            this.estiloDisplayAdministrado='none';
          }
        });
    },
    async limpiarCampos(){
      this.motivoSeleccionado = null;
      this.listaMotivos = null;
      this.listaAreas=null;
      await this.getAreas()
      this.idArea = this.codUnidadCitas;
      this.getMotivos(this.idArea)
      this.estiloDisplayAdministrado="";
      this.token.nroTurnos = 1;
      this.token.idSubMotivo = null;
      this.motivoSeleccionado = null;
      this.token.nroTurnos =1;
    },
    cerrarModal(){
      this.nombre = '';
      this.apePaterno='';
      this.apeMaterno='';
      this.dniModal=''; 
      this.tipoDocumento='DNI'
      this.descripcionModal=''; 
      this.estiloDisplayAdministrado=''; 
      this.tituloModal = "Registrar Código de Atención";
      this.showToken=false;
      this.showModal=false;
      this.isDisabledNega = false;
      this.tipoAtencion = 1;
      this.token.frecuencia= 30;
      this.motivoSeleccionado = null;
      this.token.idSubMotivo = null;
      this.token.nroTurnos = 1;
    },
    async nuevoToken(){
      await this.getAreas();
      await this.getMotivos(this.idArea);
    },
    async getAreas(){
      this.listaAreas = null
      var url = Constantes.rutacitas+'dbAreas/'+this.tipoAtencion
      await axios.get(url).then(response=>{
        this.listaAreas=response.data.data;
        this.banderaArea = this.listaAreas.find(item => item.idArea === this.idArea)
        if(this.banderaArea==undefined){
          this.idArea = this.listaAreas[0].idArea
        }
      }).catch(e=>this.Alerta('error','Error al cargar áreas','Comuniquese con GSTI'))
    },
    makeid(length) {
      var result           = '';
      var characters       = 'ACDEFGHIJKLMNPQRSTUWXZ123456789';
      // var characters       = '0123456789';
      var charactersLength = characters.length;
      for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      this.valorresult=result;
      /*  this.valorresult=result; */
      return result;
    },
    async AbrirModal(token,tipoDocumento, dni, nombre, apePat, apeMat, motivo, responsable, idArea, tipoAtencion, item){
      this.valorresult=token;
      this.tipoDocumento=tipoDocumento;
      this.dniModal=dni;
      this.descripcionModal=motivo;
      this.showModal=true;
      this.showToken = true;
      this.tituloModal="Detalle de Código de Atención"
      // document.getElementById("nombres").removeAttribute("disabled")
      this.estiloDisplayAdministrado='none';
      this.responsableModal=responsable;
      this.nombre=nombre;
      this.apePaterno = apePat;
      this.apeMaterno = apeMat;
      this.idArea = idArea*1;
      this.tipoAtencion = tipoAtencion;
      await this.getAreas();
      this.isDisabledNega = true;
      this.token.nroTurnos = (item.tiempoCita/item.frecuencia)+1;
      this.token.frecuencia = item.frecuencia;
      this.token.idSubMotivo = item.idSubMotivo;
      this.areaSeleccionada = this.listaAreas.find(element => {return element.idArea == this.idArea});
      await this.getMotivos(this.idArea);
      this.motivoSeleccionado = (this.listaMotivos!=null) ?this.listaMotivos.find(item=> {return item.idSubMotivo == this.token.idSubMotivo}): null;
    },
    FechaActual(){
      this.fechaSelEnvio= this.customFormatter(new Date)
    },
    Refrescar(){
      this.fechaBuscar = moment(this.appointment.appointmet_date).format('YYYY-MM-DD')
      this.getTokens()
      this.fechaBuscar = '0'
    },
    FechaAtencion(){
      var Fec = new Date;
      this.minAten = Fec.getHours;
    },
    CambiarPagina(pagina){
      if(pagina>0){
        this.indice=pagina;
      }
    },
    validarDescripcion(){
      if(this.nombre.length<2){
        return this.Alerta('info','Aviso','Ingrese nombre del administrado')
      }else if(this.apePaterno.length< 2){
        return this.Alerta('info','Aviso','Ingrese apellido paterno')
      }else if(this.apeMaterno.length< 2){
        return this.Alerta('info','Aviso','Ingrese apellido materno')
      }else if(this.dniModal.length< 7){
        return this.Alerta('info','Aviso','Ingrese número de documento')
      }else if(this.dniModal.length< 8 && this.tipoDocumento=='DNI'){
        return this.Alerta('info','Aviso','Ingrese número de documento')
      }else if(this.dniModal.length< 9 && this.tipoDocumento=='CE'){
        return this.Alerta('info','Aviso','Ingrese número de documento')
      }else if(this.dniModal.length< 13 && this.tipoDocumento=='PAS'){
        return this.Alerta('info','Aviso','Ingrese número de documento')
      }else if((this.listaMotivos != null &&  this.descripcionModal=='')||(this.listaMotivos == null &&  this.descripcionModal=='')){
        return this.Alerta('info','Aviso','Ingrese motivo de atención')
      }else if (this.descripcionModal.length > 1000 ){
        return this.Alerta('info','Aviso','El campo MOTIVO excedió su límite.')
      }else if (this.listaMotivos!=null && (this.token.idSubMotivo == undefined || this.token.idSubMotivo == null)){
        return this.Alerta('info','Aviso','No seleccionó Tipo de Trámite')
      }else{
        this.confirmarToken()
      }
    },
    getTokens(){
      var url=Constantes.rutacitas+'tokenBandeja/'+this.idArea+"/"+this.fechaBuscar+"/"+this.dniBuscar;
      console.log(url);
      axios.get(url)
        .then(response=>{
          this.isLoading = false
          this.tokensJson=response.data.data;
        })
      .catch(e=>this.Alerta('error','Error al códigos de atención','Por favor comuniquese con GSTI'))
    },
    validarDniBuscar(){
      if(this.dniEscribir.length > 7){
        if(this.dniEscribir.length>15){
          this.Alerta('error','Error','"Excedio el limite de digitos.')
        }else if (this.dniEscribir.length<8){
          this.showInter=false;
          this.Alerta('error','Error','"Minimo 8 digitos')
        }else {
          this.dniBuscar = this.dniEscribir;
          this.getTokens()
          this.dniBuscar = '0';
          console.log("SE REGISTRO CORRECTAMENTE")
        }
      } else{
        this.validarfecha()
      } 
    },
    validarfecha(){
        this.fechaBuscar= moment(this.appointment.appointmet_date).format('YYYY-MM-DD')
        this.dniBuscar= "0"
        this.getTokens()
        this.dniBuscar = '0'
        this.fechaBuscar = '0'
    },
    getTokensDni(){
      var url=Constantes.rutacitas+'tokenBandeja/'+this.codUnidadCitas+"/"+this.fechaBuscar+"/"+this.dniEscribir;
      console.log(url);
      axios.get(url)
        .then(response=>{console.log(response);
          this.tokensJson=response.data.data;
          var objeto = this.tokensJson.data;
          console.log(this.tokensJson);
          this.listaPaginas= null
          this.listaPaginas=[1];
      }).catch(e=>console.log(e))
    },
    generarToken(idToken,idfuncionario,dni){ 
      var horaA = new Date();
      var datosToken = {}; 
      let objSubmodulo = null;
      if(this.listaMotivos != null) objSubmodulo = this.listaMotivos.find(item=> {return item.idSubMotivo == this.token.idSubMotivo})
      datosToken.token = idToken
      datosToken.idFuncionario = idfuncionario
      datosToken.motivo =this.descripcionModal.toUpperCase()
      datosToken.motivo = this.descripcionModal.toUpperCase();
      datosToken.idArea = this.idArea
      datosToken.idAreaRegistro = this.codUnidadCitas
      datosToken.dni = dni;
      datosToken.tipoAtencion = this.tipoAtencion;
      datosToken.nombres = this.nombre.toUpperCase();
      datosToken.apePaterno = this.apePaterno.toUpperCase();
      datosToken.apeMaterno = this.apeMaterno.toUpperCase();
      datosToken.tipoDocumento = this.tipoDocumento
      datosToken.nombreFuncionario = this.nombreSesion.toUpperCase();
      datosToken.fechaHora = moment(horaA).format('YYYY-MM-DD HH:mm:ss')
      datosToken.frecuencia = (this.listaMotivos==null) ? this.listaHorarios[0].frecuencia : objSubmodulo.frecuencia;
      datosToken.tiempoCita = ((this.token.nroTurnos-1) * datosToken.frecuencia)
      datosToken.idSubMotivo = (this.listaMotivos==null) ? null : objSubmodulo.idSubMotivo;
      console.log(datosToken)
      var url = Constantes.rutacitas+"nuevoToken"
      axios.post(url, datosToken).then((response) => {
        var respuesta = response.data.ok;
        if(respuesta)this.Alerta('success','Registro exitoso.','');
        else this.Alerta('error','Error al registrar código de atención','Por favor comuniquese con GSTI');
        this.Refrescar();
      }).catch(e=>this.Alerta('error','Error al registrar código de atención','Por favor comuniquese con GSTI'));
    },    
    //para calendario
    datepickerAbierto: function() {
    },
    fechaSeleccionada: function() {
      this.$nextTick(() => console.log(this.appointment.appointmet_date))
    },
    datepickerCerrado: function() {
      var fechaSel=moment(this.appointment.appointmet_date).format('D/MM/YYYY');
    },
    customFormatter(date) {
      return moment(date).format('DD-MM-YYYY');//-MM-DD
    },
    customFormatCal(date) {
      return moment(date).format('D MM YYYY');
    },
    fechaFormat(date) {
      return moment(date).format('YYY-MM-DD');
    },
    validarDni: function(event){
      var key = window.event ? event.which : event.keyCode;
      if(key == 8|| key ==9 || (key >=37 && key<=40)){
        }else if(this.tipoDocumento=='DNI'){
          if(this.dniModal.length>=8)event.preventDefault()
      }else if(this.tipoDocumento=='CE'){
        if(this.dniModal.length>=9)event.preventDefault();
      }else if(this.tipoDocumento=='PAS'){
        if(this.dniModal.length>=13)event.preventDefault();
      }
    },
    soloLetras: function(event) {
      var key = window.event ? event.which : event.keyCode;
      if(key == 8 || key == 165 || key== 164|| key==32 || key==241 || key ==209){}
      else if(key > 90 && key < 97)event.preventDefault();
      else if (key < 65 || key > 122) event.preventDefault();
    },
    soloNumeros: function(event){
      var key = window.event ? event.which : event.keyCode;
      if(key == 8){
      }else if (key < 48 || key > 57) {
        event.preventDefault();
      }
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
  },
  filters:{
    pintaPuntos(pagina){
      if(pagina==-1){
        return '...';
      }
      else{
        return pagina;
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .el-col {
    margin-top: 15px;
  }
</style>
<style lang="scss">
  .modalToken{
    .el-select{
      display: inline;
    }
    .el-col{
      margin-top: .5rem;
    }
  }
</style>
<style lang="scss" >
  .manito{
    cursor: pointer;
  }
  .font{
    font-size: 15px;
  }
  .paddinghorizontal{
    padding-left: 0px;
    padding-right: 0px;
  }
  .modalConte{
    padding: 0px;
    width: 50vw;
    max-height: 70vh;
    background: white;
    top: 15%;
    left: 25%;
    box-shadow: 0px 0px 50px black;
    border-radius: 30px 0px 30px 0px;
    position: absolute;
    margin: auto auto;
  }
  .modalCabecera{
    background: #006699;
    margin: 0px;
    border-radius: 30px 0px 0px 0px;
    padding: 10px
  }
  .modalopaco {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: fixed;
    background-color: rgba(0, 0, 0, .5);
    transition: opacity .3s ease;
    z-index: 9998;
  }
  .modalheader {
    background: #006699;
    margin: -10px;
  }

  .modalbody{
    padding: 10px;
    width: 800px;
    background: white;
    top: 20%;
    left: 30%;
    box-shadow: 0px 0px 10px black;
    position: absolute;
  }

  .interbody{
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

  h3{
    text-align: center;
    color:white;
  }
  h1{
    font-size: 40px;
    color: darkred;
    font-weight: 900;
  }
  span{
    font: red,
  }

  .derecha {
    float: right;
  }

  .izquierda {
    float: left;
  }

  .clear{
    clear: both;
  }

  .close{
    background: red;
    color:white;
  }

  .my-swal {
    display: -webkit-box;
    display: flex;
    position: fixed;
    z-index: 300000;
  }
  .datepicker {
      margin-left: 0rem;
      margin-right: 0rem;

      padding: 0.55rem 0.30rem;
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
