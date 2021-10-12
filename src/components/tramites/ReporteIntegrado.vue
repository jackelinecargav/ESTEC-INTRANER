<template>
  <div class="content-wrapper">
    <titulo-header>Gestión Documental - Reporte Integrado</titulo-header>
    <section class="content">
      <el-card v-loading="loading" style="overflow: visible">
        <el-alert v-if="!error.success" :type=error.tipo :closable=false show-icon class="mb-3">
          <ul class="ml-3">
            <li v-for="mensaje in error.mensajes">{{mensaje}}</li>
          </ul>
        </el-alert>
        <el-row :gutter="20">
          <el-col :span="6"><label>Unid. Orgánica origen</label></el-col>
          <el-col :span="12">
            <multiselect :options="listaUnidadesOrganicasReales" :multiple="true" :close-on-select="false"
                         :clear-on-select="true" :preserve-search="false" deselect-label="Quitar"
                         select-label="Seleccionar" v-model="seleccionUnidadesOrganicas" placeholder="( TODAS )"
                         label="text" track-by="value">
            </multiselect>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6"><label>Unid. Orgánica destino</label></el-col>
          <el-col :span="12">
            <el-select v-model="filtros.idUnidadDest" filterable
                       placeholder="Seleccione una unidad">
              <el-option v-for="item in listaUnidadesOrganicas" :key="item.value" :label="item.text"
                         :value="item.value"></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6"><label>Unid. Orgánica actual</label></el-col>
          <el-col :span="12">
            <el-select v-model="filtros.idUnidadActual" filterable
                       placeholder="Seleccione una unidad">
              <el-option v-for="item in listaUnidadesOrganicas" :key="item.value" :label="item.text"
                         :value="item.value"></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6"><label>Administrado</label></el-col>
          <el-col :span="12">
            <el-select v-model="filtros.solicitante" filterable clearable remote :remote-method="getPersona"
                       placeholder="Buscar por Apellidos o nombres / Razón social / Documento">
              <el-option v-for="item in listPersona" :key="item.IDE_PERSONA" :label="item.NOM_COMPLETO"
                         :value="item.IDE_PERSONA">
                <span style="float: left">{{ item.NOM_COMPLETO }}</span>
                <span style="float: right" class="text-muted">
                  <span v-if="item.IDE_TIPO_DOCUENTO===31">DNI </span>
                  <span v-else-if="item.IDE_TIPO_DOCUENTO===32">RUC </span>
                  <span v-else-if="item.IDE_TIPO_DOCUENTO===33">CE </span>
                  <span v-else-if="item.IDE_TIPO_DOCUENTO===1335">OTRO </span>{{ item.NUM_NUMERO_DOCUENTO }}
                </span>
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top: 10px;">
          <el-col :span="6"><label>Tipo(s) documento(s)</label></el-col>
          <el-col :span="12">
            <multiselect :options="listaTiposDocumento" :multiple="true" :close-on-select="false"
                         :clear-on-select="true" :preserve-search="false" deselect-label="Quitar"
                         select-label="Seleccionar" v-model="seleccionTiposDocumento"
                         placeholder="( TODOS )"
                         label="des_nombre" track-by="ide_elemento">
            </multiselect>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top: 10px;">
          <el-col :span="6"><label>Estado(s)</label></el-col>
          <el-col :span="12">
            <multiselect :options="estadosDeDocumentos" :multiple="true" :close-on-select="false"
                         :clear-on-select="true" :preserve-search="false" deselect-label="Quitar"
                         select-label="Seleccionar" v-model="seleccionEstadosDocumento"
                         placeholder="( TODOS )"
                         label="DES_NOMBRE" track-by="IDE_ELEMENTO">
            </multiselect>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6"><label class="required">Rango de fechas</label></el-col>
          <el-col :span="12">
            <el-date-picker v-model="fechaRango" type="daterange" range-separator="a"
                            start-placeholder="Fecha Inicio" end-placeholder="Fecha Fin">
            </el-date-picker>
          </el-col>
        </el-row>
        <el-row :gutter="20" type="flex" justify="center" class="mt-3">
          <el-col :span="4">
            <el-button type="success" icon="el-icon-document" @click.prevent="generaReporte()">Exportar</el-button>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24" class="text-muted" style="font-size: 0.85em;">
            <div>Tener en cuenta:</div>
            <div>
              * Debe seleccionar al menos uno de estos filtros: "Unid. Orgánica origen", "Unid. Orgánica destino",
              "Unid. Orgánica actual" o "Tipo(s) documento(s)".
            </div>
            <div>* El rango de fechas no debe exceder los 30 días</div>
          </el-col>
        </el-row>
      </el-card>
    </section>
  </div>
</template>
<style>
  label.required:after {
    content: " *";
    color: red;
  }
</style>
<script>
  import axios from 'axios';
  import Multiselect from 'vue-multiselect';
  import VueExcelXlsx from "vue-excel-xlsx";
  import Constantes from '../../store/constantes.js';
  import moment from "moment";
  import Vue from 'vue';
  import TituloHeader from "../comun/TituloHeader";

  Vue.use(VueExcelXlsx);
  export default {
    name: 'ReporteIntegrado',
    components: {Multiselect, TituloHeader},
    data() {
      return {
        filtros: {
          idUnidadDest: '0',
          idUnidadActual: '0',
        },
        listPersona: [],
        estadosDeDocumentos: [],
        exportarExcel: null,
        tramitesJsonExcel: null,
        seleccionUnidadesOrganicas: [],
        seleccionTiposDocumento: [],
        seleccionEstadosDocumento: [],
        fechaRango: [],
        loading: false,
        error: {success: true, mensajes: []}
      }
    },
    mounted() {
      this.$store.dispatch("comun/obtenerUnidadesOrganicas");
      this.$store.dispatch("comun/obtenerUnidadesOrganicasReales");
      this.$store.dispatch("comun/obtenerTiposDocumento");
      this.obtenerEstadosDocumento();
      this.establecerFechaDefecto();
    },
    computed: {
      listaUnidadesOrganicas() {
        return this.$store.state.comun.listaUnidadesOrganicas;
      },
      listaUnidadesOrganicasReales() {
        return this.$store.state.comun.listaUnidadesOrganicasReales;
      },
      listaTiposDocumento() {
        return this.$store.state.comun.listaTiposDocumento;
      },
    },
    methods: {
      async generaReporte() {
        this.loading = true;
        this.error = {success: true, mensajes: []};
        this.validaRegistro();
        if (this.error.success) {
          const fecIni = this.customFormatter(this.fechaRango[0]);
          const fecFin = this.customFormatter(this.fechaRango[1]);
          this.filtros.correoUsuario = localStorage.getItem('cuenta');
          this.filtros.fechaInicio = fecIni;
          this.filtros.fechaFin = fecFin;

          let unidadOrigenIds = [];
          if (this.seleccionUnidadesOrganicas.length > 0) {
            this.seleccionUnidadesOrganicas.forEach((unidadOrganica) => {
              unidadOrigenIds.push(unidadOrganica.value);
            });
            this.filtros.idsUnidadesOrigen = unidadOrigenIds.join();
          } else delete this.filtros.idsUnidadesOrigen;

          let tiposIds = [];
          if (this.seleccionTiposDocumento.length > 0) {
            this.seleccionTiposDocumento.forEach((tipoDocumento) => {
              tiposIds.push(tipoDocumento.ide_elemento);
            });
            this.filtros.idTipoDoc = tiposIds.join();
          } else delete this.filtros.idTipoDoc;

          let estadosIds = [];
          if (this.seleccionEstadosDocumento.length > 0) {
            this.seleccionEstadosDocumento.forEach((estadoDocumento) => {
              estadosIds.push(estadoDocumento.REFERENCIA);
            });
          } else {
            this.estadosDeDocumentos.forEach(estado => {
              estadosIds.push(estado.REFERENCIA);
            });
          }
          this.filtros.idEstadoDoc = estadosIds.join();
          await axios.get(Constantes.rutaTramite + 'tramite-reporteintegrado', {
            params: this.filtros,
            responseType: 'blob'
          })
            .then(response => {
              if (response.data.size === 0) {
                this.llenarError('info', 'No se encontraron resultados para su búsqueda')
                return;
              }

              const link = document.createElement('a');
              const href = window.URL.createObjectURL(new Blob([response.data]));
              link.href = href;
              link.download = "Reporte tramite integrado.xlsx";
              document.body.appendChild(link);
              link.click();
              link.remove();
              window.URL.revokeObjectURL(href);
            }).catch(e => {
              if (e.response.status === 504)
                this.llenarError('warning', 'Se encontraron demasiados datos, por favor revise los filtros ingresados.');
              else
                this.llenarError('error', 'Ocurrió un error en la generación del reporte.')
            })
        }
        this.loading = false;
      },
      validaRegistro() {
        if (this.seleccionUnidadesOrganicas.length === 0 && this.filtros.idUnidadDest === '0' &&
          this.filtros.idUnidadActual === '0' && this.seleccionTiposDocumento.length === 0)
          this.llenarError('error', 'Debe seleccionar al menos uno de estos filtros: "Unid. Orgánica origen", "Unid. Orgánica destino", "Unid. Orgánica actual" o "Tipo(s) documento(s)".');
        if (!this.fechaRango) this.llenarErrorValidacion();
        else if ((this.fechaRango[1] - this.fechaRango[0]) / (1000 * 60 * 60 * 24) > 30)
          this.llenarError('error', 'El rango de fechas no debe exceder los 30 días')
      },
      establecerFechaDefecto() {
        let fecha = new Date();
        let fechaInicio = new Date(fecha.getFullYear(), fecha.getMonth(), 1);
        let fechaFin = new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate());
        this.fechaRango = [fechaInicio, fechaFin];
      },
      getPersona(query) {
        if (query.length > 4) {
          let dataPost = {};
          dataPost.documento = query;
          axios.post(Constantes.rutaPersona + '/obtenerpersonapornombredoc', dataPost)
            .then(response => {
              this.listPersona = response.data.data;
            })
            .catch(e => console.log(e.response))
        }
      },
      customFormatter(date) {
        return moment(date).format('YYYY-MM-DD');
      },
      obtenerEstadosDocumento() {
        const url = Constantes.rutaTramite + "estados-doc-reporte-integrado"
        axios.get(url)
          .then(response => {
            this.estadosDeDocumentos = response.data;
          }).catch(e => console.log(e.response))
      },
      llenarError(tipo, mensaje) {
        this.error.success = false;
        this.error.tipo = tipo;
        this.error.mensajes.push(mensaje);
      },
      llenarErrorValidacion() {
        this.llenarError('error', 'Por favor ingrese todos los campos obligatorios (*)')
      }
    }
  }
</script>
