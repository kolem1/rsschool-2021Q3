export default function fetchJson(url) {
  return fetch(url).then((result) => result.json());
}
