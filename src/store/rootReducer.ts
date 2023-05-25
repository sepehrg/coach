import { combineReducers } from 'redux';
import auth from './auth/auth.reducer';
import topics from './topics/topics.reducer';
import materials from './materials/materials.reducer';
import lessons from './lessons/lessons.reducer';
import summary from './summary/summary.reducer';
import subjects from './subjects/subjects.reducer';
import grade from './grade/grade.reducer';
import schools from './schools/schools.reducer';
import snackbar from './snackbar/snackbar.reducer';
import loader from './loader/loader.reducer';
import search from './search/search.reducer';
import schedule from './schedule/schedule.reducer';
import tasks from './tasks/tasks.reducer';
import powerups from './powerups/powerups.reducer';
import tags from './tags/tags.reducer';
import dashboard from './dashboard/dashboard.reducer';
import studycards from './studycards/studycards.reducer';
import ido from './ido/ido.reducer';
import materialFrame from './material-frame/material-frame.reducer';
import player from './player/player.reducer';
import studyNotes from './studyNotes/studyNotes.reducer';

export const rootReducer = combineReducers({
  auth,
  topics,
  materials,
  lessons,
  summary,
  subjects,
  grade,
  schools,
  snackbar,
  loader,
  search,
  schedule,
  tasks,
  powerups,
  tags,
  dashboard,
  studycards,
  studyNotes,
  ido,
  materialFrame,
  player,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
