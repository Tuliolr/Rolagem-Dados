import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
 
  const [selectedDice, setSelectedDice] = useState('d6'); 
  const [rollResult, setRollResult] = useState(null); 
  const [rollHistory, setRollHistory] = useState([]); 
  const [isLoading, setIsLoading] = useState(false); 

  const availableDice = ['d4', 'd6', 'd8', 'd10', 'd12', 'd20', 'd100'];

  const handleRollDice = async () => {
    setIsLoading(true);
    setRollResult(null); 
    
    try {
      const response = await axios.get(`http://localhost:5000/roll/${selectedDice}`);
      const { result } = response.data;
      
      setRollResult(result);
      setRollHistory(prevHistory => [`D${selectedDice.slice(1)}: ${result}`, ...prevHistory]);

    } catch (error) {
      console.error("Erro ao rolar o dado:", error);
      alert("Não foi possível conectar ao servidor. Verifique se o back-end está rodando.");
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Simulador de Rolagem de Dados 🎲</h1>
      </header>
      
      <main>
        <div className="dice-selector">
          <h2>Escolha um dado:</h2>
          <div className="dice-buttons">
            {availableDice.map(dice => (
              <button
                key={dice}
                className={selectedDice === dice ? 'active' : ''}
                onClick={() => setSelectedDice(dice)}
              >
                {dice.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="roll-section">
          <button onClick={handleRollDice} disabled={isLoading}>
            {isLoading ? 'Rolando...' : `Rolar ${selectedDice.toUpperCase()}`}
          </button>
          
          {rollResult && (
            <div className="result-display">
              <p>Resultado:</p>
              <span>{rollResult}</span>
            </div>
          )}
        </div>

        <div className="history-section">
          <h3>Histórico de Rolagens</h3>
          {rollHistory.length > 0 ? (
            <ul>
              {rollHistory.map((entry, index) => (
                <li key={index}>{entry}</li>
              ))}
            </ul>
          ) : (
            <p>Nenhuma rolagem ainda.</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;