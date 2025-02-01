export const fetchQuote = async () => {
  const response = await fetch('http://api.quotable.io/random?tags=motivational&limit=10')
  const data = await response.json()
  return data.content
}
