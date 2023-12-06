import { defineStore } from "pinia";

const useLoginStore = defineStore("Login", {
    state: () => ({
        user: {
            mail: "",
            state: "",
        },
    }),
    actions: {

    }
})

export default useLoginStore