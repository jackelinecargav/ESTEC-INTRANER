<template>
  <div class="content-wrapper">
        <section class="content-header">
            <div class="container-fluid">
                <div class="row mb-2" style="padding-left:20px">
                <div class="col-sm-10">
                    <div class="row">
                        <h4>
                            <b>Consulta de Antecedentes Policiales</b>
                        </h4>
                    </div>
                </div>
                </div>
            </div>
        </section>
        <section class="content">
            <div class="d-none d-sm-block col-sm-2 col-md-2">&nbsp;</div>
                <div class="container-fluid ">
                    <div class="row">
                      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                          <b-card no-body>
                            <div class="row" style="padding:20px; padding-bottom:0px">
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                    <div class="row" style="margin:10px;margin-top:5px"> 
                                        <div class="form-group col-sm-8" style="padding:0px">
                                            <div class="row">
                                                <label style="margin-top:10px;padding-right:5px">Consultar por: </label>
                                                <b-form-radio-group style="margin:10px">
                                                    <b-form-radio name="radio-size" v-model="rdConsulta" value="1" size="sm">Número de documento</b-form-radio>
                                                    <b-form-radio name="radio-size" v-model="rdConsulta" value="2" size="sm">Nombres</b-form-radio>
                                                </b-form-radio-group>
                                            </div>
                                        </div>
                                    </div>
                                    <b-card no-body><p style="margin:0px">&nbsp;</p>
                                        <div class="row" style="margin:5px;margin-top:5px" v-if="rdConsulta!=''"> 
                                            <div class="form-group col-sm-10" v-if="rdConsulta==1">
                                                <div class="form-group col-sm-5">                                                                                                       
                                                    <b-input-group prepend="Nro documento: ">
                                                        <b-form-input  v-model="docConsulta"  type="search"></b-form-input>
                                                    </b-input-group>    
                                                </div> 
                                            </div>
                                            <div class="form-group col-sm-10" v-if="rdConsulta==2">
                                                <div class="row"> 
                                                    <div class="form-group col-sm-4">                                                                                                       
                                                        <b-input-group prepend="Nombres: ">
                                                            <b-form-input  v-model="nombre"  type="search"></b-form-input>
                                                        </b-input-group>    
                                                    </div>  
                                                    <div class="form-group col-sm-4">                                                                                                       
                                                        <b-input-group prepend="Apellido Paterno: ">
                                                            <b-form-input  v-model="aPaterno"  type="search"></b-form-input>
                                                        </b-input-group>    
                                                    </div>  
                                                    <div class="form-group col-sm-4">                                                                                                       
                                                        <b-input-group prepend="Apellido Materno: ">
                                                            <b-form-input  v-model="aMaterno"  type="search"></b-form-input>
                                                        </b-input-group>    
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-group col-xs-2" style="padding:0px">
                                                <button class="btn btn-primary" @click.prevent="consultaAntecedentes(0)">Buscar</button>
                                                <el-button type="info" @click.prevent="limpiarCampoFiltro" plain style="padding: 10px 16px"><img src="../../images/icon_eraser.png" alt="" srcset="" width="15"> </el-button>
                                            </div>
                                        </div>
                                    </b-card>    
                                </div>
                            </div>
                            <p style="margin:0px">&nbsp;</p>
                          </b-card>
                      </div>
                   </div>
                </div>
                <div class="container-fluid" v-if="boolAntecedente">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <b-card no-body>
                            <div class="row" style="padding:20px">
                                <div id="scrollspy-nested" class="col-xs-11 col-sm-11 col-md-11 col-lg-12" style="position:relative; height:350px; overflow-y:auto">
                                    <b-list-group flush style="text-align:left" v-for="antecedente in dataAntecedente" :key="antecedente.id">
                                        <b-button size="sm" variant="primary" block disabled></b-button>
                                        <b-list-group-item variant="info" class="d-flex justify-content-between text-align-left"><a><b>NOMBRE COMPLETO : </b>{{antecedente.antecedentes.nombreCompleto}}</a> 
                                        <b-badge size="lg" variant="primary" @click.prevent="verAntecedente(antecedente.antecedentes.cPersona)" >Ver antecedentes</b-badge></b-list-group-item>
                                        <b-list-group-item ><b>NOMBRES : </b>{{antecedente.antecedentes.nombres}} </b-list-group-item>
                                        <b-list-group-item variant="info"><b>APELLIDO PATERNO : </b>{{antecedente.antecedentes.aPaterno}}</b-list-group-item>
                                        <b-list-group-item ><b>APELLIDO MATERNO : </b>{{antecedente.antecedentes.aMaterno}} </b-list-group-item>
                                        <b-list-group-item variant="info"><b>TIPO DE DOCUMENTO : </b>{{antecedente.antecedentes.tipoDoc}}</b-list-group-item>
                                        <b-list-group-item ><b>NÚMERO DE DOCUMENTO : </b>{{antecedente.antecedentes.numDoc}} </b-list-group-item>
                                        <b-list-group-item variant="info"><b>LUGAR DE NACIMIENTO : </b>{{antecedente.antecedentes.lugarNacimiento}}</b-list-group-item>
                                        <b-list-group-item ><b>FECHA DE NACIMIENTO : </b>{{antecedente.antecedentes.fecNacimiento}} </b-list-group-item>
                                        <b-list-group-item variant="info"><b>CÓDIGO PERSONA : </b>{{antecedente.antecedentes.cPersona}}</b-list-group-item>
                                        <b-list-group-item ><b>SEXO : </b>{{antecedente.antecedentes.sexo}} </b-list-group-item>
                                        <b-list-group-item variant="info"><b>CONTEXTURA : </b>{{antecedente.antecedentes.contextura}}</b-list-group-item>
                                        <b-list-group-item ><b>TALLA : </b>{{antecedente.antecedentes.talla}} </b-list-group-item>
                                        <b-list-group-item variant="info"><b>NOMBRE PADRE : </b>{{antecedente.antecedentes.nombPadre}}</b-list-group-item>
                                        <b-list-group-item ><b>NOMBRE MADRE : </b>{{antecedente.antecedentes.nombMadre}}</b-list-group-item>
                                        <p>&nbsp;</p>
                                    </b-list-group>
                                </div>
                            </div>
                        </b-card>
                    </div>
                   <hr/>
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
export default {
    name:'ConsultaAntecedentes',
    components:{ Multiselect },
  data(){
    return{     
      docConsulta: '',
      nombre: '',
      aPaterno: '',
      aMaterno: '',
      cPersona: '',
      rdTipo: '',
      usuario: '',
      rdConsulta:'',
      dataAntecedente : [],
      respuesta : [],
      seleccionadosE:{},
      boolAntecedente: false,
      boolRegistro : false,
      tipoDoc: [],
      mensaje:''
    }
  },
  methods:{
      consultaAntecedentes(){
          this.validaRegistro();
          if(this.boolRegistro){
            this.$swal({
                title: "Procesando",
                allowOutsideClick: false,
                onBeforeOpen: () => {
                this.$swal.showLoading();
                }
                });
            if(this.boolAntecedente){
                this.limpiarPersona();
            }             
          
            let dataPost = {};
            dataPost.correoUsuario = localStorage.getItem('cuenta'); 
            dataPost.numDocLogueado = localStorage.getItem('numeroDocumentoLogueado');
            if(localStorage.getItem('numeroDocumentoLogueado').length==8)dataPost.tipoDoc = 2;
            else dataPost.tipoDoc = 99;
            if(this.rdConsulta==1){
                dataPost.numDoc = this.docConsulta;
                dataPost.tipoConsulta = 1;
            } else if (this.rdConsulta==2){
                dataPost.nombres = this.nombre;
                dataPost.aPaterno = this.aPaterno;
                if(this.aMaterno!='') dataPost.aMaterno = this.aMaterno;
                dataPost.tipoConsulta = 2;     
            }   
            axios.post(Constantes.rutaPersona+'/datos-antecedente', dataPost)
                        .then(response=>{ 
                                this.dataAntecedente=response.data.data;
                                this.boolAntecedente = true;
                                this.$swal.close();       
                    })
                    .catch(e=>this.$swal({
                                    icon: 'info',
                                    text: 'No se encontró información, por favor valide nuevamente los datos ingresados.'
                                }), 
                                this.limpiarPersona()
                    )
          }  
          
      },
      verAntecedente(opc){ 
        this.$swal({
            title: "Procesando",
            allowOutsideClick: false,
            onBeforeOpen: () => {
            this.$swal.showLoading();
            }
            });         
            let dataPost = {};
            dataPost.correoUsuario = localStorage.getItem('cuenta'); 
            dataPost.numDocLogueado = localStorage.getItem('numeroDocumentoLogueado');
            if(localStorage.getItem('numeroDocumentoLogueado').length==8)dataPost.tipoDoc = 2;
            else dataPost.tipoDoc = 99;
            dataPost.tipoConsulta = 3;
            dataPost.cPersona = opc;      
            axios.post(Constantes.rutaPersona+'/datos-antecedente', dataPost)
                        .then(response=>{                                     
                                this.respuesta = response.data.data; 
                                console.log(this.respuesta);
                                this.mensaje = this.respuesta[0].antecedentes.respuesta;
                                if(this.mensaje=='Consulta satisfactoria')this.mensaje= 'Sí cuenta con antecedentes.';
                                this.$swal.close();
                                this.$swal({
                                    icon: 'info',
                                    text: this.mensaje
                                }) 
                                
                    })
                    .catch(e=>this.$swal({
                                    icon: 'info',
                                    text: 'No se encontró información.'
                                })
                    )          
      },
      validaRegistro(){
          if(this.rdConsulta == 1){
              if(this.docConsulta=='') this.boolRegistro = false;
              else this.boolRegistro = true;

          } else if (this.rdConsulta == 2){
              if(this.nombre == '' || this.aPaterno == '') this.boolRegistro = false;
              else this.boolRegistro = true;
          } 
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
          if(this.rdTipo==1){
              this.docConsulta = '';
          }else{
              this.nombre = '';
              this.aPaterno = '';
              this.aMaterno = '';
          }
      },
      limpiarPersona(){
          this.dataAntecedente = [];
          this.boolAntecedente = false;
      }
  }
}
</script>