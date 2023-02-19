import React, {useState} from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
// @ts-ignore
import faker from 'faker';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    plugins: {
        title: {
            display: true,
            text: 'Chart.js Bar Chart - Stacked',
        },
    },
    responsive: true,
    interaction: {
        mode: 'index',
        intersect: false,
    },
    scales: {
        x: {
            stacked: true,
        },
        y: {
            stacked: true,
        },
    },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];


export const data = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
            backgroundColor: 'rgb(255, 99, 132)',
            stack: 'Stack 0',
        },
        {
            label: 'Dataset 2',
            data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
            backgroundColor: 'rgb(75, 192, 192)',
            stack: 'Stack 0',
        },
        {
            label: 'Dataset 3',
            data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
            backgroundColor: 'rgb(53, 162, 235)',
            stack: 'Stack 1',
        },
    ],
};


function DefaultChart() {

    const [dataset, setDataset] = useState(data);
    const btnClick = ()=>{
        setDataset({
            labels,
            datasets: [
                {
                    label: 'My First dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgb(255, 99, 132)',
                    fill: false
                },
                {
                    label: 'My Second dataset',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    borderColor: 'rgb(54, 162, 235)',
                    backgroundColor: 'rgb(75, 192, 192)',
                    fill: false
                }
            ]
        });
    };
    return (
        <div>
            <h1>charjs hello.</h1>
            <Bar options={options} data={dataset} />
            <button onClick={btnClick}>change data</button>
        </div>);
}

export default DefaultChart;

