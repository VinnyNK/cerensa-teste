import PessoaApi from "../../service/PessoaApi"

const state = () => ({
    pessoa: {}
})

const getters = {
    getPessoaInfo: state => {
        return state.pessoa
    }
}

const mutations  = {
    setPessoa (state, pessoa) {
        state.pessoa = pessoa
    },

    pushContato (state, contato) {
        state.pessoa.contacts.push(contato)
    },

    deleteContato (state, contato) {
        const contatos = [ ...state.pessoa.contacts ]
        const index = contatos.indexOf(contato)
        delete contatos[index]
        state.pessoa.contacts = [...contatos]
    },

    updatePessoa (state, pessoa) {
        state.pessoa.contacts = pessoa.contacts
        state.pessoa = {...state.pessoa}
    }
}

const actions = {
    fetchPessoaInfo ({ commit }, idPessoa) {
        return PessoaApi.getPessoa(idPessoa)
            .then(pessoa => {
                commit('setPessoa', pessoa)
            })
    },

    addContato ({ commit }, contato) {
        commit('pushContato', contato)
    },

    removeContato ({ commit }, contato) {
        commit('deleteContato', contato)
    },

    updatePessoa({ commit }, pessoa) {
        commit('updatePessoa', pessoa)
    }
}

export default {
    namespace: true,
    state,
    getters,
    mutations,
    actions
}
