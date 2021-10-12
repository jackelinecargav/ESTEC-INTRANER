<template>
  <div class="content-wrapper">
        <section class="content-header">
            <div class="container-fluid">
                <div class="row mb-2" style="padding-left:20px "> 
                  <div class="col-sm-10">
                      <div class="row"> 
                        <h4>
                            <b>Consulta SUNAT</b>
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
                              <label><b>Documento a consultar</b></label><input class="form-control" v-model="docConsulta" @keypress="isNumber($event)" placeholder="Ingrese número de documento" maxlength="11">
                            </div>
                        </div>
                        <div class="col-xs-12 col-md-4 pl-4 col-lg-3">
                            <p style="line-height:0px;margin-top:12px">&nbsp;</p>
                            <button class="btn btn-primary" @click.prevent="consultaSunat()">Buscar</button>
                            <el-button type="info" @click.prevent="limpiarCampoFiltro" plain style="padding: 10px 16px"><img src="../../images/icon_eraser.png" alt="" srcset="" width="15"> </el-button>
                        </div>
                    </div>  
                </div>        
                <div class="container" style="margin-left:0px" v-if="boolSunat"> 
                    <div class="row">
                      <div class="col-xs-12 col-md-12 col-lg-12">  
                        <hr/> 
                          <b-card no-body>   
                            <b-tabs pills v-model="tabIndex" card>
                              <b-tab title="Datos Principales">
                                <b-card no-body>
                                  <b-list-group flush style="text-align:left">
                                    <b-list-group-item variant="info"><b>NOMBRE o RAZÓN SOCIAL : </b>{{dataPrinc.nombresContrib}}</b-list-group-item>
                                    <b-list-group-item ><b>NÚMERO DE RUC : </b>{{dataPrinc.numRuc}}</b-list-group-item>
                                    <b-list-group-item variant="info"><b>DIRECCIÓN : </b>{{dataPrinc.tipoVia}} {{dataPrinc.nombVia}} {{dataPrinc.numVia}} - 
                                    {{dataPrinc.departamento}}, {{dataPrinc.provincia}}, {{dataPrinc.distrito}}
                                    </b-list-group-item>
                                    <b-list-group-item ><b>REFERENCIA : </b>{{dataPrinc.referencia}}</b-list-group-item>
                                    <b-list-group-item variant="info"><b>CONDICIÓN DOMICILIO : </b>{{dataPrinc.condDomicilio}}</b-list-group-item>
                                    <b-list-group-item ><b>ESTADO : </b>{{dataPrinc.activo}}</b-list-group-item>
                                    <b-list-group-item variant="info"><b>FECHA DE ALTA : </b>{{dataPrinc.fechaAlta}}</b-list-group-item>
                                    <b-list-group-item ><b>FECHA DE BAJA : </b>{{dataPrinc.fechaBaja}}</b-list-group-item>
                                    <b-list-group-item variant="info"><b>ACTIVIDAD ECONÓMICA : </b>{{dataPrinc.actEconomica}}</b-list-group-item>
                                    <b-list-group-item ><b>TIPO PERSONA : </b>{{dataPrinc.tipoPersona}}</b-list-group-item>
                                    <b-list-group-item variant="info"><b>TIPO CONTRIBUYENTE : </b>{{dataPrinc.tipoContrib}}</b-list-group-item>
                                    <b-list-group-item ><b>DEPENDENCIA : </b>{{dataPrinc.dependencia}}</b-list-group-item>
                                  </b-list-group>
                                </b-card>
                              </b-tab>
                              <b-tab title="Datos Secundarios">
                                <b-card no-body>
                                  <b-list-group flush style="text-align:left" v-if="boolSec">
                                    <b-list-group-item variant="info"><b>ACTIVIDAD COMERCIO EXTERIOR : </b>{{dataSec.actComercioExt}}</b-list-group-item>
                                    <b-list-group-item ><b>TIPO CONTABILIDAD : </b>{{dataSec.tipoContabilidad}} </b-list-group-item>
                                    <b-list-group-item variant="info"><b>TIPO FACTURA : </b>{{dataSec.tipoFactura}}</b-list-group-item>
                                    <b-list-group-item ><b>CALIFICACIÓN DE CONDUCTA : </b>{{dataSec.calConducta}}</b-list-group-item>                                    
                                    <b-list-group-item variant="info"><b>FECHA DE CONSTITUCIÓN : </b>{{dataSec.fechaConstitucion}}</b-list-group-item>
                                    <b-list-group-item ><b>FECHA INICIO DE ACTIVIDADES : </b>{{dataSec.fechaIniActividades}}</b-list-group-item>
                                    <b-list-group-item variant="info"><b>ORIGEN ENTIDAD : </b>{{dataSec.orgEntidad}}</b-list-group-item>
                                    <b-list-group-item ><b>LICENCIA MUNICIPAL : </b>{{dataSec.numLicMunicipal}}</b-list-group-item>
                                    <b-list-group-item variant="info"><b>ASIENTO RRPP : </b>{{dataSec.numAsientoRRPP}}</b-list-group-item>
                                    <b-list-group-item ><b>TOMO RRPP : </b>{{dataSec.tomoRRPP}}</b-list-group-item>
                                    <b-list-group-item variant="info"><b>FOLIO RRPP : </b>{{dataSec.numFolioRRPP}}</b-list-group-item>
                                  </b-list-group>
                                  <b-list-group flush v-else>
                                    <b-list-group-item variant="info">Sin información</b-list-group-item>
                                  </b-list-group>
                                </b-card>
                              </b-tab>
                              <b-tab title="Datos Complementarios">
                                <b-card no-body>
                                  <b-list-group flush style="text-align:left" v-if="boolComp">
                                    <b-list-group-item variant="info"><b>PARTIDA REGISTRAL : </b>{{dataComp.t1144pRegistral}}</b-list-group-item>
                                    <b-list-group-item ><b>CONDICIÓN LEGAL DE DOMICILIO : </b>{{dataComp.t1144CondLegalDomi}} </b-list-group-item>
                                    <b-list-group-item variant="info"><b>REFERENCIA DE NOTIFICACIÓN : </b>{{dataComp.t1144RefNotificacion}}</b-list-group-item>
                                    <b-list-group-item ><b>CORREO 1 : </b>{{dataComp.t1144Correo1}}</b-list-group-item>
                                    <b-list-group-item variant="info"><b>CORREO 2 : </b>{{dataComp.t1144Correo2}}</b-list-group-item>                                    
                                    <b-list-group-item ><b>TELÉFONO 1 : </b>{{dataComp.t1144Telef1}}</b-list-group-item>
                                    <b-list-group-item variant="info"><b>TELÉFONO 2 : </b>{{dataComp.t1144Telef2}}</b-list-group-item>
                                    <b-list-group-item ><b>TELÉFONO 3 : </b>{{dataComp.t1144Telef3}}</b-list-group-item>
                                    <b-list-group-item variant="info"><b>DEPARTAMENTO 1 : </b>{{dataComp.t1144Departamento1}}</b-list-group-item>
                                    <b-list-group-item ><b>DEPARTAMENTO 2 : </b>{{dataComp.t1144Departamento2}}</b-list-group-item>
                                    <b-list-group-item variant="info"><b>DEPARTAMENTO 3 : </b>{{dataComp.t1144Departamento3}}</b-list-group-item>                                    
                                  </b-list-group>
                                  <b-list-group flush v-else>
                                    <b-list-group-item variant="info">Sin información</b-list-group-item>
                                  </b-list-group>
                                </b-card>
                              </b-tab>
                              <b-tab title="Datos Adicionales">
                                <b-card no-body>
                                  <b-list-group flush style="text-align:left" v-if="boolAdi">
                                    <b-list-group-item variant="info"><b>NOMBRE EMPRESA : </b>{{dataAdi.t362NombEmpresa}}</b-list-group-item>
                                    <b-list-group-item ><b>NÚMERO DE REGISTRO : </b>{{dataAdi.t362NumRegistro}} </b-list-group-item>
                                    <b-list-group-item variant="info"><b>NÚMERO DE ÍNDICE : </b>{{dataAdi.t362NumIndice}}</b-list-group-item>
                                    <b-list-group-item ><b>FECHA DE BAJA : </b>{{dataAdi.t362FechaBaja}} </b-list-group-item>
                                    <b-list-group-item variant="info"><b>OFICINA RRPP : </b>{{dataAdi.t362DescOfiRRPP}}</b-list-group-item>
                                  </b-list-group>
                                  <b-list-group flush v-else>
                                    <b-list-group-item variant="info">Sin información</b-list-group-item>
                                  </b-list-group>
                                </b-card>
                              </b-tab>
                              <b-tab title="Domicilio Legal">
                                <b-card no-body>
                                  <b-list-group flush style="text-align:left" v-if="boolDomi"> 
                                    <b-list-group-item variant="info"><b>DOMICILIO LEGAL : </b>{{dataDomi.domLegal}}</b-list-group-item>
                                  </b-list-group>
                                  <b-list-group flush v-else>
                                    <b-list-group-item variant="info">Sin información</b-list-group-item>
                                  </b-list-group>
                                </b-card>
                              </b-tab>
                              <b-tab title="Establecimientos Anexos">
                                <b-card no-body>
                                  <div id="scrollspy-nested" style="position:relative; height:350px; overflow-y:auto" v-if="boolEst">
                                    <b-list-group flush style="text-align:left" v-for="est in dataEst" :key="est.id">
                                      <b-button size="sm" variant="primary" block disabled></b-button>
                                      <b-list-group-item variant="info"><b>NOMBRE ESTABLECIMIENTO : </b>{{est.sunat.eaNombEstablecimiento}}</b-list-group-item>
                                      <b-list-group-item ><b>TIPO DE ESTABLECIMIENTO : </b>{{est.sunat.eaTipoEstablecimiento}} </b-list-group-item>
                                      <b-list-group-item variant="info"><b>DIRECCIÓN : </b>{{est.sunat.eaDireccion}} </b-list-group-item>
                                      <b-list-group-item ><b>REFERENCIA : </b>{{est.sunat.eaReferencia}}</b-list-group-item>
                                      <b-list-group-item variant="info"><b>NOMBRE DE LA ZONA : </b>{{est.sunat.eaNombZona}} </b-list-group-item>
                                      <b-list-group-item ><b>TIPO DE ZONA : </b>{{est.sunat.eaTipoZona}}</b-list-group-item>
                                      <p>&nbsp;</p>
                                    </b-list-group>
                                  </div>
                                  <b-list-group flush v-else>
                                    <b-list-group-item variant="info">Sin información</b-list-group-item>
                                  </b-list-group>
                                </b-card>
                              </b-tab>
                              <b-tab title="Establecimientos Anexos - complementario">
                                <b-card no-body>
                                  <div id="scrollspy-nested" style="position:relative; height:350px; overflow-y:auto" v-if="boolAnex">
                                    <b-list-group flush style="text-align:left" v-for="anex in dataAnex" :key="anex.id">
                                      <b-button size="sm" variant="primary" block disabled></b-button>
                                      <b-list-group-item variant="info"><b>NÚMERO CORRELATIVO : </b>{{anex.sunat.t1150NumCorrelativo}}</b-list-group-item>
                                      <b-list-group-item ><b>DEPARTAMENTO : </b>{{anex.sunat.t1150Dpto}} </b-list-group-item>
                                      <b-list-group-item variant="info"><b>NÚMERO DE MANZANA : </b>{{anex.sunat.t1150Mz}}</b-list-group-item>
                                      <b-list-group-item ><b>NÚMERO DE LOTE : </b>{{anex.sunat.t1150NumLt}} </b-list-group-item>
                                      <b-list-group-item variant="info"><b>KILÓMETRO : </b>{{anex.sunat.t1150Km}}</b-list-group-item>
                                      <p>&nbsp;</p>
                                    </b-list-group>
                                  </div>
                                  <b-list-group flush v-else>
                                    <b-list-group-item variant="info">Sin información</b-list-group-item>
                                  </b-list-group>
                                </b-card>
                              </b-tab>
                              <b-tab title="Representantes Legales">
                                <b-card no-body>
                                  <b-list-group flush style="text-align:left" v-if="boolRep">
                                    <b-list-group-item variant="info"><b>NOMBRE REPRESENTANTE : </b>{{dataRep.rlNombRepresentante}}</b-list-group-item>
                                    <b-list-group-item ><b>FECHA DE NACIMIENTO : </b>{{dataRep.rlFechaNacimiento}} </b-list-group-item>
                                    <b-list-group-item variant="info"><b>TIPO DE DOCUMENTO IDENTIDAD : </b>{{dataRep.rlTipoDocIdent}}</b-list-group-item>
                                    <b-list-group-item ><b>NÚMERO DE DOCUMENTO IDENTIDAD : </b>{{dataRep.rlNumDocIdent}} </b-list-group-item>
                                    <b-list-group-item variant="info"><b>NOMBRE DEL CARGO : </b>{{dataRep.rlCargo}}</b-list-group-item>
                                    <b-list-group-item ><b>FECHA INICIO DEL CARGO : </b>{{dataRep.rlFechaDesdeCargo}} </b-list-group-item>
                                    <b-list-group-item variant="info"><b>NÚMERO DE ORDEN SUCESIVO : </b>{{dataRep.rlNumOrdRepreSucesiva}}</b-list-group-item>
                                  </b-list-group>
                                  <b-list-group flush v-else>
                                    <b-list-group-item variant="info">Sin información</b-list-group-item>
                                  </b-list-group>
                                </b-card>
                              </b-tab>
                            </b-tabs>
                          </b-card>
                      </div>                   
                    </div>
                    <p>&nbsp;</p>
                    <div class="text-center">
                      <b-button-group class="mt-2">
                        <b-button variant="primary" @click="tabIndex--">Anterior</b-button>
                        <b-button variant="primary" @click="tabIndex++">Siguiente</b-button>
                      </b-button-group>
                    </div>                    
                </div>
      </section>
    </div> 
</template>
<style>
  .tm{
    width: 100%;
  }
  a:hover, a:focus {
     color: black;
  }
  a{
    color: black;
  }
</style>
<script>
import axios from 'axios';
import Constantes from '../../store/constantes.js';
export default {
    name:'ConsultaSunat',
  data(){
    return{     
      docConsulta: '',
      dataSunat : [],
      dataPrinc:[],
      dataSec:[],
      dataComp:[],
      dataAdi:[],
      dataDomi:[],
      dataEst:[],
      dataAnex:[],
      dataRep:[],
      ListaPersona:[],
      boolSunat: false,
      cargandoModal: false,
      boolSec: false,
      boolComp: false,
      boolAdi: false,
      boolDomi: false,
      boolEst: false,
      boolAnex: false,
      boolRep: false,
      tabIndex: 0,
    }
  },
  methods:{
      consultaSunat(){
        if(this.docConsulta.length!=11){
          this.$swal({
             icon: 'info',
             text: 'El número de documento debe tener 11 digitos.'
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
          if(this.boolSunat){
            this.limpiarPersona();
            this.tabIndex= 0;
          }        
          let dataPost = {};
          dataPost.correoUsuario = localStorage.getItem('cuenta');
          
          axios.post(Constantes.rutaPersona+'/datos-sunat/'+this.docConsulta, dataPost)
                    .then(response=>{  
                      console.log("entró");
                        this.dataSunat=response.data;
                        //Información principal
                        this.dataPrinc = this.dataSunat.principal.sunat;
                        //Información secundaria
                        this.dataSec = this.dataSunat.secundario;
                        if(this.dataSec!=null){
                          this.dataSec = this.dataSunat.secundario.sunat;
                          this.boolSec=true;
                        } 
                        //Información complementaria
                        this.dataComp = this.dataSunat.t1144;
                        if(this.dataComp!=null){
                          this.dataComp = this.dataSunat.t1144.sunat;
                          this.boolComp=true;
                        } 
                        //Información adicional
                        this.dataAdi = this.dataSunat.t362;
                        if(this.dataAdi!=null){
                          this.dataAdi = this.dataSunat.t362.sunat;
                          this.boolAdi=true;
                        } 
                        //Información domicilio
                        this.dataDomi = this.dataSunat.domicilio;
                        if(this.dataDomi!=null){
                          this.dataDomi = this.dataSunat.domicilio.sunat;
                          this.boolDomi=true;
                        } 
                        //Información Establecimientos Anexos
                        this.dataEst = this.dataSunat.establecimiento;
                        if(this.dataEst!=null && this.dataEst.length>0){
                          this.dataEst = this.dataSunat.establecimiento;
                          this.boolEst=true;
                        } 
                        //Información Establecimientos Anexos - Complementario
                        this.dataAnex = this.dataSunat.t1150;
                        if(this.dataAnex!=null && this.dataAnex.length>0){
                          this.dataAnex = this.dataSunat.t1150;
                          this.boolAnex=true;
                        } 
                        //Información Representante Legal
                        this.dataRep = this.dataSunat.representante;
                        if(this.dataRep!=null){
                          this.dataRep = this.dataSunat.representante.sunat;
                          this.boolRep=true;
                        } 
                        this.boolSunat = true;
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
          this.setBoolFalse();
      },
      limpiarPersona(){
          this.ListaPersona = [];
          this.setBoolFalse();
      },
      setBoolFalse(){
          this.boolSunat = false;
          this.boolSec=false;
          this.boolComp=false;
          this.boolAdi=false;
          this.boolDomi=false;
          this.boolEst=false;
          this.boolAnex=false;
          this.boolRep=false;
      }
  }
}
</script>