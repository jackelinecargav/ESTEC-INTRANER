<template>
  <div class="login" style="width: 400px">
    <card class="login_principal">    
      <img class="logoimg" src="../../images/logo.png" alt="">
      <!-- <h1>Bienvenido a la Intranet de <br> Municipalidad de Miraflores</h1> -->
      <div class="card-body card-block">
          <div class="form-group">
            <label for="email">Usuario</label>
            <div class="input-group">
              <!-- <div class="input-group-addon"><i class="fa fa-envelope"></i></div> -->
              <input type="email" id="email" name="email" placeholder="Email" class="form-control" v-model="correo">
            </div>
          </div>
          <div class="form-group">
            <label for="password">Contraseña</label>
            <div class="input-group">
              <!-- <div class="input-group-addon"><i class="fa fa-asterisk"></i></div> -->
              <input type="password" id="password" name="password" placeholder="Contraseña" class="form-control" v-model="contrasena" @keyup.enter="Ingresar">
            </div>
          </div>
          <div class="form-actions form-group">
              <button type="button" @click="Ingresar" class="btn btn-muni btn-block">INGRESAR</button>
          </div>
      </div>
    </card>
    <footer class="text-muted text-center mt-3">{{version}}</footer>
  </div>
</template>

<script>
import axios from 'axios';
import Constantes from '../../store/constantes.js';
export default {
  name: 'Login',
  data(){
    return{
      correo:'',
      contrasena:'',
      version: Constantes.version
    }
  },
  mounted(){
    localStorage.setItem('logueado',false);
  },
  methods:{
    Ingresar(){
               localStorage.setItem('logueado',true); 
               this.$router.push({ name: 'bienvenido', params: { userId: 13 } })
              }
  }
}
</script>

<style lang="scss" scoped>
.login {
  .logoimg {
    margin: auto;
    display: block;
    margin-bottom: 10px;
  }
}
.login_principal {
  padding: 40px;
  border-radius: 20px;
  .form-group {
    margin-bottom: 20px;
    input {
      background: #F2F4F8;
      color: #003c67;
      font-weight: 600;
    }
  }
  label {
    font-weight: 500;
    font-size: 13px;
  }
  h1 {
    font-size: 16px;
    color: #0078CF;
    font-weight: 600;
    text-align: center;
    margin-bottom: 20px;
  }
  .btn-muni {
    margin-top: 20px;
    background: #003462;
    color: #fff;
    font-size: 14px;
    border-radius: 5px;
  }
}
  .card-title{
    padding-left: 20px;
  }
</style>