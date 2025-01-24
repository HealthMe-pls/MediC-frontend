import React from 'react';
import '../../styles/global.css';
import Shop from '../../styles/Map.svg'

export default function Map() {
    const points = [
        { name: "A1", top: "82.5%", left: "56%" },
        { name: "A2", top: "80%", left: "65%" },
        { name: "A3", top: "75.5%", left: "75%" },
        { name: "A4", top: "70%", left: "82%" },
        { name: "A5", top: "57%", left: "93%" },
        { name: "A6", top: "49%", left: "95%" },
        { name: "A7", top: "39%", left: "94.5%" },
        { name: "A8", top: "30%", left: "92%" },
        { name: "A9", top: "18%", left: "83%" },
        { name: "A10", top: "12%", left: "73%" },
        { name: "A11", top: "7%", left: "62%" },
        { name: "A12", top: "6.5%", left: "41%" },
        { name: "A13", top: "8%", left: "33%" },
        { name: "A14", top: "11%", left: "25%" },
        { name: "A15", top: "16%", left: "19%" },
        { name: "A16", top: "21%", left: "13%" },
        { name: "A17", top: "27%", left: "9%" },
        { name: "A18", top: "34%", left: "6%" },
        { name: "A19", top: "40.5%", left: "5.5%" },
        { name: "A20", top: "47%", left: "5%" },
        { name: "A21", top: "53%", left: "7%" },
        { name: "A22", top: "63%", left: "12.5%" },
        { name: "A23", top: "70%", left: "18%" },
        { name: "A24", top: "76.5%", left: "26%" },
        { name: "A25", top: "81%", left: "36%" },
        { name: "A26", top: "83%", left: "44%" },
        { name: "B1", top: "74.5%", left: "59%" },
        { name: "B2", top: "70%", left: "67.25%" },
        { name: "B3", top: "65.5%", left: "74.5%" },
        { name: "B4", top: "52.5%", left: "83.5%" },
        { name: "B5", top: "44.5%", left: "85.5%" },
        { name: "B6", top: "36%", left: "84.5%" },
        { name: "B7", top: "29%", left: "82%" },
        { name: "B8", top: "29.5%", left: "20%" },
        { name: "B9", top: "36.5%", left: "16.5%" },
        { name: "B10", top: "45%", left: "15.5%" },
        { name: "B11", top: "52.5%", left: "17.5%" },
        { name: "B12", top: "60%", left: "20.5%" },
        { name: "B13", top: "66%", left: "26.5%" },
        { name: "B14", top: "71%", left: "32.5%" },
        { name: "B15", top: "73.5%", left: "41%" },
        { name: "C1", top: "68%", left: "57%" },
        { name: "C2", top: "66%", left: "65%" },
        { name: "C3", top: "62%", left: "72%" },
        { name: "C4", top: "52%", left: "77.5%" },
        { name: "C5", top: "44.5%", left: "79%" },
        { name: "C6", top: "38%", left: "78%" },
        { name: "C7", top: "32%", left: "76%" },
        { name: "C8", top: "45%", left: "22%" },
        { name: "C9", top: "52%", left: "23%" },
        { name: "C10", top: "58%", left: "27%" },
        { name: "C11", top: "62.5%", left: "31%" },
        { name: "C12", top: "67%", left: "36%" },
        { name: "C13", top: "69%", left: "43.5%" },
    ];

    return (
        <div className="relative flex justify-center items-center">
          {/* Responsive map image */}
          <img
            src="/assets/the_earth_tree.png"
            alt="Map"
            className="w-full max-w-xl h-auto z-0"
          />
          <img
            src="/assets/fork.png"
            alt="fork"
            className="w-full max-w-xl h-auto z-0 forks"
          />
          {points.map((point) => (
            <div
              key={point.name}
              className={`ellipse ${point.name[0].toLowerCase()}`}
              style={{ top: point.top, left: point.left }}
            >
              <span className="ellipse-text">{point.name}</span>
            </div>
          ))}
        </div>
      );
      
}