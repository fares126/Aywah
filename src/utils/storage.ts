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

// Open IndexedDB
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
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
  });
}

// Custom Song in IndexedDB
export async function saveCustomSong(file: File): Promise<{ name: string; size: number }> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
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
    req.onsuccess = () => resolve({ name: file.name, size: file.size });
    req.onerror = () => reject(req.error);
  });
}

export async function getCustomSong(): Promise<{ name: string; blob: Blob; type: string } | null> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
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
    req.onerror = () => reject(req.error);
  });
}

export async function deleteCustomSong(): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_SONG, 'readwrite');
    const store = transaction.objectStore(STORE_SONG);
    const req = store.delete('active_song');
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

// Custom Photos in IndexedDB
export async function saveCustomPhoto(photo: MemoryPhoto): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_PHOTOS, 'readwrite');
    const store = transaction.objectStore(STORE_PHOTOS);
    const req = store.put(photo);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

export async function getCustomPhotos(): Promise<MemoryPhoto[]> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_PHOTOS, 'readonly');
      const store = transaction.objectStore(STORE_PHOTOS);
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => reject(req.error);
    });
  } catch {
    return [];
  }
}

export function getDeletedPhotoIds(): string[] {
  try {
    const saved = localStorage.getItem('ayoweh_deleted_memory_ids');
    if (saved) return JSON.parse(saved);
  } catch {
    // fallback
  }
  return [];
}

export async function deleteMemoryPhoto(id: string): Promise<void> {
  const deleted = getDeletedPhotoIds();
  if (!deleted.includes(id)) {
    deleted.push(id);
    localStorage.setItem('ayoweh_deleted_memory_ids', JSON.stringify(deleted));
  }
  try {
    const db = await openDB();
    const transaction = db.transaction(STORE_PHOTOS, 'readwrite');
    const store = transaction.objectStore(STORE_PHOTOS);
    await new Promise<void>((resolve) => {
      const req = store.delete(id);
      req.onsuccess = () => resolve();
      req.onerror = () => resolve();
    });
  } catch {
    // ignore
  }
}

export async function getAllMemories(): Promise<MemoryPhoto[]> {
  const deletedIds = getDeletedPhotoIds();
  const custom = await getCustomPhotos();
  const all = [...custom, ...DEFAULT_SAMPLE_MEMORIES];
  return all.filter((photo) => !deletedIds.includes(photo.id));
}

export async function deleteCustomPhoto(id: string): Promise<void> {
  return deleteMemoryPhoto(id);
}

// LocalStorage helpers for letters, reasons, auth
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
  localStorage.setItem('ayoweh_secret_letter', JSON.stringify(letter));
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
  localStorage.setItem('ayoweh_public_letter', JSON.stringify(letter));
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
  localStorage.setItem('ayoweh_love_reasons', JSON.stringify(reasons));
}

export const DEFAULT_CAKE_DATA: BirthdayCakeData = {
  sectionTitle: 'انفخي في الشموع واتمني أمنية يا روحي 🎂✨',
  sectionSubtitle: '19 شمعة بتنور حياتنا.. كل شمعة فيها دعوة من قلبي ليكي بالسعادة والفرح وراحة البال.',
  tier1Text: '19 سنة قمر 🌸',
  tier2Text: 'أيويه & فارس',
  tier3Text: '20 أكتوبر 2007 • كل ثانية بحبك أكتر ♾️',
  wishText: 'يا رب كل سنة وانتي في حضني ومعايا، وأشوف الضحكة اللي بتنور دنيتي دايمًا على وشك.. يا رب يحققلك كل اللي بتتمنيه، ونفضل سند لبعض لحد آخر العمر.. بحبك يا أيويه يا ست البنات ❤️',
  wishSender: 'فارس'
};

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
  localStorage.setItem('ayoweh_cake_data', JSON.stringify(data));
}

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
  if (role) {
    localStorage.setItem('ayoweh_user_role', role);
    localStorage.setItem('ayoweh_user_name', name);
  } else {
    localStorage.removeItem('ayoweh_user_role');
    localStorage.removeItem('ayoweh_user_name');
  }
}


