import Api from "./Api";

export default {
    getPessoas(params) {
        return Api.get('/people', params)
            .then(pessoas => {
                return pessoas.data
            })
    },

    getPessoa(id) {
        return Api.get(`/people/${id}`)
            .then(pessoa => {
              return pessoa.data
            })
    }
}
