<template>
  <div class="content-wrapper">
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-10">
            <div class="row">
              <a class="nav-link" data-widget="pushmenu" href="#"></a>
              <h4>
                <b>Edición de firma digital de Usuario</b>
              </h4>
            </div>
          </div>
        </div>
      </div>
    </section> 
    <section class="content">
      <div class="row">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <div >
              <form >               
                <div class="form-group col-12" style="top:10px">
                    <label for="exampleFormControlTextarea1" style="font-size:15px">Usuario : </label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="1" v-model="nombUsuario" disabled></textarea>
                </div>             
                <div class="form-group col-12" style="top:15px">
                    <div class="row col-12">
                     <label for="exampleFormControlTextarea1" style="font-size:15px">Firma : </label>  
                    </div> 
                    <div class="row col-12">                 
                    <b-img v-if="this.boolUrlFirmaActual=true" width="400" v-bind:src="this.urlFirmaActual" fluid ></b-img>  
                    </div>
                    <div class="row col-12">
                    <a style="font-size:10px;">(*)La imagen debe ser lo más nítida posible, en fondo blanco.</a>
                    </div>
                    <div class="row col-12">
                    <a style="font-size:10px">(*)El tamaño de la imagen debe ser aproximadamente de 180x80 píxeles.</a>
                    </div>
                </div>
                <div class="form-group col-10" style="padding:5px;left:10px;font-size:15px;top:25px">
                    <label for="exampleFormControlTextarea1">Editar firma: </label>                    
                    <div class="row form-group col-md-14">
                        <div class="col-10 col-sm-8">
                          <input
                            type="file"
                            id="file-input"
                            name="file-input"
                            class="form-control-file" 
                            @change="onFileSelected" accept="image/*"
                          />        
                        </div>  
                    </div>                                        
                </div>
                 <div><label class="col-2"></label></div>                              
                <div class="form-group col-10" style=";font-size:15px;padding-left:15px">
                  <div class="row" style="padding-left:20px"> 
                  </div>                                    
                </div>  
                <div class="form-group col-sm-12" ><label class="col-sm-10"></label>
                      <button class="btn btn-primary"  @click.prevent="confirmarOperacion()">Grabar</button>                  
                </div>  
              </form>                      
              </div>             
            </div>
          </div>
        </div>
      </div> 
    </section>
  </div>
</template>

<script>
import axios from "axios";
import Datepicker from 'vuejs-datepicker';
import { es } from 'vuejs-datepicker/dist/locale'
import Constantes from "../../store/constantes.js";
import moment from "moment";
import { ModelSelect } from 'vue-search-select';
export default {
  data() {
    return {
      es: es,
      date: new Date,
      usuarioPerfilJson:null,
      idUsuario:localStorage.getItem('idUsuarioLogueado'),
      nombUsuario:localStorage.getItem('nombreCompletoLogueado'),
      urlFirmaActual:'',
      urlNuevaFirma:`${Constantes.entidadArchivo}/8/`,
      boolUrlFirmaActual:false,
      adjunto:null,
      boolImagen: false
    }
  },
  beforeDestroy() {
    // this.editor.destroy();
  },
  mounted() { 
      this.getFirma();
  },
  components:{
      ModelSelect, Datepicker
  }, 
  methods: { 
    getFirma(){
        // var rutaTemporal = 'http://localhost:8090/api/tramites/acceso/valida-firma/'
        axios.get(Constantes.rutaTramite+'acceso/valida-firma/'+localStorage.getItem('idUsuarioLogueado'))
        // axios.get(rutaTemporal+localStorage.getItem('idUsuarioLogueado'))
                    .then(response=>{
                      this.usuarioPerfilJson=response.data.data;
                      console.log('pintando data Firma')
                      console.log(response.data.data);
                      this.urlFirmaActual = this.usuarioPerfilJson[0].urlFoto;
                      if (this.urlFirmaActual != null && this.urlFirmaActual != '' ){
                          this.boolUrlFirmaActual = true
                      }
                  })
                  .catch(e=>console.log(e))

    }, 
    confirmarOperacion() {   
      if(this.adjunto != null) {            
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
                this.actualizaFirma();
            } 
            })
      }
    },
    actualizaFirma(){
        var rutaTemporal = Constantes.rutaTramite+'acceso/usuario-edicion/'
        var dataPost=new FormData();
                dataPost.append('idUsuario',localStorage.getItem('idUsuarioLogueado'));                
                if (this.adjunto!=null){
                    dataPost.append('urlFotoFirma',this.urlNuevaFirma+localStorage.getItem('idUsuarioLogueado')+'/0');
                    dataPost.append('documento',this.adjunto);
                }else{
                    dataPost.append('urlFotoFirma',this.urlFirmaActual); 
                    dataPost.append('documento',null);  
                } 
                console.log(dataPost);
                axios.post(Constantes.rutaTramite+'acceso/usuario-edicion/',dataPost)
                // axios.post(rutaTemporal,dataPost)
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
                  .catch(e=>console.log(e))

    },    
    onFileSelected(event) {
      this.adjunto = event.target.files[0];
      console.log(event.target.files[0]);
    },
    removeElement: function (index) {
      console.log('index eliminar observacion:'+index);
      this.listaObservaciones.splice(index, 1);
      this.ReorganizarIndicesObservaciones();
    },
    customFormatCal(date) {
            return moment(date).format('D MM YYYY');
    },
    FechaActual(){
      this.fechaReg= this.customFormatter(new Date)
    },
    customFormatter(date) {
            return moment(date).format('YYYY-MM-DD');
    },
    onFileSelected(event) {    
      this.adjunto = event.target.files[0];
      let img = new Image()
      var height = this.height;
      var width = this.width;

      if ((this.adjunto.type != "image/jpeg") && (this.adjunto.type != "image/png")){        
          this.$swal({
          icon: "error",
          text: "Archivo no válido."
        });       
      }
      
      img.src = window.URL.createObjectURL(event.target.files[0])
      img.onload = () => {
        console.log(img.width + " " + img.height);
        if (img.height > 80 || img.width > 180)  {
          console.log("entra a validacion 1")         
          this.adjunto = null;          
          this.$swal({
            icon: "error",
            text: "Imagen carga supera el tamaño máximo."
          });
        }else{
          console.log("entra a validacion 2")
          this.adjunto = event.target.files[0];
        }
      }  

      console.log(event.target.files[0]);
      console.log("adjunto ---->"+this.adjunto.type)
    },
    PadLeft(value, length) {
      return value.toString().length < length
        ? this.PadLeft("0" + value, length)
        : value;
    }
  }
};
</script>
