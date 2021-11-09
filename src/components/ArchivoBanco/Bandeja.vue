<template>
  <div class="contenedor-principal">
    <titulo-header>Archivo banco</titulo-header>
    <div>
      <div class="contenedor-header">
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
            <input/>
          </el-col>
          <el-col :md="4">
            <div style="margin-top: 23px; margin-left: 40px"></div>
            <el-button style="width: 100%; margin-left: 40px">Buscar</el-button>
          </el-col>
          <el-col :md="4" style=" margin-left: 40px">
            <div style="margin-top: 23px"></div>
            <el-button style="width: 100%; margin-left: 40px" @click="mostrarPopup=true">Nuevo</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="contenedor-body">
        <table id="example2" class="table table-hover table-sm mb-2">
          <thead>
            <tr>
              <th class="text-center">Número Factura</th>
              <th class="text-center">Fecha</th>
              <th class="text-center">Moneda</th>
              <th class="text-center">IGV</th>
              <th class="text-center">Importe</th>
              <th class="text-center">Saldo</th>
              <th class="text-center">estado</th>
              <!-- <th class="text-center" width="7%"></th> -->
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item of tableData"
              :key="'facturas ' + item.numeroFactura"
            >
              <td>
                <template>{{ item.numeroFactura }}</template>
              </td>
              <td>
                <template>{{ item.fechaDocumento }}</template>
              </td>
              <td>
                <template>{{ item.moneda }}</template>
              </td>
              <td>
                <template>{{ item.igv }}</template>
              </td>
              <td>
                <template>{{ item.importeSoles }}</template>
              </td>
              <td>
                <template>{{ item.saldo }}</template>
              </td>
              <td>
                <template>{{ item.estado }}</template>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <el-dialog :visible.sync="mostrarPopup">
        <nuevo></nuevo>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import TituloHeader from "../utils/TituloHeader.vue";
import Nuevo from './Nuevo.vue';
export default {
  components: { TituloHeader, Nuevo },
  data() {
    return {
      detalleOrden: null,
      detalleData: null,
      dialogVisible: false,
      numeroOrden: null,
      fecha: null,
      fechaInicio: null,
      fechaFin: null,
      Estado: null,
      mostrarPopup: false,
      options: [
        {
          name: "Consolidado",
          valor: "c",
        },
        {
          name: "RE-PROCESADA",
          valor: "R",
        },
      ],
      tableData: null,
    };
  },
  methods: {
    obtenerPendientes() {
      console.log("Nuevo log");
    },
  },
};
</script>

<style lang="scss" scoped>

</style>