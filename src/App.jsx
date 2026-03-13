import { useState, useEffect, useRef } from 'react';
import BeliefCard from './BeliefCard';
import ToggleSwitch from './ToggleSwitch';
import UploadPanel from './UploadPanel';

function App() {
  const initialBeliefs = [
    {
      name: "SELF-WORTH",
      fearState: {
        tag: "FEAR",
        media: ["https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExaXIzcDJ6M3hyd2Ewb3RydXNvNTduMGp6a2szNnZsdnozYTUxejlkeCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xjvzluZ4z40kNtaS8g/giphy.gif"]
      },
      courageState: {
        tag: "COURAGE",
        media: ["https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3ZmVzMzJxbGx0eWRsZGV5aGswcHE0N3dwazdjaWkwZXBybHV2czhlZyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/kw0XK5ROoezOUMEnjF/giphy.gif"]
      }
    },
    {
      name: "CONNECTION",
      fearState: {
        tag: "ISOLATION",
        media: ["https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3cWpoNnVybTJpamV3NHUxbGE1cWl0ZmRobm9qYXBmZWo5dml1dmJlcSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/vdKeYfTfXbKs8FHTuy/giphy.gif"]
      },
      courageState: {
        tag: "BELONGING",
        media: ["https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3Ymw4eng0MGdrbjh6ZWJma2U0OGVxa3AwY3Fwdmw3cnR1NTNwa3h1eCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/vy9FyphoNX6SSOZRlr/giphy.gif"]
      }
    },
    {
      name: "GROWTH",
      fearState: {
        tag: "STAGNATION",
        media: ["https://media.istockphoto.com/id/1925095852/video/consultation-with-a-psychologist.mp4?s=mp4-640x640-is&k=20&c=QYEH1p7PHqV2MsuUXARrmyvj6ISLz0QJ-rfL08RjrNU="]
      },
      courageState: {
        tag: "EXPANSION",
        media: ["https://media.istockphoto.com/id/1053110944/video/female-diver-diving-into-the-blue-pool-and-rotating-in-the-air.mp4?s=mp4-640x640-is&k=20&c=QVnDHd-48cJuZ15ZAtKtns4_PQY6h5uCKds4vUWiAgY="]
      }
    },
    {
      name: "CONVERSATIONS",
      fearState: {
        tag: "RESERVED",
        media: ["https://media.istockphoto.com/id/1353885351/video/man-looking-away-contemplating-at-home.mp4?s=mp4-640x640-is&k=20&c=1x9VoDnmnp2OUJ_qdC0fWbN77sSkppgZpw3YDANVpQE="]
      },
      courageState: {
        tag: "OPEN",
        media: ["https://media.istockphoto.com/id/629177256/video/mature-female-friends-socializing-in-backyard-together.mp4?s=mp4-640x640-is&k=20&c=Vvt6HZnwBoakqu9wiPMkcuAEZFbTE7cAXlJeTdkYHQs="]
      }
    },
    {
      name: "CHOICE",
      fearState: {
        tag: "PARALYSIS",
        media: ["https://media.istockphoto.com/id/2105470058/video/stress-anxiety-and-woman-biting-nails-in-home-with-fear-worry-and-mental-health-risk-face-of.mp4?s=mp4-640x640-is&k=20&c=iCH_PgQinuGGOzBIA-AY0jljwKOJjnoqDqyk_gzJJQw="]
      },
      courageState: {
        tag: "DECISIVENESS",
        media: ["https://media.istockphoto.com/id/1486865540/video/black-maze.mp4?s=mp4-640x640-is&k=20&c=8qU_LDjOcgv6UCNXCGP7_DZKwjbSSr6CuEpsK3f7F00="]
      }
    },
    {
      name: "DESIRE",
      fearState: {
        tag: "EMPTINESS",
        media: ["https://media.istockphoto.com/id/2102638948/video/a-woman-stands-against-the-wall.mp4?s=mp4-640x640-is&k=20&c=ABu8SMit40tddbl2QPgoUrS1erp746bjLXZYRZt55R8="]
      },
      courageState: {
        tag: "FULFILLMENT",
        media: ["https://media.istockphoto.com/id/1367569394/video/red-glowing-heart-shapes-light-beam-tunnel-animation-loopable-background-stock-video-the.mp4?s=mp4-640x640-is&k=20&c=qNL3jf3imovIFajGHClOiI12C2Auo_hPhkbhzMGwmbM="]
      }
    },
    {
      name: "PATIENCE",
      fearState: {
        tag: "RESTLESSNESS",
        media: ["https://media.istockphoto.com/id/1404441349/video/woman-in-bed-cant-sleep-due-to-insomnia.mp4?s=mp4-640x640-is&k=20&c=NaLbJ4lYGhC4pLSJZrtJ_CpFI9tlRD57N4xr0APGIIE="]
      },
      courageState: {
        tag: "CALM",
        media: ["https://media.istockphoto.com/id/2171649171/video/woman-practice-yoga-on-the-beach.mp4?s=mp4-640x640-is&k=20&c=IeXtnFN7nnx40su81dtTi4loVA6CP0WA7tPDwBPWW6k="]
      }
    },
    {
      name: "ACCEPTANCE",
      fearState: {
        tag: "RESISTANCE",
        media: ["https://media.istockphoto.com/id/2151975223/video/business-man-wall-and-trapped-in-city-outdoor-with-stress-crisis-or-corporate-challenge-of.mp4?s=mp4-640x640-is&k=20&c=k8sQUgryZblCrl4hiu8Oqn2PbTnu1__F4gNAsxJsatk="]
      },
      courageState: {
        tag: "SURRENDER",
        media: ["https://media.istockphoto.com/id/1828085832/video/a-hand-caresses-the-surface-of-the-sea-water-from-a-boat-at-sunset.mp4?s=mp4-640x640-is&k=20&c=jf9a6nbiHFEX0Ro0hlrjwULmwNoZ-NsfGb-E9OlR_no="]
      }
    },
    {
      name: "AMBITION",
      fearState: {
        tag: "COMPLACENCY",
        media: ["https://media.istockphoto.com/id/2063034193/video/slow-motion-close-up-of-ocean-ripples-and-waves.mp4?s=mp4-640x640-is&k=20&c=aU_Is--jTM_n-gGItatPDzsmV9dj0menC3zd6IVCB64="]
      },
      courageState: {
        tag: "DRIVE",
        media: ["https://media.istockphoto.com/id/1300424928/video/4k-animation-loop-futuristic-sci-fi-lines-white-neon-tube-lights-glowing-in-concrete-floor.mp4?s=mp4-640x640-is&k=20&c=FuSMVRKTqrI4MOyHNaraZx5Ya_0WrspjT7giPNVz_9o="]
      }
    },
  ];

  const [fearActive, setFearActive] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState('connecting');
  const [beliefs, setBeliefs] = useState(initialBeliefs);
  const [panelOpen, setPanelOpen] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!fearActive) {
      audio.play().catch(err => console.warn('Audio play failed:', err));
    } else {
      audio.pause();
    }
  }, [fearActive]);

  useEffect(() => {
    const memorySource = new EventSource('http://localhost:80/api/memories/stream');
    memorySource.onmessage = (event) => {
      const memory = JSON.parse(event.data);
      console.log("new memory", memory);
      setBeliefs(prev => {
        if (memory.position == null || memory.position < 0 || memory.position >= prev.length) return prev;
        const next = [...prev];
        next[memory.position] = {
          name: memory.name ?? prev[memory.position].name,
          fearState: {
            tag: memory.fearState?.tag ?? prev[memory.position].fearState?.tag,
            media: [memory.fearState?.videoUrl].filter(Boolean),
          },
          courageState: {
            tag: memory.courageState?.tag ?? prev[memory.position].courageState?.tag,
            media: [memory.courageState?.videoUrl].filter(Boolean),
          },
        };
        return next;
      });
    };
    memorySource.onerror = (err) => {
      console.error('Memories SSE error:', err);
      memorySource.close();
    };
    return () => memorySource.close();
  }, []);

  useEffect(() => {
    const eventSource = new EventSource('http://localhost:80/api/flags/stream');
    eventSource.onopen = () => {
      setConnectionStatus('connected');
    };
    eventSource.onmessage = (event) => {
      const flags = JSON.parse(event.data);
      setFearActive(flags.fear);
    };
    eventSource.onerror = (error) => {
      console.error('SSE error:', error);
      setConnectionStatus('error');
      eventSource.close();
    };
    return () => eventSource.close();
  }, []);

  return (
    <div className="relative min-h-screen bg-blade-runner-dark flex items-center justify-center p-8">
      <audio ref={audioRef} src="/audio/Vangelis - Memories of Green.mp3" />

      {/* Background Images */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <img
          src="/images/blade-runner-poster.jpg"
          className="absolute top-4 left-4 h-[50%] w-auto object-cover opacity-70"
          style={{ filter: 'saturate(0.6) hue-rotate(180deg)' }}
        />
        <img
          src="/images/skyline.jpg"
          className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[50%] h-auto object-cover opacity-70"
          style={{ filter: 'saturate(0.4)' }}
        />
        <img
          src="/images/rachael-closeup.jpg"
          className="absolute top-4 right-4 h-[50%] w-auto object-cover opacity-70"
          style={{ filter: 'saturate(0.5) hue-rotate(160deg)' }}
        />
        <div className="absolute inset-0 bg-blade-runner-dark/50" />
      </div>

      <h1
        className="absolute top-8 left-1/2 -translate-x-1/2 text-4xl font-bold tracking-widest uppercase"
        style={{
          color: 'var(--color-blade-runner-neon)',
          textShadow: '0 0 20px var(--color-blade-runner-neon)',
        }}
      >
        Rachael's Memories
      </h1>

      {/* Upload button - top left */}
      <button
        onClick={() => setPanelOpen(true)}
        className="absolute top-8 left-8 px-4 py-2 text-xs uppercase tracking-widest font-bold rounded-lg transition-all duration-200 z-10"
        style={{
          border: '1px solid var(--color-blade-runner-neon)',
          color: 'var(--color-blade-runner-neon)',
          backgroundColor: 'rgba(0,255,249,0.05)',
          boxShadow: '0 0 12px rgba(0,255,249,0.15)',
        }}
        onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(0,255,249,0.15)'}
        onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(0,255,249,0.05)'}
      >
        ↑ Upload Memories
      </button>

      <div className="flex items-center justify-center gap-12 w-full">
        {/* 3x3 Grid */}
        <div className="grid grid-cols-3 gap-3">
          {beliefs.map((belief, index) => (
            <div key={index} className="w-[200px] h-[200px]">
              <BeliefCard belief={belief} isActive={!fearActive} />
            </div>
          ))}
        </div>

        {/* Toggle Controls - Right Side */}
        <div className="flex flex-col gap-6">
          <ToggleSwitch
            label="FEAR"
            isActive={fearActive}
            onToggle={() => setFearActive(!fearActive)}
          />
          <div className="text-xs text-gray-400 text-center">
            <div className={connectionStatus === 'connected' ? 'text-blade-runner-neon' : 'text-blade-runner-orange'}>
              ● {connectionStatus === 'connected' ? 'Live' : 'Connecting...'}
            </div>
            <div>SSE Stream Active</div>
          </div>

          <p
            className="text-sm italic text-center max-w-[160px] leading-relaxed mt-4 relative z-20"
            style={{
              color: 'var(--color-blade-runner-orange)',
              textShadow: '0 0 10px var(--color-blade-runner-orange)',
            }}
          >
            "Quite an experience to live in fear. That's what it is to be a slave."
          </p>
        </div>
      </div>

      <div className="fixed top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-blade-runner-neon/50" />
      <div className="fixed bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-blade-runner-neon/50" />

      <UploadPanel isOpen={panelOpen} onClose={() => setPanelOpen(false)} />
    </div>
  );
}

export default App;