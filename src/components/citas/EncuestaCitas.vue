<template>
  <question-customize :finishe=finish :valoracion='valoracion' :listQuestions=listQuestions></question-customize>
</template>

<script>
import axios from 'axios';
import Constantes from '../../store/constantes.js'
import QuestionCustomize from '../citas/QuestionCustomize'
  export default {
    props:[
      'list',
      'valoracion'
    ],
    components:{
      QuestionCustomize
    },
    data() {
      return {
        nameButton: "Sin envio de encuesta",
        getIdEncuesta: null,
        idEncuesta:null,
        id003Estado:null,
        idEntidadEncuesta:null,
        listaRespuesta:null,
        finish: false,
        loading: true
      }
    },
    created(){
      // this.getIdEncuesta = this.$route.params.id;
      // this.validarEncuesta();
      this.getQuestion();
      console.log(this.list);
    },
    methods:{
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
            for(let list of this.list){
              if(list.orden == item.orden){
                object.descripcion = item.descripcion;
                object.idEntidadEncuesta = this.idEntidadEncuesta
                object.idPreguntaEncuesta = item.idPreguntaEncuesta;
                if(item.tipoPregunta==2)object.idOpcionPregunta = list.idOpcionPregunta;
                if(item.tipoPregunta==1)object.respuestaLibre = list.respuestaLibre;
                object.tipo = item.tipoPregunta;
                object.orden = item.orden;
                object.nroRespuesta = 1;
                array.push(object);
              }
            }
          }
          this.listQuestions = array;
        }).catch(e=>this.alertUnclose('error',e))
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
