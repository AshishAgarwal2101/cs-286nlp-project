import './App.css';
import axios from 'axios';
import { useState } from 'react';
import Popup from './Popup';

const App = (props) => {
  const [trainRes, setTrainRes] = useState("");
  const [testRes, setTestRes] = useState("");
  const [evaluationRes, setEvaluationRes] = useState("");
  const [essay, setEssay] = useState("");
  const [robertaOuts, setRobertaOuts] = useState(["", "", ""]);
  const [lstmOuts, setLstmOuts] = useState(["", "", ""]);
  const [debertaOuts, setdebertaOuts] = useState(["", "", ""]);
  const [evalModel, setEvalModel] = useState("roberta");
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [results, setResults] = useState(["", "load", "", 4]);

  const handlePopupClose = (e, index, model) => {
    setPopupOpen(false);
    setOuts(index, model, "");
    setResults("", "load", "", 4);
  }

  const trainClick = async(e, model) => {
    let modelPath = "train_roberta";
    if(model === "lstm") modelPath = "train_lstm";
    if(model === "deberta") modelPath = "train_deberta";

    if(model === "roberta" && robertaOuts[0]){
      setResults(["Roberta", "load", robertaOuts[0], 0]);
      setPopupOpen(true);
      return;
    }
    if(model === "lstm" && lstmOuts[0]){
      setResults(["LSTM", "load", lstmOuts[0], 0]);
      setPopupOpen(true);
      return;
    }
    if(model === "deberta" && debertaOuts[0]){
      setResults(["DeBERTa", "load", debertaOuts[0], 0]);
      setPopupOpen(true);
      return;
    }

    try {
      const trainRes = await axios.get("/api/" + modelPath);
      setOuts(0, model, trainRes.data);
    }catch(e){
      setOuts(0, model, "Something went wrong");
    }
  };

  const testClick = async(e, model) => {
    let modelPath = "test_roberta";
    if(model === "lstm") modelPath = "test_lstm";
    if(model === "deberta") modelPath = "test_deberta";

    if(model === "roberta" && robertaOuts[1]){
      setResults(["Roberta", "test", robertaOuts[1], 1]);
      setPopupOpen(true);
      return;
    }
    if(model === "lstm" && lstmOuts[1]){
      setResults(["LSTM", "test", lstmOuts[1], 1]);
      setPopupOpen(true);
      return;
    }
    if(model === "deberta" && debertaOuts[1]){
      setResults(["DeBERTa", "test", debertaOuts[1], 1]);
      setPopupOpen(true);
      return;
    }

    try {
      const testRes = await axios.get("/api/" + modelPath);
      setOuts(1, model, testRes.data);
    }catch(e){
      setOuts(1, model, "Something went wrong");
    }
  };

  const evaluationClick = async(e) => {
    let model = evalModel;
    let modelPath = "predict_roberta_essay";
    if(model === "lstm") modelPath = "predict_lstm_essay";
    if(model === "deberta") modelPath = "predict_deberta_essay";

    if(model === "roberta" && robertaOuts[2]){
      setResults(["Roberta", "evaluate", robertaOuts[2], 2]);
      setPopupOpen(true);
      return;
    }
    else if(model === "lstm" && lstmOuts[2]){
      setResults(["LSTM", "evaluate", lstmOuts[2], 2]);
      setPopupOpen(true);
      return;
    }
    else if(model === "deberta" && debertaOuts[2]){
      setResults(["DeBERTa", "evaluate", debertaOuts[2], 2]);
      setPopupOpen(true);
      return;
    }

    try {
      const evalRes = await axios.post("/api/" + modelPath, {essay});
      setOuts(2, model, evalRes.data);
    }catch(e){
      setOuts(2, model, "Something went wrong");
    }
  };

  const setOuts = (index, model, result) => {
    console.log("New Result:: ", result);
    if(model.toLowerCase() == "roberta"){
      if(index === 0)  robertaOuts[0] = result;
      else if(index === 1) robertaOuts[1] = result;
      else robertaOuts[2] = result;
      setRobertaOuts([...robertaOuts]);
    }
    else if(model.toLowerCase() === "lstm"){
      if(index === 0)  lstmOuts[0] = result;
      else if(index === 1) lstmOuts[1] = result;
      else lstmOuts[2] = result;
      setLstmOuts([...lstmOuts]);
    }
    else if(model.toLowerCase() === "deberta") {
      if(index === 0)  debertaOuts[0] = result;
      else if(index === 1) debertaOuts[1] = result;
      else debertaOuts[2] = result;
      setdebertaOuts([...debertaOuts]);
    }
  }

  const onSelectEvalModel = (e) => {
    setEvalModel(e.target.value);
  };

  const essayInput = (e) => {
    setEssay(e.target.value);
  };

  const robertaStyles = [
    robertaOuts[0] ? {backgroundColor: "#9494b8"} : {},
    robertaOuts[1] ? {backgroundColor: "#9494b8"} : {}
  ];

  const robertaButtonTexts = [
    robertaOuts[0] ? "Click to see results" : "Load Roberta Model",
    robertaOuts[1] ? "Click to see results" : "Test Roberta Model"
  ];

  const lstmStyles = [
    lstmOuts[0] ? {backgroundColor: "#9494b8"} : {},
    lstmOuts[1] ? {backgroundColor: "#9494b8"} : {}
  ];

  const lstmButtonTexts = [
    lstmOuts[0] ? "Click to see results" : "Load LSTM Model",
    lstmOuts[1] ? "Click to see results" : "Test LSTM Model"
  ];

  const debertaStyles = [
    debertaOuts[0] ? {backgroundColor: "#9494b8"} : {},
    debertaOuts[1] ? {backgroundColor: "#9494b8"} : {}
  ];

  const debertaButtonTexts = [
    debertaOuts[0] ? "Click to see results" : "Load DeBERTa Model",
    debertaOuts[1] ? "Click to see results" : "Test DeBERTa Model"
  ];

  const evaluateButtonText = (robertaOuts[2] || lstmOuts[2] || debertaOuts[2]) ? "Click to see results" : "Evaluate Proficiency";
  const evaluateButtonStyle = (robertaOuts[2] || lstmOuts[2] || debertaOuts[2]) ? {backgroundColor: "#000066"} : {};

  return (
    <div className="App">
      <div className="row">
        <div className="train_button app_button" onClick={(e) => trainClick(e, "roberta")} style={robertaStyles[0]}>{robertaButtonTexts[0]}</div>
        <div className="test_button app_button" onClick={(e) => testClick(e, "roberta")} style={robertaStyles[1]}>{robertaButtonTexts[1]}</div>
      </div>

      <div className="row">
        <div className="train_button app_button" onClick={(e) => trainClick(e, "lstm")} style={lstmStyles[0]}>{lstmButtonTexts[0]}</div>
        <div className="test_button app_button" onClick={(e) => testClick(e, "lstm")} style={lstmStyles[1]}>{lstmButtonTexts[1]}</div>
      </div>

      <div className="row">
        <div className="train_button app_button" onClick={(e) => trainClick(e, "deberta")} style={debertaStyles[0]}>{debertaButtonTexts[0]}</div>
        <div className="test_button app_button" onClick={(e) => testClick(e, "deberta")} style={debertaStyles[1]}>{debertaButtonTexts[1]}</div>
      </div>

      <textarea rows="4" cols="50" className="evaluate_textbox" onInput={essayInput} placeholder="Add your essay here."></textarea>
      <div className="row">
        <select name="model-type" className="model-evaluate-dropdown" onChange={onSelectEvalModel}>
          <option value="roberta">Roberta</option>
          <option value="lstm">LSTM</option>
          <option value="deberta">DeBERTa</option>
        </select>
      </div>
      <div className="row">
        <div className="evaluate_button" onClick={evaluationClick} style={evaluateButtonStyle}>{evaluateButtonText}</div>
      </div>
      <Popup 
        isOpen={isPopupOpen} 
        handleClose={handlePopupClose}
        model={results[0]}
        resultType={results[1]}
        result={results[2]}
        modelIndex={results[3]} />
    </div>
  );
};

export default App;
