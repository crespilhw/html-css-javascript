// Variáveis globais para armazenar os valores e operação
let num1 = "";
let num2 = "";
let operador = "";
let resultado = "";
let expressaoCompleta = "";

document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('num');
    const buttons = document.querySelectorAll('.button');

    // Adiciona evento de click para todos os botões
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent;

            // Botão Clear (C)
            if (button.classList.contains('c')) {
                limparCalculadora();
                display.value = "0";
                return;
            }

            // Botão de igual
            if (button.classList.contains('equal')) {
                if (num1 && operador && num2) {
                    calcular();
                }
                return;
            }

            // Botões de operação
            if (button.classList.contains('operator')) {
                if (num1 && !num2) {
                    operador = value;
                    expressaoCompleta = num1 + " " + operador;
                    display.value = expressaoCompleta;
                } else if (num1 && num2 && operador) {
                    // Se já tem operação completa, calcula primeiro
                    calcular();
                    operador = value;
                    expressaoCompleta = num1 + " " + operador;
                    display.value = expressaoCompleta;
                }
                return;
            }

            // Botão decimal
            if (button.classList.contains('decimal')) {
                if (operador === "") {
                    if (!num1.includes(".")) {
                        num1 += num1 === "" ? "0." : ".";
                        expressaoCompleta = num1;
                        display.value = expressaoCompleta;
                    }
                } else {
                    if (!num2.includes(".")) {
                        num2 += num2 === "" ? "0." : ".";
                        expressaoCompleta = num1 + " " + operador + " " + num2;
                        display.value = expressaoCompleta;
                    }
                }
                return;
            }

            // Botões numéricos (0-9)
            if (operador === "") {
                num1 += value;
                expressaoCompleta = num1;
                display.value = expressaoCompleta;
            } else {
                num2 += value;
                expressaoCompleta = num1 + " " + operador + " " + num2;
                display.value = expressaoCompleta;
            }
        });
    });

    // Função para calcular o resultado
    function calcular() {
        const n1 = parseFloat(num1);
        const n2 = parseFloat(num2);
        
        switch (operador) {
            case "+":
                resultado = n1 + n2;
                break;
            case "-":
                resultado = n1 - n2;
                break;
            case "x":
                resultado = n1 * n2;
                break;
            case "÷":
                if (n2 === 0) {
                    resultado = "Erro";
                } else {
                    resultado = n1 / n2;
                }
                break;
            default:
                resultado = "Erro";
        }

        // Exibe o resultado
        if (resultado === "Erro") {
            display.value = resultado;
            limparCalculadora();
        } else {
            // Arredonda para evitar números com muitas casas decimais
            resultado = Math.round(resultado * 100000000) / 100000000;
            display.value = resultado;
            
            // Prepara para próxima operação
            num1 = resultado.toString();
            num2 = "";
            operador = "";
            expressaoCompleta = "";
        }
    }

    // Função para limpar a calculadora
    function limparCalculadora() {
        num1 = "";
        num2 = "";
        operador = "";
        resultado = "";
        expressaoCompleta = "";
    }
});