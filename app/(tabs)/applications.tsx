import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Clock, CircleCheck as CheckCircle, Circle as XCircle, Eye, MapPin } from 'lucide-react-native';

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
  const [applications] = useState<Application[]>([
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
  ]);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'pending':
        return {
          icon: <Clock size={16} color="#f59e0b" />,
          text: 'En attente',
          color: '#f59e0b',
          bgColor: '#fef3c7',
        };
      case 'reviewed':
        return {
          icon: <Eye size={16} color="#3b82f6" />,
          text: 'Examinée',
          color: '#3b82f6',
          bgColor: '#dbeafe',
        };
      case 'accepted':
        return {
          icon: <CheckCircle size={16} color="#10b981" />,
          text: 'Acceptée',
          color: '#10b981',
          bgColor: '#d1fae5',
        };
      case 'rejected':
        return {
          icon: <XCircle size={16} color="#ef4444" />,
          text: 'Refusée',
          color: '#ef4444',
          bgColor: '#fee2e2',
        };
      default:
        return {
          icon: <Clock size={16} color="#6b7280" />,
          text: 'Inconnu',
          color: '#6b7280',
          bgColor: '#f3f4f6',
        };
    }
  };

  const getStatusStats = () => {
    const stats = applications.reduce((acc, app) => {
      acc[app.status] = (acc[app.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return [
      { label: 'Total', value: applications.length, color: '#3b82f6' },
      { label: 'En attente', value: stats.pending || 0, color: '#f59e0b' },
      { label: 'Acceptées', value: stats.accepted || 0, color: '#10b981' },
      { label: 'Refusées', value: stats.rejected || 0, color: '#ef4444' },
    ];
  };

  const renderApplicationCard = (application: Application) => {
    const statusConfig = getStatusConfig(application.status);

    return (
      <TouchableOpacity key={application.id} style={styles.applicationCard}>
        <View style={styles.cardHeader}>
          <Image source={{ uri: application.logo }} style={styles.companyLogo} />
          <View style={styles.applicationInfo}>
            <Text style={styles.jobTitle}>{application.jobTitle}</Text>
            <Text style={styles.companyName}>{application.company}</Text>
            <View style={styles.locationRow}>
              <MapPin size={12} color="#6b7280" />
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
            {statusConfig.icon}
            <Text style={[styles.statusText, { color: statusConfig.color }]}>
              {statusConfig.text}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mes candidatures</Text>
        <Text style={styles.headerSubtitle}>Suivez l'état de vos postulations</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.statsContainer}>
          {getStatusStats().map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <Text style={[styles.statValue, { color: stat.color }]}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.applicationsSection}>
          <Text style={styles.sectionTitle}>
            {applications.length} candidature{applications.length > 1 ? 's' : ''}
          </Text>
          
          {applications.map(renderApplicationCard)}
        </View>

        {applications.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>Aucune candidature</Text>
            <Text style={styles.emptySubtitle}>
              Vos candidatures apparaîtront ici une fois que vous aurez postulé à des offres.
            </Text>
            <TouchableOpacity style={styles.exploreButton}>
              <Text style={styles.exploreButtonText}>Explorer les offres</Text>
            </TouchableOpacity>
          </View>
        )}
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
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 24,
  },
  statCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
    textAlign: 'center',
  },
  applicationsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  applicationCard: {
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
  },
  applicationInfo: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  companyName: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
    marginBottom: 6,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 12,
    color: '#6b7280',
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
    color: '#6b7280',
    marginBottom: 2,
  },
  appliedDate: {
    fontSize: 14,
    color: '#1f2937',
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
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  exploreButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  exploreButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
});