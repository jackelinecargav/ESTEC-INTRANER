<template>
  <div class="contenedor-principal">
    <titulo-header>Archivo banco</titulo-header>
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
              <th width="10%" class="text-center">estado</th>
              <th width="10%" class="text-center"></th>
              <!-- <th class="text-center" width="7%"></th> -->
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item of listaArchivos"
              :key="'archivo ' + item.numeroArchivo"
            >
              <td>
                <template>{{ item.numeroArchivo }}</template>
              </td>
              <td>
                <template>{{ item.fechaProgramacion }}</template>
              </td>
              <td>
                <template>{{ item.banco }}</template>
              </td>
              <td>
                <template>{{ item.cantidad }}</template>
              </td>
              <td>
                <template>{{ item.usuario }}</template>
              </td>
              <td>
                <template v-if="item.estado == ESTADO_PROGRAMADO">{{
                  "Programado"
                }}</template>
                <template v-if="item.estado == ESTADO_PENDIENTE">{{
                  "Pendiente"
                }}</template>
              </td>
              <td>
                <template>
                  <el-button type="text">Detalle</el-button>
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
          numeroArchivo: "1",
          fechaProgramacion: moment(new Date()).format("DD-MM-YYYY"),
          banco: "BBVA",
          cantidad: "4",
          usuario: "AAA",
          estado: "4",
        },
        {
          numeroArchivo: "2",
          fechaProgramacion: moment(new Date()).format("DD-MM-YYYY"),
          banco: "SCOTIABANK",
          cantidad: "5",
          usuario: "CBM",
          estado: "4",
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
