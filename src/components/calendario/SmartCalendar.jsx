import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './SmartCalendar.module.css';

const MONTH_NAMES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const DAY_NAMES   = ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'];

const SmartCalendar = ({ events, onSelectEvent }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const year  = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth   = new Date(year, month + 1, 0).getDate();
  const firstWeekday  = new Date(year, month, 1).getDay();

  const prevMonth = () => { setCurrentDate(new Date(year, month - 1, 1)); setSelectedDate(null); };
  const nextMonth = () => { setCurrentDate(new Date(year, month + 1, 1)); setSelectedDate(null); };

  const handleClick = (day) => {
    const d = new Date(year, month, day);
    setSelectedDate(d);
    const dayEvents = events.filter(e => e.mes === month + 1 && e.dia === day);
    onSelectEvent(dayEvents, d);
  };

  const cells = [];
  for (let i = 0; i < firstWeekday; i++) cells.push(<div key={`e-${i}`} className={styles.emptyDay} />);
  for (let day = 1; day <= daysInMonth; day++) {
    const isToday    = new Date().toDateString() === new Date(year, month, day).toDateString();
    const isSelected = selectedDate?.toDateString() === new Date(year, month, day).toDateString();
    const dayEvents  = events.filter(e => e.mes === month + 1 && e.dia === day);
    const hasEvents  = dayEvents.length > 0;

    cells.push(
      <motion.div
        key={day}
        className={`${styles.day} ${isToday ? styles.today : ''} ${isSelected ? styles.selected : ''} ${hasEvents ? styles.hasEvents : ''}`}
        onClick={() => handleClick(day)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <span className={styles.dayNumber}>{day}</span>
        {hasEvents && (
          <div className={styles.eventDots}>
            {dayEvents.slice(0, 3).map((e, i) => (
              <span key={i} className={`${styles.dot} ${styles[e.tipo] || ''}`} />
            ))}
            {dayEvents.length > 3 && <span className={styles.moreDots}>+</span>}
          </div>
        )}
      </motion.div>
    );
  }

  return (
    <div className={styles.calendarContainer}>
      {/* Header */}
      <div className={styles.header}>
        <button className={styles.navButton} onClick={prevMonth} aria-label="Mes anterior">
          <ChevronLeft size={18} />
        </button>
        <div style={{ textAlign: 'center' }}>
          <div className={styles.monthTitle}>{MONTH_NAMES[month]}</div>
          <div className={styles.yearTitle}>{year}</div>
        </div>
        <button className={styles.navButton} onClick={nextMonth} aria-label="Mes siguiente">
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Weekday labels */}
      <div className={styles.weekdays}>
        {DAY_NAMES.map(d => <div key={d} className={styles.weekday}>{d}</div>)}
      </div>

      {/* Days */}
      <div className={styles.daysGrid}>{cells}</div>

      {/* Legend */}
      <div className={styles.legend}>
        {[
          { key: 'historia',  label: 'Historia'   },
          { key: 'natalicio', label: 'Natalicio'  },
          { key: 'religiosa', label: 'Religioso'  },
          { key: 'cultural',  label: 'Cultural'   },
          { key: 'duelo',     label: 'Duelo'      },
        ].map(({ key, label }) => (
          <div key={key} className={styles.legendItem}>
            <span className={`${styles.legendDot} ${styles[key]}`} />
            {label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SmartCalendar;
