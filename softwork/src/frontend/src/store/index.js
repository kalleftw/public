import { reactive } from 'vue'

const state = reactive({
    userEmail: ''
})

/**
 * @author Karl Ekberg
 * HOW TO USE:
 * import { inject } from "vue";
 * const store = inject('store')
 * Display as:
 * {{store.state.userEmail}}
 * Access methods:
 * store.actions.createEntry(access.value[1].user)
 * ^ EXAMPLE
 * store.actions.*method(parameters)*
 */

const methods = {
    createEntry(req) {
        if (localStorage.getItem('user') === null) {
            localStorage.setItem('user', req)
            state.userEmail = req
        }
    },

    removeLocalStorage() {
        localStorage.removeItem('user')
        state.userEmail = ''

    },

    checkLocalStorage() {
        if (localStorage.getItem('user')) {
            state.userEmail = localStorage.getItem('user')
        }
    }
}

export default {
    state,
    methods
}