'use strict';

const LS_KEY = 'climbing-fitness-program-v1';
const DAYS = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
const SESSION_OPTIONS = ['上肢推', '上肢拉', '下肢', '臀腿', '全身', '核心有氧', '避抓握后链', '避抓握推类'];
const SESSIONS = {
  '上肢推': [
    { name: '杠铃卧推', lib: '0025', sets: '4', reps: '6-8' },
    { name: '坐姿杠铃推举', lib: '0091', sets: '3', reps: '8-10' },
    { name: '哑铃飞鸟', lib: '0308', sets: '3', reps: '10-12' },
    { name: '仰卧臂屈伸', lib: '0060', sets: '3', reps: '10-12' },
    { name: '哑铃侧平举', lib: '0334', sets: '3', reps: '15' }
  ],
  '上肢拉': [
    { name: '宽握引体向上', lib: '1429', sets: '4', reps: '最大次数' },
    { name: '杠铃划船', lib: '0027', sets: '4', reps: '8-10' },
    { name: '单臂哑铃划船', lib: '0292', sets: '3', reps: '10-12' },
    { name: '哑铃弯举', lib: '0294', sets: '3', reps: '12' },
    { name: '哑铃锤式弯举', lib: '0313', sets: '3', reps: '12' }
  ],
  '下肢': [
    { name: '杠铃深蹲', lib: '0043', sets: '4', reps: '6-8' },
    { name: '罗马尼亚硬拉', lib: '0085', sets: '3', reps: '8-10' },
    { name: '杠铃弓步蹲', lib: '0054', sets: '3', reps: '8-10 每侧' },
    { name: '杠铃臀桥', lib: '1409', sets: '3', reps: '12' },
    { name: '站姿提踵', lib: '1372', sets: '4', reps: '15' }
  ],
  '臀腿': [
    { name: '杠铃硬拉', lib: '0032', sets: '4', reps: '6-8' },
    { name: '杠铃臀桥', lib: '1409', sets: '4', reps: '10-12' },
    { name: '杠铃弓步蹲', lib: '0054', sets: '3', reps: '8-10 每侧' },
    { name: '罗马尼亚硬拉', lib: '0085', sets: '3', reps: '10' },
    { name: '站姿提踵', lib: '1372', sets: '4', reps: '15' }
  ],
  '全身': [
    { name: '杠铃深蹲', lib: '0043', sets: '4', reps: '6' },
    { name: '杠铃卧推', lib: '0025', sets: '4', reps: '6' },
    { name: '杠铃划船', lib: '0027', sets: '4', reps: '8' },
    { name: '杠铃硬拉', lib: '0032', sets: '3', reps: '6' },
    { name: '平板支撑', lib: '0464', sets: '3', reps: '45 秒' }
  ],
  '核心有氧': [
    { name: '平板支撑', lib: '0464', sets: '3', reps: '45 秒' },
    { name: '死虫式', lib: '0276', sets: '3', reps: '10 每侧' },
    { name: '登山者', lib: '2466', sets: '3', reps: '30 秒' },
    { name: '农夫行走', lib: '2133', sets: '4', reps: '30 米' },
    { name: '侧平板支撑', lib: '3544', sets: '3', reps: '30 秒每侧' }
  ],
  '避抓握后链': [
    { name: '杠铃罗马尼亚硬拉', lib: '0085', sets: '4', reps: '8-10' },
    { name: '杠铃早安式', lib: '0044', sets: '3', reps: '10-12' },
    { name: '哑铃单腿硬拉', lib: null, sets: '3', reps: '10-12 每侧' },
    { name: '死虫式', lib: '0276', sets: '3', reps: '15' },
    { name: '仰卧举腿', lib: null, sets: '3', reps: '15' }
  ],
  '避抓握推类': [
    { name: '平板哑铃卧推', lib: '0289', sets: '4', reps: '12-15' },
    { name: '上斜哑铃卧推', lib: null, sets: '4', reps: '12-15' },
    { name: '哑铃推举', lib: '0426', sets: '3', reps: '10-12' },
    { name: '哑铃反向飞鸟', lib: '0383', sets: '3', reps: '15-20' },
    { name: '双杠臂屈伸', lib: '0251', sets: '3', reps: '12-15' }
  ]
};
const DEFAULT_PROFILE = {
  gender: 'male',
  age: '',
  height: '',
  waist: '',
  neck: '',
  hip: '',
  activity: 'moderate',
  goal: 'mild-fat-loss',
  weight: 78.5,
  squat: '',
  bench: '',
  deadlift: '',
  press: '',
  calories: 1850,
  protein: 145
};
const DEFAULT_PLAN = [
  { type: '训练', session: '上肢推', note: '', duration: 60, intensity: '中', exercises: null, custom: false },
  { type: '攀岩', session: null, note: '抱石磕线 60–90 分钟；单条难线连续尝试 ≤ 3–4 次，组间休息 3–5 分钟。', duration: 90, intensity: '中', exercises: null, custom: false },
  { type: '训练', session: '下肢', note: '', duration: 60, intensity: '中', exercises: null, custom: false },
  { type: '休息', session: null, note: '恢复、拉伸、散步', duration: 0, intensity: null, exercises: null, custom: false },
  { type: '训练', session: '上肢拉', note: '', duration: 60, intensity: '中', exercises: null, custom: false },
  { type: '攀岩', session: null, note: '抱石磕线 60–90 分钟；先 15 分钟肩外旋热身和 2–3 条低难度热手。', duration: 90, intensity: '中', exercises: null, custom: false },
  { type: '休息', session: null, note: '完全休息，指腱和神经系统恢复', duration: 0, intensity: null, exercises: null, custom: false }
];
const WEEK_PHASES = [
  { label: '技术适应', desc: '动作质量优先，重量保守', rpe: 7 },
  { label: '技术积累', desc: '保持技术，轻微加重', rpe: 7 },
  { label: '容量积累', desc: '组数保持不变，注意恢复', rpe: 7.5 },
  { label: '减载', desc: '重量降到约 70%，保留技术', rpe: 6 },
  { label: '力量积累', desc: '开始进入力量区间', rpe: 8 },
  { label: '力量提升', desc: '保持 4×6-8，加重后保留余力', rpe: 8 },
  { label: '力量强化', desc: '接近但不超过当日能力上限', rpe: 8.5 },
  { label: '减载', desc: '恢复神经系统，维持动作技术', rpe: 6 },
  { label: '强度阶段', desc: '主项更重，辅助保持容量', rpe: 8.5 },
  { label: '顶峰阶段', desc: '主项高质量重重量', rpe: 9 },
  { label: '表现测试', desc: '尝试个人记录前最后强度周', rpe: 9 },
  { label: '恢复调整', desc: '测试或轻量收尾，准备下一周期', rpe: 6 }
];
const RPE_PCT = { 6: 0.65, 7: 0.76, 7.5: 0.8, 8: 0.84, 8.5: 0.88, 9: 0.92 };
const ACTIVITY_META = {
  sedentary: { label: '久坐', pal: 1.2 },
  light: { label: '轻度活跃', pal: 1.35 },
  moderate: { label: '中度活跃', pal: 1.55 },
  active: { label: '高度活跃', pal: 1.75 }
};
const GOAL_META = {
  'mild-fat-loss': { label: '温和减脂', delta: '-15%', factor: 0.85, tone: 'loss' },
  'aggressive-fat-loss': { label: '激进减脂', delta: '-25%', factor: 0.75, tone: 'loss' },
  maintain: { label: '维持体重', delta: '0%', factor: 1, tone: 'keep' },
  'lean-bulk': { label: '增肌', delta: '+5~10%', factor: 1.08, tone: 'bulk' }
};

let supabaseClient = null;
let currentUser = null;
let state = loadState();
let cloudSyncTimer = null;
let authSubscription = null;
let editingDay = null;
let editingExercises = [];
let exerciseSearch = '';
let currentView = 'home';
let syncTimer = null;
let lastSyncText = '';
const $ = (selector) => document.querySelector(selector);

function storageKey() {
  return currentUser ? LS_KEY + '-' + currentUser.id : LS_KEY;
}

function freshState() {
  return {
    profile: clone(DEFAULT_PROFILE),
    plan: normalizePlan(DEFAULT_PLAN),
    logs: [],
    weights: [],
    selectedWeek: 1
  };
}

function cachedUserState() {
  const raw = localStorage.getItem(storageKey());
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    const cached = normalizeSyncedState(parsed);
    if (!parsed.updatedAt) delete cached.updatedAt;
    return cached;
  } catch (error) {
    return null;
  }
}

function loadState() {
  try {
    const raw = localStorage.getItem(storageKey());
    if (!raw) return freshState();
    const parsed = JSON.parse(raw);
    const plan = normalizePlan(Array.isArray(parsed.plan) && parsed.plan.length === 7 ? parsed.plan : DEFAULT_PLAN);
    return {
      profile: Object.assign({}, DEFAULT_PROFILE, parsed.profile || {}),
      plan,
      logs: Array.isArray(parsed.logs) ? parsed.logs : [],
      weights: Array.isArray(parsed.weights) ? parsed.weights : [],
      selectedWeek: Math.min(12, Math.max(1, Number(parsed.selectedWeek) || 1))
    };
  } catch (error) {
    return freshState();
  }
}

function normalizePlan(plan) {
  return plan.map((day, index) => {
    const base = DEFAULT_PLAN[index] || {};
    const exercises = Array.isArray(day.exercises)
      ? day.exercises.filter((exercise) => {
          const lib = exercise.lib ? libraryById(exercise.lib) : null;
          return !lib || ['杠铃', '哑铃', '自重'].includes(lib.equipment);
        })
      : null;
    return Object.assign({}, base, day, {
      type: day.type || base.type || '休息',
      duration: day.duration !== undefined ? Number(day.duration) || 0 : base.duration || 0,
      intensity: day.intensity !== undefined ? day.intensity : base.intensity || '中',
      exercises: exercises && exercises.length > 0 ? exercises : null
    });
  });
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function showView(name) {
  currentView = name;
  document.querySelectorAll('.view').forEach((view) => {
    view.classList.toggle('active', view.id === 'view-' + name);
  });
  document.querySelectorAll('#bottomNav button').forEach((button) => {
    button.classList.toggle('active', button.dataset.nav === name);
  });
  $('#backHome').hidden = name === 'home';
}

function saveState() {
  state.updatedAt = new Date().toISOString();
  localStorage.setItem(storageKey(), JSON.stringify(state));
  if (supabaseClient && currentUser) {
    queueCloudSync();
  } else {
    queueSync();
  }
}

function queueSync() {
  clearTimeout(syncTimer);
  syncTimer = setTimeout(() => syncNow(false), 600);
}

async function syncNow(manual) {
  if (supabaseClient && currentUser) {
    await syncCloud(manual);
    return;
  }
  const status = $('#syncStatus');
  if (!status) return;
  status.textContent = '同步中…';
  try {
    const response = await fetch('api/state', { cache: 'no-store' });
    if (!response.ok) throw new Error('bad response');
    const serverState = await response.json();
    const localTime = Date.parse(state.updatedAt || '') || 0;
    const serverTime = Date.parse(serverState.updatedAt || '') || 0;
    let outgoing = false;
    if (serverTime > localTime) {
      state = normalizeSyncedState(serverState);
      localStorage.setItem(storageKey(), JSON.stringify(state));
      renderAll();
      outgoing = false;
    } else {
      outgoing = true;
    }
    if (outgoing || serverTime === 0) {
      const body = JSON.stringify(state);
      await fetch('api/state', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body
      });
    }
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    status.textContent = manual ? '已同步 ' + time : '已同步';
  } catch (error) {
    status.textContent = manual ? '离线 · 仅本机保存' : '本机保存';
  }
}

function normalizeSyncedState(parsed) {
  return {
    profile: Object.assign({}, DEFAULT_PROFILE, parsed.profile || {}),
    plan: normalizePlan(Array.isArray(parsed.plan) && parsed.plan.length === 7 ? parsed.plan : DEFAULT_PLAN),
    logs: Array.isArray(parsed.logs) ? parsed.logs : [],
    weights: Array.isArray(parsed.weights) ? parsed.weights : [],
    selectedWeek: Math.min(12, Math.max(1, Number(parsed.selectedWeek) || 1)),
    updatedAt: parsed.updatedAt || new Date().toISOString()
  };
}

function initSupabase() {
  const cfg = window.SUPABASE_CONFIG || {};
  if (!cfg.url || !cfg.anonKey || !window.supabase) return;
  supabaseClient = window.supabase.createClient(cfg.url, cfg.anonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  });
}

async function applyUserSession(session) {
  if (!supabaseClient || !session || !session.user) return;
  const sameUser = currentUser && currentUser.id === session.user.id;
  currentUser = session.user;
  $('#authLogout').hidden = false;
  setAuthScreen(false);
  setAuthMessage('');
  if (sameUser) return;
  await loadCloudState();
  renderAll();
}

function watchAuthState() {
  if (!supabaseClient || authSubscription) return;
  const { data } = supabaseClient.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN' || event === 'INITIAL_SESSION') {
      if (session && session.user) applyUserSession(session);
    } else if (event === 'SIGNED_OUT' || event === 'USER_DELETED') {
      if (!currentUser) return;
      const userKey = storageKey();
      currentUser = null;
      state = freshState();
      localStorage.removeItem(userKey);
      localStorage.removeItem(LS_KEY);
      $('#authLogout').hidden = true;
      setAuthScreen(true);
    }
  });
  authSubscription = data.subscription;
}

function setAuthScreen(visible) {
  const screen = $('#authScreen');
  if (!screen) return;
  screen.hidden = !visible;
  document.querySelector('.topbar').style.display = visible ? 'none' : '';
  document.querySelector('main').style.display = visible ? 'none' : '';
  if (visible) resetAuthUI();
}

function setAuthMessage(text) {
  $('#authMessage').textContent = text || '';
}

function resetAuthUI() {
  const emailInput = $('#authEmail');
  if (emailInput) emailInput.value = '';
  const sendButton = $('#authSendLink');
  if (sendButton) {
    sendButton.disabled = false;
    sendButton.textContent = '发送登录链接';
  }
  setAuthMessage('');
}

function validEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function authRedirectUrl() {
  if (location.protocol === 'file:') return '';
  const url = new URL('fitness-climbing-strength-20260903.html', location.href);
  url.hash = '';
  url.search = '';
  return url.href;
}

async function sendLoginLink() {
  if (!supabaseClient) return;
  const email = $('#authEmail').value.trim();
  if (!validEmail(email)) {
    setAuthMessage('请输入有效的邮箱地址');
    return;
  }
  const redirectTo = authRedirectUrl();
  if (!redirectTo) {
    setAuthMessage('请通过网页地址打开后，才能接收登录链接');
    return;
  }
  setAuthMessage('正在发送登录链接…');
  $('#authSendLink').disabled = true;
  const { error } = await supabaseClient.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: false,
      emailRedirectTo: redirectTo
    }
  });
  $('#authSendLink').disabled = false;
  if (error) {
    if (/not found|does not exist|no user|invalid login/i.test(error.message)) {
      setAuthMessage('这个邮箱还没有账号，请先注册');
    } else if (/redirect/i.test(error.message)) {
      setAuthMessage('当前网页地址还没加入 Supabase 回调白名单');
    } else {
      setAuthMessage(error.message);
    }
    return;
  }
  setAuthMessage('登录链接已发送，请查收。若是新邮箱，请先注册');
}

async function signOutSupabase() {
  try {
    await syncCloud(true);
  } catch (error) {
    // 离线时仍然退出，本地缓存会保留
  }
  if (supabaseClient) await supabaseClient.auth.signOut();
  const userKey = storageKey();
  currentUser = null;
  state = freshState();
  localStorage.removeItem(userKey);
  localStorage.removeItem(LS_KEY);
  $('#authLogout').hidden = true;
  setAuthScreen(true);
}

async function loadCloudState() {
  if (!supabaseClient || !currentUser) return;
  const key = storageKey();
  const cached = cachedUserState();
  const legacyRaw = localStorage.getItem(LS_KEY);
  const { data, error } = await supabaseClient
    .from('user_data')
    .select('state, updated_at')
    .eq('id', currentUser.id)
    .maybeSingle();
  if (error) {
    if (cached) {
      state = cached;
      localStorage.setItem(key, JSON.stringify(state));
      renderAll();
    }
    $('#syncStatus').textContent = '云端读取失败';
    return;
  }
  let shouldPush = false;
  if (data && data.state) {
    const cloud = normalizeSyncedState(data.state);
    const localTime = Date.parse((cached && cached.updatedAt) || '') || 0;
    const cloudTime = Date.parse(cloud.updatedAt || '') || 0;
    if (cloudTime >= localTime || !localTime) {
      state = cloud;
    } else if (cached) {
      state = cached;
      shouldPush = true;
    }
    localStorage.setItem(key, JSON.stringify(state));
    if (legacyRaw) localStorage.removeItem(LS_KEY);
  } else if (cached) {
    state = cached;
    localStorage.setItem(key, JSON.stringify(state));
    shouldPush = true;
    if (legacyRaw) localStorage.removeItem(LS_KEY);
  } else if (legacyRaw) {
    try {
      state = normalizeSyncedState(JSON.parse(legacyRaw));
      localStorage.setItem(key, JSON.stringify(state));
      shouldPush = true;
    } catch (parseError) {
      state = freshState();
    }
    localStorage.removeItem(LS_KEY);
  } else {
    state = freshState();
  }
  renderAll();
  if (shouldPush) queueCloudSync();
}

function queueCloudSync() {
  if (!supabaseClient || !currentUser) return;
  clearTimeout(cloudSyncTimer);
  cloudSyncTimer = setTimeout(() => syncCloud(false), 500);
}

async function syncCloud(manual) {
  const status = $('#syncStatus');
  if (!supabaseClient || !currentUser) return;
  status.textContent = '云端同步中…';
  try {
    const { data } = await supabaseClient
      .from('user_data')
      .select('state, updated_at')
      .eq('id', currentUser.id)
      .maybeSingle();
    const localTime = Date.parse(state.updatedAt || '') || 0;
    const cloudTime = Date.parse((data && data.state && data.state.updatedAt) || '') || 0;
    if (data && data.state && cloudTime > localTime) {
      state = normalizeSyncedState(data.state);
      localStorage.setItem(storageKey(), JSON.stringify(state));
      renderAll();
    } else {
      state.updatedAt = new Date().toISOString();
      const { error } = await supabaseClient
        .from('user_data')
        .upsert({ id: currentUser.id, state, updated_at: state.updatedAt });
      if (error) throw error;
    }
    status.textContent = manual ? '云端已同步' : '已同步';
  } catch (error) {
    status.textContent = manual ? '云端同步失败' : '本机保存';
  }
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function library() {
  return window.EXERCISE_LIBRARY || [];
}

function libraryById(id) {
  return library().find((item) => item.id === id) || null;
}

function allowedLibrary() {
  return library().filter((exercise) => ['杠铃', '哑铃', '自重'].includes(exercise.equipment));
}

function currentPhase() {
  const phase = WEEK_PHASES[state.selectedWeek - 1];
  return phase || WEEK_PHASES[0];
}

const SESSION_METS = {
  '上肢推': 5.5,
  '上肢拉': 5.5,
  '下肢': 6,
  '臀腿': 6,
  '全身': 6.5,
  '核心有氧': 7,
  '避抓握后链': 5.5,
  '避抓握推类': 5
};
const INTENSITY_FACTOR = { 低: 0.8, 中: 1, 高: 1.2 };

function roundLoad(kg) {
  if (!kg || kg <= 0) return null;
  if (kg >= 30) return Math.round(kg / 2.5) * 2.5;
  if (kg >= 10) return Math.round(kg);
  return Math.round(kg * 2) / 2;
}

function suggestedLoad(exercise) {
  const weight = Number(state.profile.weight);
  const repsText = String(exercise.reps || '');
  const reps = Number((repsText.match(/\d+/) || [''])[0]);
  const name = String(exercise.name || '');
  if (!weight || weight <= 0) return null;
  if (!reps || reps <= 0) {
    if (name.includes('引体') || name.includes('俯卧撑') || name.includes('平板') || name.includes('死虫') || name.includes('登山')) {
      return { text: '自重，保持动作质量 · RPE ' + currentPhase().rpe, rpe: String(currentPhase().rpe) };
    }
    return null;
  }

  let base = null;
  let label = '';
  if (name.includes('深蹲')) {
    base = Number(state.profile.squat) || weight * 1.5;
    label = '杠铃';
  } else if (name.includes('卧推')) {
    base = Number(state.profile.bench) || weight * 1.0;
    label = '杠铃/哑铃';
  } else if (name.includes('罗马尼亚硬拉')) {
    base = (Number(state.profile.deadlift) || weight * 1.75) * 0.8;
    label = '杠铃';
  } else if (name.includes('硬拉')) {
    base = Number(state.profile.deadlift) || weight * 1.75;
    label = '杠铃';
  } else if (name.includes('推举')) {
    base = Number(state.profile.press) || weight * 0.65;
    label = '杠铃/哑铃';
  } else if (name.includes('弓步')) {
    base = (Number(state.profile.squat) || weight * 1.5) * 0.55;
    label = '杠铃/哑铃';
  } else if (name.includes('臀桥')) {
    base = (Number(state.profile.deadlift) || weight * 1.75) * 0.7;
    label = '杠铃';
  } else if (name.includes('单臂') && name.includes('划船')) {
    base = weight * 0.35;
    label = '每侧';
  } else if (name.includes('仰卧臂屈伸')) {
    base = weight * 0.35;
    label = '杠铃';
  } else if (name.includes('划船')) {
    base = weight * 0.7;
    label = '杠铃/哑铃';
  } else if (name.includes('提踵')) {
    base = weight * 0.5;
    label = '杠铃';
  } else if (name.includes('双杠')) {
    return { text: '自重；如需负重可挂 5–10 kg · RPE ' + currentPhase().rpe, rpe: String(currentPhase().rpe) };
  } else if (name.includes('臂屈伸')) {
    base = weight * 0.18;
    label = '每侧';
  } else if (name.includes('弯举')) {
    base = weight * 0.16;
    label = '每侧';
  } else if (name.includes('飞鸟')) {
    base = weight * 0.1;
    label = '每侧';
  } else if (name.includes('侧平举')) {
    base = weight * 0.08;
    label = '每侧';
  } else if (name.includes('反向飞鸟')) {
    base = weight * 0.1;
    label = '每侧';
  } else if (name.includes('农夫行走')) {
    base = weight * 0.35;
    label = '每只手';
  }
  if (!base) return null;

  const phase = currentPhase();
  const pct = RPE_PCT[phase.rpe] || 0.84;
  const load = roundLoad(base * pct);
  return { text: (load ? '建议 ' + load + ' kg' : '自重') + (label === '每侧' || label === '每只手' ? '/' + label : '') + ' · RPE ' + phase.rpe, rpe: String(phase.rpe) };
}

function estimateDayCalories(day) {
  const weight = Number(state.profile.weight);
  const duration = Number(day.duration);
  if (!weight || weight <= 0 || !duration || duration <= 0) return 0;
  const intensity = INTENSITY_FACTOR[day.intensity] || 1;
  if (day.type === '训练') {
    const met = SESSION_METS[day.session] || 5;
    return Math.round(met * weight * (duration / 60) * intensity);
  }
  if (day.type === '攀岩') {
    return Math.round(5 * weight * (duration / 60) * intensity);
  }
  return 0;
}

function dayExercises(day) {
  if (day.type !== '训练') return [];
  if (Array.isArray(day.exercises) && day.exercises.length > 0) return day.exercises;
  if (day.session && SESSIONS[day.session]) return SESSIONS[day.session];
  return [];
}

function numValue(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function bodyEstimate() {
  const p = state.profile;
  const weight = numValue(p.weight);
  const height = numValue(p.height);
  const waist = numValue(p.waist);
  const neck = numValue(p.neck);
  const hip = numValue(p.hip);
  const age = numValue(p.age);
  const isFemale = p.gender === 'female';
  let bodyFat = null;

  if (height > 0 && waist > 0 && neck > 0) {
    let raw = null;
    if (isFemale && hip > 0 && waist + hip > neck) {
      raw = 163.205 * Math.log10(waist + hip - neck) - 97.684 * Math.log10(height) - 78.387;
    } else if (!isFemale && waist > neck) {
      raw = 86.01 * Math.log10(waist - neck) - 70.041 * Math.log10(height) + 36.76;
    }
    if (raw !== null) bodyFat = Math.min(55, Math.max(3, raw));
  }

  const lbm = weight > 0 && bodyFat !== null ? weight * (1 - bodyFat / 100) : null;
  let bmr = null;
  if (lbm && lbm > 0) {
    bmr = 370 + 21.6 * lbm;
  } else if (weight > 0 && height > 0 && age > 0) {
    bmr = isFemale
      ? 10 * weight + 6.25 * height - 5 * age - 161
      : 10 * weight + 6.25 * height - 5 * age + 5;
  }

  return {
    weight,
    bodyFat: bodyFat === null ? null : Math.round(bodyFat * 10) / 10,
    lbm: lbm === null ? null : Math.round(lbm * 10) / 10,
    bmr: bmr === null ? null : Math.round(bmr)
  };
}

function strengthPalBonus() {
  const p = state.profile;
  const weight = numValue(p.weight);
  const total = numValue(p.squat) + numValue(p.bench) + numValue(p.deadlift);
  return weight > 0 && total > 0 && total / weight >= 3.5 ? 0.05 : 0;
}

function estimateTdee() {
  const body = bodyEstimate();
  if (!body.bmr) return null;
  const activity = ACTIVITY_META[state.profile.activity] || ACTIVITY_META.moderate;
  return Math.round(body.bmr * (activity.pal + strengthPalBonus()));
}

function nutritionPlan() {
  const body = bodyEstimate();
  const tdee = estimateTdee();
  if (!body.bmr || !tdee) return null;
  const goal = GOAL_META[state.profile.goal] || GOAL_META['mild-fat-loss'];
  const targetCalories = Math.round((tdee * goal.factor) / 10) * 10;
  const isCut = state.profile.goal.indexOf('fat') !== -1;
  let protein = isCut ? (body.lbm ? body.lbm * 2.4 : body.weight * 2) : body.weight * 2;
  protein = Math.round(protein);
  const fat = Math.round((targetCalories * 0.25) / 9);
  const carbCalories = Math.max(0, targetCalories - protein * 4 - fat * 9);
  const carbs = Math.round(carbCalories / 4);
  return {
    body,
    tdee,
    targetCalories,
    protein,
    fat,
    carbs,
    factor: goal.factor,
    delta: goal.delta
  };
}

function currentMacroSplit() {
  const p = state.profile;
  const plan = nutritionPlan();
  const target = Number(p.calories) || plan.targetCalories || 1850;
  const fallbackProtein = plan ? plan.protein : Math.round(Math.max(0, numValue(p.weight)) * 2);
  const protein = Number(p.protein) || fallbackProtein || 145;
  const fat = Math.round((target * 0.25) / 9);
  const carbCalories = Math.max(0, target - protein * 4 - fat * 9);
  const carbs = Math.round(carbCalories / 4);
  const tdee = plan ? plan.tdee : null;
  const delta = tdee ? target - tdee : null;
  return {
    target,
    protein,
    fat,
    carbs,
    tdee,
    delta,
    plan
  };
}

function weightTrendInfo() {
  const sorted = state.weights.slice().sort((a, b) => (a.date || '').localeCompare(b.date || ''));
  if (sorted.length === 0) {
    return { weight: numValue(state.profile.weight), delta: null };
  }
  const last = sorted[sorted.length - 1];
  const previous = sorted.length > 1 ? sorted[sorted.length - 2] : null;
  let delta = null;
  let label = '较上次';
  if (previous) {
    delta = numValue(last.weight) - numValue(previous.weight);
    const span = Math.max(1, Math.round((Date.parse(last.date) - Date.parse(previous.date)) / 86400000));
    if (span <= 8) label = '近7天';
  }
  return {
    weight: numValue(last.weight),
    delta,
    label,
    lastDate: last.date,
    previousDate: previous ? previous.date : null
  };
}

function formatNumber(value) {
  return Math.round(value).toLocaleString('en-US');
}

function renderAll() {
  renderProfile();
  renderStats();
  renderWeekSelect();
  renderPhaseBanner();
  renderWeek();
  renderTrainingLogs();
  renderWeights();
  renderWeightCheck();
}

function renderProfile() {
  $('#profileGender').value = state.profile.gender || 'male';
  $('#profileAge').value = state.profile.age || '';
  $('#profileHeight').value = state.profile.height || '';
  $('#profileWeight').value = state.profile.weight || '';
  $('#profileWaist').value = state.profile.waist || '';
  $('#profileNeck').value = state.profile.neck || '';
  $('#profileHip').value = state.profile.hip || '';
  $('#profileSquat').value = state.profile.squat || '';
  $('#profileBench').value = state.profile.bench || '';
  $('#profileDeadlift').value = state.profile.deadlift || '';
  $('#profilePress').value = state.profile.press || '';
  $('#profileActivity').value = state.profile.activity || 'moderate';
  $('#profileGoal').value = state.profile.goal || 'mild-fat-loss';
  $('#profileCalories').value = state.profile.calories || '';
  $('#profileProtein').value = state.profile.protein || '';
  const hipWrap = $('#hipWrap');
  if (hipWrap) hipWrap.hidden = (state.profile.gender || 'male') !== 'female';
}

function renderStats() {
  renderDashboard();
  renderNutritionResult();
}

function renderDashboard() {
  const goal = GOAL_META[state.profile.goal] || GOAL_META['mild-fat-loss'];
  const goalTag = $('#homeGoalTag');
  if (goalTag) {
    goalTag.textContent = goal.label + ' · ' + goal.delta;
    goalTag.className = 'goal-pill is-' + goal.tone;
  }
  const phaseTag = $('#homePhaseTag');
  if (phaseTag) {
    const phase = currentPhase();
    phaseTag.textContent = '第 ' + state.selectedWeek + ' 周 · ' + phase.label;
  }
  const todayHint = $('#startTodayHint');
  if (todayHint) {
    const weekdayIndex = (new Date().getDay() + 6) % 7;
    const today = state.plan[weekdayIndex];
    if (today.type === '训练') {
      todayHint.textContent = '第 ' + state.selectedWeek + ' 周 · ' + DAYS[weekdayIndex] + ' · ' + today.session;
    } else if (today.type === '攀岩') {
      todayHint.textContent = '第 ' + state.selectedWeek + ' 周 · ' + DAYS[weekdayIndex] + ' · 攀岩日';
    } else {
      todayHint.textContent = '今天休息 · 打开本周安排';
    }
  }

  const trend = weightTrendInfo();
  const weightEl = $('#homeWeight');
  if (weightEl) {
    weightEl.textContent = trend.weight > 0 ? trend.weight.toFixed(1) + ' kg' : '--';
  }
  const changeEl = $('#homeWeightChange');
  const wrap = $('#homeChangeWrap');
  const labelEl = $('#homeChangeLabel');
  if (changeEl && wrap) {
    if (trend.delta === null) {
      changeEl.textContent = '--';
      wrap.className = 'change-cell';
    } else {
      const text = trend.delta > 0.049 ? '+' + trend.delta.toFixed(1) : trend.delta < -0.049 ? trend.delta.toFixed(1) : '±0.0';
      changeEl.textContent = text + ' kg';
      labelEl.textContent = trend.label || '较上次';
      const losing = trend.delta < -0.049;
      const gaining = trend.delta > 0.049;
      const good = (state.profile.goal || '').indexOf('fat') !== -1 ? losing : (state.profile.goal === 'lean-bulk' ? gaining : !gaining && !losing);
      wrap.className = 'change-cell ' + (good ? 'is-good' : gaining || losing ? 'is-warn' : '');
    }
  }

  const macros = currentMacroSplit();
  $('#macroTarget').textContent = formatNumber(macros.target) + ' kcal';
  $('#macroProtein').textContent = macros.protein + ' g';
  $('#macroCarbs').textContent = macros.carbs + ' g';
  $('#macroFat').textContent = macros.fat + ' g';
  const tdeeEl = $('#macroTdee');
  const deltaEl = $('#macroDelta');
  if (tdeeEl && deltaEl) {
    if (macros.tdee) {
      tdeeEl.textContent = formatNumber(macros.tdee) + ' kcal';
      const delta = macros.target - macros.tdee;
      deltaEl.textContent = (delta < 0 ? '' : delta > 0 ? '+' : '') + formatNumber(delta) + ' kcal ' + (delta < 0 ? '赤字' : delta > 0 ? '盈余' : '持平');
      deltaEl.className = 'is-deficit';
    } else {
      tdeeEl.textContent = '--';
      deltaEl.textContent = '填身高腰围后显示';
      deltaEl.className = '';
    }
  }
  const proteinPct = Math.min(100, Math.round((macros.protein * 4 / macros.target) * 100));
  const carbsPct = Math.min(100, Math.round((macros.carbs * 4 / macros.target) * 100));
  const fatPct = Math.min(100, Math.round((macros.fat * 9 / macros.target) * 100));
  const track = document.querySelector('.macro-row[data-macro="protein"] .track i');
  if (track) track.style.width = proteinPct + '%';
  const carbTrack = document.querySelector('.macro-row[data-macro="carbs"] .track i');
  if (carbTrack) carbTrack.style.width = carbsPct + '%';
  const fatTrack = document.querySelector('.macro-row[data-macro="fat"] .track i');
  if (fatTrack) fatTrack.style.width = fatPct + '%';
}

function renderNutritionResult() {
  const container = $('#nutritionResult');
  const button = $('#applyNutrition');
  if (!container || !button) return;
  const plan = nutritionPlan();
  if (!plan) {
    container.innerHTML = '填身高、腰围、颈围（女性再加臀围）后，自动估算体脂、基础代谢与每日建议。';
    container.className = 'nutrition-summary is-empty';
    button.disabled = true;
    return;
  }
  const body = plan.body;
  container.className = 'nutrition-summary';
  container.innerHTML =
    '<div class="nutrition-metric"><span>估算体脂</span><strong>' + (body.bodyFat === null ? '--' : body.bodyFat + '%') + '</strong></div>' +
    '<div class="nutrition-metric"><span>瘦体重</span><strong>' + (body.lbm === null ? '--' : body.lbm + ' kg') + '</strong></div>' +
    '<div class="nutrition-metric"><span>基础代谢</span><strong>' + body.bmr + ' kcal</strong></div>' +
    '<div class="nutrition-metric"><span>TDEE</span><strong>' + plan.tdee + ' kcal</strong></div>' +
    '<div class="nutrition-metric"><span>推荐摄入</span><strong>' + plan.targetCalories + ' kcal</strong></div>' +
    '<small class="nutrition-note">蛋白质 ' + plan.protein + ' g · 脂肪 ' + plan.fat + ' g · 碳水 ' + plan.carbs + ' g</small>';
  button.disabled = false;
}

function renderWeightCheck() {
  const container = $('#weeklyCheck');
  if (!container) return;
  const sorted = state.weights.slice().sort((a, b) => (a.date || '').localeCompare(b.date || ''));
  if (sorted.length < 2) {
    container.innerHTML = '';
    return;
  }
  const last = numValue(sorted[sorted.length - 1].weight);
  const previous = numValue(sorted[sorted.length - 2].weight);
  const delta = last - previous;
  const spanDays = Math.max(1, Math.round((Date.parse(sorted[sorted.length - 1].date) - Date.parse(sorted[sorted.length - 2].date)) / 86400000));
  const goal = state.profile.goal || 'mild-fat-loss';
  let text = '';
  if (goal.indexOf('fat') !== -1 && delta >= -0.2) {
    text = '最近两次体重没有明显下降：若已连续两周无变化，可把每日目标下调 100–150 kcal，训练安排保持不变。';
  } else if (goal === 'lean-bulk' && delta / previous > 0.005 * (spanDays / 7)) {
    text = '体重上涨偏快：可把每日盈余下调约 5%，同时保持蛋白质充足。';
  }
  container.innerHTML = text;
}

function renderWeekSelect() {
  const select = $('#weekSelect');
  if (!select) return;
  select.innerHTML = WEEK_PHASES.map(
    (phase, index) =>
      '<option value="' + (index + 1) + '"' + (state.selectedWeek === index + 1 ? ' selected' : '') + '>第 ' + (index + 1) + ' 周 · ' + phase.label + '</option>'
  ).join('');
}

function renderPhaseBanner() {
  const banner = $('#phaseBanner');
  if (!banner) return;
  const phase = currentPhase();
  banner.innerHTML =
    '<div><span>当前训练周</span><strong>第 ' + state.selectedWeek + ' 周</strong></div>' +
    '<div><span>阶段</span><strong>' + phase.label + '</strong></div>' +
    '<div><span>主项目标 RPE</span><strong>' + phase.rpe + '</strong></div>' +
    '<div><span>本周重点</span><strong>' + phase.desc + '</strong></div>';
}

function todayStr() {
  const date = new Date();
  return date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
}

function trainingDays() {
  return state.plan
    .map((day, index) => ({ day, index }))
    .filter((entry) => entry.day.type === '训练');
}

function renderTrainingLogs() {
  const container = $('#trainingLogs');
  const logs = state.logs.slice().sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  if (logs.length === 0) {
    container.innerHTML = '<div class="empty">还没有训练记录。点“记录本次训练”开始记录重量、次数和 RPE。</div>';
    return;
  }
  container.innerHTML = logs
    .map(
      (log, index) =>
        '<div class="log-item" data-log="' + index + '">' +
        '<div><strong>第 ' + log.week + ' 周 · ' + DAYS[log.dayIndex] + '</strong><span>' + (log.date || '') + '</span></div>' +
        '<div><strong>' + (log.session || '训练') + '</strong>' +
        '<span>' +
        (log.items || [])
          .map((item) => (item.name || '') + ' ' + (item.weight || '自重') + 'kg × ' + (item.reps || '-') + ' · RPE ' + (item.rpe || '-'))
          .join('；') +
        '</span>' +
        (log.note ? '<span>' + escapeHtml(log.note) + '</span>' : '') +
        '</div>' +
        '<button class="small-btn" data-delete-log="' + log.id + '" type="button">删除</button>' +
        '</div>'
    )
    .join('');
}

function openLogModal() {
  const days = trainingDays();
  if (days.length === 0) {
    showToast('本周没有训练日');
    return;
  }
  $('#logDate').value = todayStr();
  $('#logDay').innerHTML = days
    .map((entry) => '<option value="' + entry.index + '">' + DAYS[entry.index] + ' · ' + (entry.day.session || '训练') + '</option>')
    .join('');
  $('#logModal').hidden = false;
  renderLogRows(Number($('#logDay').value));
}

function renderLogRows(dayIndex) {
  const day = state.plan[dayIndex];
  const container = $('#logExerciseRows');
  const exercises = dayExercises(day);
  if (exercises.length === 0) {
    container.innerHTML = '<div class="empty">这个训练日还没有动作。</div>';
    return;
  }
  container.innerHTML = exercises
    .map((exercise) => {
      const suggestion = suggestedLoad(exercise);
      const suggestedWeight = suggestion ? (suggestion.text.match(/[\d.]+/) || [''])[0] : '';
      return (
        '<div class="log-row">' +
        '<strong>' + escapeHtml(exercise.name) + '</strong>' +
        '<input class="log-weight" type="number" step="0.5" min="0" placeholder="重量" value="' + escapeHtml(suggestedWeight || '') + '">' +
        '<input class="log-reps" type="text" placeholder="次数" value="' + escapeHtml(exercise.reps || '') + '">' +
        '<input class="log-rpe" type="number" step="0.5" min="1" max="10" placeholder="RPE" value="' + currentPhase().rpe + '">' +
        '</div>'
      );
    })
    .join('');
}

function saveLog() {
  const dayIndex = Number($('#logDay').value);
  const day = state.plan[dayIndex];
  const date = $('#logDate').value;
  if (!date) {
    showToast('请选择日期');
    return;
  }
  const items = [...document.querySelectorAll('#logExerciseRows .log-row')].map((row) => ({
    name: row.querySelector('strong').textContent.trim(),
    weight: row.querySelector('.log-weight').value || '自重',
    reps: row.querySelector('.log-reps').value || '-',
    rpe: row.querySelector('.log-rpe').value || '-'
  }));
  if (items.length === 0) {
    showToast('没有可记录的动作');
    return;
  }
  state.logs.push({
    id: 'log-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6),
    week: state.selectedWeek,
    dayIndex,
    date,
    session: day.session || '训练',
    items,
    note: ''
  });
  saveState();
  $('#logModal').hidden = true;
  renderAll();
  showToast('训练记录已保存');
}

function renderWeights() {
  const listContainer = $('#weightList');
  const trendContainer = $('#weightTrend');
  if ($('#weightDate') && !$('#weightDate').value) $('#weightDate').value = todayStr();
  const weights = state.weights.slice().sort((a, b) => (a.date || '').localeCompare(b.date || ''));
  listContainer.innerHTML =
    weights.length === 0
      ? '<div class="empty">还没有体重记录。填写日期和体重后保存。</div>'
      : weights
          .slice()
          .reverse()
          .map(
            (weight) =>
              '<div class="weight-row"><strong>' + (weight.date || '') + '</strong><strong>' + Number(weight.weight).toFixed(1) + ' kg</strong>' +
              '<span class="muted">' + (weight.note || '—') + '</span>' +
              '<button class="small-btn" data-delete-weight="' + weight.id + '" type="button">删除</button></div>'
          )
          .join('');

  const latestByWeek = {};
  weights.forEach((weight) => {
    latestByWeek[weight.week || state.selectedWeek] = Number(weight.weight);
  });
  if (Object.keys(latestByWeek).length === 0) {
    trendContainer.innerHTML = '';
    return;
  }
  const values = WEEK_PHASES.map((phase, index) => latestByWeek[index + 1] || null);
  const nums = values.filter((value) => value !== null);
  const min = Math.min(...nums);
  const max = Math.max(...nums);
  const range = Math.max(1, max - min);
  trendContainer.innerHTML = values
    .map((value, index) => {
      if (value === null) return '<div class="weight-bar"><div class="empty">—</div></div>';
      const height = 16 + ((value - min) / range) * 90;
      return '<div class="weight-bar"><div class="bar" style="height:' + height + 'px"></div><span>' + (index + 1) + '</span></div>';
    })
    .join('');
}

function renderWeek() {
  const container = $('#weekGrid');
  container.innerHTML = state.plan
    .map((day, index) => {
      const typeOptions = ['训练', '攀岩', '休息']
        .map((type) => '<option value="' + type + '"' + (day.type === type ? ' selected' : '') + '>' + type + '</option>')
        .join('');
      const sessionSelect =
        day.type === '训练'
          ? '<div class="field"><span>训练主题</span><select data-session="' + index + '">' +
            SESSION_OPTIONS.map((session) => '<option value="' + session + '"' + (day.session === session ? ' selected' : '') + '>' + session + '</option>').join('') +
            '</select></div>'
          : '';
      const noteInput =
        day.type === '攀岩' || day.type === '休息'
          ? '<div class="field"><span>' + (day.type === '攀岩' ? '攀岩备注' : '恢复备注') + '</span><input type="text" data-note="' + index + '" value="' + escapeHtml(day.note || '') + '"></div>'
          : '';
      const actionPreview =
        day.type === '训练'
          ? renderMiniActions(day, index)
          : day.type === '攀岩'
            ? '<div class="climb-note">肩外旋热身 → 低难度热手 → 单线连续尝试 ≤ 3–4 次 → 拉伸</div>'
            : '<div class="rest-note">恢复日 · 让指腱和神经系统休息</div>';
      const actionButton =
        day.type === '训练'
          ? '<button class="small-btn" data-edit="' + index + '" type="button">编辑动作</button>' +
            (day.custom ? '<button class="small-btn green" data-reset="' + index + '" type="button">恢复推荐</button>' : '')
          : '';
      const metrics =
        day.type !== '休息'
          ? '<div class="day-metrics">' +
            '<div class="field"><span>时长（分钟）</span><input type="number" data-duration="' + index + '" value="' + day.duration + '" min="0" step="5"></div>' +
            '<div class="field"><span>强度</span><select data-intensity="' + index + '">' +
            ['低', '中', '高'].map((level) => '<option value="' + level + '"' + (day.intensity === level ? ' selected' : '') + '>' + level + '</option>').join('') +
            '</select></div>' +
            '</div>'
          : '';
      const estimateBadge =
        day.type !== '休息'
          ? '<div class="estimate-badge">预估消耗 <span>约 ' + estimateDayCalories(day) + ' kcal</span></div>'
          : '';
      return (
        '<div class="day-card" data-type="' + day.type + '">' +
        '<div class="day-name">' + DAYS[index] + '</div>' +
        '<div class="field"><span>类型</span><select data-type="' + index + '">' + typeOptions + '</select></div>' +
        sessionSelect +
        noteInput +
        metrics +
        estimateBadge +
        '<div class="field"><span>当天安排</span><div class="day-actions">' + actionPreview + actionButton + '</div></div>' +
        '</div>'
      );
    })
    .join('');
}

function renderMiniActions(day, index) {
  const exercises = dayExercises(day).slice(0, 3);
  if (exercises.length === 0) {
    return '<div class="rest-note">还没有动作，点“编辑动作”添加。</div>';
  }
  return exercises
    .map((exercise) => {
      const lib = libraryById(exercise.lib);
      const media = lib ? '<img src="' + escapeHtml(lib.gif) + '" alt="" loading="lazy">' : '<img src="" alt="">';
      const load = suggestedLoad(exercise);
      return (
        '<div class="mini-exercise">' +
        media +
        '<div><strong>' + escapeHtml(exercise.name) + '</strong><span>' + escapeHtml(exercise.sets || '') + ' 组 × ' + escapeHtml(exercise.reps || '') + '</span>' +
        (load ? '<span class="load-hint">' + escapeHtml(load.text) + '</span>' : '') +
        '</div>' +
        '</div>'
      );
    })
    .join('');
}

function openEditor(index) {
  const day = state.plan[index];
  if (day.type !== '训练') return;
  editingDay = index;
  exerciseSearch = '';
  editingExercises = clone(dayExercises(day));
  $('#modalTitle').textContent = '编辑动作';
  $('#modalDayName').textContent = DAYS[index] + ' · ' + (day.session || '训练');
  $('#exerciseModal').hidden = false;
  $('#exerciseSearch').value = '';
  renderSelected();
  renderLibrary();
}

function closeEditor() {
  $('#exerciseModal').hidden = true;
  editingDay = null;
  editingExercises = [];
}

function renderSelected() {
  const container = $('#selectedExercises');
  if (editingExercises.length === 0) {
    container.innerHTML = '<div class="empty">还没有动作，从下方动作库点击添加。</div>';
    return;
  }
  container.innerHTML = editingExercises
    .map(
      (exercise, index) => {
        const load = suggestedLoad(exercise);
        return (
        '<div class="selected-row" data-lib="' + escapeHtml(exercise.lib || '') + '">' +
        '<div class="selected-name"><strong>' + escapeHtml(exercise.name) + '</strong>' +
        (load ? '<span class="load-hint">' + escapeHtml(load.text) + '</span>' : '') +
        '</div>' +
        '<input class="sets-input" type="text" value="' + escapeHtml(exercise.sets || '') + '" placeholder="组数">' +
        '<input class="reps-input" type="text" value="' + escapeHtml(exercise.reps || '') + '" placeholder="次数">' +
        '<button class="icon-btn remove-btn" data-index="' + index + '" type="button" aria-label="删除">×</button>' +
        '</div>'
        );
      }
    )
    .join('');
}

function renderLibrary() {
  const grid = $('#exerciseGrid');
  const query = exerciseSearch.trim().toLowerCase();
  const list = allowedLibrary().filter((exercise) => {
    const haystack = (exercise.zh + ' ' + exercise.en + ' ' + exercise.equipment + ' ' + exercise.target).toLowerCase();
    return !query || haystack.includes(query);
  });
  grid.innerHTML = list
    .map(
      (exercise) =>
        '<button class="exercise-option" data-lib="' + exercise.id + '" type="button">' +
        '<img src="' + escapeHtml(exercise.gif) + '" alt="" loading="lazy">' +
        '<strong>' + escapeHtml(exercise.zh) + '</strong>' +
        '<span>' + escapeHtml(exercise.cat) + ' · ' + escapeHtml(exercise.equipment) + '</span>' +
        '</button>'
    )
    .join('');
}

function addLibraryExercise(id) {
  const item = libraryById(id);
  if (!item) return;
  if (editingExercises.some((exercise) => exercise.lib === id)) return;
  editingExercises.push({ name: item.zh, lib: id, sets: '3', reps: '10' });
  renderSelected();
}

function loadTemplate() {
  const day = state.plan[editingDay];
  if (day.session && SESSIONS[day.session]) {
    editingExercises = clone(SESSIONS[day.session]);
  }
  renderSelected();
}

function saveExercises() {
  if (editingDay === null) return;
  const day = state.plan[editingDay];
  day.exercises = [...document.querySelectorAll('#selectedExercises .selected-row')].map((row) => ({
    name: row.querySelector('strong').textContent.trim(),
    lib: row.dataset.lib || null,
    sets: row.querySelector('.sets-input').value.trim() || '3',
    reps: row.querySelector('.reps-input').value.trim() || '10'
  }));
  day.custom = true;
  closeEditor();
  saveState();
  renderAll();
  showToast('动作已保存');
}

function bindEvents() {
  document.querySelectorAll('.menu-card').forEach((card) => {
    card.addEventListener('click', () => showView(card.dataset.view));
  });
  document.querySelectorAll('.quick-card').forEach((card) => {
    card.addEventListener('click', () => {
      if (card.dataset.view) showView(card.dataset.view);
    });
  });
  document.querySelectorAll('#bottomNav button').forEach((button) => {
    button.addEventListener('click', () => showView(button.dataset.nav));
  });
  $('#backHome').addEventListener('click', () => showView('home'));
  $('#syncNow').addEventListener('click', () => syncNow(true));
  $('#authForm').addEventListener('submit', (event) => event.preventDefault());
  $('#authSendLink').addEventListener('click', sendLoginLink);
  $('#authRegisterLink').addEventListener('click', () => {
    window.location.href = 'register.html';
  });
  $('#authLogout').addEventListener('click', signOutSupabase);
  $('#mobileView').addEventListener('click', () => {
    const mobile = document.body.classList.toggle('mobile-mode');
    $('#mobileView').textContent = mobile ? '电脑版' : '手机版';
    showView(currentView);
  });

  const profileNumberFields = {
    profileAge: 'age',
    profileHeight: 'height',
    profileWeight: 'weight',
    profileWaist: 'waist',
    profileNeck: 'neck',
    profileHip: 'hip',
    profileSquat: 'squat',
    profileBench: 'bench',
    profileDeadlift: 'deadlift',
    profilePress: 'press',
    profileCalories: 'calories',
    profileProtein: 'protein'
  };
  Object.keys(profileNumberFields).forEach((id) => {
    $('#' + id).addEventListener('input', (event) => {
      const field = profileNumberFields[id];
      state.profile[field] = event.target.value === '' ? '' : Number(event.target.value);
      renderStats();
      saveState();
    });
  });
  const profileSelectFields = {
    profileGender: 'gender',
    profileActivity: 'activity',
    profileGoal: 'goal'
  };
  Object.keys(profileSelectFields).forEach((id) => {
    $('#' + id).addEventListener('change', (event) => {
      const field = profileSelectFields[id];
      state.profile[field] = event.target.value;
      renderProfile();
      renderStats();
      saveState();
    });
  });
  $('#applyNutrition').addEventListener('click', () => {
    const plan = nutritionPlan();
    if (!plan) return;
    state.profile.calories = plan.targetCalories;
    state.profile.protein = plan.protein;
    saveState();
    renderProfile();
    renderStats();
    showToast('已套用推荐目标');
  });

  const saveAllBtn = $('#saveAll');
  if (saveAllBtn) {
    saveAllBtn.addEventListener('click', () => {
      saveState();
      renderAll();
      showToast('计划已保存');
    });
  }

  $('#printPlan').addEventListener('click', () => window.print());

  $('#weekGrid').addEventListener('change', (event) => {
    const target = event.target;
    if (target.dataset.type !== undefined) {
      const index = Number(target.dataset.type);
      state.plan[index].type = target.value;
      if (target.value !== '训练') {
        state.plan[index].session = null;
        state.plan[index].exercises = null;
        state.plan[index].custom = false;
        if (target.value === '攀岩' && !state.plan[index].note) {
          state.plan[index].note = '抱石磕线 60–90 分钟；先热身和低难度热手。';
        }
        state.plan[index].duration = target.value === '攀岩' ? 90 : 0;
        state.plan[index].intensity = target.value === '攀岩' ? '中' : null;
        if (target.value === '休息') state.plan[index].note = '恢复、拉伸、散步';
      } else {
        state.plan[index].session = state.plan[index].session || SESSION_OPTIONS[0];
        state.plan[index].note = '';
        state.plan[index].exercises = null;
        state.plan[index].custom = false;
        state.plan[index].duration = state.plan[index].duration || 60;
        state.plan[index].intensity = '中';
      }
      renderAll();
    } else if (target.dataset.session !== undefined) {
      const index = Number(target.dataset.session);
      state.plan[index].session = target.value;
      state.plan[index].exercises = null;
      state.plan[index].custom = false;
      renderAll();
    } else if (target.dataset.intensity !== undefined) {
      const index = Number(target.dataset.intensity);
      state.plan[index].intensity = target.value;
      renderStats();
      const badge = target.closest('.day-card').querySelector('.estimate-badge span');
      if (badge) badge.textContent = '约 ' + estimateDayCalories(state.plan[index]) + ' kcal';
    }
    saveState();
  });

  $('#weekGrid').addEventListener('input', (event) => {
    const target = event.target;
    if (target.dataset.note !== undefined) {
      state.plan[Number(target.dataset.note)].note = target.value;
    } else if (target.dataset.duration !== undefined) {
      const index = Number(target.dataset.duration);
      state.plan[index].duration = Number(target.value) || 0;
      renderStats();
      const badge = target.closest('.day-card').querySelector('.estimate-badge span');
      if (badge) badge.textContent = '约 ' + estimateDayCalories(state.plan[index]) + ' kcal';
    }
    saveState();
  });

  $('#weekGrid').addEventListener('click', (event) => {
    if (event.target.dataset.edit !== undefined) {
      openEditor(Number(event.target.dataset.edit));
    } else if (event.target.dataset.reset !== undefined) {
      const index = Number(event.target.dataset.reset);
      state.plan[index].exercises = null;
      state.plan[index].custom = false;
      renderAll();
      saveState();
    }
  });

  $('#weekSelect').addEventListener('change', (event) => {
    state.selectedWeek = Number(event.target.value);
    saveState();
    renderAll();
  });

  $('#startToday').addEventListener('click', () => {
    const weekdayIndex = (new Date().getDay() + 6) % 7;
    const today = state.plan[weekdayIndex];
    if (today && today.type === '训练') {
      openLogModal();
    } else if (today && today.type === '攀岩') {
      showToast('今天是攀岩日');
      showView('plan');
    } else {
      showToast('今天安排休息');
      showView('plan');
    }
  });
  $('#quickWeight').addEventListener('click', () => showView('weight'));
  $('#openLog').addEventListener('click', openLogModal);
  $('#openLogPlan').addEventListener('click', openLogModal);
  $('#closeLogModal').addEventListener('click', () => {
    $('#logModal').hidden = true;
  });
  $('#cancelLogModal').addEventListener('click', () => {
    $('#logModal').hidden = true;
  });
  $('#logDay').addEventListener('change', (event) => renderLogRows(Number(event.target.value)));
  $('#saveLog').addEventListener('click', saveLog);
  $('#trainingLogs').addEventListener('click', (event) => {
    const button = event.target.closest('[data-delete-log]');
    if (!button) return;
    state.logs = state.logs.filter((log) => log.id !== button.dataset.deleteLog);
    saveState();
    renderTrainingLogs();
  });

  $('#saveWeight').addEventListener('click', () => {
    const date = $('#weightDate').value;
    const weight = Number($('#weightValue').value);
    if (!date || !weight || weight <= 0) {
      showToast('请填写日期和有效体重');
      return;
    }
    state.weights.push({
      id: 'w-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6),
      date,
      weight,
      week: state.selectedWeek,
      note: $('#weightNote').value.trim()
    });
    $('#weightValue').value = '';
    $('#weightNote').value = '';
    saveState();
    renderWeights();
    renderWeightCheck();
    renderDashboard();
    showToast('体重已保存');
  });
  $('#weightList').addEventListener('click', (event) => {
    const button = event.target.closest('[data-delete-weight]');
    if (!button) return;
    state.weights = state.weights.filter((weight) => weight.id !== button.dataset.deleteWeight);
    saveState();
    renderWeights();
    renderWeightCheck();
    renderDashboard();
  });

  $('#exerciseGrid').addEventListener('click', (event) => {
    const option = event.target.closest('[data-lib]');
    if (option) addLibraryExercise(option.dataset.lib);
  });

  $('#exerciseSearch').addEventListener('input', (event) => {
    exerciseSearch = event.target.value;
    renderLibrary();
  });

  $('#selectedExercises').addEventListener('click', (event) => {
    const button = event.target.closest('.remove-btn');
    if (button) {
      editingExercises.splice(Number(button.dataset.index), 1);
      renderSelected();
    }
  });

  $('#loadTemplate').addEventListener('click', loadTemplate);
  $('#saveExercises').addEventListener('click', saveExercises);
  $('#closeModal').addEventListener('click', closeEditor);
  $('#cancelModal').addEventListener('click', closeEditor);
}

let toastTimer = null;
function showToast(message) {
  let el = $('#toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'toast';
    el.className = 'toast';
    document.body.appendChild(el);
  }
  el.textContent = message;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 1800);
}

bindEvents();
renderAll();
if (/Mobi|Android|iPhone|iPad|Phone/i.test(navigator.userAgent) || (navigator.maxTouchPoints > 0 && window.innerWidth < 1000)) {
  document.body.classList.add('mobile-mode');
  $('#mobileView').textContent = '电脑版';
}

(async () => {
  const cfg = window.SUPABASE_CONFIG || {};
  if (cfg.url && cfg.anonKey) {
    initSupabase();
    watchAuthState();
    const { data } = await supabaseClient.auth.getSession();
    if (data.session) {
      await applyUserSession(data.session);
    } else {
      setAuthScreen(true);
      setAuthMessage('已有账号直接发送；新账号请点下方注册');
    }
  } else if (location.protocol === 'http:' || location.protocol === 'https:') {
    setTimeout(() => syncNow(false), 400);
  }
})();
