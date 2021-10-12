<template>
    <transition name="modal">
        <button @click="MostrarModal()"> Mostrar Modal </button>
    <div class="modal-mask">
        <div class="modal-wrapper">
            <div class="modal-container">
                <h2 class="text-center">Texo Modal</h2>
            </div>
        </div>
    </div>
    </transition>
</template>
<script>
export default {
    name:'modal-resource',
    data(){
        textoModal:''
    },
    methods:{
        MostrarModal(){

        }
    }
}
</script>
<style scoped>
.modal-mask{
    position: fixed;
    z-index: 9998;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
}
.modal-wrapper{
    display: table-cell;
    vertical-align: middle;
}
.modal-container{
    width: 300px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Arial, Helvetica, sans-serif;
}
.modal-enter .modal-container,
.modal-leave-active .modal-container{
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}
</style>