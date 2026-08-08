const fs = require('fs');

const content = fs.readFileSync('app/page.tsx', 'utf8');

// Find the start of the component
const fnStart = content.indexOf('export default function QuranApp() {') + 'export default function QuranApp() {'.length;

// Insert early return
const earlyReturn = `
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);
  if (!isClient) return <div className="min-h-screen" />;
`;

const newContent = content.slice(0, fnStart) + earlyReturn + content.slice(fnStart);
fs.writeFileSync('app/page.tsx', newContent, 'utf8');
