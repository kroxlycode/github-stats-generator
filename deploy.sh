#!/bin/bash
set -e

# ─── PATH & NVM ─────────────────────────────────────────────────
export PATH="/www/server/nvm/versions/node/v24.18.1/bin:/usr/local/bin:/usr/bin:$PATH"
export NVM_DIR="/root/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

PROJECT_DIR="/www/wwwroot/github-stats.kroxly.dev"

echo "🚀 Auto-deploy başlatılıyor..."
cd "$PROJECT_DIR"

# ─── En son kodları çek ──────────────────────────────────────────
echo "📥 GitHub'dan kodlar çekiliyor..."
git pull origin main

# ─── Bağımlılıkları yükle & derle ───────────────────────────────
echo "📦 npm install çalıştırılıyor..."
npm install

echo "🔨 Proje derleniyor..."
npm run build

# ─── PM2 ────────────────────────────────────────────────────────
echo "♻️  PM2 yeniden başlatılıyor..."

# Eğer süreç yoksa yeni başlat, varsa yeniden yükle
if pm2 list | grep -q "github-stats-api"; then
  pm2 reload ecosystem.config.cjs --env production
else
  pm2 start ecosystem.config.cjs --env production
fi

pm2 save

echo "✅ Otomatik Dağıtım Başarıyla Tamamlandı!"
