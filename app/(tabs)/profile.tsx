import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Colors as UILibColors,
  TouchableOpacity,
} from 'react-native-ui-lib';
import { StyleSheet, ScrollView, Image, TextInput, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '@/app/utils/AuthContext';
import { useRouter } from 'expo-router';

// Color palette definition (consistent with login.tsx and register.tsx)
UILibColors.loadColors({
  primary: '#6A0DAD',
  secondary: '#9D2BFF',
  text: '#212121',
  placeholder: '#757575',
  border: '#E0E0E0',
  background: '#F5F5F5',
  white: '#FFFFFF',
  error: '#D32F2F',
  dark: '#000000',
  success: '#4CAF50',
});

export default function ProfileScreen() {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setIsAuthenticated } = useAuth();
  const router = useRouter();
  
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    title: '',
    experience: '',
    bio: '',
    avatar: 'https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
  });

  const [stats] = useState([
    { label: 'Candidatures', value: '12' },
    { label: 'Vues profil', value: '48' },
    { label: 'Favoris', value: '6' },
  ]);

  const menuItems = [
    { icon: 'document-text-outline', title: 'Mon CV', subtitle: 'Gérer mon curriculum vitae' },
    { icon: 'notifications-outline', title: 'Notifications', subtitle: 'Alertes et préférences' },
    { icon: 'settings-outline', title: 'Paramètres', subtitle: 'Confidentialité et sécurité' },
  ];

  // Simulate loading profile data from database
  useEffect(() => {
    const loadProfileData = async () => {
      try {
        setLoading(true);
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Simulate loaded data from database
        setProfile({
          name: 'Marie Dubois',
          email: 'marie.dubois@email.com',
          phone: '+33 6 12 34 56 78',
          location: 'Paris, France',
          title: 'Développeuse Full-Stack',
          experience: '5 ans d\'expérience',
          bio: 'Passionnée par le développement web et mobile, je recherche de nouveaux défis dans une équipe dynamique.',
          avatar: 'https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
        });
      } catch (err: any) {
        setError('Impossible de charger les données du profil');
      } finally {
        setLoading(false);
      }
    };

    loadProfileData();
  }, []);

  const handleSaveProfile = async () => {
    try {
      setSaving(true);
      setError(null);
      
      // Validation
      if (!profile.name.trim()) {
        setError('Le nom est requis');
        return;
      }
      
      if (!profile.email.trim()) {
        setError('L\'email est requis');
        return;
      }

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Here you would call your database update function
      // await updateUserProfile(profile);
      
      Alert.alert('Succès', 'Profil mis à jour avec succès!');
      setIsEditing(false);
    } catch (err: any) {
      setError('Erreur lors de la sauvegarde du profil');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Déconnexion',
      'Êtes-vous sûr de vouloir vous déconnecter ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Déconnexion',
          style: 'destructive',
          onPress: () => setIsAuthenticated(false)
        }
      ]
    );
  };

  const renderProfileSection = () => (
    <View style={styles.profileSection}>
      <View style={styles.avatarContainer}>
        <Image source={{ uri: profile.avatar }} style={styles.avatar} />
        <TouchableOpacity style={styles.cameraButton}>
          <Ionicons name="camera" size={16} color={UILibColors.white} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.profileInfo}>
        {isEditing ? (
          <TextInput
            style={styles.nameInput}
            value={profile.name}
            onChangeText={(text) => setProfile({...profile, name: text})}
            placeholder="Nom complet"
            placeholderTextColor={UILibColors.placeholder}
          />
        ) : (
          <Text style={styles.profileName}>{profile.name}</Text>
        )}
        
        {isEditing ? (
          <TextInput
            style={styles.titleInput}
            value={profile.title}
            onChangeText={(text) => setProfile({...profile, title: text})}
            placeholder="Titre professionnel"
            placeholderTextColor={UILibColors.placeholder}
          />
        ) : (
          <Text style={styles.profileTitle}>{profile.title}</Text>
        )}
        
        {isEditing ? (
          <TextInput
            style={styles.experienceInput}
            value={profile.experience}
            onChangeText={(text) => setProfile({...profile, experience: text})}
            placeholder="Expérience"
            placeholderTextColor={UILibColors.placeholder}
          />
        ) : (
          <Text style={styles.profileExperience}>{profile.experience}</Text>
        )}
      </View>
      
      <TouchableOpacity
        style={styles.editButton}
        onPress={isEditing ? handleSaveProfile : () => setIsEditing(true)}
        disabled={saving}
      >
        <LinearGradient
          colors={[UILibColors.primary, UILibColors.secondary]}
          style={styles.gradientButton}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          {saving ? (
            <ActivityIndicator color={UILibColors.white} size="small" />
          ) : (
            <>
              <Ionicons
                name={isEditing ? 'checkmark' : 'pencil'}
                size={16}
                color={UILibColors.white}
              />
              <Text style={styles.editButtonText}>
                {isEditing ? 'Sauvegarder' : 'Modifier'}
              </Text>
            </>
          )}
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );

  const renderStatsRow = () => (
    <View style={styles.statsRow}>
      {stats.map((stat, index) => (
        <View key={index} style={[styles.statItem, index < stats.length - 1 && styles.statBorder]}>
          <Text style={styles.statValue}>{stat.value}</Text>
          <Text style={styles.statLabel}>{stat.label}</Text>
        </View>
      ))}
    </View>
  );

  const renderContactInfo = () => (
    <View style={styles.contactSection}>
      <Text style={styles.sectionTitle}>Informations de contact</Text>
      
      <View style={styles.contactItem}>
        <Ionicons name="mail-outline" size={18} color={UILibColors.primary} />
        {isEditing ? (
          <TextInput
            style={styles.contactInput}
            value={profile.email}
            onChangeText={(text) => setProfile({...profile, email: text})}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        ) : (
          <Text style={styles.contactText}>{profile.email}</Text>
        )}
      </View>
      
      <View style={styles.contactItem}>
        <Ionicons name="call-outline" size={18} color={UILibColors.primary} />
        {isEditing ? (
          <TextInput
            style={styles.contactInput}
            value={profile.phone}
            onChangeText={(text) => setProfile({...profile, phone: text})}
            keyboardType="phone-pad"
          />
        ) : (
          <Text style={styles.contactText}>{profile.phone}</Text>
        )}
      </View>
      
      <View style={styles.contactItem}>
        <Ionicons name="location-outline" size={18} color={UILibColors.primary} />
        {isEditing ? (
          <TextInput
            style={styles.contactInput}
            value={profile.location}
            onChangeText={(text) => setProfile({...profile, location: text})}
          />
        ) : (
          <Text style={styles.contactText}>{profile.location}</Text>
        )}
      </View>
    </View>
  );

  const renderBioSection = () => (
    <View style={styles.bioSection}>
      <Text style={styles.sectionTitle}>À propos</Text>
      {isEditing ? (
        <TextInput
          style={styles.bioInput}
          value={profile.bio}
          onChangeText={(text) => setProfile({...profile, bio: text})}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />
      ) : (
        <Text style={styles.bioText}>{profile.bio}</Text>
      )}
    </View>
  );

  const renderMenuItems = () => (
    <View style={styles.menuSection}>
      {menuItems.map((item, index) => (
        <TouchableOpacity key={index} style={styles.menuItem}>
          <View style={styles.menuIconContainer}>
            <Ionicons name={item.icon as any} size={20} color={UILibColors.primary} />
          </View>
          <View style={styles.menuContent}>
            <Text style={styles.menuTitle}>{item.title}</Text>
            <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={UILibColors.placeholder} />
        </TouchableOpacity>
      ))}
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <LinearGradient colors={[UILibColors.primary, UILibColors.secondary]} style={styles.loadingBackground}>
          <ActivityIndicator size="large" color={UILibColors.white} />
          <Text style={styles.loadingText}>Chargement du profil...</Text>
        </LinearGradient>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Gradient Header */}
      <LinearGradient colors={[UILibColors.primary, UILibColors.secondary]} style={styles.headerBackground}>
        <Text style={styles.headerTitle}>Mon Profil</Text>
        <Text style={styles.headerSubtitle}>Gérez vos informations personnelles</Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}
        
        {renderProfileSection()}
        {renderStatsRow()}
        {renderContactInfo()}
        {renderBioSection()}
        {renderMenuItems()}
        
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color={UILibColors.white} />
          <Text style={styles.logoutButtonText}>Se déconnecter</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: UILibColors.background,
  },
  loadingContainer: {
    flex: 1,
  },
  loadingBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: UILibColors.white,
    fontSize: 16,
    marginTop: 10,
  },
  headerBackground: {
    paddingTop: 50,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: UILibColors.white,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: UILibColors.white,
    opacity: 0.8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: -15,
  },
  errorContainer: {
    backgroundColor: UILibColors.error,
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    marginTop: 20,
  },
  errorText: {
    color: UILibColors.white,
    textAlign: 'center',
    fontSize: 14,
  },
  profileSection: {
    backgroundColor: UILibColors.white,
    borderRadius: 16,
    padding: 24,
    marginTop: 20,
    marginBottom: 16,
    alignItems: 'center',
    elevation: 5,
    shadowColor: UILibColors.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: UILibColors.white,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: UILibColors.primary,
    borderRadius: 16,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: UILibColors.white,
  },
  profileInfo: {
    alignItems: 'center',
    marginBottom: 16,
    width: '100%',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: UILibColors.text,
    marginBottom: 4,
  },
  nameInput: {
    fontSize: 24,
    fontWeight: 'bold',
    color: UILibColors.text,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: UILibColors.primary,
    paddingVertical: 4,
    marginBottom: 8,
    width: '100%',
  },
  profileTitle: {
    fontSize: 16,
    color: UILibColors.primary,
    fontWeight: '600',
    marginBottom: 2,
  },
  titleInput: {
    fontSize: 16,
    color: UILibColors.primary,
    fontWeight: '600',
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: UILibColors.primary,
    paddingVertical: 4,
    marginBottom: 8,
    width: '100%',
  },
  profileExperience: {
    fontSize: 14,
    color: UILibColors.placeholder,
  },
  experienceInput: {
    fontSize: 14,
    color: UILibColors.placeholder,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: UILibColors.primary,
    paddingVertical: 4,
    width: '100%',
  },
  editButton: {
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: UILibColors.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  gradientButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  editButtonText: {
    color: UILibColors.white,
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: UILibColors.white,
    borderRadius: 16,
    marginBottom: 16,
    elevation: 5,
    shadowColor: UILibColors.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20,
  },
  statBorder: {
    borderRightWidth: 1,
    borderRightColor: UILibColors.border,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: UILibColors.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: UILibColors.placeholder,
    fontWeight: '500',
  },
  contactSection: {
    backgroundColor: UILibColors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 5,
    shadowColor: UILibColors.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: UILibColors.text,
    marginBottom: 16,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: UILibColors.border,
  },
  contactText: {
    fontSize: 14,
    color: UILibColors.text,
    marginLeft: 12,
    flex: 1,
  },
  contactInput: {
    fontSize: 14,
    color: UILibColors.text,
    marginLeft: 12,
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: UILibColors.primary,
    paddingVertical: 4,
  },
  bioSection: {
    backgroundColor: UILibColors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 5,
    shadowColor: UILibColors.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  bioText: {
    fontSize: 14,
    color: UILibColors.text,
    lineHeight: 20,
  },
  bioInput: {
    fontSize: 14,
    color: UILibColors.text,
    lineHeight: 20,
    borderWidth: 1,
    borderColor: UILibColors.primary,
    borderRadius: 8,
    padding: 12,
    minHeight: 80,
  },
  menuSection: {
    backgroundColor: UILibColors.white,
    borderRadius: 16,
    marginBottom: 24,
    elevation: 5,
    shadowColor: UILibColors.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: UILibColors.border,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F9FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: UILibColors.text,
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 14,
    color: UILibColors.placeholder,
  },
  logoutButton: {
    backgroundColor: UILibColors.error,
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  logoutButtonText: {
    color: UILibColors.white,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});