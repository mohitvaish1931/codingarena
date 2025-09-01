@@ .. @@
 import { ArrowRight, Calendar, Users, Trophy, Zap, Target, Rocket } from 'lucide-react';
 import EventCard from '../components/EventCard';
 import CommunitySpotlight from '../components/CommunitySpotlight';
+import HeroAnimation from '../components/HeroAnimation';
+import AnimatedCounter from '../components/AnimatedCounter';
+import { useEvents } from '../hooks/useEvents';

 const HomePage = () => {
-  const upcomingEvents = [
-    {
-      id: '1',
-      title: 'Weekly DSA Challenge',
-      description: 'Test your data structures and algorithms knowledge',
-      date: '2025-01-15',
-      time: '18:00',
-      participants: 234,
-      difficulty: 'Medium',
-      status: 'upcoming' as const
-    },
-    {
-      id: '2',
-      title: 'Frontend Showdown',
-      description: 'Build amazing UIs in this rapid development contest',
-      date: '2025-01-18',
-      time: '15:00',
-      participants: 156,
-      difficulty: 'Hard',
-      status: 'upcoming' as const
-    },
-    {
-      id: '3',
-      title: 'AI/ML Sprint',
-      description: 'Create intelligent solutions to real-world problems',
-      date: '2025-01-20',
-      time: '10:00',
-      participants: 89,
-      difficulty: 'Expert',
-      status: 'upcoming' as const
-    }
-  ];
+  const { events: upcomingEvents, loading } = useEvents({ status: 'upcoming', limit: 3 });

@@ .. @@
             <motion.div
               initial={{ opacity: 0, x: 50 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.8, delay: 0.2 }}
               className="relative"
             >
-              <div className="relative bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-2xl p-8 border border-white/20 dark:border-slate-700/50 shadow-2xl">
-                <div className="absolute -top-4 -right-4">
-                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-3">
-                    <Rocket className="h-6 w-6 text-white" />
-                  </div>
-                </div>
-                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Next Challenge</h3>
-                <div className="space-y-3">
-                  <div className="flex items-center justify-between">
-                    <span className="text-gray-600 dark:text-gray-300">Weekly DSA</span>
-                    <span className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 px-3 py-1 rounded-full text-sm font-medium">Live</span>
-                  </div>
-                  <div className="flex items-center space-x-2">
-                    <Users className="h-4 w-4 text-gray-500" />
-                    <span className="text-gray-600 dark:text-gray-300">234 participants</span>
-                  </div>
-                  <div className="bg-gray-100 dark:bg-slate-700 rounded-lg p-3">
-                    <code className="text-sm text-gray-800 dark:text-gray-200 font-mono">
-                      function solve(arr) {'{'}
-                      <br />
-                      &nbsp;&nbsp;// Your code here
-                      <br />
-                      {'}'}
-                    </code>
-                  </div>
-                </div>
-              </div>
+              <HeroAnimation />
             </motion.div>
           </div>
@@ .. @@
                   <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                     <Icon className="h-8 w-8 text-white" />
                   </div>
-                  <div className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
+                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
+                    <AnimatedCounter 
+                      end={parseInt(stat.value.replace(/[^\d]/g, ''))} 
+                      suffix={stat.value.includes('+') ? '+' : stat.value.includes('$') ? '' : stat.value.includes('%') ? '%' : ''}
+                      prefix={stat.value.includes('$') ? '$' : ''}
+                    />
+                  </div>
                   <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
                 </motion.div>
@@ .. @@
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
-            {upcomingEvents.map((event, index) => (
+            {loading ? (
+              [...Array(3)].map((_, index) => (
+                <div key={index} className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/50 animate-pulse">
+                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-4"></div>
+                  <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
+                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-4"></div>
+                  <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded"></div>
+                </div>
+              ))
+            ) : (
+              upcomingEvents.map((event, index) => (
               <motion.div
                 key={event.id}
                 initial={{ opacity: 0, y: 20 }}
@@ .. @@
                 <EventCard event={event} />
               </motion.div>
-            ))}
+              ))
+            )}
           </div>