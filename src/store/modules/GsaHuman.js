import { defineStore } from "pinia";

const useGsaHumanStore = defineStore("GsaHuman",{
    state:()=>({
       currentInfos: {},
       historyTableData:[],
       currentTable:"",
       studyType: 2,
       individualType: 0,
       sampleType:0
    }),
    actions:{
      
    }
})

export default useGsaHumanStore