<template>
    <!-- Modal -->
<div class="modal fade" id="login" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" v-if="mostrarModal" @close="mostrarModal = false">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header bg-primary">
        <h5 class="modal-title text-white" id="exampleModalLabel">Desestimar</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="input-group form-group">
						<div class="input-group-prepend">
							<span class="input-group-text"></span>
						</div>
						<input type="text" class="form-control" placeholder="usuario" v-model="mensaje">
						
					</div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
        <button type="button" class="btn btn-primary"  @click="Desestimar()" >Ingresar</button>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import axios from 'axios';
import Constantes from '../../store/constantes.js';
export default {
    name:'Desestimar',
    data(){
    return{
      mensaje:'',
      mostrarModal:false
    }
  },
    props:{
      showModal:false
      //,tramite:{}
    },
    mounted() {
      this.mostrarModal=this.showModal
    },
    methods: {
      ValidarFormulario(){
        if(this.correo==''){
          this.$swal({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ingrese cuenta de usuario'
                  });
          return false;
        }
        return true;
      },
      IniciarSesion(){
        if(this.ValidarFormulario()){
          var urlValidacion=Constantes.rutaParametros+'obtenerUsuario/'+this.correo+'/'+this.contrasena;
      console.log(urlValidacion);
      axios.get(urlValidacion)
          .then(response=>{
              console.log(response.data);
              if(response.data.acceso){
                localStorage.setItem('logueado',true); 
                localStorage.setItem('nombreUsuarioLogueado',response.data.usuario.persona.nombres);
                localStorage.setItem('paternoUsuarioLogueado',response.data.usuario.persona.paterno);
                localStorage.setItem('maternoUsuarioLogueado',response.data.usuario.persona.materno);
                localStorage.setItem('idUsuarioLogueado',response.data.usuario.idUsuario);
                localStorage.setItem('cuenta',this.correo);
                localStorage.setItem('idPersonaLogueado',response.data.usuario.persona.idPersona);
                localStorage.setItem('nombreCompletoLogueado',response.data.usuario.persona.nombreCompleto);
                localStorage.setItem('numeroDocumentoLogueado',response.data.usuario.persona.numeroDocumento);
                console.log(localStorage);
                this.mostrarModal=false;
                alert(this.mostrarModal)
              }else{
                localStorage.setItem('logueado',false); 
                console.log(localStorage);
                this.$swal({
                    icon: 'error',
                    title: 'Error',
                    text: 'Verifique datos'
                  });
              }
              })
              .catch(e=>console.log('error'+e))
        }
         
        }
      }
    }

</script>