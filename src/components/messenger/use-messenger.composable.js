import useApi from 'src/api';
import { useProjectStore } from 'src/stores';
import { computed, ref } from 'vue';
import moment from 'moment';

export const useMessenger = () => {
  const api = useApi();
  const { project } = useProjectStore();

  const groupMap = ref(new Map());
  const sessionMap = ref(new Map());
  const respondentMap = ref(new Map());
  const sessionMessageGroupMap = ref(new Map());
  const sessionMessagesMap = ref(new Map());
  const operatorMap = ref(new Map());

  const active = ref({
    groupId: null,
    sessionId: null,
  });

  const activeGroup = computed(() => {
    return groupMap.value.get(active.value.groupId);
  });

  const activeSession = computed(() => {
    return sessionMap.value.get(active.value.sessionId);
  });

  const messageGroups = computed(() => {
    const groups = sessionMessageGroupMap.value.get(active.value.sessionId);
    if (!groups) return [];
    return Array.from(groups.values() || []);
  });

  const lastSessions = computed(() => {
    const result = [];
    groupMap.value.forEach(group => {
      const sessions = getSessions(group.id);
      if (sessions.value.length === 0) return;
      result.push(sessions.value[sessions.value.length - 1]);
    });
    return result;
  });

  function getGroup(id) {
    return computed(() => groupMap.value.get(id));
  }

  function getRespondent(id) {
    return computed(() => respondentMap.value.get(id));
  }

  function getOperator(id) {
    return computed(() => operatorMap.value.get(id));
  }

  function getSessions(groupId) {
    return computed(() => {
      const result = [];
      sessionMap.value.forEach(session => {
        if (session.script_id !== groupId) return;
        result.push({ ...session });
      });
      return result;
    });
  }

  function getLastMessage(sessionId) {
    return computed(() => {
      const groups = sessionMessageGroupMap.value.get(sessionId);
      let lastTimestamp = null;

      Array.from(groups.keys()).forEach(timestamp => {
        if (!lastTimestamp || lastTimestamp < timestamp) {
          lastTimestamp = timestamp;
        }
      });

      const messages = groups.get(lastTimestamp)?.messages || [];
      if (messages.length === 0) return null;

      return messages[messages.length - 1];
    });
  }

  function setActiveGroup(groupId) {
    active.value.groupId = groupId;
  }

  function clearActiveGroup() {
    active.value.groupId = null;
  }

  function setActiveSession(sessionId) {
    active.value.sessionId = sessionId;
  }

  function clearActiveSession() {
    active.value.sessionId = null;
  }

  function groupDate(message) {
    return new Date(moment(message.created_at).format('YYYY/MM/DD'));
  }

  function setMessage(data) {
    const { operator, ...message } = data;

    if (operator) {
      operatorMap.value.set(operator.id, operator);
    }

    const date = groupDate(message);
    const groupKey = date.getTime();

    if (!sessionMessageGroupMap.value.has(message.session_id)) {
      sessionMessageGroupMap.value.set(message.session_id, new Map());
    }

    const groups = sessionMessageGroupMap.value.get(message.session_id);

    if (!groups.has(groupKey)) {
      groups.set(groupKey, { date, messages: [] });
    }

    groups.get(groupKey).messages.push(message);
  }

  function setSession(data) {
    const { respondent, messages, ...session } = data;
    sessionMap.value.set(session.id, session);
    respondentMap.value.set(respondent.id, respondent);
    sessionMessagesMap.value.delete(session.id);
    messages.forEach(message => setMessage(message));
  }

  function setMessenger(data) {
    const { sessions, ...group } = data;
    groupMap.value.set(group.id, group);
    sessions.forEach(session => setSession(session));
  }

  async function loadMessengers() {
    try {
      const { data, success } = await api.getMessengers(project.id);
      if (!success) return;
      data.forEach(item => setMessenger(item));
    } catch (e) { /* Empty */ }
  }

  async function loadSessions() {
    try {
      const { data, success } = await api.getSessions({
        projectId: project.id,
        scriptId: activeGroup.value.id,
      });
      if (!success) return;
      data.forEach(item => setSession(item));
    } catch (e) { /* Empty */ }
  }

  async function loadMessages() {
    try {
      const { data, success } = await api.getHistoryMessage({
        projectId: project.id,
        scriptId: activeGroup.value.id,
        sessionId: activeSession.value.id,
      });
      if (!success) return;
      data.forEach(item => setMessage(item));
    } catch (e) { /* Empty */ }
  }

  return {
    activeGroup,
    activeSession,
    messageGroups,
    lastSessions,
    sessionMessageGroupMap,
    loadMessengers,
    loadSessions,
    getSessions,
    getRespondent,
    getLastMessage,
    getOperator,
    getGroup,
    setActiveGroup,
    clearActiveGroup,
    setActiveSession,
    clearActiveSession,
    loadMessages,
  };
};
