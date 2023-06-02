<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title> Gobierno Regional de Áncash - Sistema de Inventario </q-toolbar-title>

        <div>v1.0</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above :width="250" :breakpoint="400">
      <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
        <q-list>
          <q-item-label header class="text-bold"> SISTEMA DE INVENTARIO </q-item-label>
          <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />
        </q-list>
      </q-scroll-area>

      <q-img class="absolute-top" src="../statics/inventory-img.jpg" style="height: 150px; opacity: 0.5;">
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
          </q-avatar>
          <div class="text-weight-bold">Control Patrimonial</div>
          <div>@regionancash.gob.pe</div>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container>
      <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" appear :duration="300">
        <router-view />
      </transition>
    </q-page-container>
    <q-resize-observer @resize="onResize" />
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import EssentialLink from 'components/EssentialLink.vue';

const linksList = [
  {
    title: 'Asignación de Bienes',
    icon: 'record_voice_over',
    link: '/admin/income',
  },
  {
    title: 'Desplazamiento Interno',
    icon: 'rss_feed',
    link: '/admin/transfer',
  },
  {
    title: 'Inventario',
    icon: 'public',
    link: '/admin/inventory',
  },
  {
    title: 'Cerrar Sesión',
    // caption: 'Community Quasar projects',
    icon: 'logout',
    link: 'https://awesome.quasar.dev',
  },
];

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      onResize() {
        //console.log(size);
      },
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
