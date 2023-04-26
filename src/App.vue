<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';

axios.defaults.baseURL = `${process.env.VUE_APP_BASE_URL}/api/inventory`;

const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common = {
    Authorization: `Bearer ${token}`
  };
}

export default defineComponent({
  name: 'App'
});
</script>
