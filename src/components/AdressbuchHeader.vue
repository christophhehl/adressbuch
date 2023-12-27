<script setup>
import {ref} from "vue";

import ContactView from "@/components/ContactView.vue";
import {useEntryStore} from "@/store/entryStore.js";
import axios from "axios";

const store = useEntryStore()

const search = ref("")

function updateContacts() {
  axios
      .get('http://127.0.0.1:2323/'+search.value)
      .then(response => store.databaseEntries = response.data)
}
</script>

<template>
  <v-container class="ma-3 pa-1" fluid="">
    <v-row no-gutters>
      <v-col class="pa-0 ma-0 text-h3 text-decoration-underline">
        Adressbuch
      </v-col>
      <v-spacer/>
      <v-text-field label="Suche" v-model="search" @input="updateContacts" variant="outlined" density="compact"
                    class="align-self-center mr-5" hide-details></v-text-field>
      <v-btn variant="text" class="bg-grey-darken-1 align-self-center">
        Neuer Kontakt
        <ContactView :card-title="'Neuen Kontakt anlegen'" :contact="['','','','','','','','']"
                     :close-text="'Hinzufügen'" :entry-key="'-1'"></ContactView>
      </v-btn>


    </v-row>
  </v-container>


</template>

<style scoped>

</style>