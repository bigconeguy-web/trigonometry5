import test from 'node:test';
import assert from 'node:assert/strict';
import {
  MAX_OPEN_TABS,
  createInitialTabState,
  canOpenAnotherTab,
  openTab,
  activateTab,
  closeTab,
} from './tabManager';

test('initial tab state starts with pinned Home · Library tab', () => {
  const state = createInitialTabState();
  assert.equal(state.tabs.length, 1);
  assert.equal(state.tabs[0].id, 'home');
  assert.equal(state.tabs[0].pinned, true);
  assert.equal(state.activeTabId, 'home');
  assert.equal(canOpenAnotherTab(state), true);
});

test('enforces maximum of 8 simultaneous open tabs', () => {
  let state = createInitialTabState();
  for (let i = 1; i < MAX_OPEN_TABS; i++) {
    const res = openTab(state, {
      id: `tab-${i}`,
      kind: 'module',
      title: `Module ${i}`,
      moduleId: `m-${i}`,
    });
    assert.equal(res.added, true);
    assert.equal(res.error, null);
    state = res.state;
  }

  assert.equal(state.tabs.length, 8);
  assert.equal(canOpenAnotherTab(state), false);

  const blocked = openTab(state, {
    id: 'tab-9',
    kind: 'module',
    title: 'Module 9',
    moduleId: 'm-9',
  });
  assert.equal(blocked.added, false);
  assert.match(blocked.error || '', /Maximum 8/i);
  assert.equal(blocked.state.tabs.length, 8);
});

test('closeTab protects pinned Home tab and selects neighbor when active tab closes', () => {
  let state = createInitialTabState();
  const pinnedAttempt = closeTab(state, 'home');
  assert.equal(pinnedAttempt.closed, false);
  assert.equal(pinnedAttempt.state.tabs.length, 1);

  state = openTab(state, { id: 'calc', kind: 'utility', title: 'Calculator', appKey: 'calculator' }).state;
  state = openTab(state, { id: 'retro', kind: 'module', title: 'Retro Bowl', moduleId: 'ckv:retro' }).state;
  assert.equal(state.activeTabId, 'retro');

  const closedRetro = closeTab(state, 'retro');
  assert.equal(closedRetro.closed, true);
  assert.equal(closedRetro.state.tabs.length, 2);
  assert.equal(closedRetro.state.activeTabId, 'calc');

  state = activateTab(closedRetro.state, 'home');
  assert.equal(state.activeTabId, 'home');
});
