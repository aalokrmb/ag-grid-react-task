import DataGrid from './components/DataGrid';
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import './App.css';

const App = () => {
  return (
    <div className="container">
      <h2>AG Grid React Task</h2>
      <DataGrid />
    </div>
  );
}

export default App;
