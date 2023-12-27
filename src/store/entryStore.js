import { defineStore } from 'pinia'

export const useEntryStore = defineStore('entries', {
    state: () => {
        return {
            databaseEntries: {}
        }
    },
})