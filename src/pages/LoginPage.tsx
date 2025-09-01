@@ .. @@
   const { login, isLoading } = useAuth();
+  const { register } = useAuth();
   const navigate = useNavigate();

@@ .. @@
   const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
-    if (isLogin) {
-      await login(formData.email, formData.password);
-      navigate('/');
-    } else {
-      // Handle registration
-      console.log('Register:', formData);
+    try {
+      if (isLogin) {
+        await login(formData.email, formData.password);
+      } else {
+        if (formData.password !== formData.confirmPassword) {
+          alert('Passwords do not match');
+          return;
+        }
+        await register(formData.name, formData.email, formData.password);
+      }
+      navigate('/');
+    } catch (error) {
+      console.error('Authentication error:', error);
     }
   };