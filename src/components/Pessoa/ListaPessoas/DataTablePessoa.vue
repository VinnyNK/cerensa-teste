<template>
  <div>
    <v-card>
      <v-data-table
          :headers="headers"
          :items="pessoas"
          :server-items-length="totalPessoas"
          :loading="loading"
          :items-per-page="options.itemsPerPage"
          :options.sync="options"
          :footer-props="footerProps"
          :header-props="headerProps"
          no-data-text="Nenhum resultado encontrado"
          loading-text="Pesquisando..."
          class="elevation-2 data-table"
          @click:row="toPessoaInfo"
      >
        <template #item.actions="{ item }">
          <v-icon
              @click.stop="deleteAction(item)"
              color="error"
          >
            mdi-delete
          </v-icon>
        </template>
        <template #footer.page-text="props">
          Pessoas {{props.pageStart}} - {{props.pageStop}} de {{props.itemsLength}}
        </template>
      </v-data-table>
    </v-card>
    <DeletePessoa v-if="deletePessoa" :pessoa="deletePessoa" @fechaDialog="dialogClean" />
  </div>
</template>

<script>
import DeletePessoa from "./DeletePessoa";
export default {
  name: "DataTablePessoa",
  components: {DeletePessoa},
  props: {
    searchName: {
      type: String
    }
  },
  computed: {
    pessoas: {
      get () {
        return this.$store.getters["getPessoas"]
      }
    },
    totalPessoas: {
      get () {
        return this.$store.getters["getTotalPessoas"]
      }
    }
  },
  watch: {
    options: {
      handler () {
        if (this.totalPessoas > 0) {
          this.getData()
        }
      },
      deep: true
    },
    searchName () {
      this.getData()
    }
  },
  created() {
    this.getData()
  },
  data: () => ({
    headers: [
      { text: 'ID', value: 'id' },
      { text: 'Nome', align: 'start', value: 'name' },
      { text: 'Tipo', value: 'type' },
      { text: 'Documento Federal', value: 'federalDocument' },
      { text: 'Documento do Estado', value: 'stateDocument' },
      { text: 'Data Nascimento', value: 'birthDate' },
      { text: 'Cidade', value: 'city', sortable: false },
      { text: 'Estado', value: 'state', sortable: false },
      { text: '', value: 'actions', sortable: false }
    ],
    loading: true,
    headerProps: {
      'sort-by-text': 'Ordenar Por'
    },
    footerProps: {
      'items-per-page-options': [5, 10, 20, 30, 50],
      'items-per-page-text': 'Pessoas por Pagina'
    },
    options: {
      itemsPerPage: 10,
      page: 1,
      sortBy: ['id'],
      sortDesc: [true]
    },
    deletePessoa: null
  }),
  methods: {
    getData() {
      this.loading = true
      let search = null
      if (this.searchName) {
        search = { name: `%${this.searchName}%` }
      }
      this.$store.dispatch("fetchPessoas", {
        ...search,
        pageSize: this.options.itemsPerPage !== -1 ? this.options.itemsPerPage : this.totalPessoas,
        pageNumber: this.options.page !== -1 ? this.options.page : 0,
        sort: this.options.sortBy[0] ? `${this.options.sortBy[0]}:${this.options.sortDesc[0] ? 'asc' : 'desc'}` : ''
      })
          .then(() => {
            this.loading = false
          })
    },
    deleteAction(pessoa) {
      this.deletePessoa = pessoa
    },
    dialogClean() {
      this.deletePessoa = null
    },
    toPessoaInfo(pessoa) {
      this.$router.push({ name: 'PessoaInfo', params: { id: pessoa.id } })
    }
  }
}
</script>

<style scoped>
.data-table {
  cursor: pointer !important;
}
</style>
