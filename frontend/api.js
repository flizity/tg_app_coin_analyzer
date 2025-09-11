// API для получения реальных данных криптовалют

class CryptoAPI {
    constructor() {
        this.baseURL = 'https://api.coingecko.com/api/v3';
        this.cache = new Map();
        this.cacheExpiration = 5 * 60 * 1000; // 5 минут
    }

    // Получить список топ криптовалют
    async getTopCoins(limit = 100) {
        const cacheKey = `top-coins-${limit}`;
        
        if (this.isValidCache(cacheKey)) {
            return this.cache.get(cacheKey).data;
        }

        try {
            const response = await fetch(
                `${this.baseURL}/coins/markets?vs_currency=rub&order=market_cap_desc&per_page=${limit}&page=1&sparkline=true&price_change_percentage=24h`
            );
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            const processedData = this.processCoinsData(data);
            
            this.cache.set(cacheKey, {
                data: processedData,
                timestamp: Date.now()
            });
            
            return processedData;
        } catch (error) {
            console.error('Ошибка получения данных:', error);
            return this.getFallbackData();
        }
    }

    // Получить данные конкретной монеты
    async getCoinDetails(coinId) {
        const cacheKey = `coin-${coinId}`;
        
        if (this.isValidCache(cacheKey)) {
            return this.cache.get(cacheKey).data;
        }

        try {
            const response = await fetch(
                `${this.baseURL}/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=true`
            );
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            const processedData = this.processCoinDetails(data);
            
            this.cache.set(cacheKey, {
                data: processedData,
                timestamp: Date.now()
            });
            
            return processedData;
        } catch (error) {
            console.error('Ошибка получения данных монеты:', error);
            return null;
        }
    }

    // Обработка данных списка монет
    processCoinsData(data) {
        return data.map(coin => ({
            symbol: coin.symbol.toUpperCase(),
            name: coin.name,
            price: this.formatPrice(coin.current_price),
            change: this.formatChange(coin.price_change_percentage_24h),
            marketCap: coin.market_cap,
            volume: coin.total_volume,
            image: coin.image,
            sparkline: coin.sparkline_in_7d?.price || [],
            rank: coin.market_cap_rank
        }));
    }

    // Обработка детальных данных монеты
    processCoinDetails(data) {
        const marketData = data.market_data;
        return {
            symbol: data.symbol.toUpperCase(),
            name: data.name,
            price: this.formatPrice(marketData.current_price.rub),
            change: this.formatChange(marketData.price_change_percentage_24h),
            marketCap: marketData.market_cap.rub,
            volume: marketData.total_volume.rub,
            high24h: this.formatPrice(marketData.high_24h.rub),
            low24h: this.formatPrice(marketData.low_24h.rub),
            image: data.image.large,
            description: data.description.en,
            sparkline: marketData.sparkline_7d?.price || []
        };
    }

    // Форматирование цены
    formatPrice(price) {
        if (price >= 1000000) {
            return new Intl.NumberFormat('ru-RU', {
                style: 'currency',
                currency: 'RUB',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).format(price);
        } else if (price >= 1) {
            return new Intl.NumberFormat('ru-RU', {
                style: 'currency',
                currency: 'RUB',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }).format(price);
        } else {
            return new Intl.NumberFormat('ru-RU', {
                style: 'currency',
                currency: 'RUB',
                minimumFractionDigits: 4,
                maximumFractionDigits: 6
            }).format(price);
        }
    }

    // Форматирование изменения цены
    formatChange(change) {
        if (change === null || change === undefined) return '0,00%';
        const sign = change >= 0 ? '+' : '';
        return `${sign}${change.toFixed(2)}%`;
    }

    // Проверка валидности кеша
    isValidCache(key) {
        const cached = this.cache.get(key);
        if (!cached) return false;
        return (Date.now() - cached.timestamp) < this.cacheExpiration;
    }

    // Fallback данные при ошибке API
    getFallbackData() {
        return [
            { symbol: 'BTC', name: 'Bitcoin', price: '9 455 113,27 ₽', change: '+2,91%', sparkline: [] },
            { symbol: 'ETH', name: 'Ethereum', price: '365 832,64 ₽', change: '+3,30%', sparkline: [] },
            { symbol: 'SOL', name: 'Solana', price: '18 274,61 ₽', change: '+3,99%', sparkline: [] },
            { symbol: 'RENDER', name: 'Render', price: '332,11 ₽', change: '+11,71%', sparkline: [] }
        ];
    }

    // Получить маппинг символов на ID CoinGecko
    getSymbolToIdMap() {
        return {
            'BTC': 'bitcoin',
            'ETH': 'ethereum',
            'TRX': 'tron',
            'DOGE': 'dogecoin',
            'OM': 'mantra-dao',
            'NOT': 'notcoin',
            'DOGS': 'dogs-2',
            'HMSTR': 'hamster-kombat',
            'SOL': 'solana',
            'RENDER': 'render-token',
            'XRP': 'ripple',
            'ZRO': 'layerzero',
            'WLD': 'worldcoin-wld',
            'USDT': 'tether',
            'XTZ': 'tezos',
            'XLM': 'stellar',
            'FLOKI': 'floki',
            'XAUT': 'tether-gold'
        };
    }

    // Очистка кеша
    clearCache() {
        this.cache.clear();
    }
}

// Экспорт для использования в других файлах
window.CryptoAPI = CryptoAPI;
