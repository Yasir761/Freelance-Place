import ApiError from "./ApiError.js";

const randomColorGenerater = () => {
  let randomColor = "#";
  const colorValue = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f"];

  for (let i = 1; i <= 6; i++) {
    const randomCharIndex = Math.floor(Math.random() * 15)
    randomColor += colorValue[randomCharIndex];
  }

  return randomColor;
};

export const generateProfileByName = (name) => {
  const fillColor = randomColorGenerater();
  if ( !name.trim() )
    throw new ApiError(403, "can't generate image without name");

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <mask id="viewboxMask">
        <rect width="100" height="100" rx="0" ry="0" x="0" y="0"  fill="#ffffff" />
      </mask>
      <g mask="url(#viewboxMask)">
        <rect fill="${fillColor}" width="100" height="100" x="0" y="0" />
        <text
          x="50%"
          y="50%"
          font-family="Arial, sans-serif"
          font-size="50"
          font-weight="400"
          fill="${fillColor.includes("fff") ? "#f00d47" : "#ffffff"}"
          text-anchor="middle"
          dy="17.800"
        >
          ${name} 
        </text>
      </g>
    </svg> `;
};