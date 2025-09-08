import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPin, Clock, DollarSign, Heart, Search } from 'lucide-react-native';

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

  useEffect(() => {
    // Simuler des données d'offres d'emploi
    const mockJobs: JobListing[] = [
      {
        id: '1',
        title: 'Développeur React Native',
        company: 'TechStart',
        location: 'Paris, France',
        salary: '45K - 60K €',
        type: 'CDI',
        postedDate: '2 jours',
        description: 'Nous recherchons un développeur React Native expérimenté pour rejoindre notre équipe dynamique...',
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
        description: 'Nous recherchons un chef de projet digital pour piloter nos projets innovants...',
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
        description: 'Rejoignez notre équipe de développement pour créer des applications web modernes et performantes...',
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
        description: 'Passionné par l\'intelligence artificielle et l\'analyse de données ? Cette opportunité est pour vous...',
        logo: 'https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
        isFavorite: false,
      },
    ];
    
    setJobs(mockJobs);
    setFilteredJobs(mockJobs);
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
        <Image source={{ uri: job.logo }} style={styles.companyLogo} />
        <View style={styles.jobInfo}>
          <Text style={styles.jobTitle}>{job.title}</Text>
          <Text style={styles.companyName}>{job.company}</Text>
        </View>
        <TouchableOpacity onPress={() => toggleFavorite(job.id)} style={styles.favoriteButton}>
          <Heart
            size={20}
            color={job.isFavorite ? '#ef4444' : '#6b7280'}
            fill={job.isFavorite ? '#ef4444' : 'transparent'}
          />
        </TouchableOpacity>
      </View>
      
      <View style={styles.jobDetails}>
        <View style={styles.detailRow}>
          <MapPin size={14} color="#6b7280" />
          <Text style={styles.detailText}>{job.location}</Text>
        </View>
        <View style={styles.detailRow}>
          <DollarSign size={14} color="#6b7280" />
          <Text style={styles.detailText}>{job.salary}</Text>
        </View>
        <View style={styles.detailRow}>
          <Clock size={14} color="#6b7280" />
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
          <Text style={styles.applyButtonText}>Postuler</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Offres d'emploi</Text>
        <Text style={styles.headerSubtitle}>Trouvez votre prochain job</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#6b7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher un poste, entreprise..."
            placeholderTextColor="#9ca3af"
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
        <Text style={styles.resultsCount}>
          {filteredJobs.length} offre{filteredJobs.length > 1 ? 's' : ''} trouvée{filteredJobs.length > 1 ? 's' : ''}
        </Text>
        
        {filteredJobs.map(renderJobCard)}
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
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#1f2937',
  },
  jobsList: {
    flex: 1,
  },
  jobsListContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  resultsCount: {
    fontSize: 14,
    color: '#6b7280',
    marginVertical: 16,
    fontWeight: '500',
  },
  jobCard: {
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
  jobInfo: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  companyName: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  favoriteButton: {
    padding: 4,
  },
  jobDetails: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  detailText: {
    fontSize: 14,
    color: '#6b7280',
    marginLeft: 8,
  },
  jobDescription: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20,
    marginBottom: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  typeTag: {
    backgroundColor: '#dbeafe',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  typeText: {
    fontSize: 12,
    color: '#3b82f6',
    fontWeight: '600',
  },
  applyButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  applyButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
});