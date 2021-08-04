<template>
  <v-dialog
      v-model="dialog"
      max-width="500"
      transition="dialog-top-transition"
  >
    <v-card>
      <v-card-title class="text-h5">
        Novo Contato
      </v-card-title>
      <v-card-text>
        <v-form v-model="valid">
          <v-container fluid>
            <v-row justify="space-between">
              <v-col cols="3">
                <v-checkbox label="Ativo" v-model="contato.active" />
              </v-col>
              <v-col cols="6">
                <v-select
                    :items="tiposContato"
                    item-text="text"
                    item-value="name"
                    label="Tipo"
                    v-model="contato.type"
                    :rules="[rules.required]"
                    required
                />
              </v-col>
              <v-col cols="12" >
                <template v-if="contato.type === 'EMAIL'">
                  <v-text-field
                      label="E-mail"
                      v-model="contato.value"
                      :rules="[
                      rules.required,
                      (v) => { return rules.maxLength(v, 50) },
                      rules.email
                      ]"
                  />
                </template>
                <template v-else>
                  <v-text-field
                      label="Telefone"
                      v-model="contato.value"
                      v-mask="['(##) #####-####']"
                      :rules="[
                      rules.required,
                      (v) => { return rules.maxLength(v, 50) }]"
                  />
                </template>

              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
            color="success"
            rounded
            :disabled="!valid"
            @click="$emit('saveContato', contato)"
        >
          Adicionar
        </v-btn>
        <v-btn
            color="error"
            text
            rounded
            @click="$emit('fechaDialog')"
        >
          Cancelar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mask } from 'vue-the-mask'

export default {
  name: "DialogAdicionaContatoNovaPessoa",
  data: () => ({
    dialog: true,
    valid: false,
    contato: {
      active: true,
      type: 'EMAIL'
    },
    tiposContato: [
      {
        name: 'EMAIL',
        text: 'E-mail'
      },
      {
        name: 'PHONE',
        text: 'Telefone'
      }
    ],
    rules: {
      required: v => !!v || 'Campo é requerido',
      maxLength: (v, max) => (v && v.length <= max) || `Campo não pode ser maior que ${max} caracteres`,
      email: v => /.+@.+\..+/.test(v) || 'Campo deve ser um e-mail válido'
    }
  }),
  directives: {mask}
}
</script>

<style scoped>

</style>
