import { useState, useEffect, useRef } from 'react';

export default function SearchBar({ value, onChange }) {
  const [localValue, setLocalValue] = useState(value);
  const debounceRef = useRef(null);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      onChange(newValue);
    }, 300);
  };

  return (
    <div className="search-bar">
      <span className="search-icon">🔍</span>
      <input
        type="text"
        className="search-input"
        placeholder="Search tasks..."
        value={localValue}
        onChange={handleChange}
      />
      {localValue && (
        <button
          className="search-clear"
          onClick={() => {
            setLocalValue('');
            onChange('');
          }}
        >
          ✕
        </button>
      )}
    </div>
  );
}
