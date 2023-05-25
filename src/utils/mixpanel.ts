import { Callback, init, identify, alias, track, people, register } from 'mixpanel-browser';

init(`${import.meta.env.VITE_MIXPANEL_TOKEN}`);

const actions = {
  identify: (id: string) => {
    identify(id);
  },
  alias: (id: string) => {
    alias(id);
  },
  track: (name: string, props?: object) => {
    track(name, props);
  },
  people: {
    set: (props: object) => {
      people.set(props);
    },
    // eslint-disable-next-line camelcase
    set_once: (props: object) => {
      people.set_once(props);
    },
    increment: (property: string, by: number, callback?: Callback) => {
      people.increment(property, by, callback);
    },
  },
  register: (props: object) => {
    register(props);
  },
};

export const Mixpanel = actions;
