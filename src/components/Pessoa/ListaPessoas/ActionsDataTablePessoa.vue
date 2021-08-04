<template>
  <div class="d-flex align-center justify-space-around">
    <v-btn
        rounded
        color="primary"
        x-large
        to="/pessoa/nova"
    >
      Adicionar Pessoa
    </v-btn>
    <v-spacer />
    <v-text-field
        hide-details
        label="Pesquisar Pessoa"
        solo-inverted
        rounded
        clearable
        v-model="search"
    />
  </div>

</template>

<script>
export default {
  name: "ActionsDataTablePessoa",
  data: () => ({
    search: '',
    awaitSearch: false
  }),
  watch: {
    search () {
      if(!this.awaitSearch) {
        setTimeout(() => {
          this.$emit('search', this.search)
          this.awaitSearch = false
        }, 1000)
      }
      this.awaitSearch = true
    }
  }
}
</script>

<style scoped>
</style>
