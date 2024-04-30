import express from 'express'
import cors from 'cors'

const app = express();

app.use(cors());
app.use(express.json());


/*lista de atv */

let veiculos = []
let idAutomatico = 1;

app.post('/veiculos', (request, response)=> {
    const {modelo, marca, ano, cor, preco}= request.body

    if(!modelo || !marca || !ano || !cor || !preco) {
        response.status(400).json({Mensagem: "Favor preencher o campo corretamente."})
    }

   let novoVeiculo = {
    id: idAutomatico,
    modelo: modelo,
    marca: marca,
    ano: ano,
    cor: cor,
    preco: preco
}

veiculos.push(novoVeiculo);

idAutomatico++

response.status(201).json(novoVeiculo);

});


app.put('/veiculos/:id', (request, response) => {
    const idVeiculo = parseInt(request.params.id);
    const { cor, preco } = request.body;

    const veiculoIndex = veiculos.findIndex(veiculo => veiculo.id === idVeiculo);

    if (veiculoIndex === -1) {
        return response.status(404).json({ Mensagem: 'Veículo não encontrado. Favor retornar ao menu inicial.' });
    }

    if (cor) {
        veiculos[veiculoIndex].cor = cor;
    }
    if (preco) {
        veiculos[veiculoIndex].preco = preco;
    }

    response.status(200).json(veiculos[veiculoIndex]);
});


app.delete('/veiculos/:id', (request, response) => {
    const idVeiculo = parseInt(request.params.id);

    const veiculoIndex = veiculos.findIndex(veiculo => veiculo.id === idVeiculo);

    if (veiculoIndex === -1) {
        return response.status(404).json({ Mensagem: 'Veículo não encontrado. Favor retornar ao menu inicial.' });
    }

    veiculos.splice(veiculoIndex, 1);

    response.status(200).json({ Mensagem: 'Veículo removido com sucesso.' });
});

 app.listen(8080, () => console.log("Servidor iniciado na porta 8080"));
