"use client"

import { useEffect, useState } from 'react'

type TestEntry = {
    id: number;
    input: string;
    // Add other properties as needed
};

export default function TestEntries() {

    const [testEntries, setEntries] = useState<TestEntry[]>([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTestEntries = async () => {
            try {
                const response = await fetch('../../api/testForm', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
    
                if (response.ok) {
                    const data = await response.json();
                    setEntries(data.testEntries);
                } else {
                    console.error('Failed to fetch test entries');
                }
            } catch (error) {
                console.error('Error fetching test entries:', error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchTestEntries();
    }, []);

    return (
        <div className="bg-gray-400 place-self-center mx-12">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {testEntries.map((entry) => (
                            <tr key={entry.id}>
                                <td>{entry.id}</td>
                                <td>{entry.input}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}