import { defineStore } from "pinia";

const usePublicationStore = defineStore("publication",{
    state:()=>({
        allJournals:{}
    }),
    actions:{
        fetchAllJournalsData(){
            
        }
    }
})

export default usePublicationStore