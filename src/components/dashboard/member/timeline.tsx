import React, { useState, useEffect } from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { MdOutlineTimeline } from "react-icons/md";
import { getTimelines } from '@/lib/AdminOps';

const TimelineComponent: React.FC = () => {
  const [timelineData, setTimelineData] = useState<{ date: string; title: string; }[]>([]);

  useEffect(() => {
    const fetchTimelineData = async () => {
      try {
        const response = await getTimelines();
        const formattedData = response.map((item) => ({
          date: item.Date,
          title: item.Title,
        }));
        setTimelineData(formattedData);
      } catch (error) {
        console.error('Error fetching timeline data:', error);
      }
    };

    fetchTimelineData();
  }, []);

  return (
    <VerticalTimeline>
      {timelineData.map((event, index) => (
        <VerticalTimelineElement
          key={index}
          date={event.date}
          iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
          icon={<MdOutlineTimeline />}
        >
          <h3 className="vertical-timeline-element-title">{event.title}</h3>
        </VerticalTimelineElement>
      ))}
    </VerticalTimeline>
  );
};

export default TimelineComponent;
