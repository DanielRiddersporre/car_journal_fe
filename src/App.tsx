import './App.css';
import DataEntry from './Pages/DataEntry';
import TopBar from './Modules/TopBar';
import DataPresentation from './Pages/DataPresentation';
import Overview from './Pages/Overview';
import { useEffect, useState } from 'react';
import DataService from './Services/DataService';
import { BrowserRouter, Routes, Route } from "react-router-dom";

interface JournalEntry {
  id: string;
  category: string;
  comment: string;
  date: string;
  distanceInKilometers: number;
  cost: number;
}

function App() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch all entries from the DataService when the component mounts
  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const fetchedEntries = await DataService.getAllEntries(); // Ensure getData returns a promise
        setEntries(fetchedEntries);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEntries();
  }, []); // This will only run on the first render (empty dependency array)

  // Function to handle adding a new entry
  const addNewEntry = async (entry: JournalEntry) => {
    try {
      await DataService.addEntry(entry); // Add the entry to the DataService
      const updatedEntries = await DataService.getAllEntries(); // Get the updated entries
      setEntries(updatedEntries); // Update the state to reflect the new entries
    } catch (error: any) {
      setError(error.message);
      console.log(error.message);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await DataService.deleteEntry(id); // Call the DataService to delete the entry
      // Optimistically update the state by filtering out the deleted entry
      setEntries((prevEntries) => prevEntries.filter(entry => entry.id !== id));
    } catch (error: any) {
      setError(error.message);
      console.log(error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
              <Route path="dataEntry" element={<DataEntry addNewEntry={addNewEntry} />} />
              <Route path="dataPresentation" element={<DataPresentation entries={entries} onDelete={handleDelete}/>} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </>
  );
}

export default App;

