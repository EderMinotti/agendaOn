const urlBase = "https://agendaon-backend.onrender.com"

const api = {

    async buscarAgendamentos() {

        try {
            const response = await fetch(`${urlBase}/agendamentos`)
            return await response.json()

        } catch (error) {
            alert("erro ao buscar agendamento")
            throw error
        }
    },

    async postarAgendamentos(agendamento) {
        try {
            const response = await axios.post(`${urlBase}/agendamentos`, agendamento)
            return await response.data
            
        } catch (error) {
            alert("erro ao postar agendamento")
            throw error
        }
    },

    async excluirAgendamento(id) {
        try {
            const response = await fetch(`${urlBase}/agendamentos/${id}`, {method:"DELETE"})
            
        } catch (error) {
            alert("erro ao excluir agendamento")
        }
    }

  

    



}
export default api;