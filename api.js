
const urlBase = "https://agendaon-backend.onrender.com";


if (typeof axios === "undefined") {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/axios@1.7.5/dist/axios.min.js";
    document.head.appendChild(script);
}

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
        
            if (typeof axios === "undefined") throw new Error("Axios não carregado");
            
            const response = await axios.post(`${urlBase}/agendamentos`, agendamento, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            return response.data;
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
        }
    }
};

export default api;
