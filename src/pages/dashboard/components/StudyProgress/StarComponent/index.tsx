import React from 'react';
interface Props {
  x: number;
  height: number;
  maxTickNumber: number;
}
const StarComponent = ({ x, height, maxTickNumber }: Props) => {
  const starLevel = (height / maxTickNumber) * 90;
  return (
    <svg
      width={31}
      height={31}
      x={x - 11}
      y={height - starLevel + 6}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d)">
        <path
          d="M13.9824 25.8227C14.9195 25.2731 16.0805 25.2731 17.0176 25.8227L21.4707 28.4342C23.7521 29.7721 26.5229 27.7177 25.9054 25.146L24.7857 20.482C24.5205 19.3776 24.9018 18.218 25.7708 17.4865L29.4318 14.4049C31.4804 12.6805 30.415 9.33993 27.7463 9.11993L22.7661 8.70938C21.6658 8.61868 20.7042 7.93094 20.2628 6.91897L18.2498 2.30407C17.2026 -0.0966811 13.7974 -0.0966768 12.7502 2.30407L10.7372 6.91897C10.2958 7.93094 9.33423 8.61868 8.23391 8.70938L3.25367 9.11993C0.584991 9.33993 -0.480378 12.6805 1.56821 14.4049L5.22917 17.4865C6.09817 18.218 6.47952 19.3776 6.21435 20.482L5.09458 25.146C4.47714 27.7177 7.24791 29.7721 9.52932 28.4342L13.9824 25.8227Z"
          fill="url(#paint0_radial)"
        />
      </g>
      <defs>
        <filter
          id="filter0_d"
          x="0.496094"
          y="0.503479"
          width="30.0081"
          height="30.3518"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="2" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.942622 0 0 0 0 0.668607 0 0 0 0 0.21242 0 0 0 1 0"
          />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />{' '}
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
        <radialGradient
          id="paint0_radial"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(15.5 17.0732) rotate(52.8705) scale(39.6473 38.9437)"
        >
          <stop stopColor="#FCE26C" />
          <stop offset="1" stopColor="#FEC840" />
        </radialGradient>
      </defs>
    </svg>
  );
};

export default StarComponent;
