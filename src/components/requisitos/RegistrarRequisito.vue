<template>
  <div class="content-wrapper">
    <loading :active.sync="isLoading" :is-full-page="true" color="#007BFF"></loading>
    <titulo-header>Registro de Requisitos</titulo-header>
    <section class="content">
      <div class="row">
        <div class="col-sm-6">
          <div class="card menu">
            <el-row :gutter="10">
              <form style="padding: 20px">
                <!-- <div class="form-group col-12">
                  <div id="labelArea" class="col-md-3" style="padding-left: 0px; padding-right: 0px;">
                        <label for="defaultCheck2" >Unidad Orgánica</label>
                    </div>
                    
                    <div id="selectAreas" class="form-group col-md-12" style="padding-right:0px; padding-left: 0px;">
                        <select id="idAreaBucar" @change="ObtenerTipoTramite(nombreTipoTramite)" class="form-control" :disabled=isDisabledCombo v-model="areaBuscar">
                        <option v-for="areas of listaAreas" :key=areas.idArea :value="areas.idArea" >{{areas.nombreArea}}</option>
                        </select>
                    </div> 
                </div> -->
                <div class="form-group col-12">
                  <label for="exampleInputPassword1" >Procedimiento (*): </label>   
                                      <model-select :options="mapListaTipoTramite"
                                      v-model="itemTramite"
                                      :placeholder=placeHolder  >
                                      </model-select>
                </div>
                <div class="form-group col-12">
                  <div class="d-flex justify-content-between">
                    <label style=";padding-left:0px">Requisito (*): </label>
                    <a  disabled>Máx 150 caracteres</a>
                  </div>
                  <textarea class="form-control" id="exampleFormControlTextarea1" maxlength="150" rows="2" v-model="nombreReq"></textarea>           
                </div>
                <div class="form-group col-12">
                    <label for="exampleFormControlTextarea1" >Ayuda (*): </label>
                    <div class="editor" >
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
                </div>
                <div class="form-group col-11" >
                    <label for="exampleFormControlTextarea1">Formato: </label>
                    <div class="row form-group">
                        <div class="col-12 col-md-13">
                          <input type="file" id="file-input"  name="file-input"  class="form-control-file"  @change="onFileSelected" />
                        </div>
                      </div>
                </div>    
                <div class="form-group col-12">
                  <el-row :gutter="10">
                    <el-col :md="12">
                      <label for="exampleFormControlSelect1" >Orden (*): </label>
                      <el-input pattern="\d*" maxlength="2" v-model="ordenReg" @keypress.native="soloNumeros"/>                    
                    </el-col>
                    <el-col :md="12">
                      <div class="block text-center"><label class="block" >Es Obligatorio</label></div>
                      <div class="block text-center">
                        <el-checkbox type="checkbox" value="" v-model="flagObligatorio"  checked border></el-checkbox></div>
                    </el-col> 
                  </el-row>
                </div>  
                <div class="form-group col-sm-12" >
                  <div class="pt-2">
                    <el-button type="primary" class="btn-block"  @click.prevent="mostrarValor(); confirmarOperacion()">Grabar</el-button>
                  </div>  
                </div>  
              </form>
            </el-row>
          </div>
        </div>
      </div> 
    </section>
  </div>
</template>

<script>
import axios from "axios";
import Constantes from "../../store/constantes.js";
import moment from "moment";
import { ModelSelect } from 'vue-search-select';
import TituloHeader from '../comun/TituloHeader'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import { Editor, EditorContent, EditorMenuBar } from "tiptap";
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
  components:{
    ModelSelect,
    EditorMenuBar,
    EditorContent,
    TituloHeader, 
    Loading,
  },
  data() {
    return {
      autosize: { minRows: 2, maxRows: 4},
      isLoading: false,
      areaBuscar: this.$route.params.idArea,
      listaAreas: null,
      showModal: false,
      isDisabledCombo: false,
      observacion:'',
      labelArchivo:'Seleccione Archivo',
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
      mapListaTipoTramite:[],
      mapListaTipo:[],
      placeHolder: 'Seleccione un Servicio',
      listaReq:null,
      mapListaReq:[],
      nombreTipoTramite:'',
      listaTipoTramite:null,
      itemTramiteAnterior:0,
      itemTramite: 0,
      flagObligatorio:0,
      obligatorio:false,
      nombreReq:'',
      docReq:'',
      procedimientoReg:"",
      ordenReg:0,
      descripcionReg:"",
      tipodocReg:0,
      listaEstado:null,
      listaTipoDocumento:null,
      fechaReg: new Date,
      adjunto:null,
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
        content:  ' '          
        
      })
    };
  },
  mounted() {
    if (localStorage.getItem("logueado") == "true") {    
        this.getParametros(8);
        this.ObtenerTipoTramite(this.nombreTipoTramite);
        this.ObtenerTipoReq();
        this.mostrarCombo();
        this.FechaActual();
        this.getAreas();
    } else {
        this.$router.push("/auth/login/");
    }
  },
  beforeDestroy() {
    this.editor.destroy();
  },
  methods: {
    soloNumeros: function(event){
      var key = window.event ? event.which : event.keyCode;
      if(key == 8){
      }else if (key < 48 || key > 57) {
        event.preventDefault();
      }
    },
    mostrarValor(){
      console.log('===============================================AQUI SE MUESTRA LA DATA===============================================')
      console.log(this.itemTramite)
      console.log('===============================================AQUI SE MUESTRA LA DATA===============================================')
      console.log(this.placeHolder)
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
    mostrarCombo(){
       var elemento4 = document.getElementById("selectAreas");
       if(localStorage.getItem('idUsuarioLogueado') != 36416){
        //  elemento4.className += " divdisabled";
        this.isDisabledCombo = true;
       }
    },
    removeElement: function (index) {
      console.log('index eliminar observacion:'+index);
      this.listaObservaciones.splice(index, 1);
      this.ReorganizarIndicesObservaciones();
    },    
    reemplazaVacio(cadena,reemplazo){
      return cadena==''?'-':cadena;
    },
    reemplazaVacioEntero(cadena,reemplazo){
      return cadena==''?'0':cadena;
    },
    onFileSelected(event) {
      this.adjunto = event.target.files[0];
      this.labelArchivo=event.target.files[0].name;
      console.log(this.adjunto.name);
    },
    getParametros(grupo){
      axios.get(Constantes.rutaTramite+'parametro/'+grupo+'/0')
        .then(response=>{
        switch(grupo){
          case 8: 
            {
              console.log('examinando listaTipoDocumento');
              this.listaTipoDocumento=response.data.data;
              console.log(this.listaTipoDocumento);
            };
            break;
          case 11: 
            {
              console.log('examinando listaEstado'+grupo);
              this.listaEstado=response.data.data;
              this.idEstado=23;
            };
            break;
        }
        
      })
      .catch(e=>console.log(e))
    },
    confirmarOperacion() {
       
      if (this.nombreReq != '' && this.itemTramite != 0 && this.editor.getHTML() != '<p></p>' && this.ordenReg >= 0 ) {
        console.log("entro-u");
        console.log(this.ordenReg);
        console.log(this.editor.getHTML());
        this.$swal({
        title: 'Confirmación de registro',
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
    //   this.$router.push('/components/requisitos/bandejarequisitos')
      console.log("entro-02");
    },
    // 
    Guardar(){
      if(this.flagObligatorio==1){ this.obligatorio=true;
      } else{ this.obligatorio=false;
      }
      var url=Constantes.rutaTramite+'requisito-registro';
      console.log(url);
      var dataPost=new FormData();
      // dataPost.append('usuario',JSON.stringify(UsuarioGen));
      dataPost.append('idTipoTramite',this.itemTramite);
      dataPost.append('nombre',this.nombreReq);
      dataPost.append('ayuda',this.editor.getHTML());                
      //dataPost.append('idUnidad',this.areaBuscar);
      dataPost.append('idUnidad',0);
      dataPost.append('obligatorio',this.obligatorio);
      dataPost.append('orden',this.ordenReg);
      dataPost.append('idUsuario',localStorage.getItem('idUsuarioLogueado'));
      dataPost.append('fec', new Date);
      if (this.adjunto!=null){
        dataPost.append('documento',this.adjunto);
        dataPost.append('link',this.adjunto.name);
      }else{
        dataPost.append('link','');
      }
                
      console.log('datapost enviado');
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
              this.$router.push('/components/requisitos/editarrequisito/'+response.data.data+'/'+this.areaBuscar)
                //location.reload();
            } 
          })
      }).catch(e=>console.log(e))
    },
    ObtenerTipoTramite(nombre){
      //var url = Constantes.rutaTramite+'tipotramite/'+this.reemplazaVacio(nombre)+'/'+this.areaBuscar;
      var url = Constantes.rutaTramite+'tipotramite/'+this.reemplazaVacio(nombre)+'/0';
      console.log("=======================OBTENER TIPO TRAMITE================");
      console.log(this.$route.params.idProcedimiento)
      var parametroItem = this.$route.params.idProcedimiento
      console.log(url);
      axios.get(url).then(response=>{
          this.listaTipoTramite=response.data.data;
          console.log('pintando tipotramite')
          console.log(response.data.data);
          console.log(this.listaTipoTramite);
          console.log(this.listaTipoTramite[0].nombre);
          var i=0;
          this.mapListaTipoTramite = [];
          while(i<this.listaTipoTramite.length){
            var asunto={};
            if(this.listaTipoTramite[i].idTipoTramite == parametroItem){
              this.placeHolder=this.listaTipoTramite[i].nombre;
              this.itemTramite=this.listaTipoTramite[i].idTipoTramite;
            }
            asunto.value=this.listaTipoTramite[i].idTipoTramite;
            asunto.text=this.listaTipoTramite[i].nombre;
            this.mapListaTipoTramite.push(asunto);
            i++;
          }
      }).catch(e=>console.log(e))
    },
    ObtenerTipoReq(){
        console.log('ingreso obtener requisito');
        this.listaReq=null;
        this.mapListaReq=[];
            axios.get(Constantes.rutaTramite+'requisito-lista')
                    .then(response=>{
                      this.listaReq=response.data.data;
                      console.log('pintando area')
                      console.log(response.data.data);
                      console.log(response);
                      console.log(this.listaReq);
                      console.log(this.listaReq[0].idRequisito);
                      var i=0;
                      while(i<this.listaReq.length){
                            var area={};
                            area.value=this.listaReq[i].idRequisito;
                            area.text=this.listaReq[i].nombre;
                            this.mapListaReq.push(area);
                            i++;
                        }
                        if(this.listaReq.length==1){
                            // this.nombreReq=this.listaReq[0].idRequisito;
                        }
                  })
                  .catch(e=>console.log(e))
    },
    FechaActual(){
      this.fechaReg = this.customFormatter(new Date);
      console.log("fecha actual -->"+this.fechaReg);
    },
    customFormatter(date) {
            return moment(date).format('YYYY-MM-DD');
    },
    PadLeft(value, length) {
      return value.toString().length < length
        ? this.PadLeft("0" + value, length)
        : value;
    }
  }
  // ,
  //   watchOptions: {
  //       poll: true
  // }
};
</script>

<style lang="scss" scoped>
  .modal-backdrop {
      opacity: .5;
  }
  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 25px;
    background-color: #eee;
  }
  .menu {
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(49, 59, 160, 0.05);
    border: 1px solid #f2f4f8;
    padding: 20px;
    h5{
      color: #0078cf;
    }
  }
  .container {
    display: block;
    position: relative;
    padding-left: 35px;
    margin-bottom: 12px;
    cursor: pointer;
    font-size: 22px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .divdisabled {
      pointer-events: none;
      background  : grey ;
      opacity: 0.9;
  }
</style>