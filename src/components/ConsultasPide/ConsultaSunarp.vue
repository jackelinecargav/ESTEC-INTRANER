<template>
  <div>
    <titulo-header>Consulta SUNARP</titulo-header>
    <section class="content">
      <div class="container" style="margin-left:0">
        <div class="row">
          <div class="col-xs-12 col-md-12 col-lg-12">
            <el-card>
              <b-tabs pills v-model="tabIndex" card>
                <b-tab title="Consulta Registro de Persona Jurídica" @click="limpiarDatos">
                  <el-card v-loading="cargando">
                    <el-alert v-show="!boolRegistro" title="Ingrese todos los campos" type="error"
                              center show-icon class="mb-3">
                    </el-alert>
                    <el-row :gutter="20">
                      <el-form label-position="left">
                        <el-col :span="14">
                          <el-form-item label="Nombre a consultar:" label-width="150px"
                                        style="margin-bottom: 0 !important">
                            <el-input v-model="filtro.razonSocial"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item style="margin-bottom: 0 !important">
                            <el-button type="primary" @click.prevent="obtenerPersonaJuridica">Buscar</el-button>
                            <el-button type="info" @click.prevent="limpiarDatos">
                              <img src="../../images/icon_eraser.png" alt srcset width="15"/>
                            </el-button>
                          </el-form-item>
                        </el-col>
                      </el-form>
                    </el-row>
                    <div v-if="listaDatos && listaDatos.length!==0">
                      <el-table :data="listaDatos" height="350" style="width: 100%">
                        <el-table-column type="expand">
                          <template slot-scope="props">
                            <p>
                              <b>TIPO DE PERSONA:</b>
                              {{ props.row.tipo }}
                            </p>
                            <p>
                              <b>OFICINA REGISTRAL:</b>
                              {{ props.row.oficina }}
                            </p>
                            <p>
                              <b>ZONA REGISTRAL:</b>
                              {{ props.row.zona }}
                            </p>
                            <p>
                              <b>NÚMERO DE TOMO:</b>
                              {{ props.row.tomo }}
                            </p>
                            <p>
                              <b>NÚMERO DE FOLIO:</b>
                              {{ props.row.folio }}
                            </p>
                            <p>
                              <b>NÚMERO DE FICHA:</b>
                              {{ props.row.ficha }}
                            </p>
                            <p>
                              <b>NÚMERO DE PARTIDA:</b>
                              {{ props.row.partida }}
                            </p>
                          </template>
                        </el-table-column>
                        <el-table-column label="DENOMINACIÓN o RAZÓN SOCIAL"
                                         prop="denominacion"></el-table-column>
                      </el-table>
                    </div>
                    <el-alert v-else type="info" :closable="false" center>
                      Sin información
                    </el-alert>
                  </el-card>
                </b-tab>
                <b-tab title="Consulta Titularidad de Bienes">
                  <b-card no-body>
                    <div class="row" style="margin:3px;padding-left:7px">
                      <div class="col-xs-4 col-md-4 col-lg-4" style="padding-left:0px">
                        <b-form-radio-group style="margin:10px">
                          <b-form-radio name="radio-size" v-model="rdTitular" value="N" size="sm">
                            Persona Natural
                          </b-form-radio>
                          <b-form-radio name="radio-size" v-model="rdTitular" value="J" size="sm">
                            Persona Jurídica
                          </b-form-radio>
                        </b-form-radio-group>
                      </div>
                      <div class="col-xs-4 col-md-4 col-lg-4" style="margin-top:5px;padding-left:0px">
                        <button class="btn btn-primary" @click.prevent="consultaSunarp(2)">
                          Buscar
                        </button>
                        <el-button type="info" @click.prevent="limpiarCampoFiltro(2)" plain style="padding: 10px 16px">
                          <img src="../../images/icon_eraser.png" alt srcset width="15"/>
                        </el-button>
                      </div>
                    </div>
                    <div class="row" style="margin-left:8px" v-if="rdTitular!=''">
                      <div class="col-xs-12 col-md-12 col-lg-12" style="padding-left:10px;margin-top:5px"
                           v-if="rdTitular=='N'">
                        <b-input-group>
                          <div class="row">
                            <b-input-group class="col-lg-4" prepend="Nombres : ">
                              <b-form-input v-model="nombre" type="search"></b-form-input>
                            </b-input-group>
                            <b-input-group class="col-lg-4" style="padding-left:0px" prepend="Apellido Paterno : ">
                              <b-form-input v-model="aPaterno" type="search"></b-form-input>
                            </b-input-group>
                            <b-input-group class="col-lg-4" style="padding-left:0px" prepend="Apellido Materno : ">
                              <b-form-input v-model="aMaterno" type="search"></b-form-input>
                            </b-input-group>
                          </div>
                        </b-input-group>
                      </div>
                      <div class="col-xs-12 col-md-12 col-lg-12" style="padding-left:6px;margin-top:5px"
                           v-if="rdTitular=='J'">
                        <b-input-group>
                          <b-input-group style="padding-left:5px" prepend="Razón Social : ">
                            <b-form-input class="col-lg-8" v-model="rSocial" type="search"></b-form-input>
                          </b-input-group>
                        </b-input-group>
                      </div>
                      <p style="margin:0px">&nbsp;</p>
                    </div>
                    <div id="scrollspy-nested" style="position:relative; height:350px; overflow-y:auto"
                         v-if="boolBuscaTitular">
                      <div v-if="boolTitularidad && rdTitular=='N' && boolTitularN">
                        <b-list-group flush style="text-align:left" v-for="titular in dataTitularidad"
                                      :key="titular.id">
                          <b-button size="sm" variant="primary" block disabled></b-button>
                          <b-list-group-item variant="info" v-if="rdTitular=='N'">
                            <b>NOMBRE o RAZÓN SOCIAL :</b>
                            {{titular.sunarp.nombres}} {{titular.sunarp.aPaterno}}
                            {{titular.sunarp.aMaterno}}
                          </b-list-group-item>
                          <b-list-group-item>
                            <b>TIPO DE DOCUMENTO DE IDENTIDAD:</b>
                            {{titular.sunarp.tipoDocumento}}
                          </b-list-group-item>
                          <b-list-group-item variant="info">
                            <b>NÚMERO DE DOCUMENTO DE IDENTIDAD :</b>
                            {{titular.sunarp.numDocumento}}
                          </b-list-group-item>
                          <b-list-group-item>
                            <b>REGISTRO JURÍDICO :</b>
                            {{titular.sunarp.registro}}
                          </b-list-group-item>
                          <b-list-group-item variant="info">
                            <b>LIBRO :</b>
                            {{titular.sunarp.libro}}
                          </b-list-group-item>
                          <b-list-group-item>
                            <b>NÚMERO DE PARTIDA :</b>
                            {{titular.sunarp.partida}}
                          </b-list-group-item>
                          <b-list-group-item variant="info">
                            <b>ESTADO DE PARTIDA :</b>
                            {{titular.sunarp.estado}}
                          </b-list-group-item>
                          <b-list-group-item>
                            <b>PLACA PARTIDA VEHICULAR :</b>
                            {{titular.sunarp.matricula}}
                          </b-list-group-item>
                          <b-list-group-item variant="info">
                            <b>ZONA REGISTRAL :</b>
                            {{titular.sunarp.zona}}
                          </b-list-group-item>
                          <b-list-group-item>
                            <b>OFICINA REGISTRAL :</b>
                            {{titular.sunarp.oficina}}
                          </b-list-group-item>
                          <b-list-group-item variant="info">
                            <b>DIRECCIÓN DE PROPIEDAD :</b>
                            {{titular.sunarp.direccion}}
                          </b-list-group-item>
                          <p>&nbsp;</p>
                        </b-list-group>
                      </div>
                      <div v-if="boolTitularidad && rdTitular=='J' && boolTitularJ">
                        <b-list-group flush style="text-align:left" v-for="titular in dataTitularidad"
                                      :key="titular.id">
                          <b-button size="sm" variant="primary" block disabled></b-button>
                          <b-list-group-item variant="info" v-if="rdTitular=='J'">
                            <b>NOMBRE o RAZÓN SOCIAL :</b>
                            {{titular.sunarp.razonSocial}}
                          </b-list-group-item>
                          <b-list-group-item>
                            <b>TIPO DE DOCUMENTO DE IDENTIDAD:</b>
                            {{titular.sunarp.tipoDocumento}}
                          </b-list-group-item>
                          <b-list-group-item variant="info">
                            <b>NÚMERO DE DOCUMENTO DE IDENTIDAD :</b>
                            {{titular.sunarp.numDocumento}}
                          </b-list-group-item>
                          <b-list-group-item>
                            <b>REGISTRO JURÍDICO :</b>
                            {{titular.sunarp.registro}}
                          </b-list-group-item>
                          <b-list-group-item variant="info">
                            <b>LIBRO :</b>
                            {{titular.sunarp.libro}}
                          </b-list-group-item>
                          <b-list-group-item>
                            <b>NÚMERO DE PARTIDA :</b>
                            {{titular.sunarp.partida}}
                          </b-list-group-item>
                          <b-list-group-item variant="info">
                            <b>ESTADO DE PARTIDA :</b>
                            {{titular.sunarp.estado}}
                          </b-list-group-item>
                          <b-list-group-item>
                            <b>PLACA PARTIDA VEHICULAR :</b>
                            {{titular.sunarp.matricula}}
                          </b-list-group-item>
                          <b-list-group-item variant="info">
                            <b>ZONA REGISTRAL :</b>
                            {{titular.sunarp.zona}}
                          </b-list-group-item>
                          <b-list-group-item>
                            <b>OFICINA REGISTRAL :</b>
                            {{titular.sunarp.oficina}}
                          </b-list-group-item>
                          <b-list-group-item variant="info">
                            <b>DIRECCIÓN DE PROPIEDAD :</b>
                            {{titular.sunarp.direccion}}
                          </b-list-group-item>
                          <p>&nbsp;</p>
                        </b-list-group>
                      </div>
                      <div v-else>
                        <b-list-group flush>
                          <b-list-group-item variant="info">Sin información
                          </b-list-group-item>
                        </b-list-group>
                      </div>
                    </div>
                  </b-card>
                </b-tab>
                <b-tab title="Naves y Aeronaves">
                  <b-card no-body>
                    <div class="row" style="margin-top:5px">
                      <div class="col-xs-4 col-md-4 col-lg-4" style="padding-left:30px;margin-top:5px">
                        <b-input-group prepend="Número de placa: ">
                          <b-form-input style="margin-left:5px" class="col-lg-4" v-model="placaNave"
                                        type="search"></b-form-input>
                        </b-input-group>
                      </div>
                      <div class="col-xs-4 col-md-4 col-lg-4" style="margin-top:3px;padding-left:0px">
                        <button class="btn btn-primary" @click.prevent="consultaSunarp(3)">
                          Buscar
                        </button>
                        <el-button type="info" @click.prevent="limpiarCampoFiltro(3)" plain style="padding: 10px 16px">
                          <img src="../../images/icon_eraser.png" alt srcset width="15"/>
                        </el-button>
                      </div>
                    </div>
                    <p style="margin:0px">&nbsp;</p>
                    <div v-if="boolBuscaNave">
                      <b-list-group flush style="text-align:left" v-if="boolNave">
                        <b-list-group-item variant="info">
                          <b>MATRÍCULA :</b>
                          {{dataNave.matricula}}
                        </b-list-group-item>
                        <b-list-group-item>
                          <b>NÚMERO DE PARTIDA :</b>
                          {{dataNave.partida}}
                        </b-list-group-item>
                        <b-list-group-item variant="info">
                          <b>REGISTRO :</b>
                          {{dataNave.registro}}
                        </b-list-group-item>
                        <b-list-group-item>
                          <b>OFICINA :</b>
                          {{dataNave.oficina}}
                        </b-list-group-item>
                        <b-list-group-item variant="info">
                          <b>LIBRO :</b>
                          {{dataNave.libro}}
                        </b-list-group-item>
                        <b-list-group-item>
                          <b>NUMERO SERIE :</b>
                          {{dataNave.serie}}
                        </b-list-group-item>
                        <b-list-group-item variant="info">
                          <b>MODELO :</b>
                          {{dataNave.modelo}}
                        </b-list-group-item>
                        <b-list-group-item>
                          <b>LISTA DE TOMOS - FOLIOS :</b>
                        </b-list-group-item>
                        <div id="scrollspy-nested" style="position:relative; height:auto; overflow-y:auto"
                             v-if="dataNave.listaTomos!=null">
                          <b-list-group flush style="text-align:left; margin-left:30px"
                                        v-for="tomo in dataNave.listaTomos" :key="tomo.id">
                            <b-button size="sm" variant="info" block disabled></b-button>
                            <b-list-group-item variant="info">
                              <b>TOMO - FOLIO :</b>
                              {{tomo}}
                            </b-list-group-item>
                          </b-list-group>
                        </div>
                      </b-list-group>
                      <b-list-group flush v-else>
                        <b-list-group-item variant="info">Sin información</b-list-group-item>
                      </b-list-group>
                    </div>
                  </b-card>
                </b-tab>
                <b-tab title="Oficinas / Asientos">
                  <b-card no-body>
                    <b-tabs pills card>
                      <b-tab title="Oficinas">
                        <b-card no-body>
                          <div id="scrollspy-nested" style="position:relative; height:350px; overflow-y:auto"
                               v-if="boolOficina">
                            <b-list-group flush style="text-align:left" v-for="oficina in dataOficina"
                                          :key="oficina.id">
                              <b-button size="sm" variant="primary" block disabled></b-button>
                              <b-list-group-item variant="info">
                                <b>CÓDIGO OFICINA :</b>
                                {{oficina.sunarp.ofiCodigo}}
                              </b-list-group-item>
                              <b-list-group-item>
                                <b>CÓDIGO ZONA :</b>
                                {{oficina.sunarp.ofiZona}}
                              </b-list-group-item>
                              <b-list-group-item variant="info">
                                <b>DESCRIPCIÓN :</b>
                                {{oficina.sunarp.ofiDescripcion}}
                              </b-list-group-item>
                              <p>&nbsp;</p>
                            </b-list-group>
                          </div>
                        </b-card>
                      </b-tab>
                      <b-tab title="Lista de Asientos">
                        <div class="row">
                          <div class="col-xs-10 col-md-10 col-lg-10 mb-3">
                            <b-input-group>
                              <div class="row">
                                <b-input-group class="col" style="padding-right:0px" prepend="Zona : ">
                                  <select ref="zonaAsiento" class="form-control" v-model="zAsiento"
                                          @change="listarOficina($event, 5)">
                                    <option v-for="zona in listaZonaA" :key="zona" :value="zona">{{zona}}</option>
                                  </select>
                                </b-input-group>
                                <b-input-group class="col" prepend="Oficina : ">
                                  <select ref="oficinaAsiento" class="form-control" v-model="oAsiento">
                                    <option v-for="oficina in listaOficinaA" :key="oficina.id" :value="oficina.value">
                                      {{oficina.text}}
                                    </option>
                                  </select>
                                </b-input-group>
                                <b-input-group class="col" style="padding-left:0px" prepend="Partida : ">
                                  <b-form-input v-model="aPartida" type="search"></b-form-input>
                                </b-input-group>
                                <b-input-group class="col" style="padding-left:0px" prepend="Registro : ">
                                  <b-form-input v-model="aRegistro" type="search"></b-form-input>
                                </b-input-group>
                              </div>
                            </b-input-group>
                          </div>
                          <div class="col-xs-2 col-md-2 col-lg-2" style="margin-top:3px;padding-left:0px">
                            <button class="btn btn-primary" @click.prevent="consultaSunarp(5)">
                              Buscar
                            </button>
                            <el-button type="info" @click.prevent="limpiarCampoFiltro(5)" plain
                                       style="padding: 10px 16px">
                              <img src="../../images/icon_eraser.png" alt srcset width="15"/>
                            </el-button>
                          </div>
                        </div>
                        <div v-if="boolBuscaAsiento">
                          <div id="scrollspy-nested" style="position:relative; height:350px; overflow-y:auto"
                               v-if="boolAsiento">
                            <b-list-group flush style="text-align:left">
                              <b-list-group-item variant="info">
                                <b>TRANSACCIÓN :</b>
                                {{dataAsiento.transaccion}}
                              </b-list-group-item>
                              <b-list-group-item>
                                <b>NÚMERO TOTAL DE PÁGINAS :</b>
                                {{dataAsiento.nTotalPagina}}
                              </b-list-group-item>
                              <p style="margin:0px">&nbsp;</p>
                              <b-list-group-item variant="info">
                                <b>LISTA DE ASIENTOS :</b>
                              </b-list-group-item>
                              <b-list-group flush style="text-align:left; margin-left:30px"
                                            v-for="asiento in dataAsiento.listAsiento" :key="asiento.id">
                                <b-button size="sm" variant="primary" block disabled></b-button>
                                <b-list-group-item>
                                  <b>TIPO :</b>
                                  {{asiento.sunarp.tipoAsiento}}
                                </b-list-group-item>
                                <b-list-group-item variant="info">
                                  <b>NÚMERO DE PÁGINA :</b>
                                  {{asiento.sunarp.paginaAsiento}}
                                </b-list-group-item>
                                <b-list-group-item>
                                  <b>ID DE IMAGEN :</b>
                                  {{asiento.sunarp.idImagen}}
                                </b-list-group-item>
                                <b-list-group-item variant="info">
                                  <b>LISTA DE PÁGINAS :</b>
                                </b-list-group-item>
                                <div v-if="dataAsiento.listAsiento!=null">
                                  <b-list-group flush style="text-align:left;"
                                                v-for="pagina in asiento.sunarp.listPagina" :key="pagina.id">
                                    <b-button size="sm" variant="info" block disabled></b-button>
                                    <b-list-group-item>
                                      <b>NÚMERO DE PÁGINA :</b>
                                      {{pagina.sunarp.nPagina}}
                                    </b-list-group-item>
                                    <b-list-group-item variant="info">
                                      <b>NÚMERO DE PÁGINA REFERENCIAL :</b>
                                      {{pagina.sunarp.nPaginaRef}}
                                    </b-list-group-item>
                                  </b-list-group>
                                </div>
                                <p style="margin:0px">&nbsp;</p>
                              </b-list-group>
                              <b-list-group-item variant="info">
                                <b>LISTA DE FICHAS :</b>
                              </b-list-group-item>
                              <b-list-group flush style="text-align:left; margin-left:30px"
                                            v-for="ficha in dataAsiento.listFicha" :key="ficha.id">
                                <b-button size="sm" variant="primary" block disabled></b-button>
                                <b-list-group-item>
                                  <b>ID FICHA :</b>
                                  {{ficha.sunarp.ficha}}
                                </b-list-group-item>
                                <b-list-group-item variant="info">
                                  <b>NÚMERO DE PÁGINA :</b>
                                  {{ficha.sunarp.nPagina}}
                                </b-list-group-item>
                                <b-list-group-item>
                                  <b>TIPO :</b>
                                  {{ficha.sunarp.tipoAsiento}}
                                </b-list-group-item>
                                <p style="margin:0px">&nbsp;</p>
                              </b-list-group>
                              <b-list-group-item variant="info">
                                <b>LISTA DE FOLIOS :</b>
                              </b-list-group-item>
                              <b-list-group flush style="text-align:left; margin-left:30px"
                                            v-for="folio in dataAsiento.listFolio" :key="folio.id">
                                <b-button size="sm" variant="primary" block disabled></b-button>
                                <b-list-group-item>
                                  <b>ID FOLIO :</b>
                                  {{folio.sunarp.folio}}
                                </b-list-group-item>
                                <b-list-group-item variant="info">
                                  <b>NÚMERO DE PÁGINA :</b>
                                  {{folio.sunarp.nPagina}}
                                </b-list-group-item>
                                <b-list-group-item>
                                  <b>NÚMERO DE PÁGINA REFERENCIAL :</b>
                                  {{folio.sunarp.nPaginaRef}}
                                </b-list-group-item>
                                <b-list-group-item variant="info">
                                  <b>TIPO :</b>
                                  {{folio.sunarp.tipoAsiento}}
                                </b-list-group-item>
                                <p style="margin:0px">&nbsp;</p>
                              </b-list-group>
                            </b-list-group>
                          </div>
                          <b-list-group flush v-else>
                            <b-list-group-item variant="info">Sin información
                            </b-list-group-item>
                          </b-list-group>
                        </div>
                      </b-tab>
                      <b-tab title="Ver Asiento">
                        <div class="row" style="margin-top:5px">
                          <div class="col-xs-12 col-md-12 col-lg-10">
                            <b-input-group>
                              <div class="row">
                                <b-input-group class="col col-lg-4" prepend="Tipo : ">
                                  <b-form-radio-group class="pl-1 pt-2">
                                    <b-form-radio name="radio-size" v-model="rdImagen" value="ASIENTO" size="sm">
                                      Asiento
                                    </b-form-radio>
                                    <b-form-radio name="radio-size" v-model="rdImagen" value="FOLIO" size="sm">
                                      Folio
                                    </b-form-radio>
                                  </b-form-radio-group>
                                </b-input-group>
                                <b-input-group class="col col-lg-4" prepend="Transacción : ">
                                  <b-form-input v-model="vTransaccion" type="search"></b-form-input>
                                </b-input-group>
                                <b-input-group class="col col-lg-4" prepend="ID Imagen : ">
                                  <b-form-input v-model="vIdImagen" type="search"></b-form-input>
                                </b-input-group>
                              </div>
                            </b-input-group>
                          </div>
                          <div class="col-xs-6 col-md-4 col-lg-2">
                            <button class="btn btn-primary" @click.prevent="consultaSunarp(6)">
                              Buscar
                            </button>
                            <el-button type="info" @click.prevent="limpiarCampoFiltro(6)" plain
                                       style="padding: 10px 16px">
                              <img src="../../images/icon_eraser.png" alt srcset width="15"/>
                            </el-button>
                          </div>
                          <div class="col-xs-12 col-md-12 col-lg-10 my-3">
                            <div class="row">
                              <b-input-group class="col col-xs-6  col-lg-4" prepend="Nro. Página : ">
                                <b-form-input v-model="vNroPagina" type="search"></b-form-input>
                              </b-input-group>
                              <b-input-group class="col col-xs-6 col-lg-4" prepend="Nro. Página Ref. : ">
                                <b-form-input v-model="vNroRef" type="search"></b-form-input>
                              </b-input-group>
                              <b-input-group class="col col-xs-6 col-lg-4" prepend="Nro. Página Total: ">
                                <b-form-input v-model="vNroTotal" type="search"></b-form-input>
                              </b-input-group>
                            </div>
                          </div>
                        </div>
                        <div v-if="boolBuscaImagen">
                          <div id="scrollspy-nested" style="position:relative; height:350px; overflow-y:auto"
                               v-if="boolImagen">
                            <b-list-group flush style="text-align:left">
                              <b-button size="sm" variant="primary" block disabled></b-button>
                              <p style="margin:0px">&nbsp;</p>
                              <img :src="img.encodedImage+this.dataImagen.idImagenAsiento"/>
                            </b-list-group>
                          </div>
                          <b-list-group flush v-else>
                            <b-list-group-item variant="info">Sin información
                            </b-list-group-item>
                          </b-list-group>
                        </div>
                      </b-tab>
                    </b-tabs>
                  </b-card>
                </b-tab>
                <b-tab title="Registro de Propiedad Vehicular" @click="limpiarDatos">
                  <el-card v-loading="cargando">
                    <el-alert v-show="!boolRegistro" title="Ingrese todos los campos" type="error"
                              center show-icon class="mb-3">
                    </el-alert>
                    <el-row :gutter="20">
                      <el-form label-position="left" label-width="50px">
                        <el-col :span="6">
                          <el-form-item label="Placa" style="margin-bottom: 0 !important">
                            <el-input v-model="filtro.matricula"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="5">
                          <el-form-item label="Zona" style="margin-bottom: 0 !important">
                            <el-select v-model="filtro.zona" @change="listarOficina($event, 7)">
                              <el-option v-for="item in listaZonaP" :key="item" :label="item" :value="item"></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :span="5">
                          <el-form-item label="Oficina" style="margin-bottom: 0 !important">
                            <el-select v-model="filtro.oficina">
                              <el-option v-for="item in listaOficinaP" :key="item.id" :label="item.text"
                                         :value="item.value"></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :span="7">
                          <el-form-item style="margin-bottom: 0 !important">
                            <el-button type="primary" @click.prevent="obtenerDetalleRPV">
                              Buscar
                            </el-button>
                            <el-button type="info" @click.prevent="limpiarDatos">
                              <img src="../../images/icon_eraser.png" alt srcset width="15"/>
                            </el-button>
                          </el-form-item>
                        </el-col>
                      </el-form>
                    </el-row>
                    <div v-if="datos && datos.placa">
                      <el-row :gutter="10">
                        <el-col :span="5">
                          <b>NÚMERO DE PLACA:</b>
                        </el-col>
                        <el-col :span="17">
                          {{datos.placa}}
                        </el-col>
                      </el-row>
                      <el-row :gutter="10">
                        <el-col :span="5">
                          <b>NÚMERO DE SERIE:</b>
                        </el-col>
                        <el-col :span="17">
                          {{datos.serie}}
                        </el-col>
                      </el-row>
                      <el-row :gutter="10">
                        <el-col :span="5">
                          <b>CÓDIGO VIN:</b>
                        </el-col>
                        <el-col :span="17">
                          {{datos.vin}}
                        </el-col>
                      </el-row>
                      <el-row :gutter="10">
                        <el-col :span="5">
                          <b>NÚMERO DE MOTOR:</b>
                        </el-col>
                        <el-col :span="17">
                          {{datos.nro_motor}}
                        </el-col>
                      </el-row>
                      <el-row :gutter="10">
                        <el-col :span="5">
                          <b>COLOR:</b>
                        </el-col>
                        <el-col :span="17">
                          {{datos.color}}
                        </el-col>
                      </el-row>
                      <el-row :gutter="10">
                        <el-col :span="5">
                          <b>MARCA:</b>
                        </el-col>
                        <el-col :span="17">
                          {{datos.marca}}
                        </el-col>
                      </el-row>
                      <el-row :gutter="10">
                        <el-col :span="5">
                          <b>MODELO:</b>
                        </el-col>
                        <el-col :span="17">
                          {{datos.modelo}}
                        </el-col>
                      </el-row>
                      <el-row :gutter="10">
                        <el-col :span="5">
                          <b>ESTADO:</b>
                        </el-col>
                        <el-col :span="17">
                          {{datos.estado}}
                        </el-col>
                      </el-row>
                      <el-row :gutter="10">
                        <el-col :span="5">
                          <b>SEDE:</b>
                        </el-col>
                        <el-col :span="17">
                          {{datos.sede}}
                        </el-col>
                      </el-row>
                      <el-row :gutter="10">
                        <el-col :span="5">
                          <b>AÑO FABRICACIÓN:</b>
                        </el-col>
                        <el-col :span="17">
                          {{datos.anoFabricacion}}
                        </el-col>
                      </el-row>
                      <el-row :gutter="10">
                        <el-col :span="5">
                          <b>COD. CATEGORÍA:</b>
                        </el-col>
                        <el-col :span="17">
                          {{datos.codCategoria}}
                        </el-col>
                      </el-row>
                      <el-row :gutter="10">
                        <el-col :span="5">
                          <b>COD. TIPO CARROCERÍA:</b>
                        </el-col>
                        <el-col :span="17">
                          {{datos.codTipoCarr}}
                        </el-col>
                      </el-row>
                      <el-row :gutter="10">
                        <el-col :span="5">
                          <b>CARROCERÍA:</b>
                        </el-col>
                        <el-col :span="17">
                          {{datos.carroceria}}
                        </el-col>
                      </el-row>
                      <el-row :gutter="10">
                        <el-col :span="24">
                          <b>LISTA DE PROPIETARIOS:</b>
                          <el-table :show-header=false :data="datos.propietarios.nombre"
                                    style="width: 100%">
                            <el-table-column type="index" width="30">
                            </el-table-column>
                            <el-table-column label="LISTA DE PROPIETARIOS">
                              <template slot-scope="scope">
                                <span>{{ scope.row }}</span>
                              </template>
                            </el-table-column>
                          </el-table>
                        </el-col>
                      </el-row>
                    </div>
                    <el-alert v-show="datos && datos.placa===null" type="info" :closable="false" center>
                      Sin información
                    </el-alert>
                  </el-card>
                </b-tab>
                <b-tab title="Verificadores de Registros de Predios" @click="limpiarDatos">
                  <el-card v-loading="cargando">
                    <el-alert v-show="!boolRegistro" title="Ingrese todos los campos" type="error"
                              center show-icon class="mb-3">
                    </el-alert>
                    <el-row :gutter="20" type="flex">
                      <el-col :span="6">
                        <label>Apellido paterno</label>
                        <el-input v-model="filtro.aPaterno"></el-input>
                      </el-col>
                      <el-col :span="6">
                        <label>Apellido materno</label>
                        <el-input v-model="filtro.aMaterno"></el-input>
                      </el-col>
                      <el-col :span="6">
                        <label>Nombres</label>
                        <el-input v-model="filtro.nombres"></el-input>
                      </el-col>
                      <el-col :span="6" class="align-self-end">
                        <el-button type="primary" @click.prevent="obtenerVerificador">
                          Buscar
                        </el-button>
                        <el-button type="info" @click.prevent="limpiarDatos">
                          <img src="../../images/icon_eraser.png" alt srcset width="15"/>
                        </el-button>
                      </el-col>
                    </el-row>
                    <div v-if="listaDatos && listaDatos.length !== 0">
                      <el-table :data="listaDatos" stripe style="width: 100%">
                        <el-table-column prop="apellidosNombres" label="Apellidos y nombres"></el-table-column>
                        <el-table-column label="Estado" width="70px">
                          <template slot-scope="scope">
                            <span v-if="scope.row.estado==='A'">Activo</span>
                            <span v-if="scope.row.estado==='I'">Inactivo</span>
                          </template>
                        </el-table-column>
                        <el-table-column prop="profesion" label="Profesión"></el-table-column>
                        <el-table-column prop="telefono" label="Teléfono" width="100px"></el-table-column>
                        <el-table-column prop="tipoVerificador" label="Tipo verificador"></el-table-column>
                        <el-table-column prop="zonaRegistral" label="Zona registral"></el-table-column>
                      </el-table>
                    </div>
                    <el-alert v-else type="info" :closable="false" center>
                      Sin información
                    </el-alert>
                  </el-card>
                </b-tab>
              </b-tabs>
            </el-card>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<style>
  .tm {
    width: 100%;
  }

  a:hover,
  a:focus {
    color: black;
  }

  a {
    color: black;
  }
</style>
<script>
  import axios from "axios";
  import Constantes from "../../store/constantes.js";
  import TituloHeader from "../comun/TituloHeader";

  export default {
    name: "ConsultaSunarp",
    components: {
      TituloHeader,
    },
    data() {
      return {
        docConsulta: "",
        dataSunarp: [],
        dataTitularidad: [],
        dataNave: [],
        dataOficina: [],
        dataAsiento: [],
        dataImagen: [],
        dataPropiedad: [],
        listaZonaA: [],
        listaOficinaA: [],
        listaZonaP: [],
        listaOficinaP: [],
        img: {encodedImage: "data:image/jpg;base64,"},
        boolSunarp: false,
        boolTitularidad: false,
        boolNave: false,
        boolOficina: false,
        boolAsiento: false,
        boolImagen: false,
        boolPropiedad: false,
        boolBuscaTitular: false,
        boolBuscaNave: false,
        boolBuscaOficina: false,
        boolBuscaAsiento: false,
        boolBuscaImagen: false,
        boolBuscaPropiedad: false,
        boolRegistro: true,
        boolTitularN: false,
        boolTitularJ: false,
        tabIndex: 0,
        rdTitular: "",
        nombre: "",
        aPaterno: "",
        aMaterno: "",
        rSocial: "",
        placaNave: "",
        asiento: "",
        zAsiento: "",
        oAsiento: "",
        oficinaAsiento: "",
        aZona: "",
        aOficina: "",
        aPartida: "",
        aRegistro: "",
        vTransaccion: "",
        vIdImagen: "",
        rdImagen: "",
        vNroTotal: "",
        vNroRef: "",
        vNroPagina: "",
        propiedad: "",
        rOficina: "",
        rZona: "",
        filtro: {},
        listaDatos: [],
        datos: {},
        cargando: false
      };
    },
    mounted() {
      this.consultaSunarp(4);
    },
    methods: {
      consultaSunarp(opc) {
        this.validaRegistro(opc);
        if (this.boolRegistro) {
          if (opc != 4) {
            this.$swal({
              title: "Procesando",
              allowOutsideClick: false,
              onBeforeOpen: () => {
                this.$swal.showLoading();
              },
            });
          }
          if (this.boolSunarp) {
            this.limpiaConsulta(opc);
          }
          let dataPost = {};
          dataPost.correoUsuario = localStorage.getItem("cuenta");

          if (opc == 2) {
            this.boolBuscaTitular = true;
            if (this.rdTitular == "N") {
              dataPost.tipoParticipante = this.rdTitular;
              dataPost.nombres = this.nombre;
              dataPost.aPaterno = this.aPaterno;
              dataPost.aMaterno = this.aMaterno;
              this.boolTitularN = true;
              this.boolTitularJ = false;
              this.rSocial = "";
            } else {
              dataPost.tipoParticipante = this.rdTitular;
              dataPost.razonSocial = this.rSocial;
              this.boolTitularJ = true;
              this.boolTitularN = false;
              this.nombre = "";
              this.aPaterno = "";
              this.aMaterno = "";
            }
          }
          if (opc == 3) {
            dataPost.matricula = this.placaNave;
            this.boolBuscaNave = true;
          }
          if (opc == 5) {
            var asiento = this.$refs.oficinaAsiento;
            this.aOficina = asiento.options[asiento.selectedIndex].value;
            this.aZona = this.zAsiento;
            dataPost.zona = this.aZona;
            dataPost.oficina = this.aOficina;
            dataPost.partida = this.aPartida;
            dataPost.registro = this.aRegistro;
            this.boolBuscaAsiento = true;
          }
          if (opc == 6) {
            dataPost.transaccion = this.vTransaccion;
            dataPost.idImagen = this.vIdImagen;
            dataPost.tipoAsiento = this.rdImagen;
            dataPost.nTotalPagina = this.vNroTotal;
            dataPost.nPaginaRef = this.vNroRef;
            dataPost.nPagina = this.vNroPagina;
            this.boolBuscaImagen = true;
          }

          axios
            .post(Constantes.rutaPersona + "/datos-sunarp/" + opc, dataPost)
            .then((response) => {
              this.dataSunarp = response.data;

              //Información Titularidad de Bienes
              if (opc == 2) {
                this.dataTitularidad = this.dataSunarp.titular;
                if (
                  this.dataTitularidad != null &&
                  this.dataTitularidad.length > 0
                ) {
                  this.boolTitularidad = true;
                }
              }
              //Información Nave / Aeronave
              if (opc == 3) {
                this.dataNave = this.dataSunarp.nave.sunarp;
                if (this.dataNave != null) {
                  if (this.dataNave.matricula != null) this.boolNave = true;
                }
              }
              //Información Oficinas
              if (opc == 4) {
                this.dataOficina = this.dataSunarp.oficina;
                if (this.dataOficina != null && this.dataOficina.length > 0) {
                  this.boolOficina = true;

                  var oficina = [];
                  for (oficina of this.dataOficina) {
                    var zona = {};
                    var ofi = {};

                    zona = oficina.sunarp.ofiZona;
                    this.listaZonaA.push(zona);

                    ofi.zona = oficina.sunarp.ofiZona;
                    ofi.value = oficina.sunarp.ofiCodigo;
                    ofi.text = oficina.sunarp.ofiDescripcion;
                    this.listaOficinaA.push(ofi);
                    this.listaOficinaP.push(ofi);
                  }
                  const newArr = [];
                  const myObj = {};
                  this.listaZonaA.forEach(
                    (el) =>
                      !(el in myObj) && (myObj[el] = true) && newArr.push(el)
                  );
                  this.listaZonaA = newArr;
                  this.listaZonaP = newArr;
                }
              }
              //Información Asientos
              if (opc == 5) {
                this.dataAsiento = this.dataSunarp.listaasiento.sunarp;
                if (this.dataAsiento != null) {
                  if (this.dataAsiento.transaccion != 0) this.boolAsiento = true;
                }
              }
              //Información Imagen Asiento
              if (opc == 6) {
                this.dataImagen = this.dataSunarp.asiento.sunarp;
                if (this.dataImagen != null) {
                  if (this.dataImagen.idImagenAsiento != null)
                    this.boolImagen = true;
                }
              }

              this.boolSunarp = true;
              if (opc != 4) this.$swal.close();
            })
            .catch(
              (e) =>
                this.$swal({
                  icon: "info",
                  text:
                    "No se encontró información, por favor valide nuevamente los datos ingresados.",
                }),
              this.limpiaConsulta(opc)
            );
        } else {
          this.$swal({
            icon: "error",
            text: "Faltan ingresar datos para realizar la consulta.",
          });
        }
      },
      listarOficina: function (evt, opc) {
        if (opc == 5) {
          var oficina = [];
          this.listaOficinaA = [];
          for (oficina of this.dataOficina) {
            var ofi = {};
            if (this.zAsiento == oficina.sunarp.ofiZona) {
              ofi.zona = oficina.sunarp.ofiZona;
              ofi.value = oficina.sunarp.ofiCodigo;
              ofi.text = oficina.sunarp.ofiDescripcion;
              this.listaOficinaA.push(ofi);
            }
          }
        } else if (opc == 7) {
          var oficina = [];
          this.listaOficinaP = [];
          for (oficina of this.dataOficina) {
            var ofi = {};
            if (this.filtro.zona == oficina.sunarp.ofiZona) {
              ofi.zona = oficina.sunarp.ofiZona;
              ofi.value = oficina.sunarp.ofiCodigo;
              ofi.text = oficina.sunarp.ofiDescripcion;
              this.listaOficinaP.push(ofi);
            }
          }
        }
      },
      validaRegistro(opc) {
        switch (opc) {
          case 1:
            if (!this.filtro.razonSocial) this.boolRegistro = false;
            break;
          case 2:
            if (this.rdTitular == "N" && this.nombre == "")
              this.boolRegistro = false;
            if (this.rdTitular == "J" && this.rSocial == "")
              this.boolRegistro = false;
            else this.boolRegistro = true;
            break;
          case 3:
            if (this.placaNave == "") this.boolRegistro = false;
            else this.boolRegistro = true;
            break;
          case 4:
            this.boolRegistro = true;
            break;
          case 5:
            if (
              this.zAsiento == "" ||
              this.oAsiento == "" ||
              this.aPartida == "" ||
              this.aRegistro == ""
            )
              this.boolRegistro = false;
            else this.boolRegistro = true;
            break
          case 6:
            if (
              this.vTransaccion == "" ||
              this.vIdImagen == "" ||
              this.vNroTotal == "" ||
              this.vNroRef == "" ||
              this.vNroPagina == "" ||
              this.rdImagen == ""
            )
              this.boolRegistro = false;
            else this.boolRegistro = true;
            break;
          case 7:
            if (!this.filtro.matricula || !this.filtro.zona || !this.filtro.oficina)
              this.boolRegistro = false;
            break
          case 8:
            if (!this.filtro.aPaterno || !this.filtro.aMaterno || !this.filtro.nombres)
              this.boolRegistro = false;
        }
      },
      limpiarCampoFiltro(opc) {
        this.docConsulta = "";
        this.ListaPersona = [];
        if (opc == 2) {
          this.rdTitular = "";
          this.nombre = "";
          this.aPaterno = "";
          this.aMaterno = "";
          this.rSocial = "";
        } else if (opc == 3) {
          this.placaNave = "";
        } else if (opc == 5) {
          this.aZona = "";
          this.aPartida = "";
          this.aRegistro = "";
          this.aOficina = "";
          this.zAsiento = "";
          this.oAsiento = "";
        } else if (opc == 6) {
          this.vTransaccion = "";
          this.vIdImagen = "";
          this.vTipo = "";
          this.vNroTotal = "";
          this.vNroRef = "";
          this.vNroPagina = "";
        }
      },
      limpiaConsulta(opc) {
        if (opc == 2) {
          this.dataTitularidad = {};
          this.boolTitularidad = false;
        } else if (opc == 3) {
          this.dataNave = {};
          this.boolNave = false;
        } else if (opc == 4) {
          this.dataOficina = {};
          this.boolOficina = false;
        } else if (opc == 5) {
          this.dataAsiento = {};
          this.boolAsiento = false;
        } else if (opc == 6) {
          this.dataImagen = {};
          this.boolImagen = false;
        }
      },
      setBoolFalse() {
        this.boolSunarp = false;
        this.boolTitularidad = false;
        this.boolOficina = false;
        this.boolAsiento = false;
        this.boolImagen = false;
        this.boolRegistro = false;
      },
      async obtenerDetalleRPV() {
        this.cargando = true;
        this.boolRegistro = true;
        const url = Constantes.rutaPersona + '/verDetalleRPVExtra';
        this.validaRegistro(7);
        if (this.boolRegistro) {
          await axios.get(url, {params: this.filtro})
            .then(response => {
              this.datos = response.data;
            }).catch(e => console.log(e))
        }
        this.cargando = false;
      },
      async obtenerVerificador() {
        this.cargando = true;
        this.boolRegistro = true;
        const url = Constantes.rutaPersona + '/verificador';
        this.validaRegistro(8);
        if (this.boolRegistro) {
          await axios.get(url, {params: this.filtro})
            .then(response => {
              this.listaDatos = response.data;
            }).catch(e => console.log(e))
        }
        this.cargando = false;
      },
      async obtenerPersonaJuridica() {
        this.cargando = true;
        this.boolRegistro = true;
        const url = Constantes.rutaPersona + '/personaJuridica';
        this.validaRegistro(1)
        if (this.boolRegistro) {
          await axios.get(url, {params: this.filtro})
            .then(response => {
              this.listaDatos = response.data;
            }).catch(e => console.log(e))
        }
        this.cargando = false;
      },
      limpiarDatos() {
        this.filtro = {};
        this.listaDatos = [];
        this.datos = {};
        this.boolRegistro = true;
      },
    },
  };
</script>