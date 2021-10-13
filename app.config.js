import 'dotenv/config';

export default {
  icon: "./assets/icon.png",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#000000"
  },
  web: {
    config: {
      firebase: {
        measurementId: process.env.MEASUREMENT_ID
      }
    }
  },
  android: {
    icon: './assets/notification-icon.png',
    color: '#F7C92A',
    package: "com.grupotesseract.jornadasolar",
    googleServicesFile: "./google-services.json",
  },
  ios: {
    icon: './assets/icon.png',
    bundleIdentifier: "com.grupotesseract.jornadasolar",
    googleServicesFile: "./GoogleService-Info.plist"
  },
  scheme: 'jornadasolar',
  notification: {
    icon: './assets/notification-icon.png',
    color: '#F7C92A',
    iosDisplayInForeground: true
  }
};