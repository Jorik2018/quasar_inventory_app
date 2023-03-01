<template>
  <q-page class="row items-center justify-evenly">
    <q-table
      ref="table"
      :rows="rows"

      class="ss"
      :title="key"
      :columns="columns"
      v-model:pagination="myPagination"
      row-key="name"
      :selected-rows-label="empty"
      selection="multiple"
      v-model:selected="selected"
    >
      <template v-slot:top>
        <q-btn
        class="q-ml-sm"
          color="primary"
          label="Crear"
          @click="create"
          icon="add"
        />
        <q-btn
        class="q-ml-sm"
          color="primary"
          :disable="!selected.length"
          label="Editar"
          @click="edit"
          icon="edit"
        />
        <q-btn
          class="q-ml-sm"
          color="primary"
          :disable="!selected.length"
          label="Eliminar"
          @click="removeRow"
          icon="delete"
        />
        <q-btn class="q-ml-sm" color="primary" icon="refresh" @click="load"/>
      </template>
      <template v-slot:header-cell="props">
          <q-th @click="prev($event,props.col)" 
            v-for="col in [props.col]"
            :key="col.name"
            :props="{...props,sortable: true }"
          >
            {{ col.label||col.name||col.field }}
            <q-input @click="prev"  v-model="col.filter"></q-input>
          </q-th>
      </template>
    </q-table>
  </q-page>
  <q-resize-observer @resize="onResize" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import moment from 'moment'



interface HO{
  sortable:boolean;
  label:string;
  align:string;
  name:string;
}
export default defineComponent({
  name: 'IndexPage',
  setup() {
    const columns = [
      {
        name: 'register_code',
        field: (row) => row.register_code,
        format: (val) => `${val}`
      },
      { field: 'responsible_user_name' },
      { field: 'unit_organic' },
      { field: 'local' },
      { label:'Fecha',field: 'date' ,format: (val) => moment(val).format("YYYY-MM-DD")}
    ];
    columns.forEach((c:any)=>{
      c.sortable=true;
      c.name=c.name||c.field;
      c.label=c.label||c.name;
      c.align='center';
    });

    const rows = ref([]);
    const load=()=>{
      axios.get(`/movement/${0}/${20}`,{params:{type:'I'}}).then(e=>{
        rows.value=e.data.data;
      });
    }
    load();
    
    const table = ref(null);
    const key = ref(0);
    const router = useRouter();
    const onResize=(size)=>{
        table.value.$el.style.width = size.width - 2 + 'px';
        console.log(table.value.$el.parentNode.offsetHeight);
        table.value.$el.style.height =
          parseInt(table.value.$el.parentNode.offsetHeight) - 0 + 'px';
        table.value.$el.parentNode.style.overflow = 'hidden';
    };
    return {
      load,
      key,
      prev(e,col){
        if(col)key.value++;
        if(e.target.tagName=='INPUT')e.stopPropagation();
      },
      myPagination:{rowsPerPage:20},
      selected: ref([]),
      table,
      filter: null,
      create() {
        router.push('/admin/income/create');
      },
      edit() {
        router.push('/admin/income/'+selected[0].id);
      },
      removeRow() {
        console.log('remove');
      },
      empty() {
        return '';
      },
      columns,
      rows,
      onResize
    };
  },
});
</script>
<style lang="sass">
thead
  .q-checkbox__inner
    color:#FFF
.ss .q-field__control
  height: 30px
.ss
  /* specifying max-width so the example can
    highlight the sticky column on any browser window */
  width: 600px
  height: 400px
  thead
    
    position: sticky
    top: 0px
    z-index: 100

  thead tr th
    position: sticky
    /* higher than z-index for td below */
    z-index: 2
  thead tr    
    /* bg color is important for th; just specify one */
    background-color: #000
    color:#FFF
  thead input
    background-color: #FFF
    text-align: center
  td:first-child
    background-color: #f5f5dc

  th:first-child,
  td:first-child
    position: sticky
    left: 0
    z-index: 1
</style>