<template>
  <div class="componente">
    <el-row>
      <!-- <el-col :md="5">
        <label>Nro. archivo:</label>
        <el-input placeholder="Nro. de archivo"></el-input>
      </el-col> -->
      <el-col :md="8">
        <label>Fecha programada de pago:</label>
        <el-date-picker v-model="fecha" style="width: 100%" placeholder="Fecha">
        </el-date-picker>
      </el-col>
      <el-col :md="6">
        <label>Banco:</label>
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
    <el-row>
      <div class="contenedor-body my-5">
        <label
          >Seleccione los comprobantes que se incluirán en esta
          programación</label
        >
        <el-table
          ref="multipleTable"
          :data="listaComprobantes"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column label="Fecha">
            <template slot-scope="scope">{{ scope.row.vencimiento }}</template>
          </el-table-column>
          <el-table-column property="proveedor" label="Proveedor">
          </el-table-column>
          <el-table-column
            property="comprobante"
            label="Comprobante"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column property="moneda" label="Moneda"> </el-table-column>
          <el-table-column
            property="importe"
            label="Importe"
            style="text-align: right"
          >
          </el-table-column>
        </el-table>
      </div>
    </el-row>
    <label></label>
  </div>
</template>

<script>
import moment from 'moment';
import constantes from "../../store/constantes";
import axios from "axios";

export default {
  data() {
    return {
      tableData: [
        {
          idComprobante: 1,
          proveedor: "Pharma salud",
          comprobante: "Factura E551-016",
          vencimiento: "2021-11-15",
          moneda: "SOLES",
          importe: "120, 012.85",
        },
        {
          idComprobante: 2,
          proveedor: "Pharma salud",
          comprobante: "Factura E551-016",
          vencimiento: "2021-11-15",
          moneda: "SOLES",
          importe: "120, 012.85",
        },
        {
          idComprobante: 3,
          proveedor: "Pharma salud",
          comprobante: "Factura E551-016",
          vencimiento: "2021-11-15",
          moneda: "SOLES",
          importe: "120, 012.85",
        },
        {
          idComprobante: 4,
          proveedor: "Pharma salud",
          comprobante: "Factura E551-016",
          vencimiento: "2021-11-15",
          moneda: "SOLES",
          importe: "120, 012.85",
        },
      ],
      multipleSelection: [],
      options: [
        {
          value: "1",
          label: "BBVA",
        },
        {
          value: "2",
          label: "SCOTIABANCK",
        },
      ],
      value: "",

      tipoComprobanteSeleccionado: 24,
      listaComprobantes: [],
      fecha: new Date(),
    };
  },
  mounted(){
    this.BuscarFacturas()
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    crearArchivoLote(){
      let url = constantes.rutaAdmin + "/nuevo-lote-archivo";
      let nuevoArchivo = new Object();
      nuevoArchivo.fechaProgramacion = this.fecha;
      nuevoArchivo.idUsuarioRegistro = localStorage.getItem("idUsuario");
      nuevoArchivo.usuarioRegistro = localStorage.getItem("User");
      nuevoArchivo.id009Banco = this.value;
      // listaArchivoBancoDetalle;
	
      axios
        .post(url, nuevoArchivo).then((response) => {
          console.log("console");
        });
    },
    BuscarFacturas() {
      let fechaInicio =
        this.fecha == null ? null : moment(this.fecha[0]).format("YYYY-MM-DD");
      let fechaFin =
        this.fecha == null ? null : moment(this.fecha[1]).format("YYYY-MM-DD");
      console.log(fechaInicio);
      console.log(fechaFin);

      let url = constantes.rutaAdmin + "/consultar-comprobante";
      axios
        .get(url, {
          params: {
            // usuariosresponsable: localStorage.getItem("User"),
            // numeroFac: this.numeroFac,
            // fecInicio: fechaInicio,
            // nroDocumento:
            //   this.numeroRuc != null && this.numeroRuc.length > 0
            //     ? this.numeroRuc
            //     : null,
            // fecFin: fechaFin,
            // tipoComprobante: this.tipoComprobanteSeleccionado,
          },
        })
        .then((response) => {
          console.log("Mostrando la lista de comprobantes");
          console.log(response.data.result);
          let array = new Array()
          response.data.result.forEach((item) =>{
            let objeto = new Object();
            objeto.idComprobante= item.idComprobante,
            objeto.proveedor= item.proveedorNombre,
            objeto.comprobante= item.nombreTipoComprobante +' '+ item.serie +' - '+ item.numero,
            objeto.vencimiento= item.fechaVencimiento.slice(0, 10),
            objeto.moneda=  item.nombreMoneda,
            objeto.importe= item.importeTotal,
            array.push(objeto)
          })
          this.listaComprobantes = array;
        })
        .catch((e) => console.log(e));
    },
  },
};
</script>

<style></style>
