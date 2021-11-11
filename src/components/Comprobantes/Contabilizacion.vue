<template>
<div>

   <div><br>
    <el-row :gutter="10">
      <el-col :xs="24" :md="3" style="text-align: center;">
        Concepto: 
      </el-col>
      <el-col :xs="24" :md="19">
        <el-input v-model="conceptoText" maxlength="250" disabled></el-input>
      </el-col>
    </el-row><br>
    <el-row :gutter="10">
        <el-col :xs="24" :md="3">
            <el-checkbox v-model="detraccion">Detracción :</el-checkbox>
        </el-col>
        <el-col :xs="24" :md="8">
                <el-select v-model="value" placeholder="Selecione" :disabled="!detraccion">
                    <el-option v-for="item in catalogDetracciones" :key="item.cadebus" :label="item.tclave" :value="item.cadebus">
                    </el-option>
                </el-select>
        </el-col>
        <el-col :xs="24" :md="4" style="margin-left: 10%;">
            <el-checkbox v-model="igvAfecto">Afecto IGV</el-checkbox>
        </el-col>
    </el-row>
    <div class="py-1">
        <h4 class="card-title tituloTab">
            Distribución de Gasto
            <el-checkbox v-model="distriGasto" class="derecha">Única</el-checkbox>
        </h4>
    </div>
    <div>
        <table id="example2" class="table" width="95%" height="95%">
            <tbody>
                <tr v-for="item of numeroItems" :key="'Gasto ' + item.numeros">
                    <td width="10%">Cta.Contable {{ item.numeros }}</td>
                    <td width="15%">
                        <el-input type="number" maxlength="12" class="input" v-model="item.ctaContable"></el-input>
                    </td>
                    <td width="10%">Centro de Costos</td>
                    <td width="15%">
                        <el-input type="number" maxlength="3" class="input" v-model="item.costo"></el-input>
                    </td>
                    <td width="10%">Importe</td>
                    <td width="15%">
                        <el-input type="number" class="input" v-model="item.importe" :disabled="distriGasto"></el-input>
                    </td>

                    <td width="10%" v-if="distriGasto == false"><u style="font-size: 20px" @click="agregarItem()">+</u></td>
                </tr>
            </tbody>
        </table>
    </div>
    <div id="cabecera" 
    >
        <el-row :gutter="10">
            <el-col :xs="24" :md="8">
                <div class="col text-right">
                    <el-button type="danger" plain @click="Provisionar(2)">
                        Vista Previa
                        <b-icon-arrow-down></b-icon-arrow-down>
                    </el-button>
                </div>
            </el-col>
            <el-col :xs="24" :md="8">
                <el-button type="primary" plain @click="Provisionar(1)">Provisionar</el-button>
            </el-col>
            <el-col :xs="24" :md="8">
                <el-button  type="warning" @click="IngresarObservacionAsiento=true" plain >Observar</el-button>
            </el-col>
        </el-row>
        <br />
    </div>
      <el-dialog title="Observar" :visible.sync="IngresarObservacionAsiento" width="20%">
    <el-input type="textarea" autosize v-model="observacionAsiento">
    </el-input>
    <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="GrabarObservar()">Guardar</el-button>
    </span>
</el-dialog>
</div>
</div>
</template>

<script>
import moment from "moment";
import TituloHeader from "../comun/TituloHeader.vue";
import axios from "axios";
import constantes from "../../store/constantes";
export default {
    components: {
        TituloHeader,
    },
    data() {
        return {
            tituloComprobante: "",
            conceptoText: null,
            detraccion: false,
            distriGasto: true,
            value: '',

            numeroItems: [{
                numeros: 1,
                importe: null,
                ctaContable: null,
                costo: null
            }],
            fechaActual:null,
            activeName: "first",

            detalleOrden: null,
            detalleContrato: null,

            itemSeleccionado: null,
            IngresarObservacion: false,
            IngresarObservacionAsiento: false,
            observacion: null,
            accion: null,
            currentDate: null,

            detalle: {},
            detalleFactura: null,
            detalleTrazabilidad: null,
            accionEstadoBoton: null,
            mostrarContabilidad: false,
            catalogDetracciones:null,
            datosProvision:{},
            nomResponsable:null,
            observacionAsiento:null,
            //armar asiento 
            idComprobante: null,
            igvAfecto: true,
        };
    },
    created() {
      var fechahoy= new Date()
      var mes = parseInt(fechahoy.getMonth())+1
      this.fechaActual = fechahoy.getUTCDate()+"/"+mes+"/"+fechahoy.getFullYear()
        this.consultar();
        this.obtenerCatalogoDetracciones();
    },
    methods: {
      GrabarObservar(){
        
            let url = constantes.rutaAdmin + "/consulta-traza-observacion"
            axios
                .get(url, {
                    params: {
                        idComprobante: this.detalle.idComprobante
                    },
                })
                .then((response) => {
                    this.nomResponsable=response.data.result                    
                let url = constantes.rutaAdmin + "/estado-factura"
                  axios.get(url, {
                          params: {
                              idComprobante: this.detalle.idComprobante,
                              estado: 9,
                              id008Trazabilidad: 37,
                              observacion: this.observacionAsiento,
                              usuarioModificador: localStorage.getItem("User"),
                              usuarioResponsable: this.nomResponsable,
                          },
                      })
                      .then((response) => {
                          console.log(response);
                          this.consultar();
                          if (response.data.esCorrecto) {
                              this.observacion = " ";
                          } else {
                              this.$swal({
                                  icon: "error",
                                  title: "Error",
                                  text: "Intentelo más tarde",
                              });
                          }
                      })
                      .catch((e) => {
                          console.log(e);
                      });

                })
                .catch((e) => {
                    console.log(e);

                 });

           
      },
      obtenerCatalogoDetracciones(){
        let url = constantes.rutaAdmin + "/catalogo-contabilidad";
            axios
                .get(url, {
                    params: {
                        idParametro: '28',
                    },
                })
                .then((response) => {
                  this.catalogDetracciones = response.data.result;
                  console.warn(response)
                })
                .catch((e) => console.log(e));
      },
        agregarItem() {
            this.numeroItems.push({
                numeros: this.numeroItems.length + 1,
                importe: null,
                cc: null,
                costo: null
            })
        },
        handleClick(tab, event) {
            console.log(tab, event);
        },
        formatoFecha(valor) {
            return moment(valor).format("DD-MM-YYYY");
        },
        Provisionar(valor){
          let asientoData = {};
            asientoData.id_comprobante=this.detalle.idComprobante,
            asientoData.fecha_asiento= this.fechaActual ,
            asientoData.concepto= this.conceptoText,
            asientoData.moneda= this.detalle.nombreMoneda,
            asientoData.conversion= "S",
            asientoData.tipo_conversion= "V",
            asientoData.tipo_cambio= 4.02,
            asientoData.estado= 2
            asientoData.afectoTipoComprobante = this.detalle.id007TipoComprobante
            asientoData.afectoIgv = this.igvAfecto
            asientoData.afectoDetraccion= this.detraccion
            axios.post(constantes.rutaAdmin + "/provisionar-asiento", asientoData).then(response=>{
              console.error(response)
            }).catch(e=>{
              this.alertClose('error','Ocurrió un error al enviar encuesta')
              console.log(e)});
            if(valor==2){
              this.obtenerpdf()
            }else{
              alert("guardado con exito")    
            }
                    
        },
        obtenerpdf(){
          if (this.igvAfecto) {
                var igv = 1
            } else {
                var igv = 0;
            }
            let url = constantes.rutaAdmin + "/visualizar-asiento/" + this.detalle.idComprobante + "/" + igv+ "/" +this.detraccion+ "/" +this.numeroItems[0].ctaContable;
            let documento = url;
            window.open(documento, "_blank");
        },
        consultar() {
            let url = constantes.rutaAdmin + "/consultar-comprobante";
            axios
                .get(url, {
                    params: {
                        idComprobante: this.$route.params.idComprobante,
                    },
                })
                .then((response) => {
                    this.detalle = response.data.result[0];
                    console.warn(this.detalle)
                    this.conceptoText =
                        this.detalle.proveedorNombreComercial + ", " + this.detalle.numero;
                      this.numeroItems[0].importe = this.detalle.importeSubTotal
                })
                .catch((e) => console.log(e));
        },
        Accion() {
            if (this.accionEstadoBoton == 1) {
                this.Aprobar()
            } else if (this.accionEstadoBoton == 0) {
                this.Rechazar()
            }
        },
    }
};
</script>
<style lang="scss" scoped>
.tituloTab {
    text-align: left;
    color: #0078cf;
    margin-left: 30px;
}

.segItem {
    text-align: left;
    margin-left: -114px;
}

.derecha {
    float: right;
    margin-right: 5%;
}

hr {
    width: 50vw !important;
    position: relative;
    margin-top: 5px;
    margin-bottom: 5px;
    float: left;
}

.alinieado-derecha {
    text-align: right;
    float: right;
}

.alinieado-izquierda {
    text-align: left;
}

.total-detalle {
    align-content: center;
}
</style>
