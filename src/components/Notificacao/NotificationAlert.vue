<template>
  <v-alert
      border="left"
      dismissible
      prominent
      text
      :color="color"
      :type="type"
      :icon="icon"
  >
    <div class="header"><b>{{ header }}</b></div>
    <div>{{ content }}</div>
  </v-alert>
</template>

<script>
export default {
  name: "Notification",
  props: {
    color: {
      type: String
    },
    type: {
      type: String,
      required: true
    },
    icon: {
      type: String
    },
    header: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
  .header {
    display: block;
  }
</style>
