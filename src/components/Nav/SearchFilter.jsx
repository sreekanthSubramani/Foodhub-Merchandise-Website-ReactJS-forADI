import { useState, useContext, useEffect, useRef } from "react";
import { StoreContext } from "../../Context/StoreContext";
import "./SearchFilter.css";
import { IoCloseOutline } from "react-icons/io5";
import { MdBackspace } from "react-icons/md";
import SearcherState from "./SearcherStateList";

export default function Searcher({ setSearchToggle }) {
  const ref = useRef();
  useEffect(() => {
    ref.current.focus();
  });


  const [searcher, setSearcher] = useState("");
  const [filteredListMap, setFilteredListMap] = useState([]);
  const [forkeyDown, setForKeyDown] = useState(-1);
  const [selectedContext, setSelectedContext] = useState("");


  const { searchFilter } = useContext(StoreContext);
  const arrayOfSearchList = searchFilter.map((getName) => getName.name);

  function handleFilterNames(e) {
    setSearcher(
      e.target.value.slice(0, 1).toUpperCase() +
        e.target.value.slice(1).toLowerCase()
    );

    const filterQuery = e.target.value;
    if (filterQuery.length > 0) {
      const theFilteredArr =
        arrayOfSearchList && arrayOfSearchList.length
          ? arrayOfSearchList.filter((elem) => elem.indexOf(filterQuery) > -1)
          : [];
      setFilteredListMap(theFilteredArr.splice(0,5));
    }

    if (filterQuery.trim() === "") {
      setFilteredListMap([]);
    }
  }

  function handleClear() {
    setSearcher("");
    setFilteredListMap([]);
  }

  function handleElement(context) {
    setSelectedContext(context);
    setSearcher(context);
    setFilteredListMap([]);
  }
  console.log(selectedContext);

  



  function handleKeyEvents(e) {
    if(e.key == "ArrowDown"){
            e.preventDefault();
            setForKeyDown(prev => (prev <  filteredListMap.length - 1 ? prev +  1 : 0 ))      
    }else if(e.key == "ArrowUp"){
      e.preventDefault()
      setForKeyDown(prev => (prev > 0 ? prev - 1 : 0 ));
    }else if(e.key == "Enter"){
        e.preventDefault()
        if(forkeyDown !== -1 && filteredListMap.length > 0){
          handleElement(filteredListMap[forkeyDown])
        }
        
    }    
  }




  return (
    <div className="main-wrap-search">
      <div className="contents-search-bar">
        <IoCloseOutline
          onClick={() => setSearchToggle((prev) => !prev)}
          className="closure-search"
        />
        <div>
          <input
            type="text"
            placeholder="Search for your products...."
            className="input-search"
            ref={ref}
            onChange={(e) => handleFilterNames(e)}
            value={searcher}
            onKeyDown={(e)=>handleKeyEvents(e)}
          />
          <MdBackspace className="backSPace" onClick={()=>handleClear()} />
        </div>


        <div>
          <div className="mapper-search">
            {filteredListMap.map((elem, index) => {
              return (
                <div className={forkeyDown === index ? "every-elements" : "pad-items"}
                  onClick={() => handleElement(elem)}>
                  {elem}
                </div>
              );
            })}
          </div>
          <div>
              <SearcherState stateSelected={searcher} setSearchToggle={setSearchToggle}/>
          </div>
        </div>
      </div>
    </div>
  );
}
