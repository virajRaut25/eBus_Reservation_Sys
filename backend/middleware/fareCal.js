const fareCal = (tKm) => {
  let fare = 0;
  if (60 < tKm && tKm <= 120) {
    tKm /= 2;
    div = 2;
  } else if (120 < tKm && tKm <= 240) {
    tKm /= 4;
    div = 4;
  } else if (240 < tKm && tKm <= 360) {
    tKm /= 6;
    div = 6;
  } else if (360 < tKm && tKm <= 480) {
    tKm /= 8;
    div = 8;
  } else if (480 < tKm && tKm <= 600) {
    tKm /= 10;
    div = 10;
  }
  for (let i = 0; i < div; i++) {
    if (tKm <= 10) {
      fare += 20;
    } else if (10 < tKm && tKm <= 20) {
      fare += 25;
    } else if (20 < tKm && tKm <= 30) {
      fare += 40;
    } else if (30 < tKm && tKm <= 40) {
      fare += 45;
    } else if (40 < tKm && tKm <= 50) {
      fare += 55;
    } else if (50 > tKm && tKm <= 60) {
      fare += 60;
    }
  }
  return fare;
};

module.exports = fareCal;
