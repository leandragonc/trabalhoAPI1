console.log("main.js carregado com sucesso!");

const form = document.getElementById("postForm");
const inputTitle = document.getElementById("title");
const inputBody = document.getElementById("mensagem");
const resultDiv = document.getElementById("result");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("Formulário enviado");

    const titulo = inputTitle.value.trim();
    const corpo = inputBody.value.trim();

    if (!titulo || !corpo) {
        resultDiv.textContent = "Preencha todos os campos.";
        return;
    }

    const dados = {
        title: titulo,
        mensagem: corpo,
        userId: 1
    };

    console.log("Enviando para API:", dados);

    try {
        const resposta = await fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        });

        if (!resposta.ok) {
            throw new Error("Erro ao enviar os dados para a API.");
        }

        const json = await resposta.json();
        console.log("Resposta recebida:", json);
        let texto=`<b>titulo:</b> ${json.title}<br><b>mensagem:</b> ${json.mensagem}`;

        resultDiv.innerHTML = texto;

    } catch (erro) {
        console.error(erro);
        resultDiv.textContent = "Erro ao enviar dados: " + erro.message;
    }
});
