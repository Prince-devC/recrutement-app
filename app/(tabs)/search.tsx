import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, MapPin, Filter, Briefcase, Clock, DollarSign } from 'lucide-react-native';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedSalary, setSelectedSalary] = useState('');

  const jobTypes = ['CDI', 'CDD', 'Freelance', 'Stage', 'Alternance'];
  const locations = ['Paris', 'Lyon', 'Marseille', 'Toulouse', 'Nice', 'Nantes', 'Remote'];
  const salaryRanges = ['20K - 30K €', '30K - 40K €', '40K - 50K €', '50K - 60K €', '60K+ €'];

  const renderFilterSection = (title: string, icon: any, items: string[], selectedItem: string, onSelect: (item: string) => void) => (
    <View style={styles.filterSection}>
      <View style={styles.filterHeader}>
        {icon}
        <Text style={styles.filterTitle}>{title}</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterOptions}>
        {items.map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.filterOption,
              selectedItem === item && styles.selectedFilterOption
            ]}
            onPress={() => onSelect(selectedItem === item ? '' : item)}
          >
            <Text
              style={[
                styles.filterOptionText,
                selectedItem === item && styles.selectedFilterOptionText
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Recherche avancée</Text>
        <Text style={styles.headerSubtitle}>Affinez vos critères de recherche</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.searchSection}>
          <Text style={styles.sectionTitle}>Que recherchez-vous ?</Text>
          <View style={styles.searchBar}>
            <Search size={20} color="#6b7280" />
            <TextInput
              style={styles.searchInput}
              placeholder="Poste, compétences, entreprise..."
              placeholderTextColor="#9ca3af"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {renderFilterSection(
          'Localisation',
          <MapPin size={18} color="#3b82f6" />,
          locations,
          selectedLocation,
          setSelectedLocation
        )}

        {renderFilterSection(
          'Type de contrat',
          <Briefcase size={18} color="#10b981" />,
          jobTypes,
          selectedType,
          setSelectedType
        )}

        {renderFilterSection(
          'Salaire',
          <DollarSign size={18} color="#f59e0b" />,
          salaryRanges,
          selectedSalary,
          setSelectedSalary
        )}

        <View style={styles.suggestionsSection}>
          <Text style={styles.sectionTitle}>Recherches populaires</Text>
          <View style={styles.suggestionsList}>
            {['Développeur React', 'Designer UX/UI', 'Chef de projet', 'Data Scientist', 'DevOps'].map((suggestion) => (
              <TouchableOpacity key={suggestion} style={styles.suggestionChip}>
                <Text style={styles.suggestionText}>{suggestion}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.recentSearches}>
          <Text style={styles.sectionTitle}>Recherches récentes</Text>
          <View style={styles.recentList}>
            {['Développeur Mobile Paris', 'UX Designer Remote', 'Chef de projet Lyon'].map((recent, index) => (
              <TouchableOpacity key={index} style={styles.recentItem}>
                <Clock size={16} color="#6b7280" />
                <Text style={styles.recentText}>{recent}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.searchButton}>
          <Search size={20} color="#ffffff" />
          <Text style={styles.searchButtonText}>Lancer la recherche</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.clearButton}>
          <Text style={styles.clearButtonText}>Effacer tous les filtres</Text>
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
  searchSection: {
    marginTop: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#1f2937',
  },
  filterSection: {
    marginBottom: 24,
  },
  filterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginLeft: 8,
  },
  filterOptions: {
    flexDirection: 'row',
  },
  filterOption: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  selectedFilterOption: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  filterOptionText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  selectedFilterOptionText: {
    color: '#ffffff',
  },
  suggestionsSection: {
    marginBottom: 24,
  },
  suggestionsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  suggestionChip: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  suggestionText: {
    fontSize: 14,
    color: '#4b5563',
    fontWeight: '500',
  },
  recentSearches: {
    marginBottom: 32,
  },
  recentList: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 4,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  recentText: {
    fontSize: 14,
    color: '#4b5563',
    marginLeft: 8,
    fontWeight: '500',
  },
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3b82f6',
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  searchButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  clearButton: {
    alignItems: 'center',
    paddingVertical: 12,
    marginBottom: 20,
  },
  clearButtonText: {
    color: '#6b7280',
    fontSize: 14,
    fontWeight: '500',
  },
});