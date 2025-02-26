import './App.css';
import DataEntry from './Pages/DataEntry';
import TopBar from './Modules/TopBar';
import DataPresentation from './Pages/DataPresentation';
import Overview from './Pages/Overview';
import { useEffect, useState } from 'react';
import DataService from './Services/DataService';
import { BrowserRouter, Routes, Route } from "react-router-dom";

interface JournalEntry {
  type: string;
  comment: string;
  date: string;
  distance: number;
  cost: number;
}

function App() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);

  // Function to fetch all entries from the DataService when the component mounts
  useEffect(() => {
    const fetchedEntries = DataService.getAllEntries();
    setEntries(fetchedEntries);
  }, []); // This will only run on the first render (empty dependency array)

  // Function to handle adding a new entry
  const addNewEntry = (entry: JournalEntry) => {
    DataService.addEntry(entry); // Add the entry to the DataService
    const updatedEntries = DataService.getAllEntries(); // Get the updated entries
    setEntries(updatedEntries); // Update the state to reflect the new entries
  };

  return (
    <>
      <div className="flex flex-col px-2">
        <div>
          <BrowserRouter>
            <div className="sticky top-0">
              <TopBar />
            </div>
            <Routes>
              <Route index element={<Overview />} />
              <Route path="dataEntry" element={<DataEntry addNewEntry={addNewEntry}/>}/>
              <Route path="dataPresentation" element={<DataPresentation entries={entries} />}  />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </>
  );
}

export default App;
