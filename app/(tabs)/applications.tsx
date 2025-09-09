import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Colors as UILibColors,
  TouchableOpacity,
} from 'react-native-ui-lib';
import { StyleSheet, ScrollView, Image, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

// Color palette definition (consistent with profile.tsx)
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
  warning: '#FF9800',
  info: '#2196F3',
});

interface Application {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  appliedDate: string;
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
  logo: string;
}

export default function ApplicationsScreen() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Simulate loading applications data from database
  useEffect(() => {
    const loadApplicationsData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Simulate loaded data from database
        const mockApplications: Application[] = [
          {
            id: '1',
            jobTitle: 'Développeur React Native',
            company: 'TechStart',
            location: 'Paris, France',
            appliedDate: '15 Jan 2025',
            status: 'pending',
            logo: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
          },
          {
            id: '2',
            jobTitle: 'Designer UX/UI',
            company: 'Creative Agency',
            location: 'Lyon, France',
            appliedDate: '12 Jan 2025',
            status: 'reviewed',
            logo: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
          },
          {
            id: '3',
            jobTitle: 'Chef de Projet Digital',
            company: 'Digital Solutions',
            location: 'Marseille, France',
            appliedDate: '10 Jan 2025',
            status: 'accepted',
            logo: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
          },
          {
            id: '4',
            jobTitle: 'Développeur Full-Stack',
            company: 'WebCorp',
            location: 'Toulouse, France',
            appliedDate: '8 Jan 2025',
            status: 'rejected',
            logo: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
          },
          {
            id: '5',
            jobTitle: 'Product Manager',
            company: 'InnovateCorp',
            location: 'Nice, France',
            appliedDate: '5 Jan 2025',
            status: 'pending',
            logo: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
          },
        ];
        
        setApplications(mockApplications);
      } catch (err: any) {
        setError('Impossible de charger les candidatures');
      } finally {
        setLoading(false);
      }
    };

    loadApplicationsData();
  }, []);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'pending':
        return {
          icon: 'time-outline',
          text: 'En attente',
          color: UILibColors.warning,
          bgColor: '#FFF3E0',
        };
      case 'reviewed':
        return {
          icon: 'eye-outline',
          text: 'Examinée',
          color: UILibColors.info,
          bgColor: '#E3F2FD',
        };
      case 'accepted':
        return {
          icon: 'checkmark-circle-outline',
          text: 'Acceptée',
          color: UILibColors.success,
          bgColor: '#E8F5E8',
        };
      case 'rejected':
        return {
          icon: 'close-circle-outline',
          text: 'Refusée',
          color: UILibColors.error,
          bgColor: '#FFEBEE',
        };
      default:
        return {
          icon: 'help-circle-outline',
          text: 'Inconnu',
          color: UILibColors.placeholder,
          bgColor: UILibColors.border,
        };
    }
  };

  const getStatusStats = () => {
    const stats = applications.reduce((acc, app) => {
      acc[app.status] = (acc[app.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return [
      { label: 'Total', value: applications.length, color: UILibColors.primary },
      { label: 'En attente', value: stats.pending || 0, color: UILibColors.warning },
      { label: 'Acceptées', value: stats.accepted || 0, color: UILibColors.success },
      { label: 'Refusées', value: stats.rejected || 0, color: UILibColors.error },
    ];
  };

  const handleApplicationPress = (application: Application) => {
    Alert.alert(
      application.jobTitle,
      `Détails de votre candidature chez ${application.company}`,
      [
        { text: 'Fermer', style: 'cancel' },
        { text: 'Voir détails', onPress: () => console.log('Navigate to details') }
      ]
    );
  };

  const renderApplicationCard = (application: Application) => {
    const statusConfig = getStatusConfig(application.status);

    return (
      <TouchableOpacity 
        key={application.id} 
        style={styles.applicationCard}
        onPress={() => handleApplicationPress(application)}
        activeOpacity={0.7}
      >
        <View style={styles.cardHeader}>
          <Image source={{ uri: application.logo }} style={styles.companyLogo} />
          <View style={styles.applicationInfo}>
            <Text style={styles.jobTitle}>{application.jobTitle}</Text>
            <Text style={styles.companyName}>{application.company}</Text>
            <View style={styles.locationRow}>
              <Ionicons name="location-outline" size={14} color={UILibColors.placeholder} />
              <Text style={styles.locationText}>{application.location}</Text>
            </View>
          </View>
        </View>

        <View style={styles.cardFooter}>
          <View style={styles.dateContainer}>
            <Text style={styles.appliedLabel}>Postulé le</Text>
            <Text style={styles.appliedDate}>{application.appliedDate}</Text>
          </View>
          
          <View style={[styles.statusBadge, { backgroundColor: statusConfig.bgColor }]}>
            <Ionicons name={statusConfig.icon as any} size={16} color={statusConfig.color} />
            <Text style={[styles.statusText, { color: statusConfig.color }]}>
              {statusConfig.text}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderStatsRow = () => (
    <View style={styles.statsContainer}>
      {getStatusStats().map((stat, index) => (
        <View key={index} style={[styles.statCard, index < getStatusStats().length - 1 && styles.statBorder]}>
          <Text style={[styles.statValue, { color: stat.color }]}>{stat.value}</Text>
          <Text style={styles.statLabel}>{stat.label}</Text>
        </View>
      ))}
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <View style={styles.emptyIconContainer}>
        <Ionicons name="document-text-outline" size={48} color={UILibColors.placeholder} />
      </View>
      <Text style={styles.emptyTitle}>Aucune candidature</Text>
      <Text style={styles.emptySubtitle}>
        Vos candidatures apparaîtront ici une fois que vous aurez postulé à des offres.
      </Text>
      <TouchableOpacity style={styles.exploreButton}>
        <LinearGradient
          colors={[UILibColors.primary, UILibColors.secondary]}
          style={styles.gradientButton}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Ionicons name="search-outline" size={16} color={UILibColors.white} />
          <Text style={styles.exploreButtonText}>Explorer les offres</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <LinearGradient colors={[UILibColors.primary, UILibColors.secondary]} style={styles.loadingBackground}>
          <ActivityIndicator size="large" color={UILibColors.white} />
          <Text style={styles.loadingText}>Chargement des candidatures...</Text>
        </LinearGradient>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Gradient Header */}
      <LinearGradient colors={[UILibColors.primary, UILibColors.secondary]} style={styles.headerBackground}>
        <Text style={styles.headerTitle}>Mes candidatures</Text>
        <Text style={styles.headerSubtitle}>Suivez l'état de vos postulations</Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {applications.length > 0 && renderStatsRow()}

        <View style={styles.applicationsSection}>
          {applications.length > 0 && (
            <Text style={styles.sectionTitle}>
              {applications.length} candidature{applications.length > 1 ? 's' : ''}
            </Text>
          )}
          
          {applications.map(renderApplicationCard)}
        </View>

        {applications.length === 0 && renderEmptyState()}
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
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: UILibColors.white,
    borderRadius: 16,
    marginTop: 20,
    marginBottom: 24,
    elevation: 5,
    shadowColor: UILibColors.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  statCard: {
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
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: UILibColors.placeholder,
    fontWeight: '500',
    textAlign: 'center',
  },
  applicationsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: UILibColors.text,
    marginBottom: 16,
  },
  applicationCard: {
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
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  companyLogo: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginRight: 12,
    borderWidth: 1,
    borderColor: UILibColors.border,
  },
  applicationInfo: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: UILibColors.text,
    marginBottom: 4,
  },
  companyName: {
    fontSize: 14,
    color: UILibColors.placeholder,
    fontWeight: '500',
    marginBottom: 6,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 12,
    color: UILibColors.placeholder,
    marginLeft: 4,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateContainer: {
    flex: 1,
  },
  appliedLabel: {
    fontSize: 12,
    color: UILibColors.placeholder,
    marginBottom: 2,
  },
  appliedDate: {
    fontSize: 14,
    color: UILibColors.text,
    fontWeight: '500',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 6,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  emptyIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: UILibColors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: UILibColors.text,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: UILibColors.placeholder,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  exploreButton: {
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
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  exploreButtonText: {
    color: UILibColors.white,
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
});