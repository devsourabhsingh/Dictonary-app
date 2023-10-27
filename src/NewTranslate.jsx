import React, { useState } from "react";
import VolumeUpOutlinedIcon from "@mui/icons-material/VolumeUpOutlined";
import axios from "axios";

const NewTranslate = () => {
  const [newWord, setNewWord] = useState([]);
  const [searchText, setSearchText] = useState();
  const audioRef = React.createRef();

  const fetchPost = async () => {
    try {
      await axios
        .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchText}`)
        .then((response) => {
          setNewWord(response.data);
        });
    } catch (err) {
      console.error(err);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    fetchPost();
  };
  const handleClick = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  return (
    <>
      <div className="d-flex mx-5 my-0">
        <h2>Oxford Learner's Dictionaries</h2>
      </div>
      <nav className="navbar navbar-expand-lg bg-primary mt-3 p-3">
        <div className="container">
          <div
            className="collapse navbar-collapse d-flex justify-content-center"
            id="navbarSupportedContent"
          >
            <form
              className=" d-flex  w-75"
              role="search"
              onSubmit={handleSubmit}
            >
              <div className="select-div">
                <div>English</div>
              </div>
              <input
                className="w-75  p-3"
                type="search"
                placeholder="Search"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                aria-label="Search"
              />

              <button className="btn-light p-3" type="submit">
                <i className="new-icons  bi bi-search"></i>
              </button>
            </form>
          </div>
        </div>
      </nav>

      <div classNameName="new-div">
        <div className="mt-5  me-5">
          {newWord[0]?.word ? (
            <h5 className="head-word">
              Definition of
              <span className="new-dark"> {newWord[0]?.word}</span> from the
              Oxford Advanced Learner's Dictionary
            </h5>
          ) : (
            ""
          )}
        </div>
        <div className="set-new-word">
          {newWord[0]?.word && newWord[0]?.meanings[0]?.partOfSpeech ? (
            <p>
              <span className="span-new-word"> {newWord[0]?.word}</span>{" "}
              <span className="span-grammer">
                {newWord[0]?.meanings[0]?.partOfSpeech}
              </span>
            </p>
          ) : null}
          <div className="d-flex justify-content-center audio-sign">
            {newWord[0]?.phonetics[0]?.audio ? (
              <div>
                <audio ref={audioRef} src={newWord[0]?.phonetics[0]?.audio} />
                <VolumeUpOutlinedIcon
                  onClick={handleClick}
                  style={{ width: "2rem", height: "2rem", cursor: "pointer" }}
                />
              </div>
            ) : null}
            {newWord[0]?.phonetic ? <p>{newWord[0]?.phonetic}</p> : null}
          </div>
        </div>

        <div className="new-grid">
          {newWord?.map((item) =>
            item?.meanings?.map((newItem) => {
              return newItem?.definitions?.map((newTrue, index) => (
                <div className="list-new d-flex">
                  <ul className="unorder">
                    <li key={index}>{newTrue.definition}</li>
                  </ul>
                </div>
              ));
            })
          )}
        </div>
      </div>
    </>
  );
};

export default NewTranslate;
