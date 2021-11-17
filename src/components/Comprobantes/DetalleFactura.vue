<template>
<div class="content-wrapper">
    <div>
        <titulo-header>Detalle {{tituloComprobante}} {{ detalle.serie }} -
            {{ detalle.numero }}</titulo-header>
        <section class="content">
            <el-row :gutter="10">
                <div class="card menu">
                    <div class="container" v-if="accion == 9">
                        <div class="">
                            <div>
                                <template v-if="detalleOrden != null">
                                    <div class="pb-1 ">
                                        <div>
                                            <h4 class="card-title pl-3  mb-0" style="text-align: left; color: #0078cf">
                                                Orden
                                            </h4>
                                        </div>
                                    </div>
                                    <hr />
                                    <table cellpadding="0" cellspacing="0" width="60%" style="margin-left: 30px">
                                        <tbody>
                                            <tr>
                                                <td class="beta">
                                                    <table cellpadding="2" cellspacing="1" width="100%">
                                                        <tbody>
                                                            <tr>
                                                                <td align="center" class="bg" valign="top" width="100%">
                                                                    <table class="cabecera-factura" cellpadding="3" cellspacing="1" width="100%">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td width="20%" class="bgn">
                                                                                    <b>Número Orden</b>
                                                                                </td>
                                                                                <td width="5%" class="bgn">:</td>
                                                                                <td width="75%" class="bgn">
                                                                                    {{ detalleOrden[0].nroOrden }}
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td width="30%" class="bgn">
                                                                                    <b>Fecha de Emisión </b>
                                                                                </td>
                                                                                <td width="5%" class="bgn">:</td>
                                                                                <td width="70%" class="bgn">
                                                                                    {{ formatoFecha(detalleOrden[0].fecha) }}
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td width="30%" class="bgn">
                                                                                    <b>Moneda</b>
                                                                                </td>
                                                                                <td width="5%" class="bgn">:</td>
                                                                                <td width="70%" class="bgn">
                                                                                    {{ detalleOrden[0].nombreMoneda }}
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td width="30%" class="bgn">
                                                                                    <b>Forma de Pago </b>
                                                                                </td>
                                                                                <td width="5%" class="bgn">:</td>
                                                                                <td width="70%" class="bgn">
                                                                                    {{ detalleOrden[0].formaPago }}
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td width="30%" class="bgn">
                                                                                    <b>Importe</b>
                                                                                </td>
                                                                                <td width="5%" class="bgn">:</td>
                                                                                <td width="70%" class="bgn">
                                                                                    {{ detalleOrden[0].importe  }}
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </template>
                                <template v-else>
                                    <div class="py-1">
                                        <h4 class="card-title  pl-3  mb-0" style="text-align: left; color: #0078cf">
                                            Contrato
                                        </h4>
                                        <hr />
                                    </div>
                                    <table cellpadding="0" cellspacing="0" width="60%" style="margin-left: 30px">
                                        <tbody>
                                            <tr>
                                                <td class="beta">
                                                    <table cellpadding="2" cellspacing="1" width="100%">
                                                        <tbody>
                                                            <tr>
                                                                <td align="center" class="bg" valign="top" width="100%">
                                                                    <table class="cabecera-factura" cellpadding="3" cellspacing="1" width="100%">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td width="30%" class="bgn">
                                                                                    <b>Número Contrato</b>
                                                                                </td>
                                                                                <td width="5%" class="bgn">:</td>
                                                                                <td width="70%" class="bgn">
                                                                                    {{ detalleContrato[0].idContrato }}
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td width="30%" class="bgn">
                                                                                    <b>Descripción</b>
                                                                                </td>
                                                                                <td width="5%" class="bgn">:</td>
                                                                                <td width="70%" class="bgn">
                                                                                    {{ detalleContrato[0].descripcion }}
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td width="30%" class="bgn">
                                                                                    <b>Fecha de Contrato</b>
                                                                                </td>
                                                                                <td width="5%" class="bgn">:</td>
                                                                                <td width="70%" class="bgn">
                                                                                    {{ formatoFecha(detalleContrato[0].fecha) }}
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </template>
                            </div>

                            <div id="cuerpo">
                                    <div class="py-1 ">
                                        <h4 class="card-title pl-3 mb-0" style="text-align: left; color: #0078cf">
                                            Detalle
                                        </h4>
                                        <hr />
                                    </div>
                                    <table cellpadding="0" cellspacing="0" width="60%" style="margin-left: 30px">
                                        <tbody>
                                            <tr>
                                                <td class="beta">
                                                    <table cellpadding="2" cellspacing="1" width="100%">
                                                        <tbody>
                                                            <tr>
                                                                <td align="center" class="bg" valign="top" width="100%">
                                                                    <table class="cabecera-factura" cellpadding="3" cellspacing="1" width="100%">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td width="30%" class="bgn">
                                                                                    <b>Razón Social</b>
                                                                                </td>
                                                                                <td width="5%" class="bgn">:</td>
                                                                                <td width="70%" class="bgn">
                                                                                    {{ detalle.proveedorNombreComercial }}
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td width="30%" class="bgn">
                                                                                    <b>RUC</b>
                                                                                </td>
                                                                                <td width="5%" class="bgn">:</td>
                                                                                <td width="70%" class="bgn">
                                                                                    {{ detalle.proveedorNumeroDocumento }}
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td width="30%" class="bgn">
                                                                                    <b> Dirección</b>
                                                                                </td>
                                                                                <td width="5%" class="bgn">:</td>
                                                                                <td width="70%" class="bgn">
                                                                                    {{ detalle.proveedorDireccion }} -
                                                                                    {{ detalle.proveedorZona }}
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td width="30%" class="bgn">
                                                                                    <b>Tipo de Moneda</b>
                                                                                </td>
                                                                                <td width="5%" class="bgn">:</td>
                                                                                <td width="70%" class="bgn">
                                                                                    {{ detalle.nombreMoneda }}
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td width="30%" class="bgn">
                                                                                    <b>Obseraciones</b>
                                                                                </td>
                                                                                <td width="5%" class="bgn">:</td>
                                                                                <td width="70%" class="bgn">
                                                                                    {{ detalle.observacion }}
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td width="30%" class="bgn">
                                                                                    <b>Fecha de Emisión</b>
                                                                                </td>
                                                                                <td width="5%" class="bgn">:</td>
                                                                                <td width="70%" class="bgn">
                                                                                    {{ currentDate }}
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                            </div>
                            <div id="cabecera" 
                                >
                                    <el-row :gutter="10">
                                        <el-col :xs="24" :md="8">/</el-col>
                                        <el-col :xs="24" :md="5">
                                                <el-button type="primary" plain style="width: 100%"  @click="verFile(1,'dfac2a5727934ce28a7638364e3fd90a' )">
                                                    Descargar ZIP / XML
                                                </el-button>
                                        </el-col>
                                        <el-col :xs="24" :md="5">
                                            <el-button type="primary" plain style="width: 100%"  @click="verFile(1, 'dfac2a5727934ce28a7638364e3fd90a')">Vista Comprobante PDF</el-button>
                                        </el-col>
                                        <el-col :xs="24" :md="5">
                                            <el-button type="primary" plain style="width: 100%"  @click="verFile(1, 'dfac2a5727934ce28a7638364e3fd90a')"> Vista Informe </el-button>
                                        </el-col>
                                    </el-row>
                                    <br />
                                </div>
                            <div id="detalle" class="detalle">
                                <table width="80%" style="margin-top: 40px">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div class="detalle-izquierda">
                                                    <div class="div-items">
                                                        <table id="example2" class="table table-hover table-sm mb-">
                                                            <thead>
                                                                <tr>
                                                                    <th width="10%">CANTIDAD</th>
                                                                    <th width="20%">UNIDAD DE MEDIDA</th>
                                                                    <th width="40%">DESCRIPCIÓN</th>
                                                                    <th width="15%" style="text-align: right">VALOR UNITARIO</th>
                                                                    <!-- <th width="15%">ICBPER</th> -->
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr v-for="item of detalleFactura" :key="'detalleFac ' + item.idComprobanteDetalle">
                                                                    <td width="10%">
                                                                        <div>{{ item.cantidad }}</div>
                                                                    </td>
                                                                    <td width="20%" style="text-align: left">
                                                                        <div>{{ item.unidadMedida }}</div>
                                                                    </td>
                                                                    <td width="40%" style="text-align: left">
                                                                        <div>{{ item.descripcion }}</div>
                                                                    </td>
                                                                    <td width="15%s" style="text-align: right">
                                                                        <div>{{ item.valorUnitario }}</div>
                                                                    </td>
                                                                    <!-- <td width="15%">{{ item.icbper }}</td> -->
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table width="80%">
                                    <tbody>
                                        <tr>
                                            <td style="width: 580px">
                                                <br />
                                            </td>
                                            <td>
                                                <div class="total-detalle">
                                                    <table width="100%" style="margin: auto">
                                                        <tbody style="margin-left: 30px">
                                                            <tr>
                                                                <td class="alinieado-izquierda">
                                                                    <div><b>Sub Total Ventas </b></div>
                                                                </td>
                                                                <td><b> : </b></td>
                                                                <td class="alinieado-derecha">
                                                                    <div>{{ subTotalV }}</div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td class="alinieado-izquierda">
                                                                    <div><b>Anticipios </b></div>
                                                                </td>
                                                                <td><b> : </b></td>
                                                                <td class="alinieado-derecha">
                                                                    <div>{{ AnticipiosV }}</div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td class="alinieado-izquierda">
                                                                    <div><b>Descuentos </b></div>
                                                                </td>
                                                                <td><b> : </b></td>
                                                                <td class="alinieado-derecha">
                                                                    <div>{{ DescuentosV }}</div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td class="alinieado-izquierda">
                                                                    <b>Valor de Ventas </b>
                                                                </td>
                                                                <td><b> : </b></td>
                                                                <td class="alinieado-derecha">
                                                                    {{ ValordeV   }}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td class="alinieado-izquierda"><b>IGV </b></td>
                                                                <td><b> : </b></td>
                                                                <td class="alinieado-derecha">
                                                                    {{ IgvV   }}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td class="alinieado-izquierda">
                                                                    <b>Otros Cargos </b>
                                                                </td>
                                                                <td><b> : </b></td>
                                                                <td class="alinieado-derecha">
                                                                    {{ OtrosCargosV   }}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td class="alinieado-izquierda">
                                                                    <b>Importe Total </b>
                                                                </td>
                                                                <td><b> : </b></td>
                                                                <td class="alinieado-derecha">
                                                                    {{ ImporteTotalV   }}
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div>
                                <el-row :gutter="10">
                                    <el-col :md="24">
                                        <div class="py-1 d-flex justify-content-between" style="margin-top: 0px; display: flex; width: 80%">
                                            <h4 class="card-title pl-3  mb-0" style="text-align: left; color: #0078cf">
                                                Trazabilidad
                                            </h4>
                                            <div>
                                                <el-row v-if="accion == 9" style="margin-top: 0px !important; margin-bottom: 0px !important">
                                                    <el-col :xs="24" :md="12">
                                                        <el-button type="primary" @click="dialogEstado = true; accionEstadoBoton=1; this.observacion='Se ha aprobado el comprobante.'" style="width: 200px; height: 50px; font-size: 17px; margin-right: 5px" plain>Aprobar</el-button>
                                                    </el-col>
                                                    <el-col :xs="24" :md="12">
                                                        <el-button type="danger" @click="dialogEstadoDenegado = true; accionEstadoBoton=0" style="width: 200px; height: 50px; font-size: 17px" plain>Rechazar</el-button>
                                                    </el-col>
                                                </el-row>
                                            </div>
                                        </div>
                                        <hr style="margin-top: 0px !important; margin-bottom: 10px !important" />
                                        <div id="tabTrazabilidad" class="tab-pane active">
                                            <div class="container" style="width: 80%; text-align: left; margin-left: 20px">
                                                <table width="80%" id="example2" class="table table-hover ">
                                                    <thead>
                                                        <tr>
                                                            <th width="10%">FECHA</th>
                                                            <th width="20%">USUARIO</th>
                                                            <th width="20%">ACCIÓN</th>
                                                            <th width="40%">OBSERVACIÓN</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr v-for="item of detalleTrazabilidad" :key="
                            'detalletraza ' + item.idComprobanteTrazabilidad
                          ">
                                                            <td width="10%">{{ formatoFecha(item.fechaRegistro) }}</td>
                                                            <td width="15%">{{ item.usuarioRegistro }}</td>
                                                            <td width="20%">{{ item.nombreEstado }}</td>
                                                            <td width="40%">{{ item.observacion }}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                            <el-dialog title="Estado" :visible.sync="dialogEstado" width="30%">
                                <span>Seguro que desea comfirmar el documento?</span>
                                <span slot="footer" class="dialog-footer">
                                    <el-button type="danger" @click="dialogEstado = false">No</el-button>
                                    <el-button type="primary" @click="IngresarObservacion= true">Si</el-button>
                                </span>
                            </el-dialog>
                            <el-dialog title="Estado" :visible.sync="dialogEstadoDenegado" width="30%">
                                <span>Seguro que desea rechazar el documento?</span>
                                <span slot="footer" class="dialog-footer">
                                    <el-button type="danger" @click="dialogEstado = false">No</el-button>
                                    <el-button type="primary" @click="IngresarObservacion = true">Si</el-button>
                                </span>
                            </el-dialog>
                            <el-dialog title="Observación" :visible.sync="IngresarObservacion" width="20%">
                                <el-input type="textarea" autosize v-model="observacion">
                                </el-input>
                                <span slot="footer" class="dialog-footer">
                                    <el-button type="primary" @click="Accion()">Guardar</el-button>
                                </span>
                            </el-dialog>
                            <div></div>
                        </div>
                    </div>
                    <div v-else>
                        <el-tabs v-model="activeName" @tab-click="handleClick">
                            <el-tab-pane label="Información del Comporbante" name="first">
                                <div id="cabecera" class="cabecera alinieado-derecha">
                                    <el-row :gutter="10" v-if="accion == 9">
                                        <el-col :xs="24" :md="12">
                                            <el-button type="primary" @click="dialogEstado = true" style="width: 200px; height: 50px; font-size: 17px" plain>Aprobar</el-button>
                                        </el-col>
                                        <el-col :xs="24" :md="12">
                                            <el-button type="danger" @click="dialogEstadoDenegado = true" style="width: 200px; height: 50px; font-size: 17px" plain>Rechazar</el-button>
                                        </el-col>
                                    </el-row>
                                    <br />
                                </div>

                                <div>
                                    <template v-if="detalleOrden != null">
                                        <div class="py-3">
                                            <h4 class="card-title" style="text-align: left; color: #0078cf">
                                                Orden
                                            </h4>
                                            <hr />
                                        </div>
                                        <table cellpadding="0" cellspacing="0" width="80%" style="margin-left: 30px">
                                            <tbody>
                                                <tr>
                                                    <td class="beta">
                                                        <table cellpadding="2" cellspacing="1" width="100%">
                                                            <tbody>
                                                                <tr>
                                                                    <td align="center" class="bg" valign="top" width="100%">
                                                                        <table class="cabecera-factura" cellpadding="3" cellspacing="1" width="100%">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td width="30%" class="bgn">
                                                                                        <b>Número Orden</b>
                                                                                    </td>
                                                                                    <td width="5%" class="bgn">:</td>
                                                                                    <td width="70%" class="bgn">
                                                                                        {{ detalleOrden[0].nroOrden }}
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td width="30%" class="bgn">
                                                                                        <b>Fecha de Emisión </b>
                                                                                    </td>
                                                                                    <td width="5%" class="bgn">:</td>
                                                                                    <td width="70%" class="bgn">
                                                                                        {{
                                          formatoFecha(detalleOrden[0].fecha)
                                        }}
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td width="30%" class="bgn">
                                                                                        <b>Moneda</b>
                                                                                    </td>
                                                                                    <td width="5%" class="bgn">:</td>
                                                                                    <td width="70%" class="bgn">
                                                                                        {{ detalleOrden[0].nombreMoneda }}
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td width="30%" class="bgn">
                                                                                        <b>Forma de Pago </b>
                                                                                    </td>
                                                                                    <td width="5%" class="bgn">:</td>
                                                                                    <td width="70%" class="bgn">
                                                                                        {{ detalleOrden[0].formaPago }}
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td width="30%" class="bgn">
                                                                                        <b>Importe</b>
                                                                                    </td>
                                                                                    <td width="5%" class="bgn">:</td>
                                                                                    <td width="70%" class="bgn">
                                                                                        {{ detalleOrden[0].importe }}
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </template>
                                    <template v-else>
                                        <div class="py-3">
                                            <h4 class="card-title" style="text-align: left; color: #0078cf">
                                                Contrato
                                            </h4>
                                            <hr />
                                        </div>
                                        <table cellpadding="0" cellspacing="0" width="80%" style="margin-left: 30px">
                                            <tbody>
                                                <tr>
                                                    <td class="beta">
                                                        <table cellpadding="2" cellspacing="1" width="100%">
                                                            <tbody>
                                                                <tr>
                                                                    <td align="center" class="bg" valign="top" width="100%">
                                                                        <table class="cabecera-factura" cellpadding="3" cellspacing="1" width="100%">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td width="30%" class="bgn">
                                                                                        <b>Número Contrato</b>
                                                                                    </td>
                                                                                    <td width="5%" class="bgn">:</td>
                                                                                    <td width="70%" class="bgn">
                                                                                        {{ detalleContrato[0].idContrato }}
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td width="30%" class="bgn">
                                                                                        <b>Descripción</b>
                                                                                    </td>
                                                                                    <td width="5%" class="bgn">:</td>
                                                                                    <td width="70%" class="bgn">
                                                                                        {{ detalleContrato[0].descripcion }}
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td width="30%" class="bgn">
                                                                                        <b>Fecha de Contrato</b>
                                                                                    </td>
                                                                                    <td width="5%" class="bgn">:</td>
                                                                                    <td width="70%" class="bgn">
                                                                                        {{ detalleContrato[0].fechaContrato }}
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </template>
                                </div>

                                <div id="cuerpo">
                                        <div class="py-3">
                                            <h4 class="card-title" style="text-align: left; color: #0078cf">
                                                Factura
                                            </h4>
                                            <hr />
                                        </div>
                                        <table cellpadding="0" cellspacing="0" width="80%" style="margin-left: 30px">
                                            <tbody>
                                                <tr>
                                                    <td class="beta">
                                                        <table cellpadding="2" cellspacing="1" width="100%">
                                                            <tbody>
                                                                <tr>
                                                                    <td align="center" class="bg" valign="top" width="100%">
                                                                        <table class="cabecera-factura" cellpadding="3" cellspacing="1" width="100%">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td width="30%" class="bgn">
                                                                                        <b>Razón Social</b>
                                                                                    </td>
                                                                                    <td width="5%" class="bgn">:</td>
                                                                                    <td width="70%" class="bgn">
                                                                                        {{ detalle.proveedorNombreComercial }}
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td width="30%" class="bgn">
                                                                                        <b>RUC</b>
                                                                                    </td>
                                                                                    <td width="5%" class="bgn">:</td>
                                                                                    <td width="70%" class="bgn">
                                                                                        {{ detalle.proveedorNumeroDocumento }}
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <template v-if="detalle.ordenNumero != null">
                                                                                        <td width="30%" class="bgn">
                                                                                            <b> N° Orden</b>
                                                                                        </td>
                                                                                        <td width="5%" class="bgn">:</td>
                                                                                        <td width="70%" class="bgn">
                                                                                            {{ detalle.ordenNumero }}
                                                                                        </td>
                                                                                    </template>
                                                                                    <template v-else>
                                                                                        <td width="30%" class="bgn">
                                                                                            <b> N° Contrato</b>
                                                                                        </td>
                                                                                        <td width="5%" class="bgn">:</td>
                                                                                        <td width="70%" class="bgn">
                                                                                            {{ detalle.ordenContrato }}
                                                                                        </td>
                                                                                    </template>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td width="30%" class="bgn">
                                                                                        <b> Dirección</b>
                                                                                    </td>
                                                                                    <td width="5%" class="bgn">:</td>
                                                                                    <td width="70%" class="bgn">
                                                                                        {{ detalle.proveedorDireccion }} -
                                                                                        {{ detalle.proveedorZona }}
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td width="30%" class="bgn">
                                                                                        <b>Tipo de Moneda</b>
                                                                                    </td>
                                                                                    <td width="5%" class="bgn">:</td>
                                                                                    <td width="70%" class="bgn">
                                                                                        {{ detalle.nombreMoneda }}
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td width="30%" class="bgn">
                                                                                        <b>Obseraciones</b>
                                                                                    </td>
                                                                                    <td width="5%" class="bgn">:</td>
                                                                                    <td width="70%" class="bgn">
                                                                                        {{ detalle.observacion }}
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td width="30%" class="bgn">
                                                                                        <b>Fecha de Emisión</b>
                                                                                    </td>
                                                                                    <td width="5%" class="bgn">:</td>
                                                                                    <td width="70%" class="bgn">
                                                                                        {{ currentDate }}
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                </div><br/>

                                <div id="detalle" class="detalle">
                                    <div class="py-1">
                                        <h4 class="card-title" style="text-align: left; color: #0078cf">
                                            Detalle
                                        </h4>
                                        <hr />
                                <div class="total-detalle" style="margin: 3%;">
                                        <table width="100%" style="margin: auto">
                                            <tbody>
                                                <tr>
                                                    <td style="width: 25%;">
                                                        <div><b>Sub Total Ventas </b></div>
                                                    </td>
                                                    <td style="width: 5%;"><b> : </b></td>
                                                    <td><div>{{ subTotalV }}</div></td>
                                                </tr>
                                                <tr>
                                                    <td><div><b>Anticipios </b></div></td>
                                                    <td><b> : </b></td>
                                                    <td><div>{{ AnticipiosV}}</div></td>
                                                </tr>
                                                <tr>
                                                    <td><div><b>Descuentos </b></div></td>
                                                    <td><b> : </b></td>
                                                    <td><div>{{ DescuentosV}}</div></td>
                                                </tr>
                                                <tr>
                                                    <td><b>Valor de Ventas </b>                                                   </td>
                                                    <td><b> : </b></td>
                                                    <td>{{ ValordeV}}</td>
                                                </tr>
                                                <tr>
                                                    <td><b>IGV </b></td>
                                                    <td><b> : </b></td>
                                                    <td> {{ IgvV}} </td>
                                                </tr>
                                                <tr>
                                                    <td><b>Otros Cargos </b></td>
                                                    <td><b> : </b></td>
                                                    <td>{{ OtrosCargosV}} </td>
                                                </tr>
                                                <tr>
                                                    <td><b>Importe Total </b>
                                                    </td>
                                                    <td><b> : </b></td>
                                                    <td> {{ ImporteTotalV }} </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    </div><br/>
                                    <table width="100%" style="margin-top: -40px">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <div class="detalle-izquierda">
                                                        <div class="div-items mx-3">
                                                            <table id="example2" class="table table-hover table-sm mb-">
                                                                <thead>
                                                                    <tr>
                                                                        <th width="10%">CANTIDAD</th>
                                                                        <th width="20%">UNIDAD DE MEDIDA</th>
                                                                        <th width="40%">DESCRIPCIÓN</th>
                                                                        <th width="15%">VALOR UNITARIO</th>
                                                                        <th width="15%">ICBPER</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr v-for="item of detalleFactura" :key="'detalleFac ' + item.idComprobanteDetalle">
                                                                        <td width="10%">{{ item.cantidad }}</td>
                                                                        <td width="20%">{{ item.unidadMedida }}</td>
                                                                        <td width="40%">{{ item.descripcion }}</td>
                                                                        <td width="15%s">{{ item.valorUnitario }}</td>
                                                                        <td width="15%">{{ item.icbper }}</td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                             
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <br /><br />
                                    <div>
                                        <el-row :gutter="10">
                                            <el-col :md="24">
                                                <div class="py-1" style="margin-top: -40px">
                                                    <h4 class="card-title" style="text-align: left; color: #0078cf">
                                                        Trazabilidad
                                                    </h4>
                                                    <hr />
                                                </div>
                                                <div id="tabTrazabilidad" class="tab-pane active">
                                                    <div class="container d-flex justify-content-center">
                                                        <table id="example2" class="table table-hover table-sm mb-2">
                                                            <thead>
                                                                <tr>
                                                                    <th width="10%">FECHA REGISTRO</th>
                                                                    <th width="20%">ESTADO</th>
                                                                    <th width="30%">OBSERVACIÓN</th>
                                                                    <th width="20%">USUARIO</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr v-for="item of detalleTrazabilidad" :key="
                                'detalletraza ' + item.idComprobanteTrazabilidad
                              ">
                                                                    <td width="10%">{{ item.fechaRegistro }}</td>
                                                                    <td width="20%">{{ item.nombreEstado }}</td>
                                                                    <td width="30%">{{ item.observacion }}</td>
                                                                    <td width="15%">{{ item.usuarioRegistro }}</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </el-col>
                                        </el-row>
                                    </div>
                                </div>
                                <el-dialog title="Estado" :visible.sync="dialogEstado" width="30%">
                                    <span>Seguro que desea confirmar el documento?</span>
                                    <span slot="footer" class="dialog-footer">
                                        <el-button type="danger" @click="dialogEstado = false">No</el-button>
                                        <el-button type="primary" @click="Aprobar()">Si</el-button>
                                    </span>
                                </el-dialog>

                                <el-dialog title="Estado" :visible.sync="dialogEstadoDenegado" width="30%">
                                    <span>Seguro que desea rechazar el documento?</span>
                                    <span slot="footer" class="dialog-footer">
                                        <el-button type="danger" @click="dialogEstadoDenegado = false">No</el-button>
                                        <el-button type="primary" @click="IngresarObservacion = true">Si</el-button>
                                    </span>
                                </el-dialog>
                                <el-dialog title="Observación" :visible.sync="IngresarObservacion" width="20%">
                                    <el-input type="textarea" autosize v-model="observacion">
                                    </el-input>
                                    <span slot="footer" class="dialog-footer">
                                        <el-button type="primary" @click="Rechazar()">Guardar</el-button>
                                    </span>
                                </el-dialog>
                                <div></div>
                            </el-tab-pane>
                            <el-tab-pane label="Contabilización" name="second" :disabled="mostrarContabilidad">
                                <Contabilizacion/>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </div>
            </el-row>
        </section>
    </div>
</div>
</template>

<script>
import moment from "moment";
import TituloHeader from "../comun/TituloHeader.vue";
import axios from "axios";
import constantes from "../../store/constantes";
import Contabilizacion from './Contabilizacion.vue';
export default {
    components: {
        TituloHeader,
        Contabilizacion,
    },
    data() {
        return {
            tituloComprobante: "",
            conceptoText: null,
            detraccion: false,
            distriGasto: false,

            options: [{
                value: 'Option1',
                label: 'Option1'
            }],
            value: '',
            fechaActual:null,
            activeName: "first",

            detalleOrden: null,
            detalleContrato: null,

            itemSeleccionado: null,
            dialogEstadoDenegado: false,
            dialogEstado: false,
            IngresarObservacion: false,
            IngresarObservacionAsiento: false,
            observacion: null,
            accion: null,
            currentDate: null,

            detalle: {},
            detalleFactura: null,
            detalleTrazabilidad: null,

            subTotalV: null,
            AnticipiosV: null,
            DescuentosV: null,
            ValordeV: null,
            OtrosCargosV: null,
            ImporteTotalV: null,
            IgvV: null,
            accionEstadoBoton: null,
            mostrarContabilidad: false,
            catalogDetracciones:null,
            datosProvision:{},
            nomResponsable:null,
            observacionAsiento:null,
            //armar asiento 
            idComprobante: null,
        };
    },
    created() {
      var fechahoy= new Date()
      var mes = parseInt(fechahoy.getMonth())+1
      this.fechaActual = fechahoy.getUTCDate()+"/"+mes+"/"+fechahoy.getFullYear()
      this.consultar();
    },
    methods: {
        verFile(param, token) {
            console.log("mostrando file clickeado");
            var urlFiles =
                constantes.rutaAdmin +
                "/recuperarEntidadArchivo/1/0/" +
                param +
                "/" +
                token;
            console.log(urlFiles);
            window.open(urlFiles, "_blank");
        },
        milesNumeros(numero) {
            return numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        agregarItem() {
            this.numeroItems.push({
                numeros: this.numeroItems.length + 1,
                importe: null,
                cc: null,
                costo: null
            })
        },
        handleClick(tab, event) {
            console.log(tab, event);
        },

        financial(numro) {
            return Number.parseFloat(numro).toFixed(2);
        },
        formatoFecha(valor) {
            return moment(valor).format("DD-MM-YYYY");
        },
        consultar() {
            let url = constantes.rutaAdmin + "/consultar-comprobante";
            axios
                .get(url, {
                    params: {
                        idComprobante: this.$route.params.idComprobante,
                    },
                })
                .then((response) => {
                    this.detalle = response.data.result[0];
                    if (this.detalle.id004Estado == 11 || this.detalle.id004Estado == 9) this.mostrarContabilidad = true;
                    this.tituloComprobante = (this.detalle.id007TipoComprobante == 26) ? "Recibo" : "Factura";
                    this.conceptoText =
                        this.detalle.proveedorNombreComercial + ", " + this.detalle.numero;
                    this.detalleFactura = response.data.result[0].listaComprobanteDetalle;
                    this.detalleTrazabilidad =
                        response.data.result[0].listaComprobanteTrazabilidad;
                    this.accion = response.data.result[0].id004Estado;
                    this.currentDate = moment(
                        response.data.result[0].fechaEmision
                    ).format("DD-MM-YYYY");
                    this.subTotalV = this.financial(this.detalle.importeSubTotal);
                    this.AnticipiosV = this.financial(this.detalle.importeAnticipios);
                    this.DescuentosV = this.financial(this.detalle.importeDescuentos);
                    this.ValordeV = this.financial(this.detalle.importeValorVenta);
                    this.OtrosCargosV = this.financial(this.detalle.importeOtrosCargos);
                    this.ImporteTotalV = this.financial(this.detalle.importeTotal);
                    this.IgvV = this.financial(this.detalle.importeIgv);
                    if (this.detalle.ordenNumero != null) {
                        let url = constantes.rutaAdmin + "/getOrdenes"
                        axios
                            .get(url, {
                                params: {
                                    nroOrden: this.detalle.ordenNumero,
                                },
                            })
                            .then((response) => {
                                this.detalleOrden = response.data.result;
                            })
                            .catch((e) => console.log(e));
                    } else {
                        let url = constantes.rutaAdmin + "/getContrato"
                        axios
                            .get(url, {
                                params: {
                                    nroContrato: this.detalle.ordenContrato,
                                },
                            })
                            .then((response) => {
                                this.detalleContrato = response.data.result;
                            })
                            .catch((e) => console.log(e));
                    }
                })
                .catch((e) => console.log(e));
        },
        Accion() {
            if (this.accionEstadoBoton == 1) {
                this.Aprobar()
            } else if (this.accionEstadoBoton == 0) {
                this.Rechazar()
            }
        },
        Aprobar() {
            this.dialogEstado = false;
            let detalle = this.detalle;
            let url = constantes.rutaAdmin + "/estado-factura"
            axios
                .get(url, {
                    params: {
                        usuarioResponsable: "CFF",
                        idComprobante: detalle.idComprobante,
                        estado: 10,
                        id008Trazabilidad: 28,
                        observacion: this.observacion,
                        usuarioModificador: localStorage.getItem("User"),
                    },
                })
                .then((response) => {
                    console.log(response);
                    this.consultar();
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        Rechazar() {
            this.dialogEstadoDenegado = false;
            this.IngresarObservacion = false;
            let detalle = this.detalle;
            let url = constantes.rutaAdmin + "/estado-factura"
            axios
                .get(url, {
                    params: {
                        idComprobante: detalle.idComprobante,
                        estado: 11,
                        id008Trazabilidad: 29,
                        observacion: this.observacion,
                        usuarioModificador: localStorage.getItem("User"),
                        usuarioResponsable: "AAA",
                    },
                })
                .then((response) => {
                    console.log(response);
                    this.consultar();
                    if (response.data.esCorrecto) {
                        this.observacion = " ";
                    } else {
                        this.$swal({
                            icon: "error",
                            title: "Error",
                            text: "Intentelo más tarde",
                        });
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        },
    }
};
</script>

<style lang="scss" scoped>
.tituloTab {
    text-align: left;
    color: #0078cf;
    margin-left: 30px;
}

.segItem {
    text-align: left;
    margin-left: -114px;
}

.derecha {
    float: right;
    margin-right: 5%;
}

hr {
    width: 50vw !important;
    position: relative;
    margin-top: 5px;
    margin-bottom: 5px;
    float: left;
}

.alinieado-derecha {
    text-align: right;
    float: right;
}

.alinieado-izquierda {
    text-align: left;
}

.total-detalle {
    align-content: center;
}
</style>
