const express = require("express");
const cors = require("cors");
const porta = 3000;

const app = express();
app.use(express.json());
app.use(cors());

let VEICULOS = [{
    id: 1,
    placa: "ABC-1234",
    modelo: "Sedan",
    hora_entrada: new Date().toISOString(),
    pago: true
    },
    {
    id: 2,
    placa: "ABD-1235",
    modelo: "SUV",
    hora_entrada: new Date().toISOString(),
    pago:false
    },
]

app.get("/", (req, res) => {
    res.status(200).json({ msg: "Hello" });
});

app.get("/lerveiculos",(req,res)=>{
    res.status(200).json(VEICULOS);
});
app.get("/lerveiculos/:id", (req,res)=>{
    const id = req.params.id;
    const meuCarro = VEICULOS.find(veiculo => veiculo.id === Number(id))
    console.log(id);
    res.status(200).json(meuCarro);
});

app.patch("/atualizarpagamento/:id", (req,res) =>{
    const veiculo = VEICULOS.find(x => x.id === Number(req.params.id));

    if(!veiculo) return res.status(404).json({erro:"Não encontrado"});

    const {pago} = req.body;

    if(pago !== undefined) veiculo.pago = pago;

    res.json(veiculo);
})


app.listen(porta, () => {
    console.log(`Servidor rodando no http://localhost:${porta}`);
});
