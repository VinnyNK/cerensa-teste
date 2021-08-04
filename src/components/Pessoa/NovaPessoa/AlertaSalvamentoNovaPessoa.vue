<template>
  <v-dialog
      transition="dialog-top-transition"
      v-model="dialog"
      max-width="500"
  >
    <v-card>
      <v-card-title>
        Alerta
      </v-card-title>
      <v-card-text>
        Função não disponível
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
            color="success"
            outlined
            rounded
            @click="closeDialog"
        >
          OK
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "AlertaSalvamentoNovaPessoa",
  data: () => ({
    dialog: true
  }),
  methods: {
    closeDialog() {
      this.$emit('fechaDialog')
    }
  }
}
</script>

<style scoped>

</style>
