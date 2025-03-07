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
  const [totalFuelCosts, setTotalFuelCosts] = useState<number>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTotalFuelCosts = async () => {
      try {
        const totalFuelCosts = await DataService.getTotalFuelCosts();
        setTotalFuelCosts(totalFuelCosts);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    } 
    const fetchEntries = async () => {
      try {
        const fetchedEntries = await DataService.getAllEntries();
        setEntries(fetchedEntries);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTotalFuelCosts();
    fetchEntries();
  }, []);

  const addNewEntry = async (entry: JournalEntry) => {
    try {
      await DataService.addEntry(entry);
      const updatedEntries = await DataService.getAllEntries();
      setEntries(updatedEntries);
    } catch (error: any) {
      setError(error.message);
      console.log(error.message);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await DataService.deleteEntry(id);
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
              <Route index element={<Overview totalFuelCosts={totalFuelCosts} />} />
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
