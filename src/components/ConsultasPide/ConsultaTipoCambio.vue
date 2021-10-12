<template>
  <div class="content-wrapper">
        <section class="content-header">
            <div class="container-fluid">
                <div class="row mb-2" style="padding-left:20px">
                <div class="col-sm-10">
                    <div class="row">
                        <h4>
                            <b>Consulta de Tipo de Cambio  <a style="font-size:15px">  al {{customFormatter(this.date)}}</a></b>
                        </h4>
                    </div>
                </div>
                </div>
            </div>
        </section>
        <section class="content">
            <div class="d-none d-sm-block col-sm-2 col-md-2">&nbsp;</div> 
                <div class="container" v-if="boolCambio" style="margin-left:20px"> 
                    <div class="row ">
                        <div class="col-xs-8 col-md-8">   
                            <p style="margin:0px">&nbsp;</p>
                            <table id="tbl-dato-persona" class="table table-striped">
                                <thead class="thead-primary">
                                    <tr>
                                        <th scope="col">Datos de Tipo de Cambio</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody class="tbody-info">
                                    <tr v-for="(cambio, i) in listCambio" :key="i">
                                        <td>{{cambio.texto}}</td>
                                        <td>{{cambio.value}}</td>  
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            <p>&nbsp;</p>            
      </section>
    </div>
</template>
<style scoped>
  .tm{
    width: 100%;
  }
</style>
<script>
import axios from 'axios';
import Multiselect from 'vue-multiselect';
import Constantes from '../../store/constantes.js';
import moment from "moment";
export default {
    name:'ConsultaTipoCambio',
    components:{ Multiselect },
  data(){
    return{     
      dataTipoCambio : [],
      listCambio:[],
      boolCambio: false,
      date: new Date(),
    }
  },
  mounted(){
      this.consultaTipoCambio();
      console.log(localStorage);
  },
  methods:{
      consultaTipoCambio(){
            let dataPost = {};
            dataPost.correoUsuario = localStorage.getItem('cuenta'); 

            console.log(dataPost);    
            axios.post(Constantes.rutaPersona+'/datos-tipocambio', dataPost)
                        .then(response=>{  
                            this.dataTipoCambio=response.data.data.cambio;

                            var cambio = {}; 
                            cambio.value = this.dataTipoCambio.tasa;
                            cambio.texto = 'Tasa: ';  
                            this.listCambio.push(cambio);

                            var cambio = {}; 
                            cambio.value = this.dataTipoCambio.compra;
                            cambio.texto = 'Compra: ';  
                            this.listCambio.push(cambio);

                            var cambio = {}; 
                            cambio.value = this.dataTipoCambio.venta;
                            cambio.texto = 'Venta: ';  
                            this.listCambio.push(cambio);

                            this.boolCambio = true;

                            this.$swal.close();
                            console.log(this.dataTipoCambio);              
                    })
                    .catch(e=>this.$swal({
                                    icon: 'info',
                                    text: 'No se encontró información.'
                                })
                    )          
      },
    customFormatter(date) {
        return moment(date).format('DD/MM/YYYY');
    },
  }
}
</script>