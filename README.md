# Recrutement App

This is a mobile application for job recruitment, built with React Native and Expo.

## Table of Contents

- [Installation](#installation)
- [Running the project](#running-the-project)
- [Project Structure](#project-structure)

## Installation

To get started with the project, clone the repository and install the dependencies:

```bash
git clone <repository-url>
cd recrutement-app
npm install
# or yarn install
```

## Running the project

To run the project, you can use the Expo CLI:

```bash
npx expo start
```

This will open the Expo Dev Tools in your browser. You can then choose to run the app on an Android emulator, iOS simulator, or on your physical device using the Expo Go app.

## Project Structure

- `app/`: Contains the main application code, including navigation (`_layout.tsx`) and different screens/tabs.
- `app/(auth)/`: Authentication related screens like login and registration.
- `app/(tabs)/`: Tab-based navigation screens (applications, home, profile, search).
- `app/utils/`: Utility files like `AuthContext.tsx`.
- `assets/`: Static assets such as images.
- `hooks/`: Custom React hooks.
- `utils/`: Other utility files, e.g., `database.ts`.
- `android/`: Android specific native code.
- `ios/`: iOS specific native code.
