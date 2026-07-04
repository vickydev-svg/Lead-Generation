import React, { useState, useEffect, useRef } from 'react';
import { 
  Flame, 
  ArrowRight, 
  Mail, 
  Globe, 
  Download, 
  Users, 
  AlertTriangle, 
  CheckCircle2, 
  Database, 
  Zap, 
  ShieldAlert, 
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Sliders,
  Search,
  MapPin,
  RefreshCw,
  Loader2,
  Lock,
  Smartphone
} from 'lucide-react';

const LandingPage = ({ setPage, onDirectSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [faqOpen, setFaqOpen] = useState({});
  const [hoveredPainPoint, setHoveredPainPoint] = useState(null);
  const [activeScriptIdx, setActiveScriptIdx] = useState(null);
  const [leadsVolume, setLeadsVolume] = useState(15000);
  const [copiedScript, setCopiedScript] = useState(false);
  const canvasRef = useRef(null);
  const footerCanvasRef = useRef(null);

  // SECTION 2 SHOWCASE (Interactive Location Search UI)
  const [sec2Category, setSec2Category] = useState('Hotel');
  const [sec2City, setSec2City] = useState('Paris');
  const [sec2Country, setSec2Country] = useState('France');
  const [sec2State, setSec2State] = useState('idle'); // 'idle', 'searching', 'done'
  const [sec2Leads, setSec2Leads] = useState([]);

  // SECTION 3 SHOWCASE (Interactive Filters UI)
  const [sec3Web, setSec3Web] = useState(true);
  const [sec3Phone, setSec3Phone] = useState(true);
  const [sec3Mobile, setSec3Mobile] = useState(true);
  const [sec3Email, setSec3Email] = useState(true);
  const [sec3Rating, setSec3Rating] = useState(3.0);
  const [sec3Fb, setSec3Fb] = useState(false);
  const [sec3Ig, setSec3Ig] = useState(false);

  // SECTION 4 SHOWCASE (Continuous Updates UI)
  const [sec4Jobs, setSec4Jobs] = useState([
    { id: 1, name: 'Lawyers Atlanta', results: 380, status: 'updating' },
    { id: 2, name: 'Hotels Chicago', results: 420, status: 'updating' },
    { id: 3, name: 'Real estate agencies NYC', results: 310, status: 'updating' }
  ]);

  // Simulate continuous update counters
  useEffect(() => {
    const interval = setInterval(() => {
      setSec4Jobs(prev => prev.map(job => {
        if (job.status === 'updating') {
          const increment = Math.floor(Math.random() * 3) + 1;
          const maxResults = job.id === 1 ? 414 : job.id === 2 ? 461 : 367;
          if (job.results + increment >= maxResults) {
            return { ...job, results: maxResults, status: 'completed' };
          }
          return { ...job, results: job.results + increment };
        } else {
          // Occassionally restart update loop to show continuous pipeline activity
          if (Math.random() > 0.95) {
            return { ...job, results: job.results - 15, status: 'updating' };
          }
          return job;
        }
      }));
    }, 800);
    return () => clearInterval(interval);
  }, []);

  // Calculate Section 3 dynamic leads count
  const filteredCountResult = React.useMemo(() => {
    let count = 4850;
    if (sec3Web) count -= 600;
    if (sec3Phone) count -= 400;
    if (sec3Mobile) count -= 550;
    if (sec3Email) count -= 850;
    count -= Math.round((sec3Rating - 3.0) * 450);
    if (sec3Fb) count += 350;
    if (sec3Ig) count += 250;
    return Math.max(124, count);
  }, [sec3Web, sec3Phone, sec3Mobile, sec3Email, sec3Rating, sec3Fb, sec3Ig]);

  // Handle Section 2 Search Trigger
  const handleSec2Search = (e) => {
    e.preventDefault();
    setSec2State('searching');
    setTimeout(() => {
      setSec2Leads([
        { name: 'Le Meurice', email: 'r***@dorchestercollection.com', category: 'Hotel' },
        { name: 'Hôtel Plaza Athénée', email: 'c***@dorchestercollection.com', category: 'Hotel' },
        { name: 'Hôtel de Crillon', email: 'i***@rosewoodhotels.com', category: 'Hotel' },
        { name: 'Le Bristol Paris', email: 'r***@oetkercollection.com', category: 'Hotel' }
      ]);
      setSec2State('done');
    }, 1200);
  };

  // Toggle FAQ items
  const toggleFaq = (index) => {
    setFaqOpen(prev => ({ ...prev, [index]: !prev[index] }));
  };

  // Copy cold outreach script helper
  const handleCopyScript = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2000);
  };

  // Recommended plan based on slider
  const getRecommendedPlan = () => {
    if (leadsVolume <= 5000) return { name: 'Starter', price: '$39/mo', savings: '$11/mo' };
    if (leadsVolume <= 20000) return { name: 'Pro', price: '$99/mo', savings: '$101/mo' };
    return { name: 'Enterprise', price: '$249/mo', savings: '$351/mo' };
  };

  // Upgraded Globe Canvas: Rotates, draws continental outlines, arcs, and glowing lead pinpoints with labels
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let rotation = 0;

    const leadsOnGlobe = [
      { lat: 0.3, lon: -0.2, name: 'Manhattan Dental Care', type: 'Email Extracted', color: '#10b981' },
      { lat: -0.1, lon: 0.4, name: 'Dubai Bistro', type: 'Phone Extracted', color: '#3b82f6' },
      { lat: 0.5, lon: 0.9, name: 'London Legal Partners', type: 'AI Enriched', color: '#f59e0b' },
      { lat: -0.4, lon: -0.8, name: 'Sydney Gyms', type: 'Website Crawled', color: '#ef4444' },
      { lat: 0.1, lon: -1.2, name: 'San Francisco Tech Inc', type: 'Socials Found', color: '#10b981' },
      { lat: -0.2, lon: -0.1, name: 'Paris Bakery & Café', type: 'Email Extracted', color: '#3b82f6' }
    ];

    const resizeCanvas = () => {
      canvas.width = 460;
      canvas.height = 460;
    };
    resizeCanvas();

    const drawGlobe = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const radius = 150;

      // Atmosphere glow
      const glowGrad = ctx.createRadialGradient(cx, cy, radius * 0.7, cx, cy, radius * 1.4);
      glowGrad.addColorStop(0, 'rgba(37, 99, 235, 0.18)');
      glowGrad.addColorStop(0.6, 'rgba(37, 99, 235, 0.05)');
      glowGrad.addColorStop(1, 'rgba(7, 11, 19, 0)');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.5, 0, Math.PI * 2);
      ctx.fill();

      // Sphere base
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fillStyle = '#060a15';
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      ctx.fill();
      ctx.stroke();

      rotation += 0.0025;

      // Longitudes/Latitudes
      for (let i = 0; i < 8; i++) {
        const offset = (i / 8) * Math.PI + rotation;
        const width = Math.sin(offset) * radius;
        ctx.strokeStyle = 'rgba(59, 130, 246, 0.12)';
        ctx.beginPath();
        ctx.ellipse(cx, cy, Math.abs(width), radius, 0, 0, Math.PI * 2);
        ctx.stroke();
      }
      
      for (let i = 1; i < 7; i++) {
        const latY = cy - radius + (i / 7) * (radius * 2);
        const r = Math.sqrt(radius * radius - (latY - cy) * (latY - cy));
        ctx.strokeStyle = 'rgba(59, 130, 246, 0.08)';
        ctx.beginPath();
        ctx.moveTo(cx - r, latY);
        ctx.lineTo(cx + r, latY);
        ctx.stroke();
      }

      // Connecting arcs
      leadsOnGlobe.forEach((lead, idx) => {
        if (idx === leadsOnGlobe.length - 1) return;
        const nextLead = leadsOnGlobe[idx + 1];
        const t1 = lead.lat * Math.PI;
        const p1 = lead.lon * 2 * Math.PI + rotation;
        const x1 = cx + radius * Math.cos(t1) * Math.sin(p1);
        const y1 = cy + radius * Math.sin(t1);
        const z1 = Math.cos(p1);

        const t2 = nextLead.lat * Math.PI;
        const p2 = nextLead.lon * 2 * Math.PI + rotation;
        const x2 = cx + radius * Math.cos(t2) * Math.sin(p2);
        const y2 = cy + radius * Math.sin(t2);
        const z2 = Math.cos(p2);

        if (z1 > -0.1 && z2 > -0.1) {
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          const midX = (x1 + x2) / 2 + (y2 - y1) * 0.1;
          const midY = (y1 + y2) / 2 - (x2 - x1) * 0.1;
          ctx.quadraticCurveTo(midX, midY, x2, y2);
          const arcGrad = ctx.createLinearGradient(x1, y1, x2, y2);
          arcGrad.addColorStop(0, 'rgba(59, 130, 246, 0.4)');
          arcGrad.addColorStop(1, 'rgba(16, 185, 129, 0.1)');
          ctx.strokeStyle = arcGrad;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      });

      // Pins & Labels
      leadsOnGlobe.forEach((lead) => {
        const theta = lead.lat * Math.PI;
        const phi = lead.lon * 2 * Math.PI + rotation;
        const x = cx + radius * Math.cos(theta) * Math.sin(phi);
        const y = cy + radius * Math.sin(theta);
        const z = Math.cos(phi);

        if (z > 0.0) {
          const ringRadius = 6 + Math.abs(Math.sin(Date.now() / 400 + theta) * 10);
          ctx.beginPath();
          ctx.arc(x, y, ringRadius, 0, Math.PI * 2);
          ctx.strokeStyle = lead.color;
          ctx.lineWidth = 1;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(x, y, 4, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.shadowColor = lead.color;
          ctx.shadowBlur = 10;
          ctx.fill();
          ctx.shadowBlur = 0;

          if (z > 0.4) {
            const labelX = x + 12;
            const labelY = y - 10;
            const labelWidth = 140;
            const labelHeight = 32;

            ctx.fillStyle = 'rgba(12, 16, 27, 0.85)';
            ctx.strokeStyle = 'rgba(59, 130, 246, 0.3)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.roundRect(labelX, labelY, labelWidth, labelHeight, 4);
            ctx.fill();
            ctx.stroke();

            ctx.font = 'bold 9px "Plus Jakarta Sans", sans-serif';
            ctx.fillStyle = '#ffffff';
            ctx.fillText(lead.name, labelX + 8, labelY + 12);

            ctx.font = '8px "Plus Jakarta Sans", sans-serif';
            ctx.fillStyle = lead.color;
            ctx.fillText(`⚡ ${lead.type}`, labelX + 8, labelY + 24);
          }
        }
      });

      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.3)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      animationFrameId = requestAnimationFrame(drawGlobe);
    };

    drawGlobe();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Footer Wavy Background & Rising Particles animation
  useEffect(() => {
    const canvas = footerCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const handleResize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // Particles array
    const particles = [];
    const particleCount = 25;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * (canvas.width || 800),
        y: Math.random() * 300 + 300, // start below
        size: Math.random() * 1.8 + 0.6,
        speedY: Math.random() * 0.6 + 0.3,
        speedX: Math.random() * 0.3 - 0.15,
        maxAlpha: Math.random() * 0.35 + 0.15,
        alpha: 0
      });
    }

    let phase = 0;

    const animate = () => {
      if (canvas.width === 0 || canvas.height === 0) {
        handleResize();
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width;
      const height = canvas.height;

      // 1. Draw subtle horizontal wavy lines
      ctx.lineWidth = 1;
      phase += 0.004;

      const waves = [
        { amplitude: 12, length: 0.002, speed: 0.01, color: 'rgba(59, 130, 246, 0.05)', yOffset: height * 0.4 },
        { amplitude: 18, length: 0.001, speed: -0.008, color: 'rgba(59, 130, 246, 0.04)', yOffset: height * 0.55 },
        { amplitude: 8, length: 0.003, speed: 0.015, color: 'rgba(16, 185, 129, 0.03)', yOffset: height * 0.7 },
        { amplitude: 15, length: 0.0015, speed: -0.005, color: 'rgba(59, 130, 246, 0.02)', yOffset: height * 0.25 }
      ];

      waves.forEach((w) => {
        ctx.strokeStyle = w.color;
        ctx.beginPath();
        for (let x = 0; x < width; x += 15) {
          const y = w.yOffset + w.amplitude * Math.sin(x * w.length + phase * (w.speed * 100));
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      });

      // 2. Draw rising particles
      particles.forEach((p) => {
        p.y -= p.speedY;
        p.x += p.speedX;

        // Calculate alpha based on vertical position
        if (p.y < height * 0.8) {
          p.alpha = (p.y / (height * 0.8)) * p.maxAlpha;
        } else {
          p.alpha = ((height - p.y) / (height * 0.2)) * p.maxAlpha;
        }

        // Reset particle if it leaves the top or alpha goes below 0
        if (p.y < -20 || p.alpha <= 0) {
          p.y = height + Math.random() * 40;
          p.x = Math.random() * width;
          p.alpha = 0;
          p.size = Math.random() * 1.8 + 0.6;
          p.speedY = Math.random() * 0.6 + 0.3;
          p.speedX = Math.random() * 0.3 - 0.15;
        }

        if (p.alpha > 0) {
          const radial = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
          radial.addColorStop(0, `rgba(59, 130, 246, ${p.alpha})`);
          radial.addColorStop(0.4, `rgba(96, 165, 250, ${p.alpha * 0.4})`);
          radial.addColorStop(1, 'rgba(59, 130, 246, 0)');
          ctx.fillStyle = radial;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    onDirectSearch(searchQuery);
  };

  const painPoints = [
    { 
      title: 'Manual Copy-Pasting Stalls Growth', 
      desc: 'SDRs wasting hours copy-pasting addresses and categorizing items manually into sheets.',
      solutionTitle: '🚀 Scraped in Seconds',
      solutionDesc: 'Crawls up to 2,500 leads in minutes. Captures coordinates, emails, socials, and operational status automatically.'
    },
    { 
      title: 'Bouncing Emails Ruin Domains', 
      desc: 'Blasting emails to invalid or closed mailboxes lands you directly in spam folders.',
      solutionTitle: '🛡 Real-time SMTP Handshake Check',
      solutionDesc: 'Verifies email mailbox validation status dynamically. Guarantees >95% deliverability rates.'
    },
    { 
      title: 'Missing Social Profiles', 
      desc: 'Cold reaching without looking at their LinkedIn, FB, or Instagram links makes emails feel spammy.',
      solutionTitle: '🔗 Auto-linked Social Profiles',
      solutionDesc: 'Identifies connected handles automatically. Instantly references company social profiles for outreach context.'
    },
    { 
      title: 'No Warmup Personalization Context', 
      desc: 'Pitching sites cold without knowing what tech stacks they use leads to massive rejection rates.',
      solutionTitle: '💡 Website Audit Scoring Insights',
      solutionDesc: 'Identifies missing pixels, poor mobile loading speeds, and missing SSL certs automatically to compile pitches.'
    }
  ];

  const useCases = [
    { 
      tag: 'Agencies', 
      title: 'Web Design & SEO Agencies', 
      desc: 'Pitch website redesigns or SEO speed optimization to local clinics or lawyers lacking SSL or running slow pages.',
      script: `Subject: Quick question regarding mobile performance for {{companyName}}\n\nHey {{owner}},\n\nI was reviewing dental clinics in {{city}} and noticed {{companyName}} loads quite slow on mobile devices (scoring only 64/100 on Lighthouse). This usually bounces 30% of potential bookings.\n\nWe recently optimized a clinic nearby and increased booking conversions by 20% in 14 days. Would you be open to seeing a 2-minute video overview on how to fix this?`
    },
    { 
      tag: 'Marketers', 
      title: 'Ads & Traffic Consultants', 
      desc: 'Find restaurant or spa targets that lack active Facebook Pixels or Google tags. Pitch targeted pixel retargeting setups.',
      script: `Subject: Question regarding Facebook Pixel for {{companyName}}\n\nHi {{owner}},\n\nI noticed you have over {{reviews}} reviews on Google Maps (congrats!) but your website lacks an active Facebook Pixel. This means you are losing out on retargeting visitors who leave without booking.\n\nWe set up a simple automated retargeting flow for a nearby business that brought in 12 new bookings last month. Open to a quick call Thursday?`
    },
    { 
      tag: 'B2B Sales', 
      title: 'Outbound B2B Teams', 
      desc: 'Scrape bulk categories, run SMTP validation to prevent bounce limits, and export direct to HubSpot pipelines.',
      script: `Subject: Partnerships with {{companyName}}\n\nHello {{owner}},\n\nWe have a list of local clients looking for services in {{city}} and noticed you are top-rated in the area.\n\nAre you currently accepting new leads? Let me know the best email to send over the project requirements details.\n\nBest,\n[Your Name]`
    },
    { 
      tag: 'SaaS', 
      title: 'Software Startups', 
      desc: 'Find brick-and-mortar storefronts, extract phone numbers, and pitch booking dashboards.',
      script: `Subject: Automating bookings for {{companyName}}\n\nHi {{owner}},\n\nI noticed {{companyName}} currently relies on manual phone lines for reservations. We built a simple booking widget that schedules clients automatically.\n\nCan I send over a quick mock dashboard to show how it functions?`
    }
  ];

  const recommendedPlan = getRecommendedPlan();

  return (
    <div style={{
      backgroundColor: 'var(--bg-primary)',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'var(--font-sans)',
      overflowY: 'auto'
    }}>
      
      {/* HEADER & NAVIGATION */}
      <header style={{
        padding: '18px 48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid var(--border-color)',
        backdropFilter: 'blur(10px)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: 'rgba(7, 11, 19, 0.85)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            backgroundColor: 'var(--accent-color)',
            color: '#ffffff',
            width: '34px',
            height: '34px',
            borderRadius: 'var(--radius-sm)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 10px var(--accent-glow)'
          }}>
            <Flame size={20} fill="#ffffff" />
          </div>
          <span style={{ fontSize: '1.3rem', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.02em' }}>
            LeadIntel
          </span>
        </div>

        <nav style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
          {['Problem', 'Features', 'Workflow', 'Use Cases', 'Pricing', 'FAQs'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              style={{
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                fontSize: '0.85rem',
                fontWeight: 500,
                transition: 'color var(--transition-fast)'
              }}
              onMouseEnter={(e) => e.target.style.color = '#ffffff'}
              onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}
            >
              {item}
            </a>
          ))}
        </nav>

        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <button 
            onClick={() => setPage('login')}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-primary)',
              fontSize: '0.875rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Login
          </button>
          <button 
            onClick={() => setPage('login')}
            className="btn btn-primary"
            style={{ padding: '8px 16px', fontSize: '0.85rem' }}
          >
            Start Free
          </button>
        </div>
      </header>

      {/* HERO & INTERACTIVE SEARCH */}
      <section style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '70px 24px',
        display: 'grid',
        gridTemplateColumns: '1.1fr 0.9fr',
        gap: '40px',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{
            alignSelf: 'flex-start',
            backgroundColor: 'rgba(37, 99, 235, 0.1)',
            border: '1px solid rgba(37, 99, 235, 0.3)',
            borderRadius: 'var(--radius-full)',
            padding: '6px 14px',
            fontSize: '0.75rem',
            fontWeight: 700,
            color: 'var(--accent-hover)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            ⚡ Automated Lead Enrichment Engine
          </div>

          <h1 style={{
            fontSize: '3.6rem',
            lineHeight: 1.1,
            fontWeight: 800,
            letterSpacing: '-0.03em',
            background: 'linear-gradient(to right, #ffffff, #93c5fd, #60a5fa)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: 0
          }}>
            Find. Extract. Enrich.<br />Close More Deals.
          </h1>

          <p style={{
            fontSize: '1.05rem',
            lineHeight: 1.6,
            color: 'var(--text-secondary)',
            maxWidth: '520px',
            margin: 0
          }}>
            Extract highly targeted business contacts from Google Maps and the web. Unearth verified email addresses, social media links, and AI audit score insights in seconds.
          </p>

          <form onSubmit={handleSubmit} style={{
            backgroundColor: 'var(--bg-tertiary)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            padding: '8px',
            display: 'flex',
            gap: '12px',
            maxWidth: '520px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
            position: 'relative'
          }}>
            <input
              type="text"
              placeholder="Enter a search, e.g. Dentists in New York"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                flex: 1,
                background: 'none',
                border: 'none',
                outline: 'none',
                color: '#ffffff',
                paddingLeft: '12px',
                fontSize: '0.95rem'
              }}
            />
            <button type="submit" className="btn btn-primary" style={{ padding: '12px 24px' }}>
              Search Now
            </button>
          </form>

          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', marginTop: '10px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>✅ <strong>10,000+</strong> Leads Scraped Daily</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>✅ <strong>99.4%</strong> Email Accuracy Verification</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>✅ <strong>No Code</strong> Needed</span>
          </div>
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative'
        }}>
          <canvas 
            ref={canvasRef} 
            style={{ 
              maxWidth: '100%', 
              height: 'auto',
              filter: 'drop-shadow(0 0 40px rgba(59, 130, 246, 0.15))' 
            }}
          />
        </div>
      </section>

      {/* PAIN POINTS (Problem vs Solution Hover) */}
      <section id="problem" style={{
        backgroundColor: 'rgba(12, 16, 27, 0.4)',
        borderTop: '1px solid var(--border-color)',
        borderBottom: '1px solid var(--border-color)',
        padding: '80px 24px'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '50px' }}>
          <span style={{ color: 'var(--danger)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            The Outbound Problem
          </span>
          <h2 style={{ fontSize: '2.0rem', fontWeight: 800, color: '#ffffff' }}>
            Hover a Pain Point to See How We Solve It
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            Traditional lead generators leave you with chaotic spreadsheets. Move your cursor over a problem card to see the LeadIntel transformation.
          </p>
        </div>

        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '24px'
        }}>
          {painPoints.map((item, idx) => {
            const isHovered = hoveredPainPoint === idx;
            return (
              <div 
                key={idx} 
                className="card"
                onMouseEnter={() => setHoveredPainPoint(idx)}
                onMouseLeave={() => setHoveredPainPoint(null)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  borderLeft: isHovered ? '3px solid var(--success)' : '3px solid var(--danger)',
                  backgroundColor: isHovered ? 'rgba(16, 185, 129, 0.05)' : 'rgba(17, 22, 37, 0.75)',
                  transform: isHovered ? 'translateY(-10px) scale(1.03)' : 'none',
                  boxShadow: isHovered ? '0 15px 30px rgba(16, 185, 129, 0.1)' : 'none',
                  cursor: 'pointer',
                  minHeight: '200px',
                  justifyContent: 'center',
                  transition: 'all var(--transition-normal)'
                }}
              >
                <div style={{ 
                  color: isHovered ? 'var(--success)' : 'var(--danger)', 
                  display: 'inline-flex',
                  transition: 'color var(--transition-fast)'
                }}>
                  {isHovered ? <CheckCircle2 size={24} /> : <AlertTriangle size={24} />}
                </div>
                
                <h3 style={{ 
                  fontSize: '1rem', 
                  fontWeight: 700, 
                  color: '#ffffff', 
                  margin: 0 
                }}>
                  {isHovered ? item.solutionTitle : item.title}
                </h3>
                
                <p style={{ 
                  fontSize: '0.8rem', 
                  color: isHovered ? '#e2e8f0' : 'var(--text-secondary)', 
                  lineHeight: 1.5, 
                  margin: 0,
                  transition: 'color var(--transition-fast)'
                }}>
                  {isHovered ? item.solutionDesc : item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* THE SOLUTION WORKFLOW */}
      <section id="workflow" style={{ padding: '80px 24px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '60px' }}>
          <span style={{ color: 'var(--accent-hover)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            The Workflow
          </span>
          <h2 style={{ fontSize: '2.0rem', fontWeight: 800, color: '#ffffff' }}>
            How LeadIntel Solves Outbound in 3 Steps
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '30px',
          position: 'relative'
        }}>
          {[
            { step: '01', title: 'Target Map Crawlers', desc: 'Choose your business type (e.g. dentists, gyms) and location. LeadIntel crawls Google Maps and captures geographical coordinates and hours.' },
            { step: '02', title: 'Deep Extract & Verify', desc: 'Our scraper visits every business website, scans code for contacts, extracts emails and phone lines, and double-checks mailbox validity.' },
            { step: '03', title: 'Enrich & Auto Pitch', desc: 'Generates site performance speeds, social pixel audits, and score targets. Export directly into your CRM or download CSVs.' }
          ].map((s, idx) => (
            <div key={idx} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative', overflow: 'hidden' }}>
              <span style={{
                position: 'absolute',
                top: '-10px',
                right: '10px',
                fontSize: '4.5rem',
                fontWeight: 900,
                color: 'rgba(59, 130, 246, 0.04)',
                lineHeight: 1
              }}>{s.step}</span>
              
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent-glow)',
                color: 'var(--accent-hover)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '0.85rem'
              }}>{idx + 1}</div>

              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>{s.title}</h3>
              <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* NEW SECTION A: GOOGLE, APPLE, AND BING MAPS PLATFORMS SHOWCASE */}
      {/* ========================================================================= */}
      <section style={{
        backgroundColor: 'rgba(12, 16, 27, 0.4)',
        borderTop: '1px solid var(--border-color)',
        borderBottom: '1px solid var(--border-color)',
        padding: '80px 24px'
      }}>
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '50px',
          alignItems: 'center'
        }}>
          {/* Left Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { name: 'Google Maps', leads: '248M+ businesses', color: '#ea4335', icon: '🌍' },
              { name: 'Apple Maps', leads: '185M+ businesses', color: '#34a853', icon: '🍏' },
              { name: 'Bing Maps', leads: '142M+ businesses', color: '#4285f4', icon: '🌐' }
            ].map((p, i) => (
              <div key={i} className="card" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '18px 24px',
                borderLeft: `3px solid ${p.color}`
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <span style={{ fontSize: '1.5rem' }}>{p.icon}</span>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: 0 }}>{p.name}</h4>
                    <span style={{ fontSize: '0.75rem', color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                      <span style={{ width: '6px', height: '6px', backgroundColor: 'var(--success)', borderRadius: '50%', display: 'inline-block', boxShadow: '0 0 8px var(--success)' }} />
                      Connected
                    </span>
                  </div>
                </div>
                <strong style={{ color: 'var(--accent-hover)', fontSize: '0.9rem' }}>{p.leads}</strong>
              </div>
            ))}
          </div>
          {/* Right Text */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h2 style={{ fontSize: '2.0rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.2, margin: 0 }}>
              Google Maps, Apple Maps and Bing Maps Scraper
            </h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
              Extract business data from the three largest maps platforms in the world. Names, addresses, phone numbers, emails, websites, social media links, reviews and more — all in one place.
            </p>
            <button onClick={() => setPage('login')} className="btn btn-primary" style={{ alignSelf: 'flex-start', padding: '12px 28px' }}>
              Try for free now
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* NEW SECTION B: SEARCH BY LOCATION GEOGRAPHIES */}
      {/* ========================================================================= */}
      <section style={{ padding: '80px 24px', borderBottom: '1px solid var(--border-color)' }}>
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '50px',
          alignItems: 'center'
        }}>
          {/* Left Text */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h2 style={{ fontSize: '2.0rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.2, margin: 0 }}>
              Search by city, state or whole country
            </h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
              Access 4,000+ business categories. Target precisely by country, state, county or city across 195 countries to build localized cold call and email outreach lists.
            </p>
            <button onClick={() => setPage('login')} className="btn btn-primary" style={{ alignSelf: 'flex-start', padding: '12px 28px' }}>
              Try for free now
            </button>
          </div>

          {/* Right Mock UI Window */}
          <div className="card" style={{
            padding: 0,
            backgroundColor: 'var(--bg-secondary)',
            borderColor: 'var(--border-color)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}>
            {/* macOS window dots */}
            <div style={{
              display: 'flex',
              gap: '6px',
              padding: '12px 16px',
              backgroundColor: 'rgba(0,0,0,0.15)',
              borderBottom: '1px solid var(--border-color)'
            }}>
              <span style={{ width: '10px', height: '10px', backgroundColor: 'var(--danger)', borderRadius: '50%' }} />
              <span style={{ width: '10px', height: '10px', backgroundColor: 'var(--warning)', borderRadius: '50%' }} />
              <span style={{ width: '10px', height: '10px', backgroundColor: 'var(--success)', borderRadius: '50%' }} />
            </div>

            {/* Inputs grid */}
            <form onSubmit={handleSec2Search} style={{
              padding: '20px',
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '10px',
              backgroundColor: 'rgba(0,0,0,0.1)'
            }}>
              <div style={{ position: 'relative' }}>
                <Search size={12} style={{ position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input 
                  type="text" 
                  value={sec2Category}
                  onChange={(e) => setSec2Category(e.target.value)}
                  className="input-field" 
                  style={{ width: '100%', padding: '6px 6px 6px 26px', fontSize: '0.75rem', borderRadius: '6px' }} 
                />
              </div>
              <div style={{ position: 'relative' }}>
                <MapPin size={12} style={{ position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input 
                  type="text" 
                  value={sec2City}
                  onChange={(e) => setSec2City(e.target.value)}
                  className="input-field" 
                  style={{ width: '100%', padding: '6px 6px 6px 26px', fontSize: '0.75rem', borderRadius: '6px' }} 
                />
              </div>
              <button type="submit" className="btn btn-primary btn-sm" style={{ borderRadius: '6px', padding: '6px' }}>
                {sec2State === 'searching' ? <Loader2 size={12} className="animate-spin" /> : 'Search'}
              </button>
            </form>

            {/* Results mock list */}
            <div style={{ minHeight: '160px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {sec2State === 'idle' && (
                <div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                  Click Search to simulate a lookup for Hotels in Paris
                </div>
              )}
              
              {sec2State === 'searching' && (
                <div style={{ display: 'flex', flex: 1, flexDirection: 'column', gap: '10px', justifyContent: 'center', alignItems: 'center', minHeight: '140px' }}>
                  <Loader2 size={20} className="animate-spin" style={{ color: 'var(--accent-hover)' }} />
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Scraping Paris servers...</span>
                </div>
              )}

              {sec2State === 'done' && sec2Leads.map((lead, index) => (
                <div key={index} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  paddingBottom: '8px',
                  borderBottom: '1px solid rgba(255,255,255,0.03)',
                  fontSize: '0.75rem'
                }} className="animate-fade-in">
                  <span style={{ fontWeight: 600, color: '#ffffff' }}>{lead.name}</span>
                  <span style={{ color: 'var(--accent-hover)', fontFamily: 'monospace' }}>{lead.email}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* NEW SECTION C: PRECISION FILTER CONTROLS */}
      {/* ========================================================================= */}
      <section style={{
        backgroundColor: 'rgba(12, 16, 27, 0.4)',
        borderBottom: '1px solid var(--border-color)',
        padding: '80px 24px'
      }}>
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '50px',
          alignItems: 'center'
        }}>
          {/* Left Mock UI Window */}
          <div className="card" style={{
            padding: 0,
            backgroundColor: 'var(--bg-secondary)',
            borderColor: 'var(--border-color)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}>
            {/* macOS window dots */}
            <div style={{
              display: 'flex',
              gap: '6px',
              padding: '12px 16px',
              backgroundColor: 'rgba(0,0,0,0.15)',
              borderBottom: '1px solid var(--border-color)'
            }}>
              <span style={{ width: '10px', height: '10px', backgroundColor: 'var(--danger)', borderRadius: '50%' }} />
              <span style={{ width: '10px', height: '10px', backgroundColor: 'var(--warning)', borderRadius: '50%' }} />
              <span style={{ width: '10px', height: '10px', backgroundColor: 'var(--success)', borderRadius: '50%' }} />
            </div>

            {/* Interactive Filters Panel */}
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              
              {/* Toggles */}
              {[
                { label: 'Website', state: sec3Web, set: setSec3Web, icon: Globe },
                { label: 'Phone', state: sec3Phone, set: setSec3Phone, icon: Search },
                { label: 'Mobile', state: sec3Mobile, set: setSec3Mobile, icon: Smartphone },
                { label: 'Email', state: sec3Email, set: setSec3Email, icon: Mail },
              ].map((sw, i) => {
                const Icon = sw.icon;
                return (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', fontWeight: 600 }}>
                      <Icon size={14} style={{ color: 'var(--text-muted)' }} />
                      <span>{sw.label}</span>
                    </div>
                    <label className="switch">
                      <input type="checkbox" checked={sw.state} onChange={(e) => sw.set(e.target.checked)} />
                      <span className="slider"></span>
                    </label>
                  </div>
                );
              })}

              {/* Rating Range */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 600 }}>
                  <span>Rating Range</span>
                  <span style={{ color: 'var(--warning)' }}>{sec3Rating.toFixed(1)} - 5.0 ★</span>
                </div>
                <input 
                  type="range" 
                  min="1.0" 
                  max="5.0" 
                  step="0.5"
                  className="range-slider" 
                  value={sec3Rating} 
                  onChange={(e) => setSec3Rating(parseFloat(e.target.value))} 
                />
              </div>

              {/* Social Toggles */}
              {[
                { label: 'Facebook Pixel', state: sec3Fb, set: setSec3Fb },
                { label: 'Instagram Profile', state: sec3Ig, set: setSec3Ig }
              ].map((sw, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>{sw.label}</span>
                  <label className="switch">
                    <input type="checkbox" checked={sw.state} onChange={(e) => sw.set(e.target.checked)} />
                    <span className="slider"></span>
                  </label>
                </div>
              ))}

              {/* Live Count Results */}
              <div style={{
                borderTop: '1px solid var(--border-color)',
                paddingTop: '14px',
                textAlign: 'center',
                fontSize: '0.9rem',
                fontWeight: 700,
                color: 'var(--accent-hover)'
              }} className="animate-fade-in">
                ⚡ {filteredCountResult.toLocaleString()} results found
              </div>

            </div>
          </div>

          {/* Right Text */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h2 style={{ fontSize: '2.0rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.2, margin: 0 }}>
              Filter results with precision
            </h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
              Filter by website, phone, email, rating, reviews, social media presence and pixel tracking. Combine multiple criteria dynamically to find exactly the leads you need.
            </p>
            <button onClick={() => setPage('login')} className="btn btn-primary" style={{ alignSelf: 'flex-start', padding: '12px 28px' }}>
              Try for free now
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* NEW SECTION D: CONTINUOUS DATA UPDATES (Crawler Statuses) */}
      {/* ========================================================================= */}
      <section style={{ padding: '80px 24px', borderBottom: '1px solid var(--border-color)' }}>
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.8fr',
          gap: '50px',
          alignItems: 'center'
        }}>
          {/* Left Text */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h2 style={{ fontSize: '2.0rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.2, margin: 0 }}>
              Continuous data updates
            </h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
              No more outdated databases or broken mailboxes. LeadIntel continuously verifies and updates records in the background so you always get valid, fresh, and accurate business information.
            </p>
            <button onClick={() => setPage('login')} className="btn btn-primary" style={{ alignSelf: 'flex-start', padding: '12px 28px' }}>
              Try for free now
            </button>
          </div>

          {/* Right Mock UI Window */}
          <div className="card" style={{
            padding: 0,
            backgroundColor: 'var(--bg-secondary)',
            borderColor: 'var(--border-color)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}>
            {/* macOS window dots */}
            <div style={{
              display: 'flex',
              gap: '6px',
              padding: '12px 16px',
              backgroundColor: 'rgba(0,0,0,0.15)',
              borderBottom: '1px solid var(--border-color)'
            }}>
              <span style={{ width: '10px', height: '10px', backgroundColor: 'var(--danger)', borderRadius: '50%' }} />
              <span style={{ width: '10px', height: '10px', backgroundColor: 'var(--warning)', borderRadius: '50%' }} />
              <span style={{ width: '10px', height: '10px', backgroundColor: 'var(--success)', borderRadius: '50%' }} />
            </div>

            {/* Updates list queue */}
            <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {sec4Jobs.map((job) => (
                <div key={job.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ color: job.status === 'completed' ? 'var(--success)' : 'var(--accent-hover)', display: 'inline-flex' }}>
                      {job.status === 'completed' ? (
                        <CheckCircle2 size={16} style={{ color: 'var(--success)' }} />
                      ) : (
                        <Loader2 size={16} className="animate-spin" />
                      )}
                    </div>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#ffffff' }}>{job.name}</span>
                  </div>
                  <strong style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    {job.results} results
                  </strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CORE FEATURES GRID */}
      <section id="features" style={{
        backgroundColor: 'rgba(12, 16, 27, 0.4)',
        borderTop: '1px solid var(--border-color)',
        borderBottom: '1px solid var(--border-color)',
        padding: '80px 24px'
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '50px' }}>
            <span style={{ color: 'var(--success)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Feature Set
            </span>
            <h2 style={{ fontSize: '2.0rem', fontWeight: 800, color: '#ffffff' }}>
              Built to Automate Your Cold Outreach Prospecting
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px'
          }}>
            {[
              { icon: Globe, title: 'Google Maps Scraper', desc: 'Harvest locations, ratings, categories, coordinates, and hours directly from Maps results in real-time.' },
              { icon: Mail, title: 'Enrichment Finder', desc: 'Discovers verified contact mailboxes and telephone lines from target homepages and contacts sub-routes.' },
              { icon: Users, title: 'Social Profiler linkers', desc: 'Pulls LinkedIn links, Facebook profiles, Instagram links, and X accounts associated with targets.' },
              { icon: Zap, title: 'AI Pitch Scoring Engine', desc: 'Analyzes target sites for performance, security grade, SSL status, and missing advertising pixels to score pitch suitability.' },
              { icon: Database, title: 'Bulk CSV Import & Queue', desc: 'Upload templates containing dozens of keywords in CSV format to trigger crawler tasks automatically in parallel.' },
              { icon: Download, title: 'Export & Sync hubs', desc: 'Deliver clean files (Excel, CSV format) or sync results to platforms like HubSpot, Pipedrive, and Zapier Webhooks.' }
            ].map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className="card" style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{
                    backgroundColor: 'rgba(255,255,255,0.03)',
                    border: '1px solid var(--border-color)',
                    padding: '10px',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--accent-hover)',
                    flexShrink: 0
                  }}>
                    <Icon size={20} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>{f.title}</h3>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>{f.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* INTERACTIVE USE CASES (Click to reveal Cold Outreach Email script!) */}
      <section id="use-cases" style={{ padding: '80px 24px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '50px' }}>
          <span style={{ color: 'var(--accent-hover)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Who Uses LeadIntel?
          </span>
          <h2 style={{ fontSize: '2.0rem', fontWeight: 800, color: '#ffffff' }}>
            Click Any Card to Unlock Vetted Outreach Scripts
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            We don't just find leads—we show you exactly what to write to convert them.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '24px'
        }}>
          {useCases.map((uc, i) => {
            const isScriptOpen = activeScriptIdx === i;
            return (
              <div 
                key={i} 
                className="card"
                onClick={() => setActiveScriptIdx(isScriptOpen ? null : i)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                  cursor: 'pointer',
                  border: isScriptOpen ? '1.5px solid var(--accent-color)' : '1px solid var(--border-color)',
                  backgroundColor: isScriptOpen ? 'rgba(37,99,235,0.03)' : 'rgba(17,22,37,0.75)',
                  gridColumn: isScriptOpen ? '1 / -1' : 'auto', // Expands full-width when clicked!
                  transition: 'all var(--transition-normal)'
                }}
              >
                <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="badge badge-info" style={{ fontSize: '0.65rem' }}>{uc.tag}</span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    {isScriptOpen ? 'Click to hide script ▲' : 'Click to view script ▼'}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.0rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>{uc.title}</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>{uc.desc}</p>

                {/* Expanded outreach script details */}
                {isScriptOpen && (
                  <div 
                    onClick={(e) => e.stopPropagation()} // Prevent closing when clicking script content
                    style={{
                      marginTop: '16px',
                      padding: '16px',
                      backgroundColor: 'var(--bg-input)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-md)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                      animation: 'fadeIn var(--transition-fast)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                        Vetted Cold Outreach Template
                      </span>
                      <button 
                        onClick={() => handleCopyScript(uc.script)}
                        className="btn btn-secondary btn-xs"
                        style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
                      >
                        {copiedScript ? (
                          <>
                            <Check size={12} style={{ color: 'var(--success)' }} />
                            <span style={{ color: 'var(--success)' }}>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy size={12} />
                            <span>Copy Script</span>
                          </>
                        )}
                      </button>
                    </div>

                    <pre style={{
                      margin: 0,
                      whiteSpace: 'pre-wrap',
                      fontFamily: 'monospace',
                      fontSize: '0.8rem',
                      color: '#cbd5e1',
                      lineHeight: 1.4,
                      backgroundColor: 'rgba(0,0,0,0.15)',
                      padding: '12px',
                      borderRadius: 'var(--radius-sm)'
                    }}>
                      {uc.script}
                    </pre>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* INTERACTIVE PRICING (Cost savings calculator slider + plans highlight) */}
      <section id="pricing" style={{
        backgroundColor: 'rgba(12, 16, 27, 0.4)',
        borderTop: '1px solid var(--border-color)',
        borderBottom: '1px solid var(--border-color)',
        padding: '80px 24px'
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
            <span style={{ color: 'var(--accent-hover)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              ROI Estimation
            </span>
            <h2 style={{ fontSize: '2.0rem', fontWeight: 800, color: '#ffffff' }}>
              Estimate Your Lead Volume & Cost Savings
            </h2>
          </div>

          {/* Interactive Calculator Slider Card */}
          <div className="card" style={{
            maxWidth: '650px',
            margin: '0 auto 50px',
            backgroundColor: 'var(--bg-secondary)',
            borderColor: 'var(--border-color)',
            padding: '28px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Leads needed monthly:</span>
                <strong style={{ fontSize: '1.2rem', color: 'var(--accent-hover)' }}>{leadsVolume.toLocaleString()} Leads</strong>
              </div>
              <input 
                type="range" 
                min="1000" 
                max="50000" 
                step="1000"
                className="range-slider"
                value={leadsVolume}
                onChange={(e) => setLeadsVolume(parseInt(e.target.value))}
              />
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1.2fr 0.8fr',
              gap: '20px',
              borderTop: '1px solid var(--border-color)',
              paddingTop: '18px',
              alignItems: 'center'
            }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Recommended subscription:</span>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '4px' }}>
                  <strong style={{ fontSize: '1.25rem', color: '#ffffff' }}>{recommendedPlan.name} Plan</strong>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>({recommendedPlan.price})</span>
                </div>
              </div>
              <div style={{
                backgroundColor: 'var(--success-glow)',
                border: '1px solid rgba(16, 185, 129, 0.2)',
                borderRadius: 'var(--radius-sm)',
                padding: '8px 12px',
                textAlign: 'center'
              }}>
                <span style={{ fontSize: '0.65rem', color: 'var(--success)', fontWeight: 700, textTransform: 'uppercase', display: 'block' }}>
                  Estimated Savings
                </span>
                <strong style={{ fontSize: '1.1rem', color: 'var(--success)' }}>
                  {recommendedPlan.savings}
                </strong>
              </div>
            </div>
          </div>

          {/* Pricing cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
            alignItems: 'stretch',
            maxWidth: '900px',
            margin: '0 auto'
          }}>
            {[
              { name: 'Starter', price: '$39', credits: '5,000', features: ['Google Maps Extractor', 'Social media checks', 'CSV export formats', 'Standard email support'] },
              { name: 'Pro', price: '$99', credits: '20,000', popular: true, features: ['Google Maps Extractor', 'AI Website performance scores', 'Verified email & phone extraction', 'CRM sync (HubSpot, Salesforce)', 'Priority chat support'] },
              { name: 'Enterprise', price: '$249', credits: '60,000', features: ['Uncapped parallel scraping', 'API token access keys', 'Dedicated Webhook endpoints', 'Custom tech audit reports', 'Dedicated account manager'] }
            ].map((plan, idx) => {
              const isRecommended = recommendedPlan.name === plan.name;
              return (
                <div key={idx} className="card" style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                  borderColor: isRecommended ? 'var(--accent-color)' : 'var(--border-color)',
                  backgroundColor: isRecommended ? 'rgba(37,99,235,0.02)' : 'rgba(17,22,37,0.75)',
                  boxShadow: isRecommended ? '0 12px 30px var(--accent-glow)' : 'none',
                  transform: isRecommended ? 'translateY(-8px)' : 'none',
                  position: 'relative',
                  transition: 'all var(--transition-normal)'
                }}>
                  {isRecommended && (
                    <span className="badge badge-info" style={{
                      position: 'absolute',
                      top: '-10px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      fontSize: '0.65rem',
                      backgroundColor: 'var(--accent-color)'
                    }}>
                      Recommended Choice
                    </span>
                  )}
                  
                  <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', margin: '0 0 6px 0' }}>{plan.name}</h3>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', margin: '12px 0' }}>
                      <span style={{ fontSize: '2.0rem', fontWeight: 800, color: '#ffffff' }}>{plan.price}</span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>/ month</span>
                    </div>
                    <strong style={{ fontSize: '0.85rem', color: 'var(--accent-hover)', display: 'block' }}>
                      {plan.credits} credits / month
                    </strong>
                  </div>

                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    fontSize: '0.75rem',
                    color: 'var(--text-secondary)',
                    borderTop: '1px solid var(--border-color)',
                    paddingTop: '16px',
                    flex: 1
                  }}>
                    {plan.features.map((f, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ color: 'var(--success)' }}>✔</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <button 
                    onClick={() => setPage('login')}
                    className={`btn ${isRecommended ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ width: '100%', marginTop: '12px' }}
                  >
                    Get Started
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ ACCORDION */}
      <section id="faqs" style={{ padding: '80px 24px', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '50px' }}>
          <span style={{ color: 'var(--accent-hover)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            FAQ
          </span>
          <h2 style={{ fontSize: '2.0rem', fontWeight: 800, color: '#ffffff' }}>
            Frequently Asked Questions
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            { q: 'Is scraping Google Maps legal?', a: 'Yes. Collecting public information listed publicly on Google Maps (like business name, address, rating, and public phone lines) is legal. We only gather data that is accessible to the public on the web.' },
            { q: 'How are email addresses verified?', a: 'Once our crawlers extract an email address, we run active SMTP mailbox verification. This ensures the inbox actually exists and is able to receive mail, preventing hard bounces and spam listings.' },
            { q: 'What does 1 credit represent?', a: '1 credit is spent for every lead successfully extracted and enriched with phone number, website audit logs, social profile networks, and AI scores.' },
            { q: 'Can I export details directly to HubSpot?', a: 'Yes, our Pro and Enterprise plans allow you to integrate API key permissions to push scraped leads directly to HubSpot, Pipedrive, or CRM pipelines.' }
          ].map((faq, idx) => {
            const isOpen = !!faqOpen[idx];
            return (
              <div 
                key={idx}
                style={{
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-secondary)',
                  overflow: 'hidden'
                }}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  style={{
                    width: '100%',
                    padding: '16px 20px',
                    background: 'none',
                    border: 'none',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    color: '#ffffff',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    textAlign: 'left'
                  }}
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {isOpen && (
                  <div style={{
                    padding: '0 20px 20px',
                    fontSize: '0.8rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.5,
                    borderTop: '1px solid rgba(255,255,255,0.02)',
                    paddingTop: '12px'
                  }}>
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* FINAL CTA BANNER */}
      <section style={{
        padding: '80px 24px',
        textAlign: 'center',
        background: 'linear-gradient(180deg, rgba(7, 11, 19, 1) 0%, rgba(37, 99, 235, 0.1) 100%)',
        borderTop: '1px solid var(--border-color)'
      }}>
        <div style={{
          maxWidth: '600px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          alignItems: 'center'
        }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.1, margin: 0 }}>
            Supercharge Your B2B Sales Pipeline Today
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', margin: 0 }}>
            Stop spending hours scraping manually. Build qualified B2B pipelines and close more deals.
          </p>
          <button 
            onClick={() => setPage('login')}
            className="btn btn-primary"
            style={{ padding: '14px 32px', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <span>Start Free Trial</span>
            <ArrowRight size={18} />
          </button>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            No credit card required • Get 100 free credits immediately
          </span>
        </div>
      </section>

      {/* FOOTER WITH DYNAMIC WAVE CANVAS & RISING PARTICLES */}
      <footer style={{
        borderTop: '1px solid var(--border-color)',
        padding: '60px 24px',
        backgroundColor: '#05070a',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px'
      }}>
        {/* Canvas Background Overlay */}
        <canvas 
          ref={footerCanvasRef} 
          style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            pointerEvents: 'none',
            zIndex: 1
          }} 
        />

        {/* Footer Content Wrapper */}
        <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', textAlign: 'center' }}>
          
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '24px',
            marginBottom: '4px'
          }}>
            {['Product', 'Pricing', 'API Docs', 'Privacy Policy', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase().replace(' ', '-')}`} 
                style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.85rem', transition: 'color 0.2s' }}
                onMouseEnter={(e) => e.target.style.color = '#ffffff'}
                onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}
              >
                {item}
              </a>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
            <Flame size={16} fill="var(--accent-color)" style={{ color: 'var(--accent-color)' }} />
            <span style={{ color: '#ffffff', fontWeight: 700, fontSize: '0.95rem' }}>LeadIntel</span>
          </div>

          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>
            © 2026 LeadIntel Inc. All rights reserved. Built for B2B outbound agencies.
          </p>

        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
