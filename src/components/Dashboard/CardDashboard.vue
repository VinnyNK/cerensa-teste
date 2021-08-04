<template>
  <v-card
      height="200"
      outlined
      :to="route"
      :disabled="disabled"
  >
    <div class="d-flex flex-no-wrap justify-space-between fill-height">
      <div>
        <v-card-title
            v-text="title"
            class="text-h6 text-lg-h4 text-break"
        />

        <v-card-subtitle v-text="subtitle" />

        <v-card-actions class="ma-3">
          <slot name="content" />
        </v-card-actions>
      </div>

      <v-icon class="ma-3" size="100" v-text="icon"/>

    </div>
  </v-card>
</template>

<script>
export default {
  name: "CardDashboard",
  props: {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      required: true
    },
    route: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>

</style>
