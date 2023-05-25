import React from 'react';
import styles from './styles.module.sass';
import { Col, Row, Typography } from 'antd';
import { format } from 'date-fns';
import * as Assets from '../assets/index';

interface SummaryItemHeaderProps {
  startTime: Date;
  subjectName: string;
  timerType: 15 | 25;
  rate: number;
}

const SummaryItemHeader: React.FC<SummaryItemHeaderProps> = ({ rate, startTime, subjectName }) => {
  return (
    <div className={styles.rowBox}>
      <Row className={styles.summaryItemTex} justify={'space-between'} align={'middle'}>
        <Col span={2}>
          <Typography.Text>{format(startTime, 'hh:mm')}</Typography.Text>
        </Col>
        <Col span={6}>{subjectName}</Col>
        <Col>
          <div className={styles.rowContainer}>
            <img className={styles.icon} src={Assets.Timer} alt="Timer" />
            <img className={styles.icon} src={Assets.Timer} alt="Timer" />
          </div>
        </Col>
        <Col span={4}>
          <div className={styles.rowContainer}>
            {[1, 2, 3, 4, 5].map((item) => (
              <img key={item} src={item <= rate ? Assets.StarFilled : Assets.Star} alt="star" />
            ))}
          </div>
        </Col>
        <Col span={3}>
          <Typography.Text>Summary</Typography.Text>
        </Col>
      </Row>
    </div>
  );
};

export default SummaryItemHeader;
