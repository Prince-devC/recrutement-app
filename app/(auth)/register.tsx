import React, { useState } from 'react';
import {
  View,
  Text,
  TextField,
  TouchableOpacity,
  Colors as UILibColors,
} from 'react-native-ui-lib';
import { Stack, useRouter } from 'expo-router';
import { registerUser } from '@/utils/database';
import { useAuth } from '@/app/utils/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ActivityIndicator, StyleSheet, Alert } from 'react-native';

// Color palette definition (consistent with login.tsx)
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

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const { setIsAuthenticated } = useAuth(); // Consistent context, though not directly used for setting auth here

  const handleRegister = async () => {
    setError(null);
    
    // Basic validation
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    
    if (!password.trim()) {
      setError('Password is required');
      return;
    }
    
    if (!confirmPassword.trim()) {
      setError('Confirm password is required');
      return;
    }
    
    if (password.trim() !== confirmPassword.trim()) {
      setError('Passwords do not match');
      return;
    }
    
    setLoading(true);
    try {
      const user = await registerUser(email.trim(), password);
      Alert.alert(
        'Success', 
        'User registered successfully!',
        [
          {
            text: 'OK',
            onPress: () => router.replace('/login')
          }
        ]
      );
    } catch (err: any) {
      console.error('Registration error:', err);
      setError(err.message || 'Failed to register user');
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
        <Text style={styles.title}>Welcome !</Text>
        {error && <Text style={styles.errorText}>{error}</Text>}

        <View style={styles.inputContainer}>
          <TextField
            migrate
            fieldStyle={styles.inputField}
            placeholder="Email"
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

        <View style={styles.inputContainer}>
          <View style={styles.inputWithIconContainer}>
            <TextField
              migrate
              fieldStyle={[styles.inputField, styles.inputWithIcon]}
              placeholder="Confirm Password"
              floatingPlaceholder
              floatOnFocus
              onChangeText={setConfirmPassword}
              value={confirmPassword}
              secureTextEntry={!showConfirmPassword}
              enableErrors
              validationMessage={error && confirmPassword.length === 0 ? 'Confirm Password is required' : undefined}
            />
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.eyeIcon}>
              <Ionicons
                name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
                size={20}
                color={UILibColors.placeholder}
              />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          onPress={handleRegister}
          disabled={loading}
          style={styles.signUpButton}
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
              <Text style={styles.buttonText}>Sign Up</Text>
            )}
          </LinearGradient>
        </TouchableOpacity>

        <View center marginT-8>
          <Text text70 color={UILibColors.text}>Already have an account? <Text onPress={() => router.replace('/login')} style={styles.signUpText}>Login</Text></Text>
        </View>

        <View center marginT-15>
          <Text text80 color={UILibColors.placeholder}>OR</Text>
          <View row marginT-5>
            {/* Social icons */}
            <TouchableOpacity style={styles.socialIconContainer}>
              <Ionicons name="logo-twitter" size={20} color={UILibColors.primary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialIconContainer}>
              <Ionicons name="logo-linkedin" size={20} color={UILibColors.primary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialIconContainer}>
              <Ionicons name="logo-facebook" size={20} color={UILibColors.primary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialIconContainer}>
              <Ionicons name="logo-google" size={20} color={UILibColors.primary} />
            </TouchableOpacity>
          </View>
          <Text text90 color={UILibColors.placeholder} marginT-5>Sign in with another account</Text>
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
    padding: 25,
    paddingTop: 40,
    elevation: 5,
    shadowColor: UILibColors.dark,
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: UILibColors.text,
    marginBottom: 20,
    textAlign: 'center',
  },
  errorText: {
    color: UILibColors.error,
    marginBottom: 8,
    textAlign: 'center',
    fontSize: 14,
  },
  inputContainer: {
    marginBottom: 8,
    width: '100%',
  },
  inputField: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: UILibColors.border,
    borderRadius: 12,
    backgroundColor: UILibColors.white,
    fontSize: 16,
    color: UILibColors.text,
    minHeight: 45,
  },
  inputWithIcon: {
    paddingRight: 50,
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    top: '50%',
    marginTop: -10,
    padding: 5,
  },
  signUpButton: {
    width: '100%',
    borderRadius: 12,
    marginTop: 8,
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
    paddingVertical: 14,
    minHeight: 48,
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
    padding: 8,
    marginHorizontal: 8,
    borderRadius: 20,
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