import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';
import Navbar from './components/Navbar';

function App() {
    return (
        <Router>
            <Navbar />
            <div className="container">
                <Routes>
                    <Route path="/" element={<EmployeeList />} />
                    <Route path="/employees" element={<EmployeeList />} />
                    <Route path="/add-employee" element={<EmployeeForm />} />
                    <Route path="/edit-employee/:id" element={<EmployeeForm />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
