import PessoaApi from "../../service/PessoaApi"

const state = () => ({
    pessoas: [],
    totalPessoas: 0
})

const getters = {
    getPessoas: state => {
        return state.pessoas
    },

    getTotalPessoas: state => {
        return state.totalPessoas
    }
}

const mutations  = {
    setPessoas (state, pessoas) {
        state.pessoas = [...pessoas]
    },

    setTotalPessoas (state, total) {
        state.totalPessoas = total
    }
}

const actions = {
    fetchPessoas ({ commit }, params) {
        return PessoaApi.getPessoas(params)
            .then(pessoas => {
                commit('setPessoas', pessoas.results)
                commit('setTotalPessoas', pessoas.totalElements)
            })
    }
}

export default {
    namespace: true,
    state,
    getters,
    mutations,
    actions
}
