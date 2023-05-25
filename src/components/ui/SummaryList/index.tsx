import React from 'react';
import styles from './styles.module.sass';
import { Col, Collapse, Row, Typography } from 'antd';
import SummaryItemHeader from './SummaryItemHeader';
import { Lesson } from '../../../entities/Lesson';

interface SummaryListProps {
  data: Lesson[];
  dayCount: number;
  onDayChange: (dayCount: number) => void;
}

const SummaryList: React.FC<SummaryListProps> = ({ data, onDayChange, dayCount }) => {
  const handleChangeDay = (day: number) => {
    onDayChange(day);
  };

  const renderDay = (day: string, value: number, isActive: boolean) => (
    <Col>
      <div
        onClick={() => handleChangeDay(value)}
        key={day}
        className={`${styles.dayBox} ${isActive ? styles.dayBoxActive : ''}`}
      >
        <Typography.Text className={styles.dayName}>{day}</Typography.Text>
      </div>
    </Col>
  );

  const renderSummaryItem = (lesson: Lesson) => (
    <Collapse.Panel
      className={styles.collapseItemBox}
      key={lesson.id}
      header={
        <SummaryItemHeader
          startTime={new Date(lesson.startedAt)}
          subjectName={lesson.subject.name}
          timerType={lesson.duration}
          rate={lesson.summary[0].rate}
        />
      }
    >
      <div className={styles.collapsedBody}>{lesson.summary[0].description}</div>
    </Collapse.Panel>
  );

  return (
    <div className={styles.scheduleBox}>
      <Row gutter={[5, 20]}>
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day: string, index: number) =>
          renderDay(day, index + 1, index + 1 === dayCount),
        )}
      </Row>
      <Row>
        <Col span={24}>
          <Collapse expandIconPosition={'right'} className={styles.collapseContainer}>
            {data.map(renderSummaryItem)}
          </Collapse>
        </Col>
      </Row>
    </div>
  );
};

export default SummaryList;
