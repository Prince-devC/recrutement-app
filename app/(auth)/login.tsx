import React, { useState } from 'react';
import {
  View,
  Text,
  TextField,
  Checkbox,
  Colors as UILibColors,
} from 'react-native-ui-lib';
import { Stack, useRouter } from 'expo-router';
import { authenticateUser } from '@/utils/database';
import { useAuth } from '@/app/utils/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ActivityIndicator, StyleSheet, Alert, TouchableOpacity } from 'react-native';

// Define a more comprehensive color palette based on the image
UILibColors.loadColors({
  primary: '#6A0DAD', // A deep purple for primary actions
  secondary: '#9D2BFF', // A lighter purple/pink for accents
  text: '#212121',
  placeholder: '#757575',
  border: '#E0E0E0',
  background: '#F5F5F5',
  white: '#FFFFFF',
  error: '#D32F2F',
  dark: '#000000',
});

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { setIsAuthenticated } = useAuth();

  const handleLogin = async () => {
    setError(null);
    setLoading(true);
    try {
      const user = await authenticateUser(email, password);
      Alert.alert('Success', `Welcome, ${user.email}!`);
      setIsAuthenticated(true);
    } catch (err: any) {
      setError(err.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View flex backgroundColor={UILibColors.background}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* Gradient Header */}
      <LinearGradient colors={[UILibColors.primary, UILibColors.secondary]} style={styles.headerBackground}>
        <Text style={styles.logoText}>RecruitMe</Text>
      </LinearGradient>

      <View flex-2 style={styles.contentContainer}>
        <Text style={styles.title}>Welcome back !</Text>
        {error && <Text style={styles.errorText}>{error}</Text>}

        <View style={styles.inputContainer}>
          <TextField
            migrate
            fieldStyle={styles.inputField}
            placeholder="Username"
            floatingPlaceholder
            floatOnFocus
            onChangeText={setEmail}
            value={email}
            keyboardType="email-address"
            autoCapitalize="none"
            enableErrors
            validationMessage={error && email.length === 0 ? 'Email is required' : undefined}
          />
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.inputWithIconContainer}>
            <TextField
              migrate
              fieldStyle={[styles.inputField, styles.inputWithIcon]}
              placeholder="Password"
              floatingPlaceholder
              floatOnFocus
              onChangeText={setPassword}
              value={password}
              secureTextEntry={!showPassword}
              enableErrors
              validationMessage={error && password.length === 0 ? 'Password is required' : undefined}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
              <Ionicons
                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                size={20}
                color={UILibColors.placeholder}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View row spread centerV marginB-10>
          <Checkbox
            value={rememberMe}
            onValueChange={setRememberMe}
            label="Remember me"
            color={UILibColors.primary}
            size={18}
            labelStyle={styles.checkboxLabel}
          />
          <TouchableOpacity onPress={() => console.log('Forgot password')}>
            <Text style={styles.forgotPasswordText}>Forgot password?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={handleLogin}
          disabled={loading}
          style={styles.signInButton}
        >
          <LinearGradient
            colors={[UILibColors.primary, UILibColors.secondary]}
            style={styles.gradientButton}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            {loading ? (
              <ActivityIndicator color={UILibColors.white} />
            ) : (
              <Text style={styles.buttonText}>Sign In</Text>
            )}
          </LinearGradient>
        </TouchableOpacity>

        <View center marginT-10>
          <Text text70 color={UILibColors.text}>New user? <Text onPress={() => router.replace('/register')} style={styles.signUpText}>Sign Up</Text></Text>
        </View>

        <View center marginT-20>
          <Text text80 color={UILibColors.placeholder}>OR</Text>
          <View row marginT-5>
            {/* Social icons */}
            <TouchableOpacity style={styles.socialIconContainer}>
              <Ionicons name="logo-twitter" size={24} color={UILibColors.primary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialIconContainer}>
              <Ionicons name="logo-linkedin" size={24} color={UILibColors.primary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialIconContainer}>
              <Ionicons name="logo-facebook" size={24} color={UILibColors.primary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialIconContainer}>
              <Ionicons name="logo-google" size={24} color={UILibColors.primary} />
            </TouchableOpacity>
          </View>
          <Text text90 color={UILibColors.placeholder} marginT-10>Sign in with another account</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    position: 'relative',
    overflow: 'hidden',
  },
  logoText: {
    fontSize: 34,
    fontWeight: 'bold',
    color: UILibColors.white,
    marginTop: 50,
  },
  contentContainer: {
    backgroundColor: UILibColors.white,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    marginTop: -50,
    padding: 30,
    paddingTop: 50,
    elevation: 5,
    shadowColor: UILibColors.dark,
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: UILibColors.text,
    marginBottom: 30,
    textAlign: 'center',
  },
  errorText: {
    color: UILibColors.error,
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 14,
  },
  inputContainer: {
    marginBottom: 10,
    width: '100%',
  },
  inputField: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: UILibColors.border,
    borderRadius: 12,
    backgroundColor: UILibColors.white,
    fontSize: 16,
    color: UILibColors.text,
    minHeight: 50,
  },
  inputWithIcon: {
    paddingRight: 50,
  },
  inputIcon: {
    marginRight: 10,
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    top: '50%',
    marginTop: -10,
    padding: 5,
  },
  checkboxLabel: {
    fontSize: 14,
    color: UILibColors.text,
  },
  forgotPasswordText: {
    color: UILibColors.primary,
    fontSize: 14,
  },
  signInButton: {
    width: '100%',
    borderRadius: 12,
    marginTop: 10,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: UILibColors.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  gradientButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    minHeight: 52,
  },
  buttonText: {
    color: UILibColors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  signUpText: {
    color: UILibColors.primary,
    fontWeight: 'bold',
  },
  socialIconContainer: {
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: UILibColors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputWithIconContainer: {
    position: 'relative',
    width: '100%',
  },
}); 