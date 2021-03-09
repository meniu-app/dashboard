import mixpanel from 'mixpanel-browser';

const LOCAL_ID_KEY = 'mixpanelId';
const ENV = process.env.REACT_APP_STAGE || 'development';
let mixpanelLocalId = localStorage.getItem(LOCAL_ID_KEY);

export const initialize = () => {
  if (!mixpanelLocalId) {
    mixpanelLocalId = Date.now();
    localStorage.setItem(LOCAL_ID_KEY, mixpanelLocalId);
  }

  mixpanel.init('396d868e6023f72717e169e0c6e93a41');
  mixpanel.register({ mixpanelLocalId });
  mixpanel.identify(mixpanelLocalId);
  if (mixpanel.people) {
    mixpanel.people.set({
      identifier: mixpanelLocalId,
      user: 'dashboard unauthorized visitor',
      environment: ENV,
    });
  }

  track('Initial visit', { event: 'Initial visit' });
};

export const track = (name, props) => {
  // 'application' stands for app type, in future 'Meniu administration dashboard' will be tracked also
  mixpanel.track(name, { application: 'Meniu mobile', environment: ENV, ...props });
};
