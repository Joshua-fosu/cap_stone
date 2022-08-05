import React, { useState, useEffect } from "react";

export default function FilterFriendsByStartLetter({
  setFilterLetter,
  filterLetter,
}) {
  const [filterLetterArr, setFilterLetterArr] = useState([]);
  const handleLetterClick = (event) => {
    if (event.target.text === "#") {
      setFilterLetter("");
    } else {
      setFilterLetter(event.target.text);
    }
  };

  useEffect(() => {
    const fillFilterLetterArr = () => {
      const alpha = Array.from(Array(26)).map((e, i) => i + 65);
      var alphabet = alpha.map((x) => String.fromCharCode(x));
      alphabet.unshift("#");
      setFilterLetterArr(alphabet);
    };
    fillFilterLetterArr();
  }, []);

  return (
    <>
      <div className="block-title">
        <div className="block-options text-center">
          {filterLetterArr.length
            ? filterLetterArr.map((eachFilterLetter) => (
                <a
                  href="javascript:void(0)"
                  className={
                    filterLetter === eachFilterLetter
                      ? "btn btn-sm btn-alt btn-default btn-activate"
                      : "btn btn-sm btn-alt btn-default"
                  }
                  onClick={handleLetterClick}
                >
                  {eachFilterLetter}
                </a>
              ))
            : ""}
        </div>
      </div>
    </>
  );
}
