# 📖 Düşünce Defteri (Mindfulness & Kişisel Gelişim PWA)

Zihinsel farkındalık, öz-şefkat, bilişsel davranışçı terapi (CBT) yaklaşımlı yapay zekâ analizleri ve günlük ilham veren modern **iOS tarzı Progressive Web App (PWA) Mobil Düşünce Defteri**.

---

## 📱 GitHub Reposu Üzerinden Mobil Uygulama Olarak Çalıştırma

Bu proje **Progressive Web App (PWA)** standartlarında geliştirilmiştir. GitHub deponuza yüklediğinizde **GitHub Pages** ve **GitHub Actions** ile anında canlıya alınır ve telefonunuza gerçek bir mobil uygulama gibi kurulur.

### 1. Adım: Projeyi GitHub Reposuna Yükleyin
Proje klasörünüzü bir Git reposu olarak GitHub'a gönderin:

```bash
git init
git add .
git commit -m "Düşünce Defteri mobil PWA ve AI güncellemeleri"
git branch -M main
git remote add origin https://github.com/KULLANICI_ADINIZ/REPO_ADINIZ.git
git push -u origin main
```

### 2. Adım: GitHub Pages'i Aktif Edin
1. GitHub reponuzda **Settings (Ayarlar)** sekmesine gidin.
2. Sol menüden **Pages** seçeneğine tıklayın.
3. **Build and deployment > Source** kısmını **`GitHub Actions`** olarak seçin.
4. Repoya eklediğimiz `.github/workflows/deploy.yml` iş akışı otomatik olarak devreye girecek ve birkaç dakika içinde size özel bir HTTPS adresi oluşturacaktır:  
   👉 `https://kullanici-adiniz.github.io/repo-adiniz/`

---

## 📲 Telefona Mobil Uygulama Olarak Yükleme

GitHub Pages bağlantınızı telefonunuzun tarayıcısında açtıktan sonra:

### 🍎 iOS (iPhone & iPad)
1. Bağlantıyı **Safari** tarayıcısında açın.
2. Alt çubuktaki **Paylaş (Share)** simgesine dokunun.
3. Açılan menüden **"Ana Ekrana Ekle" (Add to Home Screen)** seçeneğini seçin.
4. Sağ üstteki **"Ekle"** butonuna dokunun.
5. Uygulama, özel ikonuyla ana ekranınıza yerleşecek; Safari çubuğu olmadan tam ekran bir mobil uygulama gibi çalışacaktır.

### 🤖 Android
1. Bağlantıyı **Chrome** tarayıcısında açın.
2. Sağ üstteki **üç noktaya (⋮)** dokunun.
3. **"Uygulamayı Yükle"** veya **"Ana Ekrana Ekle"** seçeneğine dokunun.
4. Uygulama telefonunuza yüklenecek ve uygulama çekmecenizde yer alacaktır.

---

## ✨ Özellikler

- 🌟 **13 Zengin Duygu Durumu**: Canlı, Sakin, Düşünceli, Minnettar, Umutlu, Özgüvenli, Sevgi Dolu, vb.
- ✏️ **Satır İçi Not Düzenleme**: Kart üzerindeki kalem butonuyla notlarınızı, kategorilerinizi ve duygularınızı anında düzenleyebilme.
- 🧠 **Kesintisiz Yapay Zekâ (AI)**:
  - **Google Gemini 2.5 Flash**: İsteğe bağlı olarak kendi ücretsiz API anahtarınızı ekleyebilirsiniz.
  - **Akıllı Yerel CBT Motoru**: Anahtarınız veya internetiniz olmasa bile şefkatli bilişsel yeniden çerçeveleme (CBT Reframe) ve zihinsel yansıtma %100 çalışır.
- ☁️ **Bulut Senkronizasyonu (Cloud Sync)**: 6 haneli kodla cihazlar arası gerçek zamanlı veri eşitleme.
- 📴 **Çevrimdışı Desteği (Offline Service Worker)**: İnternetiniz olmasa dahi defterinizi açabilir, yazabilir ve okuyabilirsiniz.

---

## 💻 Yerel Geliştirme (Local Development)

```bash
# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev

# Sadece PWA / Web derlemesi oluşturmak için
npm run build:client
```
