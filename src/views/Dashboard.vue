<template>
  <v-container>
    <v-row>
      <v-col cols="12" style="width: 80px">
      </v-col>
      <v-col cols="12" sm="6" lg="4">
        <CardDashboard
            title="Pessoas"
            subtitle="Gerenciamento de Pessoas"
            icon="mdi-account-group"
            route="/pessoas"
        >
          <template #content>
            <v-btn rounded color="primary" small>
              Ver Pessoas
            </v-btn>
          </template>
        </CardDashboard>
      </v-col>
      <v-col cols="12" sm="6" lg="4">
        <CardDashboard title="Função não disponível" icon="mdi-block-helper" disabled/>
      </v-col>
      <v-col cols="12" sm="6" lg="4">
        <CardDashboard title="Função não disponível" icon="mdi-block-helper" disabled/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import CardDashboard from "../components/Dashboard/CardDashboard";

  export default {
    name: 'Dashboard',

    components: {
      CardDashboard
    },
  }
</script>
