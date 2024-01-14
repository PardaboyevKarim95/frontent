async function apiFunc(url, crud) {
  let proms = await fetch(`http://localhost:9090${url}`, crud);

  let data = await proms.json();

  return data;
}
