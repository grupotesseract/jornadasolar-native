import 'dotenv/config';

export default {
  name: 'Jornada Solar',
  slug: 'jornada-solar',
  icon: './assets/icon.png',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#000000'
  },
  web: {
    config: {
      firebase: {
        measurementId: process.env.MEASUREMENT_ID
      }
    }
  },
  android: {
    icon: './assets/icon.png',
    versionCode: 2,
    package: 'com.grupotesseract.jornadasolar',
    googleServicesFile: './google-services.json',
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#000000"
    }
  },
  ios: {
    icon: './assets/icon.png',
    buildNumber: '1.0.0',
    bundleIdentifier: 'com.grupotesseract.jornadasolar',
    googleServicesFile: './GoogleService-Info.plist'
  },
  scheme: 'jornadasolar',
  notification: {
    icon: './assets/notification-icon.png',
    color: '#F7C92A',
    iosDisplayInForeground: true
  }
};