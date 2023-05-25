import React, { useEffect, useState } from 'react';
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  ResponsiveContainer,
  Scatter,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import useStyles from './StudyProgress.styles';
import { Box, Grid, Typography } from '@mui/material';
import { ArrowDown, ArrowRight, ArrowUpGreen } from 'assets/images';
import StarComponent from './StarComponent';
import RobotComponent from './RobotComponent';
import { withTranslation, WithTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { dashboardStatisticsSelector, progressSelector } from 'store/dashboard/dashboard.selectors';
import moment, { locale } from 'moment';
import i18next from 'i18next';
import { StudyProgressDay } from 'entities/Dashboard';

const StudyProgress: React.FC<WithTranslation> = ({ t }) => {
  const { classes } = useStyles();
  const statistics = useSelector(dashboardStatisticsSelector);
  const progress = useSelector(progressSelector);

  locale(i18next.language);
  const currentDate = new Date();
  const currentDay = moment(currentDate).format('ddd');
  const [maxTime, setMaxTime] = useState(0);
  const [formattedData, setFormattedData] = useState<StudyProgressDay[] | undefined>(undefined);

  const maxDailyTime = () => {
    statistics?.map((day) => {
      setMaxTime((prevState) => {
        if (day.duration > prevState) return day.duration;
        return prevState;
      });
    });
  };

  const formatData = () => {
    if (!statistics) return;

    const statisticsCopy = JSON.parse(JSON.stringify(statistics));
    statisticsCopy.map((day: StudyProgressDay, index: number) => {
      if (day.duration > 90) {
        statisticsCopy[index].duration = 90;
      }
      return day;
    });
    setFormattedData(statisticsCopy);
  };

  useEffect(() => {
    maxDailyTime();
    // eslint-disable-next-line
  }, [statistics]);

  useEffect(() => {
    formatData();
    // eslint-disable-next-line
  }, [statistics]);

  const renderCustomAxisTick = ({
    x,
    y,
    payload,
    width,
  }: {
    x: number;
    y: number;
    payload: any;
    width: number;
  }) => {
    const label = statistics?.length ? moment(statistics[payload.index].date).format('ddd') : '';
    const widthOfOneBar = statistics?.length ? width / statistics.length : 160;
    return (
      <svg x={x - 0.5 * widthOfOneBar} y={y - 8}>
        <g>
          <rect width={widthOfOneBar + 4} height="36" rx="10" fill="white" fillOpacity="0.9" />
          <text
            x={0.5 * widthOfOneBar}
            y="20"
            width={widthOfOneBar + 4}
            dominantBaseline="middle"
            textAnchor="middle"
            fontFamily="Montserrat"
            fontSize="12"
            fontWeight={currentDay === label ? 'bold' : 'normal'}
            fill={`${currentDay === label ? '#0091FF' : 'black'}`}
          >
            {label}
          </text>
        </g>
      </svg>
    );
  };

  function CustomTooltip({ payload, active }: { payload: any; label: string; active: boolean }) {
    if (active) {
      const weekDay = moment(payload[0].payload.date).format('dddd');
      return (
        <Grid container direction="column" className={classes.tooltipWrapper}>
          <Grid container item direction="row" justifyContent={'space-between'}>
            <Typography className={classes.tooltipTitle}>{`${weekDay}`}</Typography>
            <Typography
              className={classes.tooltipTitle}
            >{`${payload[0].payload.duration}min`}</Typography>
          </Grid>

          {payload[0].payload.subjectDuration.map((session: any) => {
            return (
              <Grid
                container
                item
                direction="row"
                justifyContent={'space-between'}
                key={session.subject}
              >
                <Typography className={`${classes.tooltipText} ${classes.tooltipTextMargin}`}>
                  {session.subject}
                </Typography>
                <Typography className={classes.tooltipText}>{`${session.duration}min`}</Typography>
              </Grid>
            );
          })}
        </Grid>
      );
    }
    return null;
  }

  const renderProgressLabel = () => {
    let img;
    if (progress && progress > 0) img = ArrowUpGreen;
    if (progress === 0) img = ArrowRight;
    if (progress && progress < 0) img = ArrowDown;

    return (
      <Grid container direction="row" wrap="nowrap">
        <Grid item>
          <Typography className={classes.progressText}>
            {t('Dashboard.Weekly study progress')}
          </Typography>
        </Grid>
        <Grid
          item
          container
          direction="row"
          className={classes.progressLabel}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <img src={img} className={classes.progressImg} alt={'arrow'} />
          <Typography variant={'body1'}>{`${progress}%`}</Typography>
        </Grid>
      </Grid>
    );
  };

  return (
    <Box>
      {renderProgressLabel()}
      <ResponsiveContainer width="100%" height={360}>
        <ComposedChart
          barGap={2}
          barCategoryGap={2}
          data={formattedData}
          margin={{
            top: 25,
            right: 10,
            bottom: 10,
            left: 0,
          }}
        >
          <CartesianGrid
            strokeDasharray="6 6"
            orientation={'bottom'}
            x={60}
            y={0}
            vertical={false}
          />
          <XAxis
            dataKey={'day'}
            padding={{ left: 10, right: 10 }}
            tick={renderCustomAxisTick}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            dataKey={'duration'}
            ticks={[0, 22, 45, 68, 90]}
            domain={[0, () => 90]}
            tickLine={false}
            axisLine={false}
            style={{
              fontSize: '10px',
              fontWeight: 600,
              color: 'rgba(0, 0, 0, 0.5)',
              fontFamily: 'Montserrat',
            }}
          />

          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore */}
          <Tooltip content={<CustomTooltip />} />
          <Scatter
            data={statistics ?? undefined}
            shape={({ x, ...rest }: { width: number; height: number; x: number; y: number }) => {
              return (
                <>
                  {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                  {/* @ts-ignore */}
                  {rest.payload.duration < 90 ? (
                    <StarComponent
                      x={x}
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      height={rest.yAxis.height}
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      maxTickNumber={rest.yAxis.niceTicks[rest.yAxis.niceTicks.length - 1]}
                    />
                  ) : null}
                </>
              );
            }}
          />
          <Bar
            dataKey="duration"
            fill="#8884d8"
            shape={({
              width,
              height,
              x,
              y,
              ...rest
            }: {
              width: number;
              height: number;
              x: number;
              y: number;
            }) => {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              const currentBarDay = moment(rest.payload.date).format('ddd');
              return (
                <>
                  <path
                    d={`M${0.36 * width + x} ${0.09 * height + y}C${0.42 * width + x} ${
                      -0.03 * height + y
                    } ${0.59 * width + x} ${-0.03 * height + y} ${0.6321 * width + x} ${
                      0.09 * height + y
                    }L${width + x} ${height + y}H${x}L${0.36 * width + x} ${0.09 * height + y}`}
                    fill="#4BE06C"
                  />
                  {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                  {/* @ts-ignore */}
                  {rest.payload.duration > 71 && (
                    <svg fill="none">
                      <path
                        d={`M${0.345 * width + x} ${0.1239 * height + y}C${0.385 * width + x} ${
                          -0.0415 * height + y
                        } ${0.618 * width + x} ${-0.0415 * height + y} ${0.65 * width + x} ${
                          0.1228 * height + y
                        }L${0.74 * width + x} ${0.3435 * height + y}C${0.6 * width + x} ${
                          0.1 * height + y
                        } ${0.55 * width + x} ${0.1807 * height + y} ${0.5 * width + x} ${
                          0.2624 * height + y
                        }C${0.5 * width + x} ${0.2624 * height + y} ${0.45 * width + x} ${
                          0.35 * height + y
                        } ${0.26 * width + x} ${0.3435 * height + y}L${0.345 * width + x} ${
                          0.1239 * height + y
                        }Z`}
                        fill="white"
                      />
                    </svg>
                  )}
                  <path
                    x={x}
                    height={height}
                    width={width}
                    d={`M${0.362 * width + x} ${0.07 * height + y}C${0.39 * width + x} ${
                      0.02 * height + y
                    }  ${0.45 * width + x} ${0.001 * height + y} ${0.505 * width + x} ${
                      0.001 * height + y
                    } C${0.5 * width + x} ${0.19 * height + y} ${0.444 * width + x} 
                                    ${0.4182 * height + y} ${0.51 * width + x} ${
                      0.673 * height + y
                    }C${0.6264 * width + x} ${0.9279 * height + y} ${0.5 * width + x} ${
                      height + y
                    } ${0.5 * width + x} ${height + y}H${x}C${x} ${height + y} ${
                      0.25 * width + x
                    } ${0.3827 * height + y} ${0.275 * width + x} ${0.2993 * height + y}Z`}
                    fill="black"
                    fillOpacity="0.1"
                  />
                  {currentBarDay === currentDay && (
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    <RobotComponent width={width} x={x} y={y} time={rest.payload.duration} />
                  )}
                  {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                  {/* @ts-ignore */}
                  {currentBarDay === currentDay && rest.payload.duration === 0 && maxTime < 115 && (
                    <svg width="38" height="38" x={0.5 * width + x - 19} y={y - 200} fill="none">
                      <path
                        d="M0.502508 17.4965C0.121158 17.8779 0.135864 18.5109 0.535353 18.9104L2.48196 20.857C2.8812 21.2562 3.51371 21.2712 3.89518 20.8904L14.3783 10.427C14.9937 9.81268 16.08 10.2839 16.1007 11.1741L16.6863 36.3817C16.6991 36.9338 17.1571 37.3918 17.7093 37.4046L20.4128 37.4674C20.9649 37.4803 21.4021 37.0431 21.3893 36.4909L20.8037 11.2834C20.7831 10.3932 21.8486 9.97192 22.4933 10.6155L33.4741 21.5776C33.8737 21.9764 34.5062 21.9909 34.8873 21.6097L36.7455 19.7515C37.1269 19.3702 37.1122 18.7372 36.7127 18.3377L18.9104 0.535351C18.5109 0.135861 17.8779 0.121156 17.4965 0.502507L0.502508 17.4965Z"
                        fill="#0091FF"
                      />
                    </svg>
                  )}
                </>
              );
            }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default withTranslation()(StudyProgress);
