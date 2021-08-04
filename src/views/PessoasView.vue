<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" style="width: 80px">
      </v-col>
      <v-col cols="12" lg="10">
        <ActionsDataTablePessoa @search="whenSearch" />
      </v-col>
      <v-col cols="12" lg="11">
        <DataTablePessoa :searchName="search" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DataTablePessoa from "../components/Pessoa/ListaPessoas/DataTablePessoa";
import ActionsDataTablePessoa from "../components/Pessoa/ListaPessoas/ActionsDataTablePessoa";

export default {
  name: "PessoasView",
  components: {ActionsDataTablePessoa, DataTablePessoa},
  data: () => ({
    search: ''
  }),
  methods: {
    whenSearch(input) {
      this.search = input
    }
  }
}
</script>

<style scoped>

</style>
