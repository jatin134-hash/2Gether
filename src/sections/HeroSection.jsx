import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BrainCircuit,
  Camera,
  ChevronRight,
  Heart,
  Mic,
  PhoneOff,
  Play,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  Video,
} from 'lucide-react';

const features = [
  {
    icon: Heart,
    value: '98%',
    title: 'Match Rate',
    tone: 'pink',
  },
  {
    icon: Video,
    value: 'HD',
    title: 'Video Calls',
    tone: 'blue',
  },
  {
    icon: ShieldCheck,
    value: 'Safe & Secure',
    title: 'Community',
    tone: 'mint',
  },
  {
    icon: Sparkles,
    value: 'People with',
    title: 'Similar Interests',
    tone: 'pink',
  },
  {
    icon: BrainCircuit,
    value: 'Smart',
    title: 'AI Matching',
    tone: 'violet',
  },
];

const statistics = [
  { icon: Users, value: '5M+', label: 'Happy Users' },
  { icon: Heart, value: '2M+', label: 'Successful Matches' },
  { icon: Video, value: '10M+', label: 'Video Calls Daily' },
  { icon: Star, value: '4.8★', label: 'App Rating' },
];

function VideoCallPhone({ person, name, city, image, otherImage, className, priority = false }) {
  return (
    <div className={`phone-shell ${className}`} aria-label={`${person} on a video call`}>
      <div className="phone-frame">
        <div className="phone-screen">
          <img
            className="phone-person"
            src={image}
            alt={`${person} smiling on a video call`}
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : 'auto'}
            decoding="async"
          />
          <div className="phone-camera-island" />
          <div className="phone-status">
            <span>9:41</span>
            <span className="phone-status-icons">● ▰</span>
          </div>
          <div className="phone-call-label">
            <span className="call-live-dot" />
            Live video
          </div>
          <div className="phone-preview">
            <img src={otherImage} alt="" loading="eager" decoding="async" />
          </div>
          <div className="phone-call-info">
            <span className="phone-call-time">02:38 · HD</span>
            <span className="phone-call-name">{name}</span>
            <span className="phone-call-city">{city}</span>
          </div>
          <div className="phone-controls" aria-label="Video call controls">
            <span className="phone-control"><Camera size={15} /></span>
            <span className="phone-control"><Mic size={15} /></span>
            <span className="phone-control phone-end-call"><PhoneOff size={16} /></span>
          </div>
          <div className="phone-home-indicator" />
        </div>
      </div>
    </div>
  );
}

export default function HeroSection() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    });
    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="hero" className={`hero-section relative overflow-hidden bg-[#050509] text-white${isVisible ? ' is-in-view' : ''}`}>
      <div className="hero-ambient" aria-hidden="true">
        <span className="hero-glow hero-glow-pink" />
        <span className="hero-glow hero-glow-blue" />
        <span className="hero-glow hero-glow-violet" />
        <span className="hero-particle hero-particle-one">♡</span>
        <span className="hero-particle hero-particle-two">✦</span>
        <span className="hero-particle hero-particle-three">♡</span>
      </div>

      <div className="hero-inner">
        <div className="hero-main">
          <div className="hero-copy">
            <div className="hero-eyebrow">
              <span className="hero-eyebrow-icon"><Sparkles size={14} /></span>
              <span>Find Your Person</span>
            </div>
            <h1>
              Real People.
              <br />
              Real Connections.
              <br />
              <span className="hero-title-gradient">Together.</span>
            </h1>
            <p className="hero-description">
              Meet, chat, and build meaningful connections with people who truly match your vibe.
            </p>
            <div className="hero-actions">
              <Link className="hero-button hero-button-primary" to="/signup">
                Create Account <ArrowRight size={18} />
              </Link>
              <a className="hero-button hero-button-secondary" href="#how-it-works">
                <Play size={16} fill="currentColor" /> Watch Video
              </a>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-visual-orbit hero-visual-orbit-one" aria-hidden="true" />
            <div className="hero-visual-orbit hero-visual-orbit-two" aria-hidden="true" />
            <div className="phone-stage">
              <VideoCallPhone
                person="Alex"
                name="Manuel, 32"
                city="Your next connection"
                image="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80"
                otherImage="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=180&q=80"
                className="phone-boy"
                priority
              />
              <div className="connection-heart" aria-label="Two people, one connection">
                <Heart size={21} fill="currentColor" />
              </div>
              <div className="connection-trail connection-trail-one" aria-hidden="true" />
              <div className="connection-trail connection-trail-two" aria-hidden="true" />
              <VideoCallPhone
                person="Maya"
                name="Elen, 30"
                city="Online now"
                image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80"
                otherImage="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=180&q=80"
                className="phone-girl"
                priority
              />
            </div>
          </div>
        </div>

        <div id="features" className="hero-feature-grid" aria-label="Ways to connect on 2Gether">
          {features.map(({ icon: Icon, value, title, tone }) => (
            <article
              key={`${value}-${title}`}
              className={`hero-feature-card feature-tone-${tone}`}
            >
              <span className="feature-icon"><Icon size={17} /></span>
              <div className="feature-copy">
                <strong>{value}</strong>
                <span>{title}</span>
              </div>
              <ChevronRight className="feature-arrow" size={16} />
            </article>
          ))}
        </div>

        <div className="hero-stat-row" aria-label="2Gether community statistics">
          {statistics.map(({ icon: Icon, value, label }) => (
            <div className="hero-stat-card" key={label}>
              <span className="stat-icon"><Icon size={17} /></span>
              <div><strong>{value}</strong><span>{label}</span></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
