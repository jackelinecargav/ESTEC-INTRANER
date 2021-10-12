<template>

    <div class="navbar-header" @click="handleSidebarToggle">
        <button
            @click="mainmenuToggle"
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#main-menu"
            aria-controls="main-menu"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <i class="fa fa-bars"></i>
        </button>
        <router-link to="/components/principal/bienvenido" class="navbar-brand" exact>
            <img src="../../images/nuevo.png" alt="Logo">
        </router-link>         

        <router-link to="/components/principal/bienvenido" class="navbar-brand hidden">
            <img src="../../images/logo2.png" alt="Logo">            
        </router-link>

        <sidebar-collapse></sidebar-collapse>

    </div>


</template>
<style>
   .m-2{
        font-size:9px
    }

    /* .btn {
        font-size:9px
    } */
    a:hover, a:focus {
     /* background-color: yellow; */
     color:bisque;
    }
    a{
        color:blanchedalmond;
    }
    /* .dropdown-menu { 
        background-color: rgb(37, 37, 37); 
        color: bisque
        
    } */

 </style>
<script>

export default {
	name: 'sidebar-header',
    data(){
        return{
            clickable: true,
            usuario:localStorage.getItem('nombreCompletoLogueado')
        }
    },
	methods: {
        handleSidebarToggle(e){
            // if( this.clickable ){
            //     this.clickable = false;
            //     document.body.classList.toggle('open');
            //     this.clickable = true;
            // }

            e.target.parentElement.classList.toggle('collapsed')
        },

        mainmenuToggle(){
            if( this.clickable ){
                this.clickable = false;
                document.body.classList.toggle('mobile-menu');
                //e.target.childElement.classList.toggle('collapsed')
                this.clickable = true;
            }
        },

        editaPerfil(){
            this.$router.push('/components/usuario/edicionperfil');
            // let routeData = this.$router.resolve({name:'edicionperfil'});
            // window.open(routeData.href,'_blank');
        },

        cierraSesion(){
            this.$router.push('/auth/login/');
        }


	  }
}
</script>

<style lang="scss" scoped>
    .navbar {
        .navbar-brand{
            justify-content: flex-start;
            padding-left:10%;
        }
    }

</style>