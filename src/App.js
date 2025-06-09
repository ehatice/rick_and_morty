import { useEffect, useState } from 'react';
import { Spin, Empty } from 'antd';
import axios from 'axios';
import CharacterTable from './components/CharacterTable';
import FilterBar from './components/FilterBar';
import portalBg from './assets/Rick_and_Morty_Back.png';


const App = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterName, setFilterName] = useState('');
  const [filterNameInput, setFilterNameInput] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 20,
    total: 0,
  });

  useEffect(() => {
    fetchAllCharacters();
  }, []);

  const fetchAllCharacters = async () => {
    setLoading(true);
    try {
      let allCharacters = [];
      let page = 1;

      while (allCharacters.length < 250) { // en az 250 veri dendiği için 
        const response = await axios.get(`https://rickandmortyapi.com/api/character?page=${page}`);
        allCharacters = [...allCharacters, ...response.data.results];
        page += 1;

        if (!response.data.info.next) {
          break;
        }
      }

      setCharacters(allCharacters);
      setPagination((prev) => ({
        ...prev,
        current: 1,
        total: allCharacters.length,
      }));
    } catch (error) {
      console.error('Hata oluştu:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCharacters = characters.filter((character) => {
    const matchesName = character.name.toLowerCase().includes(filterName.toLowerCase());
    const matchesStatus = filterStatus === 'All' || character.status === filterStatus;
    return matchesName && matchesStatus;
  });

// Eğer filtrelenmiş karakter sayısı azalıp arttıysa current page geçerli mi kontrol et
  useEffect(() => {
    setPagination((prev) => {
      const maxPage = Math.ceil(filteredCharacters.length / prev.pageSize) || 1;
      const newCurrent = Math.min(prev.current, maxPage);
      if (newCurrent === prev.current) return prev;
      return {
        ...prev,
        current: newCurrent,
      };
    });
  }, [filteredCharacters.length]);


  // Status filtresi değiştiğinde pagination'ı başa alıyoruz
  useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      current: 1,
    }));
  }, [filterStatus]);

  return (
    <div
  style={{
    padding: '20px',
    minHeight: '100vh',
    backgroundImage: `url(${portalBg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }}
>
      <h1 style={{ textAlign: 'center', color: 'white' }}>
      WELCOME TO THE RICK AND MORTY CHARACTERS</h1>

      <FilterBar
        filterNameInput={filterNameInput}
        setFilterNameInput={setFilterNameInput}
        onSearch={() => {
          setFilterName(filterNameInput);
          setPagination((prev) => ({
            ...prev,
            current: 1,
          }));
        }}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
      />

      {loading ? (
        <Spin size="large" />
      ) : filteredCharacters.length === 0 ? (
        <Empty description="Sonuç bulunamadı" />
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ maxWidth: '1000px', width: '100%' }}>
            <CharacterTable
              data={filteredCharacters}
              pagination={pagination}
              onPaginationChange={(page, pageSize) => {
                  // Sayfa veya pageSize değiştiğinde pagination state güncelleme
                setPagination((prev) => ({
                  ...prev,
                  current: page,
                  pageSize: pageSize,
                }));
                // Sayfa değişince yukarı scroll 
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
