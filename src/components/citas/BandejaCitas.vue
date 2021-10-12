
<template>
  <div class="content-wrapper">
    <loading :active.sync="isLoading" :is-full-page="true" color="#007BFF"></loading>
    <titulo-header>Bandeja de Citas Presenciales</titulo-header>
    <section class="content">
      <el-row :gutter="10">
        <div class="card menu">
          <el-row :gutter="10">
            <el-col :md="3">
                <label class="col-form-label">Unidad Orgánica: </label>  
            </el-col>
            <el-col :md="6">
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
                <el-option :value="3" label="En Atencion"></el-option>
                <el-option :value="4" label="Atendido"></el-option>
                <el-option :value="5" label="Desestimado"></el-option>
              </el-select>
            </el-col>
            <!--<el-col :md="2">
              <label class="col-form-label">Motivos</label>
            </el-col>
            <el-col :md="5">
              <multiselect
                :options="mapListaMotivos" :multiple="false"  :close-on-select="false"  :clear-on-select="false" 
                :preserve-search="true"  deselect-label="Quitar"  select-label="Seleccionar"  v-model="listMotivos" 
                :showLabels="true" placeholder="Selecciona" label="descripcion"  track-by="idSubMotivo" 
              ></multiselect> 
            </el-col>-->
          </el-row>
          <el-row :gutter="10">
            <el-col :md="3">
              <label class="col-form-label" style=" !important">Fecha: </label>
            </el-col>
            <el-col :md="6" class="mt-0 pt-0">
              <el-row >
                <el-col :md="24" class="datePickCustomize">                                                 
                  <datepicker :bootstrap-styling="false" :language="es" :open-date="date" input-class="datepicker text-center btn-block"  
                        name="calendarioCitas" :format="customFormatCal" v-model="fechaDatePicker" 
                        @opened="datepickerAbierto" 
                        @selected="fechaSeleccionada" 
                        @closed="datepickerCerrado" 
                        @cleared="valorRemovido" >
                  </datepicker>
                </el-col>
              </el-row>                    
            </el-col>
            <el-col :md="3">
              <label for="dnibuscar" class="col-form-label">Documento: </label>
            </el-col>
            <el-col :md="5">
              <el-input type="text" id="dnibuscar" placeholder="Ingrese Documento" clearable v-model="dniEscribir" @keypress.native="soloNumeros"/> 
            </el-col>
            <el-col :md="4">
              <el-button type="primary" class="btn-block" @click="buscarCitasPresencial()" >Buscar</el-button>
            </el-col>
            <el-col :md="1">
              <el-button type="primary" @click="botonRefrescar()" icon="el-icon-refresh" circle></el-button>
            </el-col>
          </el-row>
        </div>           
        <div class="card menu">
          <table id="example2" class="table table-hover table-sm mb-2">
            <thead >
              <tr >
                <th width="7%">Código</th>
                <th width="14%">Fecha - Hora</th>
                <!-- <th width="4%"></th> -->
                <th width="25%">Documento - Nombre</th>
                <!-- <th width="15%">Nombre</th> -->
                <th width="25%">Token - Funcionario</th>
                <th width="8%">Estado</th>
                <th width="8%">Usuario</th>
                <th class="text-center"></th>  
                <th class="text-center"></th>                  
                <th class="text-center"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="citas of citasJson" :key="'cita '+citas.idCita">
                <td><template>{{citas.codigoCita}}</template></td>
                <td><template>{{citas.fecha}} - {{citas.hora}}</template></td>
                <td>
                  <template>{{citas.dni}} - {{citas.nombres}} {{citas.apePaterno}} {{citas.apeMaterno}}</template>
                </td>
                <td >
                  <template v-if="citas.token.idToken != null">{{citas.token.idToken}} - {{citas.token.usuario}}</template>
                  <template v-if="citas.token.idToken == null">{{citas.token.usuario}}</template>
                </td>
                <td>
                  <template v-if="citas.indEstado==1">Registrado</template>
                  <template v-else-if="citas.indEstado==3">En Atencion</template>
                  <template v-else-if="citas.indEstado==4">Atendido</template>
                  <template v-else-if="citas.indEstado==5">Desestimado</template>
                </td>
                <td class="text-capitalize"><template>{{funcionario(citas.usu_atencion)}}</template></td>
                <td class="text-center">
                  <template v-if="((citas.indEstado==1)||((citas.indEstado==3)&&(citas.usu_atencion==usuSesion)))">
                  <el-button v-on:click="
                  tituloModal='Atención de cita'; nombreBoton='Finalizar';
                  AbrirModal(citas); 
                  showModal=true; modificarCita(idCitaModal,fechaSelEnvio,'hora',3,'descripcion',usuSesion)"  
                  type="text" class="font-weight-bold text-nowrap"><u>Atender</u></el-button>
                  </template>
                </td>
                <td class="text-center" >
                  <template v-if="((citas.indEstado==1)||((citas.indEstado==3)&&(citas.usu_atencion==usuSesion)))">
                  <el-button v-on:click="
                  tituloModal='Desestimar cita'; nombreBoton='Desestimar';
                  AbrirModal(citas); 
                    modificarCita(idCitaModal,fechaSelEnvio,'hora',3,'descripcion',usuSesion)" type="text" class=" text-nowrap">Desestimar</el-button>
                  </template>
                </td>
                <td v-if="((citas.indEstado==1)||((citas.indEstado==3)&&(citas.usu_atencion==usuSesion)))">
                  <template>
                    <el-button type="text" @click="modalReprogramacion(citas)">Reprogramar</el-button>
                  </template>
                </td>
              </tr>
            </tbody>
          </table>
          
        </div>
      </el-row>
    </section>
    <section>
      <template v-if="showModal">
        <el-dialog class="" :title=tituloModal :visible.sync="showModal" :before-close="cerrarModal">
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
            <div class="row col-12">
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
            <el-button @click="cerrarModal">Cerrar</el-button>
            <el-button type="primary" @click="validarDescripcion(3);" >{{nombreBoton}}</el-button>
          </span>
          <template v-if="showInter">
            <el-dialog width="30%" title="Confirmar operación" :visible.sync="showInter" append-to-body>
              <span slot="footer" class="dialog-footer">
                <el-button @click="showInter=false;">Cerrar</el-button>
                <el-button type="primary" @click="confirmarOperación()" >Confirmar</el-button>
              </span>
            </el-dialog>
          </template>
        </el-dialog>
      </template>     
      <template v-if="mVisible">
        <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8" class="left">
          <el-dialog title="Reprogramar Cita" :visible.sync="mVisible" :before-close='cerrarModalReprogramar'>
            <template>
              <modal-reprogramacion @click="ModalReproClose" :jsonCita=sendCita :visible=mVisible></modal-reprogramacion> 
            </template>
            <span slot="footer" class="dialog-footer">
              <el-button @click="cerrarModalReprogramar">Cancel</el-button>
              <el-button type="primary" :disabled="btnConfimar" @click="confirmarReprogramacion" >Confirmar</el-button>
            </span>
          </el-dialog>
        </el-col>
      </template>
    </section>
  </div>
</template>

<script>

import { es } from 'vuejs-datepicker/dist/locale'
import axios from 'axios';
import Datepicker from 'vuejs-datepicker';
import Constantes from '../../store/constantes.js';
import VModal from 'vue-js-modal'
import moment from "moment";
import TituloHeader from '../comun/TituloHeader'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import ModalReprogramacion from '../citas/ModalReprogramacion';
import Multiselect from 'vue-multiselect';
const TIPOATENCION = 1;
export default {
  components: {
    TituloHeader,
    Loading,
    Datepicker,
    ModalReprogramacion,
    Multiselect
  },
  data(){
    return{
      tipoAtencion: TIPOATENCION,
      mVisible: false,
      sendCita: null,
      estadoAtencion: 1,
      dniEscribir: '',
      isLoading: false,

      mapListaMotivos:[],
      listMotivos:[],

      certificadosJson:null,
      citasJson:null,
      citasTJson:null,
      idToken: '',
      listaParametrosAux:null,
      listaEstado:null,
      listaTipoDocumento:null,
      listaResponsables:null,
      idTipodocumento:0,
      idEstado:0,
      numeroDocumentoModelo:'',
      numeroExpedienteModelo:'',
      anioExpedienteModelo:'',
      manzanaModelo:'',
      loteModelo:'',
      indice:1,
      limite:50,
      listaPaginas:null,
      cantidadPaginasBandeja:0,
      date: new Date,
      codigoCita:0,
      showModal: false,
      showModalD: false,
      showInter: false,
      regBool: false,
      fechaSelEnvio: new Date,
      fechaModal:null,
      idCitaModal:0,
      valText:false,
      horaModal:'',
      motivoModal:'',
      dniModal:'',
      nombreModal:'',
      
      codigoCitaModal:0,
      codigoTipoDocumentoModal:'',
      telefonoModal:'',      
      correoModal:'', 
      descripcionModal:'',
      descripcionModalD:'',
      responsableModalD:'',
      responsableModal:'',
      minAten:'',
      horaAten:'',
      fecAten:'',
      codUnidadCitas:localStorage.getItem('codUnidadCitas')*1,
      areaSesion:localStorage.getItem('desUnidadLogueado'),
      usuSesion:localStorage.getItem('cuenta'),
      uniSesion:localStorage.getItem('codUnidadLogueado'),
      idArea: localStorage.getItem('codUnidadCitas')*1,
      listaAreas: null,
      nuevoHorarioSeleccionado: null,
      btnConfimar: true,
      //VARIABLE PARA CALENDARIO
      fechaDatePicker: new Date,
      es: es
    }
  },
  created(){
    if(localStorage.getItem('logueado')=='true'){
      this.getAreas()
      this.buscarCitasPresencial();
      this.getResponsables()
      //this.getMotivos();
    }else{
      this.$router.push('/auth/login/');
    }

  },
  methods:{
    cerrarModalReprogramar(){
      this.btnConfimar=true;
      this.mVisible = false
    },
    confirmarReprogramacion(){
      this.mVisible=false;
      this.$swal({
          title: 'Reprogramar Cita',
          text: '',
          icon: 'info',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          cancelButtonText: 'No',
          confirmButtonText: 'SI',
          customClass: {
            container: 'my-swal'
          },
      }).then((result) => {
        if (result.isConfirmed) {
          //TODO: AQUI SE PONE LO QUE SE VA EJECUTAR DENTRO DEL BOTON OK
          this.updateCita();
        }else this.mVisible = true
      });
    },
    modalReprogramacion(citas){
      this.sendCita = citas
      this.mVisible=true
    },
    async updateCita(){
      this.isLoading =true
      let url = Constantes.rutacitas+'modificarCita/reprogramar'
      let objeto =new Object;
      objeto.idCita = this.sendCita.idCita
      objeto.fecha = this.nuevoHorarioSeleccionado.fecha
      objeto.hora = this.nuevoHorarioSeleccionado.hora
      objeto.tiempoCita = this.sendCita.token.tiempoCita;
      objeto.tipoAtencion = this.sendCita.tipoAtencion
      objeto.correo = this.sendCita.correo
      objeto.dia = this.nuevoHorarioSeleccionado.dia
      console.log(objeto)
      await axios.post(url,objeto).then(response=>{
        let estatus = response.data.ok
        if(!estatus)alertaModal("error al reprogramar cita", 'danger')
        else {
          if(this.sendCita.tipoAtencion==2 && this.sendCita.indEstado==3)alertaModal("La cita deberá volver agendar", 'info');
          this.alertaModal('Registro exitoso', 'success')
          this.mVisible=false
          this.buscarCitasPresencial()
        }
      }).catch(
        e=>console.log("ERROR AL REPROGRAMAR"),
        e=>this.alertaModal('Error de registro', 'error')
      )
      this.isLoading = false
    },
    alertaModal(title, icon){
      this.$swal({
          title: title,
          text: '',
          icon: icon,
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          cancelButtonText: 'No',
          confirmButtonText: 'Ok',
          customClass: {
            container: 'my-swal'
          },
      }).then((result) => {
        if (result.isConfirmed) {
          //TODO: AQUI SE PONE LO QUE SE VA EJECUTAR DENTRO DEL BOTON OK
          // this.updateCita()
        }
      });
    },
    async getAreas(){
      this.listaAreas = null
      var url = Constantes.rutacitas+'dbAreas/1'
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
    getMotivos(){
      const url = Constantes.rutacitas+"get-motivo";
      let idArea = this.codUnidadCitas, tipoAtencion = this.tipoAtencion;
      axios.get(url, {params: {idArea, tipoAtencion}}).then(response=>{
        console.log("RESPONSE ")
        console.log(response);
        response.data.data.forEach(item => {
          item.listSubMotivo.forEach(element => {
            let objeto = {};
            objeto.descripcion = element.descripcion
            objeto.idSubmotivo = element.idSubMotivo
            this.mapListaMotivos.push(objeto)
          })
        })
        console.log(this.mapListaMotivos)
      }).catch(e=>{console.log(e)})
    },
    ModalReproClose(nuevoHorario){
      this.nuevoHorarioSeleccionado = nuevoHorario;
      this.btnConfimar=false;
    },
    modalConfirmacion(){
      this.$swal({
        title: "CONFIRMAR OPERACIÓN",
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
        this.showModal = true
        if (result.value) {
          this.confirmarOperación()
        }
      });
    },
    funcionario(funcionario){
      var cad  = funcionario
      if(funcionario != null){
        cad = funcionario.slice(0 , funcionario.length-18 );
        cad= cad.replace("."," ")
      }
      return cad;
    },
    // AbrirModal(idCita,codigoCita,fecha,hora, motivo,codigoTipoDocumento, dni, nombre, apePat, apeMat,telefono,correo,responsable){
    AbrirModal(cita){
      this.idCitaModal=cita.idCita;
      this.fechaModal=cita.fecha;
      this.horaModal=cita.hora;
      this.dniModal=cita.dni;
      
      this.codigoCitaModal=cita.codigoCita;
      this.codigoTipoDocumentoModal=cita.codigoTipoDocumento;
      this.telefonoModal=cita.telefono;
      this.motivoModal=cita.motivo;
      this.correoModal=cita.correo;
      this.showModal=true;
      this.nombreModal=cita.nombres+' '+cita.apePaterno+' '+cita.apeMaterno;
      this.responsableModal=cita.responsable;
    },
    FechaActual(){
      this.fechaSelEnvio= this.customFormatter(new Date)
    },
    FechaAtencion(){
      var Fec = new Date;
      this.minAten = Fec.getHours;
    },
    CambiarPagina(pagina){
      if(pagina>0){
        this.indice=pagina;
        this.buscarCitasPresencial();
      }
    },
    confirmarOperación(){
      console.log("Confirma operación")
      switch (this.nombreBoton) {
        case 'Finalizar':
          this.modificarCita(this.idCitaModal,this.fechaSelEnvio,'hora',4,this.descripcionModal,this.usuSesion);
          break;
        case 'Desestimar':
          this.modificarCita(this.idCitaModal,this.fechaSelEnvio,'hora',5,this.descripcionModal,this.usuSesion); 
          break;
        default:
          break;
      }
      this.descripcionModal=''; 
      this.buscarCitasPresencial(); 
      this.showInter=false; 
      this.showModal=false; 
      this.validarDescripcion(6);
    },
    validarDescripcion(operacion){
      if (operacion ==3){
        if(this.descripcionModal==''){
          console.log('atender');
          this.showInter=false;
          this.showModal=false;
          this.$swal({
            customClass: {
              container: 'my-swal'
            },
            icon: 'error',
            title: 'Error',
            text: 'Llenar campo de descripción.'                  
          }).then((result) => {
            this.showModal=true
          });
        }else{
          this.showModal = false; 
          this.modalConfirmacion();
        }
      }else if (operacion ==6){  
        this.$swal({
          customClass: {
            container: 'my-swal'
          },
          icon: 'success',
          title: 'Registro exitoso.',
          // text: 'Se realizó la operación.'                  
        });
      }
    },
    botonRefrescar(){
      var fechaHoy = new Date
      this.fechaDatePicker = fechaHoy
      this.estadoAtencion = 1
      this.dniEscribir = ''
      this.getCitasArea(0)
    },
    buscarCitasPresencial(){
      if(this.dniEscribir.length >= 1){
        var dnibuscar = this.dniEscribir
        this.getCitasArea(dnibuscar)
      } else{
        var dnibuscar = 0
        this.getCitasArea(dnibuscar)
      }
    },
    getCitasArea(dnibuscar){    
      if(this.fechaDatePicker.length == 1){
        var fecha = 0
      } else{
        var fecha = moment(this.fechaDatePicker).format('YYYY-MM-DD')
      }
      var estado = this.estadoAtencion   
      if(this.estadoAtencion==1)estado= "1,3"
      var url= Constantes.rutacitas+'citasBandejaxFecha/'+this.idArea+'/'+fecha+'/1/'+dnibuscar+'/'+estado;
      console.log(url);              
      axios.get(url) 
        .then(response=>{
        console.log(response);
        this.citasJson=response.data.data;
        var objeto=this.citasJson.data;
        console.log('cantidad de certificados'+ this.citasJson.length);
        this.listaPaginas=null
        this.listaPaginas=[1];
        var cantidadPaginas=0;
        this.cantidadPaginasBandeja=0;
        console.log('cantidad de páginas'+ cantidadPaginas);
        if(this.citasJson.length>0){
          cantidadPaginas=Math.ceil(this.citasJson[0].totalBandeja/this.limite);
          this.cantidadPaginasBandeja=cantidadPaginas;
            var nuevaPagina=2;
            var primeraPaginaAuxiliar=0;
            var segundaPaginaAuxiliar=0;
            if(this.cantidadPaginasBandeja<=10){
              while(nuevaPagina<=cantidadPaginas) {
                  this.listaPaginas.push(nuevaPagina);
                  nuevaPagina++
                  console.log('Ingreso a pushear listaPaginas' + nuevaPagina);
                  console.log(this.listaPaginas);
              }
            }else{
              while(nuevaPagina<=cantidadPaginas) {
                  console.log('pintando indice'+this.indice);
                  if(nuevaPagina<=3){
                    this.listaPaginas.push(nuevaPagina);
                    console.log('Ingreso a pushear listaPaginas' + nuevaPagina);
                    console.log(this.listaPaginas);
                  }else{
                    if((nuevaPagina>this.indice-3 && nuevaPagina<this.indice+3)||nuevaPagina>=this.cantidadPaginasBandeja-3){
                      this.listaPaginas.push(nuevaPagina);
                      console.log('Ingreso a pushear listaPaginas' + nuevaPagina);
                      console.log(this.listaPaginas);
                    }else{
                      if(primeraPaginaAuxiliar==0 && nuevaPagina<=this.indice-3){
                        this.listaPaginas.push(-1);
                        primeraPaginaAuxiliar=1;
                      }
                      if(segundaPaginaAuxiliar==0 && nuevaPagina>=this.indice+3){
                        this.listaPaginas.push(-1);
                        segundaPaginaAuxiliar=1;
                      }
                    }
                  }
                  
                  nuevaPagina++;
              }
            }
        }
        console.log('Pintando listaPaginas');
        console.log(this.listaPaginas);
      })
      .catch(e=>console.log(e))
    },
    getResponsables(){
      var url= Constantes.rutacitas+'responsables/'+this.codUnidadCitas+'/1'
      axios.get(url).then(response=>{
          this.listaResponsables=response.data.data
        }).catch(e=>console.log(e))
    },
    modificarCita(idCita,fecha,hora,operacion,descripcion,usuario){
      var horaA = moment().format('HH:mm:ss');
      fecha = moment(fecha).format('YYYY-MM-DD')
      descripcion= descripcion.split('/').join('-')
      var jsonSend = {}
      jsonSend.idCita = idCita
      jsonSend.fecha = fecha
      jsonSend.hora = horaA
      jsonSend.operacion = operacion
      jsonSend.descripcion = descripcion.toUpperCase();
      jsonSend.nombreFuncionario = usuario
      jsonSend.idUsuAtencion = localStorage.getItem("idUsuarioLogueado")
      var urlPost=Constantes.rutacitas+'modificarCita/estado'
      console.log(urlPost);
      if(operacion==4)this.generarEncuesta(idCita);
      axios.post(urlPost, jsonSend)
          .then(response=>{
          console.log(response);
          this.buscarCitasPresencial();
        })
        .catch(e=>console.log(e))
    },
    generarEncuesta(idEntidad){
      var url = Constantes.rutaencuesta+'encuesta/nuevaEncuesta'
      console.log(url)
      var jsonSend ={};
      jsonSend.idEncuesta = 1
      jsonSend.idEntidad = idEntidad
      jsonSend.correoDestino = this.correoModal
      axios.post(url, jsonSend).then((response) => {
        var respuesta = response.data.ok;
        console.log(response)
        if(respuesta)this.isLoading=false;
        else this.Alerta('error','Error al registrar encuesta','Por favor comuniquese con GSTI');
      }).catch(e=>this.Alerta('error','Error al registrar encuesta','Por favor comuniquese con GSTI'));
    },
    soloNumeros: function(event){
      var key = window.event ? event.which : event.keyCode;
      if(key == 8){
      }else if (key < 48 || key > 57) {
        event.preventDefault();
      }
    },      
    cerrarModal(){
      this.showModal= false;
      this.modificarCita(this.idCitaModal,this.fechaSelEnvio,'hora',1,'descripcion',this.usuSesion); 
      this.descripcionModal='';
      this.buscarCitasPresencial();
    }, 
    PadLeft(value, length) {
            return (value.toString().length < length) ? PadLeft("0" + value, length) : value;
    },
    //para calendario
    datepickerAbierto: function() {
            console.log('El datepicker ha sido abierto');
    },
    fechaSeleccionada: function() {
            console.log('Una fecha ha sido seleccionada');
            console.log(this.fechaDatePicker);
            this.$nextTick(() => console.log(this.fechaDatePicker))
    },
    datepickerCerrado(){
            console.log('El datepicker ha sido cerrado');
            console.log(this.fechaDatePicker);
            console.log('El datepicker ha sido cerrado 2 ');
            console.log(Datepicker.value);
            console.log(moment(this.fechaDatePicker).format('YYYY-MM-DD'));
            console.log('entro');
            this.fechaSelEnvio=moment(this.fechaDatePicker).format('YYYY-MM-DD');
            console.log('fechasel: '+this.fechaSelEnvio);
    },
    valorRemovido(){
      console.log("Borrado de fecha")
      this.fechaDatePicker = ' '
    },
    customFormatter(date) {
            return moment(date).format('YYYY-MM-DD');
    },
    customFormatCal(date) {
            return moment(date).format('D MM YYYY');
    }     

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
<style lang="scss">
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
<style lang="scss" scoped>
  .el-dialog {
    label{
      font-size: 12px;
    }
    .form-control {
      font-size: 12px;
    }
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
</style>

