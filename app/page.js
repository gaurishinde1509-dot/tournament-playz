"use client";
import { useState, useEffect } from 'react';

export default function TournamentHome() {
  const [tournament, setTournament] = useState({
    title: "BGMI Ultimate Showdown",
    date: "July 25, 2026",
    time: "7:00 PM IST",
    prize: "₹5,000",
    slots: 20
  });

  const [registrations, setRegistrations] = useState([]);
  const [formData, setFormData] = useState({ teamName: '', leaderName: '', contact: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem('tournament-playz_data');
    if (savedData) setTournament(JSON.parse(savedData));

    const savedRegs = localStorage.getItem('playz_registrations');
    if (savedRegs) setRegistrations(JSON.parse(savedRegs));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.teamName || !formData.leaderName || !formData.contact) return;

    const newReg = {
      id: Date.now(),
      ...formData,
      status: 'Pending'
    };

    const updatedRegs = [...registrations, newReg];
    setRegistrations(updatedRegs);
    localStorage.setItem('playz_registrations', JSON.stringify(updatedRegs));
    
    setSubmitted(true);
    setFormData({ teamName: '', leaderName: '', contact: '' });
    setTimeout(() => setSubmitted(false), 4000);
  };

  const approvedTeams = registrations.filter(r => r.status === 'Approved');

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-cyan-500 selection:text-slate-900">
      <header className="border-b border-slate-800 bg-slate-950/50 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            TOURNAMENT PLAYZ
          </h1>
          <span className="px-3 py-1 text-xs font-bold uppercase tracking-widest bg-cyan-500/10 text-cyan-400 rounded-full border border-cyan-500/20">
            Live Platform
          </span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
            <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase">Upcoming Event</span>
            <h2 className="text-4xl font-extrabold tracking-tight mt-2 mb-6">{tournament.title}</h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-700/50">
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wider">Date</p>
                <p className="font-semibold text-slate-200 mt-0.5">{tournament.date}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wider">Time</p>
                <p className="font-semibold text-slate-200 mt-0.5">{tournament.time}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wider">Prize Pool</p>
                <p className="font-bold text-emerald-400 mt-0.5">{tournament.prize}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wider">Slots Left</p>
                <p className="font-semibold text-cyan-400 mt-0.5">
                  {Math.max(0, tournament.slots - approvedTeams.length)} / {tournament.slots}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-950/40 border border-slate-800">
            <h3 className="text-lg font-bold mb-4 tracking-wide flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Confirmed Squads ({approvedTeams.length})
            </h3>
            {approvedTeams.length === 0 ? (
              <p className="text-sm text-slate-500 py-4 text-center border border-dashed border-slate-800 rounded-xl">
                No teams approved yet. Be the first to secure a slot!
              </p>
            ) : (
              <div className="grid sm:grid-cols-2 gap-3">
                {approvedTeams.map((team, index) => (
                  <div key={team.id} className="p-3 bg-slate-800/60 border border-slate-700/40 rounded-xl flex items-center gap-3">
                    <span className="font-mono text-xs text-slate-500 w-5">#{index + 1}</span>
                    <div>
                      <h4 className="font-bold text-slate-200 text-sm">{team.teamName}</h4>
                      <p className="text-xs text-slate-400">Leader: {team.leaderName}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="md:col-span-1">
          <div className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800 sticky top-8 shadow-2xl">
            <h3 className="text-xl font-bold mb-1">Squad Registration</h3>
            <p className="text-xs text-slate-400 mb-6">Fill in details correctly to lock your entry.</p>

            {submitted ? (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-sm font-medium text-center py-8 animate-fade-in">
                🎉 Registration Submitted!<br />
                <span className="text-xs text-slate-400 mt-1 block">Waiting for Admin approval.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Team Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Soul Triggers"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                    value={formData.teamName}
                    onChange={(e) => setFormData({...formData, teamName: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">In-Game Leader (IGL)</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., MortalOP"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                    value={formData.leaderName}
                    onChange={(e) => setFormData({...formData, leaderName: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">WhatsApp / Contact No.</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g., +91 98765 43210"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                    value={formData.contact}
                    onChange={(e) => setFormData({...formData, contact: e.target.value})}
                  />
                </div>
                <button
                  type="submit"
                  disabled={approvedTeams.length >= tournament.slots}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold py-3 px-4 rounded-xl text-sm uppercase tracking-wider shadow-lg shadow-cyan-500/10 transition-all mt-2"
                >
                  {approvedTeams.length >= tournament.slots ? 'Slots Full' : 'Submit Registration'}
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
