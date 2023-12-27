<script setup>
import {ref} from "vue";
import DatabaseEntry from "@/components/DatabaseEntry.vue";
import axios from "axios";
import {useEntryStore} from "@/store/entryStore.js";

const store = useEntryStore()

const columns = ref(["Nachname", "Vorname", "Ehepartner", "Straße", "Hausnummer", "Postleitzahl", "Ort", "Kinder"])
updateEntries()

function updateEntries() {
  axios
      .get('http://127.0.0.1:2323/')
      .then(response => store.databaseEntries = response.data)
}

const colorNumber = ref(0)
</script>

<template>
  <v-container class="rounded bg-grey-lighten-1 ma-3" fluid="">
    <v-row no-gutters class="bg-grey-darken-3 rounded-t">
      <v-col cols="1"/>
      <v-col v-for="i in columns" :key="i" class="text-center text-lg-h6">{{ i }}</v-col>
    </v-row>
    <DatabaseEntry v-for="entryKey in Object.keys(store.databaseEntries)" :key="entryKey" :entry="store.databaseEntries[entryKey]"
                   :entryKey="entryKey" class="pt-2 pb-2"></DatabaseEntry>
  </v-container>
</template>

<style scoped>

</style>