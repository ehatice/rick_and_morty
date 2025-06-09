import React from 'react';
import { Input, Button, Select } from 'antd';

const { Option } = Select;

const FilterBar = ({
  filterNameInput,
  setFilterNameInput,
  onSearch,
  filterStatus,
  setFilterStatus,
}) => {
  return (
    <div
      style={{
        marginBottom: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
      }}
    >
  
      <div style={{ display: 'flex', gap: '10px' }}>
        <Input
          placeholder="Search by name"
          value={filterNameInput}
          onChange={(e) => setFilterNameInput(e.target.value)}
          style={{ width: '200px' }}
        />
        
        <Select
        // Status filtresi seçimi
          value={filterStatus}
          onChange={setFilterStatus}
          style={{ width: '150px' }}
        >
          <Option value="All">Tüm All Statuses</Option>
          <Option value="Alive">Alive</Option>
          <Option value="Dead">Dead</Option>
          <Option value="unknown">Unknown</Option>
        </Select>
      </div>

      <Button type="default" onClick={onSearch}  style={{
    backgroundColor: '#B8E100', 
    color: 'white',
    border: 'none',
    fontWeight: 'bold',
  }}>
        Search
      </Button>
    </div>
  );
};

export default FilterBar;
