<template>
  <v-container v-if="!loading">
    <v-row justify="center">
      <v-col cols="12" style="width: 80px">
      </v-col>
      <v-col cols="12" lg="10">
        <FormPessoaInfo @adicionaContato="dialogAdicionaContato = true" @deleteContato="iniciaDeleteContato" @saved="save = !save" />
        <DialogAdicionaContato v-if="dialogAdicionaContato" @fechaDialog="fechaDialogs" />
        <DeleteContato v-if="dialogDeleteContato" :contato="contato" @fechaDialog="fechaDialogs" />
        <AlertaDeSalvamento v-if="save" @fechaDialog="fechaDialogs" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import FormPessoaInfo from "../components/Pessoa/PessoaInfo/FormPessoaInfo";
import DialogAdicionaContato from "../components/Pessoa/PessoaInfo/DialogAdicionaContato";
import DeleteContato from "../components/Pessoa/PessoaInfo/DeleteContato";
import AlertaDeSalvamento from "../components/Pessoa/PessoaInfo/AlertaDeSalvamento";

export default {
  name: "PessoaInfoView",
  components: {AlertaDeSalvamento, DeleteContato, DialogAdicionaContato, FormPessoaInfo},
  created() {
    this.$store.dispatch("fetchPessoaInfo", this.$route.params.id)
        .then(() => this.loading = false)
        .catch(() => this.$router.back())
  },
  data: () => ({
    dialogAdicionaContato: false,
    dialogDeleteContato: false,
    contato: {},
    save: false,
    loading: true
  }),
  methods: {
    fechaDialogs() {
      this.dialogAdicionaContato = false
      this.dialogDeleteContato = false
      this.save = false
    },
    iniciaDeleteContato(contato) {
      this.contato = contato
      this.dialogDeleteContato = true
    }
  }
}
</script>

<style scoped>

</style>
