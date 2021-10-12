<template>
  <div class="content-wrapper">
        <section class="content-header">
            <div class="container-fluid">
                <div class="row mb-2"  style="padding-left:20px ">
                <div class="col-sm-10">
                    <div class="row">
                        <h4>
                            <b>Consulta de Carnet de Extranjería</b>
                        </h4>
                    </div> 
                </div>
                </div>
            </div>
        </section> 
        <section class="content">
            <div class="d-none d-sm-block col-sm-2 col-md-2">&nbsp;</div>                             
                <div class="container-fluid ">
                        <div class="row ">
                            <div class="col-xs-10 col-sm-8 col-lg-3"> 
                                <div>
                                  <label>Documento a consultar</label><input class="form-control" v-model="docConsulta" placeholder="Ingrese número de documento" maxlength="11">
                                </div>
                            </div>
                            <div class="col-xs-12 col-md-4 pl-4 col-lg-3">
                                <p style="line-height:0px;margin-top:12px">&nbsp;</p>
                                <button class="btn btn-primary" @click.prevent="consultaCarnet()">Buscar</button>
                                <el-button type="info" @click.prevent="limpiarCampoFiltro" plain style="padding: 10px 16px"><img src="../../images/icon_eraser.png" alt="" srcset="" width="15"> </el-button>
                            </div>
                        </div>  
                        <p>&nbsp;</p>
                        <hr/> 
                </div>        
                <div class="container" v-if="boolCarnet"> 
                    <div class="row ">
                    <div class="col-xs-8 col-md-8">    
                    <table id="tbl-dato-persona" class="table table-striped">
                        <thead class="thead-primary">
                            <tr>
                                <th scope="col">Dato Persona</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody class="tbody-info">
                            <tr v-for="(persona, i) in ListaPersona" :key="i">
                                <td>{{persona.texto}}</td>
                                <td>{{persona.value}}</td>  
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
import Constantes from '../../store/constantes.js';
export default {
    name:'ConsultaCarnet',
  data(){
    return{     
      docConsulta: '',
      dataCarnet : [],
      ListaPersona:[],  
      boolCarnet: false,
      cargandoModal: false
    }
  },
  methods:{
      consultaCarnet(){
          this.$swal({
            title: "Procesando",
            allowOutsideClick: false,
            onBeforeOpen: () => {
              this.$swal.showLoading();
            }
            });
          if(this.boolCarnet){
            this.limpiarPersona();
          }          
          let dataPost = {};
          dataPost.correoUsuario = localStorage.getItem('cuenta');

          axios.post(Constantes.rutaPersona+'/datos-carnet/'+this.docConsulta, dataPost)
                    .then(response=>{  
                        this.dataCarnet=response.data.data.carnet;
                        var persona = {}; 
                        persona.value = this.dataCarnet.aPaterno;
                        persona.texto = 'Apellido Paterno: ';  
                        this.ListaPersona.push(persona);
                        var persona = {}; 
                        persona.value = this.dataCarnet.aMaterno;
                        persona.texto = 'Apellido Materno: ';  
                        this.ListaPersona.push(persona);
                        var persona = {}; 
                        persona.value = this.dataCarnet.nombre;
                        persona.texto = 'Nombres: ';  
                        this.ListaPersona.push(persona);
                        var persona = {}; 
                        persona.value = this.dataCarnet.cMigratoria;
                        persona.texto = 'Calidad Migratoria: ';  
                        this.ListaPersona.push(persona);
                        var persona = {}; 
                        persona.value = this.dataCarnet.nRespuesta;
                        persona.texto = 'Número de Respuesta: ';  
                        this.ListaPersona.push(persona);

                        this.boolCarnet = true;
                        this.$swal.close();          
                  })
                  .catch(e=>this.$swal({
                                icon: 'info',
                                text: 'No se encontró información, por favor valide nuevamente los datos ingresados.'
                            }), 
                            this.limpiarPersona()
                  )
      },
      isNumber: function(evt) {
        evt = (evt) ? evt : window.event;
        var charCode = (evt.which) ? evt.which : evt.keyCode;
            if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
                evt.preventDefault();;
            } else {
                return true;
            }
        },
      limpiarCampoFiltro(){
            this.docConsulta = '';
            this.ListaPersona = [];
            this.boolCarnet = false;
      },
      limpiarPersona(){
          this.ListaPersona = [];
          this.boolCarnet = false;
      }
  }
}
</script>