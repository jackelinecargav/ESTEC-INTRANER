<template>
  <div class="content-wrapper">
    <section class="content">
      <template>
        <el-tabs class="col-md-12" type="card" v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="Horarios" name="horarios">
            <template>
              <div style="display: flex; margin-top: 10px;">
                <transition name="el-zoom-in-top">
                  <horarios v-show="show" class="col-md-12"></horarios>
                </transition>
              </div>
            </template>
          </el-tab-pane>
          <!-- <el-tab-pane label="Motivos" name="historial" :disabled="false">
            <template>
              <div style="display: flex; margin-top: 10px;">
                <transition name="el-zoom-in-top">
                  <horarios v-show="show2" class="col-md-12"></horarios>
                </transition>
              </div>
            </template>
          </el-tab-pane> -->
        </el-tabs>
      </template>
    </section>
  </div>
</template>

<script>
import axios from 'axios';
import Constantes from '../../../store/constantes.js';
import moment from "moment";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import Horarios from '../../citas/mantenimientos/MHorarios';

export default {
  components: {
    Horarios,
    Loading
  },
  data(){
    return{
      show: true,
      show2: false,
      
      activeName: 'horarios'
    }
  },
  mounted(){
    if(localStorage.getItem('logueado')=='true'){
      // this.obtMesasAyuda();
    }else{
      this.$router.push('/auth/login/');
    }
    
  },
  methods:{
    handleClick(tab, event) {
      if(this.activeName=='horarios'){
        this.show = true;
        this.show2 = false;
      }else if(this.activeName=='historial'){
        this.show = false;
        this.show2 = true;
      }
      // this.show = !this.show
      console.log(tab, event);
      console.log(this.show)
    }
  },
}
</script>
<style lang="scss">
.el-tabs--card>.el-tabs__header .el-tabs__item.is-active{
  border-bottom-color:  #409EFF;
}
</style>