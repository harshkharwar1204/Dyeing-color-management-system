import { useState } from 'react';
import { useRouter } from 'next/router';
import { createColorCode, updateColorCode, fetchFundamentalColors } from '../../utils/api';
import ColorAutocomplete from '../common/ColorAutocomplete';

export default function ColorCodeForm({ initialData = null }) {
  const router = useRouter();
  const [code, setCode] = useState(initialData?.code || '');
  const [parts, setParts] = useState(
    initialData?.parts || [{ items: [], totalKg: '' }]
  );
  const [error, setError] = useState('');

  const addPart = () => {
    setParts([...parts, { items: [], totalKg: '' }]);
  };

  const removePart = (index) => {
    if (parts.length > 1) {
      setParts(parts.filter((_, i) => i !== index));
    }
  };

  const addItem = (partIndex) => {
    const newParts = [...parts];
    newParts[partIndex].items.push({ id: null, color_name: '', quantity: '' });
    setParts(newParts);
  };

  const removeItem = (partIndex, itemIndex) => {
    const newParts = [...parts];
    newParts[partIndex].items = newParts[partIndex].items.filter((_, i) => i !== itemIndex);
    setParts(newParts);
  };

  const handleColorSelect = async (partIndex, itemIndex, searchQuery) => {
    try {
      const colors = await fetchFundamentalColors(searchQuery);
      if (colors.length > 0) {
        const newParts = [...parts];
        newParts[partIndex].items[itemIndex] = {
          id: colors[0].id,
          color_name: colors[0].color_name,
          quantity: newParts[partIndex].items[itemIndex]?.quantity || ''
        };
        setParts(newParts);
      }
    } catch (err) {
      setError('Failed to search colors');
    }
  };

  const handleQuantityChange = (partIndex, itemIndex, value) => {
    const newParts = [...parts];
    newParts[partIndex].items[itemIndex].quantity = value;
    setParts(newParts);
  };

  const handleKgChange = (partIndex, value) => {
    const newParts = [...parts];
    newParts[partIndex].totalKg = value;
    setParts(newParts);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const data = {
        code,
        parts: parts.map(part => ({
          totalKg: part.totalKg,
          items: part.items.filter(item => item.id)
        }))
      };

      if (initialData) {
        await updateColorCode(initialData.id, data);
        router.push(`/color-codes/${initialData.id}`);
      } else {
        await createColorCode(data);
        router.push('/color-codes');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}

      <div className="form-group">
        <label>Code:</label>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
      </div>
      
      {parts.map((part, partIndex) => (
        <div key={partIndex} className="part">
          <h3>Part {partIndex + 1}</h3>
          
          <div className="form-group">
            <label>Total KG:</label>
            <input
              type="number"
              step="0.01"
              value={part.totalKg}
              onChange={(e) => handleKgChange(partIndex, e.target.value)}
              required
            />
          </div>
          
          <h4>Colors:</h4>
          {part.items.map((item, itemIndex) => (
            <div key={itemIndex} className="color-item">
              <input
                type="text"
                value={item.color_name}
                onChange={(e) => handleColorSelect(partIndex, itemIndex, e.target.value)}
                placeholder="Search color..."
                required
              />
              <input
                type="number"
                step="0.01"
                placeholder="Quantity"
                value={item.quantity}
                onChange={(e) => handleQuantityChange(partIndex, itemIndex, e.target.value)}
                required
              />
              <button 
                type="button" 
                onClick={() => removeItem(partIndex, itemIndex)}
                className="btn-danger"
              >
                Remove
              </button>
            </div>
          ))}
          
          <button 
            type="button" 
            onClick={() => addItem(partIndex)}
            disabled={part.items.length >= 10}
          >
            Add Color
          </button>
          
          {parts.length > 1 && (
            <button 
              type="button" 
              onClick={() => removePart(partIndex)}
              className="btn-danger"
            >
              Remove Part
            </button>
          )}
        </div>
      ))}
      
      <button 
        type="button" 
        onClick={addPart}
        disabled={parts.length >= 10}
      >
        Add Part
      </button>
      
      <button type="submit" className="btn-primary">
        {initialData ? 'Update' : 'Create'} Color Code
      </button>
    </form>
  );
}