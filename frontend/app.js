document.addEventListener('DOMContentLoaded', function() {
  // Инициализация API
  const cryptoAPI = new CryptoAPI();
  
  // Источники логотипов для разных криптовалют
  const logoSources = {
      'BTC': [
          'https://assets.coingecko.com/coins/images/1/standard/bitcoin.png',
          'https://s2.coinmarketcap.com/static/img/coins/64x64/1.png',
          'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiNmN2MzMWMiLz4KPHN2ZyB4PSI4IiB5PSI4IiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSI+CjxwYXRoIGQ9Ik0xMS4yIDcuMkgxMC40VjZINy4yVjcuMkg2LjRWOEg3LjJWMTBINi40VjEwLjhINy4yVjEySDEwLjRWMTAuOEgxMS4yVjEwSDEwLjRWOEgxMS4yVjcuMloiIGZpbGw9IndoaXRlIi8+CjwvZz4KPC9zdmc+'
      ],
      'ETH': [
          'https://assets.coingecko.com/coins/images/279/standard/ethereum.png',
          'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
          'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiMzYzNjM2QiLz4KPHN2ZyB4PSI4IiB5PSI4IiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSI+CjxwYXRoIGQ9Ik04IDJMMTMgOEw4IDEwLjVMMy4yIDhMOCAyWiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTMuMiA4LjhMOCAxNEwxMy4yIDguOEw4IDExLjJMMy4yIDguOFoiIGZpbGw9IndoaXRlIi8+CjwvZz4KPC9zdmc+'
      ],
      'TRX': [
          'https://assets.coingecko.com/coins/images/1094/standard/tron-logo.png',
          'https://s2.coinmarketcap.com/static/img/coins/64x64/1958.png',
          'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiNlZjFlMjMiLz4KPHN2ZyB4PSI2IiB5PSI2IiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSI+CjxwYXRoIGQ9Ik0xMCA0TDE2IDEwTDEwIDE2TDQgMTBMMTAgNFoiIGZpbGw9IndoaXRlIi8+CjwvZz4KPC9zdmc+'
      ],
      'DOGE': [
          'https://assets.coingecko.com/coins/images/5/standard/dogecoin.png',
          'https://s2.coinmarketcap.com/static/img/coins/64x64/74.png',
          'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiNjM2E2MzQiLz4KPHN2ZyB4PSI4IiB5PSI4IiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSI+CjxwYXRoIGQ9Ik02IDhIMTBWMTJINlY4WiIgZmlsbD0id2hpdGUiLz4KPC9nPgo8L3N2Zz4='
      ],
      'OM': [
          'https://assets.coingecko.com/coins/images/775/standard/mantraom.png',
          'https://s2.coinmarketcap.com/static/img/coins/64x64/6536.png',
          'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiM0NzQ3NDciLz4KPHN2ZyB4PSI4IiB5PSI4IiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSI+CjxjaXJjbGUgY3g9IjgiIGN5PSI4IiByPSI0IiBmaWxsPSJ3aGl0ZSIvPgo8L2c+Cjwvc3ZnPg=='
      ],
      'MAJOR': [
          'https://www.google.com/url?sa=i&url=https%3A%2F%2Fcoinmarketcap.com%2Fcurrencies%2Fmajor%2F&psig=AOvVaw33rgxPYlwP3_oD34t5M274&ust=1757517249815000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCLCtw4z8y48DFQAAAAAdAAAAABAE',
          'https://s3.coinmarketcap.com/static-gravity/image/3ac20e964db343388e9c0f25a6e4d832.png',
          'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiM0NzQ3NDciLz4KPHN2ZyB4PSI4IiB5PSI4IiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSI+CjxwYXRoIGQ9Ik00IDRMMTIgNC4yVjguOEw0IDEyLjJWNFoiIGZpbGw9IndoaXRlIi8+CjwvZz4KPC9zdmc+'
      ],
      'MOVE': [
          'https://www.google.com/url?sa=i&url=https%3A%2F%2Fcoinmarketcap.com%2Fcurrencies%2Fmovement%2F&psig=AOvVaw3ngq-6VgLNDI2-CIsy3E80&ust=1757517679262000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCLiWuNn9y48DFQAAAAAdAAAAABAE',
          'https://s2.coinmarketcap.com/static/img/coins/200x200/32452.png',
          'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiM0NzQ3NDciLz4KPHN2ZyB4PSI4IiB5PSI4IiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSI+CjxwYXRoIGQ9Ik00IDRMMTIgNC4yVjguOEw0IDEyLjJWNFoiIGZpbGw9IndoaXRlIi8+CjwvZz4KPC9zdmc+'
      ],
      'CATI': [
          'https://www.google.com/url?sa=i&url=https%3A%2F%2Fcoinmarketcap.com%2Fcurrencies%2Fcatizen-on-sol%2F&psig=AOvVaw0aXhWZLJffF9iElQbM1qEy&ust=1757517102797000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCICa98f7y48DFQAAAAAdAAAAABAL',
          'https://s2.coinmarketcap.com/static/img/coins/200x200/33057.png',
          'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiNmNzQxYTQiLz4KPHN2ZyB4PSI4IiB5PSI4IiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSI+CjxjaXJjbGUgY3g9IjYiIGN5PSI2IiByPSIxIiBmaWxsPSJ3aGl0ZSIvPgo8Y2lyY2xlIGN4PSIxMCIgY3k9IjYiIHI9IjEiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik01IDEwSDExQzExIDEyIDkuNSAxMyA4IDEzQzYuNSAxMyA1IDEyIDUgMTBaIiBmaWxsPSJ3aGl0ZSIvPgo8L2c+Cjwvc3ZnPg=='
      ],
      'TAC': [
          'https://www.google.com/url?sa=i&url=https%3A%2F%2Fcoinmarketcap.com%2Fcurrencies%2Ftac-protocol%2F&psig=AOvVaw00uQTi_Kiz5qVod2gV-YP4&ust=1757516681508000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCID-mf35y48DFQAAAAAdAAAAABAE',
          'https://s2.coinmarketcap.com/static/img/coins/200x200/37338.png',
          'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiM0ZDRkNGQiLz4KPHN2ZyB4PSI4IiB5PSI4IiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSI+CjxwYXRoIGQ9Ik02IDRIMTBWMTJINlY0WiIgZmlsbD0id2hpdGUiLz4KPC9nPgo8L3N2Zz4='
      ],
      'NOT': [
          'https://assets.coingecko.com/coins/images/28850/standard/notcoin.jpg',
          'https://s2.coinmarketcap.com/static/img/coins/64x64/28850.png',
          'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiM0NzQ3NDciLz4KPHN2ZyB4PSI4IiB5PSI4IiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSI+CjxjaXJjbGUgY3g9IjgiIGN5PSI4IiByPSI0IiBmaWxsPSJ3aGl0ZSIvPgo8L2c+Cjwvc3ZnPg=='
      ],
      'DOGS': [
          'https://www.google.com/url?sa=i&url=https%3A%2F%2Fcoinmarketcap.com%2Fcurrencies%2Fdogs%2F&psig=AOvVaw2w3sOqXTr_M-XBz1uzgeqb&ust=1757517927834000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCLiaos_-y48DFQAAAAAdAAAAABAE',
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJkGa_tThgjVcDug8Eoprry2xE-_6rc3PWKQ&s',
          'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiNmZjc3M2QiLz4KPHN2ZyB4PSI4IiB5PSI4IiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSI+CjxjaXJjbGUgY3g9IjYiIGN5PSI2IiByPSIxIiBmaWxsPSJ3aGl0ZSIvPgo8Y2lyY2xlIGN4PSIxMCIgY3k9IjYiIHI9IjEiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik01IDEwSDExQzExIDEyIDkuNSAxMyA4IDEzQzYuNSAxMyA1IDEyIDUgMTBaIiBmaWxsPSJ3aGl0ZSIvPgo8L2c+Cjwvc3ZnPg=='
      ],
      'HMSTR': [
          'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.lcx.com%2Fhow-to-buy-hamster-kombat%2F&psig=AOvVaw1BoiYxD71EYM-a9IBu3KLA&ust=1757517802365000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCKiss5X-y48DFQAAAAAdAAAAABAV',
          'https://www.lcx.com/wp-content/uploads/hamster-kombat-token.webp',
          'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiNmZmQ3MDAiLz4KPHN2ZyB4PSI4IiB5PSI4IiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSI+CjxjaXJjbGUgY3g9IjYiIGN5PSI2IiByPSIxIiBmaWxsPSJibGFjayIvPgo8Y2lyY2xlIGN4PSIxMCIgY3k9IjYiIHI9IjEiIGZpbGw9ImJsYWNrIi8+CjxwYXRoIGQ9Ik01IDEwSDExQzExIDEyIDkuNSAxMyA4IDEzQzYuNSAxMyA1IDEyIDUgMTBaIiBmaWxsPSJibGFjayIvPgo8L2c+Cjwvc3ZnPg=='
      ],
      'X': [
          'https://www.google.com/url?sa=i&url=https%3A%2F%2Fcoinmarketcap.com%2Fcurrencies%2Fx-empire%2F&psig=AOvVaw0UgIjnEZuBnemOUVZmNNeI&ust=1757517020200000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCODf_Z77y48DFQAAAAAdAAAAABAE',
          'https://s2.coinmarketcap.com/static/img/coins/200x200/33108.png',
          'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiM0NzQ3NDciLz4KPHN2ZyB4PSI4IiB5PSI4IiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSI+CjxwYXRoIGQ9Ik00IDRMOCA4TDEyIDRNNCAxMkw4IDhMMTIgMTIiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMiIvPgo8L2c+Cjwvc3ZnPg=='
      ],
      'FLOKI': [
          'https://assets.coingecko.com/coins/images/16746/standard/floki.png',
          'https://s2.coinmarketcap.com/static/img/coins/64x64/10804.png',
          'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiM0NzQ3NDciLz4KPHN2ZyB4PSI4IiB5PSI4IiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSI+CjxwYXRoIGQ9Ik00IDZIMTJWMTBINFY2WiIgZmlsbD0id2hpdGUiLz4KPC9nPgo8L3N2Zz4='
      ],
      'XAUT': [
          'https://assets.coingecko.com/coins/images/10481/standard/Tether_Gold.png',
          'https://s2.coinmarketcap.com/static/img/coins/64x64/5176.png',
          'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiNmZmQ3MDAiLz4KPHN2ZyB4PSI4IiB5PSI4IiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSI+CjxjaXJjbGUgY3g9IjgiIGN5PSI4IiByPSI0IiBmaWxsPSJibGFjayIvPgo8L2c+Cjwvc3ZnPg=='
      ],
      'SOL': [
          'https://assets.coingecko.com/coins/images/4128/standard/solana.png',
          'https://s2.coinmarketcap.com/static/img/coins/64x64/5426.png',
          'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiM5OTQ1ZmYiLz4KPHN2ZyB4PSI4IiB5PSI4IiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSI+CjxwYXRoIGQ9Ik00IDEyTDEyIDRWOEw0IDEyWiIgZmlsbD0id2hpdGUiLz4KPC9nPgo8L3N2Zz4='
      ],
      'RENDER': [
          'https://assets.coingecko.com/coins/images/11636/standard/rndr.png',
          'https://s2.coinmarketcap.com/static/img/coins/64x64/5690.png',
          'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiM0NzQ3NDciLz4KPHN2ZyB4PSI4IiB5PSI4IiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSI+CjxwYXRoIGQ9Ik00IDRIMTJWMTJINFY0WiIgZmlsbD0id2hpdGUiLz4KPC9nPgo8L3N2Zz4='
      ],
      'XRP': [
          'https://assets.coingecko.com/coins/images/44/standard/xrp-symbol-white-128.png',
          'https://s2.coinmarketcap.com/static/img/coins/64x64/52.png',
          'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiMyMzI5MmYiLz4KPHN2ZyB4PSI4IiB5PSI4IiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSI+CjxwYXRoIGQ9Ik04IDRMMTIgOEw4IDEyTDQgOEw4IDRaIiBmaWxsPSJ3aGl0ZSIvPgo8L2c+Cjwvc3ZnPg=='
      ],
      'ZRO': [
          'https://www.google.com/url?sa=i&url=https%3A%2F%2Fcoinmarketcap.com%2Fcurrencies%2Flayerzero%2F&psig=AOvVaw11_KWArOhGnSA0v_OX7vyw&ust=1757517455570000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCNCb0e78y48DFQAAAAAdAAAAABAL',
          'https://s2.coinmarketcap.com/static/img/coins/200x200/26997.png',
          'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiM0NzQ3NDciLz4KPHN2ZyB4PSI4IiB5PSI4IiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSI+CjxjaXJjbGUgY3g9IjgiIGN5PSI4IiByPSI0IiBmaWxsPSJ3aGl0ZSIvPgo8L2c+Cjwvc3ZnPg=='
      ],
      'WLD': [
          'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.coinbase.com%2Fen-ca%2Fprice%2Fworldcoin-org&psig=AOvVaw1r8FhBTK2Kfks7QIW81e41&ust=1757517552147000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCMCdzZ79y48DFQAAAAAdAAAAABAE',
          'https://asset-metadata-service-production.s3.amazonaws.com/asset_icons/9e29438684a83b198719c1c408faea92f45c7c22fcadc1148b8bd99b2510a3ac.png',
          'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiM0NzQ3NDciLz4KPHN2ZyB4PSI4IiB5PSI4IiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSI+CjxjaXJjbGUgY3g9IjgiIGN5PSI4IiByPSI0IiBmaWxsPSJ3aGl0ZSIvPgo8L2c+Cjwvc3ZnPg=='
      ],
      'USDT': [
          'https://assets.coingecko.com/coins/images/325/standard/Tether.png',
          'https://s2.coinmarketcap.com/static/img/coins/64x64/825.png',
          'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiMyNmE2OWEiLz4KPHN2ZyB4PSI4IiB5PSI4IiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSI+CjxwYXRoIGQ9Ik02IDRIMTBWMTJINlY0WiIgZmlsbD0id2hpdGUiLz4KPC9nPgo8L3N2Zz4='
      ],
      'XTZ': [
          'https://assets.coingecko.com/coins/images/976/standard/Tezos-logo.png',
          'https://s2.coinmarketcap.com/static/img/coins/64x64/2011.png',
          'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiMyYzY5Yjc1Ii8+CjxzdmcgeD0iOCIgeT0iOCIgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiB2aWV3Qm94PSIwIDAgMTYgMTYiIGZpbGw9Im5vbmUiPgo8cGF0aCBkPSJNNCA2SDEyVjEwSDRWNloiIGZpbGw9IndoaXRlIi8+CjwvZz4KPC9zdmc+'
      ],
      'VAULTA': [
          'https://www.google.com/url?sa=i&url=https%3A%2F%2Fcoinmarketcap.com%2Fcurrencies%2Fvaulta%2F&psig=AOvVaw0CKAvtuDZog3dPXuI-LX4A&ust=1757517311579000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCLiRqar8y48DFQAAAAAdAAAAABAE',
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoZ_7EQoNg1baFT5DlTWFFbG0nhWQs8cMu1A&s',
          'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiM0NzQ3NDciLz4KPHN2ZyB4PSI4IiB5PSI4IiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSI+CjxwYXRoIGQ9Ik00IDYIMTJWMTBINFY2WiIgZmlsbD0id2hpdGUiLz4KPC9nPgo8L3N2Zz4='
      ],
      'XLM': [
          'https://s2.coinmarketcap.com/static/img/coins/200x200/512.pnghttps://www.google.com/url?sa=i&url=https%3A%2F%2Fcoinmarketcap.com%2Fcurrencies%2Fstellar%2F&psig=AOvVaw2S6_pDt_-L3j6Rv6lKyjHz&ust=1757516216476000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCKD0o6D4y48DFQAAAAAdAAAAABAE',
          'https://assets.coingecko.com/coins/images/100/small/Stellar_symbol_black_RGB.png',
          'https://s2.coinmarketcap.com/static/img/coins/64x64/512.png'
      ]
  };

  // Функция для получения логотипа криптовалюты с системой fallback
  function getCoinLogo(symbol) {
      const sources = logoSources[symbol];
      if (!sources) {
          return generateFallbackLogo(symbol);
      }
      
      return new Promise((resolve) => {
          tryLoadImage(sources, 0, resolve, symbol);
      });
  }

  // Рекурсивная функция для попытки загрузки изображений
  function tryLoadImage(sources, index, resolve, symbol) {
      if (index >= sources.length) {
          resolve(generateFallbackLogo(symbol));
          return;
      }
      
      const img = new Image();
      img.onload = () => resolve(sources[index]);
      img.onerror = () => tryLoadImage(sources, index + 1, resolve, symbol);
      img.src = sources[index];
  }

  // Генерация fallback логотипа
  function generateFallbackLogo(symbol) {
      const letter = symbol.charAt(0).toUpperCase();
      const colors = ['#f7931a', '#627eea', '#26a69a', '#ab47bc', '#ef5350'];
      const color = colors[symbol.charCodeAt(0) % colors.length];
      
      const svg = `
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="16" fill="${color}"/>
              <text x="16" y="22" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="14" font-weight="bold">${letter}</text>
          </svg>
      `;
      
      return 'data:image/svg+xml;base64,' + btoa(svg);
  }

  // Данные для верхних карточек (ЖЕСТКО ОГРАНИЧЕНО 3 ЭЛЕМЕНТАМИ)
  let topCards = [
    { symbol: 'BTC', name: 'Bitcoin', price: '9 455 113,27 ₽', change: '+2,91%', chart: 'up' },
    { symbol: 'ETH', name: 'Ethereum', price: '365 832,64 ₽', change: '+3,30%', chart: 'up' },
    { symbol: 'SOL', name: 'Solana', price: '18 274,61 ₽', change: '+3,99%', chart: 'up' }
  ];

  // Загрузка сохраненных карточек из localStorage
  function loadSavedTopCards() {
    const saved = localStorage.getItem('topCards');
    if (saved) {
      try {
        const savedCards = JSON.parse(saved);
        if (Array.isArray(savedCards) && savedCards.length > 0) {
          topCards = savedCards.slice(0, 3);
          return true;
        }
      } catch (e) {
        console.error('Ошибка загрузки сохраненных карточек:', e);
      }
    }
    return false;
  }

  // Сохранение карточек в localStorage
  function saveTopCards() {
    try {
      localStorage.setItem('topCards', JSON.stringify(topCards.slice(0, 3)));
    } catch (e) {
      console.error('Ошибка сохранения карточек:', e);
    }
  }

  // Полный список всех монет из скриншотов (отсортированы по цене от высокой к низкой)
  const coinsListData = [
    { symbol: 'BTC', name: 'Bitcoin', price: '9 455 113,27 ₽', change: '+2,91%' },
    { symbol: 'ETH', name: 'Ethereum', price: '365 832,64 ₽', change: '+3,30%' },
    { symbol: 'XAUT', name: 'Золото', price: '306 405,83 ₽', change: '+2,37%' },
    { symbol: 'SOL', name: 'Solana', price: '18 274,61 ₽', change: '+3,99%' },
    { symbol: 'RENDER', name: 'Render', price: '332,11 ₽', change: '+11,71%' },
    { symbol: 'XRP', name: 'XRP', price: '253,03 ₽', change: '+4,46%' },
    { symbol: 'ZRO', name: 'LayerZero', price: '167,72 ₽', change: '+4,27%' },
    { symbol: 'WLD', name: 'Worldcoin', price: '160,78 ₽', change: '+59,08%' },
    { symbol: 'USDT', name: 'Доллары', price: '83,84 ₽', change: '+2,20%' },
    { symbol: 'XTZ', name: 'Tezos', price: '61,48 ₽', change: '+3,48%' },
    { symbol: 'VAULTA', name: 'Vaulta', price: '39,62 ₽', change: '+2,60%' },
    { symbol: 'XLM', name: 'Stellar', price: '31,91 ₽', change: '+2,47%' },
    { symbol: 'TRX', name: 'TRON', price: '28,30 ₽', change: '+3,62%' },
    { symbol: 'DOGE', name: 'Dogecoin', price: '20,77 ₽', change: '+8,43%' },
    { symbol: 'OM', name: 'MANTRA', price: '18,06 ₽', change: '+2,45%' },
    { symbol: 'MAJOR', name: 'Major', price: '13,34 ₽', change: '+2,50%' },
    { symbol: 'MOVE', name: 'Movement', price: '10,63 ₽', change: '+6,83%' },
    { symbol: 'CATI', name: 'Catizen', price: '7,38 ₽', change: '+3,23%' },
    { symbol: 'TAC', name: 'TAC', price: '0,888 ₽', change: '+1,29%' },
    { symbol: 'NOT', name: 'Notcoin', price: '0,1667 ₽', change: '+1,84%' },
    { symbol: 'DOGS', name: 'Dogs', price: '0,01179 ₽', change: '+4,04%' },
    { symbol: 'HMSTR', name: 'Hamster Kombat', price: '0,0616 ₽', change: '+5,76%' },
    { symbol: 'X', name: 'X Empire', price: '0,00424 ₽', change: '+4,22%' },
    { symbol: 'FLOKI', name: 'FLOKI', price: '0,00818 ₽', change: '+4,52%' }
  ];

  function renderTopCards() {
    const row = document.getElementById('top-cards');
    if (!row) return;
    row.innerHTML = '';
    
    // Берем только первые 3 карточки
    const cardsToRender = topCards.slice(0, 3);
    
    cardsToRender.forEach(async (card) => {
      const el = document.createElement('div');
      el.className = 'card-horizontal';
      const logo = await getCoinLogo(card.symbol);
      
      // Создаем мини-график
      const isUp = card.change.startsWith('+');
      const chartColor = isUp ? '#22c55e' : '#ef4444';
      const chartSvg = `
        <svg class="mini-chart" viewBox="0 0 40 24" fill="none">
          <path d="M2 ${isUp ? '22' : '2'} L8 ${isUp ? '18' : '6'} L14 ${isUp ? '14' : '10'} L20 ${isUp ? '8' : '14'} L26 ${isUp ? '12' : '18'} L32 ${isUp ? '6' : '20'} L38 ${isUp ? '2' : '22'}" 
                stroke="${chartColor}" stroke-width="2" fill="none"/>
          <circle cx="${isUp ? '38' : '2'}" cy="${isUp ? '2' : '22'}" r="2" fill="${chartColor}"/>
        </svg>
      `;
      
      el.innerHTML = `
        <img src="${logo}" class="coin-icon" alt="${card.symbol}" 
             onerror="this.onerror=null; this.src='https://via.placeholder.com/32x32/666/fff?text=${card.symbol}'">
        <div class="coin-title">${card.symbol}</div>
        <div class="coin-price">${card.price}</div>
        <div class="coin-change ${isUp ? 'up' : 'down'}">${card.change}</div>
        <div class="coin-chart">${chartSvg}</div>
      `;
      row.appendChild(el);
    });
  }

  function renderCoinsList(filter = '') {
    const list = document.getElementById('coins-list');
    if (!list) return;
    list.innerHTML = '';
    let coins = coinsListData;
    if (filter.length === 1) {
      coins = coins.filter(coin => coin.symbol[0].toLowerCase() === filter.toLowerCase() || coin.name[0].toLowerCase() === filter.toLowerCase());
    } else if (filter.length > 1) {
      coins = coins.filter(coin => coin.symbol.toLowerCase().includes(filter.toLowerCase()) || coin.name.toLowerCase().includes(filter.toLowerCase()));
    }
    
    let processedCount = 0;
    coins.forEach(async (coin) => {
      const row = document.createElement('div');
      row.className = 'coin-row';
      row.draggable = true;
      
      // Добавляем обработчики drag & drop сразу
      row.addEventListener('dragstart', function(e) {
        const symbol = coin.symbol;
        e.dataTransfer.setData('text/plain', symbol);
        e.dataTransfer.effectAllowed = 'copy';
        this.classList.add('dragging');
      });
      
      row.addEventListener('dragend', function(e) {
        this.classList.remove('dragging');
      });
      
      const changeClass = coin.change.startsWith('+') ? 'up' : 'down';
      const logo = await getCoinLogo(coin.symbol);
      row.innerHTML = `
        <img src="${logo}" class="coin-icon" alt="${coin.symbol}" 
             onerror="this.onerror=null; this.src='https://ui-avatars.com/api/?name=${coin.symbol}&size=44&background=333&color=fff&format=png'">
        <div class="coin-info">
          <div class="coin-title">${coin.name}</div>
          <div class="coin-name">${coin.symbol}</div>
        </div>
        <div class="coin-right">
          <div class="coin-price">${coin.price}</div>
          <div class="coin-change ${changeClass}">${coin.change}</div>
        </div>
      `;
      list.appendChild(row);
    });
  }

  // Поиск
  const searchInput = document.getElementById('search-input');
  const clearButton = document.getElementById('clear-search');
  
  if (searchInput && clearButton) {
    // Показываем/скрываем крестик в зависимости от содержимого
    searchInput.addEventListener('input', function(e) {
      const value = e.target.value;
      clearButton.style.display = value.length > 0 ? 'flex' : 'none';
      renderCoinsList(value);
    });

    // Очистка поля по клику на крестик
    clearButton.addEventListener('click', function() {
      searchInput.value = '';
      clearButton.style.display = 'none';
      renderCoinsList('');
      searchInput.focus();
    });

    // Скрываем крестик при потере фокуса, если поле пустое
    searchInput.addEventListener('blur', function() {
      if (searchInput.value.length === 0) {
        clearButton.style.display = 'none';
      }
    });
  }

  // Вкладки
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', function() {
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      // TODO: фильтрация по вкладке
    });
  });

  // Drag & Drop функциональность
  function initDragAndDrop() {
    const cardsRow = document.querySelector('.cards-row');
    let autoScrollInterval = null;
    
    // Функция автопрокрутки
    function startAutoScroll(clientY) {
      const scrollThreshold = 100; // Область для запуска автоскролла
      const scrollSpeed = 15; // Увеличена скорость с 5 до 15
      
      if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
      }
      
      autoScrollInterval = setInterval(() => {
        const windowHeight = window.innerHeight;
        
        if (clientY < scrollThreshold) {
          // Прокрутка вверх
          window.scrollBy(0, -scrollSpeed);
        } else if (clientY > windowHeight - scrollThreshold) {
          // Прокрутка вниз
          window.scrollBy(0, scrollSpeed);
        } else {
          // Остановка автоскролла
          clearInterval(autoScrollInterval);
          autoScrollInterval = null;
        }
      }, 16); // ~60fps
    }
    
    function stopAutoScroll() {
      if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
        autoScrollInterval = null;
      }
    }
    
    // Настраиваем зону сброса (банеры)
    if (cardsRow) {
      cardsRow.addEventListener('dragover', function(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
        this.classList.add('drag-over');
      });
      
      cardsRow.addEventListener('dragleave', function(e) {
        if (!this.contains(e.relatedTarget)) {
          this.classList.remove('drag-over');
        }
      });
      
      cardsRow.addEventListener('drop', function(e) {
        e.preventDefault();
        this.classList.remove('drag-over');
        stopAutoScroll();
        
        const symbol = e.dataTransfer.getData('text/plain');
        const coinData = coinsListData.find(coin => coin.symbol === symbol);
        
        if (coinData) {
          // Проверяем, есть ли уже такая монета в банерах
          const existingIndex = topCards.findIndex(card => card.symbol === symbol);
          
          if (existingIndex !== -1) {
            showNotification(`${coinData.name} уже в отслеживаемых!`, 'error');
            return;
          }
          
          // Добавляем новую монету в начало массива, старые сдвигаются
          const newCard = {
            symbol: coinData.symbol,
            name: coinData.name,
            price: coinData.price,
            change: coinData.change,
            chart: coinData.change.startsWith('+') ? 'up' : 'down'
          };
          
          // Добавляем в начало и обрезаем до 3 элементов
          topCards.unshift(newCard);
          topCards = topCards.slice(0, 3);
          
          // Сохраняем изменения в localStorage
          saveTopCards();
          
          renderTopCards();
          showNotification(`${coinData.name} добавлен в отслеживаемые!`);
        }
      });
    }
    
    // Добавляем глобальные обработчики для автоскролла
    document.addEventListener('dragover', function(e) {
      if (e.dataTransfer.types.includes('text/plain')) {
        startAutoScroll(e.clientY);
      }
    });
    
    document.addEventListener('dragend', function(e) {
      stopAutoScroll();
    });
  }
  
  // Функция уведомления
  function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    const backgroundColor = type === 'success' ? '#4a90e2' : '#ef4444';
    
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${backgroundColor};
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      z-index: 1000;
      font-size: 14px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      animation: slideIn 0.3s ease;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    }, 2000);
  }
  
  // Добавляем стили для анимации уведомлений
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
      from { transform: translateX(0); opacity: 1; }
      to { transform: translateX(100%); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
  
  // Загрузка реальных данных криптовалют
  async function loadRealCryptoData() {
    try {
      console.log('=== Начало загрузки данных ===');
      const loadingIndicator = document.querySelector('.search-input');
      if (loadingIndicator) {
        loadingIndicator.placeholder = 'Загрузка данных...';
      }

      const realData = await cryptoAPI.getTopCoins(50);
      console.log('Получено данных из API:', realData.length);
      console.log('Первые 5 монет:', realData.slice(0, 5).map(coin => coin.symbol));
      
      coinsListData.length = 0; // Очищаем массив
      coinsListData.push(...realData); // Добавляем новые данные
      console.log('coinsListData обновлен, размер:', coinsListData.length);

      // Проверяем, есть ли сохраненные пользователем карточки
      const hasSavedCards = loadSavedTopCards();
      console.log('Есть сохраненные карточки:', hasSavedCards);
      
      if (hasSavedCards) {
        console.log('Текущие topCards перед обновлением:', topCards.map(card => card.symbol));
        // Обновляем цены сохраненных карточек актуальными данными
        topCards = topCards.map(savedCard => {
          const updatedData = realData.find(coin => coin.symbol === savedCard.symbol);
          if (updatedData) {
            console.log(`Обновляем данные для ${savedCard.symbol}`);
            return {
              ...updatedData,
              chart: updatedData.change.startsWith('+') ? 'up' : 'down'
            };
          }
          console.log(`Данные для ${savedCard.symbol} не найдены в API`);
          return savedCard; // Если данных нет, оставляем старые
        });
      } else {
        console.log('Нет сохраненных карточек, используем топ-3');
        // Если нет сохраненных карточек, используем топ-3 из API
        if (realData.length >= 3) {
          topCards = [
            { ...realData[0], chart: realData[0].change.startsWith('+') ? 'up' : 'down' },
            { ...realData[1], chart: realData[1].change.startsWith('+') ? 'up' : 'down' },
            { ...realData[2], chart: realData[2].change.startsWith('+') ? 'up' : 'down' }
          ];
        }
      }
      
      // Убеждаемся, что массив содержит максимум 3 элемента
      topCards = topCards.slice(0, 3);
      console.log('Финальные topCards:', topCards.map(card => card.symbol));
      console.log('Размер topCards:', topCards.length);

      // Обновляем интерфейс
      renderTopCards();
      renderCoinsList();

      if (loadingIndicator) {
        loadingIndicator.placeholder = 'Поиск';
      }

      console.log('=== Загрузка данных завершена ===');
      console.log('Данные успешно загружены:', realData.length, 'монет');
    } catch (error) {
      console.error('Ошибка загрузки данных:', error);
      
      // Используем fallback данные при ошибке
      const fallbackData = cryptoAPI.getFallbackData();
      coinsListData.length = 0;
      coinsListData.push(...fallbackData);
      renderCoinsList();
    }
  }

  // Функция обновления данных
  function refreshData() {
    cryptoAPI.clearCache();
    loadRealCryptoData();
  }
  
  // Инициализируем drag & drop
  initDragAndDrop();

  // Загружаем сохраненные карточки
  loadSavedTopCards();

  // Первичный рендер
  renderTopCards();
  renderCoinsList();
  
  // Загружаем реальные данные
  loadRealCryptoData();
  
  // Обновляем данные каждые 5 минут
  setInterval(loadRealCryptoData, 5 * 60 * 1000);
});
