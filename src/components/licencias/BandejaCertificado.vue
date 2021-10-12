<template>
  <div class="content-wrapper list-table">
    <section class="content-header">
      <div class="col-sm-12">
        <h4 class="title-top">Módulo de Certificados de Parámetros Urbanísticos y Edificatorios</h4>
      </div>
    </section>
    <section>
      <div class="col-md-12">
        <div class="card">
          <form>
            <div class="row">
              <div class="col-12 col-md-5">
                <div class="form-group row">
                  <div class="form-group col-12 col-md-3">
                    <label for>Solicitante</label>
                  </div>
                  <div class="form-group col-12 col-md-4">
                    <el-select class="btn-block" v-model="idTipodocumento" clearable placeholder="Seleccione">
                      <el-option
                        v-for="tipoDocumento in listaTipoDocumento"
                        :key="tipoDocumento.id"
                        :label="tipoDocumento.des_nombre"
                        :value="tipoDocumento.ide_elemento">
                      </el-option>
                    </el-select>
                  </div>
                  <div class="form-group col-12 col-md-5">
                    <el-input placeholder="Ingrese Documento" v-model="numeroDocumentoModelo"></el-input>
                  </div>
                </div>
              </div>
              <div class="col-12 col-md-5">
                <div class="form-group row">
                  <div class="col-12 col-md-3">
                    <label for>Expediente</label>
                  </div>
                  <div class="form-group col-12 col-md-4">
                    <el-input v-model="anioExpedienteModelo"></el-input>
                  </div>
                  <div class="form-group col-12 col-md-5">
                    <el-input v-model="numeroExpedienteModelo"></el-input>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-5 col-12">
                <div class="form-group row">
                  <div class="form-group col-12 col-md-3">
                    <label for>Cuc</label>
                  </div>
                  <div class="form-group col-12 col-md-3">
                    <el-input v-model="inputdefault" :disabled="true"></el-input>
                  </div>
                  <div class="form-group col-12 col-md-3">
                    <el-input v-model="manzanaModelo"></el-input>
                  </div>
                  <div class="form-group col-12 col-md-3">
                    <el-input v-model="loteModelo"></el-input>
                  </div>
                </div>
              </div>
              <div class="col12 col-md-5">
                <div class="form-group row">
                  <div class="form-group col-12 col-md-3">
                    <label for>Estado</label>
                  </div>
                  <div class="form-group col-12 col-md-9">
                     <el-select class="btn-block" v-model="idEstado" clearable placeholder="Seleccione">
                      <el-option
                        v-for="estado in listaEstado"
                        :key="estado.id"
                        :label="estado.des_nombre"
                        :value="estado.ide_elemento">
                      </el-option>
                    </el-select>
                  </div>
                </div>
              </div>
              <div class="form-group col-12 col-md-2">
                <el-button  @click="getCertificados" :loading="loading" class="btn-block" type="primary">Buscar</el-button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
    <section class="m-b-20">
      <div class="col-md-12">
        <!-- Mobile-->
        <div class="card d-block d-sm-none">
          <data-tables-server :loading="loading" :total="certificadosJson.length > 0 ? certificadosJson[0].totalBandeja : 0" @query-change="CambiarPagina" @row-click="Editar" :page-size="pageSize" :pagination-props="{ background: true, pageSizes: [10, 20, 50, 100] }" :data="certificadosJson">
            <el-table-column type="expand">
              <template v-slot="scope">
                <p>Solicitante: {{scope.row.idExpediente.numeroDocumentoSolicitante}}-{{scope.row.idExpediente.nombreCompletoSolicitante}}</p>
              </template>
            </el-table-column>
            <el-table-column label="Expediente" prop="idExpediente">
              <template v-slot="scope">
                {{scope.row.idExpediente.anio}}-{{scope.row.idExpediente.numeroExpediente}}
              </template>
            </el-table-column>
            <el-table-column label="Estado" prop="idEstado">
              <template v-slot="scope">
                <el-tag :type="scope.row.idEstado.des_nombre == 'CREADO' ? 'success' : ''" size="medium">{{ scope.row.idEstado.des_nombre }}</el-tag>
              </template>
            </el-table-column>
          </data-tables-server>
        </div>
        <!-- Desktop-->
        <div class="card d-none d-sm-block">
          <data-tables-server :loading="loading" :total="certificadosJson.length > 0 ? certificadosJson[0].totalBandeja : 0" @query-change="CambiarPagina" @row-dblclick="Editar" :page-size="pageSize" :pagination-props="{ background: true, pageSizes: [10, 20, 50, 100] }" :data="certificadosJson">
            <el-table-column v-for="(title, index) in titles" :prop="title.prop" :label="title.label" :key="index">
              <template v-if="title.label == 'Expediente' || title.label == 'Solicitante' || title.label == 'Estado'" v-slot="scope">
                <span v-if="title.label == 'Expediente'">{{scope.row.idExpediente.anio}}-{{scope.row.idExpediente.numeroExpediente}}</span>
                <span v-if="title.label == 'Solicitante'">{{scope.row.idExpediente.numeroDocumentoSolicitante}}-{{scope.row.idExpediente.nombreCompletoSolicitante}}</span>
                <span v-if="title.label == 'Estado'"><el-tag :type="scope.row.idEstado.des_nombre == 'CREADO' ? 'success' : ''" size="medium">{{ scope.row.idEstado.des_nombre }}</el-tag></span>
              </template>
            </el-table-column>           
          </data-tables-server>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import axios from "axios";
import Constantes from "../../store/constantes.js";
export default {
  name: "BandejaCertificado",
  data() {
    return {
    titles: [{
      prop: "idExpediente",
      label: "Expediente"
      }, {
      prop: "idExpediente",
      label: "Solicitante"
      }, {
      prop: "cuc",
      label: "CUC"
      },
      {
      prop: "zonificacion",
      label: "Zonificación"
      },
      {
      prop: "nroCertificado",
      label: "Nro Certif."
      },
      {
      prop: "fechaEmision",
      label: "Emision"
      },
      {
      prop: "fechaCaducidad",
      label: "Caducidad"
      },
        {
      prop: "idEstado",
      label: "Estado"
      },
        {
      prop: "Ver",
      label: "Ver"
      }
    ],
      loading : true,
      inputdefault: '022',
      certificadosJson: null,
      listaParametrosAux: null,
      listaEstado: null,
      listaTipoDocumento: null,
      idTipodocumento: null,
      idEstado: null,
      numeroDocumentoModelo: "",
      numeroExpedienteModelo: "",
      anioExpedienteModelo: "",
      manzanaModelo: "",
      loteModelo: "",
      indice: 1,
      pageSize: 10,
      listaPaginas: null,
      cantidadPaginasBandeja: 0,
    };
  },
  mounted() {
    if (localStorage.getItem("logueado") == "true") {
      console.log("está logueado");
      console.log(localStorage);
      this.getCertificados();
      this.getParametros(7);
      this.getParametros(460);
    } else {
      this.$router.push("/auth/login/");
    }
  },
  methods: {
    CambiarPagina(pagina) {
      console.log(pagina)
      if (pagina.page > 0) {
        this.indice = pagina.page
        this.pageSize = pagina.pageSize
        this.getCertificados()
      }
    },
    getParametros(grupo) {
      axios
        .get(Constantes.ruta + "ctlmelecgo/" + grupo + "/0")
        .then((response) => {
          switch (grupo) {
            case 7:
              {
                console.log("examinando listaTipoDocumento");
                this.listaTipoDocumento = response.data.data;
                console.log(this.listaTipoDocumento);
              }
              break;
            case 460:
              {
                console.log("examinando listaEstado" + grupo);
                this.listaEstado = response.data.data;
                console.log(this.listaEstado);
              }
              break;
          }
        })
        .catch((e) => console.log(e));
    },
    reemplazaVacio(cadena, reemplazo) {
      return cadena == "" ? "-" : cadena;
    },
    reemplazaVacioEntero(cadena, reemplazo) {
      return cadena == "" ? "0" : cadena;
    },
    getCertificados() {
      this.loading = true
      ///{tipoDocumento}/{numeroDocumento}/{numeroExpediente}/{manzana}/{lote}/{estado}/{indice}/{limite}
      var url =
        Constantes.ruta +
        "certificadoBandeja/" +
        (this.idTipodocumento ? this.idTipodocumento : 0) +
        "/" +
        this.reemplazaVacio(this.numeroDocumentoModelo) +
        "/" +
        this.reemplazaVacio(this.numeroExpedienteModelo) +
        "/" +
        this.reemplazaVacioEntero(this.anioExpedienteModelo) +
        "/" +
        this.reemplazaVacio(this.manzanaModelo) +
        "/" +
        this.reemplazaVacio(this.loteModelo) +
        "/" +
        (this.idEstado ? this.idEstado : 0) +
        "/" +
        this.indice +
        "/" +
        this.pageSize;
      console.log(url);
      axios
        .get(url)
        .then((response) => {
          this.loading = false
          console.log(response);
          this.certificadosJson = response.data.data;
          console.log(this.certificadosJson)
          var objeto = this.certificadosJson.data;
          console.log(
            "cantidad de certificados" + this.certificadosJson.length
          );
          this.listaPaginas = null;
          this.listaPaginas = [1];
          var cantidadPaginas = 0;
          this.cantidadPaginasBandeja = 0;
          console.log("cantidad de páginas" + cantidadPaginas);
          if (this.certificadosJson.length > 0) {
            console.log(this.certificadosJson[0].totalBandeja);
            cantidadPaginas = Math.ceil(
              this.certificadosJson[0].totalBandeja / this.pageSize
            );
            this.cantidadPaginasBandeja = cantidadPaginas;
            console.log("cantidad de páginas" + cantidadPaginas);
            var nuevaPagina = 2;
            var primeraPaginaAuxiliar = 0;
            var segundaPaginaAuxiliar = 0;
            if (this.cantidadPaginasBandeja <= 10) {
              while (nuevaPagina <= cantidadPaginas) {
                this.listaPaginas.push(nuevaPagina);
                nuevaPagina++;
                console.log("Ingreso a pushear listaPaginas" + nuevaPagina);
                console.log(this.listaPaginas);
              }
            } else {
              while (nuevaPagina <= cantidadPaginas) {
                console.log("pintando indice" + this.indice);
                if (nuevaPagina <= 3) {
                  this.listaPaginas.push(nuevaPagina);
                  console.log("Ingreso a pushear listaPaginas" + nuevaPagina);
                  console.log(this.listaPaginas);
                } else {
                  if (
                    (nuevaPagina > this.indice - 3 &&
                      nuevaPagina < this.indice + 3) ||
                    nuevaPagina >= this.cantidadPaginasBandeja - 3
                  ) {
                    this.listaPaginas.push(nuevaPagina);
                    console.log("Ingreso a pushear listaPaginas" + nuevaPagina);
                    console.log(this.listaPaginas);
                  } else {
                    if (
                      primeraPaginaAuxiliar == 0 &&
                      nuevaPagina <= this.indice - 3
                    ) {
                      this.listaPaginas.push(-1);
                      primeraPaginaAuxiliar = 1;
                    }
                    if (
                      segundaPaginaAuxiliar == 0 &&
                      nuevaPagina >= this.indice + 3
                    ) {
                      this.listaPaginas.push(-1);
                      segundaPaginaAuxiliar = 1;
                    }
                  }
                }

                nuevaPagina++;
              }
            }
          }
          console.log("Pintando listaPaginas");
          console.log(this.listaPaginas);
          /* console.log('pintando certificadosJson');
                    console.log('0');
                    console.log(this.certificadosJson); */
        })
        .catch((e) => console.log(e));
    },
    Editar(idExpediente) {
      this.$router.push(
        "/components/licencias/editarcertificado/" + idExpediente.idExpediente.idExpediente
      );
    },
    PadLeft(value, length) {
      return value.toString().length < length
        ? PadLeft("0" + value, length)
        : value;
    },
  },
  filters: {
    pintaPuntos(pagina) {
      if (pagina == -1) {
        return "...";
      } else {
        return pagina;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
table tr td, .table thead th {
  font-size: 14px;
}
table tr td {
  color: #52575C;
}
.table thead th {
  color: #0078CF;
  font-weight: 600;
  border-bottom: 0px;
  padding-top: 0;
  border-top: 0px;
}
input,
select {
  background: #f2f4f8;
  color: #003c67;
  font-weight: 600;
}
.btn.btn-primary {
  background: #26bdc5;
  font-size: 14px;
  border-color: #26bdc5;
  border-radius: 5px;
}
.list-table .card {
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(49, 59, 160, 0.05);
  border: 1px solid #f2f4f8;
  padding: 20px;
}
form label {
  margin-bottom: 0;
  color: #52575C;
}
h4.title-top {
  font-weight: 600;
  color: #0078cf;
  padding-bottom: 20px;
  padding-top: 20px;
  font-size: 16px;
}
.card .form-group.row {
  align-items: center;
}
.pagination {
  display: -webkit-inline-box;
  margin-bottom: 0;
  padding-top: 45px;
}
.m-b-20 {
  margin-bottom: 50px;
}
</style>