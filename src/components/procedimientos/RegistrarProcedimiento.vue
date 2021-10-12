<template>
  <div class="content-wrapper">
    <loading :active.sync="isLoading" :is-full-page="true" color="#007BFF"></loading>
    <titulo-header>Registro de Procedimientos</titulo-header>
    <section class="content">
      <div class="row">
        <div class="col-sm-6">
          <div class="card menu">
            <el-row :gutter="10">
              <form style="padding: 20px">
                <div class="form-group col-12" style="padding: 8px;left:7px">
                  <div class="row col-12" style="padding-right: 0px"> 
                    <div class="col-md-3" style="padding-left: 0px;">
                      <label for="defaultCheck2" style="text-alignt: right;">Gratuito</label>
                      <div class="text-center"><el-checkbox border :checked="true"></el-checkbox></div>
                    </div>
                    <div id="labelArea" class="col-md-9" style="padding-left: 0px; padding-right: 0px;">
                      <label for="defaultCheck2">Unidad Orgánica</label>
                      <select id="idAreaBucar" class="form-control" :disabled=isDisabledCombo v-model="areaBuscar"> 
                        <option v-for="areas of listaAreas" :key=areas.idArea :value="areas.idArea" >{{areas.nombreArea}}</option>
                      </select>
                    </div>
                    <div id="selectAreas" class="form-group col-md-6" style="padding-right:0px; padding-left: 0px;">
                    </div>                        
                  </div>
                </div>                
                <div class="form-group col-12">
                    <label for="exampleFormControlTextarea1">Procedimiento (*) </label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="procedimientoReg"></textarea>
                </div>
                <div class="form-group col-12">
                    <label for="exampleFormControlTextarea1">Descripción (*) </label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="descripcionReg"></textarea>
                </div>
                <div class="form-group col-12">
                    <label for="exampleFormControlSelect1">Tipo de Documento (*) </label>
                    <el-select class="block" id="exampleFormControlSelect1" v-model="tipodocReg">
                      <el-option :value="0" label="Seleccione"></el-option>
                      <el-option v-for="tipoDocumento of listaTipoDocumento" :key=tipoDocumento.idParametro :value="tipoDocumento.idParametro" :label="tipoDocumento.nombre"></el-option>
                    </el-select>
                </div>
                <div class="form-group col-sm-12 pt-2">
                  <div class="block">
                    <el-button class="btn-block" type="primary" @click.prevent="confirmarOperacion()">Grabar</el-button>                
                  </div>
                </div>
              </form>            
            </el-row>
          </div>
        </div>
      </div> 
    </section>
    <!-- /.content -->
  </div>
</template>

<script>
import axios from "axios";
import Constantes from "../../store/constantes.js";
import moment from "moment";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import TituloHeader from '../comun/TituloHeader';

export default {
  components:{
    TituloHeader, 
    Loading,
  },
  data() {
    return {
      isLoading: false,
      areaBuscar: this.$route.params.idArea,
      listaAreas: null,
      isDisabledCombo: false,
      showModal: false,
      observacion:'',
      labelArchivoSec: "Seleccione Archivo",
      tipoTramite: "",
      solicitante: "",
      estado: "",
      listaAdjuntos: null,
      listaObservaciones:null,
      listaObservacionesModelo:[],
      idTramite: 0,
      usuarioPost: {},
      usuarioCreador:{},
      esPrincipal: false,
      estiloDisplayAprobar: "block",
      estiloDisplayDesestimar: "block",
      estiloDisplayVer: "none",
      estiloDisplayObservar:"block",
      urlDescargaConstancia: "",
      idObservacion:0,
      mensajeDesestimacion:"",
      listaRequisitoModelo:null,
      ayudaRequisito:"",
      nombreRequisitoModal:"",
      procedimientoReg:"",
      descripcionReg:"",
      tipodocReg:0,
      listaEstado:null,
      listaTipoDocumento:null,
      fechaReg: new Date
    };
  },
  mounted() {
    if (localStorage.getItem("logueado") == "true") {    
        this.getParametros(8);
        
        this.FechaActual();
        this.mostrarCombo();
        this.getAreas();
    } else {
        this.$router.push("/auth/login/");
    }
  },
  methods: {   
    getAreas(){
        console.log('===============================================AQUI SE MUESTRA LA DATA===============================================');
         var url = Constantes.rutaTramite+"tramite-area/1"
        //var url = Constantes.rutaTramite+"getAreas"
        console.log(url)
        axios.get(url).then(response=>{
            console.log('examinando listaTipoAtencion');
             this.listaAreas=response.data;
            //this.listaAreas=response.data.data;
            console.log(this.listaAreas);
        }).catch(e=>console.log(e))
    },
    mostrarCombo(){
       var elemento4 = document.getElementById("selectAreas");
       if(localStorage.getItem('idUsuarioLogueado') != 36416){
         this.isDisabledCombo = true;
       }
    },
    removeElement: function (index) {
      console.log('index eliminar observacion:'+index);
      this.listaObservaciones.splice(index, 1);
      this.ReorganizarIndicesObservaciones();
    },
    getParametros(grupo){
      axios.get(Constantes.rutaTramite+'parametro/'+grupo+'/0')
                    .then(response=>{
                    switch(grupo){
                      case 8: 
                        {
                          console.log('examinando listaTipoDocumento');
                          this.listaTipoDocumento=response.data.data;
                          console.log(this.listaTipoDocumento);
                        };
                        break;
                      case 11: 
                        {
                          console.log('examinando listaEstado'+grupo);
                          this.listaEstado=response.data.data;
                          this.idEstado=23;
                        };
                        break;
                    }
                    
                  })
                  .catch(e=>console.log(e))
    },
    confirmarOperacion() {
        if (this.procedimientoReg != '' && this.descripcionReg != '' && this.tipodocReg != 0) {
            this.$swal({
            title: 'Confirmación de registro',            
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar',
            showCloseButton: true,
            showLoaderOnConfirm: true
            }).then((result) => {
            if(result.value) {
                this.$swal('Registrado', 'Registro correcto', 'success')
                this.RegistrarProc();
            } 
            })
        }else{
          this.$swal({
          icon: "error",
          title: "Error",
          text: "Ingresar datos obligatorios (*)."
        });
      } 
    },
    RegistrarProc() {
      if (this.procedimientoReg != '' && this.descripcionReg != '' && this.tipodocReg != 0) {      
      this.$swal({
        title: "Guardando...",
        onOpen: () => {
          this.$swal.showLoading();
        }
      });
      // var fecRegistro = new Date
      // var url=Constantes.rutaTramite+'tipotramite/procedimiento-registro/'+localStorage.getItem('codUnidadLogueado')+'/'+this.procedimientoReg+'/'+this.descripcionReg+'/'+this.tipodocReg
      // +'/'+localStorage.getItem('idUsuarioLogueado')+'/'+this.fechaReg;
      //   console.log(url);
        var url=Constantes.rutaTramite+'tipotramite/procedimiento-registro';
        console.log(url);
        var dataPost=new FormData();
        var tipoTramite = {};
        tipoTramite.nombre=this.procedimientoReg;
        tipoTramite.idUnidad = this.areaBuscar;
        tipoTramite.descripcion = this.descripcionReg;
        tipoTramite.id008EquivalenciaOracle = this.tipodocReg;
        tipoTramite.idUsuarioCreacion = localStorage.getItem('idUsuarioLogueado');

        dataPost.append('tipoTramite',JSON.stringify(tipoTramite) );
                console.log('datapost enviado');
                console.log(dataPost);
                axios.post(url,dataPost)
                     .then(response=>{
                      console.log('pintando respuesta servicio guardar usuario');
                      console.log(response);

                      this.$swal({
                        title: 'Registro exitoso',
                        icon: 'success',
                        confirmButtonText: 'OK',   
                        showLoaderOnConfirm: true
                        }).then((result) => {
                        if(result.value) {     
                          this.$router.push('/components/procedimientos/editarprocedimiento/'+response.data.data+'/'+this.areaBuscar)
                            //location.reload();
                        } 
                        })
                  })
        .catch(e => console.log(e));
      }else{
          this.$swal({
          icon: "error",
          title: "Error",
          text: "Ingresar todos los campos."
        });
      }  
      //this.$router.push('/components/procedimientos/bandejaprocedimientos')
    },
    FechaActual(){
      this.fechaReg= this.customFormatter(new Date)
    },
    customFormatter(date) {
            return moment(date).format('YYYY-MM-DD');
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
    }
  },
    watchOptions: {
        poll: true
  }
};
</script>
<style lang="scss" scoped>
  .modal-backdrop {
      opacity: .5;
  }
  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 25px;
    background-color: #eee;
  }
  .container {
    display: block;
    position: relative;
    padding-left: 35px;
    margin-bottom: 12px;
    cursor: pointer;
    font-size: 22px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .divdisabled {
      pointer-events: none;
      background  : grey ;
      opacity: 0.9;
  }
</style>