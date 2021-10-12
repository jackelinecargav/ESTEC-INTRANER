<template>
    <nav aria-label="...">
        <ul class="pagination">
        <li class="page-item">
            <a v-if="paginaActual>1" class="page-link" @click="cambiarPagina(paginaActual-1)">Anterior</a>
            <span v-if="paginaActual==1" class="page-link">Anterior</span>
        </li>
        <li class="page-item">
            <a v-if="paginaActual>1 && totalPaginas>limiteVistaPaginas+1" class="page-link" @click="cambiarPagina(1)">...</a>
        </li>
        <li v-for="pagina of totalPaginas" :key=pagina.id class="page-item" :class="{'active':pagina==paginaActual}">
            <a v-if="(pagina>=0+paginaActual && pagina<=limiteVistaPaginas+paginaActual) || (pagina>=totalPaginas-limiteVistaPaginas && pagina<=totalPaginas)" @click="cambiarPagina(pagina)" class="page-link" >
            {{pagina}}
            </a>
            <span v-if="pagina==limiteVistaPaginas+1+paginaActual && totalPaginas>limiteVistaPaginas*2" class="page-link">...</span>
        </li>
        <li class="page-item">
            <a v-if="paginaActual<totalPaginas" class="page-link" @click="cambiarPagina(paginaActual+1)">Siguiente</a>
            <span v-if="paginaActual==totalPaginas" class="page-link">Siguiente</span>
        </li>
        </ul>
    </nav>
</template>
<script>
export default {
    props:["paginaActual", "totalPaginas"],
    data(){
        return{
            limiteVistaPaginas:5
        }
    },
    methods:{
        cambiarPagina(pagina){
            this.$emit("pagina", pagina);
        }
    }
}
</script>