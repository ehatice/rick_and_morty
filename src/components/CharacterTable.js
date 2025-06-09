
import { Table } from 'antd';

const CharacterTable = ({ data, pagination, onPaginationChange }) => {
  //table columns tanımlama
  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (text, record) => (
        <img
          src={record.image}
          alt={record.name}
          style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '0' }}
        />
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
  ];

  return (
    <Table
      className="custom-blur-table" //index.css de tanımlanıyoruz
      columns={columns}
      expandable={{
        expandedRowRender: (record) => (
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <img
              src={record.image}
              alt={record.name}
              style={{ width: '150px', borderRadius: '8px' }}
            />
            <div>
              <p><strong>Status:</strong> {record.status}</p>
              <p><strong>Species:</strong> {record.species}</p>
              <p><strong>Gender:</strong> {record.gender}</p>
              <p><strong>Origin:</strong> {record.origin.name}</p>
              <p><strong>Location:</strong> {record.location.name}</p>
              <p><strong>Number of Episodes:</strong> {record.episode.length}</p>
            </div>
          </div>
        ),
      }}
      dataSource={data}
      rowKey="id"
      pagination={{
        current: pagination.current,
        pageSize: pagination.pageSize,
        total: data.length,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '50', '100'],
        onChange: onPaginationChange,
      }}
    />
  );
};

export default CharacterTable;
