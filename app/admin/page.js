"use client";
import { useState, useEffect } from 'react';

export default function AdminPanel() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('registrations');
  const [tournament, setTournament] = useState({
    title: "BGMI Ultimate Showdown",
    date: "July 25, 2026",
    time: "7:00 PM IST",
    prize: "₹5,000",
    slots: 20
  });
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    const savedData = localStorage.getItem('tournament-playz_data');
    if (savedData) setTournament(JSON.parse(savedData));

    const savedRegs = localStorage.getItem('playz_registrations');
    if (savedRegs) setRegistrations(JSON.parse(savedRegs));
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') {
      setAuthenticated(true);
    } else {
      alert('Incorrect passcode!');
    }
  };

  const updateTournament = (e) => {
    e.preventDefault();
    localStorage.setItem('tournament-playz_data', JSON.stringify(tournament));
    alert('Tournament settings updated successfully!');
  };

  const updateStatus = (id, newStatus) => {
    const updated = registrations.map(reg => 
      reg.id === id ? { ...reg, status: newStatus } : reg
    );
    setRegistrations(updated);
    localStorage.setItem('playz_registrations', JSON.stringify(updated));
  };

  const deleteRegistration = (id) => {
    if (!confirm('Are you sure you want to delete this registration?')) return;
    const updated = registrations.filter(reg => reg.id !== id);
    setRegistrations(updated);
    localStorage.setItem('playz_registrations', JSON.stringify(updated));
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4">
        <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 w-full max-w-md shadow-2xl">
          <h2 className="text-2xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-2 uppercase">
            Admin Access
          </h2>
          <p className="text-xs text-slate-400 mb-6">Enter the dashboard passcode to manage Tournaments.</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="Enter admin passcode"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-500 text-center tracking-widest font-bold text-cyan-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold py-3 rounded-xl text-sm uppercase tracking-wider shadow-lg transition-all"
            >
              Verify & Enter
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans">
      {/* Top Header */}
      <header className="border-b border-slate-800 bg-slate-950 px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-xl font-black tracking-wider text-cyan-400 uppercase">
          Playz Dashboard
        </h1>
        <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 text-sm">
          <button 
            className={`px-4 py-1.5 rounded-lg font-medium transition-colors ${activeTab === 'registrations' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
            onClick={() => setActiveTab('registrations')}
          >
            Registrations ({registrations.length})
          </button>
          <button 
            className={`px-4 py-1.5 rounded-lg font-medium transition-colors ${activeTab === 'settings' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
            onClick={() => setActiveTab('settings')}
          >
            Event Control
          </button>
        </div>
      </header>

      {/* Main Panel Content */}
      <main className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        {activeTab === 'settings' ? (
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 max-w-xl mx-auto shadow-xl">
            <h3 className="text-lg font-bold mb-1">Modify Tournament Details</h3>
            <p className="text-xs text-slate-400 mb-6">Changes update the player registration page instantly.</p>
            
            <form onSubmit={updateTournament} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Game Title</label>
                <input
                  type="text"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-cyan-500"
                  value={tournament.title}
                  onChange={(e) => setTournament({...tournament, title: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Date</label>
                  <input
                    type="text"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-cyan-500"
                    value={tournament.date}
                    onChange={(e) => setTournament({...tournament, date: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Time</label>
                  <input
                    type="text"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-cyan-500"
                    value={tournament.time}
                    onChange={(e) => setTournament({...tournament, time: e.target.value})}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Prize Pool</label>
                  <input
                    type="text"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-cyan-500"
                    value={tournament.prize}
                    onChange={(e) => setTournament({...tournament, prize: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Total Slots Available</label>
                  <input
                    type="number"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-cyan-500"
                    value={tournament.slots}
                    onChange={(e) => setTournament({...tournament, slots: parseInt(e.target.value) || 0})}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 rounded-xl text-sm uppercase tracking-wider shadow-lg transition-colors mt-4"
              >
                Save Settings
              </button>
            </form>
          </div>
        ) : (
          <div className="space-y-4">
            <h3 className="text-xl font-bold tracking-tight">Active Team Registrations</h3>
            {registrations.length === 0 ? (
              <div className="text-center py-16 bg-slate-950/40 border border-dashed border-slate-800 rounded-2xl text-slate-500">
                No teams have registered yet. Share your app link with teams!
              </div>
            ) : (
              <div className="grid gap-4">
                {registrations.map((reg) => (
                  <div key={reg.id} className="p-5 bg-slate-950 border border-slate-800 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-all hover:border-slate-700/60">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <h4 className="text-lg font-black text-slate-100">{reg.teamName}</h4>
                        <span className={`px-2.5 py-0.5 text-xs font-bold rounded-full border ${
                          reg.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                          reg.status === 'Rejected' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' :
                          'bg-amber-500/10 text-amber-400 border-amber-500/20'
                        }`}>
                          {reg.status}
                        </span>
                      </div>
                      <p className="text-sm text-slate-300">Leader: <span className="font-semibold text-slate-100">{reg.leaderName}</span></p>
                      <p className="text-xs text-slate-500 font-mono">Contact: {reg.contact}</p>
                    </div>

                    <div className="flex flex-wrap gap-2 w-full md:w-auto border-t md:border-t-0 pt-3 md:pt-0 border-slate-800">
                      {reg.status !== 'Approved' && (
                        <button 
                          onClick={() => updateStatus(reg.id, 'Approved')}
                          className="flex-1 md:flex-none bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-slate-950 border border-emerald-500/20 font-bold px-4 py-2 rounded-xl text-xs uppercase tracking-wider transition-all"
                        >
                          Approve
                        </button>
                      )}
                      {reg.status !== 'Rejected' && (
                        <button 
                          onClick={() => updateStatus(reg.id, 'Rejected')}
                          className="flex-1 md:flex-none bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-slate-950 border border-rose-500/20 font-bold px-4 py-2 rounded-xl text-xs uppercase tracking-wider transition-all"
                        >
                          Reject
                        </button>
                      )}
                      <button 
                        onClick={() => deleteRegistration(reg.id)}
                        className="p-2 bg-slate-900 hover:bg-rose-950/40 text-slate-400 hover:text-rose-400 border border-slate-800 hover:border-rose-900/50 rounded-xl transition-all"
                        title="Delete Permanently"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
