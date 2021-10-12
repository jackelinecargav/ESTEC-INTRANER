<template>
  <div class="content-wrapper">
    <loading
      :active.sync="isLoading"
      :is-full-page="true"
      color="#007BFF"
    ></loading>
    <titulo-header>Módulo de Trámite</titulo-header>
    <section>
      <el-row class="px-1">
        <div class="card menu">
          <el-row :gutter="10">
            <el-col :md="3">
              <label class="col-form-label">Solicitante</label>
            </el-col>
            <el-col :md="4">
              <template>
                <el-select v-model="idTipodocumento" filterable>
                  <el-option :value="0" label="Todos"></el-option>
                  <el-option
                    v-for="tipoDocumento of listaTipoDocumento"
                    :key="tipoDocumento.idParametro"
                    :value="tipoDocumento.idParametro"
                    :label="tipoDocumento.nombre"
                  >
                  </el-option>
                </el-select>
              </template>
            </el-col>
            <el-col :md="4">
              <input
                type="text"
                class="form-control"
                placeholder="Ingrese Documento"
                v-model="numeroDocumentoModelo"
              />
            </el-col>
            <el-col :md="3">
              <label
                for="exampleInputPassword1"
                class="col-form-label"
                style="padding-right: 0px; !important"
                >Tipo Trámite</label
              >
            </el-col>
            <el-col :md="10">
              <template>
                <el-select
                  placeholder="Seleccione"
                  v-model="idTipoTramite"
                  filterable
                  clearable
                  :popper-append-to-body="false"
                >
                  <el-option :value="0" label="Todos"></el-option>
                  <el-option
                    v-for="tipoTramite of listaTramite"
                    :key="tipoTramite.idTipoTramite"
                    :value="tipoTramite.idTipoTramite"
                    :label="tipoTramite.nombre"
                  ></el-option>
                </el-select>
              </template>
            </el-col>
          </el-row>
          <el-row :gutter="10" class="my-2">
            <el-col :md="3"><label>Estado</label></el-col>
            <el-col :md="4">
              <template>
                <el-select v-model="idEstado" filterable>
                  <el-option :value="0" label="Todos"></el-option>
                  <el-option
                    v-for="estado of listaEstado"
                    :key="estado.idParametro"
                    :value="estado.idParametro"
                    :label="estado.nombre"
                  ></el-option>
                  <el-option :value="1" label="ATENDIDO"></el-option>
                  <el-option :value="2" label="ARCHIVADO"></el-option>
                </el-select>
              </template>
            </el-col>
            <el-col :md="13"></el-col>
            <el-col :md="4">
              <el-button type="primary" @click="getTramites" class="btn-block"
                >Buscar</el-button
              >
            </el-col>
          </el-row>
        </div>
        <div class="card menu">
          <table id="example2" class="table table-hover table-sm mb-2">
            <thead>
              <tr>
                <th width="5%">Trámite</th>
                <th width="20%">Solicitante</th>
                <th width="35%">Tipo Trámite</th>
                <th width="15%">Fecha Presentación</th>
                <th width="7%">Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="tramite of tramitesJson"
                :key="tramite.idTramite"
                v-on:dblclick="Editar(tramite.idTramite)"
              >
                <td>ST-00{{ tramite.idTramite }}</td>
                <td>
                  {{ tramite.numeroDocumentoSolicitante }}-
                  {{ tramite.nombresSolicitante }}
                </td>
                <td>{{ tramite.tipoTramite.nombre }}</td>
                <td>{{ tramite.fechaPresentacion }}</td>
                <td>{{ tramite.id011Estado.nombre }}</td>
              </tr>
            </tbody>
          </table>
          <div class="d-flex justify-content-center block">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="indice"
              :page-sizes="pageOptions"
              :hide-on-single-page="hide_on_single_page"
              :pagination-props="{ background: true, pageSizes: pageSize }"
              layout="prev, pager, next, jumper, sizes, total"
              :total="(tramitesJson != null && tramitesJson != undefined && tramitesJson.length>0) ? tramitesJson[0].totalBandeja: 0">
            </el-pagination>
          </div>
          <!--<nav aria-label="...">
            <ul class="pagination">
              <li class="page-item" @click="CambiarPagina(indice - 1)">
                <span class="page-link">Anterior</span>
              </li>
              <li
                v-for="pagina of listaPaginas"
                :key="pagina.id"
                @click="CambiarPagina(pagina)"
                class="page-item"
                :class="{ active: pagina == indice }"
              >
                <a class="page-link">{{ pagina | pintaPuntos }}</a>
              </li>
              <li class="page-item" @click="CambiarPagina(indice + 1)">
                <a class="page-link">Siguiente</a>
              </li>
            </ul>
          </nav>-->
        </div>
      </el-row>
    </section>
  </div>
</template>
<script>
import axios from "axios";
import Constantes from "../../store/constantes.js";
import TituloHeader from "../comun/TituloHeader";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
export default {
  name: "BandejaCertificado",
  data() {
    return {
      hide_on_single_page: true,
      isLoading: false,
      certificadosJson: null,
      tramitesJson: null,
      listaParametrosAux: null,
      listaEstado: null,
      listaTipoDocumento: null,
      listaTramite: null,
      idTipodocumento: 0,
      idTipoTramite: 0,
      idEstado: 23,
      numeroDocumentoModelo: "",
      numeroExpedienteModelo: "",
      anioExpedienteModelo: "",
      manzanaModelo: "",
      loteModelo: "",
      indice: 1,
      listaPaginas: null,
      cantidadPaginasBandeja: 0,
      pageSize: 10,
      totalRows: 1,
      pageOptions: [10, 20, 50, 100],
    };
  },
  components: {
    TituloHeader,
    Loading,
  },
  mounted() {
    if (localStorage.getItem("logueado") == "true") {
      console.log("está logueado");
      console.log(localStorage);
      this.getParametros(11);
      //this.getCertificados();
      this.getParametros(4);
      this.getTramites();
      this.getIdTipoTramite();
    } else {
      this.$router.push("/auth/login/");
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(`${val} items per page`);
      this.pageSize = val
      this.getTramites();
    },
    handleCurrentChange(val) {
      console.log(`current page: ${val}`);
      this.indice = val
      this.getTramites();
    },
    CambiarPagina(pagina) {
      if (pagina > 0) {
        this.indice = pagina;
        this.getTramites();
      }
    },
    getIdTipoTramite() {
      axios
        .get(Constantes.rutaTramite + "tipotramite/-/0")
        .then((response) => {
          this.listaTramite = response.data.data;
        })
        .catch((e) => console.log(e));
    },
    getParametros(grupo) {
      axios
        .get(Constantes.rutaTramite + "parametro/" + grupo + "/0")
        .then((response) => {
          switch (grupo) {
            case 4:
              {
                console.log("examinando listaTipoDocumento");
                this.listaTipoDocumento = response.data.data;
                console.log(this.listaTipoDocumento);
              }
              break;
            case 11:
              {
                console.log("examinando listaEstado" + grupo);
                this.listaEstado = response.data.data;
                this.listaEstado.splice(0, 1);
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
    getTramites() {
      //var url=Constantes.rutaTramite+'tramites/0/'+this.idEstado+'/'+this.idTipoTramite + '/' + this.reemplazaVacio(this.numeroDocumentoModelo);
      var url =
        Constantes.rutaTramite +
        "bandeja-tramites/0/" +
        this.idEstado +
        "/" +
        this.idTipoTramite +
        "/" +
        this.reemplazaVacio(this.numeroDocumentoModelo) +
        "/" +
        localStorage.getItem("codUnidadLogueado") +
        "/" +
        this.indice +
        "/" +
        this.pageSize;
      console.log("url tramites get:" + url);
      axios
        .get(url)
        .then((response) => {
          console.log(response);
          this.tramitesJson = response.data.data;
          var objeto = this.tramitesJson.data;
          console.log("cantidad de tramites" + this.tramitesJson.length);
          this.listaPaginas = null;
          this.listaPaginas = [1];
          var cantidadPaginas = 0;
          this.cantidadPaginasBandeja = 0;
          console.log("cantidad de páginas" + cantidadPaginas);
          if (this.tramitesJson.length > 0) {
            cantidadPaginas = Math.ceil(
              this.tramitesJson[0].totalBandeja / this.pageSize
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
        })
        .catch((e) => console.log(e));
    },
    Editar(idTramite) {
      this.$router.push("/components/tramites/editartramite/" + idTramite);
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
.el-col {
  margin-top: 10px;
}
</style>
<style lang="scss">
.el-select-dropdown__list {
  max-width: 550px;
}
</style>
