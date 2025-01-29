"use client";

const Footer = () => {
  return (
    <footer className="bg-white font-lexend h-24 flex items-center justify-center">
      <div>
        <p style={{ fontSize: "18px" }}>SangGaDee Space</p>
        <p style={{ fontSize: "15px", color: "#4C4343" }}>
          San Kamphaeng{" "}
          <span
            className="line"
            style={{
              display: "inline-block",
              width: "100px", // Adjust the length of the line
              borderBottom: "1px solid black", // The line's style
              verticalAlign: "middle", // Align with text
              margin: "0 10px", // Space around the line
            }}
          ></span>{" "}
          Chiang Mai
        </p>
      </div>
    </footer>
  );
};

export default Footer;
