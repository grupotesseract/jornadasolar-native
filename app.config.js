import 'dotenv/config';

export default {
  web: {
    config: {
      firebase: {
        measurementId: process.env.MEASUREMENT_ID
      }
    }
  },
  android: {
    package: "com.grupotesseract.jornadasolar",
    googleServicesFile: "./google-services.json",
  },
  ios: {
    bundleIdentifier: "com.grupotesseract.jornadasolar",
    googleServicesFile: "./GoogleService-Info.plist"
  }
};