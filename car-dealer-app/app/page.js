'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';


export default function Home() {
    const [makes, setMakes] = useState([]);
    const [selectedMake, setSelectedMake] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 2015 + 1 }, (_, i) => 2015 + i);

    useEffect(() => {
        fetch('https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json')
            .then((res) => res.json())
            .then((data) => setMakes(data.Results));
    }, []);
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Выберите марку и год модели</h1>
            <div className="flex space-x-4">
                <select
                    className="p-2 border rounded"
                    value={selectedMake}
                    onChange={(e) => setSelectedMake(e.target.value)}
                >
                    <option value="">Выберите марку</option>
                    {makes.map((make) => (
                        <option key={make.MakeId} value={make.MakeId}>
                            {make.MakeName}
                        </option>
                    ))}
                </select>

                <select
                    className="p-2 border rounded"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                >
                    <option value="">Выберите год</option>
                    {years.map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            </div>

            <Link href={`/pages/result/${selectedMake}/${selectedYear}`}>
                <button
                    className="mt-4 p-2 bg-blue-500 text-white rounded disabled:opacity-50"
                    disabled={!selectedMake || !selectedYear}
                >
                    Далее
                </button>
            </Link>
        </div>
    );
}
