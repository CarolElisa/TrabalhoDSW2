document.addEventListener("DOMContentLoaded", async ()=>{
    const form = document.getElementById("servico-form");
    const excluirBtn = document.getElementById("excluir-servico");
    const voltarBtn = document.getElementById("voltar");
    const params = new URLSearchParams(window.location.search);
    const idServico = params.get("id_servico");
    const idUsuario = params.get("id_usuario");
    if (idServico) try {
        const response = await fetch(`http://localhost:3000/servicos/${idServico}`);
        const servico = await response.json();
        document.getElementById("id_servico").value = servico.id;
        document.getElementById("id_usuario").value = idUsuario;
        document.getElementById("tipo").value = servico.tipo;
        document.getElementById("nome").value = servico.nome;
        document.getElementById("descricao").value = servico.descricao;
        document.getElementById("categoria").value = servico.categoria;
        document.getElementById("preco").value = servico.preco || "";
    } catch (error) {
        console.error("Erro ao carregar servi\xe7o:", error);
    }
    form.addEventListener("submit", async (event)=>{
        event.preventDefault();
        const servicoAtualizado = {
            id: idServico,
            id_usuario: idUsuario,
            tipo: document.getElementById("tipo").value,
            nome: document.getElementById("nome").value,
            descricao: document.getElementById("descricao").value,
            categoria: document.getElementById("categoria").value,
            preco: document.getElementById("preco").value || null
        };
        try {
            await fetch(`http://localhost:3000/servicos/${idServico}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(servicoAtualizado)
            });
            alert("Servi\xe7o atualizado com sucesso!");
            window.location.href = `home.html?id_usuario=${idUsuario}`;
        } catch (error) {
            console.error("Erro ao atualizar servi\xe7o:", error);
        }
    });
    excluirBtn.addEventListener("click", async ()=>{
        if (confirm("Tem certeza que deseja excluir este servi\xe7o?")) try {
            await fetch(`http://localhost:3000/servicos/${idServico}`, {
                method: "DELETE"
            });
            alert("Servi\xe7o exclu\xeddo com sucesso!");
            window.location.href = `home.html?id_usuario=${idUsuario}`;
        } catch (error) {
            console.error("Erro ao excluir servi\xe7o:", error);
        }
    });
    voltarBtn.addEventListener("click", ()=>{
        window.location.href = `home.html?id_usuario=${idUsuario}`;
    });
});

//# sourceMappingURL=editar_servico.61ee787f.js.map
