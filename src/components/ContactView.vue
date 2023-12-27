<script setup>
import {ref, watch} from "vue";
import axios from "axios";
import {useEntryStore} from "@/store/entryStore.js";

const props = defineProps(
    {
      "entryKey": String,
      "cardTitle": String,
      "contact": Array,
      "closeText": String
    })

const errorDialog = ref(false)

const store = useEntryStore()

const isActive = ref(false)
const nachname = ref(props.contact[0])
const vorname = ref(props.contact[1])
const ehepartner = ref(props.contact[2])
const street = ref(props.contact[3])
const hausnummer = ref(props.contact[4])
const postleitzahl = ref(props.contact[5])
const ort = ref(props.contact[6])
const kinder = ref(props.contact[7])

function resetContact() {
  nachname.value = props.contact[0]
  vorname.value = props.contact[1]
  ehepartner.value = props.contact[2]
  street.value = props.contact[3]
  hausnummer.value = props.contact[4]
  postleitzahl.value = props.contact[5]
  ort.value = props.contact[6]
  kinder.value = props.contact[7]
}

watch(isActive, async (_, newState) => {
  if (newState === false) {
    resetContact()
  }
})

function updateContacts() {
  axios
      .get('http://127.0.0.1:2323/')
      .then(response => store.databaseEntries = response.data)
}

function sendContact() {
  axios.post("http://127.0.0.1:2323/post", [props.entryKey, nachname.value, vorname.value, ehepartner.value,
    street.value, hausnummer.value, postleitzahl.value, ort.value, kinder.value]).then(response => updateContacts())
  isActive.value = false
  resetContact()
}

function abort() {
  isActive.value = false
  resetContact()
}

function deleteEntry() {
  errorDialog.value = false
  isActive.value = false
  axios.post("http://127.0.0.1:2323/delete", props.entryKey).then(response => updateContacts())
}

</script>

<template>
  <v-dialog v-model="isActive" activator="parent" width="70%">
    <v-card :title="cardTitle">
      <v-card-text>
        <v-container>
          <v-row>
            <v-col>
              <v-text-field v-model="vorname" label="Vorname" variant="outlined"></v-text-field>
            </v-col>
            <v-col>
              <v-text-field v-model="nachname" label="Nachname" variant="outlined"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field v-model="street" label="Straße" variant="outlined"></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field v-model="hausnummer" label="Hausnummer" variant="outlined"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="3">
              <v-text-field v-model="postleitzahl" label="Postleitzahl" variant="outlined"></v-text-field>
            </v-col>
            <v-col>
              <v-text-field v-model="ort" label="Ort" variant="outlined"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="3">
              <v-text-field v-model="ehepartner" label="Ehepartner" variant="outlined"></v-text-field>
            </v-col>
            <v-col>
              <v-text-field v-model="kinder" label="Kinder" variant="outlined"></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-btn
            :text="'Abbrechen'"
            @click="abort"
        ></v-btn>
        <v-spacer></v-spacer>
        <v-btn v-show="entryKey!=='-1'" variant="outlined" class="bg-red mr-5">Löschen
          <v-dialog v-model="errorDialog" activator="parent" width="30%">
            <v-card title="Kontakt löschen?">
              <v-card-actions>
                <v-btn
                    text="Abbrechen"
                    @click="errorDialog = false"
                    class="ml-5"
                ></v-btn>
                <v-spacer/>
                <v-btn
                    text="Löschen"
                    @click="deleteEntry"
                    class="bg-red mr-5"
                ></v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-btn>
        <v-btn
            :text="closeText"
            @click="sendContact"
        ></v-btn>
      </v-card-actions>
    </v-card>

  </v-dialog>
</template>

<style scoped>

</style>