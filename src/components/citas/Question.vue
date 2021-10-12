<template>
  <question-customize :finishe=finish :nameButton='nameButton' :listQuestions=listQuestions></question-customize>
  <!-- <div class="question"  v-loading="loading"
    element-loading-text="Loading..."
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
    <div class="thank" v-if="finish">
      <h1>¡Gracias por tu tiempo!</h1>
      <p>Estamos trabajando para mejorar tu experiencia</p>
    </div>
    <div class="question-container" v-else >
      <h1>Encuesta de satisfacción</h1>
      <div class="block" v-for="preg of listQuestions" :key=preg.idPregunta >
        <span class="demonstration">{{preg.descripcion}}</span>
        <template v-if="preg.tipo==2">
          <el-rate disabled
          v-model="preg.idOpcionPregunta"
          :texts=leyenda
          show-text>
          </el-rate>
        </template>
        <template v-else-if="preg.tipo==1">
          <el-input disabled type="textarea" :rows="3" maxlength="30" placeholder="Ingrese su comentario o sugerencia..." v-model="preg.respuestaLibre">
        </el-input></template>
        <template v-else>
          <el-alert
            title="ERROR"
            type="warning"
            description="no se pudo obtener el tipo de pregunta"
            show-icon>
          </el-alert>
        </template>
      </div>
      <el-row>
        <el-button type="primary" round @click="validarCampos()">Enviar encuesta</el-button>
      </el-row>
    </div>
  </div> -->
</template>

<script>
// import { METHODS } from 'http'
import axios from 'axios';
import Constantes from '../../store/constantes.js'
import QuestionCustomize from '../citas/QuestionCustomize'
  export default {
    components:{
      QuestionCustomize
    },
    data() {
      return {
        nameButton: "Enviar encuesta",
        getIdEncuesta: null,
        idEncuesta:null,
        id003Estado:null,
        idEntidadEncuesta:null,
        listaRespuesta:null,
        listQuestions: null,
        textarea:null,
        value1: null,
        value2: null,
        value3: null,
        value4: null,
        value5: null,
        leyenda: ['muy malo', 'malo', 'bueno', 'muy bueno', 'excelente'],
        finish: false,
        loading: true
      }
    },
    created(){
      this.getIdEncuesta = this.$route.params.id
      this.validarEncuesta();
    },
    methods:{
      validarEncuesta(){
        const url= Constantes.rutaencuesta+'encuesta/getbyidencuesta/'+this.getIdEncuesta
        console.log(url)
        axios.get(url).then(response=>{
          console.log('examinando listaTipoAtencion');
          var data=response.data.data;
          console.log(data)
          this.loading=false;
          if(data!=null){
            switch (data.id003Estado){
            case 5: console.log("Creado");
                    this.getQuestion();
                    this.datosDeEncuesta(data);
                    break;
            case 6: console.log("Finalizado")
                    this.finish=true;
                    break;
            default:console.log("estado no valido");
                    this.finish=true;
                    break;
            }
            console.log("OTENIDO CORRECTAMENTE");
          }else{
            this.finish=true;
            console.log("error ");
          }
          this.loading=false;
        }).catch(e=>this.alertUnclose('error',e))
      },
      datosDeEncuesta(data){
        this.idEntidadEncuesta = data.idEntidadEncuesta;
        this.id003Estado =  data.id003Estado + 1;
      },
      getQuestion(){
        var url = Constantes.rutaencuesta+'preguntas/getpreguntas/1'
        console.log(url)
        axios.get(url).then(response=>{
        console.log(response)
        console.log('examinando listaTipoAtencion');
        var datalist=response.data.data;
        var array=[];
        for(var item of datalist){
          var object = new Object();
          object.descripcion = item.descripcion;
          object.idEntidadEncuesta = this.idEntidadEncuesta
          object.idPreguntaEncuesta = item.idPreguntaEncuesta;
          object.idOpcionPregunta = 3;
          object.respuestaLibre = null;
          object.tipo = item.tipoPregunta;
          object.orden = item.orden;
          // object.id003Estado = this.id003Estado;
          object.nroRespuesta = 1;
          array.push(object);
        }
        this.listQuestions = array;
      }).catch(e=>this.alertUnclose('error',e))
      },
      validarCampos(){
        var count = 1
        for(var item of this.listQuestions){
          console.log(item.orden)
          console.log(count)
          console.log(item.idOpcionPregunta)
          if(item.tipo==2 && item.idOpcionPregunta==0){
            this.alertClose('warning','Por favor complete la pregunta : '+item.orden)
            break;
          }else if(item.tipo==1 && item.respuestaLibre==null){
            this.alertClose('warning','Excedió el limite de la pregunta : '+item.orden)
            break;
          }else if(this.listQuestions.length == count) {
            this.btnFinish();
          }
          count++
        }
      },
      btnFinish(){
        this.loading=true;
        for(var item of this.listQuestions){
          console.log(item.idOpcionPregunta)
        }
        let datosEncuesta = {};
        datosEncuesta.idEntidadEncuesta = this.getIdEncuesta;
        datosEncuesta.estado = 1;
        datosEncuesta.fecharespuesta = '2020-08-07';
        datosEncuesta.listaRespuesta = this.listQuestions;
        datosEncuesta.id003Estado = this.id003Estado
        console.log(datosEncuesta)
        const url='encuesta/modificarEncuesta'
        axios.post(url,datosEncuesta).then(response=>{
          var action = response.data.ok;
          this.loading=false;
          if(action) {
            this.alertClose('success','Encuesta enviada correctamente');
            this.finish = true;
          }
          else this.alertClose('error','Ocurrió un error al enviar encuesta');
        }).catch(e=>{
          this.alertClose('error','Ocurrió un error al enviar encuesta')
          console.log(e)});
      },
      alertUnclose(type,e) {
        this.loading=false;
        this.$message({
          message: e,
          center: true, 
          type: type
          });
      },
      alertClose(type,e) {
        this.loading=false;
        this.$message({
          message: e,
          center: true,
          type: type
          });
      }
    }
  }
</script>
