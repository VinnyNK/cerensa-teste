<template>
  <div class="notifications">
    <NotificationAlert
        v-for="(notification, i) in notifications"
        :key="i"
        :color="notification.color"
        :type="notification.type"
        :header="notification.header"
        :content="notification.content"
    />
  </div>
</template>

<script>
import Notification from '../../notification'
import NotificationAlert from "./NotificationAlert";
export default {
  name: "NotificationCenter",
  components: { NotificationAlert },
  data: () => ({
    notifications: []
  }),
  created() {
    Notification.whenSend(notification => {
      this.notifications.push(notification)
      setTimeout(() => {
        this.notifications.shift()
      }, 10000)
    })
  }
}
</script>

<style scoped>
  .notifications {
    width: 350px;
    margin: 70px 20px 20px;
    position:fixed;
    right: 0;
  }
</style>
