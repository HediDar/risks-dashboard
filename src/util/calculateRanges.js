export function calculateEndRange(width) {
  if (window.innerWidth < 200) {
    return width * 0.7;
  }

  if (window.innerWidth < 300) {
    return width * 0.75;
  }

  if (window.innerWidth < 400) {
    return width * 0.8;
  }

  if (window.innerWidth < 500) {
    return width * 0.82;
  }

  if (window.innerWidth < 600) {
    return width * 0.8;
  }

  return width * 0.85;
}

export function calculateEndRange2(width) {
  if (window.innerWidth < 200) {
    return width * 0.1;
  }

  if (window.innerWidth < 300) {
    return width * 0.2;
  }

  if (window.innerWidth < 400) {
    return width * 0.3;
  }

  if (window.innerWidth < 600) {
    return width * 0.4;
  }

  if (window.innerWidth < 800) {
    return width * 0.6;
  }

  return width * 0.85;
}

export function calculateMarginLeft(marginLeft) {
  if (window.innerWidth < 300) {
    return marginLeft * 1;
  }

  if (window.innerWidth < 400) {
    return marginLeft * 1.2;
  }

  if (window.innerWidth < 500) {
    return marginLeft * 1.5;
  }

  if (window.innerWidth < 600) {
    return marginLeft * 1.7;
  }

  if (window.innerWidth < 700) {
    return marginLeft * 1.7;
  }

  if (window.innerWidth < 800) {
    return marginLeft * 2;
  }

  if (window.innerWidth < 1000) {
    return marginLeft * 2.2;
  }

  return marginLeft * 2.7;
}
