import React, { useState } from 'react';
import './App.css';
import * as Ic from './components/Icons.jsx';
import EmployeesPage from './components/EmployeesPage.jsx';
import LeavesPage from './components/LeavesPage.jsx';

/* ═══════════════════════════════════════
   DATA
═══════════════════════════════════════ */
const guards = [
  { id: 'G-001', name: 'Ramesh Kumar',   post: 'Gate A · Block 1',   shift: 'Morning', status: 'active', color: '#E53935', initials: 'RK', checkin: '05:58 AM', site: 'Industrial Zone A' },
  { id: 'G-002', name: 'Suresh Yadav',   post: 'Main Entrance',       shift: 'Morning', status: 'active', color: '#1E88E5', initials: 'SY', checkin: '06:05 AM', site: 'Industrial Zone A' },
  { id: 'G-003', name: 'Mohan Singh',    post: 'Parking Zone B',      shift: 'Morning', status: 'break',  color: '#43A047', initials: 'MS', checkin: '06:01 AM', site: 'Corporate Tower B' },
  { id: 'G-004', name: 'Deepak Verma',   post: 'Server Room · B2',    shift: 'Morning', status: 'alert',  color: '#8E24AA', initials: 'DV', checkin: '06:10 AM', site: 'Warehouse Complex' },
  { id: 'G-005', name: 'Anil Sharma',    post: 'Roof Top',            shift: 'Morning', status: 'active', color: '#FB8C00', initials: 'AS', checkin: '06:00 AM', site: 'Industrial Zone A' },
  { id: 'G-006', name: 'Vikas Gupta',    post: 'Emergency Exit E',    shift: 'Evening', status: 'active', color: '#00897B', initials: 'VG', checkin: '02:00 PM', site: 'Retail Park C'     },
  { id: 'G-007', name: 'Sanjay Tiwari',  post: 'Control Room',        shift: 'Night',   status: 'active', color: '#5C6BC0', initials: 'ST', checkin: '10:02 PM', site: 'Hotel Residence'   },
];

const incidents = [
  { id: 'INC-001', title: 'Unauthorized Entry Attempt', time: '08:32 AM', site: 'Gate B', severity: 'red',    sLabel: 'High',   status: 'open',     desc: 'Unknown individual tried to enter Gate B without badge.' },
  { id: 'INC-002', title: 'Suspicious Package Found',   time: '10:15 AM', site: 'Parking A', severity: 'red',    sLabel: 'High',   status: 'open',     desc: 'Unattended bag found near Parking Zone A.' },
  { id: 'INC-003', title: 'Guard Off-Route Alert',      time: '11:45 AM', site: 'Sector 3', severity: 'orange', sLabel: 'Medium', status: 'resolved', desc: 'Guard deviated from assigned patrol route for 8 minutes.' },
  { id: 'INC-004', title: 'CCTV Offline – Sector 3',    time: '01:20 PM', site: 'East Wing', severity: 'orange', sLabel: 'Medium', status: 'resolved', desc: 'Camera feed from Sector 3 went offline.' },
  { id: 'INC-005', title: 'Fire Alarm Triggered',       time: '03:05 PM', site: 'B-Wing', severity: 'blue',   sLabel: 'Info',   status: 'closed',   desc: 'Fire alarm in B-Wing cafeteria. False alarm.' },
];

const sites = [
  { Icon: Ic.Building,     name: 'Industrial Zone A', loc: 'Sector 12, North', guards: 8, incidents: 1, patrols: 3, status: 'active', bg: '#E8F5E9' },
  { Icon: Ic.Building,     name: 'Corporate Tower B', loc: 'CBD District',     guards: 5, incidents: 0, patrols: 2, status: 'active', bg: '#E3F2FD' },
  { Icon: Ic.Package,      name: 'Warehouse Complex', loc: 'Industrial Area',  guards: 6, incidents: 2, patrols: 2, status: 'alert',  bg: '#FFEBEE' },
  { Icon: Ic.ShoppingBag,  name: 'Retail Park C',     loc: 'Downtown',         guards: 3, incidents: 0, patrols: 1, status: 'active', bg: '#F3E5F5' },
  { Icon: Ic.Hotel,        name: 'Hotel Residence',   loc: 'City Center',      guards: 4, incidents: 0, patrols: 2, status: 'active', bg: '#FFF3E0' },
  { Icon: Ic.Landmark,     name: 'Finance District',  loc: 'South Block',      guards: 7, incidents: 1, patrols: 3, status: 'active', bg: '#E0F2F1' },
];

const barData = [
  { day: 'Mon', val: 3 },{ day: 'Tue', val: 5 },{ day: 'Wed', val: 2 },
  { day: 'Thu', val: 7 },{ day: 'Fri', val: 4 },{ day: 'Sat', val: 1 },{ day: 'Sun', val: 0 },
];
const maxBar = Math.max(...barData.map(d => d.val));

const donutData = [
  { label: 'On Duty',   val: 18, pct: 72, color: '#43A047' },
  { label: 'On Break',  val: 4,  pct: 16, color: '#FB8C00' },
  { label: 'Alert',     val: 2,  pct: 8,  color: '#E53935' },
  { label: 'Off Duty',  val: 1,  pct: 4,  color: '#9CA3AF' },
];

const checkpoints = [
  { name: 'Main Gate',      time: '06:10 AM', status: 'done',    guard: 'Ramesh K.' },
  { name: 'Parking Zone A', time: '06:30 AM', status: 'done',    guard: 'Ramesh K.' },
  { name: 'Server Room B2', time: '06:50 AM', status: 'active',  guard: 'Ramesh K.' },
  { name: 'Roof Access',    time: '07:10 AM', status: 'pending', guard: 'Ramesh K.' },
  { name: 'Loading Bay',    time: '07:30 AM', status: 'pending', guard: 'Ramesh K.' },
];

const notifications = [
  { Icon: Ic.Zap,       bg: '#FFEBEE', title: 'SOS Alert — Gate B',       msg: 'Guard Deepak Verma triggered panic alert.',        time: '2m ago',  unread: true,  iconColor: '#E53935' },
  { Icon: Ic.AlertTriangle, bg: '#FFF3E0', title: 'Guard Off-Route Alert', msg: 'Ramesh Kumar deviated from patrol route by 200m.', time: '8m ago',  unread: true,  iconColor: '#FB8C00' },
  { Icon: Ic.MapPin,    bg: '#E3F2FD', title: 'Geofence Breach Detected', msg: 'Guard exited assigned zone — Sector 3.',           time: '15m ago', unread: true,  iconColor: '#1E88E5' },
  { Icon: Ic.CheckCircle, bg: '#E8F5E9', title: 'Shift Started — Morning', msg: 'Morning shift started. 8 guards now on duty.',    time: '2h ago',  unread: false, iconColor: '#43A047' },
  { Icon: Ic.FileText,  bg: '#F3E5F5', title: 'Weekly Report Ready',      msg: 'Incident & attendance report is ready for review.',time: '4h ago',  unread: false, iconColor: '#8E24AA' },
];

const shiftData = [
  { title: 'Morning', time: '06:00–14:00', guards: 8, site: 'Industrial Zone A', status: 'active'   },
  { title: 'Evening', time: '14:00–22:00', guards: 6, site: 'Corporate Tower B', status: 'upcoming' },
  { title: 'Night',   time: '22:00–06:00', guards: 5, site: 'Warehouse Complex', status: 'upcoming' },
];

const roles = [
  { name: 'Admin',      users: 2, desc: 'Full system access',          color: '#E53935' },
  { name: 'Supervisor', users: 5, desc: 'Manage guards & incidents',   color: '#1E88E5' },
  { name: 'Guard',      users: 24, desc: 'Field operations only',      color: '#43A047' },
  { name: 'Viewer',     users: 3, desc: 'Read-only access',            color: '#8E24AA' },
];

const navItems = [
  { id: 'dashboard',     Icon: Ic.Home,           label: 'Dashboard',       badge: null },
  { id: 'employees',     Icon: Ic.UserCheck,      label: 'Employees',       badge: 'New' },
  { id: 'guards',        Icon: Ic.Users,          label: 'Guard Tracking',  badge: '24' },
  { id: 'shifts',        Icon: Ic.Clock,          label: 'Shift Management',badge: null },
  { id: 'attendance',    Icon: Ic.ClipboardCheck, label: 'Attendance',      badge: null },
  { id: 'leaves',        Icon: Ic.FileText,       label: 'Leaves',          badge: '2' },
  { id: 'incidents',     Icon: Ic.AlertTriangle,  label: 'Incident Reports',badge: '5'  },
  { id: 'patrol',        Icon: Ic.Shield,         label: 'Route Patrol',    badge: null },
  { id: 'analytics',     Icon: Ic.BarChart,       label: 'Analytics',       badge: null },
  { id: 'notifications', Icon: Ic.Bell,           label: 'Notifications',   badge: '3'  },
  { id: 'sites',         Icon: Ic.Globe,          label: 'Multi-Site',      badge: null },
  { id: 'roles',         Icon: Ic.Key,            label: 'Role & Access',   badge: null },
  { id: 'settings',      Icon: Ic.Settings,       label: 'Settings',        badge: null },
];

/* ═══════════════════════════════════════
   PAGE META
═══════════════════════════════════════ */
const pageMeta = {
  dashboard:     { title: 'Dashboard',          sub: 'Watchmen Security Overview' },
  employees:     { title: 'Employees',          sub: 'Manage Staff Profiles' },
  guards:        { title: 'Guard Tracking',     sub: 'Live GPS & Status' },
  shifts:        { title: 'Shift Management',   sub: 'Duty Scheduling' },
  attendance:    { title: 'Attendance',         sub: 'QR & Biometric Check-In' },
  leaves:        { title: 'Leaves',             sub: 'Employee Leave Requests' },
  incidents:     { title: 'Incident Reports',   sub: 'Security Events' },
  patrol:        { title: 'Route Patrol',       sub: 'Live Monitoring' },
  analytics:     { title: 'Analytics',          sub: 'Reports & Insights' },
  notifications: { title: 'Notifications',      sub: 'Alerts & Updates' },
  sites:         { title: 'Multi-Site',         sub: 'All Locations' },
  roles:         { title: 'Role & Access',      sub: 'Permissions Management' },
  settings:      { title: 'Settings',           sub: 'System Configuration' },
};

/* ═══════════════════════════════════════
   SHARED LAYOUT COMPONENTS
═══════════════════════════════════════ */
const colorBg = { red: '#FFEBEE', green: '#E8F5E9', blue: '#E3F2FD', orange: '#FFF3E0', purple: '#F3E5F5', teal: '#E0F2F1' };
const colorFg = { red: '#E53935', green: '#43A047', blue: '#1E88E5', orange: '#FB8C00', purple: '#8E24AA', teal: '#00897B' };

function StatCard({ Icon, value, label, trend, trendDir, color }) {
  return (
    <div className={`stat-card sc-${color}`}>
      <div className="sc-top">
        <div className="sc-icon" style={{ background: colorBg[color] || '#F3E5F5' }}>
          {Icon && <Icon size={20} color={colorFg[color] || '#8E24AA'} />}
        </div>
        {trend && <div className={`sc-trend ${trendDir === 'up' ? 'trend-up' : 'trend-down'}`}>
          {trendDir === 'up'
            ? <Ic.TrendingUp size={12} style={{ marginRight: 2 }} />
            : <Ic.TrendingDown size={12} style={{ marginRight: 2 }} />}
          {trend}
        </div>}
      </div>
      <div className="sc-value">{value}</div>
      <div className="sc-label">{label}</div>
    </div>
  );
}

function Badge({ type = 'green', label }) {
  return <span className={`badge b-${type}`}>{label}</span>;
}

/* ═══════════════════════════════════════
   PAGE COMPONENTS
═══════════════════════════════════════ */

/* Dashboard Page */
function DashboardPage() {
  return (
    <div>
      {/* Stats */}
      <div className="stats-grid mb-24">
        <StatCard Icon={Ic.Users}         value="24" label="Active Guards"  trend="+2 today"   trendDir="up"   color="green"  />
        <StatCard Icon={Ic.AlertTriangle} value="5"  label="Incidents"      trend="+2 today"   trendDir="down" color="red"    />
        <StatCard Icon={Ic.Shield}        value="8"  label="Active Patrols" trend="On schedule" trendDir="up"   color="blue"   />
        <StatCard Icon={Ic.Globe}         value="6"  label="Total Sites"    trend="All online"  trendDir="up"   color="purple" />
      </div>

      <div className="grid-2 mb-24" style={{ gridTemplateColumns: '2fr 1fr' }}>
        {/* Guard Status Table */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">Live Guard Status</span>
            <span className="card-action">View All →</span>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Guard</th><th>Post</th><th>Site</th><th>Status</th><th>Check-in</th>
              </tr>
            </thead>
            <tbody>
              {guards.slice(0, 5).map((g, i) => (
                <tr key={i}>
                  <td>
                    <div className="guard-cell">
                      <div className="g-avatar" style={{ background: g.color }}>{g.initials}</div>
                      <div>
                        <div className="g-name">{g.name}</div>
                        <div className="g-id">{g.id}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ color: 'var(--text-sub)', fontSize: 12 }}>{g.post}</td>
                  <td style={{ fontSize: 12 }}>{g.site}</td>
                  <td>
                    <div className="status-cell">
                      <div className={`st-dot st-${g.status === 'active' ? 'green' : g.status === 'break' ? 'orange' : 'red'}`} />
                      <Badge type={g.status === 'active' ? 'green' : g.status === 'break' ? 'orange' : 'red'} label={g.status === 'active' ? 'On Duty' : g.status === 'break' ? 'Break' : 'Alert'} />
                    </div>
                  </td>
                  <td style={{ fontSize: 12, color: 'var(--text-sub)' }}>{g.checkin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recent Alerts */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">Recent Alerts</span>
            <span className="card-action">All →</span>
          </div>
          {notifications.slice(0, 4).map((n, i) => (
            <div className="notif-list-item" key={i} style={n.unread ? { background: '#FFF8F8' } : {}}>
              <div className="nli-icon" style={{ background: n.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <n.Icon size={18} color={n.iconColor} />
              </div>
              <div style={{ flex: 1 }}>
                <div className="nli-title">{n.title}</div>
                <div className="nli-time">{n.time}</div>
              </div>
              {n.unread && <div className="nli-dot" />}
            </div>
          ))}
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid-2">
        <div className="card">
          <div className="card-header">
            <span className="card-title">Weekly Incidents</span>
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>This week</span>
          </div>
          <div className="card-body">
            <div className="chart-container">
              {barData.map((d, i) => (
                <div className="chart-col" key={i}>
                  <div className="chart-y-val">{d.val}</div>
                  <div className="chart-bar-fill" style={{ height: maxBar > 0 ? `${(d.val / maxBar) * 120}px` : '4px', background: i === 3 ? 'var(--red)' : '#FFCDD2' }} />
                  <div className="chart-x-label">{d.day}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <span className="card-title">Guard Distribution</span>
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>25 total</span>
          </div>
          <div className="card-body">
            <div className="donut-section">
              <svg width="110" height="110" viewBox="0 0 110 110">
                {(() => {
                  let offset = 0;
                  const r = 40, cx = 55, cy = 55, circ = 2 * Math.PI * r;
                  return donutData.map((d, i) => {
                    const dash = (d.pct / 100) * circ;
                    const el = <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={d.color} strokeWidth="16"
                      strokeDasharray={`${dash} ${circ - dash}`} strokeDashoffset={-offset}
                      style={{ transform: 'rotate(-90deg)', transformOrigin: '55px 55px' }} />;
                    offset += dash; return el;
                  });
                })()}
                <text x="55" y="60" textAnchor="middle" fontSize="16" fontWeight="900" fill="#111827">25</text>
              </svg>
              <div className="donut-legend">
                {donutData.map((d, i) => (
                  <div className="dl-item" key={i}>
                    <div className="dl-dot" style={{ background: d.color }} />
                    <span className="dl-text">{d.label}</span>
                    <span className="dl-val">{d.val}</span>
                    <span className="dl-pct">{d.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Guard Tracking Page */
function GuardTrackingPage() {
  const [filter, setFilter] = useState('All');
  return (
    <div>
      <div className="grid-2 mb-20" style={{ gridTemplateColumns: '1fr 1fr 1fr 1fr', display: 'grid', gap: 16 }}>
        <StatCard Icon={Ic.Users}         value="18" label="On Duty"   color="green"  />
        <StatCard Icon={Ic.Clock}         value="4"  label="On Break"  color="orange" />
        <StatCard Icon={Ic.AlertTriangle} value="2"  label="Alert"     color="red"    />
        <StatCard Icon={Ic.Globe}         value="6"  label="Sites"     color="blue"   />
      </div>

      <div className="grid-2 mb-20" style={{ gridTemplateColumns: '3fr 2fr' }}>
        {/* Map */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">Live GPS Map</span>
            <span className="card-action">Fullscreen →</span>
          </div>
          <div style={{ padding: 16 }}>
            <div className="map-container">
              <svg width="100%" height="100%" viewBox="0 0 600 300" preserveAspectRatio="xMidYMid meet">
                <defs>
                  <pattern id="ag" width="30" height="30" patternUnits="userSpaceOnUse">
                    <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#c8e6c9" strokeWidth="0.6"/>
                  </pattern>
                </defs>
                <rect width="600" height="300" fill="#e8f5e9"/>
                <rect width="600" height="300" fill="url(#ag)"/>
                {/* Roads */}
                <line x1="0" y1="150" x2="600" y2="150" stroke="#a5d6a7" strokeWidth="14"/>
                <line x1="300" y1="0"   x2="300" y2="300" stroke="#a5d6a7" strokeWidth="14"/>
                <line x1="0" y1="80"  x2="600" y2="80"  stroke="#c8e6c9" strokeWidth="8"/>
                <line x1="0" y1="230" x2="600" y2="230" stroke="#c8e6c9" strokeWidth="8"/>
                <line x1="140" y1="0" x2="140" y2="300" stroke="#c8e6c9" strokeWidth="8"/>
                <line x1="460" y1="0" x2="460" y2="300" stroke="#c8e6c9" strokeWidth="8"/>
                {/* Buildings */}
                {[[30,30,80,50],[180,30,100,40],[350,20,90,55],[490,30,80,45],[30,110,60,30],[180,170,80,55],[350,170,90,55],[490,110,80,60],[30,200,70,60],[200,240,80,35],[400,240,80,35]].map(([x,y,w,h],i)=>(
                  <rect key={i} x={x} y={y} width={w} height={h} rx="5" fill={i%3===0?"#b2dfdb":i%3===1?"#c8e6c9":"#dcedc8"} stroke="#a5d6a7" strokeWidth="1"/>
                ))}
                {/* Guard markers */}
                {[
                  [100,150,'#E53935','RK'],[300,80,'#1E88E5','SY'],[460,150,'#43A047','MS'],
                  [300,230,'#8E24AA','DV'],[140,80,'#FB8C00','AS'],
                ].map(([cx,cy,col,init],i)=>(
                  <g key={i}>
                    <circle cx={cx} cy={cy} r="16" fill={col} opacity="0.2"/>
                    <circle cx={cx} cy={cy} r="10" fill={col} stroke="#fff" strokeWidth="2"/>
                    <text x={cx} y={cy+4} textAnchor="middle" fontSize="8" fontWeight="900" fill="#fff">{init}</text>
                  </g>
                ))}
              </svg>
              <div className="map-overlay-info">
                <div className="moi-title">Active Guards</div>
                <div className="moi-val">18</div>
                <div className="moi-sub">Across 6 sites</div>
              </div>
              <div className="map-legend">
                {[['#43A047','On Duty'],['#FB8C00','Break'],['#E53935','Alert']].map(([c,l])=>(
                  <div className="ml-item" key={l}><div className="ml-dot" style={{background:c}}/>{l}</div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Guard list */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">Guard List</span>
          </div>
          <div style={{ padding: '12px 0 0' }}>
            <div className="filter-bar" style={{ padding: '0 16px' }}>
              {['All','On Duty','Break','Alert'].map(f=>(
                <div key={f} className={`filter-chip-admin ${filter===f?'fca-active':'fca-inactive'}`} onClick={()=>setFilter(f)}>{f}</div>
              ))}
            </div>
            <table className="data-table">
              <tbody>
                {guards.filter(g => filter==='All'||(filter==='On Duty'&&g.status==='active')||(filter==='Break'&&g.status==='break')||(filter==='Alert'&&g.status==='alert')).map((g,i)=>(
                  <tr key={i}>
                    <td>
                      <div className="guard-cell">
                        <div className="g-avatar" style={{background:g.color}}>{g.initials}</div>
                        <div><div className="g-name">{g.name}</div><div className="g-id">{g.post}</div></div>
                      </div>
                    </td>
                    <td><Badge type={g.status==='active'?'green':g.status==='break'?'orange':'red'} label={g.status==='active'?'On Duty':g.status==='break'?'Break':'Alert'}/></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Shifts Page */
function ShiftsPage() {
  return (
    <div>
      <div className="stats-grid mb-24">
        <StatCard Icon={Ic.Sun}           value="8"  label="Morning Shift" color="orange" trend="Active now" trendDir="up"/>
        <StatCard Icon={Ic.Moon}          value="6"  label="Evening Shift" color="blue"   trend="Starts 2 PM" trendDir="up"/>
        <StatCard Icon={Ic.Moon}          value="5"  label="Night Shift"   color="purple" trend="Starts 10 PM" trendDir="up"/>
        <StatCard Icon={Ic.Layers}        value="3"  label="Open Slots"    color="red"    trend="Needs fill" trendDir="down"/>
      </div>
      <div className="grid-2 mb-20" style={{ gridTemplateColumns: '2fr 1fr' }}>
        <div className="card">
          <div className="card-header">
            <span className="card-title">Today's Shifts</span>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-secondary btn-sm">← Prev</button>
              <button className="btn btn-secondary btn-sm" style={{ background: 'var(--red-soft)', color: 'var(--red)' }}>Today</button>
              <button className="btn btn-secondary btn-sm">Next →</button>
            </div>
          </div>
          <table className="data-table">
            <thead><tr><th>Shift</th><th>Time</th><th>Site</th><th>Guards</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {shiftData.map((s,i)=>(
                <tr key={i}>
                  <td style={{fontWeight:700}}>{s.title} Shift</td>
                  <td style={{color:'var(--text-sub)',fontSize:12}}>{s.time}</td>
                  <td style={{fontSize:12}}>{s.site}</td>
                  <td><Badge type="blue" label={`${s.guards} Guards`}/></td>
                  <td><Badge type={s.status==='active'?'green':'blue'} label={s.status==='active'?'Active':'Upcoming'}/></td>
                  <td><button className="btn btn-secondary btn-sm">Manage</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="card">
          <div className="card-header"><span className="card-title">Assign Guard</span></div>
          <div className="card-body">
            <div className="form-group"><label className="form-label">Guard</label><select className="form-select"><option>Select guard...</option>{guards.map(g=><option key={g.id}>{g.name}</option>)}</select></div>
            <div className="form-group"><label className="form-label">Shift</label><select className="form-select"><option>Morning (06–14)</option><option>Evening (14–22)</option><option>Night (22–06)</option></select></div>
            <div className="form-group"><label className="form-label">Site</label><select className="form-select">{sites.map(s=><option key={s.name}>{s.name}</option>)}</select></div>
            <div className="form-group"><label className="form-label">Date</label><input type="date" className="form-input" defaultValue={new Date().toISOString().split('T')[0]}/></div>
            <button className="btn btn-primary" style={{ width: '100%' }}>Assign Shift</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Attendance Page */
function AttendancePage() {
  return (
    <div>
      <div className="stats-grid mb-24">
        <StatCard Icon={Ic.UserCheck} value="18" label="Present"  color="green"  trend="+2%" trendDir="up"/>
        <StatCard Icon={Ic.UserX}     value="3"  label="Absent"   color="red"    trend="-1"  trendDir="down"/>
        <StatCard Icon={Ic.Clock}     value="2"  label="Late"     color="orange" trend=""    trendDir="up"/>
        <StatCard Icon={Ic.Percent}   value="86%" label="Rate"   color="blue"   trend="+3%" trendDir="up"/>
      </div>
      <div className="grid-2 mb-20">
        <div className="card">
          <div className="card-header"><span className="card-title">Today's Attendance</span><span className="card-action">Export →</span></div>
          <table className="data-table">
            <thead><tr><th>Guard</th><th>Site</th><th>Check-In</th><th>Check-Out</th><th>Method</th><th>Status</th></tr></thead>
            <tbody>
              {guards.map((g,i)=>(
                <tr key={i}>
                  <td><div className="guard-cell"><div className="g-avatar" style={{background:g.color}}>{g.initials}</div><div><div className="g-name">{g.name}</div><div className="g-id">{g.id}</div></div></div></td>
                  <td style={{fontSize:12,color:'var(--text-sub)'}}>{g.site}</td>
                  <td style={{fontSize:12,fontWeight:600,color:i===3?'var(--red)':'var(--green)'}}>{i===3?'—':g.checkin}</td>
                  <td style={{fontSize:12,color:'var(--text-muted)'}}>—</td>
                  <td><Badge type={i%2===0?'blue':'purple'} label={i%2===0?'QR Code':'Biometric'}/></td>
                  <td><Badge type={i===3?'red':i===1?'orange':'green'} label={i===3?'Absent':i===1?'Late':'Present'}/></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="card">
          <div className="card-header"><span className="card-title">QR Check-In</span></div>
          <div className="card-body" style={{textAlign:'center',padding:'32px 20px'}}>
            <div style={{marginBottom:16,display:'flex',justifyContent:'center'}}>
              <Ic.QrCode size={80} color="var(--blue)" strokeWidth={1} />
            </div>
            <div style={{fontSize:18,fontWeight:800,color:'var(--text)',marginBottom:8}}>Scan QR Code</div>
            <div style={{fontSize:13,color:'var(--text-sub)',marginBottom:24}}>Guards scan using the mobile app for instant check-in</div>
            <div style={{display:'flex',gap:10,justifyContent:'center'}}>
              <button className="btn btn-primary">Generate QR</button>
              <button className="btn btn-secondary">Biometric</button>
            </div>
            <div style={{marginTop:24,padding:'14px',background:'var(--green-soft)',borderRadius:'var(--r)',fontSize:13,color:'var(--green)',fontWeight:700,display:'flex',alignItems:'center',gap:8,justifyContent:'center'}}>
              <Ic.CheckCircle size={16} color="var(--green)" /> 18 guards checked in today
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Incidents Page */
function IncidentsPage() {
  const [filter, setFilter] = useState('All');
  return (
    <div>
      <div className="stats-grid mb-24">
        <StatCard Icon={Ic.AlertTriangle} value="5"  label="Total Today" color="red"    trend="+2" trendDir="down"/>
        <StatCard Icon={Ic.AlertCircle}   value="2"  label="High"        color="red"    trend=""   trendDir="down"/>
        <StatCard Icon={Ic.AlertCircle}   value="2"  label="Medium"      color="orange" trend=""   trendDir="up"/>
        <StatCard Icon={Ic.Info}          value="1"  label="Info"        color="blue"   trend=""   trendDir="up"/>
      </div>
      <div className="grid-2 mb-20" style={{ gridTemplateColumns: '2fr 1fr' }}>
        <div className="card">
          <div className="card-header">
            <span className="card-title">Incident Reports</span>
            <button className="btn btn-primary btn-sm">+ New Report</button>
          </div>
          <div style={{ padding: '12px 16px 0' }}>
            <div className="filter-bar">
              {['All','High','Medium','Info','Open','Resolved'].map(f=>(
                <div key={f} className={`filter-chip-admin ${filter===f?'fca-active':'fca-inactive'}`} onClick={()=>setFilter(f)}>{f}</div>
              ))}
            </div>
          </div>
          <table className="data-table">
            <thead><tr><th>ID</th><th>Title</th><th>Site</th><th>Time</th><th>Severity</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {incidents.filter(i=>filter==='All'||(filter==='High'&&i.sLabel==='High')||(filter==='Medium'&&i.sLabel==='Medium')||(filter==='Info'&&i.sLabel==='Info')||(filter==='Open'&&i.status==='open')||(filter==='Resolved'&&i.status==='resolved')).map((inc,i)=>(
                <tr key={i}>
                  <td style={{fontSize:11,color:'var(--text-muted)',fontFamily:'monospace'}}>{inc.id}</td>
                  <td><div style={{fontWeight:600,fontSize:13}}>{inc.title}</div><div style={{fontSize:11,color:'var(--text-sub)'}}>{inc.desc.slice(0,50)}...</div></td>
                  <td style={{fontSize:12}}>
                    <div style={{display:'flex',alignItems:'center',gap:5}}>
                      <Ic.MapPin size={12} color="var(--text-muted)" /> {inc.site}
                    </div>
                  </td>
                  <td style={{fontSize:12,color:'var(--text-sub)'}}>{inc.time}</td>
                  <td><Badge type={inc.severity} label={inc.sLabel}/></td>
                  <td><Badge type={inc.status==='open'?'red':inc.status==='resolved'?'green':'teal'} label={inc.status}/></td>
                  <td><button className="btn btn-secondary btn-sm">View</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="card">
          <div className="card-header"><span className="card-title">Log Incident</span></div>
          <div className="card-body">
            <div className="form-group"><label className="form-label">Type</label><select className="form-select"><option>Unauthorized Entry</option><option>Suspicious Activity</option><option>Equipment Issue</option><option>Medical Emergency</option><option>Other</option></select></div>
            <div className="form-group"><label className="form-label">Site</label><select className="form-select">{sites.map(s=><option key={s.name}>{s.name}</option>)}</select></div>
            <div className="form-group"><label className="form-label">Severity</label><select className="form-select"><option>High</option><option>Medium</option><option>Info</option></select></div>
            <div className="form-group"><label className="form-label">Description</label><textarea className="form-input" rows="3" style={{resize:'none'}} placeholder="Describe the incident..."/></div>
            <button className="btn btn-primary" style={{width:'100%'}}>Submit Report</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Patrol Page */
function PatrolPage() {
  return (
    <div>
      <div className="stats-grid mb-24">
        <StatCard Icon={Ic.Shield}   value="8"    label="Active Routes"    color="blue"   trend="On schedule" trendDir="up"/>
        <StatCard Icon={Ic.Check}    value="31"   label="Checkpoints Done" color="green"  trend="+5 today"    trendDir="up"/>
        <StatCard Icon={Ic.Clock}    value="47m"  label="Avg Route Time"   color="orange" trend="-3m"          trendDir="up"/>
        <StatCard Icon={Ic.MapPin}   value="2.3km"label="Covered Today"    color="purple" trend="Per guard"    trendDir="up"/>
      </div>
      <div className="grid-2 mb-20" style={{ gridTemplateColumns: '3fr 2fr' }}>
        <div className="card">
          <div className="card-header"><span className="card-title">Patrol Map</span><span className="card-action">Fullscreen →</span></div>
          <div style={{padding:16}}>
            <div className="map-container">
              <svg width="100%" height="100%" viewBox="0 0 600 300" preserveAspectRatio="xMidYMid meet">
                <defs><pattern id="pg" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M 30 0 L 0 0 0 30" fill="none" stroke="#c8e6c9" strokeWidth="0.6"/></pattern></defs>
                <rect width="600" height="300" fill="#e8f5e9"/>
                <rect width="600" height="300" fill="url(#pg)"/>
                <line x1="0" y1="150" x2="600" y2="150" stroke="#a5d6a7" strokeWidth="12"/>
                <line x1="300" y1="0" x2="300" y2="300" stroke="#a5d6a7" strokeWidth="12"/>
                {[[30,30,80,50],[180,30,100,40],[350,20,90,55],[490,30,80,45],[30,110,60,30],[490,110,80,60],[30,200,70,60],[400,240,80,35]].map(([x,y,w,h],i)=>(
                  <rect key={i} x={x} y={y} width={w} height={h} rx="5" fill={i%2===0?"#b2dfdb":"#c8e6c9"} stroke="#a5d6a7" strokeWidth="1"/>
                ))}
                <polyline points="60,150 60,55 300,55 300,150 300,230 500,230 500,150 560,150" fill="none" stroke="#E53935" strokeWidth="3" strokeDasharray="8,4" opacity="0.9"/>
                {[[60,150,'done'],[60,55,'done'],[300,55,'active'],[300,150,'pending'],[300,230,'pending'],[500,230,'pending']].map(([cx,cy,st],i)=>(
                  <g key={i}>
                    <circle cx={cx} cy={cy} r="12" fill={st==='done'?'#43A047':st==='active'?'#FB8C00':'#E0E0E0'} stroke="#fff" strokeWidth="2"/>
                    <text x={cx} y={cy+5} textAnchor="middle" fontSize="11" fill="#fff" fontWeight="900">{i+1}</text>
                  </g>
                ))}
                <circle cx="300" cy="55" r="22" fill="rgba(251,140,0,0.2)"/>
                <text x="300" y="59" textAnchor="middle" fontSize="14">👮</text>
              </svg>
              <div className="map-overlay-info">
                <div className="moi-title">Route Progress</div>
                <div className="moi-val">50%</div>
                <div className="moi-sub">3 of 6 done</div>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header"><span className="card-title">Checkpoints</span></div>
          <div>
            {checkpoints.map((cp,i)=>(
              <div className="cp-row" key={i}>
                <div className={`cp-circle cp-${cp.status}`}>{cp.status==='done'?'✓':cp.status==='active'?'●':i+1}</div>
                <div className="cp-info">
                  <div className="cp-name">{cp.name}</div>
                  <div className="cp-time">{cp.status==='pending'?`ETA: ${cp.time}`:`Scanned: ${cp.time}`} · {cp.guard}</div>
                </div>
                <Badge type={cp.status==='done'?'teal':cp.status==='active'?'orange':'blue'} label={cp.status==='done'?'Done':cp.status==='active'?'Active':'Pending'}/>
              </div>
            ))}
            <div style={{padding:'14px 20px'}}>
              <div className="progress-wrap">
                <div className="progress-header"><span className="progress-label">Overall Progress</span><span className="progress-pct">50%</span></div>
                <div className="progress-bar"><div className="progress-fill" style={{width:'50%',background:'var(--teal)'}}/></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Analytics Page */
function AnalyticsPage() {
  return (
    <div>
      <div className="stats-grid mb-24">
        <StatCard Icon={Ic.Shield}   value="98%"  label="Coverage"   color="green"  trend="+2%"    trendDir="up"/>
        <StatCard Icon={Ic.Zap}      value="4.2m" label="Response"   color="blue"   trend="-0.8m"  trendDir="up"/>
        <StatCard Icon={Ic.FileText} value="142"  label="Reports/mo" color="orange" trend="+12%"   trendDir="up"/>
        <StatCard Icon={Ic.Cloud}    value="99.9%"label="Uptime"     color="purple" trend="SLA met" trendDir="up"/>
      </div>
      <div className="grid-2 mb-20">
        <div className="card">
          <div className="card-header"><span className="card-title">Monthly Incidents Trend</span></div>
          <div className="card-body">
            <div className="chart-container">
              {[{m:'Jan',v:12},{m:'Feb',v:8},{m:'Mar',v:15},{m:'Apr',v:6},{m:'May',v:11},{m:'Jun',v:7}].map((d,i)=>(
                <div className="chart-col" key={i}>
                  <div className="chart-y-val">{d.v}</div>
                  <div className="chart-bar-fill" style={{height:`${(d.v/15)*140}px`,background:d.m==='Mar'?'var(--red)':'#FFCDD2'}}/>
                  <div className="chart-x-label">{d.m}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header"><span className="card-title">Guard Performance</span></div>
          <div className="card-body">
            {[{name:'Ramesh Kumar',score:98,color:'var(--green)'},{name:'Suresh Yadav',score:94,color:'var(--blue)'},{name:'Mohan Singh',score:87,color:'var(--orange)'},{name:'Anil Sharma',score:91,color:'var(--purple)'}].map((g,i)=>(
              <div className="progress-wrap mb-12" key={i}>
                <div className="progress-header"><span className="progress-label">{g.name}</span><span className="progress-pct">{g.score}%</span></div>
                <div className="progress-bar"><div className="progress-fill" style={{width:`${g.score}%`,background:g.color}}/></div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="grid-2">
        <div className="card">
          <div className="card-header"><span className="card-title">Incident by Type</span></div>
          <div className="card-body">
            <div className="donut-section">
              <svg width="110" height="110" viewBox="0 0 110 110">
                {(() => {
                  const data=[{pct:35,c:'#E53935'},{pct:25,c:'#FB8C00'},{pct:20,c:'#1E88E5'},{pct:12,c:'#8E24AA'},{pct:8,c:'#43A047'}];
                  let off=0; const r=40,cx=55,cy=55,circ=2*Math.PI*r;
                  return data.map((d,i)=>{const dash=(d.pct/100)*circ;const el=<circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={d.c} strokeWidth="16" strokeDasharray={`${dash} ${circ-dash}`} strokeDashoffset={-off} style={{transform:'rotate(-90deg)',transformOrigin:'55px 55px'}}/>;off+=dash;return el;});
                })()}
                <text x="55" y="60" textAnchor="middle" fontSize="13" fontWeight="900" fill="#111827">142</text>
              </svg>
              <div className="donut-legend">
                {[['Unauthorized','35%','#E53935'],['Off-Route','25%','#FB8C00'],['Equipment','20%','#1E88E5'],['Trespassing','12%','#8E24AA'],['Other','8%','#43A047']].map(([l,p,c])=>(
                  <div className="dl-item" key={l}><div className="dl-dot" style={{background:c}}/><span className="dl-text">{l}</span><span className="dl-val">{p}</span></div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header"><span className="card-title">Cloud Storage</span></div>
          <div className="card-body">
            <div style={{textAlign:'center',marginBottom:20}}>
              <div style={{marginBottom:8,display:'flex',justifyContent:'center'}}>
                <Ic.Cloud size={48} color="var(--blue)" />
              </div>
              <div style={{fontSize:28,fontWeight:800,fontFamily:'Outfit,sans-serif'}}>74.2 GB</div>
              <div style={{fontSize:13,color:'var(--text-sub)'}}>of 100 GB used</div>
            </div>
            <div className="progress-bar mb-12" style={{height:10}}><div className="progress-fill" style={{width:'74%',background:'linear-gradient(90deg,var(--blue),var(--purple))'}}/></div>
            {[
              [<Ic.Eye size={13} color="var(--blue)" />,'Video Recordings','52 GB','var(--blue)'],
              [<Ic.FileText size={13} color="var(--orange)" />,'Incident Reports','14 GB','var(--orange)'],
              [<Ic.BarChart size={13} color="var(--green)" />,'Analytics Data','8 GB','var(--green)'],
            ].map(([icon,l,v,c],idx)=>(
              <div key={idx} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'8px 0',borderBottom:'1px solid var(--border)',fontSize:13}}>
                <span style={{display:'flex',alignItems:'center',gap:6}}>{icon} {l}</span>
                <span style={{fontWeight:700,color:c}}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* Notifications Page */
function NotificationsPage() {
  return (
    <div>
      <div className="grid-2 mb-20" style={{ gridTemplateColumns: '2fr 1fr' }}>
        <div className="card">
          <div className="card-header">
            <span className="card-title">All Notifications</span>
            <button className="btn btn-secondary btn-sm">Mark All Read</button>
          </div>
          {notifications.map((n,i)=>(
            <div className={`notif-list-item ${n.unread?'unread':''}`} key={i}>
              <div className="nli-icon" style={{background:n.bg,display:'flex',alignItems:'center',justifyContent:'center'}}>
                <n.Icon size={18} color={n.iconColor} />
              </div>
              <div style={{flex:1}}>
                <div className="nli-title">{n.title}</div>
                <div className="nli-msg">{n.msg}</div>
                <div className="nli-time">{n.time}</div>
              </div>
              {n.unread&&<div className="nli-dot"/>}
            </div>
          ))}
        </div>
        <div className="card">
          <div className="card-header"><span className="card-title">Push Notification Settings</span></div>
          <div style={{padding:'8px 0'}}>
            {[
              [Ic.Zap,'SOS Alerts','Always on',true,'#E53935'],
              [Ic.AlertTriangle,'Incident Reports','Enabled',true,'#FB8C00'],
              [Ic.Users,'Guard Status','Enabled',true,'#43A047'],
              [Ic.MapPin,'Geofence Breach','Enabled',true,'#1E88E5'],
              [Ic.BarChart,'Daily Report','Disabled',false,'#8E24AA'],
              [Ic.Bell,'Shift Changes','Enabled',true,'#FB8C00'],
            ].map(([NIcon,l,s,on,ic])=>(
              <div key={l} style={{display:'flex',alignItems:'center',gap:12,padding:'13px 20px',borderBottom:'1px solid var(--border)'}}>
                <div style={{width:32,height:32,borderRadius:'var(--r-sm)',background:ic+'22',display:'flex',alignItems:'center',justifyContent:'center'}}>
                  <NIcon size={16} color={ic} />
                </div>
                <div style={{flex:1}}>
                  <div style={{fontSize:13,fontWeight:600}}>{l}</div>
                  <div style={{fontSize:11,color:'var(--text-muted)',marginTop:1}}>{s}</div>
                </div>
                <div className={`admin-toggle ${on?'on':'off'}`}><div className="admin-toggle-ball"/></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* Multi-Site Page */
function SitesPage() {
  return (
    <div>
      <div className="stats-grid mb-24">
        <StatCard Icon={Ic.Globe}         value="6"  label="Total Sites"  color="blue"   />
        <StatCard Icon={Ic.Users}         value="33" label="Total Guards" color="green"  />
        <StatCard Icon={Ic.AlertTriangle} value="3"  label="Alerts"       color="red"    />
        <StatCard Icon={Ic.CheckCircle}   value="5"  label="All Clear"    color="teal"   />
      </div>
      <div className="grid-3 mb-20">
        {sites.map((s,i)=>(
          <div className="site-card-admin" key={i}>
            <div className="sca-header">
              <div className="sca-icon" style={{background:s.bg,display:'flex',alignItems:'center',justifyContent:'center'}}>
                <s.Icon size={22} color={s.status==='alert'?'var(--red)':'var(--text-sub)'} strokeWidth={1.5} />
              </div>
              <div style={{flex:1}}>
                <div className="sca-name">{s.name}</div>
                <div className="sca-loc" style={{display:'flex',alignItems:'center',gap:4}}>
                  <Ic.MapPin size={11} color="var(--text-muted)" /> {s.loc}
                </div>
              </div>
              <Badge type={s.status==='active'?'green':'red'} label={s.status==='active'?'Active':'Alert'}/>
            </div>
            <div className="sca-stats">
              {[
                [Ic.Users,         s.guards,    'Guards',    s.guards>0?'var(--text)':'var(--text-muted)'],
                [Ic.AlertTriangle, s.incidents, 'Incidents', s.incidents>0?'var(--red)':'var(--text)'],
                [Ic.Shield,        s.patrols,   'Patrols',   'var(--text)'],
              ].map(([SIcon,v,l,c])=>(
                <div className="sca-stat-item" key={l}>
                  <div className="sca-num" style={{color:c,display:'flex',alignItems:'center',gap:4,justifyContent:'center'}}>
                    <SIcon size={14} color={c} /> {v}
                  </div>
                  <div className="sca-label">{l}</div>
                </div>
              ))}
            </div>
            <div style={{display:'flex',gap:8}}>
              <button className="btn btn-secondary btn-sm" style={{flex:1}}>View Details</button>
              <button className="btn btn-primary btn-sm" style={{flex:1}}>Manage</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Roles Page */
function RolesPage() {
  return (
    <div>
      <div className="stats-grid mb-24">
        <StatCard Icon={Ic.Key}    value="2"  label="Admins"      color="red"    />
        <StatCard Icon={Ic.User}   value="5"  label="Supervisors" color="blue"   />
        <StatCard Icon={Ic.Users}  value="24" label="Guards"      color="green"  />
        <StatCard Icon={Ic.Eye}    value="3"  label="Viewers"     color="purple" />
      </div>
      <div className="grid-2">
        <div className="card">
          <div className="card-header"><span className="card-title">Role Definitions</span><button className="btn btn-primary btn-sm">+ New Role</button></div>
          <div style={{padding:'8px 0'}}>
            {roles.map((r,i)=>(
              <div key={i} style={{display:'flex',alignItems:'center',gap:14,padding:'14px 20px',borderBottom:'1px solid var(--border)'}}>
                <div style={{width:42,height:42,borderRadius:'var(--r)',background:r.color+'22',display:'flex',alignItems:'center',justifyContent:'center',fontSize:20,fontWeight:800,color:r.color}}>{r.users}</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:14,fontWeight:700}}>{r.name}</div>
                  <div style={{fontSize:12,color:'var(--text-sub)',marginTop:2}}>{r.desc}</div>
                </div>
                <Badge type={r.name==='Admin'?'red':r.name==='Supervisor'?'blue':r.name==='Guard'?'green':'purple'} label={`${r.users} Users`}/>
                <button className="btn btn-secondary btn-sm">Edit</button>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <div className="card-header"><span className="card-title">Permission Matrix</span></div>
          <div style={{overflowX:'auto'}}>
            <table className="data-table">
              <thead><tr><th>Feature</th><th>Admin</th><th>Supervisor</th><th>Guard</th><th>Viewer</th></tr></thead>
              <tbody>
                {[
                  ['Dashboard',      [true,true,true,true]],
                  ['Guard Tracking', [true,true,true,true]],
                  ['Incident Report',[true,true,true,false]],
                  ['Shift Manage',   [true,true,false,false]],
                  ['Attendance',     [true,true,true,false]],
                  ['Analytics',      [true,true,false,true]],
                  ['Role Manage',    [true,false,false,false]],
                  ['Site Config',    [true,false,false,false]],
                ].map(([f,perms])=>(
                  <tr key={f}>
                    <td style={{fontWeight:600}}>{f}</td>
                    {perms.map((p,i)=>(
                      <td key={i} style={{textAlign:'center'}}>
                        {p
                          ? <Ic.CheckCircle size={16} color="var(--green)" />
                          : <Ic.XCircle    size={16} color="var(--red)"   />}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Settings Page */
function SettingsPage() {
  return (
    <div className="grid-2">
      <div>
        <div className="card mb-20">
          <div className="card-header"><span className="card-title">General Settings</span></div>
          <div style={{padding:'8px 0'}}>
            {[['🏢 Organization Name','SecureWatch India','var(--bg-page)'],['🌐 Timezone','Asia/Kolkata (IST)','var(--bg-page)'],['📧 Alert Email','admin@securewatch.in','var(--bg-page)'],['📱 SMS Alerts','+91 98765 43210','var(--bg-page)']].map(([l,v])=>(
              <div key={l} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'13px 20px',borderBottom:'1px solid var(--border)'}}>
                <div style={{fontSize:13,fontWeight:600}}>{l}</div>
                <div style={{fontSize:13,color:'var(--text-sub)'}}>{v}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <div className="card-header"><span className="card-title">Security Settings</span></div>
          <div style={{padding:'8px 0'}}>
            {[['🔐 2FA Authentication',true],['📡 Offline Mode',true],['☁️ Auto Cloud Backup',true],['🔔 Real-time Alerts',true],['📊 Auto Reports',false]].map(([l,on])=>(
              <div key={l} style={{display:'flex',alignItems:'center',gap:12,padding:'13px 20px',borderBottom:'1px solid var(--border)'}}>
                <div style={{fontSize:13,fontWeight:600,flex:1}}>{l}</div>
                <div className={`admin-toggle ${on?'on':'off'}`}><div className="admin-toggle-ball"/></div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <div className="card mb-20">
          <div className="card-header"><span className="card-title">Admin Profile</span></div>
          <div className="card-body">
            <div style={{textAlign:'center',marginBottom:20}}>
              <div style={{width:72,height:72,borderRadius:'50%',background:'linear-gradient(135deg,var(--red),#8E24AA)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:28,fontWeight:900,color:'#fff',margin:'0 auto 12px'}}>S</div>
              <div style={{fontSize:16,fontWeight:800}}>Supervisor Admin</div>
              <div style={{fontSize:12,color:'var(--text-sub)',marginTop:2}}>supervisor@securewatch.in</div>
              <Badge type="red" label="Administrator"/>
            </div>
            <div className="form-group"><label className="form-label">Full Name</label><input className="form-input" defaultValue="Supervisor Admin"/></div>
            <div className="form-group"><label className="form-label">Email</label><input className="form-input" defaultValue="supervisor@securewatch.in"/></div>
            <div className="form-group"><label className="form-label">Phone</label><input className="form-input" defaultValue="+91 98765 43210"/></div>
            <button className="btn btn-primary" style={{width:'100%'}}>Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   MAIN APP
═══════════════════════════════════════ */
export default function App() {
  const [page, setPage] = useState('dashboard');
  const meta = pageMeta[page];
  const today = new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  const pageComponents = {
    dashboard:     <DashboardPage />,
    employees:     <EmployeesPage />,
    guards:        <GuardTrackingPage />,
    shifts:        <ShiftsPage />,
    attendance:    <AttendancePage />,
    leaves:        <LeavesPage />,
    incidents:     <IncidentsPage />,
    patrol:        <PatrolPage />,
    analytics:     <AnalyticsPage />,
    notifications: <NotificationsPage />,
    sites:         <SitesPage />,
    roles:         <RolesPage />,
    settings:      <SettingsPage />,
  };

  return (
    <div className="admin-layout">
      {/* ── Sidebar ── */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-icon">🛡️</div>
          <div>
            <div className="brand-name">SecureWatch</div>
            <div className="brand-sub">Admin Dashboard</div>
          </div>
        </div>

        <div className="sidebar-nav">
          <div className="sidebar-section-label">Main</div>
          {navItems.slice(0, 7).map(n => (
            <div key={n.id} className={`nav-link ${page === n.id ? 'active' : ''}`} onClick={() => setPage(n.id)}>
              <div className="nl-icon">{n.icon}</div>
              <span className="nl-text">{n.label}</span>
              {n.badge && <span className="nl-badge">{n.badge}</span>}
            </div>
          ))}
          <div className="sidebar-section-label">Management</div>
          {navItems.slice(7).map(n => (
            <div key={n.id} className={`nav-link ${page === n.id ? 'active' : ''}`} onClick={() => setPage(n.id)}>
              <div className="nl-icon">{n.icon}</div>
              <span className="nl-text">{n.label}</span>
              {n.badge && <span className="nl-badge">{n.badge}</span>}
            </div>
          ))}
        </div>

        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="su-avatar">S</div>
            <div><div className="su-name">Supervisor</div><div className="su-role">Administrator</div></div>
            <div className="su-arrow">⋯</div>
          </div>
        </div>
      </aside>

      {/* ── Main Area ── */}
      <div className="main-area">
        {/* Top Header */}
        <header className="top-header">
          <div className="page-title-section">
            <div className="page-title">{meta.title}</div>
            <div className="page-breadcrumb">SecureWatch / {meta.sub}</div>
          </div>
          <div className="header-right">
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{today}</div>
            <div className="header-search">
              <span style={{ fontSize: 14 }}>🔍</span>
              <input placeholder="Search..." />
            </div>
            <div className="header-btn" onClick={() => setPage('notifications')}>
              🔔 <span className="h-badge" />
            </div>
            <div className="header-btn">🌐</div>
            <div className="header-avatar" onClick={() => setPage('settings')}>S</div>
          </div>
        </header>

        {/* Page Content */}
        <div className="page-content">
          <div className="page-header-row">
            <div>
              <div className="page-header-title">{meta.title}</div>
              <div className="page-header-sub">{meta.sub} · Live data</div>
            </div>
            <div className="page-header-actions">
              {page === 'guards' && <button className="btn btn-primary">+ Add Guard</button>}
              {page === 'incidents' && <button className="btn btn-primary">+ Report Incident</button>}
              {page === 'sites' && <button className="btn btn-primary">+ Add Site</button>}
              {page === 'shifts' && <button className="btn btn-primary">+ New Shift</button>}
              <button className="btn btn-secondary">Export PDF</button>
            </div>
          </div>
          {pageComponents[page]}
        </div>
      </div>
    </div>
  );
}
