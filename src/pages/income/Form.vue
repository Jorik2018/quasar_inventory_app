<template>
  <q-page class="row items-center justify-evenly">
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
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useQuasar } from 'quasar';

export default defineComponent({
  name: 'RiskForm',
  setup() {
    const $q = useQuasar();
    return {
      editor: ref(
        'After you define a new button,' +
          ' you have to make sure to put it in the toolbar too!'
      ),

      saveWork() {
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
