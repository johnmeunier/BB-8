export const generateARandomColor = () => {
  const colors = ["blue", "green", "red", "pink", "yellow"];
  return colors[Math.floor(Math.random() * colors.length) + 1];
};

export const generateSurname = name => `${name.split("")[0]}${name.slice(-1)}-${name.length - 2}`;
