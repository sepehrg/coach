import { all, fork } from 'redux-saga/effects';
import auth from './auth/auth.sagas';
import topics from './topics/topics.sagas';
import materials from './materials/materials.sagas';
import summary from './summary/summary.sagas';
import lessons from './lessons/lessons.sagas';
import subjects from './subjects/subjects.sagas';
import grade from './grade/grade.sagas';
import schools from './schools/schools.sagas';
import router from './router/router.sagas';
import search from './search/search.sagas';
import tasks from './tasks/tasks.sagas';
import powerups from './powerups/powerups.sagas';
import tags from './tags/tags.sagas';
import dashboard from './dashboard/dashboard.sagas';
import studyCards from './studycards/studycards.sagas';
import studyNotes from './studyNotes/studyNotes.sagas';
import ido from './ido/ido.sagas';
import materialFrame from './material-frame/material-frame.sagas';

export default function* root() {
  yield all([
    fork(auth),
    fork(topics),
    fork(materials),
    fork(lessons),
    fork(summary),
    fork(subjects),
    fork(grade),
    fork(schools),
    fork(router),
    fork(search),
    fork(tasks),
    fork(powerups),
    fork(tags),
    fork(dashboard),
    fork(studyCards),
    fork(ido),
    fork(materialFrame),
    fork(studyNotes),
  ]);
}
