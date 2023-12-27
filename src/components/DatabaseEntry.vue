<script setup>
import ContactView from "@/components/ContactView.vue";
const props = defineProps({
  entry: Array,
  entryKey: String,
})

function test() {
  console.log("warum??")
}
</script>

<template>
  <v-row no-gutters class="bg-grey">
    <v-col cols="1" class="text-center">
      <v-btn variant="text" class="bg-grey-darken-1 align-self-center">
        <v-icon icon="mdi-pencil"></v-icon>
        <ContactView :card-title="'Kontaktdaten ändern'" :contact="entry"
                     :close-text="'Ändern'" :entry-key="entryKey" ></ContactView>
      </v-btn>
    </v-col>
    <v-col v-for="i in entry" :key="i" class="text-center">{{ i }}</v-col>
  </v-row>
</template>

<style scoped>

</style>