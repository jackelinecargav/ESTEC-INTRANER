<template>
  <div class="componente">
    <el-row>
      <!-- <el-col :md="5">
        <label>Nro. archivo:</label>
        <el-input placeholder="Nro. de archivo"></el-input>
      </el-col> -->
      <el-col :md="8">
        <label>Fecha:</label>
        <el-date-picker v-model="fecha" style="width: 100%" placeholder="Fecha">
        </el-date-picker>
      </el-col>
      <el-col :md="6">
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
    <el-row>
      <div class="contenedor-body my-5">
        <el-table
          ref="multipleTable"
          :data="tableData"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column label="Fecha" width="120">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column property="name" label="Nombre" width="120">
          </el-table-column>
          <el-table-column
            property="comprobante"
            label="Comprobante"
            show-overflow-tooltip
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
          date: "2016-05-03",
          name: "Pharma salud",
          comprobante: "Factura E551-016",
        },
        {
          date: "2016-05-02",
          name: "Pharma salud",
          comprobante: "Recibo H. E551-016",
        },
        {
          date: "2016-05-04",
          name: "Pharma salud",
          comprobante: "Factura E551-016",
        },
        {
          date: "2016-05-01",
          name: "Pharma salud",
          comprobante: "Factura E551-016",
        },
        {
          date: "2016-05-08",
          name: "Pharma salud",
          comprobante: "Factura E551-016",
        },
        {
          date: "2016-05-06",
          name: "Pharma salud",
          comprobante: "Factura E551-016",
        },
        {
          date: "2016-05-07",
          name: "Pharma salud",
          comprobante: "Factura E551-016",
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
