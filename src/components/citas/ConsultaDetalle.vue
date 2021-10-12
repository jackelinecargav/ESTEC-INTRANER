<template>
  <div class="content-wrapper">
    <loading
      :active.sync="isLoading"
      :is-full-page="true"
      color="#007BFF"
    ></loading>
    <titulo-header>Detalle de Cita</titulo-header>
    <section class="content">
      <el-row :gutter="10" class="d-flex justify-content-center">
        <el-col :md="20" class="card menu px-4">
          <el-row :gutter="10">
            <el-col :md="24">
              <el-row :gutter="10">
                <el-col :sm="4" :md="4">
                  <label  class="col-form-label" >Código</label>
                </el-col>
                <el-col :sm="4" :md="4">
                  <input class="form-control text-left" disabled type="text" v-model="codigoCita" id="" >
                </el-col>
                <div class="menu__text-right">
                  <el-col :sm="4" :md="4">
                    <div class="d-none d-md-block"><label class="col-form-label">Tipo</label></div>
                    <div class="d-block d-md-none"><label class="col-form-label text-left">Tipo</label></div>
                  </el-col>
                  <el-col :sm="4" :md="4">
                    <input class="form-control text-left" disabled type="text" id="tipoAtencion" v-model="tipoAtencion">
                  </el-col>
                  <el-col :sm="4" :md="4">
                    <div class="d-none d-md-block"><label class="col-form-label" >Estado</label></div>
                    <div class="d-block d-md-none"><label class="col-form-label text-left" >Estado</label></div>
                  </el-col>
                  <el-col :sm="4" :md="4">
                    <input class="form-control text-left"  disabled type="text" id="estadoCita" v-model="indEstado">
                  </el-col>
                </div>
              </el-row>
              <el-row :gutter="10"> 
                <el-col :sm="4" :md="4">
                  <label class=" col-form-label" >Registro</label>
                </el-col>
                <el-col :sm="8" :md="8">
                  <input class="form-control" disabled type="text" v-model="fechaRegistro">
                </el-col>
                <div class="menu__text-right">
                  <el-col :sm="4" :md="4">
                    <div class="d-none d-md-block"><label class="col-form-label" >Fecha de Cita</label></div>
                    <div class="d-block d-md-none"><label class="col-form-label text-left" >Fecha de Cita</label></div>
                  </el-col>
                  <el-col :sm="8" :md="8">
                    <input class="form-control" disabled type="text" v-model="fecha">
                  </el-col>
                </div>
              </el-row> 
              <el-row :gutter="10">
                <el-col :sm="4" :md="4">
                  <label class="" for="exampleFormControlTextarea1">Administrado</label>
                </el-col>
                <el-col :sm="8" :md="8">
                  <input class="form-control" v-model="nombres" disabled>
                </el-col>
                <div class="menu__text-right">
                  <el-col :sm="4" :md="4">
                    <div class="d-none d-md-block"><label  class="col-form-control">{{codigoTipoDocumento}}</label></div>
                    <div class="d-block d-md-none"><label  class="col-form-control text-left">{{codigoTipoDocumento}}</label></div>
                  </el-col>
                  <el-col :sm="8" :md="8">
                    <input class="form-control" disabled type="text" v-model="dni" >
                  </el-col>
                </div>
              </el-row>
              <el-row :gutter="10">
                <el-col :sm="4" :md="4">
                  <label  class="col-form-label">Correo</label>
                </el-col>
                <el-col :sm="8" :md="8">
                  <input class="form-control" disabled type="text" v-model="correo">
                </el-col>
                <div class="menu__text-right">
                  <el-col :sm="4" :md="4">
                  <div class="d-none d-md-block"><label class="col-form-label">Teléfono</label></div>
                  <div class="d-block d-md-none"><label class="col-form-label text-left">Teléfono</label></div>
                  </el-col>
                  <el-col :sm="8" :md="8">
                    <input class="form-control" disabled type="text" v-model="telefono">
                  </el-col>
                </div>
              </el-row>
              <el-row :gutter="10">
                <el-col :sm="4" :md="4">
                  <label  class="col-form-label">Unidad Orgánica</label>
                </el-col>
                <el-col :sm="20" :md="20">
                  <input class="form-control" disabled v-model="descripcion">
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :sm="4" :md="4">
                  <label class="">Motivo</label>
                </el-col>
                <el-col :sm="20" :md="20">
                  <textarea class="form-control" disabled rows="4" v-model="motivo"></textarea>
                </el-col>
              </el-row>
              <template>
                <hr/>
                  <el-row :gutter="10"><h4 class="">DATOS DE CÓDIGO DE ATENCIÓN :</h4></el-row>
                <hr/>
              </template>
              <el-row :gutter="10">
              </el-row>
              <el-row :gutter="10">
                <el-col :sm="4" :md="4">
                  <label class="col-form-label">Operador</label>
                </el-col>
                <el-col :sm="8" :md="8">
                  <input class="form-control" disabled v-model="usuToken">
                </el-col>
                <div class="menu__text-right">
                  <el-col :sm="2" :md="2">
                    <div class="d-none d-md-block"><label class="col-form-label text-wrap">Cód.<br>de Atención</label></div>
                    <div class="d-block d-md-none"><label class="col-form-label text-left">Cód. de Atención</label></div>
                  </el-col>
                  <el-col :sm="3" :md="3">
                    <input class="form-control " disabled  id="dni" v-model="token">
                  </el-col>
                  <el-col :sm="2" :md="2">
                    <div class="d-none d-md-block"><label class="col-form-label">Registro</label></div>
                    <div class="d-block d-md-none"><label class="col-form-label text-left">Registro</label></div>
                  </el-col>
                  <el-col :sm="5" :md="5">
                    <input class="form-control" disabled  v-model="fechaToken">
                  </el-col>
                </div>
              </el-row>
              <el-row :gutter="10">
                <el-col :sm="4" :md="4">
                  <label class="">Motivo </label>
                </el-col>
                <el-col :sm="20" :md="20">
                  <textarea class="form-control" disabled rows="4" v-model="motivoToken"></textarea>
                </el-col>
              </el-row>
              <template>
                <hr/>
                  <el-row :gutter="10"><h4 class="">DATOS DE ATENCIÓN :</h4></el-row>
                <hr/>
              </template>
              <el-row id="divagendar" :gutter="10">
                <el-col :sm="4" :md="4">
                  <label class="">Operador Agendó</label>
                </el-col>
                <el-col :sm="4" :md="4">
                  <input class="form-control" disabled type="text" v-model="usu_agenda">
                </el-col>
                <div class="menu__text-right">
                  <el-col :sm="4" :md="4">
                    <div class="d-none d-md-block"><label class="col-form-label">Registro</label></div>
                    <div class="d-block d-md-none"><label class="col-form-label text-left" >Registro</label></div>
                  </el-col>
                  <el-col :sm="4" :md="4">
                    <input class="form-control text-left" disabled type="text"  id="dni" v-model="fec_agenda">
                  </el-col>
                </div>
              </el-row>
              <el-row :gutter="10">
                <el-col :sm="4" :md="4">
                  <label class="">Operador Atención</label>
                </el-col>
                <el-col :sm="8" :md="8">
                  <input class="form-control" disabled type="text" v-model="usu_atencion">
                </el-col>
                <div class="menu__text-right">
                  <el-col :sm="4" :md="4">
                    <div class="d-none d-md-block"><label class="col-form-label">Registro</label></div>
                    <div class="d-block d-md-none"><label class="col-form-label text-left">Registro</label></div>
                  </el-col>
                  <el-col :sm="8" :md="8">
                    <input class="form-control text-left" disabled  type="text" v-model="fec_ini_aten">
                  </el-col>
                </div>
              </el-row>
              <el-row :gutter="10">
                <el-col :sm="4" :md="4">
                  <label class="col-form-label" >Hora de Atención</label>
                </el-col>
                <el-col :xs="10" :sm="3" :md="3">
                  <input class="form-control text-center" disabled  type="text"  id="dni" v-model="hor_ini_aten">
                </el-col>
                <el-col :xs="4" :sm="2" :md="2" class="text-center">
                  <label class="col-form-label">-</label>
                </el-col>
                <el-col :xs="10" :sm="3" :md="3">
                    <input class="form-control text-center" disabled type="text" v-model="hor_fin_aten">
                </el-col>
                <div class="menu__text-right">
                  <el-col :sm="4" :md="4">
                    <div class="d-none d-md-block"><label  class="col-form-label">Acción</label></div>
                    <div class="d-block d-md-none"><label  class="col-form-label text-left">Acción</label></div>
                  </el-col>
                  <el-col :sm="8" :md="8">
                    <input class="form-control" disabled type="text" v-model="accion" id="" >
                  </el-col>
                </div>
              </el-row>
              <el-row :gutter="10">
                <el-col :sm="4" :md="4">
                  <label>Motivo </label>
                </el-col>
                <el-col :sm="20" :md="20">
                  <textarea class="form-control" disabled rows="4" v-model="descripcion_aten"></textarea>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
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
import TituloHeader from "../comun/TituloHeader";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
export default {
  components: {
    TituloHeader,
    Loading,
  },
  data() { 
    return {
      isLoading: false,
    //VARIABLES DE DATALLE CITA 
      tiempoAtencion: '',
      usuToken: '',
      token: "",
      fechaToken: '',
      motivoToken: '',
      detalleCitaJson: null,
      idCita: '',
      dni: '',
      nombres: '',
      apePaterno: '',
      apeMaterno: '',
      hora: '',
      fecha: '',
      ubicacion: '',
      fec_fin_aten: '',
      hor_fin_aten: '',
      fec_agenda: '',
      hor_agenda: '',
      fec_desestima: '',
      hor_desestima: '',
      indEstado: '',
      direccion: '',
      telefono: '',
      fechaRegistro: '',
      fec_ini_aten: '',
      hor_ini_aten: '',
      descripcion_aten: '',
      usu_atencion: '',
      codigoCita: '',
      motivo: '',
      correo: '',
      responsable: '',
      descripcion: '',
      idArea: '',
      codigoTipoDocumento: '',
      tipoAtencion: '',
      usu_desestima: '',
      usu_agenda: '',
      accion: ' -',
    //--------------------------

      fechaReg: new Date,
    };
  },
  mounted() {
    if (localStorage.getItem("logueado") == "true") {
        this.FechaActual();
        this.getConsultaCitaDetalle();
    } else {
        this.$router.push("/auth/login/");
    }
  },
  methods: {   

    removeElement: function (index) {
      console.log('index eliminar observacion:'+index);
      this.listaObservaciones.splice(index, 1);
      this.ReorganizarIndicesObservaciones();
    },
    utf8_to_str(s) {
       for(var i=0, enc = encodeURIComponent(s), a = []; i < enc.length;) {
           if(enc[i] === '%') {
               a.push(parseInt(enc.substr(i+1, 2), 16))
               i += 3
           } else {
               a.push(enc.charCodeAt(i++))
           }
       }
       console.log("AQUI DEBERIA PINTAR LOS DATOS")
       console.log(decodeURIComponent(a))
      //  this.nombres= decodeURIComponent(s)
    },
    getConsultaCitaDetalle(){
        var url = Constantes.rutacitas+"citas/idCita/"+this.$route.params.idCitaConsulta;
        console.log("------------>"+url);
        axios.get(url)
        .then(response=>{
            this.detalleCitaJson=response.data.data;
            console.log("json"+this.detalleCitaJson);
            this.idCita                 = response.data.data[0].idCita;
            this.dni                    = response.data.data[0].dni;
            this.codigoTipoDocumento    = response.data.data[0].codigoTipoDocumento;
            this.nombres                = response.data.data[0].nombres+" "+response.data.data[0].apePaterno + " " + response.data.data[0].apeMaterno;
            this.tipoAtencion           = response.data.data[0].tipoAtencion;
            this.utf8_to_str("MAÑANÓ")

            if(this.tipoAtencion == 1){
                this.tipoAtencion="Presencial"; 
                divagendar.style.display = 'none';
            }else this.tipoAtencion="Virtual";
            
            this.correo         = response.data.data[0].correo;
            this.telefono       = response.data.data[0].telefono;
            this.direccion      = response.data.data[0].direccion;

            this.motivo         = response.data.data[0].motivo;
            this.descripcion    = response.data.data[0].descripcion;
            this.fechaRegistro  = response.data.data[0].fechaRegistro;
            this.codigoCita     = response.data.data[0].codigoCita;
            this.indEstado      = response.data.data[0].indEstado;
            // if(this.indEstado == 5){
                
            //     divagendar.style.display = 'none';
            // }
            
            this.fecha = response.data.data[0].fecha+" "+response.data.data[0].hora;
            
            // this.usuToken             =  response.data.data[0].token.usuario 
            if(response.data.data[0].token.usuario == null) {this.usuToken    = " -"}
            else{this.usuToken = response.data.data[0].token.usuario }

            // this.token                =  response.data.data[0].token.idToken
            if(response.data.data[0].token.idToken== null) {this.token    = " -"}
            else{this.token = response.data.data[0].token.idToken}

            // this.fechaToken           =  response.data.data[0].token.fecha
            if(response.data.data[0].token.fecha== null) {this.fechaToken    = " -"}
            else{this.fechaToken = response.data.data[0].token.fecha}

            // this.motivoToken          =  response.data.data[0].token.motivo
            if(response.data.data[0].token.motivo==null) {this.motivoToken   = " -"}
            else{this.motivoToken = response.data.data[0].token.motivo}

            // this.fec_fin_aten = response.data.data[0].fec_fin_aten;
            if(response.data.data[0].fec_ini_aten==null) {this.fec_ini_aten   = " -"}
            else{this.fec_ini_aten = response.data.data[0].fec_ini_aten}
            
            // this.hor_ini_aten     = response.data.data[0].hor_ini_aten +"  -  "+ response.data.data[0].hor_fin_aten;
            // this.fec_ini_aten     = response.data.data[0].fec_ini_aten;
            // alert(this.hor_ini_aten)
            
            // this.usu_atencion     = response.data.data[0].usu_atencion+'';

            if(response.data.data[0].usu_atencion==null) {this.usu_atencion    = " - "}
            else{this.usu_atencion = response.data.data[0].usu_atencion}

            if(response.data.data[0].descripcion_aten==null){this.descripcion_aten  = " -"}
            else{this.descripcion_aten = response.data.data[0].descripcion_aten}

            this.hor_ini_aten     = response.data.data[0].hor_ini_aten;  
            this.hor_fin_aten     = response.data.data[0].hor_fin_aten;

            if(response.data.data[0].hor_ini_aten==null && response.data.data[0].hor_fin_aten==null){
              this.tiempoAtencion =' - '
              this.hor_ini_aten =' -'
              this.hor_fin_aten =' -'
            }else{
            var tiempo1 = response.data.data[0].hor_ini_aten
            var tiempo2 = response.data.data[0].hor_fin_aten
            tiempo1 = tiempo1.replace(/\s+/g, '');
            tiempo1 =  tiempo1.split(':').join('')
            tiempo2 = tiempo2.replace(/\s+/g, '');
            tiempo2 =  tiempo2.split(':').join('');
            tiempo1 = tiempo2-tiempo1
            tiempo1= ""+tiempo1;
            tiempo1 = tiempo1.padStart(6,0)
            tiempo2 = tiempo1.slice(0, 2) + ":" + tiempo1.slice(2,4);// + ":" + tiempo1.slice(4);
            this.tiempoAtencion = tiempo2
            }

            if(response.data.data[0].usu_agenda==null){this.usu_agenda = " -"}
            else{this.usu_agenda = response.data.data[0].usu_agenda;}

            if(response.data.data[0].fec_agenda== null || response.data.data[0].hor_agenda == null){this.fec_agenda = " - "}
            else{this.fec_agenda = response.data.data[0].fec_agenda +"    "+ response.data.data[0].hor_agenda}
            
            // alert(this.indEstado)
            switch (this.indEstado){
                case "1": 
                          this.indEstado="Registrado";
                break;
                case "2": this.indEstado="Agendado";
                break;
                case "3": this.indEstado="En Atencion";
                break;
                case "4": this.indEstado="Atendido";
                          this.accion='Atendido'
                          this.tiempoAtencion = tiempo2
                          break;
                case "5": this.indEstado="Desestimado";
                          this.accion='Desestimado'
                break;
                default: this.indEstado="SIN ESTADO";
            }

        })
        .catch(e=>console.log(e))   

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
  .menu{
    .el-row{
      padding-top: 10px;
    }
    h4{
      font-size: 17px;
      color: #0078cf;
      font-weight: 600;
    }
  }
</style>