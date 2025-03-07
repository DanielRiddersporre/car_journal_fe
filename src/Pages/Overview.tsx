import { Outlet, Link } from "react-router-dom";

interface OverviewProps {
    totalFuelCosts: number;
}

const Overview: React.FC<OverviewProps> = ({ totalFuelCosts }) => {
  
    return (
      <div className="bg-blue-950 border-1 border-blue-500 my-2 px-4 py-2 font-bold">
        <span className="font-bold">Total bränslekostnad</span>
        <br />
        <span className="text-3xl">{totalFuelCosts}:-</span>
      </div>
    );
  };

export default Overview;
