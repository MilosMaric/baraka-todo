const quoteApiUrlEnv = process.env.QUOTE_API_URL

export const fetchQuote = async () => {
  const response = await fetch(
    quoteApiUrlEnv ?? 'http://api.quotable.io/random?tags=motivational&limit=10'
  )
  const data = await response.json()
  return data.content
}
