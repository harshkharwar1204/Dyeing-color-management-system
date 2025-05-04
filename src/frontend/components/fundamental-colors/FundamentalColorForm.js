import { useState } from 'react';
import { useRouter } from 'next/router';
import { createFundamentalColor } from '../../utils/api';

export default function FundamentalColorForm() {
  const router = useRouter();
  const [colorName, setColorName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await createFundamentalColor(colorName);
      router.push('/fundamental-colors');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}

      <div className="form-group">
        <label>Color Name:</label>
        <input
          type="text"
          value={colorName}
          onChange={(e) => setColorName(e.target.value)}
          required
        />
      </div>
      
      <button type="submit" className="btn-primary">
        Create Fundamental Color
      </button>
    </form>
  );
}