<template>
  <div class="content-wrapper">
    <loading :active.sync="isLoading" :is-full-page="true" color="#007BFF"></loading>
    <titulo-header>Edición de Procedimiento</titulo-header>
    <section class="content">
      <el-row :gutter="10">
        <div class="card menu">
          <el-row :gutter="10">
            <el-col :md="12" >
              <div class="form-group col-md-12"> 
                <el-row :gutter="10" class="d-flex">
                  <el-col :md="4">
                    <label class="col-form-label">Gratuito</label>
                  </el-col>
                  <el-col :md="6" class="d-flex align-middle">
                    <el-checkbox style="margin: auto" :checked="this.flagPagoModelo ? false : true" disabled ></el-checkbox>                
                  </el-col>
                  <el-col :md="6" class="ml-auto">
                    <label class="col-form-label">Número (*) : </label>
                  </el-col>
                  <el-col :md="6">
                    <input class="form-control" type="number" maxlength="2" id="numero" v-model="numeroReg">
                  </el-col>
                </el-row>
              </div>   
              <div class="form-group col-md-12">
                <el-row :gutter="10">
                  <el-col :md="24">
                    <label >
                      <template v-if="id014Modelo == 33">TUSNE: {{codigoModelo}}</template>
                      <template v-else-if="id014Modelo == 34">TUPA: {{codigoModelo}}</template>
                      <template v-else>No Aplica</template>
                      </label>
                  </el-col>
                  <el-col :md="24">
                    <el-input type="textarea" :autosize="autosize" v-model="tupaTusneModelo"></el-input>
                  </el-col>
                </el-row>
              </div> 
              <div class="form-group col-md-12">
                  <label for="exampleFormControlTextarea1" >Procedimiento (*) : </label>
                  <el-input type="textarea" :autosize="autosize" v-model="procedimientoReg"></el-input>
              </div>
              <div class="form-group col-md-12">
                  <label for="exampleFormControlTextarea1" >Descripción (*) : </label>
                  <el-input type="textarea" :autosize="autosize" v-model="descripcionReg"></el-input>
              </div>
              <div class="form-group col-md-12">
                <el-row :gutter="10" class="d-flex">
                  <el-col :md="8">
                    <label >Tipo Documento (*) : </label>
                      <select class="form-control" v-model="tipodocReg">                        
                        <option v-for="tipoDocumento of listaTipoDocumento" :key=tipoDocumento.idParametro :value="tipoDocumento.idParametro" >{{tipoDocumento.nombre}}</option>
                      </select>
                  </el-col>
                  <el-col :md="8">
                    <el-row :gutter="10" class="">
                      <el-col :md="24" class="text-center">
                        <label class="block" >On-Line</label>                    
                      </el-col>
                      <el-col :md="24" class="d-flex">
                        <el-checkbox class="block" style="margin: auto" type="checkbox" v-model="flagOnline"></el-checkbox>         
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :md="8">
                    <label>Estado (*) : </label>
                    <select class="form-control" v-model="estadoReg">
                      <option value="1">ACTIVO</option>
                      <option value="2">INACTIVO</option>
                    </select>
                  </el-col>
                </el-row>
              </div> 
              <div class="form-group col-md-12">
                <div class="row">
                  <div class="col-sm-12">
                    <h5 class="my-4">Calificación</h5>
                  </div>
                </div>
                <el-row :gutter="10">
                  <el-col :md="8">
                    <label >Automático</label>
                    <select class="form-control col-12" style="position:relative;top:-2px" @change="automatico" v-model="automaticoReg">
                      <option value="0">NO DEFINIDO</option>
                      <option value="1">SI</option>
                      <option value="2">NO</option>
                    </select>
                  </el-col>
                  <el-col :md="8">
                    <label class="col-sm-12" >Positivo </label>
                    <select class="form-control col-12" :disabled=isDisabledPosi @change="positivo" style="position:relative;top:-2px" v-model="positivoReg">
                      <option value="0">NO DEFINIDO</option>
                      <option value="1">SI</option>
                      <option value="2">NO</option>
                    </select>
                  </el-col>
                  <el-col :md="8">
                    <label class="col-sm-12" >Negativo</label>
                    <select class="form-control col-12" :disabled=isDisabledNega @change="negativo" style="position:relative;top:-2px" v-model="negativoReg">
                      <option value="0">NO DEFINIDO</option>
                      <option value="1">SI</option>
                      <option value="2">NO</option>
                    </select>
                  </el-col>
                </el-row>
              </div>
              <div class="form-group col-md-12">
                <div class="row">
                  <div class="col-sm-12">
                    <h5 class="my-4">Plazo : (Dias Hábiles)</h5>
                  </div>
                </div>
                <el-row :gutter="10" class="d-flex justify-content-center">
                  <el-col :md="12" class="">
                    <label  style="font-size:14px;">Plazo Resolver {{obligatorio}}</label>
                    <input class="form-control" id="plazoResolver" type="number" :disabled=isDisabledResolver v-model="plazoResReg">
                  </el-col>
                  <el-col :md="12">
                    <label class="" style="font-size:14px;">Plazo Excepcional {{obligatorio}}</label>
                    <input class="form-control" id="plazoExcepcional" type="number" :disabled=isDisabledExcepcional v-model="plazoExReg">
                  </el-col>
                </el-row>
              </div>
            </el-col>
            <el-col :md="12">
              <div id="divDesabilitarNoTupaTusne1" class="form-group col-md-12">
                    <label for="baseLegalTxt" >Base Legal </label>
                    <!-- <textarea class="form-control" :disabled="this.flagPagoModelo ? false : true" id="baseLegalTxt" rows="3" v-model="baseLegalModelo"></textarea> -->
                    <div class="editor" style="max-width: 750px">
                        <div class="form-control">
                            <editor-menu-bar :editor="editorBase" v-slot="{ commands, isActive }">
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
                            <editor-content style="padding:7px" :editor="editorBase"/>                           
                        </div>
                  </div>
              </div> 
              <div id="divDesabilitarNoTupaTusne2" class="form-group col-md-12">
                    <label for="especificacionTxt" style>Especificación TUPA/TUSNE </label>
                    <!-- <textarea class="form-control" :disabled="this.flagPagoModelo ? false : true" id="especificacionTxt" rows="3" v-model="especificacionModelo" outlined shaped auto-grow></textarea>                     -->
                    <div class="editor" style="max-width: 750px">
                        <div class="form-control">
                            <editor-menu-bar :editor="editor"  v-slot="{ commands, isActive }">
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
                              <editor-content style="padding:7px" :disabled="this.flagPagoModelo ? false : true" :editor="editor"/>
                        </div>
                      </div>
              </div>
              <div id="divDesabilitarNoTupaTusne3" class="form-group col-md-12">
                    <label for="especificacionTxt" style>Preguntas Frecuentes </label>
                    <!-- <textarea class="form-control" :disabled="this.flagPagoModelo ? false : true" id="especificacionTxt" rows="3" v-model="especificacionModelo" outlined shaped auto-grow></textarea>                     -->
                    <div class="editor" style="max-width: 750px">
                        <div class="form-control">
                            <editor-menu-bar :editor="editorPreguntas"  v-slot="{ commands, isActive }">
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
                              <editor-content style="padding:7px" :disabled="this.flagPagoModelo ? false : true" :editor="editorPreguntas"/>
                        </div>
                      </div>
              </div>
              <div id="divDesabilitarNoTupaTusne4" class="form-group col-md-12">
                    <label for="especificacionTxt" style>Tenga en Cuenta </label>
                    <!-- <textarea class="form-control" :disabled="this.flagPagoModelo ? false : true" id="especificacionTxt" rows="3" v-model="especificacionModelo" outlined shaped auto-grow></textarea>                     -->
                    <div class="editor" style="max-width: 750px">
                        <div class="form-control">
                            <editor-menu-bar :editor="editorTengaEnCuenta"  v-slot="{ commands, isActive }">
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
                              <editor-content style="padding:7px" :disabled="this.flagPagoModelo ? false : true" :editor="editorTengaEnCuenta"/>
                        </div>
                      </div>
              </div>
              <div class="form-group col-md-12">
                <el-row :gutter="10" class="d-flex justify-content-end">                      
                  <div class="col-sm-6">
                    <el-button type="primary" class="btn-block" style=" text-align: center" @click.prevent="confirmarOperacion()">Grabar</el-button>
                  </div>                      
                </el-row>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-row> 
    </section>
  </div>
</template>

<script>
import axios from "axios";
import Constantes from "../../store/constantes.js";
import moment from "moment";
import { Editor, EditorContent, EditorMenuBar } from "tiptap";
import TituloHeader from '../comun/TituloHeader'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
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
      autosize: { minRows: 2, maxRows: 4},
      isLoading: false,
      buttonGrabar: false,
      flagOnline: '',
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
      //FILTROS DE REGISTRO ANIADIDOS
      automaticoReg: 0,
      positivoReg: 0,
      negativoReg: 0,
      nroDiasReg: '', 
      procedimientoReg:"",
      numeroReg:'',
      descripcionReg:"",
      tipodocReg:0,
      estadoReg:0,
      isDisabledPosi: true,
      isDisabledNega: true,
      isDisabledResolver: true,
      isDisabledExcepcional: true,
      plazoExReg: '',
      plazoResReg: '',
      //OLBIGATORIO PINTA UN * en negativo y positivo
      obligatorio:'',
      tupaTusneModelo:'',
      id014Modelo:'',
      codigoModelo:'',
      flagPagoModelo:false,
      especificacionModelo:'',
      baseLegalModelo:'',
      listaEstado:null,
      listaTipo:null,
      codSubConcepto:0,
      listaTipoDocumento:null,
      procedEdit:null,
      fechaReg: new Date,
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
        
      }),
      editorBase: new Editor({
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
      }),
      editorTengaEnCuenta: new Editor({
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
      }),
      editorPreguntas: new Editor({
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
  beforeDestroy() {
    this.editor.destroy();
    this.editorBase.destroy();
    this.editorPreguntas.destroy();
    this.editorTengaEnCuenta.destroy();
  },
  mounted() {
    this.getValorRichte();
    
    if (localStorage.getItem("logueado") == "true") {    
        this.getParametros(8);
        this.getParametros(15);
        this.getParametros(14);
        this.getProcedEditar();
        this.FechaActual();
    } else {
        this.$router.push("/auth/login/");
    }
  },
  components: {
    EditorMenuBar,
    TituloHeader,
    Loading,
    EditorContent
  },
  methods: {   
    automatico(){
      console.log("HABILIDA CAMPOS")
      if(this.automaticoReg==2){
        this.isDisabledPosi=false
        this.isDisabledNega=false
        
        
      }else if (this.automaticoReg!=2){
        this.isDisabledPosi=true
        this.isDisabledNega=true
        this.positivoReg=0
        this.negativoReg=0
        plazoResolver.style.backgroundColor = '#EBEDEF';
        plazoExcepcional.style.backgroundColor = '#EBEDEF';
        this.plazoResReg=''
        this.plazoExReg=''
      }
    },
    positivo(){
      console.log("HABILIDA posi")
      if(this.positivoReg==1){
        this.negativoReg=2
        this.isDisabledNega=false
        this.obligatorio="(*)"
        this.isDisabledExcepcional=false
        this.isDisabledResolver=false
        plazoResolver.style.backgroundColor = '#fff';
        plazoExcepcional.style.backgroundColor = '#fff';
      }
      else if(this.positivoReg==2){
        this.negativoReg=1
        this.isDisabledNega=false
        this.isDisabledPosi=false
        this.obligatorio="(*)"
        this.isDisabledExcepcional=false
        this.isDisabledResolver=false
        plazoResolver.style.backgroundColor = '#fff';
        plazoExcepcional.style.backgroundColor = '#fff';
      }else if(this.positivoReg==0){
        this.isDisabledPosi=false
        this.isDisabledNega=false
        this.negativoReg=0
        this.obligatorio=""
        this.isDisabledExcepcional=true
        this.isDisabledResolver=-true
        plazoResolver.style.backgroundColor = '#EBEDEF';
        plazoExcepcional.style.backgroundColor = '#EBEDEF';
      }
    },
    negativo(){
      console.log("HABILIDA nega")
      if(this.negativoReg==1){
        this.positivoReg=2
        this.isDisabledPosi=false
        this.isDisabledNega=false
        this.obligatorio="(*)"
        this.isDisabledExcepcional=false
        this.isDisabledResolver=false
        plazoResolver.style.backgroundColor = '#fff';
        plazoExcepcional.style.backgroundColor = '#fff';
      }
      else if(this.negativoReg==2){
        this.positivoReg=1
        this.isDisabledNega=false
        this.isDisabledPosi=false
        this.obligatorio="(*)"
        this.isDisabledExcepcional=false
        this.isDisabledResolver=false
        plazoResolver.style.backgroundColor = '#fff';
        plazoExcepcional.style.backgroundColor = '#fff';
      }else if(this.negativoReg==0){
        this.isDisabledPosi=false
        this.isDisabledNega=false
        this.positivoReg=0
        this.obligatorio=""
        this.isDisabledExcepcional=true
        this.isDisabledResolver=true
        plazoResolver.style.backgroundColor = '#EBEDEF';
        plazoExcepcional.style.backgroundColor = '#EBEDEF';
      }
    },
    getValorRichte(){
      console.log("editor--->"+ this.editor.articleContent);
      console.log(this.editor.getHTML());
    },
    removeElement: function (index) {
      console.log('index eliminar observacion:'+index);
      this.listaObservaciones.splice(index, 1);
      this.ReorganizarIndicesObservaciones();
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
            case 15: 
              {
                console.log('examinando listaEstado'+grupo);
                this.listaEstado=response.data.data;
                console.log(this.listaEstado);
                // this.idEstado=23;
              };
              break;
            case 14: 
              {
                console.log('examinando listaEstado111'+grupo);
                this.listaTipo=response.data.data;
                console.log("lista"+this.listaTipo);
                console.log(response);
                console.log('AQUI SE PINTA 014')
                this.id014Modelo = this.listaTipo[0].NOMBRE;
                console.log(this.id014Modelo)
                // this.idEstado=23;
              };
              break;  
          }
          
        })
      .catch(e=>console.log(e))
    },
    getProcedEditar(){    
      var url=Constantes.rutaTramite+'tipotramite/procedimiento-id/'+this.$route.params.idProcedimiento+'/'+this.$route.params.idArea;
      console.log(url);               
      axios.get(url).then(response=>{
        console.log("------------>"+url);
        this.procedJson=response.data.data;
        console.log(this.procedJson);
        this.tupaTusneModelo = response.data.data[0].tupaTusne;
        this.id014Modelo = response.data.data[0].id014Tramite;
        this.codigoModelo = response.data.data[0].codigo;
        console.log("AQUI SE MUESTRA ID 014 TRAMITE")
        console.log(this.id014Modelo)
        //ESTA CONDICIONAL SIRVE PARA BOLOQUEAR EL div ENVIARNDO CLASES
        // if((this.id014Modelo < 33) || (this.id014Modelo > 34)){
          
        //   var elemento1 = document.getElementById("divDesabilitarNoTupaTusne1");
        //   var elemento2= document.getElementById("divDesabilitarNoTupaTusne2");
        //   var elemento3 = document.getElementById("divDesabilitarNoTupaTusne3");
        //   var elemento4 = document.getElementById("divDesabilitarNoTupaTusne4");
        //    elemento1.className += " divdisabled";
        //    elemento2.className += " divdisabled";
        //    elemento3.className += " divdisabled";
        //    elemento4.className += " divdisabled";
        // }
        this.procedimientoReg = response.data.data[0].nombre;
        this.numeroReg = response.data.data[0].tTramite.numero;
        if(this.numeroReg==0)this.numeroReg="" 
        this.tipodocReg = response.data.data[0].id008EquivalenciaOracle;
        this.descripcionReg = response.data.data[0].descripcion;
        this.estadoReg = response.data.data[0].id001Estado;
        this.flagPagoModelo = response.data.data[0].flagRequierePago;
        this.flagOnline = response.data.data[0].flagOnLine;
        this.automaticoReg=response.data.data[0].tTramite.automatico
        this.positivoReg=response.data.data[0].tTramite.automaticoPositivo
        this.negativoReg=response.data.data[0].tTramite.automaticoNegativo
        this.plazoResReg=response.data.data[0].tTramite.plazoResolver
        // this.
        this.plazoExReg=response.data.data[0].tTramite.plazoExcepcional
          if(this.automaticoReg==2){
            this.isDisabledPosi=false
            this.isDisabledNega=false 
            if(this.positivoReg==1){
              this.isDisabledPosi=false 
              this.isDisabledExcepcional=false 
              this.isDisabledResolver=false
              plazoResolver.style.backgroundColor = '#fff';
              plazoExcepcional.style.backgroundColor = '#fff';}
            if(this.negativoReg==1){
              this.isDisabledNega=false
              this.isDisabledExcepcional=false 
              this.isDisabledResolver=false
              plazoResolver.style.backgroundColor = '#fff';
              plazoExcepcional.style.backgroundColor = '#fff';}
          }
        this.baseLegalModelo = response.data.data[0].baseLegal;
        this.especificacionModelo = response.data.data[0].tupaTusneDescripcion;
        this.editorBase.setContent(response.data.data[0].baseLegal);
        this.editor.setContent(response.data.data[0].tupaTusneDescripcion);
        this.editorPreguntas.setContent(response.data.data[0].preguntasFrecuentes);
        this.editorTengaEnCuenta.setContent(response.data.data[0].tenerEnCuenta);

        this.codSubConcepto = response.data.data[0].codSubConcepto;
        if (this.codSubConcepto !=null && this.codSubConcepto != 0){
            this.codigoModelo = response.data.data[0].codigo+' - '+this.codSubConcepto; 
        }
        if(response.data.data[0].baseLegal == 'null'){
          this.baseLegalModelo = '';                      
        }
        if(response.data.data[0].tupaTusneDes == 'null'){
          this.especificacionModelo = '';                      
        }
        console.log("paso");    
        // console.log(this.id014Modelo);          

        })
      .catch(e=>{
        console.log(e);
        alert("Error")
      })
    },  
    confirmarOperacion() {
      console.log("entro a funcion confirmaroperacion.")
      
        if(this.positivoReg!=0||this.negativoReg!=0){if(this.plazoResReg<=0 || this.plazoResReg.length ==""){return alert("PLAZO A RESOLVER NO TIENE UN DATO VÁLIDO")}}
        if(this.procedimientoReg==''){return alert("INGRESAR PROCEDIMIENTO") }
        if(this.descripcionReg==''){return alert("INGRESAR DESCRIPCION") }
        if(this.tipodocReg==0){return alert("DOCUMENTO REGISTRO VALIDO") }
        if(this.estadoReg==0){return alert("DOCUMENTO ESTADO VALIDO") }
        //if(this.numeroReg==0){return alert("NUMERO VALIDO") }
        // if(this.plazoResReg.length==0)this.plazoResReg=null;
        // if(this.plazoExReg.length==0)this.plazoExReg=null;
        console.log("entro a funcion confirmaroperacion paso 2.")
        console.log(this.numeroReg)
        console.log(this.numeroReg.length)
        if(this.plazoResReg =="")this.plazoResReg=0
        if(this.plazoExReg =="")this.plazoExReg=0
        if(this.id014Modelo == 33 || this.id014Modelo == 34){
          if ( this.numeroReg > 0 )  {
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
                      this.RegistrarProc();
                      // this.$swal('Registrado', 'Registro correcto', 'success')
                  } 
                  })
            }else{
                this.$swal({
                icon: "error",
                title: "Error",
                text: "Ingresar datos obligatorios (*)."
              });
            } 
          } else {
          if ( this.estadoReg != 0 )  {
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
                    this.RegistrarProc();
                    // this.$swal('Registrado', 'Registro correcto', 'success')
                } 
                })
            }else{
              this.$swal({
              icon: "error",
              title: "Error",
              text: "Ingresar datos obligatorios (*)."
            });
          } 
        }
    },
    RegistrarProc() {
      console.log("entro a funcion REgistrarProc.")
      console.log(this.numeroReg)
      if(this.numeroReg=="")this.numeroReg=0
      console.log(this.numeroReg)
      console.log(this.positivoReg)//q
      console.log(this.negativoReg)//2
      console.log(this.plazoResReg)//3
      console.log(this.plazoExReg)//0
      if (this.procedimientoReg != '' && this.descripcionReg != '' && this.tipodocReg != 0 && this.estadoReg != 0 ) {      
      this.$swal({
        title: "Guardando...",
        onOpen: () => {
          this.$swal.showLoading();
        }
      });
      var url=Constantes.rutaTramite+'tipotramite/procedimiento-edicion';
        console.log(url);
        var dataPost=new FormData();
        var tipoTramite = {};
        tipoTramite.nombre=this.procedimientoReg;
        tipoTramite.idTipoTramite = this.$route.params.idProcedimiento;
        tipoTramite.descripcion = this.descripcionReg;
        tipoTramite.id001Estado = this.estadoReg;
        tipoTramite.numero = this.numeroReg;
        tipoTramite.flagOnLine = this.flagOnline;
        tipoTramite.automatico=this.automaticoReg;
        tipoTramite.automaticoPositivo=this.positivoReg;
        tipoTramite.automaticoNegativo=this.negativoReg;
        tipoTramite.plazoResolver=this.plazoResReg;
        tipoTramite.plazoExcepcional=this.plazoExReg;
        tipoTramite.id008EquivalenciaOracle = this.tipodocReg;
        tipoTramite.idUsuarioMod = localStorage.getItem('idUsuarioLogueado');
        tipoTramite.baseLegal = this.editorBase.getHTML();
        tipoTramite.tupaTusneDes = this.editor.getHTML();
        tipoTramite.tenerEnCuenta=this.editorTengaEnCuenta.getHTML();
        tipoTramite.preguntasFrecuentes=this.editorPreguntas.getHTML();

            dataPost.append('tipoTramite',JSON.stringify(tipoTramite) );
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
                        location.reload();
                    } 
                    })
              })
        
        .catch(e => console.log(e));
      }else{
          this.$swal({
          icon: "error",
          title: "Error",
          text: "Ingresar campos obligatorios (*)."
        });
      }  
      // this.$router.push('/components/procedimientos/bandejaprocedimientos')
      // location.reload();
    },
    
    FechaActual(){
      this.fechaReg= this.customFormatter(new Date)
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
};
</script>
<style lang="scss" scoped>
  .menu {
    h5{
      color: #0078cf;
    }
  }
  .modal-backdrop {
      opacity: .5;
  }
  .divdisabled {
    pointer-events: none;
    opacity: 0.9;
  }
</style>