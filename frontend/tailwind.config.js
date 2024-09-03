// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust according to your project structure
  ],
  theme: {
    extend: {
      fontFamily: {
        matemasie: ["Matemasie", "sans-serif"], // Add this line
        Orbition: ["Orbitron", "san-serif"],
        Righteous: ["Righteous"],
        josafin: ["Josefin Sans"],
        SUSE: ["SUSE"],
        Pacifico: ["Pacifico"],
        Silkscreen: ["Silkscreen"],
      },
      fontSize: {
        "placeholder-sm": "75rem",
      },
    },
  },
  plugins: [],
};
