// Services/DataService.ts
interface JournalEntryData {
    id: string;
    category: string;
    comment: string;
    date: string;
    distanceInKilometers: number;
    cost: number;
}

class DataService {
    // Fetch all journal entries
    static async getAllEntries(): Promise<JournalEntryData[]> {
        const response = await fetch('http://localhost:5099/api/journalentry/all');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }

    static async getTotalFuelCosts(): Promise<number> {
        const response = await fetch('http://localhost:5099/api/journalentry/total-fuel-costs');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }

    // Add a new journal entry
    static async addEntry(entry: JournalEntryData): Promise<JournalEntryData> {
        const response = await fetch('http://localhost:5099/api/journalentry/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(entry),
        });
        if (!response.ok) {
            throw new Error('Failed to add entry');
        }
        return response.json();
    }

    static async deleteEntry(id: string){
        const response = await fetch(`http://localhost:5099/api/journalentry/${id}`,{
            method: 'DELETE',
        });
        console.log(response.status);
        if(!response.ok) {
            throw new Error('Failed to delete entry');
        }
    }
}

export default DataService;
