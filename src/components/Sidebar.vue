<template>

    <aside id="left-panel" class="left-panel color">
        <nav class="navbar navbar-expand-sm navbar-default ">

            <SidebarHeader/>

            <div id="main-menu" class="main-menu collapse navbar-collapse">
                <ul class="nav navbar-nav">

                    <!-- <template v-for="(item, index) in listaOpciones"> -->
                    <template v-for="(item, index) in listaOpciones">
                        <template v-if="item.title">
                            <SidebarNavTitle :name="item.name" :classes="item.class" :wrapper="item.wrapper"/>
                        </template>
                        <template v-else-if="item.divider">
                            <li class="divider"></li>
                        </template>

                        <template v-else>
                            <template v-if="item.children">
                                <!-- First Level Dropdown -->
                                <SidebarNavDropdown :name="item.name" :url="item.url" :icon="item.icon">
                                    <template v-for="( childL1, index ) in item.children">
                                        <template v-if="childL1.children">
                                            <!-- Second Level Dropdown menu -->
                                            <SidebarNavDropdown :name="childL1.name" :url="childL1.url" :icon="childL1.icon">
                                                <li class="nav-item" v-for="(childL2, index) in childL1.children">
                                                    <SidebarNavLink :name="childL2.name" :url="childL2.url" :icon="childL2.icon" :badge="childL2.badge" :variant="item.variant"/>
                                                </li>
                                            </SidebarNavDropdown>
                                        </template>
                                        <template v-else>
                                            <SidebarNavItem :classes="item.class">
                                                <SidebarNavLink :name="childL1.name" :idOpcion="childL1.idOpcion+''" :url="childL1.url" :icon="childL1.icon" :badge="childL1.badge" :variant="item.variant"/>
                                            </SidebarNavItem>
                                        </template>
                                    </template>
                                </SidebarNavDropdown>
                            </template>
                            <template v-else>
                                <SidebarNavItem :classes="item.class" >
                                    <SidebarNavLink :name="item.name" :url="item.url" :icon="item.icon" :badge="item.badge" :variant="item.variant"/>
                                </SidebarNavItem>
                            </template>
                        </template>
                    </template>


                </ul>
            </div><!-- /.navbar-collapse -->
        </nav>
    </aside><!-- /#left-panel -->

</template>



<script>

import SidebarHeader from './sidebar/SidebarHeader.vue';
import SidebarNavDropdown from './sidebar/SidebarNavDropdown.vue';
import SidebarNavTitle from './sidebar/SidebarNavTitle.vue';
import SidebarNavLink from './sidebar/SidebarNavLink.vue';
import SidebarNavItem from './sidebar/SidebarNavItem.vue';
import SidebarFooter from './sidebar/SidebarFooter.vue';



export default {
    name: 'sidebar',
    data () {
        return {
             listaOpciones: [
        {
          name: "Administracion",
          url: "/",
          icon: "@/plugins/img/icons/ico-menu-administracion-sistema.png",
          children: [
            {
              name: "Proveedores",
              url: "/menu/miCuenta",
              icon: "@/plugins/img/icons/ico-menu-inbox.png",
            },
          ],
        },
        {
          name: "Comprobantes ",
          url: "/",
          icon: "@/plugins/img/icons/ico-menu-administracion-sistema.png",
          children: [
            {
              name: "Pendientes",
              url: "/facturas",
              icon: "@/plugins/img/icons/ico-menu-inbox.png",
            },
            {
              name: "Facturas Físicas",
              url: "/facturasFisicas",
              icon: "@/plugins/img/icons/ico-menu-inbox.png",
            }
          ],
        },
         {
          name: "Cerrar Sesión",
          url: "/",
          icon: "@/plugins/img/icons/ico-menu-administracion-sistema.png",
        },
      ],
            
        }
    },
    props: {
        navItems: {
            type: Array,
            required: true,
            default: () => []
        }
    },
    components: {
        SidebarHeader,
        SidebarNavDropdown,
        SidebarNavLink,
        SidebarNavTitle,
        SidebarNavItem,
        SidebarFooter
    },
    methods: {

        handleClick (e) {
          e.preventDefault()
          e.target.parentElement.classList.toggle('show')
      }
    }
}
</script>
<style scoped>
.color{
    background: #003462;
}
</style>
