import React, { FC, useEffect, useState } from 'react';
import Topbar from '../Topbar';
import CreateCardsSidebar from '../CreateCardsSidebar';
import MainSection from '../MainSection';
import { Grid } from '@mui/material';
import { Form, Formik, FormikValues } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { newSetSubjectSelector, setDetailsSelector } from 'store/studycards/studycards.selectors';
import { useStudycardsActions } from 'store/studycards';
import useRouterActions from 'store/router';
import { useLocation, useParams } from 'react-router-dom';
import Loader from 'components/containers/Loader';
import { loadingActionSelector } from 'store/loader/loader.selectors';
import { GET_SET_REQUEST } from 'store/studycards/studycards.types';
import { StudyCard } from 'entities/StudyCard';
import { StudyCardSet } from 'entities/StudyCardSet';
import i18n from 'translations/i18n';

export interface ParamTypes extends Record<string, string> {
  id: string;
}

const NewSetSchema = Yup.object().shape({
  title: Yup.string()
    .required('Required')
    .max(256, i18n.t('Study Cards.Create.Too long title') as string),
  isPrivate: Yup.boolean().required(),
  studyCardTags: Yup.array().required(),
  studyCards: Yup.array()
    .of(
      Yup.object().shape({
        question: Yup.string().required(),
        answer: Yup.string().required(),
      }),
    )
    .nullable(),
});

const CreateStudyCardsPage: FC = () => {
  const { search } = useLocation();
  const subjectId = new URLSearchParams(search).get('subjectId');
  const [currentCard, setCurrentCard] = useState<number>(-1);
  const selectedSubject = useSelector(newSetSubjectSelector);
  const set = useSelector(setDetailsSelector);
  const { dispatchCreateSet, dispatchGetSet, dispatchUpdateSet } = useStudycardsActions();
  const { navigateToStudyCards } = useRouterActions();
  const loading = useSelector(loadingActionSelector)([GET_SET_REQUEST]);
  const { id } = useParams<ParamTypes>();

  useEffect(() => {
    id && dispatchGetSet(id);
  }, [dispatchGetSet, id]);

  const formatBeforeSaving = (values: FormikValues) => {
    const tempValues = {
      ...values,
      subject: { id: subjectId ?? selectedSubject?.id },
    } as StudyCardSet;
    const emptyCardsIndeces = values?.studyCards?.reduce(
      (acc: number[], current: StudyCard, index: number) => {
        if (values.studyCards.length < 1) return;
        if (current?.question === '') acc.push(index);
        return acc;
      },
      [],
    );

    emptyCardsIndeces.forEach((emptyItemIndex: number) => {
      tempValues.studyCards.splice(emptyItemIndex, 1);
    });
    return tempValues;
  };

  const submitHandler = (values: FormikValues) => {
    const formattedValues = formatBeforeSaving(values);
    id
      ? dispatchUpdateSet(formattedValues, () => navigateToStudyCards())
      : dispatchCreateSet(formattedValues, () => navigateToStudyCards());
  };

  const initialValues = {
    title: '',
    isPrivate: false,
    studyCardTags: [],
    studyCards: [],
    subject: {
      id: selectedSubject?.id,
    },
  };

  return (
    <Loader loading={loading}>
      <Formik
        initialValues={set || initialValues}
        initialErrors={{
          title: 'Not filled',
          studyCardTags: 'Not filled',
        }}
        onSubmit={submitHandler}
        validationSchema={NewSetSchema}
      >
        {({ submitForm, isValid }) => (
          <Form autoComplete={'off'}>
            <Grid container direction="row" wrap={'nowrap'}>
              <Grid item>
                <CreateCardsSidebar currentCard={currentCard} setCurrentCard={setCurrentCard} />
              </Grid>
              <Grid item style={{ flexGrow: 1 }}>
                <Topbar onSubmit={submitForm} isValid={isValid} />
                <MainSection currentCard={currentCard} setCurrentCard={setCurrentCard} />
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Loader>
  );
};

export default CreateStudyCardsPage;
