import Link from 'next/link';
import { useState, useEffect } from 'react';
import { fetchFundamentalColors } from '../../utils/api';

export default function FundamentalColorList() {
  const [colors, setColors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchFundamentalColors();
        setColors(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div className="header">
        <h1>Fundamental Colors</h1>
        <Link href="/fundamental-colors/new" className="btn-primary">
          Add New
        </Link>
      </div>
      
      <table>
        <thead>
          <tr>
            <th>Color Name</th>
          </tr>
        </thead>
        <tbody>
          {colors.map(color => (
            <tr key={color.id}>
              <td>{color.color_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}