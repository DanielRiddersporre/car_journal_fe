import { useState, useEffect } from "react";

interface JournalEntryData {
    type: string,
    comment: string,
    date: string,
    distance: number,
    cost: number
}

class DataService {

    getData = () => {

        const [journalEntry, setJournalEntryData] = useState();
    
        useEffect(() => {
            fetch('')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setJournalEntryData(data);
            })
        })
    }
}

export default DataService;
