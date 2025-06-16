const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000; 
app.use(cors()); 
app.use(express.json()); 


app.get('/', (req, res) => {
  res.send('API de Rolagem de Dados está funcionando! 🎲');
});


app.get('/roll/:diceType', (req, res) => {
  const { diceType } = req.params; 
  

  const sides = parseInt(diceType.slice(1));

  if (isNaN(sides) || sides <= 0) {
    return res.status(400).json({ error: 'Tipo de dado inválido.' });
  }


  const result = Math.floor(Math.random() * sides) + 1;

  res.json({
    diceType: diceType,
    result: result
  });
});


app.listen(PORT, () => {
  console.log(`🚀 Servidor back-end rodando em http://localhost:${PORT}`);
});