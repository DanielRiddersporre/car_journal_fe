import { useState } from 'react';
import trash from '../assets/trash.png';
import edit from '../assets/edit.png';

interface JournalEntry {
  id: string;
  category: string;
  comment: string;
  date: string;
  distanceInKilometers: number;
  cost: number;
}

interface DataPresentationProps {
  entries: JournalEntry[];
  onDelete: (id: string) => void;
}

const DataPresentation: React.FC<DataPresentationProps> = ({ entries, onDelete }) => {
  // State to track which entry is selected (for toggling visibility)
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleClick = (id: string) => {
    setSelectedId(selectedId === id ? null : id); // Toggle visibility based on selected ID
  };

  return (
    <div>
      <ul>
        {entries.map((entry) => (
          <li key={entry.id} className='bg-blue-950 rounded-2xl my-2 px-2 py-1' onClick={() => handleClick(entry.id)}>
            <span className="text-2xl font-bold">{entry.category}</span>
            <p className="text-blue-500">{formatDate(entry.date)}</p>
            {/* Only show these details if this entry is selected */}
            {selectedId === entry.id && (
                <>
                  <p className="text-blue-500">Kommentar: {entry.comment}</p>
                  <p className="text-blue-500">Mätarställning: {entry.distanceInKilometers} km</p>
                  <p className="text-blue-500">Kostnad: {entry.cost}:-</p>
                  
                  <div className='pt-3'>
                    <button onClick={(e) => { e.stopPropagation(); onDelete(entry.id); }}>
                      <img src={trash} className='w-8 h-8' />
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); console.log("EDIT"); }}>
                      <img src={edit} className='w-6 h-6 my-1 mx-1' />
                    </button>
                  </div>
                </>
              )}
          </li>
        ))}
      </ul>
    </div>
  );
};

function formatDate(date: string) {
  let result = date.substring(0, 10); // Extract the date in YYYY-MM-DD format
  return result;
}

export default DataPresentation;