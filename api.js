const urlBase = "https://agendaon-backend.onrender.com";

const api = {
    
    async buscarAgendamentos() {
        try {
            const response = await fetch(`${urlBase}/agendamentos`);
            if (!response.ok) throw new Error("Erro ao buscar agendamentos");
            return await response.json();
        } catch (error) {
            alert("Erro ao buscar agendamentos");
            throw error;
        }
    },

   
    async postarAgendamentos(agendamento) {
        try {
            const response = await fetch(`${urlBase}/agendamentos`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(agendamento)
            });

            if (!response.ok) throw new Error("Erro ao adicionar agendamento");
            return await response.json();
        } catch (error) {
            alert("Erro ao adicionar agendamento");
            throw error;
        }
    },

    
    async excluirAgendamento(id) {
        try {
            const response = await fetch(`${urlBase}/agendamentos/${id}`, {
                method: "DELETE"
            });

            if (!response.ok) throw new Error("Erro ao excluir agendamento");
        } catch (error) {
            alert("Erro ao excluir agendamento");
            throw error;
        }
    }
};

export default api;
