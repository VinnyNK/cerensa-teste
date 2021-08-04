import Vue from 'vue'

export default new Vue({
    methods: {
        send(header, content, type, options = {}) {
            this.$emit('sendNotification', {header, content, type, ...options})
        },
        whenSend (callback) {
            this.$on('sendNotification', callback)
        }
    }
})
