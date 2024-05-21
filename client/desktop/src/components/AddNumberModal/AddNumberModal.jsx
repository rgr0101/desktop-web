import React, { useState } from "react";
import Modal from "react-modal";

const AddNumberModal = ({ onClose }) => {
    const [number1, setNumber1] = useState("");
    const [number2, setNumber2] = useState("");
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");

    const handleNumber1Change = (e) => {
        setNumber1(e.target.value);
    };

    const handleNumber2Change = (e) => {
        setNumber2(e.target.value);
    };

    const addNumbers = async () => {
        setError("");
        try {
            const response = await fetch(
                "https://cors-anywhere.herokuapp.com/http://www.dneonline.com/calculator.asmx",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "text/xml; charset=utf-8",
                        'x-requested-with': 'XMLHttpRequest',
                    },
                    body: `<?xml version="1.0" encoding="utf-8"?>
                    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                      <soap:Body>
                        <Add xmlns="http://tempuri.org/">
                          <intA>${number1}</intA>
                          <intB>${number2}</intB>
                        </Add>
                      </soap:Body>
                    </soap:Envelope>`,
                }
            );
            const text = await response.text();
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(text, "text/xml");
            const resultText =
                xmlDoc.getElementsByTagName("AddResult")[0].textContent;
            setResult(resultText);
        } catch (err) {
            setError("Error");
        }
    };

    return (
        <div className='number-conversion-modal'>
            <button className='close-button' onClick={onClose}>
                Cerrar
            </button>
            <h2>Sumar Números</h2>
            <input
                type='number'
                value={number1}
                onChange={handleNumber1Change}
                placeholder='Primer número'
            />
            <input
                type='number'
                value={number2}
                onChange={handleNumber2Change}
                placeholder='Segundo número'
            />
            <button onClick={addNumbers}>Sumar</button>
            {result && <p>Resultado: {result}</p>}
            {error && <p>Error: {error}</p>}
        </div>
    );
};

export default AddNumberModal;
