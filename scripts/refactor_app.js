const fs = require('fs');

let content = fs.readFileSync('app/quran-app.tsx', 'utf8');

content = content.replace(/import \{ SURAHS_LIST, SAMPLE_VERSES_DATA, RECITERS/, "import { SURAHS_LIST, SAMPLE_VERSES_DATA, loadQuranData, RECITERS");

const stateInsert = `
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    loadQuranData().then(() => setDataLoaded(true));
  }, []);

  if (!dataLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }
`;

content = content.replace(/const \[mounted, setMounted\] = useState\(false\);/, "const [mounted, setMounted] = useState(false);\n" + stateInsert);

fs.writeFileSync('app/quran-app.tsx', content);
