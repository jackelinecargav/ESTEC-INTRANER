<template>
  <div class="content-wrapper">
    <loading :active.sync="isLoading" :is-full-page="true" color="#007BFF"></loading>
    <titulo-header>Bandeja de Procedimientos</titulo-header>
    <section class="content">
      <el-row :gutter="10">
          <div class="card menu">
            <el-row :gutter="10" class="my-2">
              <template>
                <el-col :md="3">
                  <label for="exampleInputPassword1" class="col-form-label">Unidad Organica: </label>                    
                </el-col>
                <el-col :md="8">
                  <el-select id="idAreaBucar" @change="ObtenerTipoTramite('')" :disabled=!permisoSupervisor filterable v-model="areaBuscar">
                  <el-option :value="0" label="Seleccionar"></el-option>
                  <el-option v-for="areas of listaAreas" :key=areas.idArea :value="areas.idArea" :label="areas.nombreArea"></el-option>
                  </el-select>
                </el-col>
              </template>
              <template>
                <el-col :md="3">
                <label for="exampleInputPassword1" class="col-form-label">Procedimiento: </label>   
                </el-col>
                <el-col :md="10">
                  <el-row>
                    <el-col :md="21"> 
                      <model-select :options="mapListaTipoTramite" v-model="itemTramite" placeholder="Seleccione un Servicio" >
                      </model-select>
                    </el-col>
                    <el-col :md="3"> 
                      <el-button type="button" @click="itemTramite = 0" class="btn btn-outline-secondary">
                        <img src="../../images/icon_eraser.png" alt="" srcset="" width="25" height="25">   
                      </el-button>   
                    </el-col>
                  </el-row>
                </el-col>
              </template>
            </el-row>
            <el-row :gutter="10" class="my-2">
              <template>
                <el-col :md="3">
                  <label class="col-form-label">Cod. TUPA/TUSNE: </label>
                </el-col>
                <el-col :md="4">
                    <el-input type="text" placeholder="Ingrese Codigo" v-model="numeroDocumentoModelo"/>
                </el-col> 
              </template>
              <template>
                <el-col :md="2" class="text-right">
                  <label class="col-form-label">Tipo:</label>
                </el-col>
                <el-col :md="3">
                  <el-select class="text-center" v-model="tipoTupaTusne">
                    <el-option :value="0" label="Todos"></el-option>
                    <el-option :value="1" label="TUSNE"></el-option>
                    <el-option :value="2" label="TUPA"></el-option>
                    <el-option :value="3" label="OTROS"></el-option>
                  </el-select>
                </el-col>
              </template> 
              <template>
                <el-col :md="2" class="text-right">
                  <label class="col-form-label">Gratuito:</label>
                </el-col>
                <el-col :md="4">
                  <el-select class="text-center"  v-model="flagPagoBusqueda">
                    <el-option :value="0" label="Todos"></el-option>
                    <el-option :value="1" label="Si"></el-option>
                    <el-option :value="2" label="No"></el-option>
                  </el-select>
                </el-col>
              </template> 
              <template>
                <el-col :md="2" class="text-right">
                  <label for="exampleInputPassword1" class="col-form-label">Estado</label>
                </el-col>
                <el-col :md="4">
                  <el-select v-model="estadoReg">
                      <el-option :value="1" label="ACTIVO"></el-option>
                      <el-option :value="2" label="INACTIVO"></el-option>
                  </el-select>
                </el-col>
              </template>
            </el-row>
            <el-row :gutter="10" class="d-flex justify-content-end">
              <el-col :sm="24" :md="4">
                  <el-button type="primary" @click="getProcedxNumero()" class="btn-block">Buscar</el-button>   
              </el-col>
              <el-col :sm="24" :md="4">
                <el-button type="primary" :disabled=!permisoEscritura @click="Registro(0)" class="btn-block" >Nuevo</el-button>   
              </el-col>
            </el-row>
          </div>           
          <div class="card menu">
            <table id="example2" class="table table-hover table-sm mb-0">
              <thead class="">
              <tr >
                <th width="2%">ID</th>
                <th width="3%">Código</th>
                <th width="3%" class="text-center">Numero</th>
                <th width="8%">Procedimiento</th>
                <th class="text-center" width="2%">Gratuito </th>
                <th width="2%" class="text-center">BL</th>              
                <th width="2%" class="text-center">TT</th>              
                <th width="2%" class="text-center">PR</th>              
                <th width="2%" class="text-center">TC</th>              
                <th width="2%" class="text-center">NR</th>               
              </tr>
              </thead>
              <tbody>
              <tr v-for="proced of procedJson" :key=proced.idTipoTramite v-on:dblclick="Editar(proced.idTipoTramite)">
                <td>{{proced.idTipoTramite}}</td>
                <td v-if="proced.codSubConcepto!=0">{{proced.codigo}}-{{proced.codSubConcepto}}</td>
                <td v-if="proced.codSubConcepto==0" >{{proced.codigo}}</td>
                <td class="text-center">{{proced.tTramite.numero}}</td>
                <td>{{proced.nombre}}</td>
                <td class="text-center" v-if="proced.flagRequierePago==true">N</td>
                <td class="text-center" v-else-if="proced.flagRequierePago==false">S</td>
                <td class="text-center" v-if="(longitud(proced.baseLegal)>=8)">S</td>                      
                <td class="text-center" v-if="(longitud(proced.baseLegal)<8)">N</td>                       
                <td class="text-center" v-if="(longitud(proced.tupaTusneDescripcion)>=8)">S</td>                       
                <td class="text-center" v-if="(longitud(proced.tupaTusneDescripcion)<8)">N</td>                       
                <td class="text-center" v-if="(longitud(proced.preguntasFrecuentes)>=8)">S</td>                       
                <td class="text-center" v-if="(longitud(proced.preguntasFrecuentes)<8)">N</td>                                          
                <td class="text-center" v-if="(longitud(proced.tenerEnCuenta)>=8)">S</td>                       
                <td class="text-center" v-if="(longitud(proced.tenerEnCuenta)<8)">N</td>
                <td class="text-center"><label>{{proced.reqTramite.cantidadRequisitos}}</label></td>                       
              </tr>
              </tbody>
            </table>
            <div class="d-flex justify-content-center block">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="indice"
                :page-sizes="pageOptions"
                :page-size="pageSize"
                :hide-on-single-page="hide_on_single_page"
                layout="prev, pager, next, jumper, sizes, total"
                :total="(procedJson != null && procedJson != undefined && procedJson.length>0) ? procedJson[0].totalRegistros: 0">
              </el-pagination>
            </div>
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
      </el-row>
    </section>
  </div>
</template>

<script>
import axios from 'axios';
import Datepicker from 'vuejs-datepicker';
import Constantes from '../../store/constantes.js';
import VModal from 'vue-js-modal'
import { ModelSelect } from 'vue-search-select'
import moment from "moment";
import Axios from 'axios';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import TituloHeader from '../comun/TituloHeader';
export default {
  props:[
    'opcion'
  ],
  data(){
    return{
      isLoading: false,
      isDisabledNega: true,
      areaBuscar: localStorage.getItem('codUnidadLogueado')*1,
      listaAreas: null,
      listaDePermiso: null,
      permiso: true,
      // Filtros HEADER
      tipoTupaTusne: 0,
      flagPagoBusqueda: 0,


      certificadosJson:null,
      procedJson:null,
      citasTJson:null,
      listaParametrosAux:null,
      listaEstado:null,
      listaTipoDocumento:null,
      idTipodocumento:0,
      idEstado:0,
      idProcedimiento:0,
      numeroDocumentoModelo:'',
      numeroExpedienteModelo:'',
      anioExpedienteModelo:'',
      manzanaModelo:'',
      loteModelo:'',
      indice:1,
      limite:50,
      estadoReg:1,
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
      idCitaModal:0,
      valText:false,
      horaModal:'',
      motivoModal:'',
      dniModal:'',
      nombreModal:'',
      correoModal:'',
      descripcionModal:'',
      descripcionModalD:'',
      responsableModalD:'',
      responsableModal:'',
      minAten:'',
      horaAten:'',
      fecAten:'',
      areaSesion:localStorage.getItem('desUnidadLogueado'),
      usuSesion:localStorage.getItem('cuenta'),
      uniSesion:localStorage.getItem('codUnidadLogueado'),
      idUsuarioLogueado:localStorage.getItem('idUsuarioLogueado'),
      optionBackup: sessionStorage.getItem("idOpcion"),
      mapListaTipoTramite:[],
      itemTramite:0,
      permisoLectura: false,
      permisoEscritura: false,
      permisoEspecial: false,
      permisoSupervisor: false,
      appointment: {
        appointmet_date: new Date,
      },
      indice: 1,
      pageSize: 10,
      pageOptions: [10, 20, 50, 100],
      hide_on_single_page: true,
    }
  },
  created(){

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
  components: {
    Datepicker,
    ModelSelect,
    TituloHeader, 
    Loading,
  },
  methods:{ 
    handleSizeChange(val) {
      console.log(`${val} items per page`);
      this.pageSize = val
      this.getProcedxNumero();
    },
    handleCurrentChange(val) {
      console.log(`current page: ${val}`);
      this.paginaActual = val
      this.getProcedxNumero();
    },
    permisos(){
      this.opcion = (this.opcion == undefined) ? this.optionBackup : this.opcion;
      var url = Constantes.rutaAccesos+'permiso/getpermisobyid/'+this.opcion+'/'+this.idUsuarioLogueado
      console.log(url)
      if(this.opcion!=undefined || this.optionBackup!=null){
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
          this.ObtenerTipoTramite('');
          this.getProcedxNumero();
          this.getAreas();
        }).catch(e=>console.log(e))
      }else {
        this.Alerta('warning','SELECCIONE UNA OPCIÓN DEL MENÚ','');
        this.$router.push('/components/principal/bienvenido');
      }
    },
    getAreas(){
        // console.log('===============================================AQUI SE MUESTRA LA DATA===============================================');
        //TODO?: AQUI SE OBTIENE LA LISTA DE AREAS
        var url = Constantes.rutaTramite+"tramite-area/1"
        console.log(url)
        axios.get(url).then(response=>{
          this.listaAreas=response.data;
        }).catch(e=>console.log(e))
    },
    ObtenerTipoTramite(nombre){
      //TODO?: AQUI SE OBTIENE LA LISTA DE PROCEDIMIENTOS
      console.log(Constantes.rutaTramite+'tipotramite/'+this.reemplazaVacio(nombre)+'/'+this.areaBuscar);
      axios.get(Constantes.rutaTramite+'tipotramite/'+this.reemplazaVacio(nombre)+'/'+this.areaBuscar)
          .then(response=>{
            this.listaTipoTramite = null;
            this.listaTipoTramite=response.data.data;
            console.log('pintando tipotramite')
            console.log(response.data.data);
            console.log(this.listaTipoTramite);
            console.log(this.listaTipoTramite[0].nombre);
            var i=0;

            this.mapListaTipoTramite = [];

            while(i<this.listaTipoTramite.length){
                  var asunto={};

              console.log("LISTA DENTRO DE WHILE ===========");
                  asunto.value=this.listaTipoTramite[i].idTipoTramite;
                  asunto.text=this.listaTipoTramite[i].nombre;
                  this.mapListaTipoTramite.push(asunto);
                  i++;
              }

              console.log("LISTA MAPA ===========");
              console.log(this.mapListaTipoTramite);
        })
        .catch(e=>console.log(e))
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
    getProcedimientos(){    
      var url=Constantes.rutaTramite+'tipotramite/procedimiento/'+this.areaBuscar;
      console.log(url);              
                axios.get(url)
                    .then(response=>{
                    console.log(response);
                    this.procedJson=response.data.data;
                    var objeto=this.procedJson.data;
                    console.log('cantidad de certificados'+ this.procedJson.length);
                    this.listaPaginas=null
                    this.listaPaginas=[1];
                    var cantidadPaginas=0;
                    this.cantidadPaginasBandeja=0;
                    console.log('cantidad de páginas'+ cantidadPaginas);
                    if(this.procedJson.length>0){
                      console.log(this.procedJson[0].totalBandeja);
                      cantidadPaginas=Math.ceil(this.procedJson[0].totalBandeja/this.limite);
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
                    console.log('procedJson'+ procedJson);
                  })
                  .catch(e=>console.log(e))
                  },
    getProcedxNumero(){ 
      //TODO?: AQUI SE LISTAN LOS PROCEDIMIENTOS 
      console.log("Muestera chekbox")
      console.log(this.flagPagoBusqueda)  
      let objeto = {}
      objeto.indice = this.indice;
      objeto.limite = this.pageSize;
      objeto.codigo = this.reemplazaVacio(this.numeroDocumentoModelo);
      objeto.idTipoTramite = this.reemplazaVacioEntero(this.itemTramite);
      objeto.estado = this.estadoReg;
      objeto.idUnidadDb2 = this.areaBuscar;
      objeto.flagPagoBusqueda = this.flagPagoBusqueda;
      objeto.tipoTupaTusne = this.tipoTupaTusne;
      var url=Constantes.rutaTramite+'tipotramite/procedimiento-codigo'
      // var url=Constantes.rutaTramite+'tipotramite/procedimiento-codigo/'+this.areaBuscar+'/'+this.reemplazaVacio(this.numeroDocumentoModelo)+
      // '/'+this.estadoReg+'/'+this.itemTramite+'/'+this.flagPagoBusqueda+'/'+this.tipoTupaTusne;
      console.log(url);                 
        axios.post(url, objeto)
          .then(response=>{
          console.log(response);
          this.procedJson=response.data.data;
          var objeto=this.procedJson.data;
          console.log('cantidad de certificados'+ this.procedJson.length);
          this.listaPaginas=null
          this.listaPaginas=[1];
          var cantidadPaginas=0;
          this.cantidadPaginasBandeja=0;
          console.log('cantidad de páginas'+ cantidadPaginas);
          if(this.procedJson.length>0){
            console.log(this.procedJson[0].totalBandeja);
            cantidadPaginas=Math.ceil(this.procedJson[0].totalBandeja/this.limite);
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
        })
        .catch(e=>console.log(e))   
    },  
    Registro(){
        // this.$router.go({path:"/components/procedimientos/registrarprocedimiento"})
        let routeData = this.$router.resolve({path:'/components/procedimientos/registrarprocedimiento/'+this.areaBuscar});
        window.open(routeData.href,'_blank');
    }, 
    Editar(idProcedimiento){
                // this.$router.push('/components/procedimientos/editarprocedimiento/'+idProcedimiento)   
                let routeData = this.$router.resolve({path:'/components/procedimientos/editarprocedimiento/'+idProcedimiento+"/"+this.areaBuscar});
                window.open(routeData.href,'_blank');              
    },       
    PadLeft(value, length) {
            return (value.toString().length < length) ? PadLeft("0" + value, length) : value;
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
    .col-form-label{
      font-size: 13px;
    }
  }
</style>
