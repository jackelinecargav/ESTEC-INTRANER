<template>
  <div class="content-wrapper">
    <titulo-header>{{tituloHeader}}</titulo-header>
    <section class="content">
      <el-row :gutter="10">
        <div class="card menu">
          <el-row :gutter="10">
            <el-col :md="4"> <label>Unidad Orgánica</label></el-col>
            <el-col :md="8">
              <el-select v-model="filtros.idArea" filterable @change="changeArea(filtros.idArea)">
                <el-option v-for="area of listaAreas" :key="'area '+area.idArea" :value="area.idArea" :label="area.descripcion"></el-option>
              </el-select>
            </el-col>
            <template v-if="listaMotivos != null && listaMotivos.length >0">
              <el-col :md="4"><label>Motivos</label></el-col>
              <el-col :md="8">
                <el-select v-model="filtros.idMotivo" filterable>
                  <el-option :value="0" :label="'TODOS'"></el-option>
                  <el-option v-for="motivo of listaMotivos" :key="'motivos '+motivo.idMotivo" :value="motivo.idMotivo" :label="motivo.descripcion"></el-option>
                </el-select>
              </el-col>
            </template>
          </el-row>
          <el-row :gutter="10" class="d-flex">
            <el-col :md="4">Tipo de Atención</el-col>
              <el-col  :md="8">
                <el-radio-group v-model="filtros.tipoAtencion" @change="changeTipAtencion(filtros.tipoAtencion)">
                  <el-radio :label="1" border>Presencia</el-radio>
                  <el-radio :label="2" border>Virtual</el-radio>
                </el-radio-group>
              </el-col>
              <el-col :md="4" class="ml-auto"><el-button type="primary" class="btn-block" @click="search">Buscar</el-button></el-col>
              <el-col :md="4" class=""><el-button type="primary" class="btn-block" @click="openModal('NUEVO')">Nuevo</el-button></el-col>
          </el-row> 
        </div>
        <div class="card menu">
          <table class="table table-hover table-sm mb-2">
            <thead>
              <tr>
                <th width="15%">Día</th>
                <th width="10%">Hora de Inicio</th>
                <th width="15%">Hora de Fin</th>
                <th width="20%">Refrigerio</th>
                <th width="10%">Ventanillas</th>
                <template v-if="listaMotivos != null && listaMotivos.length >0"><th width="20%" >Motivo</th></template>
                <th width="15%" class="text-center"></th>
                <!-- <th class="text-center"></th> -->
              </tr>
            </thead>
            <tbody>
              <tr v-for="horario of listaHorarios" :key="'horario '+horario.idHorario">
                <td><template>{{horario.dia}}</template></td>
                <td><template>{{horario.horaInicio}}</template></td>
                <td><template>{{horario.horaFin}}</template></td>
                <td><template>{{horario.periodoRefrigerio}}</template></td>
                <td><template>{{horario.numeroVentanilla}}</template></td>
                <template v-if="listaMotivos != null && listaMotivos.length >0"><td><template>{{horario.motivo.descripcion}}</template></td></template>
                <td><template><el-button type="text" @click="openModificar(horario, 'MODIFICAR')"><u>Modificar</u></el-button></template></td>
                <td><template><el-button type="text" @click="openModificar(horario, 'ELIMINAR')">Eliminar</el-button></template></td>
              </tr>
            </tbody>
          </table>
        </div>
      </el-row>
      <template v-if="modal.showModal">
        <el-dialog class="modalToken" :title="modal.tituloModal" :visible.sync="modal.showModal" :before-close="cerrarModal">
          <template>
            <el-row :gutter="10">
              <el-col :md="8"><label>Tipo de atención</label></el-col>
              <el-col :md="16">
                <el-radio-group @change="changeModalTipAtencion" v-model="horario.idTipoAtencion" :disabled="!horario.boolModificar">
                  <el-radio :label="1" border>Presencial</el-radio>
                  <el-radio :label="2" border>Virtual</el-radio>
                </el-radio-group>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :md="8"> <label>Unidad Orgánica</label></el-col>
              <el-col :md="16">
                <el-select v-model="horario.idArea" filterable @change="changeArea(horario.idArea)" :disabled="!horario.boolModificar">
                  <el-option v-for="area of listaAreas" :key="'area '+area.idArea" :value="area.idArea" :label="area.descripcion"></el-option>
                </el-select>
              </el-col>
            </el-row>
            <template v-if="listaMotivos!=null && listaMotivos.length >0">
              <el-row :gutter="10">
                <el-col :md="8"><label>Elegir Motivo</label></el-col>
                <el-col :md="16">
                  <el-select v-model="horario.idMotivo" filterable @change="changeMotivo" :disabled="!horario.boolModificar">
                    <el-option v-for="motivo of listaMotivos" :key="'horariomotivo'+motivo.idMotivo" :value="motivo.idMotivo" :label="motivo.descripcion"></el-option>
                  </el-select>
                </el-col>
              </el-row>
            </template>
            <el-row :gutter="10">
              <el-col :md="8"><label>Hora de Inicio</label></el-col>
              <el-col :md="8">
                <el-time-select class="btn-block"
                  v-model="horario.horaInicio"
                  :picker-options="{
                    start: '08:00',
                    step: '00:30',
                    end: '15:00'
                  }"
                  placeholder="Inicio de atención">
                </el-time-select>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :md="8"><label>Hora de Fin</label></el-col>
              <el-col :md="8">
                <el-time-select
                  v-model="horario.horaFin"
                  :picker-options="{
                    start: '10:00',
                    step: '00:30',
                    end: '18:30'
                  }"
                  placeholder="Fin de atención">
                </el-time-select>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :md="8"><label>Periodo de Refrigerio</label>
                <el-switch v-model="horario.boolRefrigerio"></el-switch>
              </el-col>
              <template v-if="horario.boolRefrigerio">
                <el-col :md="8">
                  <el-select v-model="horario.inicioRefrigerio" placeholder="Inicio">
                    <el-option :value="'12:00:00'" label="12:00"></el-option>
                    <el-option :value="'12:30:00'" label="12:30"></el-option>
                    <el-option :value="'13:00:00'" label="13:00"></el-option>
                    <el-option :value="'13:30:00'" label="13:30"></el-option>
                    <el-option :value="'14:00:00'" label="14:00"></el-option>
                    <el-option :value="'14:30:00'" label="14:30"></el-option>
                  </el-select>
                </el-col>
                <el-col :md="8">
                  <el-select v-model="horario.finRefrigerio" placeholder="Fin">
                    <el-option :value="'12:30:00'" label="12:30"></el-option>
                    <el-option :value="'13:00:00'" label="13:00"></el-option>
                    <el-option :value="'13:30:00'" label="13:30"></el-option>
                    <el-option :value="'14:00:00'" label="14:00"></el-option>
                    <el-option :value="'14:30:00'" label="14:30"></el-option>
                    <el-option :value="'15:00:00'" label="15:00"></el-option>
                  </el-select>
                </el-col>
              </template>
            </el-row>
            <el-row :gutter="10">
              <el-col :md="8"><label>Cantidad de Ventanillas</label></el-col>
              <el-col :md="8">
                <el-input-number v-model="horario.numeroVentanilla" controls-position="right" :min="1" :max="30"></el-input-number>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :md="8"><label>Tiempo de Atención</label></el-col>
              <el-col :md="8">
                <el-input-number disabled v-model="horario.frecuencia" controls-position="right" step-strictly></el-input-number>
              </el-col>
            </el-row>
            <template v-if="horario.boolModificar">
              <el-row :gutter="10">
                <el-col :md="8"><label>Días de la Semana </label></el-col>
                <el-col :md="16">
                  <el-row>
                    <el-checkbox :indeterminate="isIndeterminate" v-model="todoMarcado" @change="handleCheckAllChange">Todos</el-checkbox>
                  </el-row>
                  <el-row>
                    <el-checkbox-group v-model="listaDiasMarcados" @change="handleCheckedCitiesChange">
                      <el-checkbox v-for="dia in listaDias" :label="dia" :key="'dia'+dia">{{dia}}</el-checkbox>
                    </el-checkbox-group>
                  </el-row>
                </el-col>
              </el-row>
            </template>
          </template>
          <span slot="footer" class="dialog-footer">
            <el-button @click="cerrarModal">Cerrar</el-button>
            <el-button type="primary"  @click="validarDescripcion()" >Confirmar</el-button>
          </span>
        </el-dialog>
      </template>
    </section>
  </div>
</template>
<script>
import axios from 'axios';
import moment from "moment";
import TituloHeader from '../../comun/TituloHeader'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import Constantes from '../../../store/constantes.js';
const diasSemana = ['LUNES','MARTES','MIERCOLES','JUEVES','VIERNES','SABADO'];
const NUEVO = 'NUEVO';
const MODIFICAR = 'MODIFICAR';
const ELIMINAR = 'ELIMINAR';
export default {
  components: {
    TituloHeader,
    Loading,
  },
  data() {
    return{
      isIndeterminate: true,
      todoMarcado: false,
      listaDias: null,
      listaDiasMarcados:[],
      tituloHeader: 'Mantenimiento de Horarios',
      modal:{
        showModal: false,
      },
      input: {
        min:15,
        max:31
      },
      filtros:{
        tipoAtencion: 1,
        idArea: localStorage.getItem("codUnidadCitas")*1,
      },
      horario: {
        inicioRefrigerio: '13:00:00',
        finRefrigerio: '14:00:00',
        boolRefrigerio: false,
        horaInicio: null,
        horaFin: null,
        nombreDia: null,
        idTipoAtencion: null,
        numeroVentanilla: null,
        boolModificar: null,
        frecuencia: null,
      },
      listaAreas: null,
      listaMotivos: null,
      listaHorarios: null,
    }
  },
  created(){
    this.inicio()
  },
  methods: {
    async inicio(){
      await this.obtenerAreas();
      await this.obtenerMotivos();
      this.search();
    },
    changeModalTipAtencion(){
      this.obtenerMotivos(); 
      this.horario.idMotivo=null;
      // this.horario.fecuencia =()==undefined)?this.horario.frecuencia:this.
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.todoMarcado = checkedCount === diasSemana.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.listaDias.length;
    },
    handleCheckAllChange(val){
      this.listaDiasMarcados = val ? this.listaDias : [];
      this.isIndeterminate = false;
    },
    openModificar(horario, accion){
      this.horario.horaInicio = moment(new Date("2020-01-01 "+horario.horaInicio)).format("HH:mm");
      this.horario.horaFin = moment(new Date("2020-01-01 "+horario.horaFin)).format("HH:mm");
      if(horario.periodoRefrigerio != null && !horario.periodoRefrigerio.includes('00:00:00') && horario.periodoRefrigerio.length>6){
        // this.horario.periodoRefrigerio = [new Date("2020-01-01 "+horario.periodoRefrigerio.substr(0,7)), 
        // new Date("2020-01-01 "+horario.periodoRefrigerio.substr(9,16))]
        this.horario.inicioRefrigerio=horario.periodoRefrigerio.substr(0,8);
        this.horario.finRefrigerio=horario.periodoRefrigerio.substr(9,16)
        this.horario.boolRefrigerio = true
      }else {
        this.horario.boolRefrigerio = false
      }
      this.horario.numeroVentanilla= horario.numeroVentanilla;
      this.horario.idTipoAtencion = horario.indTipoAtencion;
      this.horario.frecuencia = horario.frecuencia
      this.horario.idHorario = horario.idHorario
      this.horario.boolModificar = false;
      this.horario.idMotivo = horario.motivo.idMotivo
      this.horario.idArea = horario.idArea;
      if(accion==MODIFICAR)this.openModal(MODIFICAR);
      else this.openModal(ELIMINAR)
    },
    openModal(tipo){
      switch (tipo) {
        case NUEVO:
          this.listaDias= diasSemana;
          this.modal.tituloModal='Nuevo Horario';
          this.modal.titleAlert = "Confirmar nuevo Horario";
          this.modal.accion = NUEVO
          this.horario.horaInicio= moment(new Date(2016, 9, 10, 8, 0)).format("HH:mm");
          this.horario.horaFin= moment(new Date(2016, 9, 10, 16, 0)).format("HH:mm")
          this.horario.inicioRefrigerio = '13:00:00';
          this.horario.finRefrigerio = '14:00:00';
          this.horario.numeroVentanilla=1;
          let area = this.listaAreas.find(item => item.idArea == this.filtros.idArea)
          this.horario.frecuencia= (this.listaMotivos!=null && this.listaMotivos.length>0)?29:area.frecuencia
          this.horario.idTipoAtencion= this.filtros.tipoAtencion
          this.horario.boolRefrigerio=true;
          this.horario.boolModificar=true;
          this.horario.idArea = this.filtros.idArea
          this.modal.showModal = true
          break;
        case MODIFICAR:
          this.modal.tituloModal='Modificar Horario'
          this.modal.titleAlert = "Confirmar modificación de Horario";
          this.modal.accion = MODIFICAR
          this.modal.showModal = true
          break;
        case ELIMINAR:
          this.modal.titleAlert = "Eliminar Horario?";
          this.modal.accion = ELIMINAR
          this.confirmarNuevoHorario()
          break;
      }
    },
    validarDescripcion(){
      if(this.horario.boolModificar==true && (this.listaDiasMarcados == null || this.listaDiasMarcados.length ==0)){
        this.modal.showModal=false
        return this.alerta("info","Marcar almenos un día", "")
      }else  if(this.listaMotivos!=null && this.listaMotivos.length>0 && this.horario.idMotivo==null){
        this.modal.showModal=false
        return this.alerta("info","Seleccionar motivo de horario", "")
      }else  if(this.horario.horaInicio==null){
        this.modal.showModal=false
        return this.alerta("info","Seleccionar inicio de atención", "")
      }else if(this.horario.horaFin==null){
        this.modal.showModal=false
        return this.alerta("info","Seleccionar fin de atención", "")
      }else  if(this.horario.horaFin <= this.horario.horaInicio){
        this.modal.showModal=false
        return this.alerta("info","La hora de Inicio debe ser menor a la hora de Fin", "")
      }else if(this.horario.boolRefrigerio==true&&this.horario.inicioRefrigerio==null){
        this.modal.showModal=false
        return this.alerta("info","Seleccionar inicio de refrigerio", "")
      }else if(this.horario.boolRefrigerio==true&&this.horario.finRefrigerio==null){
        this.modal.showModal=false
        return this.alerta("info","Seleccionar fin de refrigerio", "")
      }else if(this.horario.inicioRefrigerio>=this.horario.finRefrigerio){
        this.modal.showModal=false
        return this.alerta("info","Fin de Refrigerio debe ser mayor", "")
      }else{
        this.confirmarNuevoHorario();
      }
    },
    confirmarNuevoHorario(){
      this.modal.showModal=false
      this.$swal({
          title: this.modal.titleAlert,
          text: "",
          icon: "info",
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          cancelButtonText: 'No',
          confirmButtonText: 'Si',
          customClass: {
            container: 'my-swal'
          },
        }).then(async (result) => {
          if (result.value) {
            //TODO: AQUI SE PONE LO QUE SE VA EJECUTAR DENTRO DEL BOTON OK
            
            this.horario.periodoRefrigerio =(this.horario.boolRefrigerio)? this.inicioRefrigerio+","+this.finRefrigerio: null;
            
            this.horario.horaInicio = this.horario.horaInicio+":00";
            this.horario.horaFin = this.horario.horaFin+":00";
            switch (this.modal.accion) {
              case NUEVO:
                this.crearHorario();
                break;
              case MODIFICAR:
                this.horario.id002Estado = 1
                this.modificarHorario();
                break;
              case ELIMINAR:
                this.horario.id002Estado = 0
                await this.modificarHorario();
                this.cerrarModal()
                break;
            }
          }else {
            switch (this.modal.accion) {
              case ELIMINAR:
                break;
              default:
                  this.modal.showModal = true
                  break;
            }
          }
        });
    },
    crearHorario(){
      const url= Constantes.rutacitas+"nuevo-horario"
      this.horario.usuCreacion = localStorage.getItem("nombreCompletoLogueado");
      this.horario.fechaCreacion = moment(new Date).format('YYYY-MM-DD HH:mm:ss');
      // let hora = moment(new Date).format('HH:mm:ss')
      this.horario.dias= this.listaDiasMarcados
      axios.post(url, this.horario).then(response=>{
        console.log(response)
        this.search()
      })
    },
    modificarHorario(){
      const url= Constantes.rutacitas+"modificar-horario"
      this.horario.usuModificacion = localStorage.getItem("nombreCompletoLogueado");
      this.horario.fechaModificacion = moment(new Date).format('YYYY-MM-DD HH:mm:ss');
      axios.post(url, this.horario).then(response=>{
        console.log(response)
        this.search()
      })
    },
    async cerrarModal(){
      this.modal.showModal = false
      this.horario.idMotivo = null;
      this.horario.periodoRefrigerio = null;
      this.horario.frecuencia = null;
      this.filtros.tipoAtencion=1;
      this.horario.idTipoAtencion = null;
      await this.obtenerMotivos();
      this.search()
    },
    search(){
      const url = Constantes.rutacitas+"obtener-calendario";
      let idArea= this.filtros.idArea, tipoAtencion=this.filtros.tipoAtencion, idMotivo=this.filtros.idMotivo;
      axios.get(url, {params: {idArea, tipoAtencion, idMotivo}}).then(response=>{
        console.log(response)
        this.listaHorarios = response.data.lista
      }).catch(e=>{
        console.log("error ");
        console.log(e);
      })
    },
    async obtenerAreas(){
      const url = Constantes.rutacitas+"/dbAreas/"+this.filtros.tipoAtencion;
      await axios.get(url).then(response=>{
        this.listaAreas = response.data.data;
        this.filtros.idArea = (this.listaAreas.find(item => item.idArea === this.filtros.idArea)==undefined)? this.listaAreas[0].idArea : this.filtros.idArea
      })
    },
    async obtenerMotivos(){
      const url = Constantes.rutacitas+"get-motivo";
      this.filtros.tipoAtencion = (this.horario.idTipoAtencion!=null)?this.horario.idTipoAtencion:this.filtros.tipoAtencion
      await axios.get(url, {params: this.filtros}).then(response=>{
        this.filtros.idMotivo = (response.data.data.length==0)? null: 0;
        this.listaMotivos = response.data.data;
      })
    },
    async changeTipAtencion(tipoAtencion){
      // this.filtros.idArea = null;
      this.filtros.idMotivo = null;
      await this.obtenerAreas();
      await this.obtenerMotivos();
      this.search()
    },
    async changeArea(idArea){
      this.filtros.idMotivo = null;
      this.filtros.idArea = idArea;
      this.obtenerMotivos();
    },
    changeMotivo(){
      let item = this.listaMotivos.find(item => item.idMotivo === this.horario.idMotivo);
      if(item!= undefined){
      this.horario.frecuencia=(item==undefined)?this.horarios:item.frecuencia;}
    },
    alerta(icon, title, text){
      this.$swal({
          title: title,
          text: text,
          icon: icon,
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          cancelButtonText: 'No',
          confirmButtonText: 'Ok',
          customClass: {
            container: 'my-swal'
          },
        }).then((result) => {
          this.modal.showModal=true
          if (result.value) {
            //TODO: AQUI SE PONE LO QUE SE VA EJECUTAR DENTRO DEL BOTON OK
          }
        });
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-date-editor{
    width: 100% !important
  }
  .el-input-number{
    width: 100% !important
  }
</style>