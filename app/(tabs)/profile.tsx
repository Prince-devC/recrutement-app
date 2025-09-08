import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Mail, Phone, MapPin, Calendar, Briefcase, GraduationCap, Settings, Bell, FileText, CreditCard as Edit, Camera } from 'lucide-react-native';

export default function ProfileScreen() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Marie Dubois',
    email: 'marie.dubois@email.com',
    phone: '+33 6 12 34 56 78',
    location: 'Paris, France',
    title: 'Développeuse Full-Stack',
    experience: '5 ans d\'expérience',
    bio: 'Passionnée par le développement web et mobile, je recherche de nouveaux défis dans une équipe dynamique.',
    avatar: 'https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
  });

  const menuItems = [
    { icon: <FileText size={20} color="#3b82f6" />, title: 'Mon CV', subtitle: 'Gérer mon curriculum vitae' },
    { icon: <Bell size={20} color="#3b82f6" />, title: 'Notifications', subtitle: 'Alertes et préférences' },
    { icon: <Settings size={20} color="#3b82f6" />, title: 'Paramètres', subtitle: 'Confidentialité et sécurité' },
  ];

  const stats = [
    { label: 'Candidatures', value: '12' },
    { label: 'Vues profil', value: '48' },
    { label: 'Favoris', value: '6' },
  ];

  const renderProfileSection = () => (
    <View style={styles.profileSection}>
      <View style={styles.avatarContainer}>
        <Image source={{ uri: profile.avatar }} style={styles.avatar} />
        <TouchableOpacity style={styles.cameraButton}>
          <Camera size={16} color="#ffffff" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.profileInfo}>
        <Text style={styles.profileName}>{profile.name}</Text>
        <Text style={styles.profileTitle}>{profile.title}</Text>
        <Text style={styles.profileExperience}>{profile.experience}</Text>
      </View>
      
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => setIsEditing(!isEditing)}
      >
        <Edit size={16} color="#3b82f6" />
        <Text style={styles.editButtonText}>
          {isEditing ? 'Sauvegarder' : 'Modifier'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderStatsRow = () => (
    <View style={styles.statsRow}>
      {stats.map((stat, index) => (
        <View key={index} style={styles.statItem}>
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
        <Mail size={18} color="#6b7280" />
        {isEditing ? (
          <TextInput
            style={styles.contactInput}
            value={profile.email}
            onChangeText={(text) => setProfile({...profile, email: text})}
          />
        ) : (
          <Text style={styles.contactText}>{profile.email}</Text>
        )}
      </View>
      
      <View style={styles.contactItem}>
        <Phone size={18} color="#6b7280" />
        {isEditing ? (
          <TextInput
            style={styles.contactInput}
            value={profile.phone}
            onChangeText={(text) => setProfile({...profile, phone: text})}
          />
        ) : (
          <Text style={styles.contactText}>{profile.phone}</Text>
        )}
      </View>
      
      <View style={styles.contactItem}>
        <MapPin size={18} color="#6b7280" />
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
            {item.icon}
          </View>
          <View style={styles.menuContent}>
            <Text style={styles.menuTitle}>{item.title}</Text>
            <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mon Profil</Text>
        <Text style={styles.headerSubtitle}>Gérez vos informations personnelles</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderProfileSection()}
        {renderStatsRow()}
        {renderContactInfo()}
        {renderBioSection()}
        {renderMenuItems()}
        
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Se déconnecter</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    backgroundColor: '#ffffff',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  profileSection: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    marginTop: 20,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
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
    borderColor: '#ffffff',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#3b82f6',
    borderRadius: 16,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  profileInfo: {
    alignItems: 'center',
    marginBottom: 16,
  },
  profileName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 4,
  },
  profileTitle: {
    fontSize: 16,
    color: '#3b82f6',
    fontWeight: '600',
    marginBottom: 2,
  },
  profileExperience: {
    fontSize: 14,
    color: '#6b7280',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#3b82f6',
  },
  editButtonText: {
    color: '#3b82f6',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20,
    borderRightWidth: 1,
    borderRightColor: '#f3f4f6',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
  contactSection: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  contactText: {
    fontSize: 14,
    color: '#4b5563',
    marginLeft: 12,
    flex: 1,
  },
  contactInput: {
    fontSize: 14,
    color: '#4b5563',
    marginLeft: 12,
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#3b82f6',
    paddingVertical: 4,
  },
  bioSection: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  bioText: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20,
  },
  bioInput: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20,
    borderWidth: 1,
    borderColor: '#3b82f6',
    borderRadius: 8,
    padding: 12,
    textAlignVertical: 'top',
  },
  menuSection: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f9ff',
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
    color: '#1f2937',
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  logoutButton: {
    backgroundColor: '#ef4444',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 32,
  },
  logoutButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});