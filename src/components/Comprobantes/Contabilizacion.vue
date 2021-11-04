<template>
<div></div>
  <!-- <div>
       <el-form ref="form" :model="form" label-width="120px">
              <br />
              <el-form-item label="Concepto : ">
                <el-input v-model="conceptoText" 
                maxlength="250"
                disabled></el-input>
              </el-form-item>

              <el-form-item class="segItem">
                <el-row :gutter="10">
                  <el-col :xs="24" :md="4">
                    <el-checkbox v-model="detraccion">Detracción :</el-checkbox>
                  </el-col>
                  <el-col :xs="24" :md="8">
                    <div v-if="detraccion">
                    <el-select v-model="value" placeholder="Select" >
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select></div>
                    <div v-else>
                    <el-select v-model="value" placeholder="Select" disabled>
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select></div>
                  </el-col>
                  <el-col :xs="24" :md="4">
                    <el-checkbox v-model="igvAfecto">Afecto IGV</el-checkbox>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-form>
            <div class="py-1">
              <h4 class="card-title tituloTab">
                Distribución de Gasto
                <el-checkbox v-model="distriGasto" class="derecha"
                  >Única</el-checkbox
                >
              </h4>
              <hr />
            </div>
            <div>
              <table id="example2" class="table" width="95%"
              height="95%">
                <tbody>
                  <tr
                    v-for="item of numeroItems"
                    :key="'Gasto ' + item.numeros"
                  >
                    <td width="10%">CC{{ item.numeros }}</td>
                    <td width="15%">
                      <el-input
                        type="number"
                        class="input"
                        v-model="item.cc"
                      ></el-input>
                    </td>
                    <td width="10%">Centro de Costos</td>
                    <td width="15%">
                      <el-input
                        type="number"
                        maxlength="3"
                        class="input"
                        v-model="item.costo"
                      ></el-input>
                    </td>
                    <td width="10%">Anexo</td>
                    <td width="15%">
                      <el-input
                        type="number"
                        class="input"
                        v-model="item.importe"
                      ></el-input>
                    </td>
                    <td width="10%">Importe</td>
                    <td width="15%">
                      <el-input
                        type="number"
                        class="input"
                        v-model="item.importe"
                      ></el-input>
                    </td>
                    
                    
                    <td width="10%" v-if="distriGasto == false"><u style="font-size: 20px" @click="agregarItem()">+</u></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div id="cabecera" class="alinieado-derecha">
              <el-row :gutter="10">
                <el-col :xs="24" :md="12">
                  <div class="col text-right">
                    <button class="btn btn-danger" 
                    @click="imprimirEstadoCuenta()">
                        Vista Previa
                        <b-icon-arrow-down></b-icon-arrow-down>                                
                    </button>
                   </div>

                </el-col>
                <el-col :xs="24" :md="12">
                  <el-button
                    type="primary"
                    style="width: 200px; height: 50px; font-size: 17px"
                    plain
                    >Provisionar</el-button
                  >
                </el-col>
              </el-row>
              <br />
            </div>
  </div> -->
</template>

<script>
export default {

}
</script>

<style>

</style>