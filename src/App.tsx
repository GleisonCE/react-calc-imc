import { useState } from "react";
import styles from "./App.module.css";
import poweredImage from "./assets/imc.png";
import backImage from "./assets/leftarrow.png";
import { GridItem } from "./components/GridItem";

import { levels, calculateImc, Level } from "./helpers/imc";

function App() {
  const [personHeight, setPersonHeight] = useState<number>(0);
  const [personWeight, setPersonWeight] = useState<number>(0);
  const [personImc, setPersonImc] = useState<Level | null>(null);

  const handleCalculate = () => {
    if (personHeight && personWeight) {
      setPersonImc(calculateImc(personHeight, personWeight));
    } else {
      alert("Informe a altura e o peso.");
    }
  };

  const handleBackButton = () => {
    setPersonImc(null);
    setPersonHeight(0);
    setPersonWeight(0);
  };

  return (
    <div className={styles.main}>
      <header>
        <div className={styles.headerContainer}>
          <img src={poweredImage} alt="" width={150} />
        </div>
      </header>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <h1>Calcule o seu IMC</h1>
          <p>
            IMC é a sigla para índice de massa corpórea, parâmetro adotado pela
            Organização Mundial de Saúde para calcular o peso ideal de cada
            pessoa.
          </p>
          <input
            type="number"
            placeholder="Digite sua altura. Ex: 1.80 (em metros)"
            value={personHeight > 0 ? personHeight : ""}
            onChange={(e) => setPersonHeight(parseFloat(e.target.value))}
            disabled={personImc ? true : false}
          />
          <input
            type="number"
            placeholder="Digite o seu peso. Ex: 75.3 (em kg)"
            value={personWeight > 0 ? personWeight : ""}
            onChange={(e) => setPersonWeight(parseFloat(e.target.value))}
            disabled={personImc ? true : false}
          />
          <button onClick={handleCalculate} disabled={personImc ? true : false}>
            Calcular
          </button>
        </div>
        <div className={styles.rightSide}>
          {!personImc && (
            <div className={styles.grid}>
              {levels.map((item, key) => (
                <GridItem key={key} item={item} />
              ))}
            </div>
          )}
          {personImc && (
            <div className={styles.rightBig}>
              <div className={styles.rightArrow} onClick={handleBackButton}>
                <img src={backImage} alt="" width={25} />
              </div>
              <GridItem item={personImc} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
