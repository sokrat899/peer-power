import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useStore } from '../src/store/useStore';

export default function Onboarding() {
  const router = useRouter();
  const { registerUser, isLoading } = useStore();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  const handleRegister = async () => {
    if (!name.trim() || !email.trim() || !address.trim()) {
      Alert.alert('Ошибка', 'Пожалуйста, заполните все поля');
      return;
    }

    try {
      await registerUser({ name, email, address });
      router.replace('/(tabs)/marketplace');
    } catch (error: any) {
      Alert.alert('Ошибка', error.response?.data?.detail || 'Не удалось зарегистрироваться');
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Logo */}
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Ionicons name="flash" size={60} color="#10B981" />
          </View>
          <Text style={styles.logoText}>P2P Energy</Text>
          <Text style={styles.subtitle}>Торговля энергией между соседями</Text>
        </View>

        {/* Features */}
        <View style={styles.featuresContainer}>
          <View style={styles.featureItem}>
            <Ionicons name="sunny" size={24} color="#10B981" />
            <Text style={styles.featureText}>Продавайте солнечную энергию</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="cart" size={24} color="#10B981" />
            <Text style={styles.featureText}>Покупайте в радиусе 1-5 км</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="analytics" size={24} color="#10B981" />
            <Text style={styles.featureText}>AI-рекомендации по продажам</Text>
          </View>
        </View>

        {/* Registration Form */}
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Регистрация</Text>
          
          <View style={styles.inputContainer}>
            <Ionicons name="person-outline" size={20} color="#64748B" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Ваше имя"
              placeholderTextColor="#64748B"
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={20} color="#64748B" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#64748B"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="location-outline" size={20} color="#64748B" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Ваш адрес"
              placeholderTextColor="#64748B"
              value={address}
              onChangeText={setAddress}
            />
          </View>

          <TouchableOpacity
            style={[styles.registerButton, isLoading && styles.buttonDisabled]}
            onPress={handleRegister}
            disabled={isLoading}
          >
            <Text style={styles.registerButtonText}>
              {isLoading ? 'Загрузка...' : 'Начать'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#94A3B8',
    textAlign: 'center',
  },
  featuresContainer: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  featureText: {
    color: '#E2E8F0',
    fontSize: 15,
  },
  formContainer: {
    flex: 1,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: 52,
    color: '#FFFFFF',
    fontSize: 16,
  },
  registerButton: {
    backgroundColor: '#10B981',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});
