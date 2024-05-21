import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import './NumberConversionModal.css';

const NumberConversionModal = ({ onClose }) => {
    const [number, setNumber] = useState('');
    const [words, setWords] = useState('');
    const [loading, setLoading] = useState(false);

    const convertNumberToWords = async () => {
        if (!number) return;
        setLoading(true);
        setWords(''); 
        try {
            const soapRequest = `<?xml version="1.0" encoding="utf-8"?>
                <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                  <soap:Body>
                    <NumberToWords xmlns="http://www.dataaccess.com/webservicesserver/">
                      <ubiNum>${number}</ubiNum>
                    </NumberToWords>
                  </soap:Body>
                </soap:Envelope>`;

            const response = await axios.post(
                'https://cors-anywhere.herokuapp.com/https://www.dataaccess.com/webservicesserver/NumberConversion.wso',
                soapRequest,
                {
                    headers: {
                        'Content-Type': 'text/xml;charset=UTF-8',
                        'SOAPAction': 'http://www.dataaccess.com/webservicesserver/NumberToWords',
                        'x-requested-with': 'XMLHttpRequest',
                    },
                }
            );

            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(response.data, 'text/xml');
            const resultElement = xmlDoc.getElementsByTagName('m:NumberToWordsResult')[0];

            if (resultElement) {
                const result = resultElement.textContent;
                setWords(result);
            } else {
                setWords('Error');
            }
        } catch (error) {
            console.error('Error', error);
            setWords('Error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="number-conversion-modal">
            <button className="close-button" onClick={onClose}>Cerrar</button>
            <h2>Convertir Número a Palabras</h2>
            <div>
                <input
                    type="text"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    placeholder="Ingresar número"
                />
                <button onClick={convertNumberToWords}>Convertir</button>
            </div>
            {loading ? <p>Cargando...</p> : <p>Resultado: {words}</p>}
        </div>
    );
};

export default NumberConversionModal;
