import React, { useState } from 'react';
import { empty } from 'uuidv4';

interface JournalEntry {
    id: string;
    category: string;
    comment: string;
    date: string;
    distanceInKilometers: number;
    cost: number;
}

interface DataEntryProps {
    addNewEntry: (entry: JournalEntry) => void;
}

function DataEntry({ addNewEntry }: DataEntryProps) {

    // Empty UUID to make backend happy...
    const emptyUUID = '00000000-0000-0000-0000-000000000000'

    const [formData, setFormData] = useState({
        id: emptyUUID,
        category: 'Tankning',  // Default value for the select
        comment: '',
        date: '',
        distanceInKilometers: '',
        cost: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const {id, category, comment, date, distanceInKilometers, cost } = formData;
        const entry = {
            id,
            category,  // Use the type from the form
            comment,
            date,
            distanceInKilometers: parseInt(distanceInKilometers),
            cost: parseInt(cost)
        };

        // Call the DataService method to add the entry to the in-memory state
        addNewEntry(entry);

        // Optionally reset the form (but keep the default type selected)
        setFormData({id: emptyUUID, category: 'Tankning', comment: '', date: '', distanceInKilometers: '', cost: '' });
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
                name="category"
                value={formData.category}  // Control the value of the select
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
                name='distanceInKilometers'
                type='number'
                value={formData.distanceInKilometers}
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
