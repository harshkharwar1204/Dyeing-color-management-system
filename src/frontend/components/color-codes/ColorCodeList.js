import Link from 'next/link';
import { useState, useEffect } from 'react';
import { fetchColorCodes, deleteColorCode } from '../../utils/api';

export default function ColorCodeList() {
  const [colorCodes, setColorCodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchColorCodes();
        setColorCodes(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this color code?')) {
      try {
        await deleteColorCode(id);
        setColorCodes(colorCodes.filter(code => code.id !== id));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div className="header">
        <h1>Color Codes</h1>
        <Link href="/color-codes/new" className="btn-primary">
          Add New
        </Link>
      </div>
      
      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {colorCodes.map(code => (
            <tr key={code.id}>
              <td>
                <Link href={`/color-codes/${code.id}`}>
                  {code.code}
                </Link>
              </td>
              <td className="actions">
                <Link href={`/color-codes/${code.id}/edit`} className="btn-edit">
                  Edit
                </Link>
                <button 
                  onClick={() => handleDelete(code.id)}
                  className="btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}