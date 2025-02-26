interface JournalEntry {
  type: string;
  comment: string;
  date: string;
  distance: number;
  cost: number;
}

interface DataPresentationProps {
  entries: JournalEntry[];
}

const DataPresentation: React.FC<DataPresentationProps> = ({ entries }) => {
  return (
    <div>
      <ul>
        {entries.map((entry, index) => (
          <li key={index} className='bg-blue-950 rounded-2xl my-2 px-2 py-1'>
              <span className="text-2xl font-bold">{entry.type}</span>
              <p className="text-blue-500">Kommentar: {entry.comment}</p>
              <p className="text-blue-500">Datum: {entry.date}</p>
              <p className="text-blue-500">Mätarställning: {entry.distance} km</p>
              <p className="text-blue-500">Kostnad: {entry.cost}:-</p>
              <button></button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DataPresentation;
  
