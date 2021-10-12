<template>
  <div class="content-wrapper">
    <loading :active.sync="isLoading" :is-full-page="true" color="#007BFF"></loading>
    <titulo-header>
      <div>Bandeja de usuarios - Plantaforma de Atención</div>
      <small>Detalle de usuario</small>
    </titulo-header>
    <section class="content">
      <el-row :gutter="10" class="d-flex justify-content-center">
        <el-col :md="20" class="card menu px-4">
          <el-row :gutter="10">
            <div class="form-row col-md-12">
              <template v-if="siCodigoContribuyente">
                <div class="form-group col-md-12">
                  <div class="alert alert-danger msg-alerta">El usuario seleccionado no tiene código de contribuyente!</div>
                </div>
              </template>
            </div>
            <div class="form-row col-md-12">
              <div class="form-group col-md-4">
                <label>Apellido Paterno:</label>
                <input type="text" :value="usuario.nomApellidoPaterno" class="form-control" disabled>
              </div>
              <div class="form-group col-md-4">
                <label>Apellido Materno:</label>
                <input type="text" :value="usuario.nomApellidoMaterno" class="form-control" disabled>
              </div>
              <div class="form-group col-md-4">
                <label>Nombres:</label>
                <input type="text" :value="usuario.nomNombres" class="form-control" disabled>
              </div>
            </div>
            <div class="form-row col-md-12">
              <div class="form-group col-md-12">
                <label>Dirección:</label>
                <input type="text" :value="usuario.direccion" class="form-control" disabled>
              </div>
            </div>
            <div class="form-row col-md-12">
              <div class="form-group col-md-3">
                <label>Tipo de documento:</label>
                <input type="text" :value="usuario.desPeTipDoc" class="form-control" disabled>
              </div>
              <div class="form-group col-md-3">
                <label>Número de documento:</label>
                <input type="text" :value="usuario.peNumDoc" class="form-control" disabled>
              </div>
              <div class="form-group col-md-3">
                <label>Teléfono fijo:</label>
                <input type="text" :value="usuario.telefono" class="form-control" disabled>
              </div>
              <div class="form-group col-md-3">
                <label>Teléfono celular:</label>
                <input type="text" :value="usuario.celular" class="form-control" disabled>
              </div>
            </div>
            <div class="form-row mt-4">
              <div class="form-group col-md-12">
                <h4>Datos del usuario:</h4>
                <hr>
              </div>
            </div>
            <div class="form-row col-md-12">
              <div class="form-group col-md-4">
                <label>Fecha de creación:</label>
                <input type="text" :value="usuario.fechaCreacion | fecha" class="form-control" disabled>
              </div>
              <div class="form-group col-md-4">
                <label>Fecha de migración:</label>
                <input type="text" class="form-control" disabled>
              </div>
              <div class="form-group col-md-4">
                <label>Última modificación:</label>
                <input type="text" class="form-control" disabled>
              </div>
            </div>
            <div class="form-row col-md-12">
              <div class="form-group col-md-5">
                <label>Usuario:</label>
                <input type="text" :value="usuario.usuario" class="form-control" disabled>
              </div>
              <div class="form-group col-md-2">
                <template v-if="!(usuario.activado==2) && permisoEscritura">
                  <div class="d-flex align-items-start flex-column" style="height: 65px;">
                    <el-button class="btn-block mt-auto" type="primary" @click="editarUsuarioCorreo">Editar</el-button></div>
                  </template>
              </div>
              <div class="form-group col-md-5">
                <label>Correo de notificación:</label>
                <input type="text" class="form-control" disabled>
              </div>
            </div>
            <div class="form-row col-md-12">
              <div class="form-group col-md-8">
                <label>Representa A:</label>
                <input type="text" :value="usuario.representa" class="form-control" disabled>
              </div>
              <div class="form-group col-md-4">
                <label>Fuente:</label>
                <input type="text" :value="usuario.fuente" class="form-control" disabled>
              </div>
            </div>
            <div class="form-row col-md-12">
                <div class="form-group col-md-4">
                    <label>Estado:</label>
                    <input type="text" :value="usuario.activado==2?'INACTIVO':'ACTIVO'" class="form-control" disabled>
                </div>
            </div>
            <div class="form-row col-md-12">
                <div v-if="!(usuario.activado==2)" class="form-group col-md-4">
                  <el-button class="btn-block" type="primary" @click="generarLinkRecuperaClave">Generar Link de Recuperar Clave</el-button>
                </div>
                <div v-if="!(usuario.activado==2) && permisoEscritura" class="form-group col-md-3">
                  <el-button class="btn-block" type="primary" @click="InactivarUsuario">Inactivar Usaurio</el-button>
                </div>
            </div>
            <div class="form-row mt-4">
              <div class="form-group col-md-12">
                <h4>Contribuyentes asociados a este usuario:</h4>
                <hr>
              </div>
            </div>
            <div class="form-row col-md-12">
              <div class="form-group col-md-12" v-if="asociados && asociados.length>0">
                <table id="example2" class="table table-hover table-sm mb-0">
                  <thead class="">
                    <tr>
                      <th>TDI</th>
                      <th>CON</th>
                      <th>NOMBRES / RAZON SOCIAL</th>
                    </tr>
                  </thead>
                  <tbody v-for="asociado of asociados" :key="asociado.id">
                    <tr v-if="asociado.siContribuyente">
                      <td>{{asociado.tdi}}</td>
                      <td>{{asociado.con}}</td>
                      <td>{{asociado | nombreAsociado}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
                <div class="form-group text-muted col-md-12 pl-4" v-else>
                    El usuario seleccionado no tiene contribuyentes relacionados
                </div>
            </div>
            <div class="form-row mt-4">
                <div class="form-group col-md-12">
                    <h4>Personas vinculadas:</h4>
                    <hr>
                </div>
            </div>
            <div class="form-row col-md-12">
                <div class="form-group col-md-12" v-if="relacionados && relacionados.length>0">
                    <table id="example2" class="table table-hover table-sm mb-0">
                        <thead class="">
                            <tr >
                                <th>TDI</th>
                                <th>CON</th>
                                <th>NOMBRES / RAZON SOCIAL</th>
                            </tr>
                        </thead>
                        <tbody v-for="relacionado of relacionados" :key="relacionado.con">
                            <tr>
                                <td>{{relacionado.tdi}}</td>
                                <td>{{relacionado.con}}</td>
                                <td>{{relacionado.nomb}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="form-group text-muted col-md-12 pl-4" v-else>
                    El usuario seleccionado no tiene personas vinculadas
                </div>
            </div>
            <div class="form-row col-md-12 mt-3">
                <el-col :md="6">
                  <el-button class="btn-block" type="primary"
                    @click="$router.push('/components/mantenimiento/usuarios-plataforma')">Volver a la bandeja</el-button>
                </el-col>
            </div>
          </el-row>
        </el-col>
      </el-row>
    </section>
  </div>
</template>
<script>
import TituloHeader from '../comun/TituloHeader'
import axios from 'axios';
import Constantes from '../../store/constantes'

import { SweetModal} from 'sweet-modal-vue'

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

import moment from "moment";

export default {
    components:{TituloHeader, SweetModal, Loading},
    data(){
        return {
            usuario: {},
            relacionados: [],
            asociados: [],
            usuario: "",
            documento: "",
            siCodigoContribuyente: false,
            isLoading: true,
            idUsuarioLogueado:localStorage.getItem('idUsuarioLogueado'),
            permisoEscritura:false
        }
    },
    created(){
      if(localStorage.getItem('logueado')=='true'){
        this.permisos();
        this.usuario = this.$route.params.usuario;
        this.documento = this.$route.params.documento;

        let RequestUsuarioDetalle = {};
        RequestUsuarioDetalle.documento = this.documento;
        RequestUsuarioDetalle.usuario = this.usuario;

        axios.post(`${Constantes.rutaPersona}/usuarioptd/detalle`, RequestUsuarioDetalle)
        .then(response=>{
            let data = response.data.data;
            this.usuario = data;
            console.log(data);
            this.isLoading=false;

            if(data.asociados.length == 0){
                this.siCodigoContribuyente = true;
            }

            axios.get(`${Constantes.rutaRentas}/contribuyente/${this.usuario.peNumDoc.trim()}`)
            .then(response=>{
            let data = response.data.data;
            console.log(data);
            var i = 0;
            while(i<data.length){
                if(data[i].perefe==1){
                    console.log(data[i])
                    this.asociados.push(data[i]);
                }else{
                    this.relacionados.push(data[i]);
                }
                i++;
            } 
            }).catch(e=>console.log(e))

        }).catch(e=>console.log(e));
       }else{
        this.$router.push('/auth/login/');
      }
        
    },
    methods:{
        permisos(){
            var opcion = 13;
            var url = Constantes.rutaAccesos+'permiso/getpermisobyid/'+opcion+'/'+this.idUsuarioLogueado
            console.log(url)
            if(opcion!=undefined){
                axios.get(url).then(response=>{
                var listaAccionSistema=response.data.data;
                console.log("LISTA DE ACCION EN EL SISTEMA");
                console.log(listaAccionSistema);
                for(var item of listaAccionSistema){
                    if(item.id73accionsistema ==2) this.permisoEscritura = true;
                    }
                }).catch(e=>console.log(e))
            }
        },
        InactivarUsuario(){
            this.$swal({
            title: 'Seguro de Inactivar?',
            text: "",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'No',
            confirmButtonText: 'Sí'
            }).then((result) => {
                if (result.value) {
                    let ptdUsuario={}
                    ptdUsuario.persona={}
                    ptdUsuario.persona.idePersona=this.idPersona
                    ptdUsuario.persona.penumdoc=this.documento
                    ptdUsuario.usuario=this.usuario.usuario
                    ptdUsuario.usuarioInactivador={}
                    ptdUsuario.usuarioInactivador.ideUsuario= localStorage.getItem("idUsuarioLogueado")
                    axios.post(`${Constantes.rutaTramite}inactivaAntiguo`,ptdUsuario)
                    .then(response=>{
                        console.log(response)
                        if(response.data.success){
                            this.$swal({
                            icon: "success",
                            text: "Usuario inactivado correctamente"
                            });
                            this.usuario.activado=2
                            this.CargarUsuario()
                        }else{
                            this.$swal({
                                icon: "error",
                                title: "Error",
                                text: "Sucedió un error."
                            });
                        }
                    
                    }).catch(e=>console.log(e)

                    )
                }
            })
            
        },
        generarLinkRecuperaClave(){
            let credenciales = {};
                credenciales.email = this.usuario.usuario;
                credenciales.modulo = "web-consultas-pagos";
            var url=`${Constantes.rutaTareasComunes}genera-enlace-pass`;
            console.log(url)
            axios.post(`${Constantes.rutaTareasComunes}genera-enlace-pass`,credenciales)
            .then(response=>{
                let data = response.data.data;
                this.$swal({
                      icon: "success",
                      text: "Enlace generado: \n" + Constantes.urlPlataforma+"recupera-contrasenia/"+ data+'/a'
                    });
            }).catch(e=>console.log(e))
        },
        editarUsuarioCorreo(){
            this.$swal({
            title: 'Ingrese el nuevo usuario:',
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Enviar',
            cancelButtonText: 'Cancelar',
            showLoaderOnConfirm: true,
            preConfirm: (usuarioNuevo) => {
                let requestUsuarioPtdDTO = {};
                requestUsuarioPtdDTO.usuario = usuarioNuevo;
                requestUsuarioPtdDTO.usuarioAntiguo = this.usuario.usuario;

                return axios.post(`${Constantes.rutaPersona}/usuarioptd/modificar`, requestUsuarioPtdDTO)
                .then(response => {
                    if (response.data.success) {
                        this.$swal({
                        title: 'Confirmación de actualización',
                        type: 'success',
                        showCancelButton: false,
                        confirmButtonText: 'Aceptar',
                        showCloseButton: false,
                        showLoaderOnConfirm: true
                        }).then((result) => {
                            if(result.value) {                
                                this.usuario.usuario = usuarioNuevo;
                            } 
                        });
                    }
                })
                .catch(error => {
                    Swal.showValidationMessage(
                    `Request failed: ${error}`
                    )
                })
            },
            allowOutsideClick: () => !Swal.isLoading()
            }).then((result) => {
                console.log(result);
            });
        }
    },
    filters:{
        fecha(fecha){
            return moment(fecha).format('DD/MM/YYYY');
        },
        nombreAsociado(asociado){
            let retorno = asociado.nomb.trim();

            if(asociado.tipe==6){
                retorno += " - SOCIEDAD CONYUGAL";
            }

            return retorno;
        }
    }
}
</script>
<style lang="scss" scoped>
  .menu {
    h4{
      font-size: 17px;
      color: #0078cf;
      font-weight: 600;
    }
  }
label{
    font-size:15px;
}
.form-row{
    padding-top: 8px;
    padding-left: 8px;
}
.msg-alerta{
    font-size: 1.5em;
}
.texto-info{
    font-size: 1.4em;
}
.btn {
    font-size: initial;
    font-size: 1.2em;
}
.btn, .button {
    border-radius: 5px;
}
button.btn.btn-danger.btn-sm{
  font-size: 1em;
}
</style>