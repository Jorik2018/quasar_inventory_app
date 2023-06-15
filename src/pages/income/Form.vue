<template>
  <div class="col">
    <div class="q-pa-md row q-gutter-md">
      <div class="col">
        <q-form @submit="onCreateIncome" @reset="onReset">

          <q-card class="my-card">
            <q-card-section class="bg-teal text-white">
              <div class="text-h6 text-center text-bold">REGISTRO DE INGRESO - DATOS DEL USUARIO</div>
              <!-- <div class="text-subtitle2">Datos del Usuario e Ingreso</div> -->
            </q-card-section>

            <q-card-section>
              <div class="row">
                <div class="col-md-4 col-xs-12 col-sm-12 q-pa-xs">
                  <q-input filled v-model="o.responsible_user_document" label="Ingrese el Nro de Documento"
                    :rules="[val => val && val.length > 0 || 'Campo Obligatorio']" />
                </div>
                <div class="col-md-2 col-xs-12 col-sm-12 q-pa-xs">
                  <q-btn color="primary" label="Buscar" class="full-width" @click="onSearch" />
                </div>
              </div>
              <div class="row">
                <div class="col-md-12 col-xs-12 col-sm-12 q-pa-xs">
                  <q-input filled v-model="o.responsible_user_name" label="Nombres y Apellidos" lazy-rules
                    :rules="[val => val && val.length > 0 || 'Campo Obligatorio']" />
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 col-xs-12 col-sm-12 q-pa-xs">
                  <q-input filled v-model="o.responsible_user_email" label="Ingrese el Correo Electrónico"
                    :rules="[val => val && val.length > 0 || 'Campo Obligatorio']" />
                </div>
                <div class="col-md-6 col-xs-12 col-sm-12 q-pa-xs">
                  <q-input filled v-model="o.register_code" label="Codigo de Registro"
                    :rules="[val => val && val.length > 0 || 'Campo Obligatorio']" />
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 col-xs-12 col-sm-12 q-pa-xs">
                  <q-select filled v-model="o.unit_organic" :options="oficinas.map((e: any) => e.fullName)"
                    label="Selecciona una opción" emit-value map-options
                    :rules="[val => val && val.length > 0 || 'Campo Obligatorio']" />
                </div>
                <div class="col-md-6 col-xs-12 col-sm-12 q-pa-xs">
                  <q-select filled v-model="o.local" :options="options" label="Local o Sede"
                    :rules="[val => val && val.length > 0 || 'Campo Obligatorio']" />
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 col-xs-12 col-sm-12 q-pa-xs">
                  <q-input filled v-model="o.address" label="Dirección"
                    :rules="[val => val && val.length > 0 || 'Campo Obligatorio']" />
                </div>
                <div class="col-md-6 col-xs-12 col-sm-12 q-pa-xs">
                  <q-input stack-label v-model="o.date" type="date" label="Ingrese la Fecha"
                    :rules="[val => val && val.length > 0 || 'Campo Obligatorio']" />
                </div>
              </div>
            </q-card-section>

            <q-card-actions v-if="!o.id">
              <div class="col">
                <div class="row justify-around">
                  <div class="col-md-3 col-xs-12 col-sm-8 q-mb-sm">
                    <q-btn label="Grabar" class="q-ml-sm full-width" color="primary" type="submit" icon="add" />
                  </div>
                  <div class="col-md-3 col-xs-12 col-sm-8 q-mb-sm">
                    <q-btn label="Cancelar" class="q-ml-sm full-width" color="primary" type="reset" icon="refresh" />
                  </div>
                  <div class="col-md-3 col-xs-12 col-sm-8 q-mb-sm">
                    <q-btn label="Atras" class="q-ml-sm full-width" color="primary" @click="back" icon="arrow_back" />
                  </div>
                </div>
              </div>
            </q-card-actions>
          </q-card>
        </q-form>
      </div>
    </div>
  </div>

  <div class="col">
    <div class="q-pa-md row q-gutter-md">
      <q-table v-if="o.id" ref="table" :rows="rows" class="ss" bordered :title="key" :columns="columns" row-key="id"
        :selected-rows-label="empty" selection="multiple" v-model:selected="selected"
        :rows-per-page-options="[5, 20, 50, 100]">

        <template v-slot:top>
          <div class="col q-pt-sm">
            <div class="row justify-around">
              <div class="col-md-2 col-xs-12 col-sm-8 q-mb-sm">
                <q-btn class="q-ml-sm full-width" color="primary" label="Crear" icon="add" @click="inception = true" />
              </div>
              <!-- <div class="col-md-2 col-xs-12 col-sm-8 q-mb-sm">
                <q-btn class="q-ml-sm full-width" color="primary" :disable="!selected.length" label="Editar" @click="edit"
                  icon="edit" />
              </div>
              <div class="col-md-2 col-xs-12 col-sm-8 q-mb-sm">
                <q-btn class="q-ml-sm full-width" color="primary" :disable="!selected.length" label="Eliminar"
                  @click="removeRow" icon="delete" />
              </div> -->
              <div class="col-md-2 col-xs-12 col-sm-8 q-mb-sm">
                <q-btn class="q-ml-sm full-width" color="primary" label="Imprimir" icon="picture_as_pdf" @click="print" />
              </div>
              <div class="col-md-2 col-xs-12 col-sm-8 q-mb-sm">
                <q-btn class="q-ml-sm full-width" color="primary" icon="refresh" label="Actualizar" @click="load" />
              </div>
              <div class="col-md-2 col-xs-12 col-sm-8 q-mb-sm">
                <q-btn class="q-ml-sm full-width" color="primary" label="Atrás" @click="back" icon="arrow_back" />
              </div>
            </div>
          </div>
        </template>

        <!-- <template v-slot:header-cell="props">
          <q-th @click="prev($event, props.col)" v-for="col in [props.col]" :key="col.name"
            :props="{ ...props, sortable: true }">
            {{ col.label || col.name || col.field }}
            <q-input @click="prev" v-model="col.filter"></q-input>
          </q-th>
        </template> -->

      </q-table>
    </div>
  </div>

  <q-dialog v-model="inception">
    <q-card>
      <q-card-section>
        <div class="text-h6 text-center">REGISTRAR DETALLE</div>
      </q-card-section>
      <q-form @submit="onCreateDetails" @reset="onResetDetails">

        <q-card-section class="q-pt-none">

          <div class="row">
            <div class="col-md-12 col-xs-12 col-sm-12 q-pa-xs">
              <q-input filled v-model="d.patrimonial_code" label="Código Patrimonial"
                :rules="[val => val && val.length > 0 || 'Campo Obligatorio']" />
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 col-xs-12 col-sm-12 q-pa-xs">
              <q-input filled v-model="d.denomination" label="Denominación" lazy-rules
                :rules="[val => val && val.length > 0 || 'Campo Obligatorio']" />
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 col-xs-12 col-sm-12 q-pa-xs">
              <q-input filled v-model="d.lot" label="Nº de Lote"
                :rules="[val => val && val.length > 0 || 'Campo Obligatorio']" />
            </div>
            <div class="col-md-12 col-xs-12 col-sm-12 q-pa-xs">
              <q-input filled v-model="d.brand" label="Marca"
                :rules="[val => val && val.length > 0 || 'Campo Obligatorio']" />
            </div>
            <div class="col-md-12 col-xs-12 col-sm-12 q-pa-xs">
              <q-input filled v-model="d.model" label="Modelo"
                :rules="[val => val && val.length > 0 || 'Campo Obligatorio']" />
            </div>
            <div class="col-md-12 col-xs-12 col-sm-12 q-pa-xs">
              <q-input filled v-model="d.color" label="Color"
                :rules="[val => val && val.length > 0 || 'Campo Obligatorio']" />
            </div>
            <div class="col-md-12 col-xs-12 col-sm-12 q-pa-xs">
              <q-input filled v-model="d.dimensions" label="Dimensiones"
                :rules="[val => val && val.length > 0 || 'Campo Obligatorio']" />
            </div>
            <div class="col-md-12 col-xs-12 col-sm-12 q-pa-xs">
              <q-input filled v-model="d.serie" label="Serie"
                :rules="[val => val && val.length > 0 || 'Campo Obligatorio']" />
            </div>
            <div class="col-md-12 col-xs-12 col-sm-12 q-pa-xs">
              <q-select filled v-model="d.conservation_state" :options="state" label="Estado de Conservación"
                :rules="[val => val && val.length > 0 || 'Campo Obligatorio']" />
            </div>
            <div class="col-md-12 col-xs-12 col-sm-12 q-pa-xs">
              <q-input filled v-model="d.others" label="Ubicación Fisica"
                :rules="[val => val && val.length > 0 || 'Campo Obligatorio']" />
            </div>
            <div class="col-md-12 col-xs-12 col-sm-12 q-pa-xs">
              <q-input filled v-model="d.observations" label="Observaciones"
                :rules="[val => val && val.length > 0 || 'Campo Obligatorio']" />
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <div class="col">
            <div class="row justify-around">
              <div class="col-md-4 col-xs-12 col-sm-8 q-mb-sm">
                <q-btn class="q-ml-sm full-width" color="primary" label="Guardar" type="submit" icon="add" />
              </div>
              <div class="col-md-4 col-xs-12 col-sm-8 q-mb-sm">
                <q-btn class="q-ml-sm full-width" color="primary" label="Cancelar" type="reset" icon="refresh" />
              </div>
            </div>
          </div>
        </q-card-actions>
      </q-form>

    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useQuasar, date } from 'quasar';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default defineComponent({
  name: 'RiskForm',
  mounted() {
    // alert('123');
  },
  props: ['pid'],
  setup(props) {
    const $q = useQuasar();

    const pad = (num, places) => String(num).padStart(places, '0')

    const o = ref({
      type: 'I',
      reason: '',
      auth_document: '',
      responsible_user_email: '',
      responsible_user_name: '',
      responsible_user_document: ''
    });

    const d = ref({});

    const columns = [
      {
        name: 'CÓDIGO PATRIMONIAL',
        field: (row) => row.inventory.patrimonial_code,
        format: (val) => `${val}`
      },
      {
        name: 'DENOMINACIÓN',
        field: (row) => row.inventory.denomination,
        format: (val) => `${val}`
      },
      {
        name: 'MARCA',
        field: (row) => row.inventory.brand,
        format: (val) => `${val}`
      },
      {
        name: 'MODELO',
        field: (row) => row.inventory.model,
        format: (val) => `${val}`
      },
      {
        name: 'COLOR',
        field: (row) => row.inventory.color,
        format: (val) => `${val}`
      },
      {
        name: 'SERIE',
        field: (row) => row.inventory.serie,
        format: (val) => `${val}`
      },
      {
        name: 'ESTADO',
        field: (row) => row.inventory.conservation_state,
        format: (val) => `${val}`
      },
      {
        name: 'OBSERVACIONES',
        field: (row) => row.inventory.observations,
        format: (val) => `${val}`
      },
      {
        name: 'UBICACIÓN FÍSICA',
        field: (row) => row.inventory.others,
        format: (val) => `${val}`
      }
    ];

    columns.forEach((c: any) => {
      c.sortable = true;
      c.name = c.name || c.field;
      c.label = c.label || c.name;
      c.align = 'center';
    });

    const table = ref(null);
    const key = ref(0);
    const router = useRouter();
    const onResize = (size) => {
      table.value.$el.style.width = size.width - 2 + 'px';
      table.value.$el.style.height =
        parseInt(table.value.$el.parentNode.offsetHeight) - 0 + 'px';
      table.value.$el.parentNode.style.overflow = 'hidden';
    };

    const rows = ref([]);

    const oficinas = ref([]);

    const load = () => {

      axios.get('https://web.regionancash.gob.pe/admin/directory/api/dependency/0/0').then(response => {
        oficinas.value = response.data.data;
      }).catch(error => {
        console.log(error)
      })

      if (props.pid) {
        axios.get('/movement/' + props.pid).then(response => {
          o.value.responsible_user_name = response.data.responsible_user_name;
          o.value.responsible_user_email = response.data.responsible_user_email;
          o.value.responsible_user_document = response.data.responsible_user_document;
          o.value.local = response.data.local;
          o.value.unit_organic = response.data.unit_organic;
          o.value.register_code = response.data.register_code;
          o.value.address = response.data.address;
          const date = response.data.date;
          const var1 = new Date(date);
          const year = var1.getFullYear();
          const month = pad(var1.getMonth(), 2);
          const day = pad(var1.getDate(), 2);
          const fecha = year + '-' + month + '-' + day;
          o.value.date = fecha;
          o.value.id = response.data.id;

          rows.value = response.data.details;
        }).catch(error => {
          console.log(error)
        })
      }

    };

    load();

    const selected = ref([])

    const inception = ref(false)

    return {
      inception,
      columns,
      rows,
      onResize,
      selected,
      load,
      oficinas,
      options: [
        'Central', 'COER', 'Conchucos Alto', 'Conchucos Bajo', 'Aldea - San Marcos', 'Aldea Señor de la Soledad - Huaraz', 'Dirección Subregional de Producción - Huaraz', 'Dirección Regional de Producción - Chimbote'
      ],
      state: [
        'Malo', 'Regular', 'Bueno', 'RAEE'
      ],
      d,
      o,
      editor: ref('After you define a new button,222'),
      add() { console.log(''); },
      pdf() { console.log(''); },

      onCreateIncome() {
        let a: any = o.value;
        a.destiny_user_email = a.responsible_user_email;
        a.destiny_user_name = a.responsible_user_name;
        a.destiny_user_document = a.responsible_user_document;
        a.v1 = a.date;
        const formattedString = date.formatDate(a.v1, 'YYYY-MM-DDTHH:mm:ss.SSSZ')
        a.date = formattedString;
        o.value = a;

        axios.post('/movement', o.value).then((e: any) => {
          if (e.data.id) {
            o.value.id = e.data.id;
            axios.get('/movement/' + o.value.id).then(response => {
              rows.value = response.data.details;
              this.onResetDetails();
              $q.notify({
                message: 'Se registro correctamente.',
                color: 'teal',
                textColor: 'white',
                icon: 'cloud_done',
                position: 'top-right'
              });
            }).catch(error => {
              console.log(error)
            })
          }
        });
      },

      onSearch() {
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', '*/*');

        var h = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };

        fetch('https://web.regionancash.gob.pe/api/reniec/Consultar?nuDniConsulta=' + o.value.responsible_user_document + '&out=json', h)
          .then(response => response.json())
          .then(response => {
            if (response.consultarResponse.return.coResultado == '0000') {
              const val = response.consultarResponse.return.datosPersona;
              o.value.responsible_user_name = val.apPrimer + ' ' + val.apSegundo + ' ' + val.prenombres;
            } else {
              o.value.responsible_user_name = '';
              $q.notify({
                message: 'Los datos no se encuentran en la Base de Datos.',
                color: 'negative',
                textColor: 'white',
                icon: 'cloud_done',
                position: 'top-right'
              });
            }
          })
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
      },

      onReset() {
        o.value.responsible_user_document = '';
        o.value.responsible_user_name = '';
        o.value.responsible_user_email = '';
        o.value.register_code = '';
        o.value.unit_organic = '';
        o.value.local = '';
        o.value.address = '';
        o.value.date = '';
      },

      getSelectedString() {
        // return selected.value.length === 0 ? '' : `${selected.value.length} record${selected.value.length > 1 ? 's' : ''} selected of ${rows.value.length}`
      },

      onCreateDetails() {
        axios.post('/details/in', { data: d.value, id: o.value.id }).then((e: any) => {
          if (e.data.id) {
            axios.get('/movement/' + o.value.id).then(response => {
              rows.value = response.data.details;
              d.value.patrimonial_code = '';
              d.value.denomination = '';
              d.value.lot = '';
              d.value.brand = '';
              d.value.model = '';
              d.value.color = '';
              d.value.dimensions = '';
              d.value.serie = '';
              d.value.conservation_state = '';
              d.value.others = '';
              d.value.observations = '';
              inception.value = false
              $q.notify({
                message: 'Se registro correctamente los detalles.',
                color: 'teal',
                textColor: 'white',
                icon: 'cloud_done',
                position: 'top-right'
              });
            }).catch(error => {
              console.log(error)
            })
          }
        });
      },

      onResetDetails() {
        d.value.patrimonial_code = '';
        d.value.denomination = '';
        d.value.lot = '';
        d.value.brand = '';
        d.value.model = '';
        d.value.color = '';
        d.value.dimensions = '';
        d.value.serie = '';
        d.value.conservation_state = '';
        d.value.others = '';
        d.value.observations = '';
      },

      create() {
        router.push('/admin/income/create');
      },
      edit() {
        router.push('/admin/income/');
      },
      removeRow() {
        console.log('remove');
      },
      empty() {
        return selected.value.length === 0 ? '' : `${selected.value.length} record${selected.value.length > 1 ? 's' : ''} selected of ${rows.value.length}`
      },
      cancelar() {
        d.value = [];
        inception.value = false
      },
      back() {
        router.push('/admin/income/');
      },
      print() {
        let reportUrl = `${process.env.VUE_APP_BASE_URL}/api/inventory/report?type=in&id=${props.pid}`;
        // let reportUrl = '/report?type=in&id=' + props.pid
        window.open(reportUrl, '_blank')
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
  width: 100%
  height: 100%
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
