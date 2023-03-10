<template>
  <q-card class="my-card q-ma-md">
    <q-card-section class="bg-teal text-white">
      <div class="text-h6 text-center">REGISTRO DE TRASLADO DE BIENES</div>
      <!-- <div class="text-subtitle2">Datos del Usuario e Ingreso</div> -->
    </q-card-section>
    <q-card-section>
      <q-page class="row items-center justify-evenly">
        <q-table ref="table" :rows="rows" class="ss" :title="key" :columns="columns" v-model:pagination="pagination"
          @request="load" row-key="id" :selected-rows-label="empty" selection="multiple" v-model:selected="selected"
          :rows-per-page-options="[20, 50, 100]" color="secondary" :loading="loading">

          <template v-slot:top>
            <div class="col">
              <div class="row justify-around">
                <div class="col-md-2 col-xs-12 col-sm-8 q-mb-sm">
                  <q-btn class="q-ml-sm full-width" color="primary" label="Crear" @click="create" icon="add" />
                </div>
                <div class="col-md-2 col-xs-12 col-sm-8 q-mb-sm">
                  <q-btn class="q-ml-sm full-width" color="primary" :disable="!selected.length" label="Editar"
                    @click="edit" icon="edit" />
                </div>
                <div class="col-md-2 col-xs-12 col-sm-8 q-mb-sm">
                  <q-btn class="q-ml-sm full-width" color="primary" :disable="!selected.length" label="Eliminar"
                    @click="removeRow" icon="delete" />
                </div>
                <div class="col-md-2 col-xs-12 col-sm-8 q-mb-sm">
                  <q-btn class="q-ml-sm full-width" color="primary" icon="refresh" label="Actualizar"
                    @click="load(pagination)" />
                </div>
              </div>
            </div>
          </template>

          <div class="q-mt-md">
            Selected: {{ JSON.stringify(selected) }}
          </div>

          <template v-slot:header-cell="props">
            <q-th @click="prev($event, props.col)" v-for="col in [props.col]" :key="col.name"
              :props="{ ...props, sortable: true }">
              {{ col.label || col.name || col.field }}
              <q-input @click="prev" v-model="filters[col.filter || col.name]"></q-input>
            </q-th>
          </template>

        </q-table>
        <!-- <q-pagination v-model="pagination.page" :max="Math.cell(pagination.total / pagination.perPage)" @input="loadTableData" /> -->
      </q-page>
      <q-resize-observer @resize="onResize" />
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import moment from 'moment';
export default defineComponent({
  name: 'IndexPage',
  setup() {

    const columns = [
      {
        name: 'register_code',
        label: 'CÓDIGO DE REGISTRO',
        field: (row) => row.register_code,
        format: (val) => `${val}`
      },
      {
        field: 'responsible_user_name',
        label: 'RESPONSABLE'
      },
      {
        field: 'unit_organic',
        label: 'DESTINO'
      },
      {
        field: 'unit_organic_destiny',
        label: 'UNIDAD ORGÁNICA DESTINO'
      },
      {
        field: 'local_destiny',
        label: 'LOCAL O SEDE DESTINO'
      },
      {
        label: 'FECHA',
        field: 'date',
        format: (val) => moment(val).format('DD-MM-YYYY')
      },
      {
        field: 'local',
        label: 'TIPO'
      }
    ];

    columns.forEach((c: any) => {
      c.sortable = true;

      c.name = c.name || c.field;
      c.label = c.label || c.name.replace('_', ' ').toUpperCase();
      c.align = 'center';
    });

    const rows = ref([]);

    const selected = ref([])

    const loading = ref(true);

    const filters: any = ref({});

    const pagination: any = ref({

      page: 0,
      rowsNumber: 0,
      total: 0,
      rowsPerPage: 20

    });

    const load = (e: any) => {
      let { page, rowsPerPage } = e.value || e.pagination || e;
      axios.get(`/movement/${page}/${rowsPerPage}`, { params: { type: 'S', ...filters.value } }).then(e => {
        rows.value = e.data.data;
        pagination.value = { ...pagination.value, rowsNumber: e.data.count, page: page, rowsPerPage: rowsPerPage };
      });
    }

    load(pagination);

    const table = ref(null);
    const key = ref(0);

    const router = useRouter();

    const onResize = (size) => {

      table.value.$el.style.width = size.width - 2 + 'px';
      console.log(table.value.$el.parentNode.offsetHeight);
      table.value.$el.style.height =
        parseInt(table.value.$el.parentNode.offsetHeight) - 0 + 'px';
      table.value.$el.parentNode.style.overflow = 'hidden';
    };
    return {
      load,
      key,
      prev(e, col) {
        if (col) key.value++;
        if (e.target.tagName == 'INPUT') e.stopPropagation();
      },
      pagination,
      selected,
      rows,
      table,
      columns,
      onResize,
      filters,
      create() {
        router.push('/admin/transfer/create');
      },
      edit() {
        router.push('/admin/transfer/' + selected.value[0].id);
      },
      removeRow() {
        console.log('remove');
      },
      empty() {
        return selected.value.length === 0 ? '' : `${selected.value.length} record${selected.value.length > 1 ? 's' : ''} selected of ${rows.value.length}`
      }
    };
  }
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
    background-color: #009688 !important
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
