<template>
  <div class="content-wrapper">
        <section class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                <div class="col-sm-10">
                    <div class="row">
                    <a class="nav-link" data-widget="pushmenu" href="#"></a>
                    <h4>
                        <b>Consulta RENIEC</b>
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
                                  <label>Código usuario</label><input class="form-control" type="password" v-model="usuario" @keypress="isNumber($event)" placeholder="Ingrese código de usuario" maxlength="10">
                                </div>
                            </div>
                            <div class="col-xs-10 col-sm-8 col-lg-3"> 
                                <div>
                                  <label>DNI a consultar</label><input class="form-control" v-model="docConsulta" @keypress="isNumber($event)" placeholder="Ingrese número de documento" maxlength="8">
                                </div>
                            </div>
                            <div class="col-xs-12 col-md-4 pl-4 col-lg-3">
                                <p style="line-height:0px;margin-top:12px">&nbsp;</p>
                                <button class="btn btn-primary" @click.prevent="consultaReniec()">Buscar</button>
                                <el-button type="info" @click.prevent="limpiarCampoFiltro" plain style="padding: 10px 16px"><img src="../../images/icon_eraser.png" alt="" srcset="" width="15"> </el-button>
                            </div>
                        </div>  
                        <p>&nbsp;</p>
                        <hr/> 
                </div>        
                <div class="container" v-if="boolReniec"> 
                    <div class="row ">
                    <div class="col-xs-8 col-md-8">    
                    <table id="tbl-dato-persona" class="table table-striped">
                        <thead class="thead-primary">
                            <tr>
                                <th scope="col">Dato Persona</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody class="tbody-info ">
                            <tr v-for="(persona, i) in ListaPersona" :key="i">
                                <td>{{persona.texto}}</td>
                                <td>{{persona.value}}</td>  
                            </tr>
                        </tbody>
                    </table>
                    </div>
                    <div >
                        <img :src="img.encodedImage+this.base64" style="margin-top: 50%">
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
    name:'ConsultaReniec',
  data(){
    return{     
      docConsulta: '',
      usuario: '',
      dataReniec : [],
      img : {  encodedImage: 'data:image/jpg;base64,'}, 
      ListaPersona:[],  
      base64:'',
      boolReniec: false,
      cargandoModal: false
    }
  },
  methods:{
      consultaReniec(){
          if(this.docConsulta.length!=8){
            this.$swal({
              icon: 'info',
              text: 'El número de documento debe tener 8 digitos.'
            })
            return false;
          }
          this.$swal({
            title: "Procesando",
            allowOutsideClick: false,
            onBeforeOpen: () => {
              this.$swal.showLoading();
            }
            });
          if(this.boolReniec){
            this.limpiarPersona();
          }          
          let dataPost = {};
          dataPost.usuario = this.usuario;
          dataPost.correoUsuario = localStorage.getItem('cuenta');

          axios.post(Constantes.rutaPersona+'/datos-pide/'+this.docConsulta, dataPost)
                    .then(response=>{  
                        this.dataReniec=response.data;
                        var i=0;
                        this.base64 = this.dataReniec.data.persona.foto;
                        console.log(this.base64);
                        var persona = {}; 
                        persona.value = this.dataReniec.data.persona.apPrimer;
                        persona.texto = 'Apellido Paterno: ';  
                        this.ListaPersona.push(persona);
                        var persona = {}; 
                        persona.value = this.dataReniec.data.persona.apSegundo;
                        persona.texto = 'Apellido Materno: ';  
                        this.ListaPersona.push(persona);
                        var persona = {}; 
                        persona.value = this.dataReniec.data.persona.prenombres;
                        persona.texto = 'Nombres: ';  
                        this.ListaPersona.push(persona);
                        var persona = {}; 
                        persona.value = this.dataReniec.data.persona.estadoCivil;
                        persona.texto = 'Estado civil: ';  
                        this.ListaPersona.push(persona);
                        var persona = {}; 
                        persona.value = this.dataReniec.data.persona.direccion;
                        persona.texto = 'Dirección: ';  
                        this.ListaPersona.push(persona);
                        var persona = {}; 
                        persona.value = this.dataReniec.data.persona.ubigeo;
                        persona.texto = 'Ubigeo: ';  
                        this.ListaPersona.push(persona);
                        var persona = {}; 
                        persona.value = this.dataReniec.data.persona.restriccion;
                        persona.texto = 'Restricción: ';  
                        this.ListaPersona.push(persona);

                        this.boolReniec = true;
                        this.$swal.close();
                        console.log(this.ListaPersona);              
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
            this.usuario = '';
            this.docConsulta = '';
            this.ListaPersona = [];
            this.boolReniec = false;
            this.base64='';
      },
      limpiarPersona(){
          this.ListaPersona = [];
          this.boolReniec = false;
          this.base64='';
      }
  }
}
</script>