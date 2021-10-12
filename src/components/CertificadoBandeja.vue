<template>
    <div class="content-wrapper">
         <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-10">
            <div class="row">
              <h4>Módulo de Certificados de Parámetros Urbanísticos y Edificatorios</h4>
            </div>
          </div>
        </div>
      </div><!-- /.container-fluid -->
    </section>
    <section class="content">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <div class="row">
                <div class="form-group col-sm-5">
                  <div class="row">
                    <label for="exampleInputPassword1" class="col-sm-3 col-form-label" style="padding-right: 0px; !important">Solicitante</label>
                    <div class="col-sm-3" style="padding-right: 0px; !important"> 
                      <div class="form-group">
                        <select id="ddlTipoDocumento" class="form-control">
                          
                        </select>
                      </div>
                    </div>
                  <div class="col-sm-5" style="padding-right: 0px; !important">
                    <input type="text" class="form-control" placeholder="Ingrese Documento">
                  </div>
              </div>
                </div>
                <div class="form-group col-sm-5" style="padding-right: 0px; !important">
                    <div class="row">
                    <label for="exampleInputPassword1" class="col-sm-3 col-form-label" style="padding-right: 0px; !important">Expediente</label>
                    <div class="col-sm-2" style="padding-right: 0px; !important">
                        <input type="text" class="form-control" value="">
                    </div>
                    <div class="col-sm-6" style="padding-right: 0px; !important">
                      <input type="text" class="form-control" value="">
                    </div>
                    </div>
            </div>
            
            </div>
            <div class="row">
                <div class="form-group col-sm-5" style="padding-right: 0px; !important">
                        <div class="row">
                        <label for="exampleInputPassword1" class="col-sm-3 col-form-label" style="text-align: right; padding-right: 0px; !important">CUC</label>
                        <div class="col-sm-2" style="padding-right: 0px; !important">
                            <input type="text" class="form-control" value="022" disabled>
                        </div>
                        <div class="col-sm-3" style="padding-right: 0px; !important">
                            <input type="text" class="form-control" value="" >
                        </div>
                        <div class="col-sm-3" style="padding-right: 0px; !important">
                            <input type="text" class="form-control" value="" >
                        </div>
                        </div>
                </div>
                <div class="form-group col-sm-5">
                    <div class="row">
                    <label for="exampleInputPassword1" class="col-sm-3 col-form-label" style="padding-right: 0px; !important">Estado</label>
                    <div class="col-sm-8" style="padding-right: 0px; !important">
                      <select class="form-control">
                        <option>Todos</option>
                        <option>Creado</option>
                        <option>Por Firmar</option>
                        <option>Firmado</option>
                        <option>Publicado</option>
                      </select>
                    </div>
                    </div>
            </div>
            <div class="col-sm-1">
              <button type="button" onclick="BuscarExpediente();" class="btn btn-primary">Buscar</button>   
            </div>
            </div>
            </div>
          </div>
            <!-- /.card-header -->
            <div class="card-body">
              <table id="example2" class="table table-bordered table-hover">
                <thead>
                <tr>
                  <th>Expediente</th>
                  <th>Solicitante</th>
                  <th>CUC</th>
                  <th>Zonificación</th>
                  <th>Nro Certificado</th>
                  <th>F. Emision</th>
                  <th>F. Caducidad</th>
                  <th>Estado</th>
                  <th>Ver</th>
                </tr>
                </thead>
               <tbody>
                <tr ondblclick="Editar(1);">
                  <td>152-489-648</td>
                  <td>70467984- Juan Perez</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>Creado</td>
                  <td>
                    
                  </td>
                  
                </tr>
                <tr ondblclick="Editar(1);">
                  <td>151-489-648</td>
                  <td>704855798- Carlos Martinez</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>Creado</td>
                  <td>
                    
                  </td>
                </tr>
                <tr ondblclick="Editar(1);">
                  <td>152-189-648</td>
                  <td>70547896- Luis Arteaga</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>Creado</td>
                  <td>
                    
                  </td>
                </tr>
                <tr ondblclick="Editar(1);">
                  <td>154-489-648</td>
                  <td>70456321- Walter Poma</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>Creado</td>
                  <td>
                    
                  </td>
                </tr>
                <tr ondblclick="Editar(1);">
                  <td>153-378-537</td>
                  <td>70548781- Pedro Juarez</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>Creado</td>
                  <td>
                    
                  </td>
                </tr>
                <tr ondblclick="Editar(2);">
                  <td>153-378-537</td>
                  <td>70615498- Luis Jimenez</td>
                  <td>20-765-456</td>
                  <td>RDM</td>
                  <td>2019-765-456</td>
                  <td>10/12/2019</td>
                  <td>10/12/2022</td>
                  <td>Por Firmar</td>
                  <td>
                    <a href="../../../dist/RESIDENCIAL.pdf" download="CertificadoResidencial"><button type="button" onclick="VistaPrevia();" class="btn btn-block btn-primary"  >Ver</button></a>
                  </td>
                </tr>
                <tr ondblclick="Editar(3);">
                  <td>153-378-537</td>
                  <td>70945786- Saul Martinez</td>
                  <td>20-765-456</td>
                  <td>RDB</td>
                  <td>2019-765-456</td>
                  <td>10/12/2019</td>
                  <td>10/12/2022</td>
                  <td>Firmado</td>
                  <td>
                    <a href="../../../dist/RESIDENCIAL.pdf" download="CertificadoResidencial"><button type="button" onclick="VistaPrevia();" class="btn btn-block btn-primary"  >Ver</button></a>
                  </td>
                </tr>
                <tr ondblclick="Editar(3);">
                  <td>153-378-537</td>
                  <td>70035489- Carlos Gonzales</td>
                  <td>20-765-456</td>
                  <td>RDB</td>
                  <td>2019-765-456</td>
                  <td>10/12/2019</td>
                  <td>10/12/2022</td>
                  <td>Firmado</td>
                  <td>
                    <a href="../../../dist/RESIDENCIAL.pdf" download="CertificadoResidencial"><button type="button" onclick="VistaPrevia();" class="btn btn-block btn-primary"  >Ver</button></a>
                  </td>
                </tr>
                <tr ondblclick="Editar(4);">
                  <td>153-378-537</td>
                  <td>70154987- Javier Lopez</td>
                  <td>20-765-456</td>
                  <td>RDM</td>
                  <td>2019-765-456</td>
                  <td>10/12/2019</td>
                  <td>10/12/2022</td>
                  <td>Publicado</td>
                  <td>
                    <a href="../../../dist/RESIDENCIAL.pdf" download="CertificadoResidencial"><button type="button" onclick="VistaPrevia();" class="btn btn-block btn-primary"  >Ver</button></a>
                  </td>
                </tr>
                
                <tr ondblclick="Editar(4);">
                  <td>153-378-537</td>
                  <td>70264875- Julian Carlos</td>
                  <td>20-765-456</td>
                  <td>RDMA</td>
                  <td>2019-765-456</td>
                  <td>10/12/2019</td>
                  <td>10/12/2022</td>
                  <td>Publicado</td>
                  <td>
                    <a href="../../../dist/RESIDENCIAL.pdf" download="CertificadoResidencial"><button type="button" onclick="VistaPrevia();" class="btn btn-block btn-primary"  >Ver</button></a>
                  </td>
                </tr>
                <tr ondblclick="Editar(2);">
                  <td>153-378-537</td>
                  <td>70325874- Juan Perez</td>
                  <td>20-765-456</td>
                  <td>RDMA</td>
                  <td>2019-765-456</td>
                  <td>10/12/2019</td>
                  <td>10/12/2022</td>
                  <td>Por Firmar</td>
                  <td>
                    <a href="../../../dist/RESIDENCIAL.pdf" download="CertificadoResidencial"><button type="button" onclick="VistaPrevia();" class="btn btn-block btn-primary"  >Ver</button></a>
                  </td>
                </tr>
                <tr ondblclick="Editar(4);">
                  <td>153-378-537</td>
                  <td>70468741- Pedro Perez</td>
                  <td>20-765-456</td>
                  <td>RDA</td>
                  <td>2019-765-456</td>
                  <td>10/12/2019</td>
                  <td>10/12/2022</td>
                  <td>Publicado</td>
                  <td>
                    <a href="../../../dist/RESIDENCIAL.pdf" download="CertificadoResidencial"><button type="button" onclick="VistaPrevia();" class="btn btn-block btn-primary"  >Ver</button></a>
                  </td>
                </tr>
                <tr ondblclick="Editar(2);">
                  <td>153-378-537</td>
                  <td>70789415- Carlos Gutierrez</td>
                  <td>20-765-456</td>
                  <td>RDA</td>
                  <td>2019-765-456</td>
                  <td>10/12/2019</td>
                  <td>10/12/2022</td>
                  <td>Por Firmar</td>
                  <td>
                    <a href="../../../dist/RESIDENCIAL.pdf" download="CertificadoResidencial"><button type="button" onclick="VistaPrevia();" class="btn btn-block btn-primary"  >Ver</button></a>
                  </td>
                </tr>
                <tr ondblclick="Editar(2);">
                  <td>153-378-537</td>
                  <td>70874965- Carlos Gomez</td>
                  <td>20-765-456</td>
                  <td>RDA</td>
                  <td>2019-765-456</td>
                  <td>10/12/2019</td>
                  <td>10/12/2022</td>
                  <td>Por Firmar</td>
                  <td>
                    <a href="../../../dist/RESIDENCIAL.pdf" download="CertificadoResidencial"><button type="button" onclick="VistaPrevia();" class="btn btn-block btn-primary"  >Ver</button></a>
                  </td>
                </tr>
                <tr ondblclick="Editar(1);">
                  <td>154-489-648</td>
                  <td>70547896- Luis Arteaga</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>Creado</td>
                  <td>
                    
                  </td>
                </tr>
                <tr ondblclick="Editar(1);">
                  <td>154-489-648</td>
                  <td>70456321- Walter Poma</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>Creado</td>
                  <td>
                    
                  </td>
                </tr>
               </tbody>
                <tfoot>
                <tr>
                  
                </tr>
                </tfoot>
              </table>
            </div>
            <!-- /.card-body -->
          </div>
          <!-- /.card -->
        </div>
        <!-- /.col -->
      <!-- /.row -->
    </section>
    </div>
</template>