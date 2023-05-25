import { Student } from 'entities/Student';
import React from 'react';
import { Lesson } from 'entities/Lesson';
import moment from 'moment';

interface MailProps {
  lessons: Lesson[];
  date: Date;
  note: string;
  sender: Student;
}

const styles = {
  h1: {
    fontSize: '24px',
    lineHeight: '34px',
  },
  h2: {
    fontSize: '16px',
    lineHeight: '24px',
    fontWeight: 600,
  },
  body1: {
    fontSize: '14px',
    lineHeight: '24px',
    color: '#383541',
    fontWeight: 500,
  },
  fullWidth: {
    width: '100%',
  },
  blackText: {
    color: 'black',
  },
  selfCenter: {
    margin: '0px auto',
  },
  goButton: {
    border: 'none',
    textDecoration: 'none',
    background: '#0091FF',
    padding: '10px 16px',
    color: '#FFFFFF',
    borderRadius: 10,
    cursor: 'pointer',
    marginBottom: 30,
    marginTop: 30,
  },
};

const Mail: React.FC<MailProps> = ({ lessons, date, note, sender }) => {
  return (
    <div
      style={{
        width: 450,
        paddingTop: 20,
        paddingBottom: 20,
      }}
    >
      <div style={{ ...styles.fullWidth, textAlign: 'center', padding: '10px 0' }}>
        <span style={{ ...styles.h1, color: '#0091FF' }}>{`${
          sender.firstName
        }'s Study Diary of ${moment(date).format('DD.MM.yyyy')}`}</span>
      </div>
      <div style={{ ...styles.fullWidth, marginBottom: 30 }}>
        {lessons.map((lesson: Lesson, index: number) => (
          <div key={index} style={styles.fullWidth}>
            <div style={styles.fullWidth}>
              <span style={{ ...styles.h2, ...styles.blackText }}>{`${index + 1}. Subject: ${
                lesson.subject.name
              }, Topic: ${lesson.subject.name}`}</span>
            </div>
            <div style={{ paddingLeft: 20 }}>
              <div>
                <span
                  style={{ ...styles.blackText, ...styles.body1 }}
                >{`Spent time: ${lesson.summary[0].timeSpent}. Score: ${lesson.summary[0].rate}`}</span>
              </div>
              <div>
                <span
                  style={{ ...styles.blackText, ...styles.body1 }}
                >{`Summarize: ${lesson.summary[0].description}`}</span>
              </div>
              {/* <div>*/}
              {/*    <span*/}
              {/*        style={{ ...styles.blackText, ...styles.body1 }}*/}
              {/*    >{`Something: SOMETHING`}</span>*/}
              {/* </div>*/}
            </div>
          </div>
        ))}
      </div>
      <div style={styles.fullWidth}>
        <span style={{ ...styles.h2, color: '#0091FF' }}>Note from student:</span>
        <span style={{ ...styles.body1, padding: 10 }}>{note}</span>
      </div>
      <div style={{ ...styles.fullWidth, textAlign: 'left', padding: 10 }}>
        <a
          href={`https://educoach-fe.staging.educoachapp.de/study-diary/${sender.id}`}
          style={styles.goButton}
        >
          Go to student&apos;s Study Diary
        </a>
      </div>
    </div>
  );
};

export default Mail;
