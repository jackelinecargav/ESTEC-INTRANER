<template>
  <div class="content-wrapper">
    <loading :active.sync="isLoading" :is-full-page="true" color="#007BFF"></loading>
    <titulo-header>Detalle de Requisito</titulo-header>
    <section class="content">
      <div class="row">
        <div class="col-12 col-sm-10 col-md-8 col-lg-6">
          <div class="card menu">
            <div >            
              <el-row :gutter="10" class="pb-2">
                  <label for="exampleFormControlTextarea1" >Procedimiento : </label>
                  <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="processonombre" disabled></textarea>
              </el-row>             
              <el-row :gutter="10" class="py-2">
                <div class="d-flex justify-content-between">
                  <label for="exampleFormControlTextarea1" >Requisito (*):</label>
                  <a for="exampleFormControlTextarea1" disabled>Máx 150 caracteres</a>
                </div>                   
                <textarea class="form-control" id="exampleFormControlTextarea1"  maxlength="150" rows="2" v-model="requisitoNombre" disabled></textarea>
              </el-row>
              <el-row :gutter="10" class="py-2">
                <label for="exampleFormControlTextarea1" >Ayuda (*): </label>
                  <!-- <textarea class="form-control" id="exampleFormControlTextarea1" rows="5" v-model="descripcionReg"></textarea> -->
                <div class="editor divdisabled" >
                  <div class="form-control">
                    <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
                      <div class="menubar">
                        <button :class="{ 'is-active': isActive.bold() }" @click="commands.bold">
                          <i class="fa fa-bold" aria-hidden="true"></i>
                        </button>
                        <button :class="{ 'is-active': isActive.italic() }" @click="commands.italic">
                          <i class="fa fa-italic" aria-hidden="true"></i>
                        </button>
                        <button :class="{ 'is-active': isActive.strike() }" @click="commands.strike">
                          <i class="fa fa-strikethrough" aria-hidden="true"></i>
                        </button>
                        <button :class="{ 'is-active': isActive.underline() }" @click="commands.underline">
                          <i class="fa fa-underline" aria-hidden="true"></i>
                        </button>
                        <button :class="{ 'is-active': isActive.paragraph() }" @click="commands.paragraph">
                          <i class="fa fa-paragraph" aria-hidden="true"></i>
                        </button>
                        <button :class="{ 'is-active': isActive.heading({ level: 1 }) }" @click="commands.heading({ level: 1 })">H1</button>
                        <button :class="{ 'is-active': isActive.heading({ level: 2 }) }" @click="commands.heading({ level: 2 })">H2</button>
                        <button :class="{ 'is-active': isActive.heading({ level: 3 }) }" @click="commands.heading({ level: 3 })">H3</button>
                        <button :class="{ 'is-active': isActive.bullet_list() }" @click="commands.bullet_list">
                          <i class="fa fa-list-ul" aria-hidden="true"></i>
                        </button>
                        <button :class="{ 'is-active': isActive.ordered_list() }" @click="commands.ordered_list">
                          <i class="fa fa-list-ol" aria-hidden="true"></i>
                        </button>
                        </div>
                    </editor-menu-bar>
                    <editor-content style="padding:7px" :editor="editor"/>                           
                  </div>
                </div>
              </el-row>
              <el-row :gutter="10" class="py-2">
                <el-col :md="8">
                  <label  >Orden (*): </label>
                  <input type="number" maxlength="2" class="form-control" v-model="ordenReg" disabled>
                </el-col>
                <el-col :md="8">
                  <label class="block" >Es Obligatorio</label> 
                  <div class="d-flex block justify-content-center"><el-checkbox border  v-model="requisitoObligatorio" disabled></el-checkbox></div> 
                </el-col>
                <el-col :md="8">
                  <label >Estado: </label>
                <select class="form-control" v-model="estadoReg" disabled>
                  <option v-if="requisitoIdParametro == 1" value="0">ACTIVO</option>
                  <option v-if="requisitoIdParametro == 2" value="1">INACTIVO</option>
                </select> 
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
      </div> 
    </section>
  </div>
</template>
<style>
.modal-backdrop {
    opacity: .5;
}
.divdisabled {
    pointer-events: none;
    opacity: 0.9;
}
</style>
<script>
import axios from "axios";
import Constantes from "../../store/constantes.js";
import moment from "moment";
import { ModelSelect } from 'vue-search-select';
import TituloHeader from '../comun/TituloHeader'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History
} from "tiptap-extensions";
export default {
  data() {
    return {
      //PARA PINTAR PANTALLA
      isLoading: false,
      processonombre: '',
      requisitoNombre: '',
      requisitoAyuda: '',
      requisitoLinkFormato: '',
      requisitoUrlMostrar: '',
      requisitoIdParametro: '',
      requisitoObligatorio: '',

      showModal: false,
      observacion:'',
      labelArchivoSec: "Seleccione Archivo",
      tipoTramite: "",
      solicitante: "",
      estado: "", 
      listaAdjuntos: null,
      listaObservaciones:null,
      listaObservacionesModelo:[],
      idTramite: 0,
      usuarioPost: {},
      usuarioCreador:{},
      esPrincipal: false,
      estiloDisplayAprobar: "block",
      estiloDisplayDesestimar: "block",
      estiloDisplayVer: "none",
      estiloDisplayObservar:"block",
      urlDescargaConstancia: "",
      idObservacion:0,
      mensajeDesestimacion:"",
      listaRequisitoModelo:null,
      ayudaRequisito:"",
      nombreRequisitoModal:"",
      procedimientoReg:"",
      descripcionReg:"",
      tipodocReg:0,
      estadoReg:0,
      ordenReg:'',
      tupaTusneModelo:'',
      id014Modelo:'',
      mapListaReq:[],
      codigoModelo:'',
      subCodigoModelo:0,
      flagPagoModelo:false,
      listaEstado:null,
      flagObligatorioModelo:false,
      listaTipo:null,
      itemReq:'',
      flagObligatorio:0,
      obligatorio:false,
      listaTipoDocumento:null,
      procedEdit:null,
      adjunto:null,
      editor: null,
      flagGratuito:0,
      urlDescarga:'',
      linkDocumento:'',
      editor: new Editor({
        extensions: [
          new Blockquote(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new BulletList(),
          new OrderedList(),
          new ListItem(),
          new TodoItem(),
          new TodoList(),
          new Bold(),
          new Code(),
          new Italic(),
          new Link(),
          new Strike(),
          new Underline(),
          new History()
        ],
        autofocus: false,
        content:  false       
        
      })
    };
  },
  beforeDestroy() {
    this.editor.destroy();
  },
  mounted() {    
    if (localStorage.getItem("logueado") == "true") {    
        // this.getParametros(8);
        // this.getParametros(15);
        // this.getParametros(14);
        // this.getReqEditar();
        this.FechaActual();
        this.ObtenerTipoReq();
        console.log("SE OBTIENE EL PARAMETRO ")
        console.log(this.$route.params.idRequisito)
    } else {
        this.$router.push("/auth/login/");
    }
  },
  components:{
    ModelSelect,
    EditorMenuBar,
    TituloHeader,
    Loading,
    EditorContent
  },
  methods: {    
    removeElement: function (index) {
      console.log('index eliminar observacion:'+index);
      this.listaObservaciones.splice(index, 1);
      this.ReorganizarIndicesObservaciones();
    },
    buscarRequisito(){
        for(var requisitos of this.listaReq){
        // for(var requisitos = 0; requisitos){
            this.processonombre = requisitos.tipoTramite.nombre
            this.requisitoNombre = requisitos.requisito.nombre
            this.requisitoAyuda= requisitos.ayuda
            this.editor.setContent(requisitos.ayuda)
            this.ordenReg= requisitos.orden
            this.requisitoLinkFormato= requisitos.linkFormato
            this.requisitoUrlMostrar= `${Constantes.entidadArchivo}/5/${requisitos.idRequisitoTramite}/0`
            console.log(this.requisitoLinkFormato)
            this.requisitoIdParametro= requisitos.id001Estado.idParametro
            this.requisitoObligatorio= requisitos.requisito.flagObligatorio
        }
    },
    ObtenerTipoReq(){
        console.log('ingreso obtener requisito');
        this.listaReq=null;
        this.mapListaReq=[];
        // var url = Constantes.rutaTramite+'requisito-lista'
        var url=Constantes.rutaTramite+'requisito-codigo/0/0/'+this.$route.params.idTipoTramite+'/'+this.$route.params.idRequisito+'/0';
        console.log(url)
        console.log('SE PINTO URL ');
        axios.get(url)
                .then(response=>{
                    this.listaReq=response.data.data;
                    console.log('AQUI SE MUESTRA LISTAREQ')
                    console.log(this.listaReq)
                    this.buscarRequisito()
                })
                .catch(e=>console.log(e))
    },
    getReqEditar(){    
      var url=Constantes.rutaTramite+'requisito-codigo/0/0/'+this.$route.params.idTipoTramite+'/'+this.$route.params.idRequisito+'/0';
      var URL_SERVICIO_RECUPERA = `${Constantes.entidadArchivo}/5/`;
      console.log(url);               
                axios.get(url)
                    .then(response=>{
                    console.log(response);
                    this.procedJson=response.data.data;
                    console.log("json----->"+this.procedJson);
                    console.log("entro");
                    this.tupaTusneModelo = response.data.data[0].tipoTramite.tupaTusne;
                    this.id014Modelo = response.data.data[0].tipoTramite.id014Tramite;
                    this.codigoModelo = response.data.data[0].tipoTramite.codigo;  
                    this.subCodigoModelo = response.data.data[0].tipoTramite.codSubConcepto;  
                    this.procedimientoReg = response.data.data[0].tipoTramite.nombre;
                    this.tipodocReg = response.data.data[0].tipoTramite.id008EquivalenciaOracle;
                    // this.descripcionReg = response.data.data[0].requisito.ayuda;
                    this.estadoReg = response.data.data[0].id001Estado.idParametro;
                    this.flagPagoModelo = response.data.data[0].tipoTramite.flagRequierePago;
                    this.flagObligatorioModelo = response.data.data[0].requisito.flagObligatorio;
                    if(this.flagObligatorioModelo == true){
                          this.flagObligatorio = 1;                          
                    }else{
                          this.flagObligatorio = 0;
                    }
                    if (this.codigoModelo!=null && this.codigoModelo!='' ){
                      this.procedimientoReg = this.codigoModelo +' - '+response.data.data[0].tipoTramite.nombre;
                    }
                    if (this.codigoModelo!=null && this.codigoModelo!='' &&  this.subCodigoModelo!=null && this.subCodigoModelo!=0){
                      this.procedimientoReg = this.codigoModelo +' - '+this.subCodigoModelo+' '+ response.data.data[0].tipoTramite.nombre;
                    }
                    console.log("flag----Z>"+this.flagObligatorioModelo);
                    console.log("valor para botón--->"+this.flagObligatorio);
                    this.ordenReg = response.data.data[0].orden;
                    this.itemReq = response.data.data[0].requisito.nombre;
                    this.editor.setContent(response.data.data[0].ayuda);
                    console.log("paso22222222222222222222222");
                    console.log(response.data.data[0].requisito.ayuda);
                    this.urlDescarga = response.data.data[0].linkFormato;
                    if ( response.data.data[0].linkFormato != null && response.data.data[0].linkFormato != ''){
                          this.linkDocumento = URL_SERVICIO_RECUPERA+this.$route.params.idRequisito+'/0'
                    }                    
                    // this.labelArchivoSec= response.data.data[0].linkFormato;
                    console.log("paso1111111111111111111111111111111111");    
                    // console.log(this.id014Modelo);       
                    console.log(this.urlDescarga);
                    console.log("nombre procedimiento" +this.procedimientoReg); 

                    })
                  .catch(e=>console.log(e))   
                             
    },  
    confirmarOperacion() {
        if (this.editor.getHTML() != '<p></p>' && this.itemReq != '' && this.ordenReg >= 0 )  {
          console.log(this.editor.getHTML());
            this.$swal({
            title: 'Confirmación de actualización',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar',
            showCloseButton: true,
            showLoaderOnConfirm: true
            }).then((result) => {
            if(result.value) {                
                // this.RegistrarReq();
                this.Guardar();
            } 
            })
        }else{
          this.$swal({
          icon: "error",
          title: "Error",
          text: "Ingresar datos obligatorios (*)."
        });
      } 
    },
    Guardar(){
            this.$swal({
              title: "Guardando...",
              onOpen: () => {
                this.$swal.showLoading();
              }
            });
            if(this.flagObligatorio==1){ this.obligatorio=true;
            } else{ this.obligatorio=false;
            }
            console.log("flag--------->"+this.flagObligatorio);
            console.log("valor de campo--->"+this.obligatorio);

            var url=Constantes.rutaTramite+'requisito-edicion';
            console.log(url);
                var dataPost=new FormData();
                dataPost.append('idTipoTramite',this.$route.params.idRequisito);
                dataPost.append('nombre',this.itemReq);
                dataPost.append('ayuda',this.editor.getHTML());
                console.log(this.editor.getHTML());
                if (this.adjunto!=null){
                    dataPost.append('link',this.adjunto.name);
                    dataPost.append('documento',this.adjunto);
                }else{
                    dataPost.append('link',this.urlDescarga);  
                    dataPost.append('documento',null);  
                }                
                dataPost.append('obligatorio',this.obligatorio);
                dataPost.append('orden',this.ordenReg);
                dataPost.append('estado',this.estadoReg);
                dataPost.append('idUsuario',localStorage.getItem('idUsuarioLogueado'));
                dataPost.append('fec', new Date);                
                console.log('datapost enviado ---->flag'+this.obligatorio);
                console.log(dataPost);
                axios.post(url,dataPost)
                     .then(response=>{
                      console.log('pintando respuesta servicio guardar usuario');
                      console.log(response);
                      this.$swal({
                        title: 'Registro exitoso',
                        icon: 'success',
                        confirmButtonText: 'OK',   
                        showLoaderOnConfirm: true
                        }).then((result) => {
                        if(result.value) {                
                            location.reload();
                        } 
                        })
                  })
                  .catch(e=>console.log(e))
    },
    FechaActual(){
      this.fechaReg= this.customFormatter(new Date)
    },
    customFormatter(date) {
            return moment(date).format('YYYY-MM-DD');
    },
    onFileSelected(event) {
      this.adjunto = event.target.files[0];
      console.log(event.target.files[0]);
    },
    PadLeft(value, length) {
      return value.toString().length < length
        ? this.PadLeft("0" + value, length)
        : value;
    }
  }
};
</script>