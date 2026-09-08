import { supabase } from './supabaseClient.js';

export const remoteEnabled = !!supabase;

const readLS = (key, fallback) => { try { const raw = localStorage.getItem(key); if (raw === null) return fallback; return JSON.parse(raw); } catch { return fallback; } };
const writeLS = (key, value) => localStorage.setItem(key, JSON.stringify(value));

export const uid = () => (crypto.randomUUID ? crypto.randomUUID() : 'id-' + Date.now() + '-' + Math.random().toString(16).slice(2));

const projectFromDb = r => ({ id:r.id, title:r.title, desc:r.description, tags:r.tags, langs:r.langs, tone:r.tone, image:r.image, website:r.website, github:r.github });
const projectToDb = p => ({ id:p.id, title:p.title, description:p.desc, tags:p.tags, langs:p.langs, tone:p.tone, image:p.image, website:p.website, github:p.github });
const serviceFromDb = r => ({ id:r.id, title:r.title, desc:r.description, price:r.price, oldPrice:r.old_price });
const serviceToDb = s => ({ id:s.id, title:s.title, description:s.desc, price:s.price, old_price:s.oldPrice });

export async function loadSite(defaults, initialProjects, initialServices) {
  if (!supabase) {
    return {
      settings: readLS('cfx-settings', defaults),
      available: readLS('cfx-available', true),
      projects: readLS('cfx-projects', initialProjects),
      services: readLS('cfx-services', initialServices),
    };
  }
  try {
    const [settingsRes, projectsRes, servicesRes] = await Promise.all([
      supabase.from('site_settings').select('*').eq('id', 'main').maybeSingle(),
      supabase.from('projects').select('*').order('sort_order'),
      supabase.from('services').select('*').order('sort_order'),
    ]);
    const row = settingsRes.data;
    return {
      settings: row ? { brand: row.brand, domain: row.domain, email: row.email, location: row.location, profileImage: row.profile_image || '', logo: row.logo || '' } : defaults,
      available: row ? !!row.available : true,
      projects: (projectsRes.data || []).map(projectFromDb),
      services: (servicesRes.data || []).map(serviceFromDb),
    };
  } catch {
    return { settings: defaults, available: true, projects: [], services: [] };
  }
}

export async function saveSettings(settings, available) {
  if (!supabase) { writeLS('cfx-settings', settings); writeLS('cfx-available', available); return true; }
  const { error } = await supabase.from('site_settings').upsert({ id: 'main', brand: settings.brand, domain: settings.domain, email: settings.email, location: settings.location, profile_image: settings.profileImage, logo: settings.logo, available });
  return !error;
}

export async function saveProjectsRemote(projects) {
  if (!supabase) { writeLS('cfx-projects', projects); return true; }
  if (!projects.length) return true;
  const rows = projects.map((p, i) => ({ ...projectToDb(p), sort_order: i }));
  const { error } = await supabase.from('projects').upsert(rows);
  return !error;
}

export async function saveServicesRemote(services) {
  if (!supabase) { writeLS('cfx-services', services); return true; }
  if (!services.length) return true;
  const rows = services.map((s, i) => ({ ...serviceToDb(s), sort_order: i }));
  const { error } = await supabase.from('services').upsert(rows);
  return !error;
}

export async function addProjectRemote(p) {
  const withId = { ...p, id: p.id || uid() };
  if (!supabase) return withId;
  const { data, error } = await supabase.from('projects').insert({ ...projectToDb(withId), sort_order: Date.now() }).select().maybeSingle();
  return error ? null : projectFromDb(data);
}

export async function deleteProjectRemote(id) {
  if (!supabase) return true;
  const { error } = await supabase.from('projects').delete().eq('id', id);
  return !error;
}

export async function addServiceRemote(s) {
  const withId = { ...s, id: s.id || uid() };
  if (!supabase) return withId;
  const { data, error } = await supabase.from('services').insert({ ...serviceToDb(withId), sort_order: Date.now() }).select().maybeSingle();
  return error ? null : serviceFromDb(data);
}

export async function deleteServiceRemote(id) {
  if (!supabase) return true;
  const { error } = await supabase.from('services').delete().eq('id', id);
  return !error;
}

export async function signIn(email, password) {
  if (!supabase) return { ok: false, error: 'Supabase не е конфигуриран.' };
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  return { ok: !error, error: error?.message };
}

export async function signOutRemote() { if (supabase) await supabase.auth.signOut(); }

export async function getSession() { if (!supabase) return null; const { data } = await supabase.auth.getSession(); return data.session; }

export function onAuthChange(cb) {
  if (!supabase) return () => {};
  const { data } = supabase.auth.onAuthStateChange((_evt, session) => cb(session));
  return () => data.subscription.unsubscribe();
}
