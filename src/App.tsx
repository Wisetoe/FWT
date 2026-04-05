import { useState, useEffect } from 'react'
import styles from './App.module.scss'

import Light from './assets/light_icon.svg'
import LogoLi from './assets/logo.svg'
import LogoDk from './assets/logo-dark.svg'
import Dark from './assets/dark_icon.svg'
import Search from './assets/search.svg'
import SearchDk from './assets/search-dark.svg'
import Filter from './assets/filter_icon.svg'
import FilterLi from './assets/filter-dark.svg'
import Left from './assets/arrow-left.svg'
import Right from './assets/arrow-right.svg'
import Close from './assets/close_icon.svg'
import CloseDk from './assets/close_icon_dk.svg'
import Arrow from "./assets/arrow.svg" 

import { useFilters } from './hooks/useFilter';
import { usePagination } from './hooks/usePagination';
import { useSearch } from './hooks/useSearch';
import { useFilterMenu } from './hooks/useFilterMenu';
import { useFetchPaintings } from './hooks/usePainting';
import { useTriggerFetch } from './hooks/useTrigger';
import { useAuthorsAndLocations } from './hooks/useListFilter';

function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const { searchQuery, handleSearchChange } = useSearch();
  const { artistId, locationId, yearFrom, yearTo, setArtistId, setLocationId, setYearFrom, setYearTo, handleClear } = useFilters();
  const { currentPage, setCurrentPage, getPaginationItems } = usePagination();
  const { isFilterOpen, openSections, toggleFilter, toggleSection } = useFilterMenu();
  const { triggerFetch, handleShowResults } = useTriggerFetch();
  const { authors, locations } = useAuthorsAndLocations();
  const [isArtistOpen, setIsArtistOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const { post, totalPages, limit } = useFetchPaintings(
    currentPage, searchQuery, artistId, locationId, yearFrom, yearTo, triggerFetch
  );

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const onClear = () => {
    handleClear();
    setCurrentPage(1);
    handleShowResults();
  };

  const onShowResults = () => {
    setCurrentPage(1);
    handleShowResults();
    toggleFilter();
  };

  return (
    <>
      <header>
        <img src={theme === 'light' ? LogoDk : LogoLi} alt="" className={styles.logo} />
        <div className={styles.light}>
            <img src={theme === 'light' ? Dark : Light} alt="" onClick={toggleTheme}/>
        </div>
      </header>

      <main>    
        <div className={styles.filter_search_bar}>
          <div className={styles.searchWrapper}>
            <img src={theme === 'light' ? Search : SearchDk} alt="" />
            <input 
              type="text" 
              placeholder="Painting title" 
              value={searchQuery}
              onChange={handleSearchChange}
              className={styles.searchInput}
            />
          </div>
          <img 
            src={theme === 'light' ? Filter : FilterLi} 
            alt="Filter" 
            className={styles.filter} 
            onClick={toggleFilter}
          />
        </div>

        <div className={`${styles.sideMenu} ${isFilterOpen ? styles.open : ''}`}>
          <div className={styles.menuHeader}>
            <img src={theme === 'light' ? Close : CloseDk} onClick={toggleFilter} alt="Close" className={styles.closeIcon} />
          </div>
          
          <div className={styles.filterSection}>
            <div className={styles.filterGroup} onClick={() => toggleSection('artist')}>
              <span>ARTIST</span>
              <span className={styles.plus}>{openSections.artist ? '−' : '+'}</span>
            </div>
            
            {openSections.artist && (
              <div className={styles.dropdownContent}>
                <div className={styles.customSelectWrapper}>
                  <div 
                    className={`${styles.filterInput} ${isArtistOpen ? styles.open : ''}`} 
                    onClick={() => setIsArtistOpen(!isArtistOpen)}
                  >
                    <span>{authors.find(a => String(a.id) === artistId)?.name || "Select the artist"}</span>
                    <img src={Arrow} alt="" />
                  </div>
                  
                  {isArtistOpen && (
                    <div className={styles.optionsList}>
                      {authors.map(author => (
                        <div 
                          key={author.id} 
                          className={styles.optionItem}
                          onClick={() => {
                            setArtistId(String(author.id));
                            setIsArtistOpen(false);
                          }}
                        >
                          {author.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className={styles.filterSection}>
            <div className={styles.filterGroup} onClick={() => toggleSection('location')}>
              <span>LOCATION</span>
              <span className={styles.plus}>{openSections.location ? '−' : '+'}</span>
            </div>
            
            {openSections.location && (
              <div className={styles.dropdownContent}>
                <div className={styles.customSelectWrapper}>
                  <div 
                    className={`${styles.filterInput} ${isLocationOpen ? styles.open : ''}`} 
                    onClick={() => setIsLocationOpen(!isLocationOpen)}
                  >
                    <span>{locations.find(l => String(l.id) === locationId)?.location || "Select the location"}</span>
                    <img src={Arrow} alt="" />
                  </div>
                  
                  {isLocationOpen && (
                    <div className={styles.optionsList}>
                      {locations.map(loc => (
                        <div 
                          key={loc.id} 
                          className={styles.optionItem}
                          onClick={() => {
                            setLocationId(String(loc.id));
                            setIsLocationOpen(false); 
                          }}
                        >
                          {loc.location}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className={styles.filterSection}>
            <div className={styles.filterGroup} onClick={() => toggleSection('years')}>
              <span>YEARS</span>
              <span className={styles.plus}>{openSections.years ? '−' : '+'}</span>
            </div>
            {openSections.years && (
              <div className={styles.yearsInputGroup}>
                <input 
                  type="number"
                  placeholder="From" 
                  className={styles.yearInput}
                  value={yearFrom}
                  onChange={(e) => setYearFrom(e.target.value)}
                />
                <span className={styles.separator}>—</span>
                <input 
                  type="number" 
                  placeholder="To" 
                  className={styles.yearInput}
                  value={yearTo}
                  onChange={(e) => setYearTo(e.target.value)}
                />
              </div>
            )}
          </div>
        
          <div className={styles.menuFooter}>
            <button className={styles.showResults} onClick={onShowResults}>SHOW THE RESULTS</button>
            <button className={styles.clear} onClick={onClear}>CLEAR</button>
          </div>
        </div>

        {post.length > 0 ? (
          <div>
            <div className={styles.content}>
              {post.map((item) => {
                const authorName = authors.find(a => a.id === item.authorId)?.name;
                const locationName = locations.find(l => l.id === item.locationId)?.location;

                return(
                  <div key={item.id} className={styles.card}>
                    <img src={`https://test-front.framework.team${item.imageUrl}`} alt={item.name} className={styles.paint}/>

                    <div className={styles.infoWrapper}>
                      <div className={styles.mainInfo}>
                        <span className={styles.name}>{item.name}</span>
                        <span className={styles.year}>{item.created}</span>
                      </div>

                      <div className={styles.hoverInfo}>
                        <span className={styles.name}>{authorName}</span>
                        <span className={styles.year}>{locationName}</span>
                      </div>
                    </div>

                    <div className={styles.arrowBox}>
                      <span>→</span>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className={styles.pagination}>
              <button 
                disabled={currentPage === 1} 
                onClick={() => setCurrentPage(prev => prev - 1)}
                className={styles.arrow}
              >
                <img src={Left} alt="prev" />
              </button>

              {getPaginationItems(totalPages, currentPage).map((item, index) => (
                <button
                  key={index}
                  disabled={item === '...'}
                  className={currentPage === item ? styles.activePage : styles.pageBtn}
                  onClick={() => typeof item === 'number' && setCurrentPage(item)}
                >
                  {item}
                </button>
              ))}

              <button 
                disabled={currentPage === totalPages} 
                onClick={() => setCurrentPage(prev => prev + 1)}
                className={styles.arrow}
              >
                <img src={Right} alt="next" />
              </button>
            </div>
          </div>
        ) : (
          <div className={styles.noresult}>
            <span>No matches for <b>{searchQuery}</b></span>
            <p>Please try again with a different spelling or keywords.</p>
          </div>
        )}
      </main>
    </>
  )
}

export default App