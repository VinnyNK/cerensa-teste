<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
      clipped-left
    >
      <div class="d-flex align-center">
        <v-img
          alt="Cerensa Logo"
          class="shrink mr-2"
          contain
          src="./assets/logo.png"
          transition="scale-transition"
          width="140"
          />
      </div>

      <v-spacer></v-spacer>

      <div class="d-flex align-center" style="margin-left: 20px">
        <v-btn
            @click="$vuetify.theme.dark = !$vuetify.theme.dark"
            elevation="3"
            fab
            icon
        >
          <v-icon>
            mdi-theme-light-dark
          </v-icon>
        </v-btn>
      </div>
    </v-app-bar>
    <v-navigation-drawer
        expand-on-hover
        bottom
        app
        clipped
    >
      <v-list shaped>
        <v-list-item link to="/">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Inicio</v-list-item-title>
        </v-list-item>

        <v-list-group prepend-icon="mdi-account-multiple">
          <template #activator>
            <v-list-item>
              <v-list-item-title>Pessoas</v-list-item-title>
            </v-list-item>
          </template>

          <v-list-item link to="/pessoas">
            <v-list-item-icon>
              <v-icon>mdi-format-list-bulleted</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              Lista Pessoas
            </v-list-item-title>
          </v-list-item>

          <v-list-item link to="/pessoa/nova">
            <v-list-item-icon>
              <v-icon>mdi-account-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              Adicionar Pessoa
            </v-list-item-title>
          </v-list-item>
        </v-list-group>

      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view/>
    </v-main>
    <NotificationCenter />
  </v-app>
</template>

<script>

import NotificationCenter from "./components/Notificacao/NotificationCenter";
export default {
  name: 'App',
  components: {NotificationCenter}
};
</script>
