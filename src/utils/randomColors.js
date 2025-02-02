const generateRandomColors = (colors) => {
  return Array.from(
    { length: colors },
    () =>
      `hsl(${Math.floor(Math.random() * 360)}, ${50 + Math.random() * 30}%, ${
        40 + Math.random() * 20
      }%)`
  );
};

export default generateRandomColors;
