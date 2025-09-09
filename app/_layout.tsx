import React, { useEffect } from 'react';
import { Stack, useRouter, SplashScreen } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { initDatabase } from '@/utils/database';
import AuthProvider, { useAuth } from './utils/AuthContext';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function AppContent() {
  const router = useRouter();
  const isFrameworkReady = useFrameworkReady();
  const { isAuthenticated, setIsAuthenticated } = useAuth();

  useEffect(() => {
    const prepare = async () => {
      try {
        await initDatabase();
        console.log("Database initialized.");
        // TODO: In a real app, you would check for an existing session here
        // For now, let's assume the user needs to log in initially.
        // setIsAuthenticated(true); // Uncomment if you want to bypass login for testing
      } catch (e) {
        console.warn(e);
      } finally {
        SplashScreen.hideAsync();
      }
    };
    // Only prepare if the framework isn't already marked as ready.
    // This avoids re-initializing the database if useFrameworkReady() is already true.
    if (isFrameworkReady) {
      prepare();
    }
  }, [isFrameworkReady]); // Depend on isFrameworkReady

  useEffect(() => {
    if (isFrameworkReady) {
      if (isAuthenticated) {
        router.replace('/(tabs)');
      } else {
        router.replace('/login');
      }
    }
  }, [isAuthenticated, isFrameworkReady]);

  if (!isFrameworkReady) {
    return null;
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <Stack.Screen name="(tabs)" />
        ) : (
          <Stack.Screen name="(auth)" />
        )}
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
