<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" style="width: 80px">
      </v-col>
      <v-col cols="12" lg="10">
        <FormNovaPessoa :pessoa="pessoa" @adicionaContato="dialogAdicionaContato = !dialogAdicionaContato" @save="save = !save" />
        <DialogAdicionaContatoNovaPessoa v-if="dialogAdicionaContato" @saveContato="addContato" @fechaDialog="dialogAdicionaContato = !dialogAdicionaContato"/>
        <AlertaSalvamentoNovaPessoa v-if="save" @fechaDialog="save = !save"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import FormNovaPessoa from "../components/Pessoa/NovaPessoa/FormNovaPessoa";
import DialogAdicionaContatoNovaPessoa from "../components/Pessoa/NovaPessoa/DialogAdicionaContatoNovaPessoa";
import AlertaSalvamentoNovaPessoa from "../components/Pessoa/NovaPessoa/AlertaSalvamentoNovaPessoa";
export default {
  name: "NovaPessoaView",
  components: {AlertaSalvamentoNovaPessoa, DialogAdicionaContatoNovaPessoa, FormNovaPessoa},
  data: () => ({
    pessoa: {
      name: null,
      type: null,
      federalDocument: null,
      stateDocument: null,
      birthDate: null,
      address: {
        zipCode: null,
        street: null,
        number: null,
        complement: null,
        district: null,
        city: null,
        state: null
      },
      anualBilling: null,
      contacts: [
      ]
    },
    dialogAdicionaContato: false,
    save: false
  }),
  methods: {
    addContato(contato) {
      this.pessoa.contacts.push(contato)
      this.dialogAdicionaContato = false
    }
  }
}
</script>

<style scoped>

</style>
