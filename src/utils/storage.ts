import { MemoryPhoto, SecretLetter, PublicLetter, LoveReason, BirthdayCakeData } from '../types';

const DB_NAME = 'AyowehBirthdayAppDB';
const DB_VERSION = 1;
const STORE_SONG = 'customSong';
const STORE_PHOTOS = 'customPhotos';

// Default initial data
export const DEFAULT_SECRET_LETTER: SecretLetter = {
  id: 'secret-letter-1',
  title: 'الجواب السري المقفول لعيونك يا روحي 💌',
  recipient: 'إلى طفلتي المدللة وأغلى ما أملك.. أيويه 💕',
  salutation: 'حبيبتي ونور عيوني وضحكة أيامي،',
  paragraphs: [
    'كتبتلك الجواب دا في لحظة سكون والدنيا كلها نايمة، ما فيش غير صوت دقات قلبي اللي بتنادي باسمك، وصورتك اللي ما بتفارقش خيالي ولا ثانية واحدة.',
    'عارفة يا أيويه؟ قبل ما أعرفك كانت الأيام بتعدي عادية وباهتة، بس من أول ما شوفتك ودخلتي حياتي، بقى لكل حاجة طعم ومعنى وروح جديدة. ضحكتك دي بالنسبة لي حياة تانية، ولمعة عينك فيها أمان عمري ما حسيته غير معاكي.',
    'النهاردة وانتي بتكبري سنة جديدة وبتكملي 19 سنة، مش بس بحتفل بعيد ميلادك، أنا بحتفل باليوم اللي اتولد فيه قدري ونصيبي الحلو اللي ربنا رزقني بيه.',
    'وعد مني ليكي يا ست البنات، هفضل جنبك وسندك وضهرك، هكون ليكي الأب والأخ والحبيب والصديق، ومش هسمح للزعل يلمس قلبك الصافي أبدًا طول ما فيا نفس بيتنفس.',
    'كل سنة وانتي نصي التاني، كل سنة وانتي حبيبتي وبنتي وأميرتي وكل دنيتي.'
  ],
  closing: 'المخلص ليكي لآخر العمر،',
  sender: 'حبيبك فارس 👑',
  specialNote: 'ملحوظة سرية: بحبك في كل ثانية أكتر من اللي قبلها بألف مرة ❤️',
  waxInitials: 'A & F'
};

export const DEFAULT_PUBLIC_LETTER: PublicLetter = {
  id: 'public-letter-2',
  title: 'جواب حب لست البنات وأميرة قلبي 👑💌',
  subtitle: 'إلى حتة السكر اللي نورت سنيني وعمري كله.. أيويه',
  meetingDateText: 'يوم 21 يوليو 2026 - اليوم الذي بدأ فيه تاريخي الحقيقي',
  meetingDate: '2026-07-21',
  birthdayDate: '2007-10-20',
  paragraphs: [
    'يا أيويه يا روحي.. مش صدفة إن 21 يوليو يكون اليوم اللي اتقابلنا فيه، دا كان تدبير ربنا علشان يرزقني بأجمل وأطيب قلب في الكون كله. من اليوم دا وحياتي اتغيرت 180 درجة، اتعلمت يعني إيه حب حقيقي، يعني إيه أستنى رسالة من حد بلهفة، ويعني إيه أكون مبسوط بس لمجرد إني سامع صوتك.',
    'النهاردة 20 أكتوبر.. اليوم اللي شرفت فيه أجمل بنوتة الدنيا كلها من 19 سنة سنة 2007. يوم ميلادك دا عيد مش ليكي لوحدك، دا عيد لقلبي اللي اتنفس بوجودك وعاش على حبك.',
    'انتي مش مجرد حبيبة، انتي أماني وملجأي، انتي البنوتة اللي لما بكون تعبان كلمة واحدة منها بترد فيا الروح. كل تفصيلة فيكي بحبها، غيرتك الرقيقة، طفولتك اللذيذة، ضحكتك اللي بتسرق قلبي كل ما بشوفها.',
    'بحبك يا أيويه.. بحبك بقلب صادق ميعرفش غيرك، وهفضل أحبك لحد ما الشيب يملى شعرنا وإيدي في إيدك، وكل عيد ميلاد واحنا مع بعض وبنكبر سوا في حب ملوش نهاية.'
  ],
  signature: 'فارس.. اللي قلبه بقى ملكك للأبد ❤️',
  heartbeatsSent: 19
};

export const DEFAULT_LOVE_REASONS: LoveReason[] = [
  {
    id: 'reason-1',
    icon: '✨',
    title: 'ضحكتك الساحرة',
    description: 'ضحكتك يا أيويه قادرة تمحي أي هم أو تعب في ثانية واحدة، وترجع النور لروحي من جديد.'
  },
  {
    id: 'reason-2',
    icon: '🌸',
    title: 'براءتك وطفولتك الحلوة',
    description: 'قلبك الأبيض النقي اللي مليان حنية وطيبة مفيش زيه في الدنيا كلها.'
  },
  {
    id: 'reason-3',
    icon: '💫',
    title: 'نظرة عينك اللي بتسحرني',
    description: 'لما بتبصي لي بحس إني امتلكت العالم كله، وفي عيونك بشوف مستقبلي وأحلامي.'
  },
  {
    id: 'reason-4',
    icon: '👑',
    title: 'إنك ست البنات وأميرتي',
    description: 'شخصيتك الفريدة، هدوئك، وحضورك اللي بيطغى على أي مكان وتفضلي دايمًا الملكة.'
  },
  {
    id: 'reason-5',
    icon: '💖',
    title: 'اهتمامك وحنيتك عليا',
    description: 'خوفك عليا وسؤالك المستمر في تفاصيل يومي بيحسسني إني أغلى إنسان عندك.'
  },
  {
    id: 'reason-6',
    icon: '🎀',
    title: 'دلعك وغمرتك الرقيقة',
    description: 'زعلتك الطفولية اللي بتدوب قلبي ودلعك اللي ملوش مثيل، ما بقدرش أقاوم جمالك فيه.'
  },
  {
    id: 'reason-7',
    icon: '🌹',
    title: 'يوم 21 يوليو 2026',
    description: 'اليوم اللي القدر جمعنا فيه وخلى قلوبنا تدق بنفس النبضة ونفس الشغف.'
  },
  {
    id: 'reason-8',
    icon: '🕊️',
    title: 'الأمان والراحة معاكي',
    description: 'معاكي بكون على طبيعتي وبحس براحة بال واستقرار نفسي عمري ما عشته قبلك.'
  },
  {
    id: 'reason-9',
    icon: '🔥',
    title: 'غيرتك اللطيفة',
    description: 'طريقتك لما بتغيري بتثبت لي كل يوم قد إيه مكانتي غالية في قلبك وبحبها من كل قلبي.'
  },
  {
    id: 'reason-10',
    icon: '🌙',
    title: 'كلامنا وسهرنا اللي ما بنشبعش منه',
    description: 'الساعات بتعدي كأنها ثواني وإحنا سوا، وأول ما بنقفل بتوحشيني في نفس اللحظة.'
  },
  {
    id: 'reason-11',
    icon: '🔮',
    title: 'أحلامنا وبيتنا اللي هنرسمه سوا',
    description: 'كل خطوة وكل يوم بيقربنا للحلم الكبير اللي بنتمناه وبنشتغل علشانه بحب.'
  },
  {
    id: 'reason-12',
    icon: '♾️',
    title: 'لإنك إنتي وبس.. أيويه!',
    description: 'بحبك بكل ما فيكي وبكل تفاصيلك، حب أبدي مالهوش شروط ولا حدود ولا نهاية.'
  }
];

export const DEFAULT_CAKE_DATA: BirthdayCakeData = {
  sectionTitle: 'انفخي في الشموع واتمني أمنية يا روحي 🎂✨',
  sectionSubtitle: '19 شمعة بتنور حياتنا.. كل شمعة فيها دعوة من قلبي ليكي بالسعادة والفرح وراحة البال.',
  tier1Text: '19 سنة قمر 🌸',
  tier2Text: 'أيويه & فارس',
  tier3Text: '20 أكتوبر 2007 • كل ثانية بحبك أكتر ♾️',
  wishText: 'يا رب كل سنة وانتي في حضني ومعايا، وأشوف الضحكة اللي بتنور دنيتي دايمًا على وشك.. يا رب يحققلك كل اللي بتتمنيه، ونفضل سند لبعض لحد آخر العمر.. بحبك يا أيويه يا ست البنات ❤️',
  wishSender: 'فارس'
};

export const DEFAULT_SAMPLE_MEMORIES: MemoryPhoto[] = [
  {
    id: 'mem-1',
    title: 'أول لقاء وأول نبضة قلب',
    date: '21 يوليو 2026',
    caption: 'اليوم اللي غير تاريخ قلبي وابتدى فيه كل الجمال.. نظرة عينك الأولى مستحيل أنساها طول عمري.',
    imageUrl: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=1200&q=80',
    isCustom: false
  },
  {
    id: 'mem-2',
    title: 'وردة حمراء لأجمل وردة',
    date: 'أغسطس 2026',
    caption: 'كل الورود في الدنيا تذبل إلا وردة حبك في قلبي بتكبر وبتزهر كل يوم أكتر وأكتر.',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    isCustom: false
  },
  {
    id: 'mem-3',
    title: 'سهرة وليلة قمرية دافية',
    date: 'سبتمبر 2026',
    caption: 'القمر في السما وانتي القمر اللي منور حياتي وأيامي، مفيش ليلة بتعدي غير وانتي في بالي.',
    imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80',
    isCustom: false
  },
  {
    id: 'mem-4',
    title: 'عيد ميلادك الـ 19 يا روح قلبي',
    date: '20 أكتوبر 2026',
    caption: 'سنة جديدة في عمرك وسنة جديدة في حبنا.. كل سنة وانتي منورة الكون ومحلية دنيتي يا أيويه.',
    imageUrl: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=1200&q=80',
    isCustom: false
  }
];

// Open IndexedDB safely
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    try {
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(STORE_SONG)) {
          db.createObjectStore(STORE_SONG, { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains(STORE_PHOTOS)) {
          db.createObjectStore(STORE_PHOTOS, { keyPath: 'id' });
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    } catch (e) {
      reject(e);
    }
  });
}

// ----------------- Server Sync API Helpers -----------------

export interface ServerSyncData {
  secretLetter?: SecretLetter;
  publicLetter?: PublicLetter;
  cakeData?: BirthdayCakeData;
  loveReasons?: LoveReason[];
  memories?: MemoryPhoto[];
  hasCustomAudio?: boolean;
  audioName?: string;
}

/**
 * Fetch all persistent data from the backend server, respecting local storage edits
 */
export async function fetchServerAppData(): Promise<ServerSyncData | null> {
  try {
    const res = await fetch('/api/data', { cache: 'no-store' });
    if (!res.ok) return null;
    const json = await res.json();
    if (json.success && json.data) {
      const serverData = json.data;
      
      // Check if client has local edits that should be pushed to server or prioritized
      const localSecret = localStorage.getItem('ayoweh_secret_letter');
      const localPublic = localStorage.getItem('ayoweh_public_letter');
      const localCake = localStorage.getItem('ayoweh_cake_data');
      const localReasons = localStorage.getItem('ayoweh_love_reasons');

      if (localSecret || localPublic || localCake || localReasons) {
        // Sync local edits up to server to ensure server matches user's local state
        syncContentToServer({
          secretLetter: localSecret ? JSON.parse(localSecret) : serverData.secretLetter,
          publicLetter: localPublic ? JSON.parse(localPublic) : serverData.publicLetter,
          cakeData: localCake ? JSON.parse(localCake) : serverData.cakeData,
          loveReasons: localReasons ? JSON.parse(localReasons) : serverData.loveReasons,
        });
      } else {
        // If no local storage, populate local storage from server
        if (serverData.secretLetter) localStorage.setItem('ayoweh_secret_letter', JSON.stringify(serverData.secretLetter));
        if (serverData.publicLetter) localStorage.setItem('ayoweh_public_letter', JSON.stringify(serverData.publicLetter));
        if (serverData.cakeData) localStorage.setItem('ayoweh_cake_data', JSON.stringify(serverData.cakeData));
        if (serverData.loveReasons) localStorage.setItem('ayoweh_love_reasons', JSON.stringify(serverData.loveReasons));
      }

      return {
        ...serverData,
        secretLetter: localSecret ? JSON.parse(localSecret) : serverData.secretLetter,
        publicLetter: localPublic ? JSON.parse(localPublic) : serverData.publicLetter,
        cakeData: localCake ? JSON.parse(localCake) : serverData.cakeData,
        loveReasons: localReasons ? JSON.parse(localReasons) : serverData.loveReasons,
      };
    }
  } catch (err) {
    console.warn('Could not fetch server data, fallback to local:', err);
  }
  return null;
}

/**
 * Persist content modifications to the backend server
 */
export async function syncContentToServer(payload: {
  secretLetter?: SecretLetter;
  publicLetter?: PublicLetter;
  cakeData?: BirthdayCakeData;
  loveReasons?: LoveReason[];
}): Promise<boolean> {
  try {
    const res = await fetch('/api/save-content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return res.ok;
  } catch (err) {
    console.warn('Server sync error:', err);
    return false;
  }
}

// ----------------- Letters & Content Helpers -----------------

export function getSavedSecretLetter(): SecretLetter {
  try {
    const saved = localStorage.getItem('ayoweh_secret_letter');
    if (saved) return JSON.parse(saved);
  } catch {
    // fallback
  }
  return DEFAULT_SECRET_LETTER;
}

export function saveSecretLetter(letter: SecretLetter): void {
  try {
    localStorage.setItem('ayoweh_secret_letter', JSON.stringify(letter));
  } catch {
    // ignore
  }
  // Persist to server
  syncContentToServer({ secretLetter: letter });
}

export function getSavedPublicLetter(): PublicLetter {
  try {
    const saved = localStorage.getItem('ayoweh_public_letter');
    if (saved) return JSON.parse(saved);
  } catch {
    // fallback
  }
  return DEFAULT_PUBLIC_LETTER;
}

export function savePublicLetter(letter: PublicLetter): void {
  try {
    localStorage.setItem('ayoweh_public_letter', JSON.stringify(letter));
  } catch {
    // ignore
  }
  // Persist to server
  syncContentToServer({ publicLetter: letter });
}

export function getSavedLoveReasons(): LoveReason[] {
  try {
    const saved = localStorage.getItem('ayoweh_love_reasons');
    if (saved) return JSON.parse(saved);
  } catch {
    // fallback
  }
  return DEFAULT_LOVE_REASONS;
}

export function saveLoveReasons(reasons: LoveReason[]): void {
  try {
    localStorage.setItem('ayoweh_love_reasons', JSON.stringify(reasons));
  } catch {
    // ignore
  }
  // Persist to server
  syncContentToServer({ loveReasons: reasons });
}

export function getSavedCakeData(): BirthdayCakeData {
  try {
    const saved = localStorage.getItem('ayoweh_cake_data');
    if (saved) return JSON.parse(saved);
  } catch {
    // fallback
  }
  return DEFAULT_CAKE_DATA;
}

export function saveCakeData(data: BirthdayCakeData): void {
  try {
    localStorage.setItem('ayoweh_cake_data', JSON.stringify(data));
  } catch {
    // ignore
  }
  // Persist to server
  syncContentToServer({ cakeData: data });
}

// ----------------- Memory Photos (Server + Local Fallback) -----------------

export async function saveCustomPhoto(photo: MemoryPhoto): Promise<void> {
  // 1. Try to save to Server Disk
  try {
    const res = await fetch('/api/photos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(photo)
    });
    if (res.ok) {
      console.log('✅ Photo saved permanently to server disk!');
    }
  } catch (err) {
    console.warn('Could not save photo to server API:', err);
  }

  // 2. Also save to IndexedDB as local cache
  try {
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const transaction = db.transaction(STORE_PHOTOS, 'readwrite');
      const store = transaction.objectStore(STORE_PHOTOS);
      const req = store.put(photo);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn('IndexedDB cache save skipped/failed:', err);
  }
}

export async function getCustomPhotos(): Promise<MemoryPhoto[]> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const transaction = db.transaction(STORE_PHOTOS, 'readonly');
      const store = transaction.objectStore(STORE_PHOTOS);
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => resolve([]);
    });
  } catch {
    return [];
  }
}

export async function deleteMemoryPhoto(id: string): Promise<void> {
  // 1. Send DELETE to server
  try {
    await fetch(`/api/photos/${encodeURIComponent(id)}`, {
      method: 'DELETE'
    });
  } catch (err) {
    console.warn('Server photo delete error:', err);
  }

  // 2. Delete from local IndexedDB
  try {
    const db = await openDB();
    const transaction = db.transaction(STORE_PHOTOS, 'readwrite');
    const store = transaction.objectStore(STORE_PHOTOS);
    store.delete(id);
  } catch {
    // ignore
  }

  // 3. Mark in local deleted list
  try {
    const saved = localStorage.getItem('ayoweh_deleted_memory_ids');
    const deleted: string[] = saved ? JSON.parse(saved) : [];
    if (!deleted.includes(id)) {
      deleted.push(id);
      localStorage.setItem('ayoweh_deleted_memory_ids', JSON.stringify(deleted));
    }
  } catch {
    // ignore
  }
}

export async function getAllMemories(): Promise<MemoryPhoto[]> {
  // 1. First attempt to get authoritative memories from the server
  try {
    const res = await fetch('/api/data', { cache: 'no-store' });
    if (res.ok) {
      const json = await res.json();
      if (json.success && Array.isArray(json.data?.memories) && json.data.memories.length > 0) {
        return json.data.memories;
      }
    }
  } catch (err) {
    console.warn('Failed to load server memories, using local fallback:', err);
  }

  // 2. Local Fallback
  try {
    const deletedSaved = localStorage.getItem('ayoweh_deleted_memory_ids');
    const deletedIds: string[] = deletedSaved ? JSON.parse(deletedSaved) : [];
    const custom = await getCustomPhotos();
    const all = [...custom, ...DEFAULT_SAMPLE_MEMORIES];
    return all.filter((photo) => !deletedIds.includes(photo.id));
  } catch {
    return DEFAULT_SAMPLE_MEMORIES;
  }
}

// ----------------- Song Audio (Server + IndexedDB) -----------------

export async function saveCustomSong(file: File): Promise<{ name: string; size: number }> {
  // Read as base64 to send to server
  try {
    const reader = new FileReader();
    const base64Promise = new Promise<string>((resolve, reject) => {
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
    const base64Audio = await base64Promise;

    await fetch('/api/upload-audio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: file.name,
        type: file.type || 'audio/mp3',
        base64Audio
      })
    });
  } catch (err) {
    console.warn('Could not upload audio to server:', err);
  }

  // Also save to IndexedDB
  try {
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const transaction = db.transaction(STORE_SONG, 'readwrite');
      const store = transaction.objectStore(STORE_SONG);
      const data = {
        id: 'active_song',
        name: file.name,
        blob: file,
        size: file.size,
        type: file.type,
        uploadedAt: new Date().toISOString()
      };
      const req = store.put(data);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch {
    // ignore
  }

  return { name: file.name, size: file.size };
}

export async function getCustomSong(): Promise<{ name: string; blob: Blob; type: string } | null> {
  // First check if server has uploaded song
  try {
    const dataRes = await fetch('/api/data');
    if (dataRes.ok) {
      const json = await dataRes.json();
      if (json.success && json.data?.hasCustomAudio) {
        const audioRes = await fetch('/api/audio');
        if (audioRes.ok) {
          const blob = await audioRes.blob();
          return {
            name: json.data.audioName || 'custom_song.mp3',
            blob,
            type: 'audio/mpeg'
          };
        }
      }
    }
  } catch (err) {
    console.warn('Server audio fetch failed:', err);
  }

  // Fallback to IndexedDB
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const transaction = db.transaction(STORE_SONG, 'readonly');
      const store = transaction.objectStore(STORE_SONG);
      const req = store.get('active_song');
      req.onsuccess = () => {
        if (req.result) {
          resolve({
            name: req.result.name,
            blob: req.result.blob,
            type: req.result.type || 'audio/mp3'
          });
        } else {
          resolve(null);
        }
      };
      req.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

export async function deleteCustomSong(): Promise<void> {
  try {
    await fetch('/api/audio', { method: 'DELETE' });
  } catch {
    // ignore
  }
  try {
    const db = await openDB();
    const transaction = db.transaction(STORE_SONG, 'readwrite');
    const store = transaction.objectStore(STORE_SONG);
    store.delete('active_song');
  } catch {
    // ignore
  }
}

// ----------------- User Auth Role Helpers -----------------

export function getStoredUserRole(): { role: 'viewer' | 'admin' | null; name: string } {
  try {
    const role = localStorage.getItem('ayoweh_user_role') as 'viewer' | 'admin' | null;
    const name = localStorage.getItem('ayoweh_user_name') || '';
    return { role, name };
  } catch {
    return { role: null, name: '' };
  }
}

export function setStoredUserRole(role: 'viewer' | 'admin' | null, name: string): void {
  try {
    if (role) {
      localStorage.setItem('ayoweh_user_role', role);
      localStorage.setItem('ayoweh_user_name', name);
    } else {
      localStorage.removeItem('ayoweh_user_role');
      localStorage.removeItem('ayoweh_user_name');
    }
  } catch {
    // ignore
  }
}
