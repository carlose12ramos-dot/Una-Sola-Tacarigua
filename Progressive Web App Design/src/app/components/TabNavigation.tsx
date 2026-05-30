import { useState, ReactNode } from 'react';

export interface Tab {
  id: string;
  label: string;
  content: ReactNode;
}

interface TabNavigationProps {
  tabs: Tab[];
}

export function TabNavigation({ tabs }: TabNavigationProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || '');

  return (
    <div className="w-full">
      {/* Tab Headers */}
      <div className="flex flex-wrap gap-3 mb-8 relative">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="px-8 py-3.5 transition-all relative rounded-xl overflow-hidden"
            style={{
              background: activeTab === tab.id
                ? 'linear-gradient(135deg, var(--oxford-navy) 0%, #2a4a75 100%)'
                : 'rgba(244, 241, 222, 0.3)',
              color: activeTab === tab.id ? 'var(--cream)' : 'var(--oxford-navy)',
              transition: 'var(--transicion-suave)',
              fontWeight: activeTab === tab.id ? '700' : '600',
              border: '2px solid',
              borderColor: activeTab === tab.id ? 'var(--goldenrod)' : 'transparent',
              boxShadow: activeTab === tab.id
                ? '0 6px 20px rgba(29, 53, 87, 0.25)'
                : '0 2px 8px rgba(0, 0, 0, 0.05)'
            }}
            onMouseEnter={(e) => {
              if (activeTab !== tab.id) {
                e.currentTarget.style.background = 'rgba(218, 165, 32, 0.15)';
                e.currentTarget.style.borderColor = 'var(--copper)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== tab.id) {
                e.currentTarget.style.background = 'rgba(244, 241, 222, 0.3)';
                e.currentTarget.style.borderColor = 'transparent';
                e.currentTarget.style.transform = 'translateY(0)';
              }
            }}
          >
            {tab.label}
            {/* Active indicator bar */}
            {activeTab === tab.id && (
              <div
                className="absolute bottom-0 left-0 w-full h-1"
                style={{
                  background: 'linear-gradient(90deg, var(--goldenrod), var(--copper))',
                  animation: 'slideInRight 0.3s ease-out'
                }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="relative">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className="transition-all duration-500"
            style={{
              opacity: activeTab === tab.id ? 1 : 0,
              display: activeTab === tab.id ? 'block' : 'none',
              animation: activeTab === tab.id ? 'fadeInUp 0.5s ease-out' : 'none'
            }}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
}
