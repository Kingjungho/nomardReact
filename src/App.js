import { useEffect, useState } from 'react'

function App() {
  const [loading, setLoading] = useState(true)
  const [coins, setCoins] = useState([])
  const [dollars, setDollars] = useState('')
  const onChange = e => {
    setDollars(e.target.value)
  }
  const onSubmit = e => {
    e.preventDefault()
    if (dollars === '') {
      return
    }
    setDollars('')
  }
  useEffect(() => {
    fetch('https://api.coinpaprika.com/v1/tickers')
      .then(response => response.json())
      .then(json => setCoins(json))
    setLoading(false)
  }, [])
  return (
    <div>
      <h1>The Coins!{ loading ? "" : `(${coins.length})`}</h1>
      {loading ? <strong>'Loading ...'</strong> : null}
      <form onSubmit={onSubmit}>
        <input
          type="text"
          onChange={onChange}
          value={dollars}
          placeholder="How much money do you have?"
          style={{ width: 220 }}
        />
        <button style={{ marginLeft: 10 }}>Click !</button>
      </form>
      <ul>
        {coins.map(coin => (
          <li key={coin.id}>
            {coin.name} ({coin.symbol}) :{' '}
            {dollars ? dollars / (coin.quotes.USD.price / 42905.07) : 0} BTC
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
