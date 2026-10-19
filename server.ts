import express from 'express';
import { createServer as createViteServer } from 'vite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'app_data.json');
const AUDIO_FILE = path.join(DATA_DIR, 'custom_song.mp3');
const AUDIO_META_FILE = path.join(DATA_DIR, 'audio_meta.json');

// Ensure data folder exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial default data if none exists
const DEFAULT_INITIAL_DATA = {
  secretLetter: {
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
  },
  publicLetter: {
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
  },
  cakeData: {
    sectionTitle: 'انفخي في الشموع واتمني أمنية يا روحي 🎂✨',
    sectionSubtitle: '19 شمعة بتنور حياتنا.. كل شمعة فيها دعوة من قلبي ليكي بالسعادة والفرح وراحة البال.',
    tier1Text: '19 سنة قمر 🌸',
    tier2Text: 'أيويه & فارس',
    tier3Text: '20 أكتوبر 2007 • كل ثانية بحبك أكتر ♾️',
    wishText: 'يا رب كل سنة وانتي في حضني ومعايا، وأشوف الضحكة اللي بتنور دنيتي دايمًا على وشك.. يا رب يحققلك كل اللي بتتمنيه، ونفضل سند لبعض لحد آخر العمر.. بحبك يا أيويه يا ست البنات ❤️',
    wishSender: 'فارس'
  },
  loveReasons: [
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
  ],
  memories: [
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
  ]
};

// Helper to read data safely
function readAppData() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Error reading data file, using defaults:', err);
  }
  // Initialize file with defaults
  fs.writeFileSync(DATA_FILE, JSON.stringify(DEFAULT_INITIAL_DATA, null, 2), 'utf-8');
  return DEFAULT_INITIAL_DATA;
}

// Helper to write data safely
function writeAppData(data: any) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error writing app data:', err);
    return false;
  }
}

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  // Support large base64 photos up to 50MB
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));

  // API 1: Get all persistent site data
  app.get('/api/data', (_req, res) => {
    const data = readAppData();
    let hasCustomAudio = false;
    let audioName = '';
    if (fs.existsSync(AUDIO_FILE) && fs.existsSync(AUDIO_META_FILE)) {
      try {
        const meta = JSON.parse(fs.readFileSync(AUDIO_META_FILE, 'utf-8'));
        hasCustomAudio = true;
        audioName = meta.name || 'custom_song.mp3';
      } catch {
        // ignore
      }
    }
    res.json({
      success: true,
      data: {
        ...data,
        hasCustomAudio,
        audioName
      }
    });
  });

  // API 2: Update content (letters, cake, reasons, dates)
  app.post('/api/save-content', (req, res) => {
    const { secretLetter, publicLetter, cakeData, loveReasons } = req.body;
    const current = readAppData();

    if (secretLetter) current.secretLetter = secretLetter;
    if (publicLetter) current.publicLetter = publicLetter;
    if (cakeData) current.cakeData = cakeData;
    if (loveReasons) current.loveReasons = loveReasons;

    const ok = writeAppData(current);
    if (ok) {
      res.json({ success: true, message: 'Saved successfully to server!' });
    } else {
      res.status(500).json({ success: false, error: 'Failed to write data' });
    }
  });

  // API 3: Add/Update Memory Photo
  app.post('/api/photos', (req, res) => {
    const photo = req.body;
    if (!photo || !photo.id || !photo.imageUrl) {
      return res.status(400).json({ success: false, error: 'Invalid photo data' });
    }

    const current = readAppData();
    const existingIndex = current.memories.findIndex((p: any) => p.id === photo.id);
    if (existingIndex >= 0) {
      current.memories[existingIndex] = photo;
    } else {
      // Add new photo at beginning of memories
      current.memories.unshift(photo);
    }

    const ok = writeAppData(current);
    if (ok) {
      res.json({ success: true, memory: photo, total: current.memories.length });
    } else {
      res.status(500).json({ success: false, error: 'Failed to save photo' });
    }
  });

  // API 4: Delete Memory Photo
  app.delete('/api/photos/:id', (req, res) => {
    const photoId = req.params.id;
    const current = readAppData();
    current.memories = current.memories.filter((p: any) => p.id !== photoId);

    const ok = writeAppData(current);
    if (ok) {
      res.json({ success: true, message: 'Photo deleted successfully' });
    } else {
      res.status(500).json({ success: false, error: 'Failed to delete photo' });
    }
  });

  // API 5: Upload Custom Audio
  app.post('/api/upload-audio', (req, res) => {
    const { name, base64Audio, type } = req.body;
    if (!base64Audio) {
      return res.status(400).json({ success: false, error: 'No audio data received' });
    }

    try {
      // Clean base64 string
      const base64Data = base64Audio.replace(/^data:audio\/\w+;base64,/, '').replace(/^data:application\/\w+;base64,/, '');
      const buffer = Buffer.from(base64Data, 'base64');
      fs.writeFileSync(AUDIO_FILE, buffer);
      fs.writeFileSync(AUDIO_META_FILE, JSON.stringify({ name: name || 'custom_song.mp3', type: type || 'audio/mp3', updatedAt: new Date().toISOString() }));
      res.json({ success: true, name: name || 'custom_song.mp3' });
    } catch (err: any) {
      console.error('Failed to save audio file:', err);
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // API 6: Stream Custom Audio
  app.get('/api/audio', (_req, res) => {
    if (fs.existsSync(AUDIO_FILE)) {
      res.setHeader('Content-Type', 'audio/mpeg');
      fs.createReadStream(AUDIO_FILE).pipe(res);
    } else {
      res.status(404).json({ error: 'No custom audio found' });
    }
  });

  // API 7: Delete Custom Audio
  app.delete('/api/audio', (_req, res) => {
    try {
      if (fs.existsSync(AUDIO_FILE)) fs.unlinkSync(AUDIO_FILE);
      if (fs.existsSync(AUDIO_META_FILE)) fs.unlinkSync(AUDIO_META_FILE);
      res.json({ success: true, message: 'Custom audio removed' });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // In development, hook Vite middleware
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true, host: '0.0.0.0', port: PORT },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve dist folder
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`✨ Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Server failed to start:', err);
});
