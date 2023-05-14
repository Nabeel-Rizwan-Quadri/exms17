function DarkMode(data) {
  return {
    type: "darkmode",
    payload: data,
  };
}

function LightMode(data) {
  return {
    type: "lightmode",
    payload: data,
  };
}

export { DarkMode, LightMode };
