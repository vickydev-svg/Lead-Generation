import React, { useState, useEffect, useRef } from 'react';
import { apiClient } from './apiClient';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import DashboardView from './components/DashboardView';
import SearchLeadsView from './components/SearchLeadsView';
import SearchProgressView from './components/SearchProgressView';
import SearchResultsView from './components/SearchResultsView';
import LeadDrawer from './components/LeadDrawer';
import ProjectsView from './components/ProjectsView';
import SavedListsView from './components/SavedListsView';
import BulkSearchView from './components/BulkSearchView';
import RunningJobsView from './components/RunningJobsView';
import ExportCenterView from './components/ExportCenterView';
import SearchHistoryView from './components/SearchHistoryView';
import BillingView from './components/BillingView';
import ApiKeysView from './components/ApiKeysView';
import ProfileView from './components/ProfileView';
import SettingsView from './components/SettingsView';
import ExpertsView from './components/ExpertsView';

// Initial Mock Datasets
const initialLeads = [
  { id: 'lead-1', name: 'Manhattan Dental Care', category: 'Dentist', rating: 4.8, reviews: 256, website: 'mhdental.com', email: 'info@mhdental.com', phone: '(212) 555-0198', aiScore: 92, employees: '10-20', price: '$$', founded: '2015' },
  { id: 'lead-2', name: 'NYC Smile Center', category: 'Dentist', rating: 4.6, reviews: 182, website: 'nycsmile.com', email: 'info@nycsmile.com', phone: '(212) 555-0122', aiScore: 88, employees: '5-10', price: '$$$', founded: '2018' },
  { id: 'lead-3', name: 'Upper East Dental', category: 'Dentist', rating: 4.5, reviews: 93, website: 'uedental.com', email: 'contact@uedental.com', phone: '(212) 555-0196', aiScore: 78, employees: '10-20', price: '$$', founded: '2012' },
  { id: 'lead-4', name: 'Central Park Dentistry', category: 'Dentist', rating: 4.4, reviews: 134, website: 'cpdentistry.com', email: 'info@cpdentistry.com', phone: '(212) 555-0151', aiScore: 71, employees: '20-50', price: '$$$$', founded: '2010' },
  { id: 'lead-5', name: 'Downtown Dental Studio', category: 'Dentist', rating: 4.3, reviews: 76, website: 'dtdental.com', email: 'hello@dtdental.com', phone: '(212) 555-0177', aiScore: 68, employees: '5-10', price: '$$', founded: '2020' },
  { id: 'lead-6', name: 'Brooklyn Dental Group', category: 'Dentist', rating: 4.2, reviews: 112, website: 'brooklyndental.com', email: 'info@brooklyndental.com', phone: '(718) 555-0165', aiScore: 65, employees: '10-20', price: '$$', founded: '2014' },
  { id: 'lead-7', name: 'Queens Dental Wellness', category: 'Dentist', rating: 4.7, reviews: 143, website: 'queensdental.com', email: 'care@queensdental.com', phone: '(718) 555-0182', aiScore: 84, employees: '5-10', price: '$$', founded: '2016' },
  { id: 'lead-8', name: 'Harlem Family Dentist', category: 'Dentist', rating: 4.1, reviews: 54, website: '-', email: 'info@harlemfamilydentist.com', phone: '(212) 555-0144', aiScore: 59, employees: '1-5', price: '$', founded: '2021' },
  { id: 'lead-9', name: 'Astoria Dental Arts', category: 'Dentist', rating: 4.9, reviews: 205, website: 'astoriadental.com', email: '-', phone: '(718) 555-0199', aiScore: 74, employees: '10-20', price: '$$$', founded: '2011' },
];

const initialHistory = [
  { id: 'h-1', keyword: 'Dentists', location: 'New York, USA', leadsFound: 2341, credits: 120, time: '2h ago' },
  { id: 'h-2', keyword: 'Restaurants', location: 'Dubai, UAE', leadsFound: 1892, credits: 100, time: '1d ago' },
  { id: 'h-3', keyword: 'Lawyers', location: 'London, UK', leadsFound: 987, credits: 90, time: '2d ago' },
  { id: 'h-4', keyword: 'Hotels', location: 'Delhi, India', leadsFound: 1234, credits: 80, time: '3d ago' },
  { id: 'h-5', keyword: 'Gyms', location: 'California, USA', leadsFound: 843, credits: 50, time: '5d ago' },
];

const initialJobs = [
  { id: 'job-1', name: 'Dentists in Texas', processed: 1245, total: 2500, status: 'Running', credits: 120 },
  { id: 'job-2', name: 'Real Estate Miami', processed: 562, total: 1500, status: 'Running', credits: 100 },
  { id: 'job-3', name: 'Gyms in California', processed: 812, total: 1000, status: 'Running', credits: 90 },
  { id: 'job-4', name: 'Marketing Agencies UK', processed: 1234, total: 1234, status: 'Completed', credits: 123 },
  { id: 'job-5', name: 'Hotels in Paris', processed: 0, total: 1500, status: 'Failed', credits: 0 },
];

const initialExports = [
  { id: 'exp-1', filename: 'Dentists_NewYork.csv', format: 'CSV', records: 2341, time: '2h ago' },
  { id: 'exp-2', filename: 'Restaurants_Dubai.xlsx', format: 'Excel', records: 1892, time: '1d ago' },
  { id: 'exp-3', filename: 'Lawyers_London.csv', format: 'CSV', records: 987, time: '2d ago' },
  { id: 'exp-4', filename: 'Hotels_Delhi.csv', format: 'CSV', records: 1234, time: '3d ago' },
  { id: 'exp-5', filename: 'Marketing_Agencies_USA.csv', format: 'CSV', records: 843, time: '5d ago' }
];

const initialProjects = [
  { id: 'proj-1', name: 'Dentists USA', leadsCount: 2341, listsCount: 3, created: '2 weeks ago', updated: '5 days ago' },
  { id: 'proj-2', name: 'Restaurants Dubai', leadsCount: 1892, listsCount: 2, created: '10 days ago', updated: 'Today' },
  { id: 'proj-3', name: 'Lawyers India', leadsCount: 987, listsCount: 1, created: '3 weeks ago', updated: '1 week ago' },
  { id: 'proj-4', name: 'Agencies UK', leadsCount: 1234, listsCount: 2, created: '2 weeks ago', updated: '2 days ago' },
  { id: 'proj-5', name: 'Gyms California', leadsCount: 843, listsCount: 1, created: '1 week ago', updated: '5 days ago' },
  { id: 'proj-6', name: 'Hotels Paris', leadsCount: 1562, listsCount: 3, created: '1 week ago', updated: '1 week ago' },
];

const initialLists = [
  { id: 'list-1', name: 'High Leads', leadsCount: 50 },
  { id: 'list-2', name: 'Follow-Up', leadsCount: 20 },
  { id: 'list-3', name: 'VIP Clients', leadsCount: 180 },
  { id: 'list-4', name: 'Cold Leads', leadsCount: 120 },
  { id: 'list-5', name: 'Marketing Agencies', leadsCount: 45 },
];

function App() {
  // Navigation states: page can be 'landing', 'login', 'app'
  const [page, setPage] = useState('landing');
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const globalCanvasRef = useRef(null);

  // Global rising particles/balls background animation
  useEffect(() => {
    const canvas = globalCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const particles = [];
    const particleCount = 35;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 2.2 + 0.6,
        speedY: Math.random() * 0.35 + 0.12,
        speedX: Math.random() * 0.16 - 0.08,
        maxAlpha: Math.random() * 0.18 + 0.06,
        alpha: 0
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width;
      const height = canvas.height;

      particles.forEach((p) => {
        p.y -= p.speedY;
        p.x += p.speedX;

        // Calculate opacity based on height
        if (p.y < height * 0.8) {
          p.alpha = (p.y / (height * 0.8)) * p.maxAlpha;
        } else {
          p.alpha = ((height - p.y) / (height * 0.2)) * p.maxAlpha;
        }

        // Reset if it exits top or goes invisible
        if (p.y < -20 || p.alpha <= 0) {
          p.y = height + Math.random() * 40;
          p.x = Math.random() * width;
          p.alpha = 0;
          p.size = Math.random() * 2.2 + 0.6;
          p.speedY = Math.random() * 0.35 + 0.12;
          p.speedX = Math.random() * 0.16 - 0.08;
        }

        if (p.alpha > 0) {
          const radial = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3.5);
          radial.addColorStop(0, `rgba(96, 165, 250, ${p.alpha})`);
          radial.addColorStop(0.4, `rgba(59, 130, 246, ${p.alpha * 0.4})`);
          radial.addColorStop(1, 'rgba(59, 130, 246, 0)');
          ctx.fillStyle = radial;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 3.5, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);
  
  // User global parameters
  const [credits, setCredits] = useState(12450);
  const [user, setUser] = useState(null);

  // Entities lists states
  const [leads, setLeads] = useState(initialLeads);
  const [history, setHistory] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [exports, setExports] = useState([]);
  const [projects, setProjects] = useState([]);
  const [lists, setLists] = useState([]);

  // Dynamic search/crawler states
  const [activeSearch, setActiveSearch] = useState(null);
  const [directSearchQuery, setDirectSearchQuery] = useState('');
  const [selectedLead, setSelectedLead] = useState(null);

  // Bulk crawler uploads queue state
  const [bulkQueue, setBulkQueue] = useState([
    { keyword: 'Dentists', location: 'New York, USA', radius: 25, status: 'Completed', results: 2341, credits: 120 },
    { keyword: 'Restaurants', location: 'Chicago, USA', radius: 20, status: 'Running', results: 1892, credits: 100 },
    { keyword: 'Lawyers', location: 'Houston, USA', radius: 30, status: 'Pending', results: 0, credits: 90 },
    { keyword: 'Real Estate', location: 'Miami, USA', radius: 15, status: 'Pending', results: 0, credits: 100 },
  ]);

  // Auth State Listener and initial check
  useEffect(() => {
    const cachedUser = apiClient.getCurrentUser();
    const token = localStorage.getItem('token');
    if (cachedUser && token) {
      handleAuthUser(cachedUser);
    } else {
      setUser(null);
      setPage('landing');
    }
  }, []);

  const handleAuthUser = async (authUser) => {
    setUser(authUser);
    setPage('app');
    await loadUserData(authUser.id);
  };

  const loadUserData = async (userId) => {
    try {
      // 1. Profile
      const profile = await apiClient.getProfile();
      if (profile) {
        setCredits(profile.credits);
      }

      // 2. Projects
      const dbProjects = await apiClient.getProjects();
      let currentProjects = [];
      if (dbProjects) {
        currentProjects = dbProjects.map(p => ({
          id: p.id,
          name: p.name,
          leadsCount: 0,
          listsCount: 0,
          created: new Date(p.createdAt).toLocaleDateString(),
          updated: new Date(p.updatedAt).toLocaleDateString()
        }));
        setProjects(currentProjects);
      }

      // 3. Lists
      if (dbProjects && dbProjects.length > 0) {
        const allLists = [];
        for (const p of dbProjects) {
          const pLists = await apiClient.getLeadLists(p.id);
          if (pLists) {
            allLists.push(...pLists);
          }
        }
        setLists(allLists.map(l => ({
          id: l.id,
          project_id: l.projectId,
          name: l.name,
          leadsCount: 0
        })));
        
        // Map counts back to projects
        setProjects(currentProjects.map(p => {
          const pLists = allLists.filter(l => l.projectId === p.id);
          return {
            ...p,
            listsCount: pLists.length,
            leadsCount: 0
          };
        }));
      } else {
        // Create default project for new user
        const defaultProj = await apiClient.createProject('Default Project');
        if (defaultProj) {
          setProjects([{
            id: defaultProj.id,
            name: defaultProj.name,
            leadsCount: 0,
            listsCount: 0,
            created: new Date(defaultProj.createdAt).toLocaleDateString(),
            updated: new Date(defaultProj.updatedAt).toLocaleDateString()
          }]);
        }
      }

      // 4. History
      const dbHistory = await apiClient.getSearchHistory();
      if (dbHistory) {
        setHistory(dbHistory.map(h => ({
          id: h.id,
          keyword: h.keyword,
          location: h.location,
          leadsFound: h.leadsFound,
          credits: h.creditsSpent,
          time: new Date(h.createdAt).toLocaleDateString()
        })));
      }

      // 5. Jobs
      const dbJobs = await apiClient.getSearchJobs();
      if (dbJobs) {
        setJobs(dbJobs.map(j => ({
          id: j.id,
          name: `Search for ${j.id.slice(0, 4)}`,
          processed: j.progressBusinesses + j.progressWebsites + j.progressAnalysis,
          total: 300,
          status: j.status,
          credits: 150
        })));
      }

      // 6. Exports
      const dbExports = await apiClient.getExports();
      if (dbExports) {
        setExports(dbExports.map(e => ({
          id: e.id,
          filename: e.filename,
          format: e.format,
          records: e.recordsCount,
          time: new Date(e.createdAt).toLocaleDateString()
        })));
      }
    } catch (err) {
      console.error('Failed to load user data:', err);
    }
  };

  const getDefaultProjectId = async () => {
    let activeProj = projects[0];
    if (!activeProj) {
      const data = await apiClient.createProject('Default Project');
      if (data) {
        activeProj = {
          id: data.id,
          name: data.name,
          leadsCount: 0,
          listsCount: 0,
          created: 'Just now',
          updated: 'Just now'
        };
        setProjects([activeProj]);
      }
    }
    return activeProj ? activeProj.id : null;
  };

  const handleLogin = async (userInfo) => {
    // Fetch fresh profile to ensure name/credits are current
    try {
      const profile = await apiClient.getProfile();
      if (profile) {
        const merged = { ...userInfo, fullName: profile.fullName, company: profile.company, credits: profile.credits };
        localStorage.setItem('user', JSON.stringify(merged));
        setUser(merged);
        setCredits(profile.credits);
      } else {
        setUser(userInfo);
      }
    } catch {
      setUser(userInfo);
    }
    setPage('app');
    setActiveTab('dashboard');
    loadUserData(userInfo.id);
  };

  const handleLogout = () => {
    apiClient.logout();
    setUser(null);
    setPage('landing');
  };

  const handleDirectSearch = (query) => {
    setDirectSearchQuery(query);
    setPage('login');
  };

  const handleStartSearch = async (searchParams) => {
    // Step 1: Switch to progress screen IMMEDIATELY so the user sees feedback
    const tempId = crypto.randomUUID();
    setActiveSearch({
      ...searchParams,
      id: tempId,
      jobId: null  // null until backend responds
    });
    setActiveTab('search-progress');

    // Step 2: Trigger the backend search in background
    try {
      const job = await apiClient.triggerSearch(
        searchParams.keyword,
        searchParams.location,
        searchParams.maxResults
      );
      // Update with real IDs once backend responds
      setActiveSearch(prev => ({
        ...prev,
        id: job.searchId,
        jobId: job.id
      }));
    } catch (err) {
      console.error("Failed to start search:", err);
      alert("Failed to start search: " + (err.response?.data?.message || err.message));
      setActiveTab('search-leads');
    }
  };

  const handleSearchComplete = async () => {
    if (!activeSearch) return;

    try {
      // Give the backend a moment to finalize DB writes before fetching leads
      await new Promise(res => setTimeout(res, 1500));
      const dbLeads = await apiClient.getSearchLeads(activeSearch.id);
      if (dbLeads && dbLeads.length > 0) {
        setLeads(dbLeads);
      }
      // Refresh credits, history, and exports
      await loadUserData(user.id);
    } catch (err) {
      console.error('Search complete sync failed:', err);
    } finally {
      setActiveTab('search-results');
    }
  };

  const handleCancelSearch = () => {
    setActiveSearch(null);
    setActiveTab('search-leads');
  };

  const handleRepeatSearch = (historyItem) => {
    setDirectSearchQuery(`${historyItem.keyword} in ${historyItem.location}`);
    setActiveTab('search-leads');
  };

  const handleSaveSearchTemplate = (template) => {
    console.log('Saved search template:', template);
  };

  const handleSaveList = async (listName, leadIds) => {
    try {
      const projId = await getDefaultProjectId();
      if (!projId) return;

      const newList = await apiClient.createLeadList(projId, listName);
      if (newList) {
        // Save items to the list
        for (const leadId of leadIds) {
          await apiClient.addLeadToList(newList.id, leadId);
        }

        setLists([{
          id: newList.id,
          project_id: newList.projectId,
          name: newList.name,
          leadsCount: leadIds.length
        }, ...lists]);
      }
    } catch (err) {
      console.error('Save list failed:', err);
    }
  };

  const handleExportLeads = async (leadIds) => {
    try {
      // First save them to a temporary list to export via leadListId
      const projId = await getDefaultProjectId();
      if (!projId) return;

      const listName = `Export_${Date.now().toString().slice(-4)}`;
      const newList = await apiClient.createLeadList(projId, listName);
      if (newList) {
        for (const leadId of leadIds) {
          await apiClient.addLeadToList(newList.id, leadId);
        }
        await handleExportListFile(newList.id);
      }
    } catch (err) {
      console.error('Export creation failed:', err);
    }
  };

  const handleExportListFile = async (listId) => {
    try {
      const blob = await apiClient.triggerExport(listId);
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `leads_list_${listId}.csv`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      
      await loadUserData(user.id);
    } catch (err) {
      console.error('Export creation failed:', err);
    }
  };

  const handleDeleteLeads = (leadIds) => {
    setLeads(leads.filter(l => !leadIds.includes(l.id)));
  };

  const handleCreateProject = async (name) => {
    try {
      const data = await apiClient.createProject(name);
      if (data) {
        const newProject = {
          id: data.id,
          name: data.name,
          leadsCount: 0,
          listsCount: 0,
          created: 'Just now',
          updated: 'Just now'
        };
        setProjects([newProject, ...projects]);
      }
    } catch (err) {
      console.error('Failed to create project:', err);
    }
  };

  const handleDeleteProject = async (id) => {
    try {
      await apiClient.deleteProject(id);
      setProjects(projects.filter(p => p.id !== id));
    } catch (err) {
      console.error('Failed to delete project:', err);
    }
  };

  const handleCreateList = async (name) => {
    try {
      const projId = await getDefaultProjectId();
      if (!projId) return;

      const data = await apiClient.createLeadList(projId, name);
      if (data) {
        const newList = {
          id: data.id,
          project_id: data.projectId,
          name: data.name,
          leadsCount: 0
        };
        setLists([newList, ...lists]);
      }
    } catch (err) {
      console.error('Failed to create list:', err);
    }
  };

  const handleDeleteList = async (id) => {
    try {
      // In this setup, we can just delete from lists local state or call delete endpoint if built
      // Let's keep it safe by removing from local state since we don't have delete list endpoint yet
      setLists(lists.filter(l => l.id !== id));
    } catch (err) {
      console.error('Failed to delete list:', err);
    }
  };

  const handleUploadCSV = (bulkQueries) => {
    const newItems = bulkQueries.map(q => ({
      keyword: q.keyword,
      location: q.location,
      radius: q.radius,
      status: 'Pending',
      results: 0,
      credits: Math.round(100)
    }));
    setBulkQueue([...newItems, ...bulkQueue]);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      
      {/* Premium Ambient Glow Blobs */}
      <div className="ambient-blobs-container">
        <div className="ambient-blob blob-1" />
        <div className="ambient-blob blob-2" />
        <div className="ambient-blob blob-3" />
      </div>

      {/* Global Particle floating balls background */}
      <canvas 
        ref={globalCanvasRef} 
        style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          width: '100vw', 
          height: '100vh', 
          pointerEvents: 'none', 
          zIndex: 4, // Float gently on top of grid backgrounds but underneath tooltips/drawers
          opacity: 0.85
        }} 
      />
      {/* 1. Landing Screen */}
      {page === 'landing' && (
        <LandingPage 
          setPage={setPage} 
          onDirectSearch={handleDirectSearch} 
        />
      )}

      {/* 2. Login Screen */}
      {page === 'login' && (
        <LoginPage 
          setPage={setPage} 
          onLogin={handleLogin} 
        />
      )}

      {/* 3. Main Dashboard Layout */}
      {page === 'app' && (
        <div className="app-container">
          
          {/* Left Sidebar */}
          <Sidebar 
            activeTab={activeTab} 
            setActiveTab={setActiveTab}
            user={user}
            leadsCount={leads.length}
          />

          {/* Right Layout */}
          <div className="main-content">
            
            {/* Topbar */}
            <Navbar 
              activeTab={activeTab} 
              credits={credits} 
              onLogout={handleLogout}
              setPage={setPage}
              setActiveTab={setActiveTab}
              user={user}
            />

            {/* Sub-view Routing */}
            <div className="view-container">
              
              {activeTab === 'dashboard' && (
                <DashboardView 
                  stats={{
                    totalSearches: history.length,
                    leadsFound: leads.length,
                    lists: lists.length,
                    exports: exports.length,
                  }}
                  recentSearches={history}
                  lists={lists}
                  latestExports={exports}
                  user={user}
                  setActiveTab={setActiveTab}
                  setDirectSearchQuery={setDirectSearchQuery}
                />
              )}

              {activeTab === 'search-leads' && (
                <SearchLeadsView 
                  onStartSearch={handleStartSearch}
                  onSaveSearchTemplate={handleSaveSearchTemplate}
                  directSearchQuery={directSearchQuery}
                  setDirectSearchQuery={setDirectSearchQuery}
                  creditsBalance={credits}
                />
              )}

              {activeTab === 'search-progress' && activeSearch && (
                <SearchProgressView 
                  activeSearch={activeSearch}
                  onSearchComplete={handleSearchComplete}
                  onCancelSearch={handleCancelSearch}
                />
              )}

              {activeTab === 'search-results' && (
                leads.length > 0 ? (
                  <SearchResultsView 
                    leads={leads}
                    activeSearch={activeSearch || { keyword: '', location: '' }}
                    onOpenDrawer={setSelectedLead}
                    onSaveList={handleSaveList}
                    onExportLeads={handleExportLeads}
                    onDeleteLeads={handleDeleteLeads}
                  />
                ) : (
                  <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', gap: '16px', textAlign: 'center' }}>
                    <div style={{ fontSize: '3rem' }}>🔍</div>
                    <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>No leads yet</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '320px', lineHeight: 1.6 }}>
                      Run a search to find leads. They'll appear here once your scrape is complete.
                    </p>
                    <button onClick={() => setActiveTab('search-leads')} className="btn btn-primary" style={{ marginTop: '8px', padding: '12px 28px' }}>
                      Start a Search
                    </button>
                  </div>
                )
              )}

              {activeTab === 'projects' && (
                <ProjectsView 
                  projects={projects}
                  onCreateProject={handleCreateProject}
                  onDeleteProject={handleDeleteProject}
                />
              )}

              {activeTab === 'saved-lists' && (
                <SavedListsView 
                  lists={lists}
                  onCreateList={handleCreateList}
                  onDeleteList={handleDeleteList}
                  onExportList={handleExportListFile}
                />
              )}

              {activeTab === 'bulk-search' && (
                <BulkSearchView 
                  queue={bulkQueue}
                  onUploadCSV={handleUploadCSV}
                />
              )}

              {activeTab === 'running-jobs' && (
                <RunningJobsView 
                  initialJobs={jobs}
                />
              )}

              {activeTab === 'export-center' && (
                <ExportCenterView 
                  initialExports={exports}
                  onDeleteExport={(id) => setExports(exports.filter(e => e.id !== id))}
                />
              )}

              {activeTab === 'search-history' && (
                <SearchHistoryView 
                  history={history}
                  onRepeatSearch={handleRepeatSearch}
                  onDeleteHistory={(id) => setHistory(history.filter(h => h.id !== id))}
                  onSaveSearchTemplate={handleSaveSearchTemplate}
                />
              )}

              {activeTab === 'billing' && (
                <BillingView 
                  creditsBalance={credits}
                />
              )}

              {activeTab === 'api-keys' && (
                <ApiKeysView />
              )}

              {activeTab === 'profile' && (
                <ProfileView user={user} onUserUpdated={(updated) => setUser(updated)} />
              )}

              {activeTab === 'settings' && (
                <SettingsView />
              )}

              {activeTab === 'experts' && (
                <ExpertsView />
              )}

            </div>

          </div>

          {/* Slide Over Lead detail Drawer */}
          {selectedLead && (
            <LeadDrawer 
              lead={selectedLead} 
              onClose={() => setSelectedLead(null)} 
            />
          )}

        </div>
      )}

    </div>
  );
}

export default App;
