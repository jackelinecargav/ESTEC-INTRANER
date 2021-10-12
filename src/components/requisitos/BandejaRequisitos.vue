<template>
    <div class="content-wrapper">
    <loading :active.sync="isLoading" :is-full-page="true" color="#007BFF"></loading>
    <titulo-header>Bandeja de Requisitos</titulo-header>
      <section class="content">
        <div class="row">
          <div class="col-12">
            <div class="card menu">
              <el-row :gutter="10" class="my-2">
                <template>
                  <el-col :md="3">
                    <label for="exampleInputPassword1" class="col-form-label">Unid. Orgánica: </label> 
                  </el-col>
                  <el-col :md="8">
                    <el-select @change="ObtenerTipoTramite(nombreTipoTramite)" :disabled=!permisoSupervisor v-model="areaBuscar">
                      <el-option :value="0" :label="'Seleccionar'"></el-option>
                      <el-option v-for="areas of listaAreas" :key=areas.idArea :value="areas.idArea" :label="areas.nombreArea"></el-option>
                    </el-select>
                  </el-col>
                </template>
                <template>
                  <el-col :md="3">
                    <label for="exampleInputPassword1" class="col-form-label">Procedimiento: </label>   
                  </el-col>
                  <el-col :md="10">
                    <model-select :options="mapListaTipoTramite"
                    v-model="itemTramite"
                    placeholder="Seleccione un Servicio" >
                    </model-select>
                  </el-col>
                </template>                
              </el-row>
              <el-row :gutter="10" class="mt-2">
                <template>
                  <el-col :md="3">
                    <label for="exampleInputPassword1" class="col-form-label">Cod. TUPA/TUSNE: </label>
                  </el-col>
                  <el-col :md="5">
                    <input type="text" class="form-control" placeholder="Ingrese Codigo" v-model="codigoReg">
                  </el-col>
                </template>
                <template>
                  <el-col :md="3" class="text-right">
                    <label for="exampleInputPassword1" class="col-form-label">Estado: </label>
                  </el-col>
                  <el-col :md="5">
                    <el-select  v-model="estadoReg">
                      <el-option :value="1" :label="'ACTIVO'"></el-option>
                      <el-option :value="2" :label="'INACTIVO'">INACTIVO</el-option>
                    </el-select>
                  </el-col>
                  <el-col :md="4">
                    <el-button type="primary" @click="getRequisitosxCod()"  class="btn-block">Buscar</el-button>
                  </el-col>
                  <el-col :md="4">
                    <el-button type="primary" @click="Registro(0)" class="btn-block" >Nuevo</el-button>
                  </el-col>
                </template> 
              </el-row>
            </div>           
            <div class="card menu">
                <table id="example2" class="table table-hover table-sm mb-2">
                  <thead class="">
                  <tr >
                    <th width="2%">ID</th>
                    <th width="2%">Código</th>
                    <th width="8%">Procedimiento</th>
                    <th width="8%">Requisito</th>
                    <th width="2%">Orden</th>
                    <th class="text-center" width="2%">Ayuda</th>
                    <th class="text-center" width="2%">Formato</th>
                    <th class="text-center" width="2%">Obligatorio</th>              
                  </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(req,index) of reqJson" :key="'requisitos'+index+req.requisito.idRequisito" v-on:dblclick="Editar(req.idRequisitoTramite)">
                      <td>{{req.idRequisitoTramite}}</td>
                      <td v-if="req.tipoTramite.codSubConcepto!=0">{{req.tipoTramite.codigo}}-{{req.tipoTramite.codSubConcepto}}</td>
                      <td v-if="req.tipoTramite.codSubConcepto==0" >{{req.tipoTramite.codigo}}</td>
                      <td>{{req.tipoTramite.nombre}}</td>
                      <td>{{req.requisito.nombre}}</td>
                      <td>{{req.orden}}</td>
                      <td class="text-center" v-if="(longitud(req.ayuda)>=1)">S</td>
                      <td class="text-center" v-if="(longitud(req.ayuda)<1)">N</td>
                      <td class="text-center" v-if="(longitud(req.linkFormato)>=1)">S</td>
                      <td class="text-center" v-if="(longitud(req.linkFormato)<1)">N</td>
                      <td class="text-center" v-if="(req.requisito.flagObligatorio)">S</td>
                      <td class="text-center" v-if="(!req.requisito.flagObligatorio)">N</td>                        
                    </tr>
                  </tbody>
                </table>
                
                <!-- <nav aria-label="...">
                  <ul class="pagination">
                    <li class="page-item " @click="CambiarPagina(indice-1)">
                      <span class="page-link">Anterior</span>
                    </li>
                    <li v-for="pagina of listaPaginas" :key=pagina.id @click="CambiarPagina(pagina)" class="page-item" :class="{'active':pagina==indice}">
                      <a class="page-link" >{{pagina | pintaPuntos}}</a>
                    </li>
                    <li class="page-item" @click="CambiarPagina(indice+1)">
                      <a class="page-link" >Siguiente</a>
                    </li>
                  </ul>
                </nav> -->
              </div>
            </div>
          </div>
      </section>
    </div>
</template>

<script>
import axios from 'axios';
import Datepicker from 'vuejs-datepicker';
import Constantes from '../../store/constantes.js';
import VModal from 'vue-js-modal'
import moment from "moment";
import { ModelSelect } from 'vue-search-select'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import TituloHeader from '../comun/TituloHeader';
export default {
  props:[
    'opcion'
  ],
  components: {    
    ModelSelect ,
    TituloHeader, 
    Loading,
  },
  data(){
    return{
      isLoading: false,
      isDisabledNega: true,
      areaBuscar: localStorage.getItem('codUnidadLogueado')*1,
      listaAreas: null,
      
      permiso: true,
      reqJson:null,
      listaParametrosAux:null,
      listaEstado:null,
      listaTipoDocumento:null,
      idTipodocumento:0,
      idEstado:0,
      idRequisito:0,
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
      estadoReg:1,
      idCitaModal:0,
      valText:false,
      procedimientoReg:'',
      codigoReg:'',
      minAten:'',
      horaAten:'',
      fecAten:'',
      mapListaTipoTramite:[],
      mapListaReq:[],
      listaReq:null,
      nombreTipoTramite:'',
      listaTipoTramite:null,
      itemTramite:0,
      itemTramiteAnterior:0,
      areaSesion:localStorage.getItem('desUnidadLogueado'),
      usuSesion:localStorage.getItem('cuenta'),
      uniSesion:localStorage.getItem('codUnidadLogueado'),
      idUsuarioLogueado:localStorage.getItem('idUsuarioLogueado'),
      optionBackup: sessionStorage.getItem("idOpcion"),
      permisoLectura: false,
      permisoEscritura: false,
      permisoEspecial: false,
      permisoSupervisor: false,
      appointment: {
            appointmet_date: new Date,
        }
    }
  },
  updated(){
      if(this.itemTramiteAnterior!=this.itemTramite){
          this.itemTramiteAnterior=this.itemTramite;
          
      }
  },
  mounted(){
    if(localStorage.getItem('logueado')=='true'){
      console.log('está logueado');
      this.permisos();
      console.log('ID OPCION -> '+this.opcion);
    }else{
      this.$router.push('/auth/login/');
    }
    
  },
  methods:{ 
    permisos(){
      this.opcion = (this.opcion == undefined) ? this.optionBackup : this.opcion;
      var url = Constantes.rutaAccesos+'permiso/getpermisobyid/'+this.opcion+'/'+this.idUsuarioLogueado
      console.log(url)
      if(this.opcion!=undefined|| this.optionBackup!=null){
        sessionStorage.setItem('idOpcion', this.opcion);
        axios.get(url).then(response=>{
          var listaAccionSistema=response.data.data;
          console.log("LISTA DE ACCION EN EL SISTEMA");
          console.log(listaAccionSistema);
          for(var item of listaAccionSistema){
            if(item.id73accionsistema ==1) this.permisoLectura = true;
            else if(item.id73accionsistema ==2) this.permisoEscritura=true;
            else if(item.id73accionsistema ==3) this.permisoEspecial=true;
            else if(item.id73accionsistema ==4) this.permisoSupervisor=true;
          }
          this.ObtenerTipoTramite(this.nombreTipoTramite);
          this.getAreas();
        }).catch(e=>console.log(e))
      }else {
        this.Alerta('warning','SELECCIONE UNA OPCIÓN DEL MENÚ','');
        this.$router.push('/components/principal/bienvenido');
      }
    },
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
    longitud(palabra){
      if(palabra==null){
        var numero=0
      }else if(palabra==="null"){
        var numero=0
      }else {
        var numero = palabra.length
      }
      // console.log(numero)
      return numero
    },  
    CambiarPagina(pagina){
      if(pagina>0){
        this.indice=pagina;
        this.getCitas();
      }
    },   
    reemplazaVacio(cadena,reemplazo){
      return cadena==''?'-':cadena;
    },
    reemplazaVacioEntero(cadena,reemplazo){
      return cadena==''?'0':cadena;
    },
    getRequisitos(){    
      var url=Constantes.rutaTramite+'requisito/'+this.areaBuscar;
      this.listaProced=null;
      this.maplistaProced=[];
      console.log(url);              
                axios.get(url)
                    .then(response=>{
                    console.log(response);
                    this.reqJson=response.data.data;
                    var objeto=this.reqJson.data;
                    console.log('cantidad de certificados'+ this.reqJson.length);
                    this.listaPaginas=null
                    this.listaPaginas=[1];
                    var cantidadPaginas=0;
                    this.cantidadPaginasBandeja=0;
                    console.log('cantidad de páginas'+ cantidadPaginas);
                    if(this.reqJson.length>0){
                      console.log(this.reqJson[0].totalBandeja);
                      cantidadPaginas=Math.ceil(this.reqJson[0].totalBandeja/this.limite);
                      this.cantidadPaginasBandeja=cantidadPaginas;
                      console.log('cantidad de páginas'+ cantidadPaginas);
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
                    console.log('reqJson'+ reqJson);
                  })
                  .catch(e=>console.log(e))
                  },
    getRequisitosxCod(){    
      if((this.itemTramite==undefined || this.itemTramite=="")&& this.codigoReg>0 ){
        //var url=Constantes.rutaTramite+'requisito-codigo/'+this.reemplazaVacio(this.codigoReg)+'/'+this.areaBuscar+'/0/0/'+this.estadoReg;
        var url=Constantes.rutaTramite+'requisito-codigo/'+this.reemplazaVacio(this.codigoReg)+'/0/0/0/'+this.estadoReg;
      }else if(this.codigoReg==0 && this.itemTramite>0){
        //var url=Constantes.rutaTramite+'requisito-codigo/0'+'/'+this.areaBuscar+'/'+this.itemTramite+'/0/'+this.estadoReg;
        var url=Constantes.rutaTramite+'requisito-codigo/0'+'/0/'+this.itemTramite+'/0/'+this.estadoReg;
      }else {
        var url=Constantes.rutaTramite+'requisito-codigo/'+this.reemplazaVacio(this.codigoReg)+'/0/'+this.itemTramite+'/0/'+this.estadoReg;
        //var url=Constantes.rutaTramite+'requisito-codigo/'+this.reemplazaVacio(this.codigoReg)+'/'+this.areaBuscar+'/'+this.itemTramite+'/0/'+this.estadoReg;
      }     
      console.log(url);  
      if((this.codigoReg!='' && this.codigoReg>0) || this.itemTramite!=0){            
                axios.get(url)
                    .then(response=>{
                    console.log(response);
                    this.reqJson=null;
                    this.reqJson=response.data.data;
                    console.log(this.reqJson);
                    var objeto=this.reqJson.data;
                    console.log('cantidad de certificados'+ this.reqJson.length);
                    this.listaPaginas=null
                    this.listaPaginas=[1];
                    var cantidadPaginas=0;
                    this.cantidadPaginasBandeja=0;
                    console.log('cantidad de páginas'+ cantidadPaginas);
                    if(this.reqJson.length>0){
                      console.log(this.reqJson[0].totalBandeja);
                      cantidadPaginas=Math.ceil(this.reqJson[0].totalBandeja/this.limite);
                      this.cantidadPaginasBandeja=cantidadPaginas;
                      console.log('cantidad de páginas'+ cantidadPaginas);
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
                    }else{
                    //    this.$swal({
                    //     icon: "error",
                    //     text: "No se encontró el valor buscado."
                    //    }); 
                    //   //  this.getRequisitos();
                    //    this.codigoReg='';
                    }
                    console.log('Pintando listaPaginas');
                    console.log(this.listaPaginas);
                  })
                  .catch(e=>console.log(e))
      }else{
          this.$swal({
          icon: "error",
          title: "Error",
          text: "Debe ingresar un código o nombre a buscar."
        });
        // this.getRequisitos();
        this.codigoReg='';
      }          
    },  
    ObtenerTipoTramite(nombre){
      console.log(Constantes.rutaTramite+'tipotramite/'+this.reemplazaVacio(nombre)+'/'+this.areaBuscar);
      axios.get(Constantes.rutaTramite+'tipotramite/'+this.reemplazaVacio(nombre)+'/'+this.areaBuscar)
                    .then(response=>{
                      this.listaTipoTramite=response.data.data;
                      console.log('pintando tipotramite')
                      console.log(response.data.data);
                      console.log(this.listaTipoTramite);
                      console.log(this.listaTipoTramite[0].nombre);
                      var i=0;
                      this.mapListaTipoTramite = [];
                      while(i<this.listaTipoTramite.length){
                            var asunto={};
                            asunto.value=this.listaTipoTramite[i].idTipoTramite;
                            asunto.text=this.listaTipoTramite[i].nombre;
                            this.mapListaTipoTramite.push(asunto);
                            i++;
                        }
                        console.log("tamano de map")
                        console.log(this.mapListaTipoTramite)
                  })
                  .catch(e=>console.log(e))
    },    
    Registro(){
        // this.$router.push('/components/requisitos/registrarrequisito')
        let routeData = this.$router.resolve({path:'/components/requisitos/registrarrequisito/'+this.areaBuscar+'/'+this.itemTramite});
        window.open(routeData.href,'_blank');
    }, 
    Editar(idRequisito){
        // this.$router.push('/components/requisitos/editarrequisito/'+idRequisito)
        let routeData = this.$router.resolve({path:'/components/requisitos/editarrequisito/'+idRequisito+'/'+this.areaBuscar});
        window.open(routeData.href,'_blank'); 
    },       
    PadLeft(value, length) {
            return (value.toString().length < length) ? PadLeft("0" + value, length) : value;
    },
    Alerta(icon, title, text){
      this.isLoading=false;
      this.$swal({
        customClass: {
          container: 'my-swal'
        },
        icon: icon,
        title: title,
        text: text                
      });
    }, 
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
<style lang="scss" scoped>
  .el-dialog {
    label{
      font-size: 12px;
    }
    .form-control {
      font-size: 12px;
    }
  }
  .menu {
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(49, 59, 160, 0.05);
    border: 1px solid #f2f4f8;
    padding: 20px;
    .col-form-label{
      font-size: 13px;
    }
  }
  .table th{
    border-bottom: none;
    border-top: none;
    color: #0078cf;
  }
  .table td{
    font-size: 11px;
    vertical-align: middle;
  }
</style>

<style >
label.line {
    min-height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.content-input .col-sm-4 .box-input {
    padding-top: 20px;
    padding-bottom: 20px;
}
.sectionclass .col-sm-4 .line:after {
    content: '';
    height: 10px;
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 0;
}

.sectionclass .col-sm-4:after {
    content: '';
    position: absolute;
    height: 80px;
    bottom: -80px;
    left: 14px;
}
.content-input .col-sm-4 .box-input {
    padding-top: 20px;
    padding-bottom: 20px;
}
.sectionclass .col-sm-4:before {
    content: "";
    margin: 0 0.5em;
    display: inline-block;
    border: 7px solid transparent;
    border-bottom: 0 none;
    position: absolute;
    left: -1px;
    bottom: -90px;
}
</style>