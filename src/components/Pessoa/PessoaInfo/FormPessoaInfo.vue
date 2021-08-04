<template>
  <v-card>
    <v-card-title>
      <p class="text-h4">
        {{ edicaoHabilitada ? `Editar ${pessoaNome}` : `Informações de ${pessoaNome}` }}
      </p>
      <v-spacer />
      <template v-if="!edicaoHabilitada">
        <v-btn
            rounded
            color="warning"
            text
            @click="edicaoHabilitada = !edicaoHabilitada"
        >
          <v-icon left>mdi-pencil</v-icon>
          Editar
        </v-btn>
      </template>
      <template v-else>
        <v-btn
            rounded
            color="success"
            text
            :disabled="!valid"
            @click="saveUpdate"
        >
          <v-icon left>mdi-content-save</v-icon>
          Salvar
        </v-btn>
      </template>

    </v-card-title>
    <v-card-text>
      <v-form :disabled="!edicaoHabilitada" ref="form" v-model="valid">
        <v-container fluid>
          <v-row>
            <v-col cols="12">
              <p class="text-h5 ma-0 pa-0">Informações Gerais</p>
              <v-divider />
              <v-container>
                <v-row justify="space-between">
                  <v-col cols="12" sm="6">
                    <v-text-field
                        label="Nome"
                        v-model="pessoa.name"
                        :rules="[rules.required, (v) => { return rules.maxLength(v, 70) }]"
                        required
                    />
                  </v-col>
                  <v-col cols="12" sm="3">
                    <v-select
                        :items="tiposPessoa"
                        item-text="text"
                        item-value="name"
                        label="Tipo"
                        v-model="pessoa.type"
                        :rules="[rules.required]"
                        required
                    />
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                        :label="pessoa.type === 'LEGAL' ? 'CNPJ' : 'CPF'"
                        v-model="pessoa.federalDocument"
                        v-mask="pessoa.type === 'LEGAL' ? '##.###.###/####-##' : '###.###.###-##'"
                        :rules="[
                            rules.required,
                            (v) => { return rules.maxLength(v, 20) },
                            (v) => { return rules.minLength(v, pessoa.type === 'LEGAL' ? 18 : 14) }
                            ]"
                        required
                    />
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                        :label="pessoa.type === 'LEGAL' ? 'Inscrição Estadual' : 'RG'"
                        v-model="pessoa.stateDocument"
                        v-mask="pessoa.type === 'LEGAL' ? '' : '##.###.###-#'"
                        :rules="[(v) => { return rules.maxLength(v, 20) }]"
                    />
                  </v-col>
                  <v-col cols="12" sm="4" md="3">
                    <v-text-field
                        :label="pessoa.type === 'LEGAL' ? 'Data de Constituição' : 'Data de Nascimento'"
                        v-model="pessoa.birthDate"
                        v-mask="['##/##/####', '#/#/####']"
                        :rules="[(v) => { return rules.minLength(v, 8) }]"
                    />
                  </v-col>
                </v-row>
              </v-container>
            </v-col>
            <v-col cols="12">
              <p class="text-h5 ma-0 pa-0">Endereço</p>
              <v-divider />
              <v-container>
                <v-row justify="space-between">
                  <v-col cols="6" sm="2">
                    <v-text-field
                        label="CEP"
                        v-model="pessoa.address.zipCode"
                        v-mask="'#####-###'"
                        :rules="[rules.required, (v) => { return rules.maxLength(v, 10) }]"
                        required
                    />
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                        label="Rua/Av."
                        v-model="pessoa.address.street"
                        :rules="[rules.required, (v) => { return rules.maxLength(v, 70) }]"
                        required
                    />
                  </v-col>
                  <v-col cols="6" sm="2">
                    <v-text-field
                        label="Numero"
                        v-model="pessoa.address.number"
                        :rules="[rules.required, (v) => { return rules.maxLength(v, 10) }]"
                        required
                    />
                  </v-col>
                  <v-col cols="6" sm="2">
                    <v-text-field
                        label="Complemento"
                        v-model="pessoa.address.complement"
                        :rules="[(v) => { return rules.maxLength(v, 50) }]"
                    />
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                        label="Bairro"
                        v-model="pessoa.address.district"
                        :rules="[rules.required, (v) => { return rules.maxLength(v, 50) }]"
                        required
                    />
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                        label="Cidade"
                        v-model="pessoa.address.city"
                        :rules="[rules.required, (v) => { return rules.maxLength(v, 70) }]"
                        required
                    />
                  </v-col>
                  <v-col cols="12" sm="4" md="2">
                    <v-text-field
                        label="Estado"
                        v-model="pessoa.address.state"
                        :rules="[rules.required, (v) => { return rules.maxLength(v, 2) }]"
                        required
                    />
                  </v-col>
                </v-row>
              </v-container>
            </v-col>

            <v-col cols="12" v-if="pessoa.type === 'LEGAL'">
              <p class="text-h5">Faturamento</p>
              <v-container>
                <v-row justify="space-between">
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                        label="Faturamento Anual"
                        v-model="pessoa.anualBilling"
                        v-money="money"
                    />
                  </v-col>
                </v-row>
              </v-container>
            </v-col>

            <v-col cols="12">
              <div class="d-flex">
                <p class="text-h5 ma-0 pa-0">Contatos</p>
                <v-spacer />
                <v-btn
                    icon
                    color="primary"
                    large
                    @click="$emit('adicionaContato')"
                >
                  <v-icon x-large>
                    mdi-plus-circle
                  </v-icon>
                </v-btn>
              </div>
              <v-divider />
              <v-container>
                <div v-for="(contato, key) in pessoa.contacts" :key="key">
                  <template v-if="contato">
                    <v-row justify="space-between">
                      <v-col cols="5" sm="2">
                        <v-checkbox
                            label="Ativo"
                            v-model="contato.active"
                        />
                      </v-col>
                      <v-col cols="4" sm="3">
                        <v-select
                            :items="tiposContato"
                            item-text="text"
                            item-value="name"
                            label="Tipo"
                            v-model="contato.type"
                        />
                      </v-col>
                      <v-col cols="11" sm="7" md="5">
                        <template v-if="contato.type === 'EMAIL'" >
                          <v-text-field
                              label="E-mail"
                              v-model="contato.value"
                              :rules="[(v) => { return rules.maxLength(v, 50) },rules.validEmail ]"
                          />
                        </template>
                        <template v-else>
                          <v-text-field
                              label="Telefone"
                              v-model="contato.value"
                              v-mask="['(##) ####-####', '(##) #####-####']"
                              :rules="[(v) => { return rules.maxLength(v, 50) }]"
                          />
                        </template>
                      </v-col>
                      <v-col cols="1">
                        <v-btn
                            icon
                            x-large
                            color="error"
                            class="delete-icon-contact"
                            @click="$emit('deleteContato', contato)"
                        >
                          <v-icon>
                            mdi-delete
                          </v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                    <v-divider class="divider-contacts" />
                  </template>
                </div>
              </v-container>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import {VMoney} from 'v-money'
import { mask } from 'vue-the-mask'

export default {
  name: "FormPessoaInfo",
  computed: {
    pessoa: {
      get () {
        return { ...this.$store.getters["getPessoaInfo"] };
      }
    }
  },
  mounted() {
    this.pessoaNome = this.pessoa.name
  },
  watch: {
    pessoa: {
      handler() {
        const date = new Date(this.$store.getters["getPessoaInfo"].birthDate)
        this.pessoa.birthDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
      },
      deep: true
    }
  },
  data: () => ({
    edicaoHabilitada: false,
    valid: false,
    teste: true,
    pessoaNome: '',
    money: {
      decimal: ',',
      thousands: '.',
      prefix: 'R$ ',
      suffix: '',
      precision: 2,
      masked: false
    },
    tiposPessoa: [
        {
        name: 'NATURAL',
        text: 'Física'
      },
      {
        name: 'LEGAL',
        text: 'Jurídica'
      }],
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
      maxLength: (v, max) => (v ? v.length <= max : true) || `Campo não pode ser maior que ${max} caracteres`,
      minLength: (v, min) => (v ? v.length >= min : true) || `Campo não pode ser menor que ${min} caracteres`,
      validEmail: v => /.+@.+\..+/.test(v) || 'Campo precisa ser um e-mail valido'
    }
  }),
  directives: {money: VMoney, mask},
  methods: {
    saveUpdate() {
      this.$store.dispatch('updatePessoa', this.pessoa)
      this.edicaoHabilitada = !this.edicaoHabilitada
      this.$emit('saved')
    }
  }
}
</script>

<style scoped>
  .divider-contacts {
    margin-bottom: 10px;
  }

  .delete-icon-contact {
    margin-top: 10px;
  }
</style>
