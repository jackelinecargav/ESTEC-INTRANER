<template>
    <div class="content-wrapper">
    <loading :active.sync="isLoading" :is-full-page="true" color="#007BFF"></loading>
    <titulo-header>Consulta de Encuestas</titulo-header>
    <section class="content" style=" margin: 0 .1rem;">
        <div class="card menu">
          <el-row :gutter="10">
            <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"><div class="grid-content "><label class="col-form-label" style="">Usuario : </label></div></el-col>
            <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"><div class="grid-content ">
              <template >
                <el-select  v-model="areaBuscar" placeholder="Seleccione un Usuario">
                  <el-option
                    v-for="item of listaAreas" 
                    :key=item.idArea 
                    :value=item.idArea
                    :label=item.descripcion>
                  </el-option>
                </el-select>
              </template></div>
            </el-col>
            <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"><div class="grid-content "><label class="col-form-label text-right" style="">Estado : </label></div></el-col>
            <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"><div class="grid-content ">
              <template>
                <el-select v-model="tipoAtencionBuscar" placeholder="">
                  <el-option
                    v-for="item2 in options"
                    :key="item2.value"
                    :label="item2.label"
                    :value="item2.value">
                  </el-option>
                </el-select>
              </template></div>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :xs="24" :md="3" ><div class="grid-content "><label class="col-form-label" style="">Fecha : </label></div></el-col>
            <el-col :xs="24" :md="9" ><div class="grid-content">
              <template>
                <div class="dateElement" >
                  <el-date-picker
                    v-model="fecharango" type="daterange" range-separator="a" text="Calendario" 
                    start-placeholder="Fecha Inicio" end-placeholder="Fecha Fin">
                  </el-date-picker>
                </div>
              </template>
              </div>
            </el-col>
            <el-col :xs="24" :md="7"></el-col>
            <el-col :xs="20" :md="4">
              <el-button class="btn-block" type="primary" @click="search()" >Buscar</el-button>
            </el-col>
            <el-col :xs="4" :md="1">
              <el-button type="primary" @click="refresh()" icon="el-icon-refresh" circle></el-button>
            </el-col>
          </el-row>
        </div>
         <question-customize v-if="survey" :cantidad=cantidad :valoracion='valoracion' :listQuestions=listQuestionsSend></question-customize>
    </section>
    </div>
</template>

<script>

import TituloHeader from '../comun/TituloHeader'
import { es } from 'vuejs-datepicker/dist/locale'
import axios from 'axios'
import Datepicker from 'vuejs-datepicker'
import Constantes from '../../store/constantes.js'
import VModal from 'vue-js-modal'
import moment from "moment"
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
// import {SweetModal} from 'sweet-modal-vue'
import VueExcelXlsx from "vue-excel-xlsx";   //     prueba 8 y 33
import Vue from 'vue'   //     prueba 8 y 33 y otros 
import QuestionCustomize from '../citas/QuestionCustomize'
const CONENCUESTA = 1;
export default {
  props:[
    'list'
  ],
  data(){
    return{
      options: [
        {
          "value" : 0,
          "label" : "TODOS"
        },
        {
          "value" : 1,
          "label" : "PRESENCIAL"
        },
        {
          "value" : 2,
          "label" : "VIRTUAL"
        }
      ],
      listaAreas: [{
        "idArea": 0,
        "descripcion": 'Todas las áreas'
      }],
      fecharango: '',
      value1: '',
      value2: '',
      isLoading: false,
      survey: false,
      // valoracion: "2.5",
      areaSesion:localStorage.getItem('desUnidadLogueado'),
      nombreSesion:localStorage.getItem('nombreCompletoLogueado'),
      usuSesion:localStorage.getItem('cuenta'),
      codUnidadCitas:localStorage.getItem('codUnidadCitas'),
      uniSesion:localStorage.getItem('codUnidadLogueado'),
      areaBuscar:localStorage.getItem('codUnidadCitas')*1,
      es: es,
      tipoAtencionBuscar: 0,
      // fInicio: new Date,
      // fFin: new Date,
      listQuestionsSend: [],
    }
  },
  mounted(){
    if(localStorage.getItem('logueado')=='true'){
      console.log('está logueado');
      console.log(localStorage);
      this.fechasIncio();
      this.getAreas();
    }else{
      this.$router.push('/auth/login/');
    }
  },
  components: {
    Datepicker,
    VModal,
    TituloHeader,
    Loading,
    QuestionCustomize
  },
  methods:{
    refresh(){
      this.survey = false;
      this.tipoAtencionBuscar=0
      this.areaBuscar = this.codUnidadCitas*1;
      this.fechasIncio();
    },
    evaluarListEncuesta(list){
      let valoracion = 0, preg1=0,preg2=0,preg3=0,preg4=0,preg5=0;
      for(var item of list){
        // console.log(item.valoracionEncuesta);
        valoracion = valoracion + item.valoracionEncuesta;
        preg1 = preg1 + item.orden1;
        preg2 = preg2 + item.orden2;
        preg3 = preg3 + item.orden3;
        preg4 = preg4 + item.orden4;
        preg5 = preg5 + item.orden5;
      }
      this.preg1= (preg1/list.length).toFixed(1)
      this.preg2= (preg2/list.length).toFixed(1)
      this.preg3= (preg3/list.length).toFixed(1)
      this.preg4= (preg4/list.length).toFixed(1)
      this.preg5= (preg5/list.length).toFixed(1)
      this.valoracion = (valoracion/list.length).toFixed(1);
      console.log(this.valoracion);
      this.getPreguntas();
    },
    getPreguntas(){
      let url = Constantes.rutaencuesta+'preguntas/getpreguntas/1';
      axios.get(url).then(response=>{
        console.log('getPreguntas')
        var datalist=response.data.data;
        var array=[];
        for(var item of datalist){
          var object = new Object();
          if(item.tipoPregunta==2){
            object.descripcion = item.descripcion;
            object.idEntidadEncuesta = this.idEntidadEncuesta
            object.idPreguntaEncuesta = item.idPreguntaEncuesta;
            object.respuestaLibre = 'hola';
            object.tipo = item.tipoPregunta;
            object.orden = item.orden;
            switch (item.orden) {
              case 1:object.idOpcionPregunta=this.preg1
                break;
              case 2:object.idOpcionPregunta=this.preg2
                break;
              case 3:object.idOpcionPregunta=this.preg3
                break;
              case 4:object.idOpcionPregunta=this.preg4
                break;
              case 5:object.idOpcionPregunta=this.preg5
                break;
            }
            // object.id003Estado = this.id003Estado;
            object.nroRespuesta = 1;
            array.push(object);
          }
        }
        this.listQuestionsSend = array;
        this.survey=true;
      }).catch(e=>console.log(e))
    },
    search(){
      this.formatCalendar();
      let objetoBuscar = {}
      objetoBuscar.area= this.areaBuscar;
	    objetoBuscar.desdefecha = "'"+this.desdeBuscar+"'";
	    objetoBuscar.hastafecha = "'"+this.hastaBuscar+"'";
	    objetoBuscar.dni = '0';
	    objetoBuscar.estado = this.estadoAtencion;
      objetoBuscar.tipoAtencion = '4';
      objetoBuscar.encuesta = CONENCUESTA;
      let objetoPaginado = {}
      objetoPaginado.indice = null
      objetoPaginado.limite = null
      objetoBuscar.paginado = objetoPaginado
      let url = Constantes.rutacitas+'consultabandeja'
      console.log(url)
      axios.post(url, objetoBuscar).then(response=>{
        let listaSearch=response.data.data;
        console.log('search');
        console.log(listaSearch);
        if(listaSearch==undefined)return alert("No hay encuestas a evaluar");
        let array = [];
        for(var item of listaSearch){
          let objeto ={};
          objeto.valoracionEncuesta = item.valoracionEncuesta;
          if(item.listRespuesta!= null && item.listRespuesta!=0){
            objeto.listRespuesta = item.listRespuesta;
            for(let item2 of item.listRespuesta){
              if (item2.id001pregunta==2) {
                switch (item2.orden) {
                  case 1:
                    objeto.orden1 = item2.idOpcionPregunta
                    break;
                  case 2:
                    objeto.orden2 = item2.idOpcionPregunta
                    break;
                  case 3:
                    objeto.orden3 = item2.idOpcionPregunta
                    break;
                  case 4:
                    objeto.orden4 = item2.idOpcionPregunta
                    break;
                  case 5:
                    objeto.orden5 = item2.idOpcionPregunta
                    break;
                }
              }
            }
            array.push(objeto);
            // console.log(objeto);
          }
        }
        console.log(array);
        console.log("saliendo de metodo");
        this.cantidad = array.length
        this.evaluarListEncuesta(array);
        // this.getPreguntas(array);
      }).catch(e=>console.log(e))
    },
    getAreas(){
      let url = Constantes.rutacitas+'dbAreas/0';
      axios.get(url).then(response=>{
        let data=response.data.data;
        for(let item of data){
          this.listaAreas.push(item)
        }
        let banderaArea = this.listaAreas.find(item => item.idArea === this.areaBuscar)
        if(banderaArea==undefined){
          this.areaBuscar = this.listaAreas[0].idArea
        }
      }).catch(e=>console.log(e))
    },
    formatCalendar(){
      // this.desdeBuscar = moment(this.fInicio).format("YYYY-MM-DD")
      // this.hastaBuscar = moment(this.fFin).format("YYYY-MM-DD")
      this.desdeBuscar = moment(this.fecharango[0]).format("YYYY-MM-DD")
      this.hastaBuscar = moment(this.fecharango[1]).format("YYYY-MM-DD")
      console.log(this.desdeBuscar)
      console.log(this.hastaBuscar)
    },
    fechasIncio(){
      var date = new Date();
      this.fInicio = new Date(date.getFullYear(), date.getMonth() , 1)
      this.fFin = new Date(date.getFullYear(), date.getMonth()+1 , 0)
      
      var date = new Date();
      let fInicio, fFin;
      fInicio = new Date(date.getFullYear(), date.getMonth() , 1)
      fFin = new Date(date.getFullYear(), date.getMonth()+1 , 0)
      this.fecharango = [fInicio, fFin];
    },
  }
}
</script>
<style lang="scss">
  .dateElement{
    .el-input__inner{
      width: 100%;
      max-width:300px;
      min-width:150px;
    }
  }
</style>
<style lang="scss" scoped>
  .el-col {
    border-radius: 4px;
    margin-top: 10px;
  }
  .card-header {
    label {
      font-size: 13px;
    }
  }
  .puntero1{
      cursor: pointer;
      i {
        font-size: 20px;
      }
  }
  .contenedor {
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
