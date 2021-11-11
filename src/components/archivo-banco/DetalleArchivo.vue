<template>
  <div class="contenedor-principal">
    <titulo-header>Detalle archivo</titulo-header>
    <div class="card menu">
      <div class="">
        <el-row>
          <el-col :md="5">
            <label>Nro. comprobante:</label>
            <el-input placeholder="Nro. de comprobante"></el-input>
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
          <!-- <el-col :md="4">
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
          </el-col> -->
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
              >Generar Archivo</el-button
            >
          </el-col>
        </el-row>
      </div>
      <div class="contenedor-body my-5">
        <table id="example2" class="table table-hover table-sm mb-2">
          <thead>
            <tr>
              <th width="10%" class="text-center">Comprobante</th>
              <th width="20%" class="text-center">Proveedor</th>
              <th width="10%" class="text-center">F. vencimiento</th>
              <th width="10%" class="text-center">Moneda</th>
              <th width="10%" class="text-center">Importe total</th>
              <th width="10%" class="text-center">Estado</th>
              <th width="10%" class="text-center"></th>
              <th width="10%" class="text-center"></th>
              <!-- <th class="text-center" width="7%"></th> -->
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item of listaArchivos"
              :key="'archivo ' + item.idArchivoDetalle"
            >
              <td>
                <template>{{ item.comprobante }}</template>
              </td>
              <td>
                <template>{{ item.proveedor }}</template>
              </td>
              <td style="text-align: center">
                <template>{{ item.vencimiento }}</template>
              </td>
              <td style="text-align: center">
                <template>{{ item.moneda }}</template>
              </td>
              <td style="text-align: right">
                <template>{{ item.importe }}</template>
              </td>
              <td style="text-align: right">
                <template><div>{{ item.estado }}</div></template>
              </td>
              <td>
                <!-- <template v-if="item.estado == ESTADO_PROGRAMADO">{{
                  "Programado"
                }}</template>
                <template v-if="item.estado == ESTADO_PENDIENTE">{{
                  "Pendiente"
                }}</template> -->
                  <el-button style="width: 100%" type="text">Detalle</el-button>
              </td>
              <td>
                <template>
                  <el-button style="width: 100%; color: red" type="text">Eliminar</el-button>
                </template>
                <template></template>
                <template></template>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <el-dialog :visible.sync="mostrarPopup" title="Crear nuevo archivo">
        <nuevo></nuevo>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import TituloHeader from "../comun/TituloHeader.vue";
import Nuevo from "./Nuevo.vue";
import moment from "moment";
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
        {
          idArchivoDetalle: 1,
          proveedor: "Pharma salud",
          comprobante: "Factura E551-016",
          vencimiento: "2021-11-15",
          moneda: "SOLES",
          importe: "120, 012.85",
          estado: "Pendiente Pago",
        },
        {
          idArchivoDetalle: 2,
          proveedor: "Pharma salud",
          comprobante: "Factura E551-016",
          vencimiento: "2021-11-15",
          moneda: "SOLES",
          importe: "120, 012.85",
          estado: "Pendiente Pago",
        },
        {
          idArchivoDetalle: 3,
          proveedor: "Pharma salud",
          comprobante: "Factura E551-016",
          vencimiento: "2021-11-15",
          moneda: "SOLES",
          importe: "120, 012.85",
          estado: "Pendiente Pago",
        },
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
  methods: {
    obtenerPendientes() {
      console.log("Nuevo log");
    },
  },
};
</script>

<style lang="scss" scoped></style>
