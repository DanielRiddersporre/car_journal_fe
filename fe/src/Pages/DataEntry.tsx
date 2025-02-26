import React, { useState } from 'react';

interface JournalEntry {
    type: string;
    comment: string;
    date: string;
    distance: number;
    cost: number;
}

interface DataEntryProps {
    addNewEntry: (entry: JournalEntry) => void;
}

function DataEntry({ addNewEntry }: DataEntryProps) {
    const [formData, setFormData] = useState({
        type: 'Tankning',  // Default value for the select
        comment: '',
        date: '',
        distance: '',
        cost: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const { type, comment, date, distance, cost } = formData;
        const entry = {
            type,  // Use the type from the form
            comment,
            date,
            distance: parseFloat(distance),
            cost: parseFloat(cost)
        };

        // Call the DataService method to add the entry to the in-memory state
        addNewEntry(entry);

        // Optionally reset the form (but keep the default type selected)
        setFormData({ type: 'Tankning', comment: '', date: '', distance: '', cost: '' });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <form onSubmit={handleSubmit} className='flex flex-col my-2 grid-cols-1'>
            <select
                name="type"
                value={formData.type}  // Control the value of the select
                onChange={handleChange}
                className='block appearance-none h-15 text-2xl bg-gray-600 rounded my-1 px-2'
            >
                <option value="Tankning">Tankning</option>
                <option value="Service">Service</option>
                <option value="Reparation">Reparation</option>
                <option value="Annat">Annat</option>
            </select>
            <input
                name='comment'
                value={formData.comment}
                onChange={handleChange}
                className='h-15 bg-gray-600 text-2xl my-1 px-2 rounded'
                placeholder='Kommentar'
            />
            <input
                name='date'
                type='date'
                value={formData.date}
                onChange={handleChange}
                className='h-15 text-2xl bg-gray-600 rounded my-1 px-2'
            />
            <input
                name='distance'
                type='number'
                value={formData.distance}
                onChange={handleChange}
                className='h-15 text-2xl bg-gray-600 rounded my-1 px-2'
                placeholder='Mätarställning i km'
            />
            <input
                name='cost'
                type='number'
                value={formData.cost}
                onChange={handleChange}
                className='h-15 text-2xl bg-gray-600 rounded my-1 px-2'
                placeholder='kostnad i kronor'
            />
            <button type="submit" className='h-12 text-xl bg-blue-500 rounded my-1'>
                Spara
            </button>
        </form>
    );
}

export default DataEntry;
