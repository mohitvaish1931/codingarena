@@ .. @@
 import { ThemeProvider } from './contexts/ThemeContext';
 import { AuthProvider } from './contexts/AuthContext';
+import { NotificationProvider } from './components/NotificationSystem';
 import Navbar from './components/Navbar';
@@ .. @@
 function App() {
   return (
     <ThemeProvider>
-      <AuthProvider>
-        <Router>
-          <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
-            <Navbar />
-            <main>
-              <Routes>
-                <Route path="/" element={<HomePage />} />
-                <Route path="/events" element={<EventsPage />} />
-                <Route path="/events/:id" element={<EventDetailPage />} />
-                <Route path="/community" element={<CommunityPage />} />
-                <Route path="/admin" element={<AdminPage />} />
-                <Route path="/login" element={<LoginPage />} />
-                <Route path="/winners" element={<WinnersPage />} />
-                <Route path="/news" element={<NewsPage />} />
-              </Routes>
-            </main>
-            <Footer />
-          </div>
-        </Router>
-      </AuthProvider>
+      <NotificationProvider>
+        <AuthProvider>
+          <Router>
+            <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
+              <Navbar />
+              <main>
+                <Routes>
+                  <Route path="/" element={<HomePage />} />
+                  <Route path="/events" element={<EventsPage />} />
+                  <Route path="/events/:id" element={<EventDetailPage />} />
+                  <Route path="/community" element={<CommunityPage />} />
+                  <Route path="/admin" element={<AdminPage />} />
+                  <Route path="/login" element={<LoginPage />} />
+                  <Route path="/winners" element={<WinnersPage />} />
+                  <Route path="/news" element={<NewsPage />} />
+                </Routes>
+              </main>
+              <Footer />
+            </div>
+          </Router>
+        </AuthProvider>
+      </NotificationProvider>
     </ThemeProvider>
   );
 }