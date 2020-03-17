import React from "react";
import './MainCovid19Data.css';

export default function MainCovid19Data() {
    return (
        <div className="div-mainCovid19Data">
            <h3>Pais: Brasil</h3>
            <br />
            <ul>
                <li>Provincia: Nao identificada</li>
                <li>Ultima atualizacao: {new Date().toLocaleDateString('pt-BR')}</li>
                <li>Casos Confirmados: 10</li>
                <li>Mortes: 1</li>
                <li>Recuperados: 9</li>
                <br />
                <li>Ultima verificacao (amanha): {new Date().toLocaleDateString('pt-BR')}</li>
                <li>Total de Casos confirmados: 10</li>
                <li>Total de Mortes: 1</li>
                <li>Total de Recuperados: 9</li>
            </ul>
        </div>
    )
}