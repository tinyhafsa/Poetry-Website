import React, { useState, useEffect } from 'react';
import './Library.css';

// custom hook to detect screen width
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(window.matchMedia(query).matches);

  useEffect(() => {
    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
};

const Library = () => {
  // selected authors to be displayed
  const selectedAuthors = [
    "Edgar Allan Poe",
    "Edmund Spenser",
    "Elizabeth Barrett Browning",
    "Emily Dickinson",
    "Gerard Manley Hopkins",
    "Helen Hunt Jackson",
    "John Keats",
    "Joyce Kilmer",
    "Lord Alfred Tennyson",
    "Michael Drayton",
    "Robert Browning",
    "Rupert Brooke",
    "Stephen Crane",
    "William Allingham",
    "William Shakespeare",
  ];

  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [poems, setPoems] = useState([]);
  const [selectedPoem, setSelectedPoem] = useState(null);
  const isTablet = useMediaQuery('(max-width: 768px)'); // detects screen size

  // fetch poems functions
  const fetchPoemsByAuthor = (author) => {
    // updates selcted author
    setSelectedAuthor(author);

    // feyched poem from database by the author
    fetch(`https://poetrydb.org/author/${author}`)    
      .then((response) => response.json()) 
      // filter poems by selected author 
      // exclude poems longer than 25 lines
      .then((data) => {
        const filteredPoems = data
          .filter((poem) => poem.author === author)
          .filter((poem) => poem.lines.length < 25)
          .slice(0, 10);

        // updates filtered list of poems
        setPoems(filteredPoems);
        setSelectedPoem(filteredPoems[0] || null); // default to the first poem
      })
      .catch((error) => console.error('Error fetching poems for author:', error)); // error logging
  };

  // fetch when component loads
  useEffect(() => {
    // fetches poems for the first author when the poem loads
    const firstAuthor = selectedAuthors[0];
    if (firstAuthor) {
      fetchPoemsByAuthor(firstAuthor);
    }
  }, []);

  // poems for selected authors
  const handleAuthorClick = (author) => {
    fetchPoemsByAuthor(author);
  };

  // displays selcted poem
  const handlePoemClick = (poem) => {
    setSelectedPoem(poem);
  };

  // changes list of titles to dropdown menu for smaller screens
  const handleDropdownChange = (e) => {
    const poemTitle = e.target.value;
    const poem = poems.find((p) => p.title === poemTitle);
    setSelectedPoem(poem);
  };

  // component
  return (
    <div className="library" id="poem-library">
      <div className="library-section">
        {/* author section */}
        <div className="author-section">
          {/* author button */}
          {selectedAuthors.map((author) => (
            <button
              key={author}
              onClick={() => handleAuthorClick(author)}
              className={selectedAuthor === author ? 'selected-author-button' : ''}
            >
              {author}
            </button>
          ))}
        </div>

        {/* title section */}
        <div className="title-section">
          {isTablet ? (
            // add class name is tablet screen size or less
            // dropdown menu
            <select
              className="title-dropdown"
              onChange={handleDropdownChange}
              value={selectedPoem?.title || ''}
            >
              <option value="" disabled>Select a poem</option>
              {poems.map((poem) => (
                <option key={poem.title} value={poem.title}>
                  {poem.title}
                </option>
              ))}
            </select>
          ) : (
            // buttons for larger screens
            poems.map((poem) => (
              <button
                key={poem.title}
                onClick={() => handlePoemClick(poem)}
                className={selectedPoem?.title === poem.title ? 'selected-title-button' : ''}
              >
                {poem.title}
              </button>
            ))
          )}
        </div>

        {/* poem content section */}
        <div className="content-section">
          {selectedPoem ? (
            <>
              <h1 className="poem-title">{selectedPoem.title}</h1>
              <h3 className="poem-author">{selectedPoem.author}</h3>
              <p className="poem-content">
                {selectedPoem.lines.map((line, index) => (
                  <React.Fragment key={index}>
                    {line} <br />
                  </React.Fragment>
                ))}
              </p>
            </>
          ) : (
            <p>No poem content available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Library;
