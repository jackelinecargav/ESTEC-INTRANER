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
          :data="tableData"
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
    };
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
  },
};
</script>

<style></style>
