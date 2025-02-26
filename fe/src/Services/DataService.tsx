interface JournalEntryData {
    type: string,
    comment: string,
    date: string,
    distance: number,
    cost: number
}

class DataService {
    static storageKey = 'journalEntries';

    static addEntry(entry: JournalEntryData) {
        const currentEntries = this.getAllEntries();
        currentEntries.push(entry);
        localStorage.setItem(this.storageKey, JSON.stringify(currentEntries));
    }

    static getAllEntries() {
        const savedData = localStorage.getItem(this.storageKey);
        return savedData ? JSON.parse(savedData) : [];
    }
}

export default DataService;



