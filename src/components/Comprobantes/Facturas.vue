<template>
 <div class="content-wrapper">
    <div>
      <titulo-header>Comprobantes Pendientes</titulo-header><br />
     <section class="content">
      <el-row :gutter="10">
        <div class="card menu">
        <div id="miCuenta">
        <div>
          <el-row :gutter="10" class="d-flex justify-content-end">
              <el-col :md="7">
              <p >N° de RUC</p>
              </el-col>
              <el-col  :md="10">
              <p>Fecha</p>
              </el-col>
              <el-col  :md="6">
              <p>Estado</p>
              </el-col>
            </el-row>
            <el-row :gutter="10" class="d-flex justify-content-end" style="margin-top: -20px !important;">
              <el-col :md="7">  
              <el-input style="width: 250px" v-model="numeroRuc"></el-input>
              </el-col>
              <el-col :md="10">
                <el-date-picker
                  style="width: 380px !important;"
                  v-model="fecha"
                  type="daterange"
                  range-separator="a"
                  start-placeholder="Start date"
                  end-placeholder="End date"
                >
                </el-date-picker>
              </el-col>
              <el-col :md="6">
                <el-select
                  v-model="tipoComprobanteSeleccionado"
                  placeholder="TODOS"
                >
                  <el-option
                    v-for="item in tipoComprobanteResultado"
                    :key="item.idParametro"
                    :label="item.nombre"
                    :value="item.idParametro"
                  >
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
          <br />
          <el-row :gutter="10" class="d-flex justify-content-end">
              <el-col  :md="6">
              <el-button
              style="background-color: #51c1ff; width: 100%; color: #ffffff"
              icon="el-icon-search"
              @click="BuscarFacturas()"
              >Buscar</el-button>
              </el-col>
            </el-row><br>
        </div>

        <table id="example2" class="table table-hover table-sm mb-2">
          <thead>
            <tr>
              <th class="text-center">Tipo</th>
              <th class="text-center">Número</th>
              <th class="text-center">Fecha</th>
              <th class="text-center">RUC</th>
              <th class="text-center">Proveedor</th>
              <th class="text-center">N° de pedido</th>
              <th class="text-center">Moneda</th>
              <th class="text-center">IGV</th>
              <th class="text-center">Importe</th>
              <th class="text-center">Estado</th>
              <!-- <th class="text-center">Usuario</th> -->
              <th class="text-center"></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item of tableData"
              :key="'facturas ' + item.idComprobante"
            >
              <td>
                <template>{{ item.nombreTipoComprobante }}</template>
              </td>
              <td>
                <template>{{ item.serie + "-" + item.numero }}</template>
              </td>
              <td>
                <template>{{ formatoFecha(item.fechaEmision) }}</template>
              </td>
              <td>
                <template v-if="item.proveedorNumeroDocumento != 'null'">
                  {{ item.proveedorNumeroDocumento }}</template
                >
                <template v-else>-</template>
              </td>
              <td>
                <template v-if="item.proveedorNombreComercial != 'null'">
                  {{ item.proveedorNombreComercial }}</template
                >
                <template v-else>-</template>
              </td>
              <td>
                <template>
                  <a v-if="item.ordenNumero != null">{{ item.ordenNumero }}</a>
                  <a v-else>{{ item.ordenContrato }}</a>
                </template>
              </td>
              <td>
                <template>{{ item.nombreMoneda }}</template>
              </td>
              <td>
                <template>{{ item.importeIgv }}</template>
              </td>
              <td>
                <template>{{ item.importeTotal }}</template>
              </td>
              <td>
                <template>{{ item.nombreEstado }}</template>
              </td>
              <!-- <td>
                    <template>{{ item.usuarioResponsable }}</template>
                  </td> -->
              <td>
                <u @click="verDetalle(item)">ver detalle</u>
              </td>

              <!-- <template v-if="item.id004Estado==9 ">  
                      <el-button @click="previo(item),dialogEstado = true" type="success" icon="el-icon-check" circle></el-button>
                      <el-button @click="previo(item),dialogEstadoDenegado = true" type="danger" icon="el-icon-close" circle></el-button>
                    </template>
                    <template v-else-if="10">APROBADO</template>
                    <template v-else-if="11">RECHAZADO</template> -->
            </tr>
          </tbody>
        </table>
        <el-dialog
          title="Detalle del Recibo"
          :visible.sync="dialogVisibleDetalle"
          width="30%"
        >
          <el-form v-if="detalleRecibo != null">
            <el-form-item label="N° Contrato : ">
              <p>{{ detalleRecibo.ordenContrato }}</p></el-form-item
            >
            <el-form-item label="Estado : ">
              <p style="color: blue">
                {{ detalleRecibo.nombreEstado }}
              </p></el-form-item
            >
            <el-form-item label="Descripción : ">
              <p>{{ detalleRecibo.listaComprobanteDetalle[0].descripcion }}</p>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogEstado = true" plain
              >Aprobar</el-button
            >
            <el-button type="danger" @click="dialogEstadoDenegado = true" plain
              >Rechazar</el-button
            >
            <el-button @click="dialogVisibleDetalle = false">Cerrar</el-button>
          </span>
        </el-dialog>
        <el-dialog title="Estado" :visible.sync="dialogEstado" width="30%">
          <span>Seguro que desea comfirmar el documento?</span>
          <span slot="footer" class="dialog-footer">
            <el-button type="danger" @click="dialogEstado = false"
              >No</el-button
            >
            <el-button type="primary" @click="Aprobar(detalleRecibo)"
              >Si</el-button
            >
          </span>
        </el-dialog>
        <el-dialog
          title="Estado"
          :visible.sync="dialogEstadoDenegado"
          width="30%"
        >
          <span>Seguro que desea rechazar el documento?</span>
          <span slot="footer" class="dialog-footer">
            <el-button type="danger" @click="dialogEstadoDenegado = false"
              >No</el-button
            >
            <el-button type="primary" @click="IngresarObservacion = true"
              >Si</el-button
            >
          </span>
        </el-dialog>
        <el-dialog
          title="Observación"
          :visible.sync="IngresarObservacion"
          width="20%"
        >
          <el-input type="textarea" autosize v-model="observacion"> </el-input>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="Rechazar(detalleRecibo)"
              >Guardar</el-button
            >
          </span>
        </el-dialog>
        </div>
        </div>
      </el-row>
     </section>
    </div>
  </div>
</template>
<script>
// import Vue2Filters from 'vue2-filters'
import moment from "moment";
import axios from "axios";
import TituloHeader from "../comun/TituloHeader.vue";

export default {
  components: {
    TituloHeader,
  },
  data() {
    return {
      detalleRecibo: null,
      dialogVisibleDetalle: false,
      itemSeleccionado: null,
      dialogEstadoDenegado: false,
      dialogEstado: false,
      IngresarObservacion: false,
      observacion: null,
      numeroFac: null, //null,
      fecha: null,
      fechaInicio: null,
      fechaFin: null,
      Estado: null,
      dialogVisible: false,
      value1: null,
      value2: null,
      numeroRuc: null,
      tipoComprobanteResultado: null,
      tipoComprobanteSeleccionado: null,
      tableData: null,
    };
  },
  created() {
    this.OntenerCatalogo();
  },
  mounted() {
    this.BuscarFacturas();
  },
  methods: {
    OntenerCatalogo() {
      
      let url = constantes.rutaAdmin+"/consultar-parametro";
      axios
        .get(url, {
          params: {
            idParametroTipo: 7,
          },
        })
        .then((response) => {
          this.tipoComprobanteResultado = response.data.result;
        })
        .catch((e) => console.log(e));
    },

    formatoFecha(fecha) {
      return moment(fecha).format("DD-MM-YYYY");
    },
    verDetalle(detalle) {
      // if(detalle.id007TipoComprobante == 26){
      // this.detalleRecibo = detalle
      // this.dialogVisibleDetalle = true
      // }
      // else{
      if (localStorage.getItem("User") == 'CLD') {
        let ruta = "/programacion";
        let routeData = this.$router.resolve({
          path: `${ruta}/${detalle.idComprobante}`,
        });
        window.open(routeData.href, "_blank");
      } else {
        let ruta = "/DetalleFactura";
        let routeData = this.$router.resolve({
          path: `${ruta}/${detalle.idComprobante}`,
        });
        window.open(routeData.href, "_blank");
      }
    },
    previo(param) {
      this.itemSeleccionado = param;
    },
    Aprobar(detalle) {
      this.dialogEstado = false;
      this.dialogVisibleDetalle = false;
      console.log(detalle);
      
      let url = constantes.rutaAdmin+"/estado-factura";
      axios
        .get(url, {
          params: {
            idComprobante: detalle.idComprobante,
            estado: 10,
            id008Trazabilidad: 28,
            observacion: "ninguna",
            usuarioModificador: localStorage.getItem("User"),
            usuarioResponsable: "AAA",
          },
        })
        .then((response) => {
          console.log(response);
          this.BuscarFacturas();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    Rechazar(detalle) {
      this.dialogEstadoDenegado = false;
      this.IngresarObservacion = false;
      this.dialogVisibleDetalle = false;
      
      let url = constantes.rutaAdmin+"/estado-factura";
      axios
        .get(url, {
          params: {
            idComprobante: detalle.idComprobante,
            estado: 11,
            id008Trazabilidad: 29,
            observacion: this.observacion,
            usuarioModificador: localStorage.getItem("User"),
            usuarioResponsable: "AAA",
          },
        })
        .then((response) => {
          console.log(response);
          this.BuscarFacturas();
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
    },
    BuscarFacturas() {
      let fechaInicio =
        this.fecha == null ? null : moment(this.fecha[0]).format("YYYY-MM-DD");
      let fechaFin =
        this.fecha == null ? null : moment(this.fecha[1]).format("YYYY-MM-DD");
      console.log(fechaInicio);
      console.log(fechaFin);

      let url = constantes.rutaAdmin+"/consultar-comprobante";
      axios
        .get(url, {
          params: {
            usuariosresponsable: localStorage.getItem("User"),
            numeroFac: this.numeroFac,
            fecInicio: fechaInicio,
            nroDocumento: this.numeroRuc,
            fecFin: fechaFin,
            tipoComprobante: this.tipoComprobanteSeleccionado,
          },
        })
        .then((response) => {
          this.tableData = response.data.result;
          console.log(this.tableData);
          //  alert( response.data.result[0].numeroFactura);
        })
        .catch((e) => console.log(e));
    },

    mostrarDetalleFacturadialog(valores) {
      this.dialogVisibleDetalle = true;
      this.detalleOrden = valores.facturasDestalle;
    },
  },
};
</script>

<style>
</style>
