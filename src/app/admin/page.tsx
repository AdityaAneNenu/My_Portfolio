'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';

// ── Clean SVG Icons ─────────────────────────────────────────────────────────
const Icons = {
  Home: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  Folder: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
    </svg>
  ),
  Code: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
  Briefcase: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  User: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  Save: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
    </svg>
  ),
  Plus: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  ),
  Trash: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  ),
  Edit: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  ),
  Logout: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
  ),
  Lock: () => (
    <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  )
};

export default function AdminPage() {
  // Authentication states
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [id, setId] = useState('');
  const [passcode, setPasscode] = useState('');
  const [authId, setAuthId] = useState('');
  const [authPass, setAuthPass] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // Data states
  const [portfolioData, setPortfolioData] = useState<any>(null);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'error' }>({
    show: false,
    message: '',
    type: 'success'
  });

  // Dashboard UI states
  const [activeTab, setActiveTab] = useState<'projects' | 'skills' | 'timeline' | 'profile'>('projects');
  const [editingProject, setEditingProject] = useState<any | null>(null);
  const [editingExperience, setEditingExperience] = useState<any | null>(null);
  const [editingAchievement, setEditingAchievement] = useState<any | null>(null);
  const [isAddingNew, setIsAddingNew] = useState<boolean>(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<{
    show: boolean;
    type: 'project' | 'experience' | 'achievement' | 'category';
    id: any;
    title: string;
  }>({
    show: false,
    type: 'project',
    id: null,
    title: ''
  });

  // Load session from localStorage on mount and verify securely on the server
  useEffect(() => {
    const savedId = localStorage.getItem('portfolio_admin_id');
    const savedPass = localStorage.getItem('portfolio_admin_pass');
    if (savedId && savedPass) {
      const verifySession = async () => {
        try {
          const res = await fetch('/api/admin/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: savedId, passcode: savedPass }),
          });
          const data = await res.json();
          if (res.ok && data.success) {
            setAuthId(savedId);
            setAuthPass(savedPass);
            setIsLoggedIn(true);
          } else {
            localStorage.removeItem('portfolio_admin_id');
            localStorage.removeItem('portfolio_admin_pass');
          }
        } catch (err) {
          console.error('Session verification failed:', err);
        }
      };
      verifySession();
    }
  }, []);

  // Fetch data from API once logged in
  const fetchPortfolioData = async () => {
    setIsLoadingData(true);
    try {
      const res = await fetch('/api/admin/portfolio-data');
      if (res.ok) {
        const data = await res.json();
        setPortfolioData(data);
      } else {
        showToast('Failed to load portfolio data', 'error');
      }
    } catch (err) {
      showToast('Network error loading data', 'error');
    } finally {
      setIsLoadingData(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchPortfolioData();
    }
  }, [isLoggedIn]);

  // Toast notifier helper
  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 3000);
  };

  // Auth Handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);
    setLoginError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, passcode }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        localStorage.setItem('portfolio_admin_id', id);
        localStorage.setItem('portfolio_admin_pass', passcode);
        setAuthId(id);
        setAuthPass(passcode);
        setIsLoggedIn(true);
      } else {
        setLoginError(data.error || 'Invalid ID or Passcode');
      }
    } catch (err) {
      setLoginError('Error connecting to authentication server.');
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('portfolio_admin_id');
    localStorage.removeItem('portfolio_admin_pass');
    setAuthId('');
    setAuthPass('');
    setIsLoggedIn(false);
    setPortfolioData(null);
  };

  const normalizeUrl = (url: string): string => {
    if (!url) return '';
    const trimmed = url.trim();
    if (trimmed === '') return '';
    
    // If it's an email, check if it starts with mailto:
    if (trimmed.includes('@') && !trimmed.includes('/')) {
      if (trimmed.toLowerCase().startsWith('mailto:')) {
        return trimmed;
      }
      return `mailto:${trimmed}`;
    }

    // If it already starts with http:// or https://, return it
    if (/^https?:\/\//i.test(trimmed)) {
      return trimmed;
    }
    
    // Otherwise, prepend https://
    return `https://${trimmed}`;
  };

  // Universal Save/Update Handler
  const saveAllData = async (updatedData: any, silent = false) => {
    setIsSaving(true);

    // Deep copy and normalize link fields
    const sanitizedData = JSON.parse(JSON.stringify(updatedData));
    if (sanitizedData.hero) {
      if (sanitizedData.hero.github) sanitizedData.hero.github = normalizeUrl(sanitizedData.hero.github);
      if (sanitizedData.hero.linkedin) sanitizedData.hero.linkedin = normalizeUrl(sanitizedData.hero.linkedin);
    }
    if (sanitizedData.projects) {
      sanitizedData.projects = sanitizedData.projects.map((proj: any) => ({
        ...proj,
        github: proj.github ? normalizeUrl(proj.github) : '',
        demo: proj.demo ? normalizeUrl(proj.demo) : ''
      }));
    }

    try {
      const res = await fetch('/api/admin/portfolio-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-id': authId,
          'x-admin-pass': authPass
        },
        body: JSON.stringify(sanitizedData)
      });
      const result = await res.json();
      if (res.ok) {
        setPortfolioData(sanitizedData);
        if (!silent) {
          showToast('Changes successfully updated on disk!', 'success');
        }
      } else {
        showToast(result.error || 'Save failed', 'error');
      }
    } catch (err) {
      showToast('Network error during save', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  // ----------------------------------------------------
  // Projects Management Handlers
  // ----------------------------------------------------
  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    const finalSlug = editingProject.slug.trim() || editingProject.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const projectWithSlug = { ...editingProject, slug: finalSlug };
    const { _originalSlug, stackString, ...cleanProject } = projectWithSlug;

    let updatedProjects = [...portfolioData.projects];

    if (isAddingNew) {
      if (updatedProjects.some(p => p.slug === finalSlug)) {
        showToast('A project with this slug already exists!', 'error');
        return;
      }
      updatedProjects.unshift(cleanProject);
    } else {
      updatedProjects = updatedProjects.map(p => p.slug === editingProject._originalSlug ? cleanProject : p);
    }

    const updatedData = { ...portfolioData, projects: updatedProjects };
    saveAllData(updatedData);
    setEditingProject(null);
    setIsAddingNew(false);
  };

  const handleDeleteProject = (slug: string, title: string) => {
    setDeleteConfirm({
      show: true,
      type: 'project',
      id: slug,
      title: title
    });
  };

  const executeDelete = () => {
    const { type, id } = deleteConfirm;

    if (type === 'project') {
      const updatedProjects = portfolioData.projects.filter((p: any) => p.slug !== id);
      const updatedData = { ...portfolioData, projects: updatedProjects };
      saveAllData(updatedData);
    } else if (type === 'experience') {
      const updatedExp = portfolioData.experience.filter((_: any, i: number) => i !== id);
      const updatedData = { ...portfolioData, experience: updatedExp };
      saveAllData(updatedData);
    } else if (type === 'achievement') {
      const updatedAch = portfolioData.achievements.filter((_: any, i: number) => i !== id);
      const updatedData = { ...portfolioData, achievements: updatedAch };
      saveAllData(updatedData);
    } else if (type === 'category') {
      const updatedSkills = { ...portfolioData.skills };
      delete updatedSkills[id];
      const updatedData = { ...portfolioData, skills: updatedSkills };
      saveAllData(updatedData);
    }

    setDeleteConfirm(prev => ({ ...prev, show: false }));
  };

  const startEditProject = (project: any) => {
    setEditingProject({ ...project, _originalSlug: project.slug, stackString: project.stack.join(', ') });
    setIsAddingNew(false);
  };

  const startAddProject = () => {
    setEditingProject({ slug: '', title: '', subtitle: '', period: '', description: '', stack: [], stackString: '', github: '', demo: '' });
    setIsAddingNew(true);
  };

  // ----------------------------------------------------
  // Skills Management Handlers
  // ----------------------------------------------------
  const handleAddSkill = (category: string, newSkillName: string) => {
    if (!newSkillName.trim()) return;
    const categorySkills = [...portfolioData.skills[category], newSkillName.trim()];
    const updatedSkills = { ...portfolioData.skills, [category]: categorySkills };
    const updatedData = { ...portfolioData, skills: updatedSkills };
    saveAllData(updatedData);
  };

  const handleRemoveSkill = (category: string, indexToRemove: number) => {
    const categorySkills = portfolioData.skills[category].filter((_: any, idx: number) => idx !== indexToRemove);
    const updatedSkills = { ...portfolioData.skills, [category]: categorySkills };
    const updatedData = { ...portfolioData, skills: updatedSkills };
    saveAllData(updatedData);
  };

  const handleAddSkillCategory = (newCategoryName: string) => {
    if (!newCategoryName.trim()) return;
    if (portfolioData.skills[newCategoryName]) {
      showToast('Category already exists!', 'error');
      return;
    }
    const updatedSkills = { ...portfolioData.skills, [newCategoryName.trim()]: [] };
    const updatedData = { ...portfolioData, skills: updatedSkills };
    saveAllData(updatedData);
  };

  const handleRemoveSkillCategory = (category: string) => {
    setDeleteConfirm({
      show: true,
      type: 'category',
      id: category,
      title: `Skill Category: ${category}`
    });
  };

  // ----------------------------------------------------
  // Experience & Achievements Management Handlers
  // ----------------------------------------------------
  const handleSaveExperience = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExperience) return;

    // Strip internal _index metadata before persisting
    const { _index, ...cleanExperience } = editingExperience;
    let updatedExp = [...portfolioData.experience];
    if (isAddingNew) {
      updatedExp.push(cleanExperience);
    } else {
      updatedExp = updatedExp.map((exp, idx) => idx === _index ? cleanExperience : exp);
    }

    const updatedData = { ...portfolioData, experience: updatedExp };
    saveAllData(updatedData);
    setEditingExperience(null);
    setIsAddingNew(false);
  };

  const handleDeleteExperience = (idx: number, title: string) => {
    setDeleteConfirm({
      show: true,
      type: 'experience',
      id: idx,
      title: title
    });
  };

  const handleSaveAchievement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAchievement) return;

    // Strip internal _index metadata before persisting
    const { _index, ...cleanAchievement } = editingAchievement;
    let updatedAch = [...portfolioData.achievements];
    if (isAddingNew) {
      updatedAch.push(cleanAchievement);
    } else {
      updatedAch = updatedAch.map((ach, idx) => idx === _index ? cleanAchievement : ach);
    }

    const updatedData = { ...portfolioData, achievements: updatedAch };
    saveAllData(updatedData);
    setEditingAchievement(null);
    setIsAddingNew(false);
  };

  const handleDeleteAchievement = (idx: number, title: string) => {
    setDeleteConfirm({
      show: true,
      type: 'achievement',
      id: idx,
      title: title
    });
  };

  // ----------------------------------------------------
  // Profile, Bio, Hero Management Handlers
  // ----------------------------------------------------
  const handleProfileFieldChange = (section: 'hero' | 'stats' | 'certifications' | 'about', fieldName: string, value: any, idx?: number) => {
    const updatedData = { ...portfolioData };

    if (section === 'hero') {
      updatedData.hero = { ...updatedData.hero, [fieldName]: value };
    } else if (section === 'about' && typeof idx === 'number') {
      const newAbout = [...updatedData.about];
      newAbout[idx] = value;
      updatedData.about = newAbout;
    } else if (section === 'stats' && typeof idx === 'number') {
      const newStats = [...updatedData.stats];
      newStats[idx] = { ...newStats[idx], [fieldName]: value };
      updatedData.stats = newStats;
    } else if (section === 'certifications' && typeof idx === 'number') {
      const newCerts = [...updatedData.certifications];
      newCerts[idx] = value;
      updatedData.certifications = newCerts;
    }

    setPortfolioData(updatedData);
  };

  const handleAddAboutParagraph = () => {
    const updatedData = { ...portfolioData, about: [...portfolioData.about, ''] };
    setPortfolioData(updatedData);
    saveAllData(updatedData);
  };

  const handleRemoveAboutParagraph = (idx: number) => {
    const newAbout = portfolioData.about.filter((_: any, i: number) => i !== idx);
    const updatedData = { ...portfolioData, about: newAbout };
    setPortfolioData(updatedData);
    saveAllData(updatedData);
  };

  const handleAddCertification = () => {
    const updatedData = { ...portfolioData, certifications: [...portfolioData.certifications, ''] };
    setPortfolioData(updatedData);
    saveAllData(updatedData);
  };

  const handleRemoveCertification = (idx: number) => {
    const newCerts = portfolioData.certifications.filter((_: any, i: number) => i !== idx);
    const updatedData = { ...portfolioData, certifications: newCerts };
    setPortfolioData(updatedData);
    saveAllData(updatedData);
  };

  // Get total skills count
  const getTotalSkills = () => {
    if (!portfolioData || !portfolioData.skills) return 0;
    return Object.values(portfolioData.skills).reduce((acc: number, cur: any) => acc + cur.length, 0);
  };

  // ----------------------------------------------------
  // Render Login Form
  // ----------------------------------------------------
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-bg text-fg selection:bg-accent selection:text-bg flex flex-col justify-center items-center px-6 relative transition-colors duration-300 overflow-hidden">
        {/* Sleek abstract glowing background details */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full filter blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full filter blur-[100px] pointer-events-none" />

        <nav className="absolute top-0 left-0 right-0 z-50 bg-transparent">
          <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-14">
            <Link href="/" className="text-xs font-semibold tracking-widest hover:text-accent transition-colors duration-300 flex items-center gap-2 group">
              <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              BACK HOME
            </Link>
            <ThemeToggle />
          </div>
        </nav>

        {/* Login box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md p-8 md:p-10 border border-border bg-bg/40 backdrop-blur-xl relative shadow-2xl dark:shadow-black/40"
        >
          {/* Subtle line details to enhance premium look */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

          <div className="mb-8 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-accent/10 border border-accent/20 flex items-center justify-center mb-4">
              <Icons.Lock />
            </div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-muted mb-1 font-mono">portfolio administration</p>
            <h1 className="text-2xl font-bold tracking-tight">Venkata Siva Lalitaaditya</h1>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label htmlFor="adminId" className="block text-[9px] tracking-widest uppercase text-muted mb-2 font-semibold">Admin ID</label>
              <input
                id="adminId"
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder="Enter username"
                required
                className="w-full bg-fg/[0.02] dark:bg-bg/40 border border-border focus:border-accent text-fg rounded-none px-4 py-3 outline-none text-sm transition-all duration-200 font-mono focus:bg-fg/[0.04]"
              />
            </div>

            <div>
              <label htmlFor="passcode" className="block text-[9px] tracking-widest uppercase text-muted mb-2 font-semibold">Passcode</label>
              <input
                id="passcode"
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-fg/[0.02] dark:bg-bg/40 border border-border focus:border-accent text-fg rounded-none px-4 py-3 outline-none text-sm transition-all duration-200 font-mono focus:bg-fg/[0.04]"
              />
            </div>

            {loginError && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-red-500 font-medium tracking-wide flex items-center gap-2 border border-red-500/20 bg-red-500/5 p-3"
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                {loginError}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={isAuthenticating}
              className="w-full text-xs font-bold text-bg bg-accent border border-accent py-4 hover:bg-fg hover:border-fg hover:text-bg transition-all duration-300 cursor-pointer tracking-widest uppercase rounded-none flex items-center justify-center gap-2 shadow-lg shadow-accent/15"
            >
              {isAuthenticating ? (
                <div className="w-5 h-5 border-2 border-bg border-t-transparent animate-spin rounded-full" />
              ) : (
                'SIGN IN TO DASHBOARD'
              )}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // ----------------------------------------------------
  // Render Dashboard UI
  // ----------------------------------------------------
  return (
    <div className="min-h-screen bg-bg text-fg selection:bg-accent selection:text-bg transition-colors duration-300 font-sans">
      {/* Toast Notification */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: 40, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            transition={{ type: 'spring', stiffness: 220, damping: 16 }}
            className={`fixed bottom-8 left-1/2 z-50 px-6 py-4 border shadow-xl flex items-center gap-3 text-xs tracking-widest uppercase font-semibold bg-bg text-fg transition-all duration-200 rounded-none ${
              toast.type === 'success' ? 'border-accent text-accent' : 'border-red-500 text-red-500'
            }`}
          >
            {toast.type === 'success' ? (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-bg/80 backdrop-blur-lg border-b border-border transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-14">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 text-xs font-bold tracking-widest text-accent uppercase">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              DASHBOARD
            </span>
            <Link href="/" className="text-xs text-muted hover:text-fg tracking-widest uppercase transition-colors duration-300">
              View Website
            </Link>
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={handleLogout}
              className="text-xs text-muted hover:text-red-500 tracking-widest uppercase transition-colors duration-300 cursor-pointer flex items-center gap-2"
            >
              <Icons.Logout />
              Sign Out
            </button>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-6 pt-24 pb-20">
        {/* Header */}
        <div className="border-b border-border pb-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <div className="text-[10px] tracking-[0.3em] uppercase text-muted mb-2 font-mono">WORKSPACE CONTROLS</div>
            <h1 className="text-4xl font-extrabold tracking-tight">Portfolio Admin Panel</h1>
          </div>
          {portfolioData && (
            <div className="flex items-center gap-3">
              <button
                onClick={() => saveAllData(portfolioData)}
                disabled={isSaving}
                className="text-xs font-bold text-bg bg-accent border border-accent px-6 py-3.5 hover:bg-fg hover:border-fg hover:text-bg transition-all duration-300 cursor-pointer tracking-widest uppercase rounded-none flex items-center gap-2 shadow-lg shadow-accent/10"
              >
                {isSaving ? (
                  <>
                    <div className="w-3.5 h-3.5 border border-bg border-t-transparent animate-spin rounded-full" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Icons.Save />
                    SAVE CHANGES TO FILE
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {isLoadingData || !portfolioData ? (
          <div className="min-h-[40vh] flex flex-col justify-center items-center gap-4">
            <div className="w-8 h-8 border-2 border-accent border-t-transparent animate-spin rounded-full" />
            <p className="text-xs text-muted tracking-widest uppercase font-mono">Resolving JSON definitions...</p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* KPI statistics cards row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="border border-border p-5 bg-fg/[0.01]">
                <p className="text-[10px] tracking-wider uppercase text-muted font-mono mb-1">Total Projects</p>
                <p className="text-3xl font-extrabold text-fg">{portfolioData.projects.length}</p>
              </div>
              <div className="border border-border p-5 bg-fg/[0.01]">
                <p className="text-[10px] tracking-wider uppercase text-muted font-mono mb-1">Total Skills</p>
                <p className="text-3xl font-extrabold text-fg">{getTotalSkills()}</p>
              </div>
              <div className="border border-border p-5 bg-fg/[0.01]">
                <p className="text-[10px] tracking-wider uppercase text-muted font-mono mb-1">Experience Timelines</p>
                <p className="text-3xl font-extrabold text-fg">{portfolioData.experience.length}</p>
              </div>
              <div className="border border-border p-5 bg-fg/[0.01]">
                <p className="text-[10px] tracking-wider uppercase text-muted font-mono mb-1">Achievements & Awards</p>
                <p className="text-3xl font-extrabold text-fg">{portfolioData.achievements.length}</p>
              </div>
            </div>

            {/* Dashboard Workspace */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
              {/* Sidebar Tabs */}
              <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-4 lg:flex lg:flex-col border-b lg:border-b-0 lg:border-r border-border pb-4 lg:pb-0 lg:pr-8 gap-2">
                {[
                  { id: 'projects', label: 'Projects List', icon: <Icons.Folder /> },
                  { id: 'skills', label: 'Skill Sets', icon: <Icons.Code /> },
                  { id: 'timeline', label: 'Timeline Entries', icon: <Icons.Briefcase /> },
                  { id: 'profile', label: 'Bio & Profile Info', icon: <Icons.User /> },
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id as any);
                      setEditingProject(null);
                      setEditingExperience(null);
                      setEditingAchievement(null);
                      setIsAddingNew(false);
                    }}
                    className={`relative px-3 py-3 text-[10px] tracking-widest uppercase transition-colors duration-300 flex items-center justify-center lg:justify-start gap-3 overflow-hidden cursor-pointer rounded-none w-full ${
                      activeTab === tab.id
                        ? 'text-bg font-bold'
                        : 'text-muted hover:text-fg hover:bg-fg/[0.02]'
                    }`}
                  >
                    {tab.icon}
                    <span className="relative z-10">{tab.label}</span>
                    {activeTab === tab.id && (
                      <motion.span
                        layoutId="active-tab-indicator"
                        className="absolute inset-0 bg-accent text-bg"
                        transition={{ type: 'spring', stiffness: 180, damping: 24 }}
                        style={{ zIndex: 0 }}
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Content Area */}
              <div className="lg:col-span-9">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ type: 'spring', stiffness: 140, damping: 20 }}
                  >
                    {/* TAB 1: PROJECTS */}
                    {activeTab === 'projects' && (
                      <div className="space-y-6">
                        <div className="flex justify-between items-center">
                          <h2 className="text-xs tracking-[0.2em] uppercase text-muted font-bold">Project Repositories</h2>
                          <button
                            onClick={startAddProject}
                            className="text-[10px] font-bold text-fg border border-border px-4 py-2.5 hover:bg-fg hover:text-bg transition-all duration-200 cursor-pointer tracking-widest uppercase flex items-center gap-2"
                          >
                            <Icons.Plus />
                            Add Project
                          </button>
                        </div>

                        <div className="border border-border divide-y divide-border">
                          {portfolioData.projects.map((project: any) => (
                            <motion.div
                              key={project.slug}
                              whileHover={{ x: 6 }}
                              transition={{ type: 'spring', stiffness: 220, damping: 20 }}
                              className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-fg/[0.01] transition-colors relative group"
                            >
                              <div className="space-y-2">
                                <div className="flex flex-wrap items-center gap-3">
                                  <h3 className="font-extrabold text-fg text-lg">{project.title}</h3>
                                  <span className="text-[9px] tracking-widest uppercase px-2 py-0.5 border border-accent/25 bg-accent/5 text-accent font-mono font-bold">
                                    {project.period}
                                  </span>
                                </div>
                                <p className="text-xs text-accent tracking-widest uppercase">{project.subtitle}</p>
                                <p className="text-xs text-muted max-w-xl line-clamp-2 leading-relaxed">{project.description}</p>
                                <div className="flex flex-wrap gap-1.5 pt-2">
                                  {project.stack.map((tech: string) => (
                                    <span key={tech} className="text-[9px] tracking-wider uppercase text-muted bg-fg/[0.04] border border-border px-2 py-0.5">
                                      {tech}
                                    </span>
                                  ))}
                                </div>
                                {(project.github || project.demo) && (
                                  <div className="flex gap-3 pt-2">
                                    {project.github && (
                                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-[9px] text-muted hover:text-accent tracking-widest uppercase flex items-center gap-1 transition-colors">
                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                                        GitHub
                                      </a>
                                    )}
                                    {project.demo && (
                                      <a href={project.demo} target="_blank" rel="noopener noreferrer" className="text-[9px] text-muted hover:text-accent tracking-widest uppercase flex items-center gap-1 transition-colors">
                                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                        Demo
                                      </a>
                                    )}
                                  </div>
                                )}
                              </div>
                              <div className="flex gap-2 w-full sm:w-auto justify-end sm:justify-start">
                                <button
                                  onClick={() => startEditProject(project)}
                                  className="text-[9px] tracking-widest uppercase px-3 py-2 border border-border hover:border-accent hover:text-accent bg-bg transition-colors cursor-pointer flex items-center gap-1.5"
                                >
                                  <Icons.Edit />
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDeleteProject(project.slug, project.title)}
                                  className="text-[9px] tracking-widest uppercase px-3 py-2 border border-border hover:border-red-500 hover:text-red-500 bg-bg transition-colors cursor-pointer flex items-center gap-1.5"
                                >
                                  <Icons.Trash />
                                  Delete
                                </button>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* TAB 2: SKILLS */}
                    {activeTab === 'skills' && (
                      <div className="space-y-8">
                        <div className="flex justify-between items-center border-b border-border pb-4">
                          <h2 className="text-xs tracking-[0.2em] uppercase text-muted font-bold">Expertise Categories</h2>
                          <div className="flex items-center gap-2">
                            {isAddingCategory ? (
                              <>
                                <input
                                  type="text"
                                  autoFocus
                                  value={newCategoryName}
                                  onChange={(e) => setNewCategoryName(e.target.value)}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter' && newCategoryName.trim()) {
                                      handleAddSkillCategory(newCategoryName.trim());
                                      setNewCategoryName('');
                                      setIsAddingCategory(false);
                                    }
                                    if (e.key === 'Escape') {
                                      setNewCategoryName('');
                                      setIsAddingCategory(false);
                                    }
                                  }}
                                  placeholder="e.g. Databases, Cloud"
                                  className="bg-fg/[0.01] dark:bg-bg/20 border border-border focus:border-accent text-fg rounded-none px-3 py-2 outline-none text-[10px] tracking-widest uppercase w-48 transition-colors"
                                />
                                <button
                                  onClick={() => {
                                    if (newCategoryName.trim()) {
                                      handleAddSkillCategory(newCategoryName.trim());
                                      setNewCategoryName('');
                                      setIsAddingCategory(false);
                                    }
                                  }}
                                  className="text-[10px] font-bold text-bg bg-accent border border-accent px-3 py-2 hover:bg-fg hover:border-fg hover:text-bg transition-all duration-200 cursor-pointer tracking-widest uppercase"
                                >
                                  Save
                                </button>
                                <button
                                  onClick={() => {
                                    setNewCategoryName('');
                                    setIsAddingCategory(false);
                                  }}
                                  className="text-[10px] font-bold text-fg border border-border px-3 py-2 hover:bg-fg hover:text-bg transition-all duration-200 cursor-pointer tracking-widest uppercase"
                                >
                                  Cancel
                                </button>
                              </>
                            ) : (
                              <button
                                onClick={() => setIsAddingCategory(true)}
                                className="text-[10px] font-bold text-fg border border-border px-4 py-2.5 hover:bg-fg hover:text-bg transition-all duration-200 cursor-pointer tracking-widest uppercase flex items-center gap-2"
                              >
                                <Icons.Plus />
                                Add Category
                              </button>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {Object.entries(portfolioData.skills).map(([category, skills]: any) => (
                            <div key={category} className="border border-border p-6 relative group bg-fg/[0.005] flex flex-col justify-between">
                              <div>
                                <div className="flex justify-between items-center border-b border-border pb-4 mb-4">
                                  <h3 className="text-[10px] tracking-[0.25em] uppercase text-accent font-bold">{category}</h3>
                                  <button
                                    onClick={() => handleRemoveSkillCategory(category)}
                                    className="text-[9px] text-muted hover:text-red-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1"
                                  >
                                    <Icons.Trash />
                                    Delete
                                  </button>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-6">
                                  {skills.map((skill: string, idx: number) => (
                                    <span
                                      key={idx}
                                      className="text-xs tracking-wide text-fg bg-fg/[0.02] dark:bg-bg/40 border border-border px-3 py-1.5 flex items-center gap-2 hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-500 transition-all duration-200 group/tag cursor-default"
                                    >
                                      {skill}
                                      <button
                                        onClick={() => handleRemoveSkill(category, idx)}
                                        className="text-[10px] font-bold text-muted group-hover/tag:text-red-500 cursor-pointer"
                                      >
                                        ✕
                                      </button>
                                    </span>
                                  ))}
                                  {skills.length === 0 && (
                                    <p className="text-xs text-muted italic">No skills in this category.</p>
                                  )}
                                </div>
                              </div>

                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  placeholder="Add skill (press Enter)..."
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                      const val = e.currentTarget.value;
                                      handleAddSkill(category, val);
                                      e.currentTarget.value = '';
                                    }
                                  }}
                                  className="w-full bg-fg/[0.01] dark:bg-bg/20 border border-border focus:border-accent text-fg rounded-none px-3 py-2 outline-none text-xs transition-all focus:bg-fg/[0.03]"
                                />
                                <button
                                  onClick={(e) => {
                                    const input = e.currentTarget.previousSibling as HTMLInputElement;
                                    if (input) {
                                      handleAddSkill(category, input.value);
                                      input.value = '';
                                    }
                                  }}
                                  className="text-[10px] font-bold text-fg border border-border px-4 py-2 hover:bg-fg hover:text-bg transition-all duration-200 cursor-pointer tracking-widest uppercase"
                                >
                                  Add
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* TAB 3: TIMELINE (EXPERIENCE & ACHIEVEMENTS) */}
                    {activeTab === 'timeline' && (
                      <div className="space-y-12">
                        {/* Section 1: Experience */}
                        <div className="space-y-6">
                          <div className="flex justify-between items-center border-b border-border pb-4">
                            <h2 className="text-xs tracking-[0.2em] uppercase text-muted font-bold">Timeline Positions</h2>
                            <button
                              onClick={() => {
                                setEditingExperience({ title: '', org: '', period: '', description: '' });
                                setIsAddingNew(true);
                              }}
                              className="text-[10px] font-bold text-fg border border-border px-4 py-2.5 hover:bg-fg hover:text-bg transition-all duration-200 cursor-pointer tracking-widest uppercase flex items-center gap-2"
                            >
                              <Icons.Plus />
                              Add Experience
                            </button>
                          </div>

                          <div className="border border-border divide-y divide-border">
                            {portfolioData.experience.map((exp: any, idx: number) => (
                              <motion.div
                                key={idx}
                                whileHover={{ x: 6 }}
                                transition={{ type: 'spring', stiffness: 220, damping: 20 }}
                                className="p-6 flex flex-col sm:flex-row justify-between items-start gap-4 hover:bg-fg/[0.01]"
                              >
                                <div className="space-y-2">
                                  <div className="flex flex-wrap items-center gap-2.5">
                                    <h4 className="font-extrabold text-fg text-base">{exp.title}</h4>
                                    <span className="text-[10px] tracking-wider text-accent font-bold uppercase font-mono">@ {exp.org}</span>
                                  </div>
                                  <p className="text-[10px] text-muted font-mono tracking-widest">{exp.period}</p>
                                  <p className="text-xs text-muted leading-relaxed mt-2 max-w-2xl">{exp.description}</p>
                                </div>
                                <div className="flex gap-2 flex-shrink-0 w-full sm:w-auto justify-end sm:justify-start">
                                  <button
                                    onClick={() => {
                                      setEditingExperience({ ...exp, _index: idx });
                                      setIsAddingNew(false);
                                    }}
                                    className="text-[9px] tracking-widest uppercase px-3 py-2 border border-border hover:border-accent hover:text-accent bg-bg transition-all cursor-pointer flex items-center gap-1.5"
                                  >
                                    <Icons.Edit />
                                    Edit
                                  </button>
                                  <button
                                    onClick={() => handleDeleteExperience(idx, `${exp.title} at ${exp.org}`)}
                                    className="text-[9px] tracking-widest uppercase px-3 py-2 border border-border hover:border-red-500 hover:text-red-500 bg-bg transition-all cursor-pointer flex items-center gap-1.5"
                                  >
                                    <Icons.Trash />
                                    Delete
                                  </button>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        {/* Section 2: Achievements */}
                        <div className="space-y-6">
                          <div className="flex justify-between items-center border-b border-border pb-4">
                            <h2 className="text-xs tracking-[0.2em] uppercase text-muted font-bold">Awards & Hackathons</h2>
                            <button
                              onClick={() => {
                                setEditingAchievement({ title: '', event: '', detail: '', date: '' });
                                setIsAddingNew(true);
                              }}
                              className="text-[10px] font-bold text-fg border border-border px-4 py-2.5 hover:bg-fg hover:text-bg transition-all duration-200 cursor-pointer tracking-widest uppercase flex items-center gap-2"
                            >
                              <Icons.Plus />
                              Add Achievement
                            </button>
                          </div>

                          <div className="border border-border divide-y divide-border">
                            {portfolioData.achievements.map((ach: any, idx: number) => (
                              <motion.div
                                key={idx}
                                whileHover={{ x: 6 }}
                                transition={{ type: 'spring', stiffness: 220, damping: 20 }}
                                className="p-6 flex flex-col sm:flex-row justify-between items-start gap-4 hover:bg-fg/[0.01]"
                              >
                                <div className="space-y-2">
                                  <div className="flex flex-wrap items-center gap-2">
                                    <h4 className="font-extrabold text-fg text-base">{ach.title}</h4>
                                    <span className="text-[10px] tracking-wider text-accent font-bold uppercase font-mono">— {ach.event}</span>
                                  </div>
                                  <p className="text-[10px] text-muted font-mono tracking-widest">{ach.date}</p>
                                  <p className="text-xs text-muted leading-relaxed mt-1 max-w-2xl">{ach.detail}</p>
                                </div>
                                <div className="flex gap-2 flex-shrink-0 w-full sm:w-auto justify-end sm:justify-start">
                                  <button
                                    onClick={() => {
                                      setEditingAchievement({ ...ach, _index: idx });
                                      setIsAddingNew(false);
                                    }}
                                    className="text-[9px] tracking-widest uppercase px-3 py-2 border border-border hover:border-accent hover:text-accent bg-bg transition-all cursor-pointer flex items-center gap-1.5"
                                  >
                                    <Icons.Edit />
                                    Edit
                                  </button>
                                  <button
                                    onClick={() => handleDeleteAchievement(idx, ach.title)}
                                    className="text-[9px] tracking-widest uppercase px-3 py-2 border border-border hover:border-red-500 hover:text-red-500 bg-bg transition-all cursor-pointer flex items-center gap-1.5"
                                  >
                                    <Icons.Trash />
                                    Delete
                                  </button>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* TAB 4: BIO & DETAILS */}
                    {activeTab === 'profile' && (
                      <div className="space-y-8">
                        {/* Section 1: Hero Info */}
                        <div className="border border-border p-6 bg-fg/[0.005] space-y-6">
                          <h3 className="text-xs tracking-widest uppercase text-accent font-bold border-b border-border pb-3 flex items-center gap-2">
                            <Icons.User />
                            Hero Profile
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            <div>
                              <label className="block text-[9px] tracking-widest uppercase text-muted mb-2 font-semibold">Display Name</label>
                              <input
                                type="text" value={portfolioData.hero.name}
                                onChange={e => handleProfileFieldChange('hero', 'name', e.target.value)}
                                onBlur={() => saveAllData(portfolioData, true)}
                                className="w-full bg-fg/[0.01] dark:bg-bg/20 border border-border focus:border-accent text-fg rounded-none px-3 py-2 outline-none text-xs transition-colors"
                              />
                            </div>
                            <div>
                              <label className="block text-[9px] tracking-widest uppercase text-muted mb-2 font-semibold">Initials</label>
                              <input
                                type="text" value={portfolioData.hero.initials}
                                onChange={e => handleProfileFieldChange('hero', 'initials', e.target.value)}
                                onBlur={() => saveAllData(portfolioData, true)}
                                className="w-full bg-fg/[0.01] dark:bg-bg/20 border border-border focus:border-accent text-fg rounded-none px-3 py-2 outline-none text-xs transition-colors"
                              />
                            </div>
                            <div>
                              <label className="block text-[9px] tracking-widest uppercase text-muted mb-2 font-semibold">Headline Role</label>
                              <input
                                type="text" value={portfolioData.hero.role}
                                onChange={e => handleProfileFieldChange('hero', 'role', e.target.value)}
                                onBlur={() => saveAllData(portfolioData, true)}
                                className="w-full bg-fg/[0.01] dark:bg-bg/20 border border-border focus:border-accent text-fg rounded-none px-3 py-2 outline-none text-xs transition-colors"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            <div>
                              <label className="block text-[9px] tracking-widest uppercase text-muted mb-2 font-semibold">GitHub Profile URL</label>
                              <input
                                type="text" value={portfolioData.hero.github}
                                onChange={e => handleProfileFieldChange('hero', 'github', e.target.value)}
                                onBlur={() => saveAllData(portfolioData, true)}
                                className="w-full bg-fg/[0.01] dark:bg-bg/20 border border-border focus:border-accent text-fg rounded-none px-3 py-2 outline-none text-xs font-mono transition-colors"
                              />
                            </div>
                            <div>
                              <label className="block text-[9px] tracking-widest uppercase text-muted mb-2 font-semibold">LinkedIn Profile URL</label>
                              <input
                                type="text" value={portfolioData.hero.linkedin}
                                onChange={e => handleProfileFieldChange('hero', 'linkedin', e.target.value)}
                                onBlur={() => saveAllData(portfolioData, true)}
                                className="w-full bg-fg/[0.01] dark:bg-bg/20 border border-border focus:border-accent text-fg rounded-none px-3 py-2 outline-none text-xs font-mono transition-colors"
                              />
                            </div>
                            <div>
                              <label className="block text-[9px] tracking-widest uppercase text-muted mb-2 font-semibold">Public Email</label>
                              <input
                                type="text" value={portfolioData.hero.email}
                                onChange={e => handleProfileFieldChange('hero', 'email', e.target.value)}
                                onBlur={() => saveAllData(portfolioData, true)}
                                className="w-full bg-fg/[0.01] dark:bg-bg/20 border border-border focus:border-accent text-fg rounded-none px-3 py-2 outline-none text-xs font-mono transition-colors"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[9px] tracking-widest uppercase text-muted mb-2 font-semibold">Hero Intro Summary</label>
                            <textarea
                              rows={3} value={portfolioData.hero.description}
                              onChange={e => handleProfileFieldChange('hero', 'description', e.target.value)}
                              onBlur={() => saveAllData(portfolioData, true)}
                              className="w-full bg-fg/[0.01] dark:bg-bg/20 border border-border focus:border-accent text-fg rounded-none px-3 py-2 outline-none text-xs resize-y transition-colors leading-relaxed"
                            />
                          </div>
                        </div>

                        {/* Section 2: About paragraphs */}
                        <div className="border border-border p-6 bg-fg/[0.005] space-y-6">
                          <div className="flex justify-between items-center border-b border-border pb-3">
                            <h3 className="text-xs tracking-widest uppercase text-accent font-bold flex items-center gap-2">
                              <Icons.User />
                              Biography / About Text
                            </h3>
                            <button
                              type="button" onClick={handleAddAboutParagraph}
                              className="text-[9px] font-bold text-fg border border-border px-3 py-1.5 hover:bg-fg hover:text-bg uppercase tracking-widest flex items-center gap-1"
                            >
                              <Icons.Plus />
                              Add Paragraph
                            </button>
                          </div>

                          <div className="space-y-4">
                            {portfolioData.about.map((para: string, idx: number) => (
                              <div key={idx} className="flex gap-4 items-start bg-bg border border-border/50 p-4">
                                <span className="text-[10px] font-mono text-muted pt-2.5">#{idx + 1}</span>
                                <textarea
                                  rows={3} value={para}
                                  onChange={e => handleProfileFieldChange('about', '', e.target.value, idx)}
                                  onBlur={() => saveAllData(portfolioData, true)}
                                  className="w-full bg-transparent border-0 focus:ring-0 text-fg rounded-none py-1.5 outline-none text-xs resize-y leading-relaxed"
                                />
                                <button
                                  type="button" onClick={() => handleRemoveAboutParagraph(idx)}
                                  className="text-[9px] text-muted hover:text-red-500 uppercase tracking-widest pt-2 hover:font-bold transition-all flex items-center gap-1 cursor-pointer"
                                >
                                  <Icons.Trash />
                                  Delete
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Section 3: Stats */}
                        <div className="border border-border p-6 bg-fg/[0.005] space-y-6">
                          <h3 className="text-xs tracking-widest uppercase text-accent font-bold border-b border-border pb-3 flex items-center gap-2">
                            <Icons.Folder />
                            Stats Panel configuration
                          </h3>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {portfolioData.stats.map((stat: any, idx: number) => (
                              <div key={idx} className="space-y-2 border border-border p-4 bg-bg">
                                <span className="text-[9px] font-mono text-muted uppercase">Stat #{idx + 1}</span>
                                <input
                                  type="text" value={stat.value} placeholder="Value"
                                  onChange={e => handleProfileFieldChange('stats', 'value', e.target.value, idx)}
                                  onBlur={() => saveAllData(portfolioData, true)}
                                  className="w-full bg-fg/[0.01] dark:bg-bg/20 border border-border focus:border-accent text-fg rounded-none px-2 py-1.5 outline-none text-sm font-bold transition-colors"
                                />
                                <input
                                  type="text" value={stat.label} placeholder="Label"
                                  onChange={e => handleProfileFieldChange('stats', 'label', e.target.value, idx)}
                                  onBlur={() => saveAllData(portfolioData, true)}
                                  className="w-full bg-fg/[0.01] dark:bg-bg/20 border border-border focus:border-accent text-fg rounded-none px-2 py-1 outline-none text-[9px] text-muted uppercase tracking-wider transition-colors"
                                />
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Section 4: Certifications */}
                        <div className="border border-border p-6 bg-fg/[0.005] space-y-6">
                          <div className="flex justify-between items-center border-b border-border pb-3">
                            <h3 className="text-xs tracking-widest uppercase text-accent font-bold flex items-center gap-2">
                              <Icons.Code />
                              Verifications & Credentials
                            </h3>
                            <button
                              type="button" onClick={handleAddCertification}
                              className="text-[9px] font-bold text-fg border border-border px-3 py-1.5 hover:bg-fg hover:text-bg uppercase tracking-widest flex items-center gap-1"
                            >
                              <Icons.Plus />
                              Add Credential
                            </button>
                          </div>

                          <div className="space-y-3">
                            {portfolioData.certifications.map((cert: string, idx: number) => (
                              <div key={idx} className="flex gap-4 items-center bg-bg border border-border/50 p-3">
                                <span className="text-[10px] font-mono text-muted">#{idx + 1}</span>
                                <input
                                  type="text" value={cert} placeholder="Oracle Generative AI — Jul 2025"
                                  onChange={e => handleProfileFieldChange('certifications', '', e.target.value, idx)}
                                  onBlur={() => saveAllData(portfolioData, true)}
                                  className="w-full bg-transparent border-0 focus:ring-0 text-fg rounded-none px-1 py-1.5 outline-none text-xs"
                                />
                                <button
                                  type="button" onClick={() => handleRemoveCertification(idx)}
                                  className="text-[9px] text-muted hover:text-red-500 uppercase tracking-widest hover:font-bold transition-all flex items-center gap-1 cursor-pointer"
                                >
                                  <Icons.Trash />
                                  Remove
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Save Profile Button - prominently placed */}
                        <div className="border-2 border-accent/30 bg-accent/5 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                          <div>
                            <p className="text-xs tracking-widest uppercase text-accent font-bold">Unsaved Profile Changes?</p>
                            <p className="text-[10px] text-muted mt-1">Click save to write all hero, bio, stats, and certification edits to disk.</p>
                          </div>
                          <button
                            onClick={() => saveAllData(portfolioData)}
                            disabled={isSaving}
                            className="text-xs font-bold text-bg bg-accent border border-accent px-6 py-3 hover:bg-fg hover:border-fg hover:text-bg transition-all duration-300 cursor-pointer tracking-widest uppercase flex items-center gap-2 whitespace-nowrap shadow-lg shadow-accent/10"
                          >
                            {isSaving ? (
                              <>
                                <div className="w-3.5 h-3.5 border border-bg border-t-transparent animate-spin rounded-full" />
                                Saving...
                              </>
                            ) : (
                              <>
                                <Icons.Save />
                                SAVE PROFILE
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ── MODAL 1: ADD/EDIT PROJECT ────────────────────────────────────────── */}
      <AnimatePresence>
        {editingProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEditingProject(null)}
              className="fixed inset-0 bg-bg/80 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              transition={{ type: 'spring', stiffness: 150, damping: 20 }}
              className="w-full max-w-2xl bg-bg border border-border p-6 sm:p-8 relative max-h-[85vh] overflow-y-auto shadow-2xl"
            >
              {/* Top gradient highlight */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-accent" />

              <form onSubmit={handleSaveProject} className="space-y-6">
                <div className="flex justify-between items-center border-b border-border pb-4">
                  <h3 className="text-base font-extrabold tracking-tight uppercase flex items-center gap-2">
                    <Icons.Folder />
                    {isAddingNew ? 'Create New Project Record' : 'Edit Project Record'}
                  </h3>
                  <button
                    type="button"
                    onClick={() => setEditingProject(null)}
                    className="text-xs text-muted hover:text-fg uppercase tracking-widest cursor-pointer"
                  >
                    Close ✕
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[9px] tracking-widest uppercase text-muted mb-2 font-semibold">Project Title</label>
                    <input
                      type="text"
                      required
                      value={editingProject.title}
                      onChange={(e) => {
                        const title = e.target.value;
                        const autoSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                        setEditingProject((prev: any) => ({
                          ...prev,
                          title,
                          slug: isAddingNew ? autoSlug : prev.slug
                        }));
                      }}
                      className="w-full bg-fg/[0.01] dark:bg-bg/25 border border-border focus:border-accent text-fg rounded-none px-3.5 py-2 outline-none text-xs transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] tracking-widest uppercase text-muted mb-2 font-semibold">URL Slug</label>
                    <input
                      type="text"
                      required
                      value={editingProject.slug}
                      onChange={(e) => setEditingProject((prev: any) => ({ ...prev, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]+/g, '') }))}
                      className="w-full bg-fg/[0.01] dark:bg-bg/25 border border-border focus:border-accent text-fg rounded-none px-3.5 py-2 outline-none text-xs font-mono transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] tracking-widest uppercase text-muted mb-2 font-semibold">Subtitle / Tagline</label>
                    <input
                      type="text"
                      required
                      value={editingProject.subtitle}
                      onChange={(e) => setEditingProject((prev: any) => ({ ...prev, subtitle: e.target.value }))}
                      className="w-full bg-fg/[0.01] dark:bg-bg/25 border border-border focus:border-accent text-fg rounded-none px-3.5 py-2 outline-none text-xs transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] tracking-widest uppercase text-muted mb-2 font-semibold">Timeline (e.g. "Dec 2025")</label>
                    <input
                      type="text"
                      required
                      value={editingProject.period}
                      onChange={(e) => setEditingProject((prev: any) => ({ ...prev, period: e.target.value }))}
                      className="w-full bg-fg/[0.01] dark:bg-bg/25 border border-border focus:border-accent text-fg rounded-none px-3.5 py-2 outline-none text-xs transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] tracking-widest uppercase text-muted mb-2 font-semibold">GitHub Link (optional)</label>
                    <input
                      type="text"
                      value={editingProject.github || ''}
                      onChange={(e) => setEditingProject((prev: any) => ({ ...prev, github: e.target.value }))}
                      placeholder="https://github.com/AdityaAneNenu/..."
                      className="w-full bg-fg/[0.01] dark:bg-bg/25 border border-border focus:border-accent text-fg rounded-none px-3.5 py-2 outline-none text-xs transition-colors font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] tracking-widest uppercase text-muted mb-2 font-semibold">Demo Link (optional)</label>
                    <input
                      type="text"
                      value={editingProject.demo || ''}
                      onChange={(e) => setEditingProject((prev: any) => ({ ...prev, demo: e.target.value }))}
                      placeholder="https://..."
                      className="w-full bg-fg/[0.01] dark:bg-bg/25 border border-border focus:border-accent text-fg rounded-none px-3.5 py-2 outline-none text-xs transition-colors font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[9px] tracking-widest uppercase text-muted mb-2 font-semibold font-mono">Tech stack tags (comma separated)</label>
                  <input
                    type="text"
                    value={editingProject.stackString}
                    onChange={(e) => {
                      const val = e.target.value;
                      const tags = val.split(',').map(s => s.trim()).filter(Boolean);
                      setEditingProject((prev: any) => ({ ...prev, stackString: val, stack: tags }));
                    }}
                    placeholder="Next.js 15, TypeScript, Firebase, TensorFlow.js"
                    className="w-full bg-fg/[0.01] dark:bg-bg/25 border border-border focus:border-accent text-fg rounded-none px-3.5 py-2 outline-none text-xs transition-colors"
                  />
                  {editingProject.stack.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {editingProject.stack.map((tech: string) => (
                        <span key={tech} className="text-[9px] tracking-wider uppercase text-muted bg-fg/[0.03] px-2 py-0.5 border border-border/50">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-[9px] tracking-widest uppercase text-muted mb-2 font-semibold">Project Description</label>
                  <textarea
                    rows={5}
                    required
                    value={editingProject.description}
                    onChange={(e) => setEditingProject((prev: any) => ({ ...prev, description: e.target.value }))}
                    className="w-full bg-fg/[0.01] dark:bg-bg/25 border border-border focus:border-accent text-fg rounded-none px-3.5 py-2.5 outline-none text-xs transition-colors resize-y leading-relaxed"
                  />
                </div>

                <div className="flex gap-3 pt-4 border-t border-border">
                  <button
                    type="submit"
                    className="text-xs font-bold text-bg bg-accent border border-accent px-6 py-3 hover:bg-fg hover:border-fg hover:text-bg transition-all duration-200 cursor-pointer tracking-widest uppercase rounded-none"
                  >
                    {isAddingNew ? 'SAVE NEW PROJECT' : 'SAVE CHANGES'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingProject(null)}
                    className="text-xs font-bold text-fg border border-border px-6 py-3 hover:bg-fg hover:text-bg transition-all duration-200 cursor-pointer tracking-widest uppercase rounded-none"
                  >
                    CANCEL
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── MODAL 2: ADD/EDIT EXPERIENCE ────────────────────────────────────── */}
      <AnimatePresence>
        {editingExperience && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEditingExperience(null)}
              className="fixed inset-0 bg-bg/80 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              transition={{ type: 'spring', stiffness: 150, damping: 20 }}
              className="w-full max-w-lg bg-bg border border-border p-6 sm:p-8 relative shadow-2xl"
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-accent" />

              <form onSubmit={handleSaveExperience} className="space-y-5">
                <div className="flex justify-between items-center border-b border-border pb-4">
                  <h3 className="text-base font-extrabold tracking-tight uppercase flex items-center gap-2">
                    <Icons.Briefcase />
                    {isAddingNew ? 'Add Experience Timeline' : 'Edit Experience Details'}
                  </h3>
                  <button
                    type="button"
                    onClick={() => setEditingExperience(null)}
                    className="text-xs text-muted hover:text-fg uppercase tracking-widest cursor-pointer"
                  >
                    Close ✕
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-[9px] tracking-widest uppercase text-muted mb-2 font-semibold">Job Title</label>
                    <input
                      type="text" required value={editingExperience.title}
                      onChange={e => setEditingExperience((prev: any) => ({ ...prev, title: e.target.value }))}
                      className="w-full bg-fg/[0.01] dark:bg-bg/25 border border-border focus:border-accent text-fg rounded-none px-3.5 py-2 outline-none text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[9px] tracking-widest uppercase text-muted mb-2 font-semibold">Company / Org</label>
                      <input
                        type="text" required value={editingExperience.org}
                        onChange={e => setEditingExperience((prev: any) => ({ ...prev, org: e.target.value }))}
                        className="w-full bg-fg/[0.01] dark:bg-bg/25 border border-border focus:border-accent text-fg rounded-none px-3.5 py-2 outline-none text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] tracking-widest uppercase text-muted mb-2 font-semibold">Timeline / Period</label>
                      <input
                        type="text" required value={editingExperience.period}
                        onChange={e => setEditingExperience((prev: any) => ({ ...prev, period: e.target.value }))}
                        className="w-full bg-fg/[0.01] dark:bg-bg/25 border border-border focus:border-accent text-fg rounded-none px-3.5 py-2 outline-none text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[9px] tracking-widest uppercase text-muted mb-2 font-semibold">Job Description</label>
                    <textarea
                      rows={4} required value={editingExperience.description}
                      onChange={e => setEditingExperience((prev: any) => ({ ...prev, description: e.target.value }))}
                      className="w-full bg-fg/[0.01] dark:bg-bg/25 border border-border focus:border-accent text-fg rounded-none px-3.5 py-2 outline-none text-xs resize-y"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-border">
                  <button type="submit" className="text-xs font-bold text-bg bg-accent border border-accent px-6 py-3.5 hover:bg-fg hover:border-fg hover:text-bg transition-all duration-200 cursor-pointer tracking-widest uppercase">
                    SAVE TIMELINE
                  </button>
                  <button type="button" onClick={() => setEditingExperience(null)} className="text-xs font-bold text-fg border border-border px-6 py-3.5 hover:bg-fg hover:text-bg transition-all duration-200 cursor-pointer tracking-widest uppercase">
                    CANCEL
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── MODAL 3: ADD/EDIT ACHIEVEMENT ───────────────────────────────────── */}
      <AnimatePresence>
        {editingAchievement && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEditingAchievement(null)}
              className="fixed inset-0 bg-bg/80 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              transition={{ type: 'spring', stiffness: 150, damping: 20 }}
              className="w-full max-w-lg bg-bg border border-border p-6 sm:p-8 relative shadow-2xl"
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-accent" />

              <form onSubmit={handleSaveAchievement} className="space-y-5">
                <div className="flex justify-between items-center border-b border-border pb-4">
                  <h3 className="text-base font-extrabold tracking-tight uppercase flex items-center gap-2">
                    <Icons.Briefcase />
                    {isAddingNew ? 'Add Achievement Detail' : 'Edit Achievement Details'}
                  </h3>
                  <button
                    type="button"
                    onClick={() => setEditingAchievement(null)}
                    className="text-xs text-muted hover:text-fg uppercase tracking-widest cursor-pointer"
                  >
                    Close ✕
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-[9px] tracking-widest uppercase text-muted mb-2 font-semibold">Award/Placement Title</label>
                    <input
                      type="text" required value={editingAchievement.title}
                      onChange={e => setEditingAchievement((prev: any) => ({ ...prev, title: e.target.value }))}
                      className="w-full bg-fg/[0.01] dark:bg-bg/25 border border-border focus:border-accent text-fg rounded-none px-3.5 py-2 outline-none text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] tracking-widest uppercase text-muted mb-2 font-semibold">Event / Organization</label>
                    <input
                      type="text" required value={editingAchievement.event}
                      onChange={e => setEditingAchievement((prev: any) => ({ ...prev, event: e.target.value }))}
                      className="w-full bg-fg/[0.01] dark:bg-bg/25 border border-border focus:border-accent text-fg rounded-none px-3.5 py-2 outline-none text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[9px] tracking-widest uppercase text-muted mb-2 font-semibold">Details / Key Remarks</label>
                      <input
                        type="text" required value={editingAchievement.detail}
                        onChange={e => setEditingAchievement((prev: any) => ({ ...prev, detail: e.target.value }))}
                        className="w-full bg-fg/[0.01] dark:bg-bg/25 border border-border focus:border-accent text-fg rounded-none px-3.5 py-2 outline-none text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] tracking-widest uppercase text-muted mb-2 font-semibold">Timeline Date</label>
                      <input
                        type="text" required value={editingAchievement.date}
                        onChange={e => setEditingAchievement((prev: any) => ({ ...prev, date: e.target.value }))}
                        className="w-full bg-fg/[0.01] dark:bg-bg/25 border border-border focus:border-accent text-fg rounded-none px-3.5 py-2 outline-none text-xs"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-border">
                  <button type="submit" className="text-xs font-bold text-bg bg-accent border border-accent px-6 py-3.5 hover:bg-fg hover:border-fg hover:text-bg transition-all duration-200 cursor-pointer tracking-widest uppercase">
                    SAVE AWARD
                  </button>
                  <button type="button" onClick={() => setEditingAchievement(null)} className="text-xs font-bold text-fg border border-border px-6 py-3.5 hover:bg-fg hover:text-bg transition-all duration-200 cursor-pointer tracking-widest uppercase">
                    CANCEL
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── MODAL 4: CUSTOM DELETE CONFIRMATION ───────────────────────────────── */}
      <AnimatePresence>
        {deleteConfirm.show && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteConfirm(prev => ({ ...prev, show: false }))}
              className="fixed inset-0 bg-bg/80 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              transition={{ type: 'spring', stiffness: 150, damping: 20 }}
              className="w-full max-w-md bg-bg border border-border p-6 sm:p-8 relative shadow-2xl z-10"
            >
              {/* Red visual accent line for danger state */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-red-500" />

              <div className="space-y-6">
                <div className="flex items-center gap-3 text-red-500">
                  <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                    <Icons.Trash />
                  </div>
                  <h3 className="text-base font-extrabold tracking-tight uppercase">
                    Confirm Deletion
                  </h3>
                </div>

                <div className="space-y-2">
                  <p className="text-xs text-muted tracking-widest uppercase font-mono">WARNING: this action cannot be undone</p>
                  <p className="text-sm leading-relaxed text-fg">
                    Are you sure you want to delete <strong className="font-extrabold text-accent">{deleteConfirm.title}</strong>? This will immediately remove it from your portfolio and write the changes to disk.
                  </p>
                </div>

                <div className="flex gap-3 pt-4 border-t border-border">
                  <button
                    onClick={executeDelete}
                    className="text-xs font-bold text-white bg-red-600 border border-red-600 px-6 py-3.5 hover:bg-red-700 hover:border-red-700 transition-all duration-200 cursor-pointer tracking-widest uppercase rounded-none"
                  >
                    CONFIRM DELETE
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(prev => ({ ...prev, show: false }))}
                    className="text-xs font-bold text-fg border border-border px-6 py-3.5 hover:bg-fg hover:text-bg transition-all duration-200 cursor-pointer tracking-widest uppercase rounded-none"
                  >
                    CANCEL
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
