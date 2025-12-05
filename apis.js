const resultDiv = document.getElementById("result");
async function apis() {

    try {
        const resposta = await fetch("https://brasilapi.com.br/api/feriados/v1/2026");

        if (!resposta.ok) {
            throw new Error("Erro ao enviar os dados para a API.");
        }

        const json = await resposta.json();
        console.log("Resposta recebida:", json);

        let texto=`
        <b>Feriados em 2026:</b>
        `;
        json.forEach(feriado => {
            texto += `<b>Nome</b>:${feriado.name} - <b>Data:</b> ${feriado.date}<br>`;
        });
        const respostabank = await fetch("https://brasilapi.com.br/api/banks/v1");
        if (!respostabank.ok) {
            throw new Error("Erro ao enviar os dados para a API de bancos.");
        }
        const jsonbank = await respostabank.json();
        console.log("Resposta recebida de bancos:", jsonbank);
        texto+=`<br><b>Lista de Bancos:</b><br>`;
        jsonbank.forEach(banco => {
            texto += `<b>Nome</b>:${banco.name} - <b>Código:</b> ${banco.code} - <b>ISPB:</b> ${banco.ispb}<br>`;
        });
       const respostafipe = await fetch("https://parallelum.com.br/fipe/api/v1/carros/marcas");
        if (!respostafipe.ok) {
            throw new Error("Erro ao enviar os dados para a API FIPE.");
        }
        const jsonfipe = await respostafipe.json();
        console.log("Resposta recebida da FIPE:", jsonfipe);
        texto+=`<br><b>Lista de Marcas de Carros (FIPE):</b><br>`;
        jsonfipe.forEach(marca => {
            texto += `<b>Nome</b>:${marca.nome} - <b>Código:</b> ${marca.codigo}<br>`;
        });
        resultDiv.innerHTML = texto;

    } catch (erro) {
        console.error(erro);
        resultDiv.textContent = "Erro ao enviar dados: " + erro.message;
    }
}
apis();
