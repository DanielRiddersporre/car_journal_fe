import trash from '../assets/trash.png'
import DataService from '../Services/DataService';
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
  
  return (
    <div>
      <ul>
        {entries.map((entry, index) => (
          <li key={index} className='bg-blue-950 rounded-2xl my-2 px-2 py-1'>
              <span className="text-2xl font-bold">{entry.category}</span>
              <p className="text-blue-500">Kommentar: {entry.comment}</p>
              <p className="text-blue-500">Datum: {formatDate(entry.date)}</p>
              <p className="text-blue-500">Mätarställning: {entry.distanceInKilometers} km</p>
              <p className="text-blue-500">Kostnad: {entry.cost}:-</p>
              <button onClick={() => onDelete(entry.id)}><img src={trash} className='w-8 h-8' /></button>
          </li>
        ))}
      </ul>
    </div>
  );
};

function formatDate(date: string){
  let result = date.substring(0,10) 
  return result;
}

export default DataPresentation;
  
