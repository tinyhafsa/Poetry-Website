import React, { useEffect, useState } from 'react'
import './Poem.css'
import image1 from '/src/assets/image1.png'
import image2 from '/src/assets/image2.png'


const Poem = () => {

    // API HANDLING 
    const [randomPoemData, setRandomPoemData] = useState (null);

    // FETCH RANDOM POEM - FUNCTION
    const fetchRandomPoem = async () => {
        try {
          const url = `https://poetrydb.org/random/5`; // fetch 5 random poems
      
          const response = await fetch(url);
          const data = await response.json();
      
          // find a poem with 15 lines or less
          const suitablePoem = data.find(poem => poem.linecount <= 30);
      
          if (suitablePoem) {
            setRandomPoemData(suitablePoem);
          } else {
            // fetch again if no suitable poem is found
            fetchRandomPoem();
          }
        } catch (error) {
          console.error('Error fetching random poem:', error);
        }
      };

    useEffect (() => {
        fetchRandomPoem();
    }, []);

    // RANDOM POEM SECTION DISPLAY
  return (
    <div className='poem' id='random-poem'>

        <div className='poem-section'>

            {/* image 1 - left side*/}
            <div className='poem-image'>
                <img src={image1} alt="" />
            </div>

            {/* poem section */}
            <div className='one-poem'>

                {/* poem title */}
                <div className='poem-title'>
                    <h1 className='title'>{randomPoemData?.title || 'Loading...'}</h1>      
                </div>

                {/* poem author */}
                <div className='poem-author'>
                    <h3 className='author'>{randomPoemData?.author || 
                    'Loading...'}</h3>
                </div>

                {/* poem lines */}
                <div className='poem-content'>
                    <p className='lines'>
                        {randomPoemData?.lines ? (
                            randomPoemData.lines.map((line, index) => (
                                <React.Fragment key={index}>
                                    {line} <br />
                                </React.Fragment>
                            ))
                        ) : (
                            'Loading...'
                        )}
                    </p>
                </div>

                {/* fetch random poem button */}
                <div className='poem-button'>
                    <button onClick={fetchRandomPoem}>Random</button>
                </div>
            </div>
            
            {/* image 2 - right side */}
            <div className='poem-image'>
                <img src={image2} alt="" />
            </div>
        </div>
    </div>
  )
}

export default Poem
