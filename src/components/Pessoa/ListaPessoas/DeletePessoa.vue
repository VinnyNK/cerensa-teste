<template>
  <div>
    <v-dialog
        transition="dialog-top-transition"
        v-model="dialog"
        max-width="500"
    >
      <v-card>
        <v-card-title>
          Remover Pessoa
        </v-card-title>
        <v-card-text>
          Certeza que deseja remove a pessoa '{{ pessoa.name }}' ?
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
              color="error"
              outlined
              rounded
              @click="remove = !remove"
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
    <AlertaExclusaoPessoa v-if="remove" @fechaDialog="remove = !remove"/>
  </div>
</template>

<script>
import AlertaExclusaoPessoa from "./AlertaExclusaoPessoa";
export default {
  name: "DeletePessoa",
  components: {AlertaExclusaoPessoa},
  props: {
    pessoa: {
      required: true
    }
  },
  data: () => ({
    dialog: true,
    remove: false
  }),
  watch: {
    dialog() {
      this.closeDialog()
    }
  },
  methods: {
    closeDialog() {
      this.$emit('fechaDialog')
    }
  }
}
</script>

<style scoped>

</style>
