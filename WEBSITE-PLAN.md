# 香江文藝慶典製作公司 — 網站建置計劃與程序

> **文件版本**: v1.0  
> **最後更新**: 2026-06-28  
> **專案狀態**: ✅ 已完工，可部署

---

## 目錄

1. [專案概覽](#1-專案概覽)
2. [技術架構](#2-技術架構)
3. [目錄結構](#3-目錄結構)
4. [建置程序](#4-建置程序)
5. [頁面規格](#5-頁面規格)
6. [核心功能實作](#6-核心功能實作)
7. [設計系統](#7-設計系統)
8. [部署程序](#8-部署程序)
9. [維護指南](#9-維護指南)
10. [附錄](#10-附錄)

---

## 1. 專案概覽

### 1.1 專案目標

為香江文藝慶典製作公司建立一個 **6 頁式雙語（繁/簡）靜態企業形象網站**，展示公司的 7 大服務類別，提供客戶聯絡管道。

### 1.2 核心需求

| 需求 | 說明 |
|------|------|
| **雙語支援** | 繁體中文（zh-hk）+ 簡體中文（zh-cn），一鍵即時切換 |
| **響應式設計** | 桌面 / 平板 / 手機三種斷點 |
| **靜態網站** | 無後端、無資料庫、無框架、無建置工具 |
| **6 頁面** | 首頁、關於、服務、花絮、聯絡、FAQ |
| **聯絡方式** | mailto 連結（無聯絡表單後端） |
| **部署方式** | GitHub → Vercel 靜態部署 |

### 1.3 品牌色系

| 色名 | 色碼 | 用途 |
|------|------|------|
| 主色（紫） | `#6C3FA0` | 品牌主色，按鈕，標題 |
| 強調色（金） | `#F5A623` | 裝飾，重點標示，圖標 |
| CTA 色（珊瑚） | `#FF6B6B` | 行動呼籲按鈕 |
| 沈穩色（海軍藍） | `#2C3E7B` | 頁尾背景，次要文字 |

---

## 2. 技術架構

### 2.1 技術棧

```
┌──────────────────────────────────────────┐
│              HTML5（6 頁）                 │
│  data-lang 屬性標記所有顯示文字             │
├────────────────┬─────────────────────────┤
│   CSS3         │   Vanilla JavaScript     │
│  ・Flexbox/Grid│  ・lang-data.js（資料層） │
│  ・自定義屬性   │  ・main.js（互動層）      │
│  ・響應式斷點   │  ・localStorage 持久化   │
│  ・動畫過渡     │  ・DOMContentLoaded 初始化│
├────────────────┴─────────────────────────┤
│           外部資源（CDN）                   │
│  ・Font Awesome 6（圖標）                  │
│  ・Google Fonts（Noto Sans TC/SC, Poppins）│
│  ・Google Maps Embed（地圖）               │
├──────────────────────────────────────────┤
│           部署層                           │
│  ・GitHub（原始碼管理）                     │
│  ・Vercel（靜態託管）                       │
└──────────────────────────────────────────┘
```

### 2.2 架構決策記錄

| 決策 | 選擇 | 理由 |
|------|------|------|
| 語言切換方式 | JS 單頁即時切換 | 無需重新載入頁面，體驗流暢 |
| 文字儲存方式 | JS Object（langData） | 集中管理易維護，新增語言只需加資料 |
| CSS 組織方式 | 單一全域 stylesheet | 6 頁共用樣式，減少重複 |
| 圖片處理 | 本地檔案 + onerror 備援 | 無需外部依賴，離線可用 |
| 地圖嵌入 | iframe Google Maps | 靜態網站最簡方案，無需 API key |
| 表單處理 | mailto 連結 | 靜態網站無後端，最簡方案 |

### 2.3 依賴關係

```
Task 1: 專案初始化（目錄結構 + git）
    │
    ├── Task 2: CSS 樣式表（設計系統）
    │       │
    │       └── Task 3: JS 引擎（lang-data + main.js）
    │               │
    │               └─── 平行任務 ───┐
    │                                │
    ├── Task 4: 首頁 (index.html)     │
    ├── Task 5: 關於 (about.html)     │
    ├── Task 6: 服務 (services.html)  │
    ├── Task 7: 花絮 (gallery.html)   │
    ├── Task 8: 聯絡 (contact.html)   │
    ├── Task 9: FAQ (faq.html)       │
    │                                │
    └─────────── 依賴 ────────────────┘
                    │
            Task 10: 跨頁面 QA 驗證
                    │
            Task 11: README + Vercel 配置
                    │
            最終驗證（F1-F4）
```

---

## 3. 目錄結構

```
heung-kong-prod/
│
├── index.html              # 首頁 — 英雄區 + 3 大服務 + 統計 + CTA
├── about.html              # 關於我們 — 公司故事 + 使命/願景/價值 + 時程表
├── services.html           # 服務項目 — 7 大服務卡片
├── gallery.html            # 活動花絮 — 分類篩選 + 瀑布流 + 燈箱
├── contact.html            # 聯絡我們 — 資訊卡 + 地圖 + 營業時間
├── faq.html                # 常見問題 — 分類折疊問答
│
├── css/
│   └── style.css           # 全域樣式表（設計系統 + 響應式）
│
├── js/
│   ├── lang-data.js        # 語言資料（繁/簡對照，~70 keys/語言）
│   └── main.js             # 互動功能（切換語言、導航、燈箱、FAQ 等）
│
├── images/
│   ├── logo/
│   │   └── logo.svg        # 品牌 Logo（SVG 預設，客戶可替換）
│   ├── hero/
│   │   └── company.jpg     # 公司形象照
│   ├── gallery/
│   │   ├── photo1.jpg      # 活動照片 1-9（Picsum 暫用，客戶可替換）
│   │   ├── photo2.jpg
│   │   └── ...
│   └── icons/              # 圖標目錄（備用）
│
├── vercel.json             # Vercel 部署配置（安全標頭 + 快取規則）
├── README.md               # 專案說明文件（中英雙語）
├── .gitignore              # Git 忽略規則
└── WEBSITE-PLAN.md         # 本文件 — 建置計劃與程序
```

---

## 4. 建置程序

### 階段 1：基礎建設（Wave 1）

#### Task 1：初始化專案結構

**目的**：建立目錄結構、git 儲存庫、忽略規則。

**步驟**：
1. 建立目錄樹：`css/`, `js/`, `images/`（含 `logo/`, `hero/`, `gallery/`, `icons/`）
2. 建立空檔案：`css/style.css`, `js/lang-data.js`, `js/main.js`
3. 撰寫 `.gitignore`（排除 .DS_Store, Thumbs.db, node_modules, .env, .vercel/）
4. `git init` + 初始提交

**產出**：
- 目錄結構就緒
- `git log` 顯示 `chore: initialize project structure`

---

#### Task 2：CSS 全域樣式表

**目的**：建立完整的設計系統，涵蓋所有頁面共用樣式。

**實作內容**：

| 模組 | 說明 |
|------|------|
| CSS Reset | box-sizing、margin/padding 重置 |
| 字體導入 | Google Fonts：Noto Sans TC 400/500/700/900、Noto Sans SC 400/500/700/900、Poppins 400/600 |
| 顏色變數 | `:root` 定義 4 品牌色 + 衍生色 |
| 版面工具 | container（max-width:1200px）、flex/grid helper |
| 導航欄 | 水平選單、sticky 置頂、手機漢堡選單、active 頁面指示 |
| 英雄區 | 滿版漸層背景、置中文字、CTA 按鈕 |
| 卡片 | 白底、陰影、圓角 12px、懸浮提升效果 |
| 按鈕系統 | primary（紫）、outline（邊框）、CTA（珊瑚）、白色、hover 過渡 |
| 頁尾 | 深海軍藍背景、多欄佈局、社交圖標 |
| 區塊樣式 | 交替背景色、section 上下 padding 80px |
| 響應式斷點 | `@media (max-width: 1024px)` 平板、`@media (max-width: 768px)` 手機 |
| 動畫 | 淡入（fade-in）、卡片懸浮、按鈕 hover |
| 圖片區 | 瀑布流網格（masonry grid）、燈箱覆蓋層 |
| FAQ | 折疊面板樣式、展開/收合動畫 |
| 聯絡頁 | Google Maps 容器、資訊卡樣式 |

**關鍵技術**：
- CSS 自定義屬性（custom properties）管理主題
- `@media` 響應式查詢
- `transition` + `@keyframes` 動畫

---

#### Task 3：JavaScript 引擎

**目的**：建立語言切換引擎與所有互動功能。

##### js/lang-data.js

**資料結構**：
```javascript
const langData = {
  'zh-hk': {  // 繁體中文
    navHome: '首頁',
    navAbout: '關於我們',
    homeHeroTitle: '香江文藝慶典製作公司',
    // ... ~70 keys
  },
  'zh-cn': {  // 簡體中文
    navHome: '首页',
    navAbout: '关于我们',
    homeHeroTitle: '香江文艺庆典制作公司',
    // ... ~70 keys, 與 zh-hk 一一對應
  }
};
```

**Keys 分類**：

| 前綴 | 頁面 | 數量 |
|------|------|------|
| `nav*` | 全域導航 | 7 |
| `home*` | 首頁 | 12 |
| `about*` | 關於 | 10 |
| `service*` | 服務 | 14 |
| `gallery*` | 花絮 | 6 |
| `contact*` | 聯絡 | 7 |
| `faq*` | FAQ | 14 |
| `footer*` | 頁尾 | 4 |
| 通用 | 共用 | 4 |
| **總計** | | **~78 keys/語言** |

##### js/main.js

**功能模組**：

| 功能 | 函數/事件 | 說明 |
|------|-----------|------|
| 語言切換 | `switchLang(lang)` | 讀取所有 `[data-lang]` 元素，替換 innerHTML |
| 偏好持久化 | `localStorage` | 記住用戶選擇，跨頁面保留 |
| 自動初始化 | `DOMContentLoaded` | 載入後套用已儲存偏好（預設 zh-hk） |
| 導航高亮 | `setActiveNav()` | 根據 `pathname` 標記 active 頁面 |
| 漢堡選單 | `toggleMenu()` | 手機版選單展開/收合 |
| 燈箱 | `openLightbox()/closeLightbox()` | 圖片點擊 → 全螢幕 → 前後切換 → 關閉 |
| FAQ 折疊 | `toggleFaq()` | 點擊問題 → 平滑展開/收合答案 |
| 圖片篩選 | `filterGallery()` | 按分類顯示/隱藏花絮照片 |
| 平滑滾動 | `scrollToAnchor()` | 頁內錨點平滑移動 |

**資料流**：
```
用戶點擊「简/繁」按鈕
    │
    ├── switchLang('zh-cn')
    │       │
    │       ├── document.querySelectorAll('[data-lang]')
    │       ├── 每個元素：el.innerHTML = langData['zh-cn'][key]
    │       ├── 更新切換按鈕視覺狀態
    │       └── localStorage.setItem('lang', 'zh-cn')
    │
    └── 下次載入任何頁面
            │
            └── DOMContentLoaded
                    │
                    └── const savedLang = localStorage.getItem('lang') || 'zh-hk'
                        └── switchLang(savedLang)
```

---

### 階段 2：內容頁面（Wave 2 — 6 頁平行建置）

#### Task 4：首頁 (index.html)

**區塊佈局**：

```
┌──────────────────────────────────┐
│  🎨 導航欄（sticky，語言切換按鈕）  │
├──────────────────────────────────┤
│                                  │
│  英雄區                          │
│  ・漸層背景（紫→海軍藍）           │
│  ・公司名稱 + 標語                │
│  ・CTA 按鈕「立即聯絡報價」        │
│                                  │
├──────────────────────────────────┤
│                                  │
│  核心服務（3 卡片）               │
│  ┌──────┐ ┌──────┐ ┌──────┐    │
│  │活動策劃│ │會場佈置│ │媒體製作│   │
│  └──────┘ └──────┘ └──────┘    │
│                                  │
├──────────────────────────────────┤
│                                  │
│  統計數據                        │
│  10+年經驗 | 500+場活動 | 100%好評│
│                                  │
├──────────────────────────────────┤
│                                  │
│  公司故事預覽 + 圖片              │
│                                  │
├──────────────────────────────────┤
│                                  │
│  CTA 區塊                        │
│  「讓您的每一場活動都與眾不同」     │
│  聯絡我們按鈕                     │
│                                  │
├──────────────────────────────────┤
│                                  │
│  📌 頁尾                         │
│  地址 / 電話 / 電郵 / 快速連結    │
│                                  │
└──────────────────────────────────┘
```

#### Task 5：關於我們 (about.html)

**區塊佈局**：
- 頁面英雄橫幅
- 公司故事（左文右圖）
- 使命 / 願景 / 價值觀（3 欄卡片）
- 公司里程碑（2016-2026 水平時間軸）

#### Task 6：服務項目 (services.html)

**7 大服務卡片**：

| # | 服務 | 圖標 | 說明 |
|---|------|------|------|
| 1 | 媒體製作 | 🎬 | 高級音響、攝影錄像、多媒體製作 |
| 2 | 慶典策劃 | 🎯 | 喜慶典禮、會議設計、活動統籌 |
| 3 | 會場佈置 | 🎪 | 場地設計、製作及佈置 |
| 4 | 宣傳印刷 | 📄 | 宣傳刊物、橫額專業製作 |
| 5 | 藝術表演 | 🎭 | 喜慶藝術團隊表演安排 |
| 6 | 禮儀司儀 | 🎤 | 禮儀接待、專業司儀主持 |
| 7 | 網上直播 | 📡 | 5G 高速室內戶外直播 |

#### Task 7：活動花絮 (gallery.html)

**功能**：
- 分類篩選按鈕：全部 / 慶典 / 會議 / 表演 / 佈置
- 瀑布流圖片網格（Masonry layout）
- 燈箱預覽（點擊放大 + 前後切換）

**圖片來源**：
- 開發階段：`images/gallery/photo1.jpg` ~ `photo9.jpg`（Picsum 暫用圖）
- 上線前：客戶應替換為實際活動照片

#### Task 8：聯絡我們 (contact.html)

**資訊內容**：

| 項目 | 內容 |
|------|------|
| 地址 | 香港北角炮台山宏安道2-12號宏暉商場地下24B號鋪 |
| 電話 | +852 9443 5055 |
| 電郵 | johnsusu2046@outlook.com |
| 營業時間 | 星期一至六 09:00-18:00（星期日及公眾假期休息） |
| 地圖 | Google Maps iframe 嵌入 |

#### Task 9：常見問題 (faq.html)

**分類結構**：

| 分類 | 問題數 | 主題 |
|------|--------|------|
| 服務查詢 | 4 | 服務範圍、預約方式、戶外活動、技術人員 |
| 報價相關 | 3 | 費用透明、提前預訂、取消政策 |
| 技術支援 | 1 | 音響設備 |

**互動**：點擊問題標題 → 平滑展開答案 → 再次點擊收合

---

### 階段 3：整合與部署（Wave 3）

#### Task 10：跨頁面 QA 驗證

**驗證清單**：

| # | 項目 | 驗證方式 | 狀態 |
|---|------|----------|------|
| 1 | 6 頁面皆可正常開啟 | 檔案存在性檢查 | ✅ |
| 2 | 導航連結全部正確 | 正規表達式比對 href | ✅ |
| 3 | 語言切換涵蓋所有文字 | data-lang 覆蓋率 100% | ✅ |
| 4 | 響應式斷點 | CSS media queries 存在 | ✅ |
| 5 | 燈箱功能 | JS lightbox 程式碼 | ✅ |
| 6 | FAQ 折疊 | JS accordion 程式碼 | ✅ |
| 7 | Google 地圖載入 | iframe embed 存在 | ✅ |
| 8 | 無主控台錯誤 | JS 語法驗證 | ✅ |
| 9 | Font Awesome 圖標 | CDN 載入於所有頁面 | ✅ |

#### Task 11：README + Vercel 配置

**README.md 包含**：
- 專案簡介（中英雙語）
- 技術棧說明
- 本機執行方式
- Vercel 部署指南（含一鍵部署按鈕）
- 網站結構圖
- 自訂與維護指南
- 致謝

**vercel.json 配置**：
```json
{
  "cleanUrls": true,
  "trailingSlash": false,
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
      ]
    },
    {
      "source": "/(.*)\\.(js|css|png|jpg|jpeg|gif|ico|svg|webp)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ]
}
```

---

## 5. 頁面規格

### 5.1 共用元素

所有 6 頁共用以下元素：

```
┌──────────────────────────────────┐
│ 導航列（所有頁面一致）             │
│  Logo  │ 首頁 | 關於 | 服務 | ...│ 简/繁 │
├──────────────────────────────────┤
│                                  │
│         頁面主要內容              │
│                                  │
├──────────────────────────────────┤
│ 頁尾（所有頁面一致）               │
│ 公司簡介 │ 快速連結 │ 聯絡資訊    │
│ © 2026 版權聲明                   │
└──────────────────────────────────┘
```

### 5.2 各頁面 data-lang Keys

| 頁面 | 專屬 Keys | 說明 |
|------|-----------|------|
| 全域 | `navHome`, `navAbout`, `navServices`, `navGallery`, `navContact`, `navFAQ`, `langToggle` | 導航 |
| 全域 | `companyName`, `viewMore`, `contactUs`, `learnMore` | 共用 |
| 全域 | `footerCompany`, `footerQuickLinks`, `footerContact`, `footerRights` | 頁尾 |
| index | `homeHeroTitle`, `homeHeroSubtitle`, `homeHeroCTA` | 英雄區 |
| index | `homeService1Title`, `homeService1Desc` … 共 3 組 | 服務卡片 |
| index | `homeStatYears`, `homeStatEvents`, `homeStatSatisfaction` | 統計 |
| index | `homeCTATitle`, `homeCTASubtitle` | CTA 區 |
| about | `aboutTitle`, `aboutStoryTitle`, `aboutStoryP1`, `aboutStoryP2` | 故事 |
| about | `aboutMission`, `aboutMissionDesc`, `aboutVision`, `aboutVisionDesc`, `aboutValues`, `aboutValuesDesc` | M/V/V |
| services | `servicesTitle`, `service1Title`…`service7Title` + `service1Desc`…`service7Desc` | 服務 |
| gallery | `galleryTitle`, `galleryAll`, `galleryCategory1`…`galleryCategory4` | 篩選 |
| contact | `contactTitle`, `contactAddress`, `contactAddressValue`, `contactPhone`, `contactEmail`, `contactHours`, `contactHoursValue`, `contactSunday` | 資訊 |
| faq | `faqTitle`, `faqCategory1`…`faqCategory3` | 分類 |
| faq | `faqQ1`…`faqQ8`, `faqA1`…`faqA8` | Q&A |

---

## 6. 核心功能實作

### 6.1 語言切換機制

**原理**：

1. HTML 中所有顯示文字使用 `data-lang` 屬性標記：
   ```html
   <h1 data-lang="homeHeroTitle">香江文藝慶典製作公司</h1>
   ```

2. `lang-data.js` 定義所有語言的文字對照：
   ```javascript
   const langData = {
     'zh-hk': { homeHeroTitle: '香江文藝慶典製作公司' },
     'zh-cn': { homeHeroTitle: '香江文艺庆典制作公司' }
   };
   ```

3. 切換時，`switchLang()` 遍歷所有 `[data-lang]` 元素並更新內容：
   ```javascript
   function switchLang(lang) {
     document.querySelectorAll('[data-lang]').forEach(el => {
       const key = el.dataset.lang;
       if (langData[lang][key]) {
         el.innerHTML = langData[lang][key];
       }
     });
     localStorage.setItem('lang', lang);
     updateToggleButton(lang);
   }
   ```

4. 頁面載入時從 `localStorage` 讀取偏好，自動套用：
   ```javascript
   document.addEventListener('DOMContentLoaded', () => {
     const savedLang = localStorage.getItem('lang') || 'zh-hk';
     switchLang(savedLang);
   });
   ```

### 6.2 行動版漢堡選單

```javascript
// 螢幕寬度 ≤ 768px 時啟用
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  menuToggle.classList.toggle('active');
});
```

### 6.3 燈箱（Lightbox）

```javascript
function openLightbox(src) {
  const overlay = document.querySelector('.lightbox');
  overlay.querySelector('img').src = src;
  overlay.classList.add('active');
}

function closeLightbox() {
  document.querySelector('.lightbox').classList.remove('active');
}

// ESC 鍵關閉
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});
```

### 6.4 FAQ 折疊面板

```javascript
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const answer = btn.nextElementSibling;
    const isOpen = answer.style.maxHeight;
    
    // 收合所有
    document.querySelectorAll('.faq-answer').forEach(a => a.style.maxHeight = null);
    
    // 展開當前
    if (!isOpen) {
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});
```

### 6.5 圖片分類篩選

```javascript
function filterGallery(category) {
  document.querySelectorAll('.gallery-item').forEach(item => {
    if (category === 'all' || item.dataset.category === category) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}
```

---

## 7. 設計系統

### 7.1 CSS 自定義屬性

```css
:root {
  /* 品牌色 */
  --primary: #6C3FA0;
  --primary-dark: #5A2D8A;
  --primary-light: #8B5FC0;
  --accent: #F5A623;
  --accent-dark: #D4891A;
  --cta: #FF6B6B;
  --cta-dark: #E55555;
  --navy: #2C3E7B;
  --navy-dark: #1A2A5E;

  /* 中性色 */
  --white: #FFFFFF;
  --bg-light: #F8F6FF;
  --bg-gray: #F0F0F5;
  --text-dark: #2D2D3A;
  --text-light: #6B6B80;
  --border: #E0E0EB;

  /* 字型 */
  --font-tc: 'Noto Sans TC', sans-serif;
  --font-sc: 'Noto Sans SC', sans-serif;
  --font-en: 'Poppins', sans-serif;

  /* 間距 */
  --section-padding: 80px 0;
  --container-width: 1200px;

  /* 效果 */
  --shadow-sm: 0 2px 8px rgba(0,0,0,0.08);
  --shadow-md: 0 4px 20px rgba(0,0,0,0.12);
  --shadow-lg: 0 8px 40px rgba(0,0,0,0.16);
  --radius: 12px;
  --transition: 0.3s ease;
}
```

### 7.2 響應式斷點

| 裝置 | 寬度 | 佈局調整 |
|------|------|----------|
| Desktop | > 1024px | 標準 3 欄 / 2 欄佈局 |
| Tablet | 769px – 1024px | 2 欄 → 1 欄，縮小字體與間距 |
| Mobile | ≤ 768px | 單欄，漢堡選單，堆疊卡片 |

### 7.3 按鈕系統

| 風格 | 類別 | 背景 | 文字 | 懸浮效果 |
|------|------|------|------|----------|
| Primary | `.btn-primary` | 紫色 | 白色 | 深紫色 + 陰影放大 |
| Outline | `.btn-outline` | 透明 | 紫色 | 紫色背景 + 白色文字 |
| CTA | `.btn-cta` | 珊瑚色 | 白色 | 深珊瑚色 + 陰影放大 |
| White | `.btn-white` | 白色 | 紫色 | 淺紫色背景 |

### 7.4 動畫

- **fade-in**：頁面區塊進入視埠時淡入
- **card hover**：卡片懸浮時上移 -5px + 陰影加深
- **button hover**：背景顏色平滑過渡 0.3s
- **FAQ 展開**：max-height 過渡 0.3s

---

## 8. 部署程序

### 8.1 推送至 GitHub

```bash
# 建立 GitHub 倉庫（如 heung-kong-prod），然後：
git remote add origin https://github.com/你的用戶名/heung-kong-prod.git
git branch -M main
git push -u origin main
```

### 8.2 部署至 Vercel

**方法一：一鍵部署**

點擊 README.md 中的 [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new) 按鈕。

**方法二：手動部署**

1. 前往 [vercel.com](https://vercel.com) 並以 GitHub 登入
2. 點擊 **Add New → Project**
3. 選擇 `heung-kong-prod` 倉庫
4. Framework Preset 選擇 **Other**
5. 點擊 **Deploy**（無需額外配置）
6. 部署完成後取得 `*.vercel.app` 網址

### 8.3 自訂域名（選用）

在 Vercel 專案設定 → Domains 中新增自訂域名，並設定 DNS 的 CNAME 記錄指向 `cname.vercel-dns.com`。

---

## 9. 維護指南

### 9.1 修改內容

只需編輯 `js/lang-data.js` 中的對應文字，無需修改 HTML：

```javascript
// 修改前
'zh-hk': { homeHeroTitle: '香江文藝慶典製作公司' },

// 修改後
'zh-hk': { homeHeroTitle: '香江文藝慶典製作有限公司' },
```

### 9.2 新增頁面

1. 複製任一現有 HTML 頁面為模板
2. 更新導航列的連結（所有 6 頁都要加）
3. 在 `lang-data.js` 中新增頁面專屬 keys
4. 在 HTML 中使用 `data-lang` 屬性標記文字

### 9.3 新增語言

1. 在 `lang-data.js` 新增語言物件，如 `'en': { ... }`
2. 在 `main.js` 的 `DOMContentLoaded` 中設定預設語言
3. 在語言切換按鈕中加入新選項

### 9.4 更換圖片

將新圖片檔案放入對應目錄：

| 目錄 | 內容 | 建議格式 |
|------|------|----------|
| `images/logo/` | 公司標誌 | SVG / PNG |
| `images/hero/` | 頁首形象照 | JPG / WebP |
| `images/gallery/` | 活動照片 | JPG / WebP |

---

## 10. 附錄

### 10.1 Git 提交記錄

```
b994943 feat: add image assets and update all pages to use local files
7777b6d docs: add README with deploy instructions and Vercel config
d1c0e61 feat: implement all 6 website pages with bilingual support
f57f24e chore: initialize project structure
```

### 10.2 驗證結果摘要

| 檢查項 | 結果 |
|--------|------|
| 全部 12 個專案檔案存在 | ✅ |
| CSS 含 4 品牌色、2 個 media query、Google Fonts | ✅ |
| 6 頁導航互相連結完整 | ✅ |
| data-lang 覆蓋率 100%（無遺漏 key） | ✅ |
| JS 功能：語言切換、localStorage、燈箱、FAQ、篩選、漢堡選單 | ✅ |
| 7 大服務類別完整 | ✅ |
| 聯絡資訊（電話、電郵、地址、地圖）完整 | ✅ |
| FAQ 8 題 3 分類 | ✅ |
| Vercel 配置含安全標頭與快取規則 | ✅ |

### 10.3 客戶待辦清單

- [ ] 替換 `images/logo/logo.svg` 為正式 Logo
- [ ] 替換 `images/hero/company.jpg` 為公司形象照
- [ ] 替換 `images/gallery/photo1.jpg`~`photo9.jpg` 為實際活動照片
- [ ] 確認電話號碼：`+852 9443 5055`
- [ ] 確認電郵地址：`johnsusu2046@outlook.com`
- [ ] 更新 Google Maps 嵌入座標（如需要）
- [ ] 設定自訂域名（如需要）
