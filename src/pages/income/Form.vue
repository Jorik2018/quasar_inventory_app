<template>
  <q-page class="row items-center justify-evenly">
   
    
             
      <q-input filled v-model="d.patrimonial_code" label="patrimonial_code"/>
      <q-input filled v-model="d.denomination" label="Denomination"/>
      <q-input filled v-model="d.lot" label="Lote"/>
      <q-input filled v-model="d.brand" label="Brand"/>
      <q-input filled v-model="d.model" label="Model"/>
      <q-input filled v-model="d.color" label="Color"/>
      <q-input filled v-model="d.dimensions" label="Dimensions"/>
      <q-input filled v-model="d.serie" label="Serie"/>
      {{ o }}
      <q-editor
      v-model="editor"
      :definitions="{
        save: {
          tip: 'Save your work',
          icon: 'save',
          label: 'Save',
          handler: saveWork,
        },
        upload: {
          tip: 'Upload to cloud',
          icon: 'cloud_upload',
          label: 'Upload',
          handler: uploadIt,
        },
      }"
      :toolbar="[
        ['bold', 'italic', 'strike', 'underline'],
        ['upload', 'save'],
      ]"
    />
    <q-table
      ref="table"
      :rows="o.details"
      class="ss"
      :columns="columns"
      row-key="name"
      selection="multiple"
    >
      <template v-slot:top>
        <q-btn
        class="q-ml-sm"
          color="primary"
          label="Crear"
          icon="add"
        />
        <q-btn
        class="q-ml-sm"
          color="primary"
          label="Editar"
          icon="edit"
        />
        <q-btn
          class="q-ml-sm"
          color="primary"
          label="Eliminar"
          icon="delete"
        />
      </template>
      <template v-slot:header-cell="props">
          <q-th @click="prev($event,props.col)" 
            v-for="col in [props.col]"
            :key="col.name"
            :props="{...props,sortable: true }"
          >
            {{ col.label||col.name||col.field }}
          </q-th>
      </template>
    </q-table>
      <q-footer reveal elevated>
        <q-toolbar style="text-align: center;
    display: inline-block;
    padding: 10px;">
          <q-btn label="Grabar" class="q-ml-sm" color="primary" @click="save"/>
          <q-btn label="Agregar" class="q-ml-sm" color="primary" @click="add"/>
          <q-btn label="PDF" class="q-ml-sm" color="primary" @click="pdf"/>  
        </q-toolbar>
      </q-footer>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useQuasar } from 'quasar';
import axios from 'src/boot/axios';

export default defineComponent({
  name: 'RiskForm',
  setup() {
    const $q = useQuasar();

    const columns = [
      {
        name: 'patrimonial_code',
        field: (row) => row.patrimonial_code,
        format: (val) => `${val}`
      },
      { field: 'denomination' },
      { field: 'brand' },
      { field: 'model' }
    ];
    columns.forEach((c:any)=>{
      c.sortable=true;
      c.name=c.name||c.field;
      c.label=c.label||c.name;
      c.align='center';
    });

    const o=ref({details:[]});
    const d=ref({});

    return {
      columns,
      d,
      o,
      editor: ref('After you define a new button,222'),
      add(){console.log('');},
      pdf(){console.log('');},
      save() {
        axios.post('',o).then((e:any)=>{
          console.log(e.data);
        });
        $q.notify({
          message: 'Saved your text to local storage',
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
        });
      },
      uploadIt() {
        $q.notify({
          message: 'Server unavailable. Check connectivity.',
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
        });
      },
    };
  },
});
</script>