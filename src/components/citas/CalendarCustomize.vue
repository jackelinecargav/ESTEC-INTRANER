<template>
  <div class="calendar-customize">
    <div class="calendar-customize-left">
      <div class="form-group">
        <label for="fechaAtencion">Fecha de atención</label>
        <input type="text" class="form-control form-control-date" id="fechaAtencion" v-model="labelPicker" readonly>
        <datepicker :inline="true"  :format="customFormatCal" :language="es" v-model="fechaDatePicker"
          :disabledDates="listaDiasCalendario"
          @selected="fechaSeleccionada"
          @cleared="valorRemovido"></datepicker>
          <!--disabledDates="{to: new Date , days:[6,3,1,2],daysOfMonth: [25]}"-->
      </div>
    </div>
    <div class="calendar-customize-right">
      <div class="calendar-customize-right-content"  v-if="listaHorarioAM != null">
        <ul class="calendar-times" >
          <li class="calendar-times-title">
            <label><b>Turno mañana</b></label>
          </li>
          <li class="calendar-times-list">
            <ul class="list-inline" >
              <li class="list-inline-item" v-for="item of listaHorarioAM" :key=item.hora>
                <div class="radio" v-if="item.estado" style="margin-right: 5px">
                  <label><input type="radio" v-model="horaReserva" @change="cambio" name="optradio" :value="item.hora">{{item.hora}}</label>
                </div>
              </li>
            </ul>
          </li>
        </ul>
        <ul class="calendar-times">
          <li class="calendar-times-title">
            <label><b>Turno tarde</b></label>
          </li>
          <li class="calendar-times-list">
            <ul class="list-inline">
              <li class="list-inline-item" v-for="item of listaHorarioPM" :key=item.hora>
                <div class="radio" v-if="item.estado" style="margin-right: 5px">
                  <label><input type="radio" v-model="horaReserva" @change="cambio" name="optradio" :value="item.hora">{{item.hora}}</label>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import Datepicker from 'vuejs-datepicker'
import { es } from 'vuejs-datepicker/dist/locale'
import Constantes from '../../store/constantes'
import axios from 'axios';
import Loading from 'vue-loading-overlay';
import {SweetModal} from 'sweet-modal-vue'
import 'vue-loading-overlay/dist/vue-loading.css';
import moment from "moment"
// import * as moment from 'moment';
// import 'moment/locale/pt-br';

export default {
  components:{
    SweetModal,
    Datepicker
  },
  props:['areaBuscar', 'tipoAtencion', 'jsonDevolver', 'idMotivo', 'tiempoCita'],
  data(){
    return {
      // areaBuscar: 17,
      // tipoAtencion: 1,
      // labelPicker: moment(new Date).format('YYYY-MM-DD'),
      labelPicker: this.jsonDevolver.fecha,

      horaReserva: '',
      dia:'',
      //TODO: LISTA DE HORARO
      listaHorarioAM: null,
      listaHorarioPM: null,
      listaDiasCalendario: [],
      listaFeriados: [],
      //TODO! VARIABLES CALENDARIO
      dateBase: new Date,
      // fechaDatePicker: new Date(this.jsonDevolver.fecha),
      fechaDatePicker: moment(this.jsonDevolver.fecha, 'YYYY-MM-DD'),
      // fechaDatePicker: moment(this.dateBase.getDate()-1).format('YYYY-MM-DD'),
      // fechaDatePicker: new Date,

      es: es
    }
  },
  created(){
    console.log(this.jsonDevolver.fecha);
    console.log("FECHA DATE PICKER");
    this.fechaDatePicker = this.fechaDatePicker.format();
    console.log(this.fechaDatePicker);
    this.dashabilitarDiasCalendario([1,2,3,4,5,6,0]);
    this.obtenerFeriados();
  },
  computed:{
    jsonDevolverHijo:{
      get() {
        return this.jsonDevolver;
      },
      set(value) {
        this.$emit("updateHorario", value);
      }
    }
  },
  methods:{
    cambio(){
      console.log("hora hijo-> "+this.jsonDevolverHijo);
      let objeto = new Object();
      objeto.hora=this.horaReserva;
      objeto.fecha= this.labelPicker;
      objeto.dia = this.dia;

      this.jsonDevolverHijo = objeto;
    },
    dashabilitarDiasCalendario(array){
      var object = new Object()
      var fecha = new Date
      var fechafrom = new Date
      fecha.setDate(fecha.getDate() - 1)

      object.to = fecha
      object.days = array
      fechafrom.setDate(fechafrom.getDate() + 30)
      object.from = fechafrom
      object.dates = this.listaFeriados
      this.listaDiasCalendario = object
    },
    obtenerCalendario(){
      this.listaHorarioAM = null;
      var url = Constantes.rutacitas+'obtener-calendario'
      let idArea = this.areaBuscar, tipoAtencion= this.tipoAtencion, idMotivo= this.idMotivo ;
      axios.get(url, {params: {idArea, tipoAtencion, idMotivo}}).then(response=>{
        var respuesta = response.data.respuesta;
        console.log(respuesta)
        if(!respuesta)this.Alerta('error','Error al cargar calendario','Comuniquese con GSTI')
        var lista = response.data.lista;
        var array = [1,2,3,4,5,6,0]
        for(var list of lista){
          var dia =  list.dia
          switch(dia){
            case 'LUNES':
              var i = array.indexOf( 1 );
              if ( i !== -1 )array.splice( i, 1 )
              break;
            case 'MARTES':
              var i = array.indexOf( 2 );
              if ( i !== -1 )array.splice( i, 1 )
              break;
            case 'MIERCOLES':
              var i = array.indexOf( 3 );
              if ( i !== -1 )array.splice( i, 1 )
              break;
            case 'JUEVES':
              var i = array.indexOf( 4 );
              if ( i !== -1 )array.splice( i, 1 )
              break;
            case 'VIERNES':
              var i = array.indexOf( 5 );
              if ( i !== -1 )array.splice( i, 1 )
              break;
            case 'SABADO':
              var i = array.indexOf( 6 );
              if ( i !== -1 )array.splice( i, 1 )
              break;
            case 'DOMINGO':
              var i = array.indexOf( 0 );
              if ( i !== -1 )array.splice( i, 1 )
              break;
          }
        }
        this.dashabilitarDiasCalendario(array)
        console.log(array);
        console.log(lista);
        this.fechaSeleccionada();
      }).catch(e=>this.Alerta('error','Error al cargar calendario','Comuniquese con GSTI'))
    },
    obtenerFeriados(){
      var fecha = new Date
      var url = Constantes.rutacitas+'obtenerferiados/'+fecha.getFullYear()
      axios.get(url).then(response=>{
        console.log('examinando listaTipoAtencion');
        var estado=response.data.respuesta;
        var lista = response.data.lista;
        if(!estado)this.Alerta('error','Error al cargar Feriados','Comuniquese con GSTI');
        this.listaFeriados=[]
        for(var feriados of lista){
          // console.log(feriados.dgsmas)
          this.listaFeriados.push(new Date(feriados.dgsano,(feriados.dgsmes-1),feriados.dgsdia ));
        }
        this.obtenerCalendario()
        // this.dashabilitarDiasCalendario([1,2,3,4,5,6,0]);
      }).catch(e=>this.Alerta('error','Error al cargar Feriados','Comuniquese con GSTI'))
    },
    obtenerHora(){
      var url = Constantes.rutacitas+"obtener-horas";
      console.log(url)
      let buscarHoras = {
        idArea: this.areaBuscar,
        tipoAtencion: this.tipoAtencion,
        fecha: this.labelPicker,
        idMotivo: this.idMotivo,
        tiempoCita: this.tiempoCita,
      }
      axios.post(url, buscarHoras).then(response=>{
        var horaActual = moment(new Date).format('HH:mm:ss');
        var fechaConsulta = this.labelPicker
        var fechaActual = moment(new Date).format('YYYY-MM-DD')
        var respuesta = response.data.lista;
        var lista = response.data.lista;
        var atencion = lista.atencion
        var am = []
        var pm = []
        for(var hora of lista){
          console.log(hora.atencion)
          this.listaHorario = hora.atencion
          for(var elemento of hora.atencion){
            var objeto = new Object()
            if('12:30:00' >= elemento.hora){
              if((horaActual >= elemento.hora)&&(fechaActual== fechaConsulta))objeto.estado =  0
              else objeto.estado =  elemento.estado
              objeto.hora =  elemento.hora
              am.push(objeto)
            }else{
              if((horaActual >= elemento.hora)&&(fechaActual== fechaConsulta))objeto.estado =  0
              else objeto.estado =  elemento.estado
              objeto.hora =  elemento.hora
              pm.push(objeto)
            }
          }
          this.listaHorarioAM = am
          this.listaHorarioPM = pm
        }
      }).catch(e=>this.Alerta('error','Error al cargar Horarios','Comuniquese con GSTI'))
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
    fechaSeleccionada: function() {
      this.$nextTick(() => {
        console.log("FN : "+this.fechaDatePicker)
        console.log('Una fecha ha sido seleccionada');
        this.labelPicker = moment(this.fechaDatePicker).format('YYYY-MM-DD')//YYYY-MM-DD
        // moment.locale('es');
        this.dia = moment(this.fechaDatePicker).locale("es").format("dddd");  
        this.dia = this.dia.toUpperCase()
        console.log("NOMBRE ------------------------------------------->>>>>>>>>>>>>>>>>>"+this.dia);
        console.log("LABEL "+this.labelPicker)
        this.obtenerHora()
        }
      )
    },
    customFormatCal(date) {
      return moment(date).format('YYYY-MM-DD');
      // return moment(date).format('MMMM Do YYYY, h:mm:ss a');
    },
    valorRemovido(){
      console.log("Borrado de fecha")
      this.fechaDatePicker = ' '
    },
  }
}
</script>
<style lang="scss">
  .calendar-customize {
    .vdp-datepicker__calendar .cell.selected {
      background: #2ADBB8;
      border-radius: 50%;
    }
    .vdp-datepicker__calendar{
      width: 100%;
      margin-top: 20px;
      border-radius: 18px;
      border: 1px solid #F2F4F8;
      box-shadow: 0px 4px 15px #E6E8F4;
      font-size: 14px;
    }
    .vdp-datepicker__calendar header span {
      color: #3A7BDD;
      font-weight: bold;
    }
  }
</style>
<style lang="scss" scoped>
  input[type="radio"]{
    margin-right: 8px;
  }
  .list-inline-item:not(:last-child) {
    margin-right: 0rem;
  }
  .calendar-customize {
    display: block;
    width: 100% !important;
    padding-top: 15px;
    padding-bottom: 50px;
    &-left {
      max-width: 50%;
      width: 100%;
      padding-left: 20px;
      padding-right: 20px;
      float:left;
      label {
        margin-bottom: .3rem;  
      }
      .form-control-date {
        padding: 0.69rem 1.5rem;
        font-weight: bold;
        color: #3A7BDD;
        border-radius: 16px;
        background: url('../../images/calendar.png');
        background-repeat: no-repeat;
        background-position: center right 15px;
      }
    }
    &-right {
      max-width: 50%;
      width: 100%;
      padding-left: 50px;
      padding-right: 20px;
      padding-top: 25px;
      float:right;
      &-content {
        margin: auto;
        display: block;
        & .calendar-times {
          list-style: none;
          &-title {
            label {
              margin-bottom: 2px;
            }
          }
          &-list {
            ul {
              list-style: none;
            }
          }
        }
      }
    }
  }
</style>
