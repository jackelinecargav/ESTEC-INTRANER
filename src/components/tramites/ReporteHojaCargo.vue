<template>
  <div class="content-wrapper">
    <titulo-header>Reporte de envíos</titulo-header>
    <section class="content">
      <el-card v-loading="isLoading" style="overflow: visible">
        <el-row type="flex" justify="center">
          <el-radio-group v-model="tipoBusqueda" @change="cambiarTipoBusqueda(tipoBusqueda)">
            <el-radio-button label="porHojaCargo">Buscar Por Hoja Cargo</el-radio-button>
            <el-radio-button label="porDocumento">Buscar Por Documento</el-radio-button>
            <el-radio-button label="porArea">Buscar Por Área</el-radio-button>
            <el-radio-button label="porUsuario">Buscar Por Usuario</el-radio-button>
          </el-radio-group>
        </el-row>
        <el-alert v-if="error.mensaje" :title=error.mensaje
                  :type=error.tipo :closable=false show-icon class="mb-3">
        </el-alert>
        <div v-if="tipoBusqueda==='porDocumento'">
          <el-row :gutter="20">
            <el-col :span="6">
              <label class="required">Tipo de documento</label>
            </el-col>
            <el-col :span="12">
              <el-select v-model="filtros.tipoDocumentoId" filterable clearable ref="tipoDocumentoId"
                         placeholder="Seleccione tipo documento" class="">
                <el-option v-for="item in listaTiposDocumento" :key="item.ide_elemento" :label="item.des_nombre"
                           :value="item.ide_elemento"></el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <label class="required">Año</label>
            </el-col>
            <el-col :span="12">
              <el-date-picker v-model="anio" type="year"
                              placeholder="Seleccione un año"></el-date-picker>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <label class="required">Nro. Documento</label>
            </el-col>
            <el-col :span="12">
              <el-input v-model="filtros.numeroDocumento" clearable
                        placeholder="Ingrese nro. documento"></el-input>
            </el-col>
          </el-row>
        </div>
        <div v-else-if="tipoBusqueda==='porArea' || tipoBusqueda==='porUsuario'">
          <div v-if="tipoBusqueda==='porArea'">
            <el-row :gutter="20">
              <el-col :span="6">
                <label>Unid. Orgánica origen</label>
              </el-col>
              <el-col :span="12">
                <multiselect :options="listaUnidadesOrganicasReales" :multiple="true" :close-on-select="false"
                             :clear-on-select="true" :preserve-search="false" deselect-label="Quitar"
                             select-label="Seleccionar" v-model="seleccionUnidadesOrganicas" placeholder="( TODAS )"
                             label="text" track-by="value">
                </multiselect>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6">
                <label>Unid. Orgánica destino</label>
              </el-col>
              <el-col :span="12">
                <el-select v-model="filtros.unidadDestinoId" filterable clearable
                           placeholder="Seleccione una unidad">
                  <el-option v-for="item in listaUnidadesOrganicas" :key="item.value" :label="item.text"
                             :value="item.value"></el-option>
                </el-select>
              </el-col>
            </el-row>
          </div>
          <div v-else>
            <el-row :gutter="20">
              <el-col :span="6"><label class="required">Unid. Orgánica</label></el-col>
              <el-col :span="12">
                <el-select v-model="filtros.unidadDestinoId" filterable clearable
                           placeholder="Seleccione una unidad"
                           @change="obtenerUsuariosPorUnidad(filtros.unidadDestinoId)">
                  <el-option v-for="item in listaUnidadesOrganicas" :key="item.value" :label="item.text"
                             :value="item.value"></el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6"><label class="required">Usuario</label></el-col>
              <el-col :span="12">
                <el-select v-model="filtros.usuarioDestinatarioId" filterable clearable
                           placeholder="Seleccione un usuario">
                  <el-option v-for="item in listaUsuariosPorUnidad" :key="item.ideUsuario" :label="item.desLoginUser"
                             :value="item.ideUsuario"></el-option>
                </el-select>
              </el-col>
            </el-row>
          </div>
          <el-row :gutter="20" style="margin-top: 10px;">
            <el-col :span="6"><label>Tipo(s) documento(s)</label></el-col>
            <el-col :span="12">
              <multiselect :options="listaTiposDocumento" :multiple="true" :close-on-select="false"
                           :clear-on-select="true" :preserve-search="false" deselect-label="Quitar"
                           select-label="Seleccionar" v-model="seleccionTiposDocumento" placeholder="( TODOS )"
                           label="des_nombre" track-by="ide_elemento"></multiselect>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6"><label class="required">Fecha ingreso</label></el-col>
            <el-col :span="12">
              <el-date-picker v-model="fechaRango" type="daterange" range-separator="a"
                              start-placeholder="Fecha Inicio" end-placeholder="Fecha Fin">
              </el-date-picker>
            </el-col>
          </el-row>
        </div>
        <div v-else>
          <el-row :gutter="20">
            <el-col :span="6">
              <label class="required">Año</label>
            </el-col>
            <el-col :span="12">
              <el-date-picker v-model="anio" type="year"
                              placeholder="Seleccione un año"></el-date-picker>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <label class="required">Nro. Hoja cargo</label>
            </el-col>
            <el-col :span="12">
              <el-input v-model="filtros.numeroHoja" clearable
                        placeholder="Ingrese nro. hoja cargo"></el-input>
            </el-col>
          </el-row>
        </div>
        <el-row :gutter="20" type="flex" justify="center" class="mt-3">
          <el-col :span="4">
            <el-button type="success" icon="el-icon-document" @click="exportarExcel(tipoBusqueda)">Exportar
            </el-button>
          </el-col>
        </el-row>
      </el-card>
    </section>
  </div>
</template>

<script>
  import Constantes from "../../store/constantes.js";
  import TituloHeader from "../comun/TituloHeader";
  import Multiselect from "vue-multiselect";
  import "vue-loading-overlay/dist/vue-loading.css";
  import moment from "moment";
  import axios from "axios";

  export default {
    name: "ReporteHojaCargo",
    components: {
      TituloHeader,
      Multiselect,
    },
    mounted() {
      this.obtenerUnidadesOrganicas();
      this.obtenerUnidadesOrganicasReales();
      this.obtenerTiposDocumento();
    },
    data() {
      return {
        isLoading: false,
        filtros: {unidadDestinoId: '0'},
        fechaRango: null,
        anio: null,
        seleccionTiposDocumento: [],
        seleccionUnidadesOrganicas: [],
        listaHojasCargo: [],
        tipoBusqueda: 'porHojaCargo',
        error: {}
      };
    },
    computed: {
      listaUnidadesOrganicas() {
        return this.$store.state.comun.listaUnidadesOrganicas;
      },
      listaUnidadesOrganicasReales() {
        return this.$store.state.comun.listaUnidadesOrganicasReales;
      },
      listaUsuariosPorUnidad() {
        return this.$store.state.comun.listaUsuariosPorUnidad;
      },
      listaTiposDocumento() {
        return this.$store.state.comun.listaTiposDocumento;
      }
    },
    methods: {
      obtenerUnidadesOrganicas() {
        return this.$store.dispatch("comun/obtenerUnidadesOrganicas");
      },
      obtenerUsuariosPorUnidad(unidadId) {
        return this.$store.dispatch("comun/obtenerUsuariosPorUnidad", unidadId);
      },
      obtenerTiposDocumento() {
        return this.$store.dispatch("comun/obtenerTiposDocumento");
      },
      obtenerUnidadesOrganicasReales() {
        return this.$store.dispatch("comun/obtenerUnidadesOrganicasReales");
      },
      cambiarTipoBusqueda(tipoBusqueda) {
        this.error = {};
        this.filtros = {unidadDestinoId: '0'};
        this.fechaRango = null;
        this.anio = null;
        this.seleccionTiposDocumento = [];
        this.seleccionUnidadesOrganicas = [];
        if (tipoBusqueda === 'porArea' || tipoBusqueda === 'porUsuario') this.establecerFechaDefecto();
      },
      establecerFechaDefecto() {
        let fecha = new Date();
        let fechaInicio = new Date(fecha.getFullYear(), fecha.getMonth(), 1);
        let fechaFin = new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate());
        this.fechaRango = [fechaInicio, fechaFin];
      },
      validarCampos(tipoBusqueda) {
        switch (tipoBusqueda) {
          case 'porDocumento':
            if (!this.filtros.tipoDocumentoId) this.llenarErrorValidacion();
            if (!this.filtros.anio) this.llenarErrorValidacion();
            if (!this.filtros.numeroDocumento) this.llenarErrorValidacion();
            break
          case 'porArea':
            if (!this.fechaRango) this.llenarErrorValidacion();
            break
          case 'porUsuario':
            if (!this.filtros.unidadDestinoId) this.llenarErrorValidacion();
            if (!this.filtros.usuarioDestinatarioId) this.llenarErrorValidacion();
            if (!this.fechaRango) this.llenarErrorValidacion();
            break
          case 'porHojaCargo':
            if (!this.filtros.anio || !this.filtros.numeroHoja) this.llenarErrorValidacion();
        }
        return !this.error.mensaje;
      },
      async exportarExcel(tipoBusqueda) {
        this.error = {};
        this.filtros.tipoBusqueda = tipoBusqueda;

        if (this.anio) this.filtros.anio = this.anio;
        else this.filtros.anio = null;

        if (this.validarCampos(tipoBusqueda)) {
          const url = Constantes.rutaTramite + "tramite-reporteenvios";
          this.isLoading = true;
          this.filtros.fechaInicio =
            this.fechaRango && this.fechaRango[0]
              ? moment(this.fechaRango[0]).format("YYYY-MM-DD")
              : "";
          this.filtros.fechaFin =
            this.fechaRango && this.fechaRango[1]
              ? moment(this.fechaRango[1]).format("YYYY-MM-DD")
              : "";
          this.filtros.anio = this.filtros.anio ? this.filtros.anio.getFullYear() : '';

          let idsUnidadesOrigen = [];
          if (this.seleccionUnidadesOrganicas.length > 0) {
            this.seleccionUnidadesOrganicas.forEach((unidadOrigen) => {
              idsUnidadesOrigen.push(unidadOrigen.value);
            });
            this.filtros.idsUnidadesOrigen = idsUnidadesOrigen.join();
          } else delete this.filtros.idsUnidadesOrigen;

          let idsDocumentos = [];
          if (this.seleccionTiposDocumento.length > 0) {
            this.seleccionTiposDocumento.forEach((tipoDocumento) => {
              idsDocumentos.push(tipoDocumento.ide_elemento);
            });
            this.filtros.tiposDocumentoIds = idsDocumentos.join();
          } else delete this.filtros.tiposDocumentoIds;

          await axios.get(url, {params: this.filtros, responseType: 'blob'})
            .then(response => {
              if (response.data.size === 0) {
                this.llenarError('info', 'No se encontraron resultados para su búsqueda')
                return;
              }

              const link = document.createElement('a');
              const href = window.URL.createObjectURL(new Blob([response.data]));
              link.href = href;
              link.download = "Reporte de envío.xlsx";
              document.body.appendChild(link);
              link.click();
              link.remove();
              window.URL.revokeObjectURL(href);
            }).catch(e => {
              if (e.response.status === 504)
                this.llenarError('warning', 'Se encontraron demasiados datos, por favor revise los filtros ingresados.');
              else
                this.llenarError('error', 'Ocurrió un error en la generación del reporte.')
              console.log(e.response)
            })
          this.isLoading = false;
        }
      },
      llenarError(tipo, mensaje) {
        this.error.tipo = tipo;
        this.error.mensaje = mensaje;
      },
      llenarErrorValidacion() {
        this.llenarError('error', 'Por favor ingrese todos los campos obligatorios (*)')
      }
    },
  };
</script>

<style>
  label.required:after {
    content: " *";
    color: red;
  }
</style>
