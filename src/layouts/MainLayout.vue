<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Quasar App </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Essential Links </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <transition
  enter-active-class="animated fadeIn"
  leave-active-class="animated fadeOut"
  appear
  :duration="300"
>
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
    title: 'Ingresos',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: '/admin/income',
  },
  {
    title: 'Traslado',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: '/admin/transfer',
  },
  {
    title: 'Inventario',
    caption: '@QuasarFramework',
    icon: 'public',
    link: '/admin/inventory',
  },
  {
    title: 'Cerrar Sesión',
    caption: 'Community Quasar projects',
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
