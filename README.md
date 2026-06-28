# 香江文藝慶典製作公司 — 官方網站

一站式慶典活動策劃專家 — 專業媒體製作、慶典策劃、會場佈置、宣傳印刷、藝術表演、禮儀司儀及網上直播服務。

> **網站網址**: https://heung-kong-prod.vercel.app (部署後更新)

---

## 技術棧 / Tech Stack

- **HTML5** — 語意化標記，SEO 友好
- **CSS3** — Flexbox/Grid 佈局，CSS 自定義屬性，響應式設計
- **Vanilla JS** — 純原生 JavaScript，無框架
- **Font Awesome 6** — 圖標庫
- **Google Fonts** — Noto Sans TC / Noto Sans SC / Poppins
- **Vercel** — 靜態網站部署

## 功能特色 / Features

- **雙語切換** (繁體中文 / 簡體中文) — 一鍵即時切換，無需重新載入
- **響應式設計** — 桌面 / 平板 / 手機三種佈局
- **6 個頁面**: 首頁、關於我們、服務項目、活動花絮、聯絡我們、常見問題
- **活動花絮**: 分類篩選 + 燈箱預覽
- **常見問題**: 分類摺疊式問答
- **Google 地圖**: 嵌入公司位置

## 本地執行 / Run Locally

由於是純靜態網站，無需任何構建工具，直接在瀏覽器打開 HTML 檔案即可：

```bash
# 方法一：直接打開
open index.html        # macOS
start index.html       # Windows
xdg-open index.html    # Linux

# 方法二：使用本地伺服器（推薦，可測試所有路由）
npx serve .
# 或
python -m http.server 8000
# 然後在瀏覽器打開 http://localhost:8000
```

## 部署到 Vercel / Deploy to Vercel

### 一鍵部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### 手動部署

1. 將此倉庫推送到 GitHub：
   ```bash
   git remote add origin https://github.com/你的用戶名/heung-kong-prod.git
   git branch -M main
   git push -u origin main
   ```

2. 前往 [Vercel](https://vercel.com) 並使用 GitHub 登入

3. 點擊 **Add New → Project**

4. 選擇 `heung-kong-prod` 倉庫

5. **Framework Preset**: 選擇 `Other`（靜態網站會自動檢測）

6. 點擊 **Deploy** — 無需任何配置

7. 部署完成後，Vercel 會提供一個 `*.vercel.app` 網址

### 自訂域名（可選）

在 Vercel 專案設定 → Domains 中添加你的自訂域名。

## 網站結構 / Site Structure

```
heung-kong-prod/
├── index.html          # 首頁 — 英雄區、核心服務、統計數據、精選案例
├── about.html          # 關於我們 — 公司故事、使命/願景/價值觀、發展歷程
├── services.html       # 服務項目 — 7 大服務分類卡片
├── gallery.html        # 活動花絮 — 分類篩選、瀑布流佈局、燈箱預覽
├── contact.html        # 聯絡我們 — 聯絡資訊、Google 地圖、營業時間
├── faq.html            # 常見問題 — 分類折疊式問答
├── css/
│   └── style.css       # 全域樣式表 — 設計系統、響應式斷點
├── js/
│   ├── lang-data.js    # 語言資料 — 繁體/簡體中文對照
│   └── main.js         # 主要腳本 — 語言切換、導航、燈箱、FAQ
├── images/             # 圖片資源（由客戶提供）
│   ├── logo/
│   ├── hero/
│   ├── gallery/
│   └── icons/
├── .gitignore
├── vercel.json         # Vercel 部署配置
└── README.md
```

## 語言切換機制 / Language Toggle

所有顯示文字皆儲存在 `js/lang-data.js` 的 `langData` 物件中，分為 `zh-hk`（繁體）和 `zh-cn`（簡體）兩個語言版本。

HTML 元素使用 `data-lang` 屬性標記需要翻譯的內容，`switchLang()` 函數會即時替換所有匹配元素的文字內容，並將偏好儲存至 `localStorage`。

## 自訂 / Customization

### 替換 Logo

將新的 Logo 檔案放置在 `images/logo/` 目錄，並更新 HTML 中 `<img>` 的 `src` 屬性。

### 替換活動照片

將照片放置在 `images/gallery/` 目錄，並更新 `gallery.html` 中的圖片路徑。

### 更新 Google 地圖

在 `contact.html` 中找到 iframe 的 `src` 屬性，替換為新的 Google Maps Embed URL。

## 維護 / Maintenance

- **新增語言**: 在 `lang-data.js` 中添加新的語言物件，並在 `switchLang()` 中註冊
- **修改內容**: 更新 `lang-data.js` 中的對應文字，無需修改 HTML
- **新增頁面**: 複製現有頁面模板，更新導航連結和 `lang-data.js` 中的文字

## 致謝 / Credits

- **設計與開發**: 香江文藝慶典製作公司
- **圖標**: [Font Awesome](https://fontawesome.com)
- **字體**: [Google Fonts](https://fonts.google.com) (Noto Sans TC, Noto Sans SC, Poppins)
- **佔位圖片**: [Picsum Photos](https://picsum.photos)
- **部署**: [Vercel](https://vercel.com)
# Heung_KONG_Prod
