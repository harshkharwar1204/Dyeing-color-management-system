import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { fetchColorCode } from '../../utils/api';

export default function ColorCodeView() {
  const router = useRouter();
  const { id } = router.query;
  const [colorCode, setColorCode] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      const loadData = async () => {
        try {
          const data = await fetchColorCode(id);
          setColorCode(data);
          setLoading(false);
        } catch (err) {
          setError(err.message);
          setLoading(false);
        }
      };
      loadData();
    }
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!colorCode) return <div>Color code not found</div>;

  return (
    <div>
      <div className="header">
        <h1>Color Code: {colorCode.code}</h1>
        <div>
          <Link href={`/color-codes/${id}/edit`} className="btn-edit">
            Edit
          </Link>
          <Link href="/color-codes" className="btn-secondary">
            Back to List
          </Link>
        </div>
      </div>
      
      {colorCode.parts.map((part, partIndex) => (
        <div key={part.id} className="part">
          <h2>Part {partIndex + 1} - Total KG: {part.total_kg}</h2>
          
          <table>
            <thead>
              <tr>
                <th>Color</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {part.items.map((item, itemIndex) => (
                <tr key={itemIndex}>
                  <td>{item.color_name}</td>
                  <td>{item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}