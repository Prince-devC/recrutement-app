import React, { useState } from 'react';
import {
  View,
  Text,
  Colors as UILibColors,
  TouchableOpacity,
} from 'react-native-ui-lib';
import { StyleSheet, ScrollView, TextInput, ActivityIndicator } from 'react-native';
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

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedSalary, setSelectedSalary] = useState('');
  const [loading, setLoading] = useState(false);

  const jobTypes = ['CDI', 'CDD', 'Freelance', 'Stage', 'Alternance'];
  const locations = ['Paris', 'Lyon', 'Marseille', 'Toulouse', 'Nice', 'Nantes', 'Télétravail'];
  const salaryRanges = ['20K - 30K €', '30K - 40K €', '40K - 50K €', '50K - 60K €', '60K+ €'];

  const handleSearch = async () => {
    setLoading(true);
    // Simulate search delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);
    // Here you would navigate to results or update results
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedLocation('');
    setSelectedType('');
    setSelectedSalary('');
  };

  const renderFilterSection = (title: string, iconName: string, items: string[], selectedItem: string, onSelect: (item: string) => void) => (
    <View style={styles.filterSection}>
      <View style={styles.filterHeader}>
        <View style={styles.filterIconContainer}>
          <Ionicons name={iconName as any} size={18} color={UILibColors.primary} />
        </View>
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
    <View style={styles.container}>
      {/* Gradient Header */}
      <LinearGradient colors={[UILibColors.primary, UILibColors.secondary]} style={styles.headerBackground}>
        <Text style={styles.headerTitle}>Recherche Avancée</Text>
        <Text style={styles.headerSubtitle}>Trouvez l'emploi de vos rêves</Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Search Section */}
        <View style={styles.searchSection}>
          <Text style={styles.sectionTitle}>Que recherchez-vous ?</Text>
          <View style={styles.searchBar}>
            <Ionicons name="search-outline" size={20} color={UILibColors.placeholder} />
            <TextInput
              style={styles.searchInput}
              placeholder="Poste, compétences, entreprise..."
              placeholderTextColor={UILibColors.placeholder}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={20} color={UILibColors.placeholder} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Filter Sections */}
        {renderFilterSection(
          'Localisation',
          'location-outline',
          locations,
          selectedLocation,
          setSelectedLocation
        )}

        {renderFilterSection(
          'Type de contrat',
          'briefcase-outline',
          jobTypes,
          selectedType,
          setSelectedType
        )}

        {renderFilterSection(
          'Salaire',
          'card-outline',
          salaryRanges,
          selectedSalary,
          setSelectedSalary
        )}

        {/* Popular Searches */}
        <View style={styles.suggestionsSection}>
          <Text style={styles.sectionTitle}>Recherches populaires</Text>
          <View style={styles.suggestionsList}>
            {['Développeur React', 'Designer UX/UI', 'Chef de projet', 'Data Scientist', 'DevOps', 'Marketing Digital'].map((suggestion) => (
              <TouchableOpacity key={suggestion} style={styles.suggestionChip}>
                <Ionicons name="trending-up-outline" size={14} color={UILibColors.primary} />
                <Text style={styles.suggestionText}>{suggestion}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Searches */}
        <View style={styles.recentSearches}>
          <Text style={styles.sectionTitle}>Recherches récentes</Text>
          <View style={styles.recentList}>
            {[
              'Développeur Mobile Paris',
              'UX Designer Télétravail',
              'Chef de projet Lyon'
            ].map((recent, index) => (
              <TouchableOpacity key={index} style={styles.recentItem}>
                <View style={styles.recentIconContainer}>
                  <Ionicons name="time-outline" size={16} color={UILibColors.placeholder} />
                </View>
                <Text style={styles.recentText}>{recent}</Text>
                <Ionicons name="arrow-forward" size={16} color={UILibColors.placeholder} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Action Buttons */}
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch} disabled={loading}>
          <LinearGradient
            colors={[UILibColors.primary, UILibColors.secondary]}
            style={styles.gradientButton}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            {loading ? (
              <ActivityIndicator color={UILibColors.white} size="small" />
            ) : (
              <>
                <Ionicons name="search" size={20} color={UILibColors.white} />
                <Text style={styles.searchButtonText}>Lancer la recherche</Text>
              </>
            )}
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity style={styles.clearButton} onPress={clearFilters}>
          <Ionicons name="refresh-outline" size={16} color={UILibColors.placeholder} />
          <Text style={styles.clearButtonText}>Effacer tous les filtres</Text>
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
  searchSection: {
    marginTop: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: UILibColors.text,
    marginBottom: 12,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: UILibColors.white,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 5,
    shadowColor: UILibColors.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: UILibColors.text,
  },
  filterSection: {
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
  filterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  filterIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F0F9FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: UILibColors.text,
  },
  filterOptions: {
    flexDirection: 'row',
  },
  filterOption: {
    backgroundColor: UILibColors.background,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
    borderColor: UILibColors.border,
  },
  selectedFilterOption: {
    backgroundColor: UILibColors.primary,
    borderColor: UILibColors.primary,
  },
  filterOptionText: {
    fontSize: 14,
    color: UILibColors.placeholder,
    fontWeight: '500',
  },
  selectedFilterOptionText: {
    color: UILibColors.white,
  },
  suggestionsSection: {
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
  suggestionsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  suggestionChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F9FF',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  suggestionText: {
    fontSize: 14,
    color: UILibColors.text,
    fontWeight: '500',
    marginLeft: 6,
  },
  recentSearches: {
    backgroundColor: UILibColors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
    elevation: 5,
    shadowColor: UILibColors.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  recentList: {
    marginTop: 4,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: UILibColors.border,
  },
  recentIconContainer: {
    marginRight: 12,
  },
  recentText: {
    fontSize: 14,
    color: UILibColors.text,
    fontWeight: '500',
    flex: 1,
  },
  searchButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
    elevation: 3,
    shadowColor: UILibColors.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  gradientButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  searchButtonText: {
    color: UILibColors.white,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginBottom: 20,
  },
  clearButtonText: {
    color: UILibColors.placeholder,
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 6,
  },
});