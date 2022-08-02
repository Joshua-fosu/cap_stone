import React from "react";

export default function FilterFriendsByStartLetter({
  setFilterLetter,
  filterLetter,
}) {
  const handleLetterClick = (event) => {
    setFilterLetter(event.target.text);
  };

  return (
    <>
      <div className="block-title">
        <div className="block-options text-center">
          <a
            href="javascript:void(0)"
            className={
              filterLetter === ""
                ? "btn btn-sm btn-alt btn-default btn-activate"
                : "btn btn-sm btn-alt btn-default"
            }
            onClick={() => {
              setFilterLetter("");
            }}
          >
            #
          </a>
          <a
            href="javascript:void(0)"
            className={
              filterLetter === "A"
                ? "btn btn-sm btn-alt btn-default btn-activate"
                : "btn btn-sm btn-alt btn-default"
            }
            onClick={handleLetterClick}
          >
            A
          </a>
          <a
            href="javascript:void(0)"
            className={
              filterLetter === "B"
                ? "btn btn-sm btn-alt btn-default btn-activate"
                : "btn btn-sm btn-alt btn-default"
            }
            onClick={handleLetterClick}
          >
            B
          </a>
          <a
            href="javascript:void(0)"
            className={
              filterLetter === "C"
                ? "btn btn-sm btn-alt btn-default btn-activate"
                : "btn btn-sm btn-alt btn-default"
            }
            onClick={handleLetterClick}
          >
            C
          </a>
          <a
            href="javascript:void(0)"
            className={
              filterLetter === "D"
                ? "btn btn-sm btn-alt btn-default btn-activate"
                : "btn btn-sm btn-alt btn-default"
            }
            onClick={handleLetterClick}
          >
            D
          </a>
          <a
            href="javascript:void(0)"
            className={
              filterLetter === "E"
                ? "btn btn-sm btn-alt btn-default btn-activate"
                : "btn btn-sm btn-alt btn-default"
            }
            onClick={handleLetterClick}
          >
            E
          </a>
          <a
            href="javascript:void(0)"
            className={
              filterLetter === "F"
                ? "btn btn-sm btn-alt btn-default btn-activate"
                : "btn btn-sm btn-alt btn-default"
            }
            onClick={handleLetterClick}
          >
            F
          </a>
          <a
            href="javascript:void(0)"
            className={
              filterLetter === "G"
                ? "btn btn-sm btn-alt btn-default btn-activate"
                : "btn btn-sm btn-alt btn-default"
            }
            onClick={handleLetterClick}
          >
            G
          </a>
          <a
            href="javascript:void(0)"
            className={
              filterLetter === "H"
                ? "btn btn-sm btn-alt btn-default btn-activate"
                : "btn btn-sm btn-alt btn-default"
            }
            onClick={handleLetterClick}
          >
            H
          </a>
          <a
            href="javascript:void(0)"
            className={
              filterLetter === "I"
                ? "btn btn-sm btn-alt btn-default btn-activate"
                : "btn btn-sm btn-alt btn-default"
            }
            onClick={handleLetterClick}
          >
            I
          </a>
          <a
            href="javascript:void(0)"
            className={
              filterLetter === "J"
                ? "btn btn-sm btn-alt btn-default btn-activate"
                : "btn btn-sm btn-alt btn-default"
            }
            onClick={handleLetterClick}
          >
            J
          </a>
          <a
            href="javascript:void(0)"
            className={
              filterLetter === "K"
                ? "btn btn-sm btn-alt btn-default btn-activate"
                : "btn btn-sm btn-alt btn-default"
            }
            onClick={handleLetterClick}
          >
            K
          </a>
          <a
            href="javascript:void(0)"
            className={
              filterLetter === "L"
                ? "btn btn-sm btn-alt btn-default btn-activate"
                : "btn btn-sm btn-alt btn-default"
            }
            onClick={handleLetterClick}
          >
            L
          </a>
          <a
            href="javascript:void(0)"
            className={
              filterLetter === "M"
                ? "btn btn-sm btn-alt btn-default btn-activate"
                : "btn btn-sm btn-alt btn-default"
            }
            onClick={handleLetterClick}
          >
            M
          </a>
          <a
            href="javascript:void(0)"
            className={
              filterLetter === "N"
                ? "btn btn-sm btn-alt btn-default btn-activate"
                : "btn btn-sm btn-alt btn-default"
            }
            onClick={handleLetterClick}
          >
            N
          </a>
          <a
            href="javascript:void(0)"
            className={
              filterLetter === "O"
                ? "btn btn-sm btn-alt btn-default btn-activate"
                : "btn btn-sm btn-alt btn-default"
            }
            onClick={handleLetterClick}
          >
            O
          </a>
          <a
            href="javascript:void(0)"
            className={
              filterLetter === "P"
                ? "btn btn-sm btn-alt btn-default btn-activate"
                : "btn btn-sm btn-alt btn-default"
            }
            onClick={handleLetterClick}
          >
            P
          </a>
          <a
            href="javascript:void(0)"
            className={
              filterLetter === "Q"
                ? "btn btn-sm btn-alt btn-default btn-activate"
                : "btn btn-sm btn-alt btn-default"
            }
            onClick={handleLetterClick}
          >
            Q
          </a>
          <a
            href="javascript:void(0)"
            className={
              filterLetter === "R"
                ? "btn btn-sm btn-alt btn-default btn-activate"
                : "btn btn-sm btn-alt btn-default"
            }
            onClick={handleLetterClick}
          >
            R
          </a>
          <a
            href="javascript:void(0)"
            className={
              filterLetter === "S"
                ? "btn btn-sm btn-alt btn-default btn-activate"
                : "btn btn-sm btn-alt btn-default"
            }
            onClick={handleLetterClick}
          >
            S
          </a>
          <a
            href="javascript:void(0)"
            className={
              filterLetter === "T"
                ? "btn btn-sm btn-alt btn-default btn-activate"
                : "btn btn-sm btn-alt btn-default"
            }
            onClick={handleLetterClick}
          >
            T
          </a>
          <a
            href="javascript:void(0)"
            className={
              filterLetter === "V"
                ? "btn btn-sm btn-alt btn-default btn-activate"
                : "btn btn-sm btn-alt btn-default"
            }
            onClick={handleLetterClick}
          >
            V
          </a>
          <a
            href="javascript:void(0)"
            className={
              filterLetter === "U"
                ? "btn btn-sm btn-alt btn-default btn-activate"
                : "btn btn-sm btn-alt btn-default"
            }
            onClick={handleLetterClick}
          >
            U
          </a>
          <a
            href="javascript:void(0)"
            className={
              filterLetter === "W"
                ? "btn btn-sm btn-alt btn-default btn-activate"
                : "btn btn-sm btn-alt btn-default"
            }
            onClick={handleLetterClick}
          >
            W
          </a>
          <a
            href="javascript:void(0)"
            className={
              filterLetter === "X"
                ? "btn btn-sm btn-alt btn-default btn-activate"
                : "btn btn-sm btn-alt btn-default"
            }
            onClick={handleLetterClick}
          >
            X
          </a>
          <a
            href="javascript:void(0)"
            className={
              filterLetter === "Y"
                ? "btn btn-sm btn-alt btn-default btn-activate"
                : "btn btn-sm btn-alt btn-default"
            }
            onClick={handleLetterClick}
          >
            Y
          </a>
          <a
            href="javascript:void(0)"
            className={
              filterLetter === "Z"
                ? "btn btn-sm btn-alt btn-default btn-activate"
                : "btn btn-sm btn-alt btn-default"
            }
            onClick={handleLetterClick}
          >
            Z
          </a>
        </div>
      </div>
    </>
  );
}
