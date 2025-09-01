@@ .. @@
 import React, { createContext, useContext, useState } from 'react';
+import { apiService } from '../services/api';

 interface User {
@@ .. @@
   email: string;
   avatar?: string;
   role: 'user' | 'admin';
+  achievements?: Array<{
+    title: string;
+    description: string;
+    icon: string;
+  }>;
+  stats?: {
+    eventsParticipated: number;
+    eventsWon: number;
+    totalScore: number;
+  };
 }

@@ .. @@
 interface AuthContextType {
   user: User | null;
   login: (email: string, password: string) => Promise<void>;
+  register: (name: string, email: string, password: string) => Promise<void>;
   logout: () => void;
   isLoading: boolean;
+  error: string | null;
 }

@@ .. @@
 export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
   const [user, setUser] = useState<User | null>(null);
   const [isLoading, setIsLoading] = useState(false);
+  const [error, setError] = useState<string | null>(null);

   const login = async (email: string, password: string) => {
     setIsLoading(true);
+    setError(null);
     try {
-      // Simulate API call
-      await new Promise(resolve => setTimeout(resolve, 1000));
-      setUser({
-        id: '1',
-        name: 'John Doe',
-        email,
-        avatar: 'https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
-        role: email === 'admin@codingarena.com' ? 'admin' : 'user'
-      });
+      const response = await apiService.login(email, password);
+      setUser(response.user);
+    } catch (err: any) {
+      setError(err.message || 'Login failed');
+      throw err;
     } finally {
       setIsLoading(false);
     }
   };

+  const register = async (name: string, email: string, password: string) => {
+    setIsLoading(true);
+    setError(null);
+    try {
+      const response = await apiService.register(name, email, password);
+      setUser(response.user);
+    } catch (err: any) {
+      setError(err.message || 'Registration failed');
+      throw err;
+    } finally {
+      setIsLoading(false);
+    }
+  };
+
   const logout = () => {
+    apiService.logout();
     setUser(null);
+    setError(null);
   };

   return (
-    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
+    <AuthContext.Provider value={{ user, login, register, logout, isLoading, error }}>
       {children}
     </AuthContext.Provider>
   );
 };