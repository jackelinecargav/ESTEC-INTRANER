<template >
    <div class="template col-12" >
       <section id="banner">
          <div id="contenedorOpaco" class="opaco col-md-10" style=" margin: auto;">
            <div id="divImagen" class="col-12 text-center" style="margin: auto auto;">
              <img class="col-8 text-center" src="../../images/miraflores-en-tu-corazon.png"  style="margin: auto;">
            </div>
            <div id="divText1" class="col-12 text-center" style="margin: auto;">
              <h3 class="texto titulosecundario text-center col-12" style="margin: auto;">Bienvenido al modulo</h3>
            </div>
            <div id="divText2" class="col-12 text-center" style="margin: auto;">
              <h1 class="texto tituloprincipal text-center col-12" style=""><b>INTRANET</b></h1>
            </div> 
          </div> 
       </section>
    </div>
    
</template>
<script>
export default {
  data(){
    return{
      altodiv: 0,
    }
  },
  mounted(){
    this.tamanio(),
    setTimeout(
    this.ajustarTamaño()
    ,200);
  },
  methods:{
    ajustarTamaño(){
      var contenedorOpaco = document.getElementById("contenedorOpaco");
      var divText1 = document.getElementById("divText1");
      var divText2 = document.getElementById("divText2");
      
      console.log(contenedorOpaco.clientWidth);
      console.log(contenedorOpaco.clientHeight);
      
      console.log("ancho text1"+divText1.clientWidth);
      console.log("alto text1"+divText1.clientHeight);
    },
    tamanio(){
      var tam = [0, 0];
      if (typeof window.innerWidth != 'undefined')
      {
        tam = [window.innerWidth,window.innerHeight];
      }
      else if (typeof document.documentElement != 'undefined'
          && typeof document.documentElement.clientWidth !=
          'undefined' && document.documentElement.clientWidth != 0)
      {
        tam = [
            document.documentElement.clientWidth,
            document.documentElement.clientHeight
        ];
      }
      else   {
        tam = [
            document.getElementsByTagName('body')[0].clientWidth,
            document.getElementsByTagName('body')[0].clientHeight
        ];
      }
      console.log(tam)
      console.log("VALOR DE TAM")
    }
  }
}
</script>>
<style >
.template{
  height:100vh;
  background-color: lightcoral;
  padding: 0;
  margin: auto;
}
.texto{
    color: #000;
    float:left;
    position:relative;
    margin-top: 3.9rem;
    
}
.opaco {
    background-color:rgb(236, 235, 231);
    opacity: 0.7;
    width:100%;
    height:80%;
    left:0;
    right:0;
    top:0;
    bottom:0;
    position: absolute;
    margin: auto auto;
	  overflow-y: scroll;
}
#banner{
overflow:hidden;
width:100%;
height:100%;
margin:auto;
padding:0px;
background: url("../../images/Parque-Reducto-2.jpg");
background-position: center center;
background-size: 100%;
background-attachment: fixed;
background-color: #464646
}

.tituloprincipal{
  text-align:center;
  font-size:90px;
  font-weight: bold;
  margin-top:  10px;
  }
.titulosecundario{
  text-align:center;
  font-size:90px;
  font-weight: 600;
  }
</style>
