<template>
  <div class="content-wrapper">
    <loading :active.sync="isLoading" :is-full-page="true" color="#007BFF"></loading>
    <titulo-header>
      <div>Bandeja de usuarios - Plantaforma de Atención</div>
      <small>Detalle de usuario</small>
      <!-- <button class="btn btn-success  btn-sm" @click="$bvModal.show('editarUsuarioModal')">Editar Usuario</button> -->
    </titulo-header>
    <section class="content">
      <el-row :gutter="10" class="d-flex justify-content-lg-center">
        <el-col :md="20" class="card menu px-4">
          <el-row :gutter="10">
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
                <input type="text" v-model="usuario.telefono" class="form-control" :disabled="!editar"
                       maxlength="15">
              </div>
              <div class="form-group col-md-3">
                <label>Teléfono celular:</label>
                <input type="text" v-model="usuario.celular" class="form-control" :disabled="!editar"
                       maxlength="15">
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
            <div class="form-row col-md-12 d-flex justify-content-between">
              <div class="form-group col-md-5">
                <label>Usuario:</label>
                <input type="text" v-model="usuario.usuario" class="form-control" :disabled="!editar"
                       maxlength="50">
              </div>
              <div class="form-group col-md-5">
                <label>Correo de notificación:</label>
                <input type="text" v-model="usuario.correoNotificacion" class="form-control"
                       :disabled="!editar" maxlength="50">
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
              <div class="form-group col-md-5">
                <label>Estado:</label>
                <input v-if="!editar" type="text"
                       :value="usuario.activado===0?'PENDIENTE DE ACTIVACION':usuario.activado===1?'ACTIVADO':'INACTIVO'"
                       class="form-control" disabled>
                <select v-if="editar" id="estAtencion" class="form-control" v-model="usuario.activadoE">
                  <option value="0">PENDIENTE DE ACTIVACION</option>
                  <option value="1">ACTIVADO</option>
                  <option value="2">INACTIVO</option>
                </select>
              </div>
              <div class="col col-md-6">
                <b-form-group :disabled="!editar" label="Restricciones:">
                  <b-form-checkbox
                          v-for="option in listaRestricciones"
                          v-model="idsRestricciones"
                          :key="option.codigo"
                          :value="option.idRestriccion"
                  >
                    <div>{{ option.nombre }}</div>
                    <span class="text-muted" style="font-size: 11px;">{{option.descripcion}}</span>
                  </b-form-checkbox>
                </b-form-group>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-4" v-if="usuario.activado==0">
                <el-button class="btn-block" type="primary" @click="generarLinkActivacion">Generar Link de Activación
                </el-button>
              </div>
              <div class="form-group col-md-4" v-if="usuario.activado==1">
                <el-button class="btn-block" type="primary" @click="generarLinkRecuperaClave">Generar Link de Recuperar
                  Clave
                </el-button>
              </div>
              <div class="form-group col-md-2" v-if="permisoEscritura">
                <el-button class="btn-block" type="primary" @click="EditarUsuario">{{btnEditar}}</el-button>
              </div>
            </div>
            <div class="form-row mt-4">
              <div class=" col-md-12">
                <h4>Contribuyentes relacionados a este usuario:</h4>
                <hr>
              </div>
            </div>
            <div class="form-row col-md-12">
              <div class="form-group col-md-12" v-if="asociados && asociados.length>0">
                <table id="example2" class="table table-hover table-sm mb-2">
                  <thead class="">
                  <tr>
                    <th>TDI</th>
                    <th>CON</th>
                    <th>NOMBRES / RAZON SOCIAL</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="asociado of asociados" :key="asociado.con">
                    <td>{{asociado.tdi}}</td>
                    <td>{{asociado.con}}</td>
                    <td>{{asociado | razonSocial}}</td>
                  </tr>
                  </tbody>
                </table>
              </div>
              <div class="form-group text-muted col-md-12 texto-info pl-4" v-else>
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
                  <tr>
                    <th>TDI</th>
                    <th>CON</th>
                    <th>NOMBRES / RAZON SOCIAL</th>
                  </tr>
                  </thead>
                  <tbody v-for="relacionado of relacionados" :key="relacionado.con">
                  <tr>
                    <td>{{relacionado.tdi}}</td>
                    <td>{{relacionado.con}}</td>
                    <td>{{relacionado.nomb.trim()}}</td>
                  </tr>
                  </tbody>
                </table>
              </div>
              <div class="form-group text-muted col-md-12 texto-info pl-4" v-else>
                El usuario seleccionado no tiene personas vinculadas
              </div>
            </div>
            <div class="form-row mt-3">
              <el-col :md="6">
                <el-button class="btn-block" type="primary"
                           @click="$router.push('/components/mantenimiento/usuarios-plataforma')">
                  Volver a la bandeja
                </el-button>
              </el-col>
            </div>
          </el-row>
        </el-col>
      </el-row>
    </section>
    <b-modal id="editarUsuarioModal" hide-footer>
      <div class="d-block text-center">
        <h3>Edición Usuario</h3>
      </div>
      <div class="row">
        <label class="col-sm-4">Teléfono</label>
        <div class="col-sm-6" style="padding-left: 0px; !important">
          <input type="text" class="form-control" v-model="usuario.telefonoE">
        </div>
      </div>
      <div class="row">
        <label class="col-sm-4">Celular</label>
        <div class="col-sm-6" style="padding-left: 0px; !important">
          <input type="text" class="form-control" v-model="usuario.celularE">
        </div>
      </div>
      <div class="row">
        <label class="col-sm-4">Cuenta</label>
        <div class="col-sm-6" style="padding-left: 0px; !important">
          <input type="text" class="form-control" v-model="usuario.usuarioE">
        </div>
      </div>
      <div class="row">
        <label class="col-sm-4">Correo Notificacion</label>
        <div class="col-sm-6" style="padding-left: 0px; !important">
          <input type="text" class="form-control" v-model="usuario.correoNotificacionE">
        </div>
      </div>
      <div class="row">
        <label class="col-sm-4">Estado</label>
        <div class="col-sm-6" style="padding-left: 0px; !important">
          <select id="estAtencion" class="form-control" v-model="usuario.activadoE">
            <option value="0">PENDIENTE DE ACTIVACION</option>
            <option value="1">ACTIVADO</option>
            <option value="2">INACTIVO</option>
          </select>
        </div>
      </div>
      <b-button class="mt-3" block @click="EditarUsuario()">{{btnEditar}}</b-button>
    </b-modal>
    <div id="ventanaModal" class="modalopaco" v-if="showModal">
      <div class="modalbody">
        <div class="card-header--title font-weight-bold font-size-xl bg-primary">
          <div class="izquierda"><h3> Edición de Usuario</h3></div>
          <button class="btn btn-success">Guardar</button>
          <div class="clear"></div>
        </div>
        <div class="modalcontent">
          <div style="line-height: 150%; padding: 20px 0px 0px 0px;">
            <div class="row col-12">
              <label for="exampleInputPassword1" class="col-sm-2 col-form-label text-left"
                     style="padding-right: 0px; !important">Teléfono fijo: </label>
              <div class="col-sm-4" style="padding-left: 0px; !important">
                <input type="text" class="text">
              </div>
              <label for="exampleInputPassword1" class="col-sm-3 col-form-label text-right">Celular: </label>
              <div class="col-sm-3" style="padding-left: 0px; !important">
                <input type="text" class="text">
              </div>
            </div>
            <div class="row col-12">
              <label class="col-sm-2 col-form-label text-left" style="padding-right: 0px; !important">Usuario: </label>
              <div class="col-sm-5" style="padding-left: 0px; !important">
                <input type="text" class="text">
              </div>
              <label class="col-sm-2 col-form-label text-right">Correo Notificacion: </label>
              <div class="col-sm-3" style="padding-left: 0px; !important">
                <input type="text" class="text">
              </div>
            </div>
            <div class="row col-12">
              <label class="col-sm-2 col-form-label text-left" style="padding-right: 0px; !important">Estado: </label>
              <div class="col-sm-5" style="padding-left: 0px; !important">
                <input type="text" class="text">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import TituloHeader from '../comun/TituloHeader'
  import axios from 'axios';
  import Constantes from '../../store/constantes'

  import Loading from 'vue-loading-overlay';
  import 'vue-loading-overlay/dist/vue-loading.css';

  import moment from "moment";

  export default {
    components: {TituloHeader, Loading},
    data() {
      return {
        usuario: {},
        relacionados: [],
        asociados: [],
        idPersona: 0,
        idPersonaRepresentante: 0,
        idUsuarioPlataforma: 0,
        isLoading: false,
        showModal: false,
        editar: false,
        btnEditar: 'Editar Usuario',
        idUsuarioLogueado: localStorage.getItem('idUsuarioLogueado'),
        permisoEscritura: false,
        idsRestricciones: []
      }
    },
    created() {
      if(localStorage.getItem('logueado')=='true'){
        this.permisos();
        this.idPersona = this.$route.params.idPersona;
        this.idPersonaRepresentante = this.$route.params.idRepresentante;
        this.idUsuarioPlataforma = this.$route.params.idUsuarioPlataforma;
        axios.get(`${Constantes.rutaPersona}/usuarioplataforma/${this.idUsuarioPlataforma}`)
          .then(response => {
            this.usuario = response.data.data;
            this.usuario.telefono = this.usuario.telefono ? this.usuario.telefono.trim() : this.usuario.telefono
            this.usuario.celular = this.usuario.celular ? this.usuario.celular.trim() : this.usuario.celular
            this.usuario.usuario = this.usuario.usuario ? this.usuario.usuario.trim() : this.usuario.usuario
            this.usuario.correoNotificacion = this.usuario.correoNotificacion ? this.usuario.correoNotificacion.trim() : this.usuario.correoNotificacion
            this.usuario.telefonoE = this.usuario.telefono;
            this.usuario.celularE = this.usuario.celular
            this.usuario.usuarioE = this.usuario.usuario
            this.usuario.correoNotificacionE = this.usuario.correoNotificacion
            this.usuario.activadoE = this.usuario.activado
            this.idsRestricciones = this.usuario.restricciones.map(function(item) { return item["idRestriccion"]; });

            axios.get(`${Constantes.rutaRentas}/contribuyente/${this.usuario.peNumDoc.trim()}`)
              .then(response => {
                const data = response.data.data;
                let i = 0;
                while (i < data.length) {
                  if (data[i].perefe === 1) {
                    this.asociados.push(data[i]);
                  } else {
                    this.relacionados.push(data[i]);
                  }
                  i++;
                }
              }).catch(e => console.log(e))

          }).catch(e => console.log(e));
        }else{
        this.$router.push('/auth/login/');
      }
    },
    mounted() {
      this.$store.dispatch("obtenerRestricciones");
    },
    computed: {
      listaRestricciones(){
        return this.$store.state.restricciones;
      }
    },
    methods: {
      permisos() {
        const opcion = 13;
        const url = Constantes.rutaAccesos + 'permiso/getpermisobyid/' + opcion + '/' + this.idUsuarioLogueado
        axios.get(url).then(response => {
          const listaAccionSistema = response.data.data;
          for (const item of listaAccionSistema) {
            if (item.id73accionsistema === 2) this.permisoEscritura = true;
          }
        }).catch(e => console.log(e))
      },
      EditarUsuario() {
        if (!this.editar) {
          this.editar = true
          this.btnEditar = 'Guardar Cambios'
        } else {
          this.$swal({
            title: 'Seguro de Editar?',
            text: "",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'No',
            confirmButtonText: 'Sí'
          }).then((result) => {
            if (result.value) {
              this.$swal({
                title: "Guardando",
                allowOutsideClick: false,
                onBeforeOpen: () => {
                  this.$swal.showLoading();
                }
              })
              let usuarioPtd = {};
              usuarioPtd.usuario = this.usuario.usuarioE;
              usuarioPtd.usuarioNuevo = this.usuario.usuario;
              usuarioPtd.correoNotificacion = this.usuario.correoNotificacion;
              usuarioPtd.celular = this.usuario.celular;
              usuarioPtd.telefono = this.usuario.telefono;
              usuarioPtd.persona = {};
              usuarioPtd.persona.penumdoc = this.usuario.peNumDoc;
              usuarioPtd.persona.idePersona = this.idPersona;
              usuarioPtd.activado = this.usuario.activadoE;
              usuarioPtd.idUsuarioPlataforma = this.idUsuarioPlataforma;
              usuarioPtd.idsRestricciones = this.idsRestricciones;
              axios.post(`${Constantes.rutaTramite}/ptdusuario-editar`, usuarioPtd)
                .then(response => {
                  if (response.data.success) {
                    this.$swal.close();
                    this.$swal({
                      icon: "success",
                      text: "El usuario se editó correctamente"
                    });
                    this.editar = false;
                    this.btnEditar = 'Editar Usuario'
                    this.CargarUsuario();
                  } else {
                    this.$swal.close();
                    this.$swal({
                      icon: "info",
                      text: "Ocurrió un problema al editar el usuario."
                    });
                  }
                }).catch(e => console.log(e))
            }
          });
        }
      },
      CargarUsuario() {
        this.idPersona = this.$route.params.idPersona;
        axios.get(`${Constantes.rutaPersona}/usuarioplataforma/${this.idUsuarioPlataforma}`)
          .then(response => {
            let data = response.data.data;
            this.usuario = data;
            this.usuario.telefono = this.usuario.telefono ? this.usuario.telefono.trim() : this.usuario.telefono
            this.usuario.celular = this.usuario.celular ? this.usuario.celular.trim() : this.usuario.celular
            this.usuario.usuario = this.usuario.usuario ? this.usuario.usuario.trim() : this.usuario.usuario
            this.usuario.correoNotificacion = this.usuario.correoNotificacion ? this.usuario.correoNotificacion.trim() : this.usuario.correoNotificacion
            this.usuario.telefonoE = this.usuario.telefono;
            this.usuario.celularE = this.usuario.celular
            this.usuario.usuarioE = this.usuario.usuario
            this.usuario.correoNotificacionE = this.usuario.correoNotificacion
            this.usuario.activadoE = this.usuario.activado
          }).catch(e => console.log(e))
      },
      generarLinkActivacion() {
        let credenciales = {};
        credenciales.email = this.usuario.usuario;
        credenciales.modulo = "web-plataforma-electronica";
        var url = `${Constantes.rutaTareasComunes}genera-enlace-pass`;
        console.log(url)
        axios.post(`${Constantes.rutaTareasComunes}genera-enlace-pass`, credenciales)
          .then(response => {
            let data = response.data.data;
            this.$swal({
              icon: "success",
              text: "Enlace generado: \n" + Constantes.urlPlataforma + "contrasenia/" + data
            });
          }).catch(e => console.log(e))
      },
      InactivarUsuario() {
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
            let ptdUsuario = {}
            ptdUsuario.persona = {}
            ptdUsuario.persona.idePersona = this.idPersona
            ptdUsuario.usuario = this.usuario.usuario
            ptdUsuario.usuarioInactivador = {}
            ptdUsuario.usuarioInactivador.ideUsuario = localStorage.getItem("idUsuarioLogueado")
            axios.post(`${Constantes.rutaTramite}inactiva`, ptdUsuario)
              .then(response => {
                console.log(response)
                if (response.data.success) {
                  this.$swal({
                    icon: "success",
                    text: "Usuario inactivado correctamente"
                  });
                  this.CargarUsuario()
                } else {
                  this.$swal({
                    icon: "error",
                    title: "Error",
                    text: "Sucedió un error."
                  });
                }

              }).catch(e => console.log(e)
            )
          }
        })

      },
      generarLinkRecuperaClave() {
        let credenciales = {};
        credenciales.email = this.usuario.usuario;
        credenciales.modulo = "web-plataforma-electronica";
        var url = `${Constantes.rutaTareasComunes}genera-enlace-pass`;
        console.log(url)
        axios.post(`${Constantes.rutaTareasComunes}genera-enlace-pass`, credenciales)
          .then(response => {
            let data = response.data.data;
            this.$swal({
              icon: "success",
              text: "Enlace generado: \n" + Constantes.urlPlataforma + "recupera-contrasenia/" + data
            });
          }).catch(e => console.log(e))
      },
      editarUsuarioCorreo() {
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
            requestUsuarioPtdDTO.idPersona = this.idPersona;

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
                    if (result.value) {
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
      },
    },
    filters: {
      fecha(fecha) {
        return moment(fecha).format('DD/MM/YYYY');
      },
      razonSocial(asociado) {
        let retorno = asociado.nomb.trim();

        if (asociado.tipe == 6) {
          retorno += " - SOCIEDAD CONYUGAL";
        }

        return retorno;
      }
    }
  }
</script>
<style lang="scss" scoped>
  .menu {
    h4 {
      font-size: 17px;
      color: #0078cf;
      font-weight: 600;
    }
  }

  label {
    font-size: 15px;
  }

  .form-row {
    padding-top: 8px;
    padding-left: 8px;
  }

  .msg-alerta {
    font-size: 1.5em;
  }

  .texto-info {
    font-size: 1.4em;
  }

  .btn {
    font-size: initial;
    font-size: 1.2em;
  }

  .btn, .button {
    border-radius: 5px;
  }

  button.btn.btn-danger.btn-sm {
    font-size: 1em;
  }

  .contribuyente-relacionado {
    font-size: 1.53em;
    font-weight: 600;
  }
</style>
<style>
  .font-size-xl {
    font-size: 1.425rem;
    color: white;
  }

  .modalopaco {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: fixed;
    background-color: rgba(0, 0, 0, .5);
    transition: opacity .3s ease;
    z-index: 9998;
  }

  .modalheader {
    background: #006699;
    margin: -10px;
  }

  .modalbody {
    padding: 10px;
    width: 800px;
    background: white;
    top: 20%;
    left: 30%;
    box-shadow: 0px 0px 10px black;
    position: absolute;
  }
</style>
