import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  LayoutDashboard, FileText, Users, Briefcase, Mail, 
  Settings, LogOut, Plus, Trash2, Edit, ChevronRight,
  Activity, CheckCircle2, Clock, X, Menu, ExternalLink,
  Eye, EyeOff, Globe
} from 'lucide-react';
import { API_URL } from '../config/api';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [data, setData] = useState({ insights: [], jobs: [], testimonials: [], messages: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionLoading, setActionLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [newJob, setNewJob] = useState({
    title: '',
    description: '',
    requirements: '',
    location: '',
    type: 'Full-time',
    team: '',
    active: true
  });
  const [newPost, setNewPost] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    isPublished: false
  });
  const [modalType, setModalType] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    if (!token) navigate('/admin/login');
    fetchData();
  }, [token]);

  const fetchData = async () => {
    try {
        setLoading(true);
        setError('');
        const headers = { 'x-auth-token': token };
        const [blogRes, jobRes, testRes, msgRes] = await Promise.all([
            fetch(`${API_URL}/api/blog/admin/all`, { headers }),
            fetch(`${API_URL}/api/careers/admin/all`, { headers }),
            fetch(`${API_URL}/api/testimonials/admin/all`, { headers }),
            fetch(`${API_URL}/api/contact/admin/all`, { headers })
        ]);

        if (!blogRes.ok || !jobRes.ok || !testRes.ok || !msgRes.ok) {
            setError('Failed to fetch data from server');
            setLoading(false);
            return;
        }

        const blogData = await blogRes.json();
        const testData = await testRes.json();
        const msgData  = await msgRes.json();
        const jobData  = await jobRes.json();

        setData({
            insights: Array.isArray(blogData) ? blogData : [],
            jobs: Array.isArray(jobData) ? jobData : [],
            testimonials: Array.isArray(testData) ? testData : [],
            messages: Array.isArray(msgData) ? msgData : []
        });
        setError('');
    } catch (err) {
        console.error('Fetch failed:', err);
        setError(`Connection failed: ${err.message}. Make sure the backend is running on port 5003.`);
    } finally {
        setLoading(false);
    }
  };

  const deleteItem = async (route, id) => {
    if (!window.confirm('Are you sure? This action cannot be undone.')) return;
    setActionLoading(true);
    try {
        const res = await fetch(`${API_URL}/api/${route}/admin/${id}`, {
            method: 'DELETE',
            headers: { 'x-auth-token': token }
        });
        if (res.ok) fetchData();
    } catch (err) {
        alert('Delete failed');
    } finally {
        setActionLoading(false);
    }
  };

  const togglePublish = async (id, currentStatus) => {
    setActionLoading(true);
    try {
        await fetch(`${API_URL}/api/blog/admin/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
            body: JSON.stringify({ isPublished: !currentStatus })
        });
        fetchData();
    } finally {
        setActionLoading(false);
    }
  };

  const createJob = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    try {
        const jobData = {
            ...newJob,
            requirements: newJob.requirements.split(',').map(r => r.trim())
        };
        await fetch(`${API_URL}/api/careers/admin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
            body: JSON.stringify(jobData)
        });
        setShowModal(false);
        setModalType(null);
        setNewJob({
            title: '',
            description: '',
            requirements: '',
            location: '',
            type: 'Full-time',
            team: '',
            active: true
        });
        fetchData();
    } catch (err) {
        alert('Failed to create job');
    } finally {
        setActionLoading(false);
    }
  };

  const createPost = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    try {
        await fetch(`${API_URL}/api/blog/admin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
            body: JSON.stringify(newPost)
        });
        setShowModal(false);
        setModalType(null);
        setNewPost({
            title: '',
            slug: '',
            content: '',
            excerpt: '',
            isPublished: false
        });
        fetchData();
    } catch (err) {
        alert('Failed to create post');
    } finally {
        setActionLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-bg-primary">
      <div className="text-center">
        <Activity className="animate-spin text-brand-red mx-auto mb-6" size={40} />
        <p className="text-text-secondary font-medium">Loading admin dashboard...</p>
        <p className="text-[12px] text-text-secondary mt-2">Make sure backend is running on port 5003</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-bg-primary p-6">
      <div className="text-center max-w-md">
        <X className="text-brand-red mx-auto mb-6" size={48} />
        <h2 className="text-2xl font-black text-text-primary mb-4">Connection Error</h2>
        <p className="text-text-secondary mb-8">{error}</p>
        <button
          onClick={() => fetchData()}
          className="px-8 py-4 bg-brand-red text-white font-bold rounded-2xl hover:scale-105 active:scale-95 transition-all"
        >
          Retry
        </button>
      </div>
    </div>
  );

  const NavItem = ({ id, label, icon: Icon }) => (
    <button
      onClick={() => { setActiveTab(id); setSidebarOpen(false); }}
      className={`w-full flex items-center gap-3 px-4 py-4 rounded-xl text-sm font-bold transition-all ${
          activeTab === id 
          ? 'bg-brand-red text-white shadow-lg shadow-brand-red/20' 
          : 'text-text-secondary hover:bg-bg-secondary hover:text-text-primary'
      }`}
    >
      <Icon size={18} />
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      <Helmet><title>Admin Control | True North</title></Helmet>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-bg-secondary border-b border-border-subtle z-[60] flex items-center justify-between px-6">
         <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-red rounded flex items-center justify-center font-black text-xs text-white">TN</div>
            <span className="text-sm font-black uppercase tracking-tight">Terminal</span>
         </div>
         <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-text-primary">
            {sidebarOpen ? <X /> : <Menu />}
         </button>
      </div>

      <div className="flex">
        
        {/* Sidebar */}
        <aside className={`
            fixed inset-y-0 left-0 w-72 bg-bg-primary border-r border-border-subtle z-[70] transition-transform duration-300 lg:translate-x-0 lg:static lg:h-screen
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="h-full flex flex-col p-6">
             <div className="hidden lg:flex items-center gap-3 mb-10 px-2 mt-4">
                <div className="w-10 h-10 bg-brand-red rounded-xl flex items-center justify-center text-white font-black">TN</div>
                <div>
                   <h2 className="text-sm font-bold text-text-primary leading-tight">Admin Terminal</h2>
                   <p className="text-[10px] text-brand-red uppercase font-black tracking-widest">v1.2.0 Active</p>
                </div>
             </div>

             <nav className="flex-grow space-y-1">
                <NavItem id="overview" label="Dashboard" icon={LayoutDashboard} />
                <NavItem id="insights" label="Insights" icon={FileText} />
                <NavItem id="careers" label="Careers" icon={Briefcase} />
                <NavItem id="testimonials" label="Reviews" icon={Users} />
                <NavItem id="messages" label="Messages" icon={Mail} />
                
                <div className="pt-10 mt-10 border-t border-border-subtle space-y-1">
                   <NavItem id="settings" label="Settings" icon={Settings} />
                   <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-4 rounded-xl text-sm font-bold text-brand-red hover:bg-brand-red/10 transition-all">
                      <LogOut size={18} /> Exit Session
                   </button>
                </div>
             </nav>
          </div>
        </aside>

        {/* Backdrop for mobile */}
        {sidebarOpen && <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[65] lg:hidden" onClick={() => setSidebarOpen(false)} />}

        {/* Content Area */}
        <main className="flex-grow min-h-screen p-6 lg:p-12 pt-24 lg:pt-12 overflow-x-hidden">
           
           {activeTab === 'overview' && (
              <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <header className="mb-12">
                      <h1 className="text-4xl lg:text-5xl font-black tracking-tight mb-2">System <span className="text-gradient">Core</span></h1>
                      <p className="text-text-secondary font-medium">Monitoring global operations and content health</p>
                  </header>

                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
                      {[
                          { label: 'Insights', value: data.insights.length, icon: FileText, color: 'text-blue-400' },
                          { label: 'Active Jobs', value: data.jobs.length, icon: Briefcase, color: 'text-yellow-400' },
                          { label: 'Testimonials', value: data.testimonials.length, icon: Users, color: 'text-green-400' },
                          { label: 'Inbox', value: data.messages.length, icon: Mail, color: 'text-brand-red' }
                      ].map(stat => (
                          <div key={stat.label} className="glass p-8 rounded-3xl border border-border-subtle relative overflow-hidden group">
                              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-red/5 rounded-full blur-3xl pointer-events-none group-hover:bg-brand-red/10 transition-colors" />
                              <div className={`w-12 h-12 bg-bg-secondary rounded-xl flex items-center justify-center mb-6 border border-border-subtle ${stat.color} group-hover:scale-110 transition-transform`}>
                                  <stat.icon size={22} />
                              </div>
                              <p className="text-[10px] uppercase tracking-widest font-black text-text-secondary mb-1">{stat.label}</p>
                              <h4 className="text-4xl font-black">{stat.value}</h4>
                          </div>
                      ))}
                  </div>

                  <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                       {/* Message Queue */}
                       <div className="xl:col-span-2 glass rounded-3xl border border-border-subtle p-8 lg:p-10">
                           <div className="flex justify-between items-center mb-8">
                              <h3 className="text-xl font-bold flex items-center gap-2"><Clock size={20} className="text-brand-red" /> Lead Inflow</h3>
                              <button onClick={() => setActiveTab('messages')} className="text-xs font-bold text-text-secondary hover:text-text-primary transition-colors">Manage All</button>
                           </div>
                           <div className="space-y-4">
                              {data.messages.length === 0 ? <p className="text-center text-text-secondary py-10">No recent messages.</p> : 
                                data.messages.slice(0, 5).map(msg => (
                                  <div key={msg._id} className="p-6 bg-bg-primary/40 rounded-2xl border border-border-subtle/50 flex justify-between items-center hover:border-brand-red/30 transition-all group">
                                      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
                                          <div className="w-10 h-10 rounded-full bg-bg-secondary flex items-center justify-center text-xs font-bold ring-1 ring-border-subtle">
                                              {msg.name.charAt(0)}
                                          </div>
                                          <div>
                                              <p className="text-sm font-bold text-text-primary group-hover:text-brand-red transition-colors">{msg.name}</p>
                                              <p className="text-[10px] text-text-secondary uppercase tracking-widest leading-none mt-1">{msg.email}</p>
                                          </div>
                                      </div>
                                      <ChevronRight size={16} className="text-text-secondary group-hover:text-brand-red group-hover:translate-x-1 transition-all" />
                                  </div>
                              ))}
                           </div>
                       </div>

                       {/* Status Panel */}
                       <div className="glass rounded-3xl border border-border-subtle p-8 overflow-hidden">
                           <h3 className="text-xl font-bold mb-8">Service Mesh</h3>
                           <div className="space-y-6">
                              {[
                                { name: 'MongoDB', status: 'Online', val: 'UP' },
                                { name: 'Cloudinary', status: 'Online', val: 'UP' },
                                { name: 'Mail Server', status: 'Online', val: 'UP' }
                              ].map(s => (
                                <div key={s.name} className="flex justify-between items-center p-4 bg-bg-secondary rounded-xl border border-border-subtle">
                                    <span className="text-sm font-bold text-text-secondary">{s.name}</span>
                                    <span className="flex items-center gap-1.5 text-[10px] font-black text-green-400">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                        {s.val}
                                    </span>
                                </div>
                              ))}
                           </div>
                           <div className="mt-12 p-6 rounded-2xl bg-brand-red/5 border border-brand-red/10 text-center">
                               <Activity size={32} className="text-brand-red mx-auto mb-4" />
                               <p className="text-[10px] font-black uppercase tracking-widest text-text-secondary mb-1">Global Health</p>
                               <h5 className="text-2xl font-black text-brand-red">Excellence</h5>
                           </div>
                       </div>
                  </div>
              </div>
           )}

            {/* Insights Tab */}
            {activeTab === 'insights' && (
               <div className="max-w-7xl mx-auto animate-in fade-in duration-500">
                   <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8 sm:mb-12">
                       <div>
                           <h1 className="text-2xl sm:text-4xl font-black tracking-tight">Insights <span className="text-gradient">Manager</span></h1>
                           <p className="text-text-secondary mt-1 text-sm sm:text-base">Manage public articles and technical papers</p>
                       </div>
                       <button onClick={() => { setShowModal(true); setModalType('post'); }} className="flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-brand-red text-white font-bold rounded-2xl shadow-xl shadow-brand-red/30 hover:scale-[1.02] active:scale-95 transition-all text-sm sm:text-base self-start sm:self-auto">
                           <Plus size={18} className="sm:w-5 sm:h-5" /> <span className="hidden xs:inline">Create </span>Post
                       </button>
                   </header>

                  <div className="glass rounded-3xl border border-border-subtle overflow-x-auto">
                      <table className="w-full text-left min-w-[800px]">
                          <thead>
                              <tr className="bg-bg-secondary/50 border-b border-border-subtle text-[10px] uppercase font-black tracking-widest text-text-secondary">
                                  <th className="px-8 py-5">Article Title</th>
                                  <th className="px-8 py-5">Status</th>
                                  <th className="px-8 py-5">Analytics</th>
                                  <th className="px-8 py-5 text-right">Operations</th>
                              </tr>
                          </thead>
                          <tbody className="divide-y divide-border-subtle/30">
                              {data.insights.map(post => (
                                  <tr key={post._id} className="hover:bg-bg-secondary/30 transition-colors group">
                                      <td className="px-8 py-5">
                                          <div className="flex items-center gap-4">
                                              <div className="w-12 h-12 rounded-lg bg-bg-secondary border border-border-subtle overflow-hidden flex-shrink-0">
                                                  {post.coverImage ? <img src={post.coverImage} className="w-full h-full object-cover" /> : <FileText size={18} className="m-auto text-text-secondary opacity-50" />}
                                              </div>
                                              <div>
                                                  <p className="text-sm font-bold text-text-primary group-hover:text-brand-red transition-colors capitalize">{post.title}</p>
                                                  <p className="text-[10px] text-text-secondary font-medium tracking-wide">/{post.slug}</p>
                                              </div>
                                          </div>
                                      </td>
                                      <td className="px-8 py-5">
                                          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${post.isPublished ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'}`}>
                                              {post.isPublished ? 'Live' : 'Draft'}
                                          </span>
                                      </td>
                                      <td className="px-8 py-5">
                                          <div className="flex items-center gap-2 text-text-secondary text-xs">
                                              <Activity size={14} /> 2.4k Reads
                                          </div>
                                      </td>
                                      <td className="px-8 py-5 text-right">
                                          <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                              <button onClick={() => togglePublish(post._id, post.isPublished)} className="p-2.5 bg-bg-secondary rounded-lg border border-border-subtle hover:text-brand-red transition-colors" title={post.isPublished ? 'Unpublish' : 'Publish'}>
                                                  {post.isPublished ? <EyeOff size={16} /> : <Eye size={16} />}
                                              </button>
                                              <button className="p-2.5 bg-bg-secondary rounded-lg border border-border-subtle hover:text-brand-red transition-colors">
                                                  <Edit size={16} />
                                              </button>
                                              <button onClick={() => deleteItem('blog', post._id)} className="p-2.5 bg-bg-secondary rounded-lg border border-border-subtle hover:bg-brand-red/10 hover:text-brand-red hover:border-brand-red/30 transition-colors">
                                                  <Trash2 size={16} />
                                              </button>
                                          </div>
                                      </td>
                                  </tr>
                              ))}
                          </tbody>
                      </table>
                      {data.insights.length === 0 && <div className="p-20 text-center text-text-secondary font-medium">No results found in node.</div>}
                  </div>
              </div>
           )}

           {/* Careers Tab */}
           {activeTab === 'careers' && (
              <div className="max-w-7xl mx-auto animate-in fade-in duration-500">
                  <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12">
                      <div>
                          <h1 className="text-4xl font-black tracking-tight">Active <span className="text-gradient">Positions</span></h1>
                          <p className="text-text-secondary mt-1">Manage global recruitment and engineering pipeline</p>
                      </div>
                      <button onClick={() => { setShowModal(true); setModalType('job'); }} className="flex items-center gap-3 px-8 py-4 bg-brand-red text-white font-bold rounded-2xl shadow-xl shadow-brand-red/30 hover:scale-[1.02] active:scale-95 transition-all">
                          <Plus size={20} /> New Job
                      </button>
                  </header>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {data.jobs.length === 0 ? <div className="col-span-full py-20 bg-bg-secondary rounded-3xl border border-border-subtle text-center text-text-secondary">No active job listings found.</div> : 
                        data.jobs.map(job => (
                          <div key={job._id} className="glass p-8 rounded-3xl border border-border-subtle group hover:border-brand-red/30 transition-all flex justify-between items-start">
                              <div>
                                  <div className="flex items-center gap-3 mb-4">
                                      <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest ${job.active ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                                          {job.active ? 'Accepting Applications' : 'Closed'}
                                      </span>
                                      <span className="text-[10px] text-text-secondary font-bold uppercase tracking-widest opacity-50">{job.team}</span>
                                  </div>
                                  <h3 className="text-xl font-bold mb-2 group-hover:text-brand-red transition-colors">{job.title}</h3>
                                  <div className="flex items-center gap-2 text-text-secondary text-sm font-medium">
                                      <Globe size={14} /> {job.location} · {job.type}
                                  </div>
                              </div>
                              <div className="flex gap-2">
                                  <button onClick={() => deleteItem('careers', job._id)} className="p-3 bg-bg-secondary rounded-xl border border-border-subtle hover:text-brand-red transition-all">
                                      <Trash2 size={18} />
                                  </button>
                              </div>
                          </div>
                      ))}
                  </div>
              </div>
           )}

           {/* Messages Tab */}
           {activeTab === 'messages' && (
              <div className="max-w-5xl mx-auto animate-in fade-in duration-500">
                   <header className="mb-12">
                      <h1 className="text-4xl font-black tracking-tight">Lead <span className="text-gradient">Communications</span></h1>
                      <p className="text-text-secondary mt-1">Direct inquiries from the Global Digital Interface</p>
                  </header>

                  <div className="space-y-4">
                      {data.messages.length === 0 ? <div className="py-20 text-center text-text-secondary glass rounded-3xl border border-border-subtle">Inbox Zero.</div> : 
                        data.messages.map(msg => (
                          <div key={msg._id} className="glass p-8 rounded-2xl border border-border-subtle relative group overflow-hidden">
                              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <button onClick={() => deleteItem('contact', msg._id)} className="p-2 text-text-secondary hover:text-brand-red transition-colors">
                                      <Trash2 size={18} />
                                  </button>
                              </div>
                              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                                  <div className="flex items-center gap-4">
                                      <div className="w-12 h-12 bg-bg-secondary rounded-xl border border-border-subtle flex items-center justify-center font-black text-brand-red">
                                          {msg.name.charAt(0)}
                                      </div>
                                      <div>
                                          <h4 className="font-bold text-text-primary text-lg">{msg.name}</h4>
                                          <p className="text-xs text-brand-red font-medium tracking-wide leading-none">{msg.email} {msg.company && <span className="text-text-secondary ml-1 lowercase">· {msg.company}</span>}</p>
                                      </div>
                                  </div>
                                  <span className="text-[10px] font-bold text-text-secondary uppercase tracking-[0.2em]">{new Date(msg.createdAt).toLocaleDateString()}</span>
                              </div>
                              <p className="text-text-secondary text-sm leading-relaxed border-l-2 border-brand-red/10 pl-6 py-2 bg-bg-secondary/20 rounded-r-xl">
                                  {msg.message}
                              </p>
                          </div>
                      ))}
                  </div>
              </div>
           )}

           {/* Testimonials Tab */}
           {activeTab === 'testimonials' && (
              <div className="max-w-7xl mx-auto animate-in fade-in duration-500">
                  <header className="mb-12">
                      <h1 className="text-4xl font-black tracking-tight">Customer <span className="text-gradient">Reviews</span></h1>
                      <p className="text-text-secondary mt-1">Manage testimonials and client feedback</p>
                  </header>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {data.testimonials.length === 0 ? (
                          <div className="col-span-full py-20 bg-bg-secondary rounded-3xl border border-border-subtle text-center text-text-secondary">
                              No testimonials found.
                          </div>
                      ) : (
                          data.testimonials.map(testimonial => (
                              <div key={testimonial._id} className="glass p-8 rounded-3xl border border-border-subtle relative group">
                                  <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                      <button onClick={() => deleteItem('testimonials', testimonial._id)} className="p-2 text-text-secondary hover:text-brand-red transition-colors">
                                          <Trash2 size={18} />
                                      </button>
                                  </div>
                                  <div className="flex items-center gap-4 mb-6">
                                      <div className="w-12 h-12 rounded-full bg-bg-secondary flex items-center justify-center font-black text-brand-red">
                                          {(testimonial.author || 'U').charAt(0)}
                                      </div>
                                      <div>
                                          <h4 className="font-bold text-text-primary">{testimonial.author || 'Anonymous'}</h4>
                                          <p className="text-xs text-text-secondary">{testimonial.role || 'Client'}</p>
                                      </div>
                                  </div>
                                  <div className="flex gap-1 mb-4 text-yellow-400">
                                      {[...Array(testimonial.rating || 5)].map((_, i) => (
                                          <span key={i}>★</span>
                                      ))}
                                  </div>
                                  <p className="text-text-secondary text-sm leading-relaxed">\"{testimonial.message}\"</p>
                              </div>
                          ))
                      )}
                  </div>
              </div>
           )}

           {/* Placeholder for settings */}
           {activeTab === 'settings' && (
              <div className="max-w-5xl mx-auto py-20 text-center glass rounded-3xl border border-border-subtle animate-in zoom-in-95 duration-500">
                  <Activity size={48} className="text-brand-red mx-auto mb-6" />
                  <h2 className="text-2xl font-black mb-2 tracking-tight">Tactical Maintenance</h2>
                  <p className="text-text-secondary">Settings module is temporarily locked for backend synchronization.</p>
              </div>
           )}

        </main>
      </div>

      {/* Modal */}
      {showModal && modalType === 'job' && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4 sm:p-6">
          <div className="glass max-w-2xl w-full max-h-[85vh] sm:max-h-[80vh] p-4 sm:p-6 rounded-3xl border border-border-subtle relative flex flex-col">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0 mb-6 sm:mb-8 flex-shrink-0">
              <h2 className="text-xl sm:text-2xl font-black">Create New Position</h2>
              <button onClick={() => { setShowModal(false); setModalType(null); }} className="p-2 hover:bg-bg-secondary rounded-xl transition-colors self-end sm:self-auto">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={createJob} className="flex flex-col flex-grow overflow-hidden min-h-0">
              <div className="overflow-y-auto flex-grow space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-text-secondary mb-2">Job Title</label>
                    <input
                      type="text"
                      value={newJob.title}
                      onChange={(e) => setNewJob({...newJob, title: e.target.value})}
                      className="w-full px-4 py-3 bg-bg-secondary border border-border-subtle rounded-xl focus:border-brand-red focus:outline-none transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-text-secondary mb-2">Team</label>
                    <input
                      type="text"
                      value={newJob.team}
                      onChange={(e) => setNewJob({...newJob, team: e.target.value})}
                      className="w-full px-4 py-3 bg-bg-secondary border border-border-subtle rounded-xl focus:border-brand-red focus:outline-none transition-colors"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-text-secondary mb-2">Description</label>
                  <textarea
                    value={newJob.description}
                    onChange={(e) => setNewJob({...newJob, description: e.target.value})}
                    className="w-full px-4 py-3 bg-bg-secondary border border-border-subtle rounded-xl focus:border-brand-red focus:outline-none transition-colors h-20 sm:h-24 resize-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-text-secondary mb-2">Requirements (comma-separated)</label>
                  <input
                    type="text"
                    value={newJob.requirements}
                    onChange={(e) => setNewJob({...newJob, requirements: e.target.value})}
                    className="w-full px-4 py-3 bg-bg-secondary border border-border-subtle rounded-xl focus:border-brand-red focus:outline-none transition-colors"
                    placeholder="e.g. React, Node.js, 3+ years experience"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-text-secondary mb-2">Location</label>
                    <input
                      type="text"
                      value={newJob.location}
                      onChange={(e) => setNewJob({...newJob, location: e.target.value})}
                      className="w-full px-4 py-3 bg-bg-secondary border border-border-subtle rounded-xl focus:border-brand-red focus:outline-none transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-text-secondary mb-2">Type</label>
                    <select
                      value={newJob.type}
                      onChange={(e) => setNewJob({...newJob, type: e.target.value})}
                      className="w-full px-4 py-3 bg-bg-secondary border border-border-subtle rounded-xl focus:border-brand-red focus:outline-none transition-colors"
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-text-secondary mb-2">Status</label>
                    <select
                      value={newJob.active}
                      onChange={(e) => setNewJob({...newJob, active: e.target.value === 'true'})}
                      className="w-full px-4 py-3 bg-bg-secondary border border-border-subtle rounded-xl focus:border-brand-red focus:outline-none transition-colors"
                    >
                      <option value={true}>Active</option>
                      <option value={false}>Inactive</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-4 pt-4 sm:pt-6 border-t border-border-subtle flex-shrink-0 mt-4">
                <button
                  type="button"
                  onClick={() => { setShowModal(false); setModalType(null); }}
                  className="px-4 sm:px-6 py-2 sm:py-3 text-text-secondary hover:text-text-primary transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 sm:px-8 py-2 sm:py-3 bg-brand-red text-white font-bold rounded-xl hover:scale-105 active:scale-95 transition-all"
                >
                  Create Position
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create Post Modal */}
      {showModal && modalType === 'post' && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4 sm:p-6">
          <div className="glass max-w-2xl w-full max-h-[85vh] sm:max-h-[80vh] p-4 sm:p-6 rounded-3xl border border-border-subtle relative flex flex-col">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0 mb-6 sm:mb-8 flex-shrink-0">
              <h2 className="text-xl sm:text-2xl font-black">Create New Article</h2>
              <button onClick={() => { setShowModal(false); setModalType(null); }} className="p-2 hover:bg-bg-secondary rounded-xl transition-colors self-end sm:self-auto">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={createPost} className="flex flex-col flex-grow overflow-hidden min-h-0">
              <div className="overflow-y-auto flex-grow space-y-4 sm:space-y-6">
                <div>
                  <label className="block text-sm font-bold text-text-secondary mb-2">Article Title</label>
                  <input
                    type="text"
                    value={newPost.title}
                    onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                    className="w-full px-4 py-3 bg-bg-secondary border border-border-subtle rounded-xl focus:border-brand-red focus:outline-none transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-text-secondary mb-2">URL Slug</label>
                  <input
                    type="text"
                    value={newPost.slug}
                    onChange={(e) => setNewPost({...newPost, slug: e.target.value})}
                    className="w-full px-4 py-3 bg-bg-secondary border border-border-subtle rounded-xl focus:border-brand-red focus:outline-none transition-colors"
                    placeholder="e.g. article-title"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-text-secondary mb-2">Excerpt</label>
                  <textarea
                    value={newPost.excerpt}
                    onChange={(e) => setNewPost({...newPost, excerpt: e.target.value})}
                    className="w-full px-4 py-3 bg-bg-secondary border border-border-subtle rounded-xl focus:border-brand-red focus:outline-none transition-colors h-16 sm:h-20 resize-none"
                    placeholder="Brief summary of the article"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-text-secondary mb-2">Content</label>
                  <textarea
                    value={newPost.content}
                    onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                    className="w-full px-4 py-3 bg-bg-secondary border border-border-subtle rounded-xl focus:border-brand-red focus:outline-none transition-colors h-24 sm:h-32 resize-none"
                    required
                  />
                </div>
                <div>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newPost.isPublished}
                      onChange={(e) => setNewPost({...newPost, isPublished: e.target.checked})}
                      className="w-5 h-5"
                    />
                    <span className="text-sm font-bold text-text-secondary">Publish immediately</span>
                  </label>
                </div>
              </div>
              <div className="flex justify-end gap-4 pt-4 sm:pt-6 border-t border-border-subtle flex-shrink-0 mt-4">
                <button
                  type="button"
                  onClick={() => { setShowModal(false); setModalType(null); }}
                  className="px-4 sm:px-6 py-2 sm:py-3 text-text-secondary hover:text-text-primary transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 sm:px-8 py-2 sm:py-3 bg-brand-red text-white font-bold rounded-xl hover:scale-105 active:scale-95 transition-all"
                >
                  Create Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {actionLoading && (
          <div className="fixed bottom-10 right-10 flex items-center gap-3 px-6 py-3 glass rounded-full border border-border-subtle shadow-2xl z-[100] animate-bounce">
              <Activity className="animate-spin text-brand-red" size={16} />
              <span className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Executing operation...</span>
          </div>
      )}
    </div>
  );
};

export default AdminDashboard;
