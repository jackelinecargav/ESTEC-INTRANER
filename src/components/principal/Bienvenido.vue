<template>
  <div class="welcome">
    <div class="row">
      <div class="col-md-12 m-b-20">
        <div class="card top-card">
          <div class="card-body">
            <h1>Bievenido(a)</h1>
            <p>Plataforma digital<b> ESTEC </b></p>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
    <div class="col-md-3 m-b-20" v-for="(item, index) in listaOpciones" :key="index">
      <div class="card" v-if="item.url !== '/auth/login'">
        <div class="card-header">{{item.name}}</div>
        <ul class="list-group list-group-flush" v-if="item.children">
          <li class="list-group-item" v-for="(chil, index1) in item.children" :key="index1">
            <router-link :to="{ name: chil.name,  params: { opcion: chil.idOpcion }}">
              {{ chil.name }}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
       listaOpciones: [
        {
          name: "Administracion",
          url: "/",
          icon: 'fa caret-right',
          children: [
            {
              name: "Proveedores",
              url: "/menu/miCuenta",
              icon: 'fa caret-right',
            },
          ],
        },
        {
          name: "Comprobantes ",
          url: "/",
          icon: 'fa caret-right',
          children: [
            {
              name: "Pendientes",
              url: "/facturas",
              icon: 'fa caret-right',
            },
            {
              name: "Facturas Físicas",
              url: "/facturasFisicas",
              icon: 'fa caret-right',
            }
          ],
        },
        {
          name: "Archivo Banco ",
          url: "/",
          icon: 'fa caret-right',
          children: [
            {
              name: "ArchivoBandeja",
              url: "/",
              icon: 'fa caret-right',
            },
            {
              name: "ArchivoNuevo",
              url: "/",
              icon: 'fa caret-right',
            }
          ],
        },
      ],
    }
  },
  created() {
    this.$emit('setIdUser', this.userId)
  }
};
</script>
<style lang="scss" scoped>
.welcome {
  padding: 10px;
  // .top-card {
  //   margin-bottom: 20px;
  // }
  .m-b-20 {
    margin-bottom: 20px;
  }
  .list-group-item {
    a {
      color: #7d7d7d;
    }
  }
  .card {
     margin-bottom: 20px;
     height: 100%;
     overflow: hidden;
     border-radius: 10px;
  }
  .card .card-body {
    padding: 1.5em;
    p {
      margin-bottom: 0px;
    }
    h1 {
      font-size: 25px;
      color: #0078cf;
    }
  }
  .card-header {
    background-color: #eaf0f9;
    color: #0078cf;
    font-weight: 600;
  }
}
</style>
