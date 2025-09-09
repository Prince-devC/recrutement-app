import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Colors as UILibColors,
  TouchableOpacity,
} from 'react-native-ui-lib';
import { StyleSheet, ScrollView, Image, TextInput, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPin, Clock, DollarSign, Heart, Search } from 'lucide-react-native';
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
});

interface JobListing {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  postedDate: string;
  description: string;
  logo: string;
  isFavorite: boolean;
}

export default function HomeScreen() {
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredJobs, setFilteredJobs] = useState<JobListing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler le chargement des données
    const loadJobs = async () => {
      setLoading(true);
      // Simuler un délai d'API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockJobs: JobListing[] = [
        {
          id: '1',
          title: 'Développeur React Native',
          company: 'TechStart',
          location: 'Paris, France',
          salary: '45K - 60K €',
          type: 'CDI',
          postedDate: '2 jours',
          description: 'Nous recherchons un développeur React Native expérimenté pour rejoindre notre équipe dynamique et travailler sur des projets innovants...',
          logo: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
          isFavorite: false,
        },
        {
          id: '2',
          title: 'Designer UX/UI',
          company: 'Creative Agency',
          location: 'Lyon, France',
          salary: '40K - 50K €',
          type: 'CDI',
          postedDate: '1 jour',
          description: 'Passionné(e) par le design et l\'expérience utilisateur ? Rejoignez-nous pour créer des interfaces exceptionnelles...',
          logo: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
          isFavorite: true,
        },
        {
          id: '3',
          title: 'Chef de Projet Digital',
          company: 'Digital Solutions',
          location: 'Marseille, France',
          salary: '50K - 65K €',
          type: 'CDI',
          postedDate: '3 jours',
          description: 'Nous recherchons un chef de projet digital pour piloter nos projets innovants et coordonner les équipes techniques...',
          logo: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
          isFavorite: false,
        },
        {
          id: '4',
          title: 'Développeur Full-Stack',
          company: 'WebCorp',
          location: 'Toulouse, France',
          salary: '42K - 55K €',
          type: 'CDI',
          postedDate: '1 semaine',
          description: 'Rejoignez notre équipe de développement pour créer des applications web modernes et performantes avec les dernières technologies...',
          logo: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
          isFavorite: false,
        },
        {
          id: '5',
          title: 'Data Scientist',
          company: 'AI Innovations',
          location: 'Remote',
          salary: '60K - 80K €',
          type: 'CDI',
          postedDate: '4 jours',
          description: 'Passionné par l\'intelligence artificielle et l\'analyse de données ? Cette opportunité unique vous permettra de travailler sur des projets d\'IA...',
          logo: 'https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
          isFavorite: false,
        },
      ];
      
      setJobs(mockJobs);
      setFilteredJobs(mockJobs);
      setLoading(false);
    };

    loadJobs();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredJobs(jobs);
    } else {
      const filtered = jobs.filter(
        job =>
          job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredJobs(filtered);
    }
  }, [searchQuery, jobs]);

  const toggleFavorite = (jobId: string) => {
    setJobs(prevJobs =>
      prevJobs.map(job =>
        job.id === jobId ? { ...job, isFavorite: !job.isFavorite } : job
      )
    );
  };

  const renderJobCard = (job: JobListing) => (
    <TouchableOpacity key={job.id} style={styles.jobCard}>
      <View style={styles.cardHeader}>
        <View style={styles.logoContainer}>
          <Image source={{ uri: job.logo }} style={styles.companyLogo} />
        </View>
        <View style={styles.jobInfo}>
          <Text style={styles.jobTitle}>{job.title}</Text>
          <Text style={styles.companyName}>{job.company}</Text>
        </View>
        <TouchableOpacity onPress={() => toggleFavorite(job.id)} style={styles.favoriteButton}>
          <Heart
            size={20}
            color={job.isFavorite ? UILibColors.error : UILibColors.placeholder}
            fill={job.isFavorite ? UILibColors.error : 'transparent'}
          />
        </TouchableOpacity>
      </View>
      
      <View style={styles.jobDetails}>
        <View style={styles.detailRow}>
          <View style={styles.iconContainer}>
            <MapPin size={14} color={UILibColors.primary} />
          </View>
          <Text style={styles.detailText}>{job.location}</Text>
        </View>
        <View style={styles.detailRow}>
          <View style={styles.iconContainer}>
            <DollarSign size={14} color={UILibColors.primary} />
          </View>
          <Text style={styles.detailText}>{job.salary}</Text>
        </View>
        <View style={styles.detailRow}>
          <View style={styles.iconContainer}>
            <Clock size={14} color={UILibColors.primary} />
          </View>
          <Text style={styles.detailText}>Il y a {job.postedDate}</Text>
        </View>
      </View>
      
      <Text style={styles.jobDescription} numberOfLines={2}>
        {job.description}
      </Text>
      
      <View style={styles.cardFooter}>
        <View style={styles.typeTag}>
          <Text style={styles.typeText}>{job.type}</Text>
        </View>
        <TouchableOpacity style={styles.applyButton}>
          <LinearGradient
            colors={[UILibColors.primary, UILibColors.secondary]}
            style={styles.gradientButton}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.applyButtonText}>Postuler</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <LinearGradient colors={[UILibColors.primary, UILibColors.secondary]} style={styles.loadingBackground}>
          <ActivityIndicator size="large" color={UILibColors.white} />
          <Text style={styles.loadingText}>Chargement des offres...</Text>
        </LinearGradient>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Gradient Header */}
      <LinearGradient colors={[UILibColors.primary, UILibColors.secondary]} style={styles.headerBackground}>
        <Text style={styles.headerTitle}>Offres d'emploi</Text>
        <Text style={styles.headerSubtitle}>Trouvez votre prochain job de rêve</Text>
      </LinearGradient>

      <View style={styles.content}>
        {/* Search Section */}
        <View style={styles.searchSection}>
          <View style={styles.searchBar}>
            <Search size={20} color={UILibColors.placeholder} />
            <TextInput
              style={styles.searchInput}
              placeholder="Rechercher un poste, entreprise..."
              placeholderTextColor={UILibColors.placeholder}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        <ScrollView 
          style={styles.jobsList}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.jobsListContainer}
        >
          <View style={styles.resultsHeader}>
            <Text style={styles.resultsCount}>
              {filteredJobs.length} offre{filteredJobs.length > 1 ? 's' : ''} trouvée{filteredJobs.length > 1 ? 's' : ''}
            </Text>
            {filteredJobs.length > 0 && (
              <View style={styles.resultsIndicator}>
                <View style={styles.indicatorDot} />
                <Text style={styles.indicatorText}>Nouvelles offres</Text>
              </View>
            )}
          </View>
          
          {filteredJobs.map(renderJobCard)}
        </ScrollView>
      </View>
    </SafeAreaView>
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
    marginTop: -15,
  },
  searchSection: {
    backgroundColor: UILibColors.white,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    padding: 16,
    elevation: 5,
    shadowColor: UILibColors.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: UILibColors.background,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: UILibColors.border,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: UILibColors.text,
  },
  jobsList: {
    flex: 1,
  },
  jobsListContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  resultsCount: {
    fontSize: 16,
    color: UILibColors.text,
    fontWeight: '600',
  },
  resultsIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  indicatorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: UILibColors.success,
    marginRight: 6,
  },
  indicatorText: {
    fontSize: 12,
    color: UILibColors.success,
    fontWeight: '500',
  },
  jobCard: {
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
  logoContainer: {
    backgroundColor: UILibColors.background,
    borderRadius: 12,
    padding: 4,
    marginRight: 12,
  },
  companyLogo: {
    width: 48,
    height: 48,
    borderRadius: 8,
  },
  jobInfo: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: UILibColors.text,
    marginBottom: 4,
  },
  companyName: {
    fontSize: 14,
    color: UILibColors.primary,
    fontWeight: '500',
  },
  favoriteButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: UILibColors.background,
  },
  jobDetails: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F0F9FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  detailText: {
    fontSize: 14,
    color: UILibColors.text,
    fontWeight: '500',
  },
  jobDescription: {
    fontSize: 14,
    color: UILibColors.placeholder,
    lineHeight: 20,
    marginBottom: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  typeTag: {
    backgroundColor: '#F0F9FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: UILibColors.primary,
  },
  typeText: {
    fontSize: 12,
    color: UILibColors.primary,
    fontWeight: '600',
  },
  applyButton: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  gradientButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyButtonText: {
    color: UILibColors.white,
    fontSize: 14,
    fontWeight: '600',
  },
});