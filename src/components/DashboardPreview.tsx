import { useState } from 'react';
import { QueueItem } from '../types';
import { Play, Check, X, Shield, Activity, Sparkles, AlertCircle, TrendingUp, Users, Clock, DollarSign } from 'lucide-react';

interface DashboardPreviewProps {
  queue: QueueItem[];
  onUpdateStatus: (id: string, status: QueueItem['status']) => void;
}

export default function DashboardPreview({ queue, onUpdateStatus }: DashboardPreviewProps) {
  const [selectedPatient, setSelectedPatient] = useState<QueueItem | null>(queue[0] || null);

  // Summarize clinic metrics based on queue state
  const totalRevenue = queue
    .filter(q => q.status === 'completed' || q.status === 'called')
    .reduce((sum, q) => sum + (q.doctorName.includes('Dental') ? 300 : q.doctorName.includes('Skin') ? 400 : 200), 0);

  const waitingCount = queue.filter(q => q.status === 'waiting').length;
  const completedCount = queue.filter(q => q.status === 'completed').length;

  // Render a mock clinical warning severity color
  const getSeverityBadge = (complaint: string) => {
    const text = complaint.toLowerCase();
    if (text.includes('chest') || text.includes('severe') || text.includes('bleeding')) {
      return <span className="bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wide">High Severity</span>;
    }
    if (text.includes('toothache') || text.includes('fever') || text.includes('pain')) {
      return <span className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wide">Medium Severity</span>;
    }
    return <span className="bg-neutral-500/10 text-neutral-600 dark:text-neutral-400 border border-neutral-500/20 px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wide">Low Severity</span>;
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
      {/* Upper header */}
      <div className="mb-12 text-center">
        <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block mb-2">// Clinic Control Room Sandbox</span>
        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-black">THRYVIX Health Portal</h2>
        <p className="text-sm text-black/60 max-w-lg mx-auto mt-3 leading-relaxed">
          Experience the central command center clinic owners and doctors use to coordinate patient queues, read AI-generated briefs, and review revenue reports.
        </p>
      </div>

      {/* Analytics Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <div className="bg-white border border-black/5 p-5 rounded-2xl flex items-center gap-4 shadow-[0_8px_30px_rgba(0,0,0,0.01)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.03)] transition-all">
          <div className="p-3 bg-neutral-900 text-white rounded-xl">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-bold">Consultation Revenue</div>
            <div className="text-xl font-bold font-mono text-black">₹{totalRevenue}</div>
          </div>
        </div>

        <div className="bg-white border border-black/5 p-5 rounded-2xl flex items-center gap-4 shadow-[0_8px_30px_rgba(0,0,0,0.01)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.03)] transition-all">
          <div className="p-3 bg-neutral-900 text-white rounded-xl">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-bold">Patients Waiting</div>
            <div className="text-xl font-bold font-mono text-black">{waitingCount}</div>
          </div>
        </div>

        <div className="bg-white border border-black/5 p-5 rounded-2xl flex items-center gap-4 shadow-[0_8px_30px_rgba(0,0,0,0.01)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.03)] transition-all">
          <div className="p-3 bg-neutral-900 text-white rounded-xl">
            <Check className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-bold">Consults Completed</div>
            <div className="text-xl font-bold font-mono text-black">{completedCount}</div>
          </div>
        </div>

        <div className="bg-white border border-black/5 p-5 rounded-2xl flex items-center gap-4 shadow-[0_8px_30px_rgba(0,0,0,0.01)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.03)] transition-all">
          <div className="p-3 bg-neutral-900 text-white rounded-xl">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-bold">Average Wait Time</div>
            <div className="text-xl font-bold font-mono text-black">12 Mins</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Live Queue Table */}
        <div className="lg:col-span-7 bg-white border border-black/5 rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.02)]">
          <div className="px-6 py-5 border-b border-black/5 flex justify-between items-center bg-white">
            <h3 className="font-bold text-sm text-black font-mono tracking-wider uppercase">Live Patient Queue</h3>
            <span className="text-[10px] font-mono bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-full uppercase tracking-widest font-semibold">
              Live Feed
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-black/5 bg-neutral-50/50 text-neutral-400 font-mono uppercase text-[9px] tracking-widest font-bold">
                  <th className="p-4">Patient</th>
                  <th className="p-4">Doctor</th>
                  <th className="p-4">Slot</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {queue.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-neutral-400 font-mono tracking-wide uppercase">
                      No patients in queue. Book some on Patient Simulator!
                    </td>
                  </tr>
                ) : (
                  queue.map((item) => (
                    <tr
                      key={item.id}
                      onClick={() => setSelectedPatient(item)}
                      className={`cursor-pointer hover:bg-neutral-50/50 transition-colors ${
                        selectedPatient?.id === item.id ? 'bg-neutral-50/70' : ''
                      }`}
                    >
                      <td className="p-4">
                        <div className="font-bold text-black">{item.patientName}</div>
                        <div className="text-[10px] text-neutral-400 font-mono mt-0.5">{item.patientPhone}</div>
                      </td>
                      <td className="p-4">
                        <div className="font-semibold text-black/85">{item.doctorName}</div>
                        <div className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest">
                          Lang: {item.language}
                        </div>
                      </td>
                      <td className="p-4 font-mono text-neutral-600">{item.timeSlot}</td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wider ${
                            item.status === 'completed'
                              ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20'
                              : item.status === 'called'
                              ? 'bg-amber-500/10 text-amber-600 border border-amber-500/20 animate-pulse'
                              : item.status === 'cancelled'
                              ? 'bg-red-500/10 text-red-600 border border-red-500/20'
                              : 'bg-blue-500/10 text-blue-600 border border-blue-500/20'
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="p-4 text-right space-x-1.5" onClick={(e) => e.stopPropagation()}>
                        {item.status === 'waiting' && (
                          <button
                            onClick={() => {
                              onUpdateStatus(item.id, 'called');
                              if (selectedPatient?.id === item.id) {
                                setSelectedPatient({ ...selectedPatient, status: 'called' });
                              }
                            }}
                            className="min-w-11 min-h-11 flex items-center justify-center rounded-lg bg-black text-white hover:bg-neutral-800 transition-colors"
                            title="Call Patient"
                          >
                            <Play className="w-3.5 h-3.5 fill-current" />
                          </button>
                        )}
                        {(item.status === 'waiting' || item.status === 'called') && (
                          <button
                            onClick={() => {
                              onUpdateStatus(item.id, 'completed');
                              if (selectedPatient?.id === item.id) {
                                setSelectedPatient({ ...selectedPatient, status: 'completed' });
                              }
                            }}
                            className="min-w-11 min-h-11 flex items-center justify-center rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
                            title="Complete Consultation"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                        )}
                        {item.status === 'waiting' && (
                          <button
                            onClick={() => {
                              onUpdateStatus(item.id, 'cancelled');
                              if (selectedPatient?.id === item.id) {
                                setSelectedPatient({ ...selectedPatient, status: 'cancelled' });
                              }
                            }}
                            className="min-w-11 min-h-11 flex items-center justify-center rounded-lg border border-black/5 text-neutral-400 hover:text-red-600 hover:border-red-600/25 transition-colors"
                            title="Cancel Appointment"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Side: Interactive AI Doctor Brief Preview */}
        <div className="lg:col-span-5 bg-white border border-black/5 rounded-2xl p-6 relative shadow-[0_8px_30px_rgba(0,0,0,0.02)]">
          <div className="flex items-center gap-2 border-b pb-4 border-black/5">
            <Sparkles className="w-4 h-4 text-black" />
            <h3 className="font-bold text-sm text-black font-mono tracking-wider uppercase">
              AI Doctor Brief
            </h3>
          </div>

          {selectedPatient ? (
            <div className="space-y-6 pt-4 animate-in fade-in duration-200">
              {/* Header block info */}
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-base font-bold text-black">
                    {selectedPatient.patientName}
                  </h4>
                  <p className="text-xs text-neutral-400 font-mono mt-0.5">
                    ID: {selectedPatient.id} · {selectedPatient.patientPhone}
                  </p>
                </div>
                {getSeverityBadge(selectedPatient.complaint || '')}
              </div>

              {/* Summary card generated */}
              <div className="border p-4 bg-neutral-50/50 rounded-xl border-black/5 space-y-3">
                <div className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-widest text-neutral-400 font-bold">
                  <Activity className="w-3.5 h-3.5 text-black" />
                  Symptom Assessment
                </div>
                <div>
                  <div className="text-xs font-bold text-black/85">Active Complaint:</div>
                  <p className="text-xs text-black/60 mt-1">{selectedPatient.complaint}</p>
                </div>
                <div>
                  <div className="text-xs font-bold text-black/85">Severity Assessment:</div>
                  <p className="text-xs text-black/60 mt-1 leading-relaxed">
                    System predicted priority level based on Malayalam-first language mapping metrics.
                  </p>
                </div>
              </div>

              {/* History Block */}
              <div className="space-y-3">
                <h5 className="font-mono text-[9px] uppercase tracking-widest text-neutral-400 font-bold">
                  Patient Medical Dossier
                </h5>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-neutral-50/50 rounded-xl border border-black/5">
                    <div className="text-[10px] text-neutral-400 font-mono uppercase font-bold">Allergies</div>
                    <div className="text-xs font-semibold text-black/85 mt-1">
                      {selectedPatient.allergies}
                    </div>
                  </div>
                  <div className="p-3 bg-neutral-50/50 rounded-xl border border-black/5">
                    <div className="text-[10px] text-neutral-400 font-mono uppercase font-bold">Past History</div>
                    <div className="text-xs font-semibold text-black/85 mt-1">
                      {selectedPatient.history}
                    </div>
                  </div>
                </div>
              </div>

              {/* Checklist suggestion */}
              <div className="space-y-2">
                <h5 className="font-mono text-[9px] uppercase tracking-widest text-neutral-400 font-bold">
                  Recommended Doctor Checklist
                </h5>
                <ul className="text-xs text-black/60 space-y-2 pl-4 list-disc leading-relaxed">
                  <li>Verify patient identity with Health ID docket.</li>
                  <li>Inquire about the duration of {selectedPatient.complaint}.</li>
                  <li>Confirm whether patient has taken self-prescribed medication over the counter.</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center opacity-40 select-none">
              <AlertCircle className="w-10 h-10 text-neutral-400 mb-2 animate-pulse" />
              <p className="text-xs font-mono uppercase tracking-widest text-neutral-500">
                Select patient to view brief
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
