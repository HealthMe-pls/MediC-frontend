/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import "../../styles/global.css";
// import { fetchShopCategory, ShopCategory } from "@/utility/shopcate";
import { fetchMapDetail, MapDetail } from "@/utility/maps";

export default function Map({
  selectedCate,
  setSelectedBlock,
  matchShopID,
  role,
}: {
  selectedCate: number;
  setSelectedBlock: (block: string) => void;
  matchShopID: number;
  role: string;
}) {
  const [mapDetails, setMapDetails] = useState<MapDetail[]>([]);

  useEffect(() => {
    fetchMapDetail()
      .then((data) => setMapDetails(data))
      .catch((error) => console.error("Error fetching map details:", error));
  }, []);

  const points = [
    { name: "A1", top: "81.5%", left: "58%" },
    { name: "A2", top: "79%", left: "66.5%" },
    { name: "A3", top: "75.5%", left: "73%" },
    { name: "A4", top: "70.5%", left: "79%" },
    { name: "A5", top: "65%", left: "84%" },
    { name: "A6", top: "58%", left: "88%" },
    { name: "A7", top: "50.5%", left: "89%" },
    { name: "A8", top: "43%", left: "89%" },
    { name: "A9", top: "36%", left: "88%" },
    { name: "A10", top: "21%", left: "77%" },
    { name: "A11", top: "16%", left: "68%" },
    { name: "A12", top: "13.5%", left: "59%" },
    { name: "A13", top: "13.5%", left: "43%" },
    { name: "A14", top: "15%", left: "36%" },
    { name: "A15", top: "18%", left: "30%" },
    { name: "A16", top: "22%", left: "24%" },
    { name: "A17", top: "26%", left: "20%" },
    { name: "A18", top: "31%", left: "16%" },
    { name: "A19", top: "36%", left: "14%" },
    { name: "A20", top: "41%", left: "12%" },
    { name: "A21", top: "47.5%", left: "12%" },
    { name: "A22", top: "54%", left: "12.5%" },
    { name: "A23", top: "63%", left: "18.5%" },
    { name: "A24", top: "70%", left: "20%" },
    { name: "A25", top: "74%", left: "25%" },
    { name: "A26", top: "78%", left: "32%" },
    { name: "A27", top: "81%", left: "42%" },
    { name: "B1", top: "73.5%", left: "59%" },
    { name: "B2", top: "71%", left: "66%" },
    { name: "B3", top: "66.5%", left: "72.5%" },
    { name: "B4", top: "55%", left: "80%" },
    { name: "B5", top: "48%", left: "82%" },
    { name: "B6", top: "40%", left: "80%" },
    { name: "B7", top: "34%", left: "78%" },
    { name: "B8", top: "21%", left: "43%" },
    { name: "B9", top: "24%", left: "35%" },
    { name: "B10", top: "29%", left: "28%" },
    { name: "B11", top: "34%", left: "24%" },
    { name: "B12", top: "41%", left: "21%" },
    { name: "B13", top: "48%", left: "20.5%" },
    { name: "B14", top: "56%", left: "22%" },
    { name: "B15", top: "62%", left: "25%" },
    { name: "B16", top: "67%", left: "30%" },
    { name: "B17", top: "71%", left: "35%" },
    { name: "B18", top: "73.5%", left: "43%" },
    { name: "C1", top: "69%", left: "57.5%" },
    { name: "C2", top: "66.5%", left: "63.5%" },
    { name: "C3", top: "63%", left: "69%" },
    { name: "C4", top: "54%", left: "75%" },
    { name: "C5", top: "48%", left: "76%" },
    { name: "C6", top: "41%", left: "75%" },
    { name: "C7", top: "36%", left: "72%" },
    { name: "C8", top: "48%", left: "26%" },
    { name: "C9", top: "54%", left: "27.5%" },
    { name: "C10", top: "60%", left: "30%" },
    { name: "C11", top: "64%", left: "34%" },
    { name: "C12", top: "66.5%", left: "38.5%" },
    { name: "C13", top: "69%", left: "45%" },
  ];

  const getStyleForPoint = (
    pointName: string,
    categoryId: number,
    shopId: number | null,
    matchShopID: number
  ) => {
    const specialPoints = [];

    if (shopId === null || shopId === undefined) {
      specialPoints.push(pointName);
    }

    if (role == "admin") {
      if (specialPoints.includes(pointName)) {
        return {
          backgroundColor: "#F0F0F0",
          pointerEvents: "none" as React.CSSProperties["pointerEvents"],
        };
      }
    } else {
        
    }

    let style: React.CSSProperties = {};
    const pointLetter = pointName[0];

    if (shopId === null) {
      style = {
        ...style,
        opacity: 0,
        pointerEvents: "none" as React.CSSProperties["pointerEvents"],
      };
    } else if (matchShopID === 0) {
      if (categoryId === selectedCate || selectedCate === 0) {
        if (pointLetter === "A") {
          style = { ...style, backgroundColor: "#FFEF9E" };
        } else if (pointLetter === "B") {
          style = { ...style, backgroundColor: "#D5EBD6" };
        } else if (pointLetter === "C") {
          style = { ...style, backgroundColor: "#CAE5F3" };
        }
      } else {
        style = { ...style, opacity: 0, pointerEvents: "none" };
      }
    } else {
      if (shopId === matchShopID) {
        if (pointLetter === "A") {
          style = { ...style, backgroundColor: "#FFEF9E" };
        } else if (pointLetter === "B") {
          style = { ...style, backgroundColor: "#D5EBD6" };
        } else if (pointLetter === "C") {
          style = { ...style, backgroundColor: "#CAE5F3" };
        }
      } else {
        style = { ...style, opacity: 0, pointerEvents: "none" };
      }
    }

    return style;
  };

  return (
    // console.log("MapDetails", mapDetails),
    <div className="relative flex justify-center items-center">
      <img
        src="/assets/MarketMap.png"
        alt="Map"
        className="w-full max-w-full max-w-xl h-auto z-0"
      />
      {points.map((point) => {
        const mapDetail = mapDetails.find(
          (detail) => detail.block_name === point.name
        );
        const categoryId = mapDetail?.category_id ?? 0;
        const shopId = mapDetail?.shop_id ?? null;

        return (
          <button
            key={point.name}
            className={`ellipse ${point.name[0].toLowerCase()} sm:cursor-pointer sm:pointer-events-auto pointer-events-none transition-transform`}
            style={{
              top: point.top,
              left: point.left,
              ...getStyleForPoint(point.name, categoryId, shopId, matchShopID),
            }}
            onClick={() => {
              console.log(`Clicked on ${point.name}`);
              setSelectedBlock(point.name);
            }}
          >
            <span className="ellipse-text">{point.name}</span>
          </button>
        );
      })}
    </div>
  );
}
