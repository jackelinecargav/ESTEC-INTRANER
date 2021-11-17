<template>
  <div class="contenedor-principal">
    <titulo-header>Programacion pago</titulo-header>
    <div class="card menu">
      <div class="">
        <el-row>
          <el-col :md="5">
            <label>Nro. archivo:</label>
            <el-input placeholder="Nro. de archivo"></el-input>
          </el-col>
          <el-col :md="8">
            <label>Fecha:</label>
            <el-date-picker
              v-model="fecha"
              type="daterange"
              style="width: 100%"
              range-separator="a"
              start-placeholder="Desde"
              end-placeholder="Hasta"
            >
            </el-date-picker>
          </el-col>
          <el-col :md="4">
            <label>Estado:</label>
            <el-select v-model="value" placeholder="Select">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row :gutter="10" style="display: flex; justify-content: flex-end;">
          <el-col :md="4">
            <el-button type="primary" style="width: 100%; ">Buscar</el-button>
          </el-col>
          <el-col :md="4">
            <el-button
              type="primary"
              style="width: 100%; "
              @click="mostrarPopup = true"
              >Nuevo</el-button
            >
          </el-col>
        </el-row>
      </div>
      <div class="contenedor-body my-5">
        <table id="example2" class="table table-hover table-sm mb-2">
          <thead>
            <tr>
              <th width="10%" class="text-center">Nro. archivo</th>
              <th width="20%" class="text-center">Fecha programación</th>
              <th width="20%" class="text-center">Banco</th>
              <th width="10%" class="text-center">Cantidad</th>
              <th width="20%" class="text-center">Usuario</th>
              <th width="10%" class="text-center">Estado</th>
              <th width="10%" class="text-center"></th>
              <!-- <th class="text-center" width="7%"></th> -->
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item of listaArchivos"
              :key="'archivo ' + item.numeroArchivo"
            >
              <td style="text-align:center">
                <template>{{ item.numeroArchivo }}</template>
              </td>
              <td style="text-align:center">
                <template>{{ item.fechaProgramacion }}</template>
              </td>
              <td style="text-align:center">
                <template v-if="item.banco==39">{{ 'BBVA' }}</template>
                <template v-else>{{ 'SCOTIABANK' }}</template>
              </td>
              <td  style="text-align:center">
                <template>{{ item.cantidad }}</template>
              </td>
              <td  style="text-align:center">
                <template>{{ item.usuario }}</template>
              </td>
              <td style="text-align:center">
                <template v-if="item.estado == ESTADO_PROGRAMADO">{{
                  "Programado"
                }}</template>
                <template v-if="item.estado == ESTADO_PENDIENTE">{{
                  "Pendiente"
                }}</template>
              </td>
              <td>
                <template>
                  <el-button @click="verDetalle(item.numeroArchivo)" type="text"
                    >Detalle</el-button
                  >
                </template>
                <template></template>
                <template></template>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <el-dialog
        :visible.sync="mostrarPopup"
        title="Nueva programacion de pago"
        width="60%"
      >
        <nuevo></nuevo>
        <span slot="footer" class="dialog-footer">
          <el-button @click="mostrarPopup = false">Cancel</el-button>
          <el-button type="primary">Generar programacion</el-button></span
        >
      </el-dialog>
    </div>
  </div>
</template>

<script>
import TituloHeader from "../comun/TituloHeader.vue";
import Nuevo from "./Nuevo.vue";
import moment from "moment";
import constantes from "../../store/constantes";
import axios from "axios";
export default {
  components: { TituloHeader, Nuevo },
  data() {
    return {
      ESTADO_PENDIENTE: 1,
      ESTADO_PAGADO: 2,
      ESTADO_CANCELADO: 3,
      ESTADO_PROGRAMADO: 4,
      detalleOrden: null,
      detalleData: null,
      dialogVisible: false,
      numeroOrden: null,
      fecha: null,
      fechaInicio: null,
      fechaFin: null,
      Estado: null,
      mostrarPopup: false,
      listaArchivos: [
        // {
        //   numeroArchivo: "1",
        //   fechaProgramacion: moment(new Date()).format("DD-MM-YYYY"),
        //   banco: "BBVA",
        //   cantidad: "4",
        //   usuario: "AAA",
        //   estado: "4",
        // },
        // {
        //   numeroArchivo: "2",
        //   fechaProgramacion: moment(new Date()).format("DD-MM-YYYY"),
        //   banco: "SCOTIABANK",
        //   cantidad: "5",
        //   usuario: "CBM",
        //   estado: "4",
        // },
      ],
      options: [
        {
          value: "1",
          label: "Pendiente",
        },
        {
          value: "2",
          label: "Pagado",
        },
        {
          value: "3",
          label: "Cancelado",
        },
        {
          value: "4",
          label: "Programado",
        },
      ],
      value: "",

    };
  },
  mounted(){
    this.BuscarFacturas()
  },
  methods: {
    obtenerPendientes() {
      console.log("Nuevo log");
    },
    verDetalle(val) {
      let routeData = this.$router.resolve({
        path: "/components/archivo-banco/DetalleArchivo/"+val,
      });
      window.open(routeData.href, "_blank");
    },
    BuscarFacturas() {
      let fechaInicio =
        this.fecha == null ? null : moment(this.fecha[0]).format("YYYY-MM-DD");
      let fechaFin =
        this.fecha == null ? null : moment(this.fecha[1]).format("YYYY-MM-DD");
      console.log(fechaInicio);
      console.log(fechaFin);

      let url = constantes.rutaAdmin + "/consulta-lote-archivo";
      axios
        .get(url, {
          params: {
            // usuariosresponsable: localStorage.getItem("User"),
            // idArchivo: this.idarchivo,
            // tipoComprobante: this.tipoComprobanteSeleccionado,
            // fecInicio: fechaInicio,
            // fecFin: fechaFin,
          },
        })
        .then((response) => {
          console.log("Mostrando la lista de comprobantes");
          console.log(response.data.resultado);
          let array = new Array()
          response.data.resultado.forEach((item) =>{
            let objeto = new Object();
            objeto.numeroArchivo= item.idArchivoBanco,
            objeto.fechaProgramacion= item.fechaProgramacion,
            objeto.banco= item.id009Banco,
            objeto.cantidad= item.cantidadRegistros,
            objeto.usuario=  item.usuarioRegistro,
            objeto.estado= item.id001Estado,
            array.push(objeto)
          })
          this.listaArchivos = array;
        })
        .catch((e) => console.log(e));
    },
  },
};
</script>

