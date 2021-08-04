import Vue from 'vue'
import Vuex from 'vuex'
import Pessoas from "./modules/Pessoas";
import PessoaInfo from "./modules/PessoaInfo";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Pessoas,
    PessoaInfo
  }
})
