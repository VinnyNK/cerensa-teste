<template>
  <v-dialog
      transition="dialog-top-transition"
      v-model="dialog"
      max-width="500"
  >
    <v-card>
      <v-card-title>
        Remover Contato
      </v-card-title>
      <v-card-text>
        Certeza que deseja remover o contato '{{ contato.value }}' ?
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
            color="error"
            outlined
            rounded
            @click="deleteContato"
        >
          Remover
        </v-btn>
        <v-btn
            color="primary"
            rounded
            @click="closeDialog"
        >
          Cancelar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "DeleteContato",
  props: {
    contato: {
      required: true
    }
  },
  data: () => ({
    dialog: true
  }),
  watch: {
    dialog() {
      this.closeDialog()
    }
  },
  methods: {
    closeDialog() {
      this.$emit('fechaDialog')
    },

    deleteContato() {
      this.$store.dispatch('removeContato', this.contato)
      this.closeDialog()
    }
  }
}
</script>

<style scoped>

</style>
