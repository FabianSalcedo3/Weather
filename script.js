const ctx = document.getElementById('myChart');

//Array per le labels assi X e Y
const asseX = [];
const asseY = [];

let chartObj;

// Modello chart
let chart = {
    type: 'line',
    data: {
        labels: asseX,
        datasets: [{
            label: 'Indice globale cambiamento temperatura media',
            data: asseY,
            fill: false,
            borderWidth: 1,
            borderColor: 'red',
            hoverBackgroundColor: 'red'
        }]
    },
    options: {
        plugins: {
            zoom: {
                pan: {
                    enabled: true,
                    mode: 'xy'
                },
                zoom: {
                    wheel: {
                        enabled: true,
                    },
                    pinch: {
                        enabled: true
                    },
                    mode: 'xy',
                }
            },
            legend: {
                labels: {
                    color: "black",
                    font: {
                        size: 14
                    }
                }
            }
        },
        scales: {
            y: {
                ticks: {
                    color: "black",
                    font: {
                        size: 14,
                    },
                }
            },
            x: {
                ticks: {
                    color: "black",
                    font: {
                        size: 14
                    },
                }
            }
        }
    }
}

//Richiamo funzione per creare grafico al caricamento della pagina
chartIt();

//Funzione asincrona per richiamare weather(), recuperare gli assi X, Y e creare l'oggetto chart su DOM
async function chartIt() {
    await weather().catch(error => {
        console.log('errorino!');
        console.error(error);
    });
    chartObj = new Chart(ctx, chart);
}

//Funzione asincrona per agire sui dati NASA e recuperare i miei assi X e Y del grafico
//Verifica 'MeanTmp.csv' per modello del .csv
async function weather() {
    const response = await fetch('MeanTmp.csv');
    const data = await response.text();
    const rows = data.split('\n').slice(2);
    rows.forEach(colonna => {
        const riga = colonna.split(',');
        const anno = riga[0];
        const temperatura = riga[13];
        asseX.push(anno);
        asseY.push(temperatura);
    })
}

//Bottone per mostrare grafico a barre
document.querySelector('#bar').addEventListener('click', () => {
    chartObj.resetZoom(); //resetto zoom
    chartObj.destroy(); //distruggo l'istanza precedente
    chart.type = 'bar'; //cambio il tipo di parametro
    chartObj = new Chart(ctx, chart); //creo il nuovo chart su DOM con il nuovo tipo

    //Controlli per lo stile del bottone
    if (document.querySelector('#bar').classList.contains('btn-outline-danger')) {
        document.querySelector('#bar').classList.remove('btn-outline-danger');
        document.querySelector('#bar').classList.add('btn-danger');
        document.querySelector('#line').classList.remove('btn-danger');
        document.querySelector('#line').classList.add('btn-outline-danger');
    }
});

//Bottone per mostrare grafico linea iniziale
document.querySelector('#line').addEventListener('click', () => {
    chartObj.resetZoom();
    chartObj.destroy();
    chart.type = 'line';
    chartObj = new Chart(ctx, chart);
    if (document.querySelector('#line').classList.contains('btn-outline-danger')) {
        document.querySelector('#line').classList.remove('btn-outline-danger');
        document.querySelector('#line').classList.add('btn-danger');
        document.querySelector('#bar').classList.remove('btn-danger');
        document.querySelector('#bar').classList.add('btn-outline-danger');
    }
});

//Bottone per il reset zoom
function onResetZoom() {
    chartObj.resetZoom();
}