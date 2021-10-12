<template>
  <section>
    <template>
      <el-col >
        <!-- <calendar-customize :areaBuscar='17' :tipoAtencion='1'></calendar-customize> -->
        <calendar-customize @updateHorario="newHorario" :areaBuscar='jsonCita.area.idArea' :tipoAtencion='jsonCita.tipoAtencion' :jsonDevolver='reservaHorario'
              :idMotivo="jsonCita.submotivo.idMotivo" :tiempoCita="jsonCita.token.tiempoCita+jsonCita.token.frecuencia">
        </calendar-customize>
      </el-col>
    </template>
  </section>
</template>

<script>
import CalendarCustomize from '../citas/CalendarCustomize'
import Constantes from '../../store/constantes'
import axios from 'axios';
import moment from "moment"
export default {
  props:["visible", "jsonCita"],
  components:{
    CalendarCustomize,
  },
  data(){
    return{
      estadoA:null,
      dialogFormVisible: false,
      reservaHorario: {
        hora  : this.jsonCita.hora,
        fecha : this.jsonCita.fecha
      },
      btnConfirm: true,
    }
  },
  computed:{
    reservaHorarioJson: {
      get() {
        return {
          hora  : this.jsonCita.hora,
          fecha : this.jsonCita.fecha
        };
      },
      set(value) {
        this.$emit("click", value);
      }
    }

  },
  methods:{
    // updateCita(){
    //   let url = Constantes.rutacitas+'modificarCita/reprogramar'
    //   console.log("ENVIAR NUEVO HORARIO");
    //   console.log(this.reservaHorario)
    //   let objeto =new Object;
    //   objeto.idCita = this.jsonCita.idCita
    //   objeto.fecha = this.reservaHorario.fecha
    //   objeto.hora = this.reservaHorario.hora
    //   objeto.tiempoCita = this.jsonCita.token.tiempoCita;
    //   objeto.tipoAtencion = this.jsonCita.tipoAtencion
    //   objeto.correo = this.jsonCita.correo
    //   objeto.dia = this.reservaHorario.dia
    //   axios.post(url,objeto).then(response=>{
    //     let estatus = response.data.ok
    //     if(!estatus)alert("error al reprogramar cita")
    //     else {
    //       if(this.jsonCita.tipoAtencion==2 && this.jsonCita.indEstado==3)alert("La cita deberá volver agendar");
    //       this.notificacion('Registro exitoso', 'success')
    //       // this.visible2=false
    //       this.$emit("reload");
    //     }
    //   }).catch(
    //     e=>console.log("ERROR AL REPROGRAMAR"),
    //     e=>this.notificacion('Error de registro', 'error')
    //   )
    // },
    newHorario(newValue){
      this.reservaHorarioJson = newValue
    },
    notificacion(message, type) {
      this.$message({
        message: message,
        type: type
      });
    },
  }
}
</script>
