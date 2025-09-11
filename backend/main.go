package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type TickerResponse struct {
	Data []struct {
		Last string `json:"last"`
	} `json:"data"`
}

func getBTCPrice() {
	resp, err := http.Get("https://www.okx.com/api/v5/market/ticker?instId=BTC-USDT")
	if err != nil {
		fmt.Println("Ошибка запроса:", err)
		return
	}
	defer resp.Body.Close()

	var result TickerResponse
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		fmt.Println("Ошибка парсинга:", err)
		return
	}
	if len(result.Data) > 0 {
		fmt.Println("BTC/USDT:", result.Data[0].Last)
	}
}

func priceHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	resp, err := http.Get("https://www.okx.com/api/v5/market/ticker?instId=BTC-USDT")
	if err != nil {
		http.Error(w, "Ошибка запроса", 500)
		return
	}
	defer resp.Body.Close()

	var result TickerResponse
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		http.Error(w, "Ошибка парсинга", 500)
		return
	}
	if len(result.Data) > 0 {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]string{"price": result.Data[0].Last})
	} else {
		http.Error(w, "Нет данных", 404)
	}
}

func main() {
	http.HandleFunc("/api/price", priceHandler)
	fmt.Println("Сервер запущен на :8080")
	http.ListenAndServe(":8080", nil)
}
