<template>
  <div class="question"  v-loading="loading"
    element-loading-text="Loading..."
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
    <div class="thank" v-if="finish">
      <h1>¡Gracias por tu tiempo!</h1>
      <p>Estamos trabajando para mejorar tu experiencia</p>
    </div>
    <div class="question-container" v-else >
      <h1>Encuesta de satisfacción</h1>
      <p v-if="cantidad!=undefined">Total de Encuestas: {{cantidad}}</p>
      <p>Valoracion general: {{valoracion}}</p>
      <div class="block" v-for="preg of listQuestions" :key=preg.idPregunta >
        <span v-if="preg.tipo==2" class="demonstration font-label">{{preg.descripcion}}</span>
        <span v-if="preg.tipo==1" class="demonstration font-label text-left">{{preg.descripcion}}</span>
        <template v-if="preg.tipo==2">
          <el-rate disabled
          v-model="preg.idOpcionPregunta*1"
          :texts="[preg.idOpcionPregunta,preg.idOpcionPregunta,preg.idOpcionPregunta,preg.idOpcionPregunta,preg.idOpcionPregunta]"
          show-text>
          </el-rate>
        </template>
        <template v-else-if="preg.tipo==1">
          <el-input :disabled=true type="textarea" :rows="3" maxlength="30" placeholder="Ingrese su comentario o sugerencia..." v-model="preg.respuestaLibre">
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
        <el-button type="primary" round @click="validarCampos()" v-if="finish">{{nameButton}}</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  components:{
  },
  props:["listQuestions", "valoracion", "cantidad"],
  // props:{
  //   listQuestions: {
  //     type: Array,
  //     required: true,
  //     default: () => []
  //   },
  //   valoracion: {
  //     type: Number,
  //     default: ''
  //   },
  // },
  data(){
    return {
        btne: this.valoracion,
        // getIdEncuesta: null,
        // idEncuesta:null,
        // id003Estado:null,
        // idEntidadEncuesta:null,
        // listaRespuesta:null,
        // listQuestions: null,
        // textarea:null,
        // value1: null,
        // value2: null,
        // value3: null,
        // value4: null,
        // value5: null,
        // leyenda: ['muy malo', 'malo', 'bueno', 'muy bueno', 'excelente'],
        finish: false,
        loading: false
    }
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.font-label{
    font-size:  15px
}
.thank {
  text-align: center;
  max-width: 500px;
  margin: auto;
  background: #fff;
  padding: 45px;
  border-radius: 20px;
  box-shadow: 0 4px 25px rgba(205,229,243,.19);
}
.question {
  margin-top: 20px;
  &-container {
    text-align: center;
    max-width: 550px;
    margin: auto;
    background: #fff;
    padding: 45px;
    border-radius: 20px;
    box-shadow: 0 4px 25px rgba(205,229,243,.19);
  }
  .block {
    margin-bottom: 35px;
    display: block;
    .demonstration {
      margin-bottom: 10px;
      display: block;
    }
    i {
      font-size: 38px;
    }
  }
  h1 {
    color: #0078cf;
    font-size: 25px;
    margin-bottom: 20px;
    margin-top: 0px;
  }
}
</style>
