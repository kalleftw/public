import axios from 'axios'
import {
    inject,
    onMounted
} from 'vue'
import {
    useRouter
} from "vue-router";
/**
 * @author Karl Ekberg
 */

/**
 * Wrapper method
 * @param {*} username Username provided in form
 * @param {*} password password proivided in form
 * @returns all methods wrapped
 */
const postCredentials = (username, password) => {

    axios.defaults.withCredentials = true

    const user = {
        email: username,
        password: password
    }

    /**
     * Method which signs the user up.
     * @returns response from backend
     */
    const signup = async () => {
        try {
            const response = await axios.post(`${process.env.VUE_APP_BACKEND_ADDRESS}/endpoint_signup`, {
                email: user.email,
                password: user.password
            })

            return response.data
        } catch (error) {
            console.log()
        }

    }

    /**
     * Method which logs the user in
     * @returns repsonse from backend
     */
    const login = async () => {
        try {
            const response = await axios.post(`${process.env.VUE_APP_BACKEND_ADDRESS}/endpoint_login`, {
                email: user.email,
                password: user.password,
            })
            return response.data
        } catch (error) {
            console.log()
        }
    }

    /**
     * Method which logs the user out
     * @returns Response from backend
     */
    const logout = async () => {
        try {
            const response = await axios.post(`${process.env.VUE_APP_BACKEND_ADDRESS}/endpoint_logout`)
            return response.data
        } catch (error) {
            console.log()
        }

    }


    const redirect = () => {
        const router = useRouter()
        onMounted(() => {
            const store = inject('store')
            if (store.state.userEmail) {
                router.push('/');
            }
        })
    }

    return {
        signup,
        login,
        logout,
        redirect,
    }
}

export default postCredentials