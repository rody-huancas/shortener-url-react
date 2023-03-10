function getrandom() {
  const random_string =
    Math.random().toString(32).substring(2, 5) +
    Math.random().toString(32).substring(2, 5);
  return random_string;
}

export function add(state, action) {
  const url = action.data;
  const shortUrl = getrandom();
  const temp = [...state.items];

  const newItem = {
    url: url.toString(),
    shortUrl: shortUrl,
    views: 0,
  };

  temp.unshift(newItem);
  localStorage.setItem("urls", JSON.stringify(temp));
  return { items: [...temp] };
}

export function load(state, action) {
  const data = localStorage.getItem("urls");
  if (data) {
    const temp = JSON.parse(data);
    return { items: [...temp] };
  } else {
    // Si no hay datos almacenados, devolver un objeto vacío
    return { items: [] };
  }
}

export function addView(state, action) {
  const data = localStorage.getItem("urls");
  if (data) {
    const items = JSON.parse(data);
    const item = items.find((i) => i.shortUrl === action.data);
    if (item) {
      item.views++;
      localStorage.setItem("urls", JSON.stringify(items));
      return { items: [...items] };
    }
  }
}
